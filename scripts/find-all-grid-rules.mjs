import { chromium } from 'playwright';

async function findAllRules() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const rules = await page.evaluate(() => {
    const allRules = [];
    
    for (const sheet of document.styleSheets) {
      try {
        const sheetRules = sheet.cssRules || sheet.rules;
        for (const rule of sheetRules) {
          // Check regular rules
          if (rule.selectorText && rule.selectorText.includes('grid-reveal-demo')) {
            allRules.push({
              type: 'regular',
              selector: rule.selectorText,
              cssText: rule.cssText
            });
          }
          // Check media query rules
          if (rule.media) {
            try {
              for (const subrule of rule.cssRules) {
                if (subrule.selectorText && subrule.selectorText.includes('grid-reveal-demo')) {
                  allRules.push({
                    type: 'media',
                    media: rule.media.mediaText,
                    selector: subrule.selectorText,
                    cssText: subrule.cssText
                  });
                }
              }
            } catch (e) {}
          }
        }
      } catch (e) {}
    }
    
    return allRules;
  });

  console.log(`Found ${rules.length} rules:\n`);
  rules.forEach((r, i) => {
    console.log(`${i + 1}. [${r.type}] ${r.media || 'global'}`);
    console.log(`   ${r.selector}`);
    console.log(`   ${r.cssText.substring(0, 100)}...\n`);
  });

  await browser.close();
}

findAllRules().catch(err => console.error(err.message));
