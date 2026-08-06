import { chromium } from 'playwright';

async function debugRulesApplied() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const info = await page.evaluate(() => {
    const el = document.querySelector('.grid-reveal-demo');
    const allRules = [];
    
    // Get all stylesheets and find which rules match this element
    for (const sheet of document.styleSheets) {
      try {
        const sheetRules = sheet.cssRules || sheet.rules;
        for (let i = 0; i < sheetRules.length; i++) {
          const rule = sheetRules[i];
          
          // Check regular rules
          if (rule.selectorText) {
            try {
              if (el.matches(rule.selectorText)) {
                allRules.push({
                  index: i,
                  type: 'regular',
                  selector: rule.selectorText,
                  display: rule.style.display || '(not set)',
                  gridCols: rule.style.gridTemplateColumns || '(not set)'
                });
              }
            } catch (e) {}
          }
          
          // Check media rules
          if (rule.media) {
            try {
              const isActive = window.matchMedia(rule.media.mediaText).matches;
              for (let j = 0; j < rule.cssRules.length; j++) {
                const subrule = rule.cssRules[j];
                if (subrule.selectorText) {
                  try {
                    if (el.matches(subrule.selectorText)) {
                      allRules.push({
                        index: i,
                        subindex: j,
                        type: 'media',
                        media: rule.media.mediaText,
                        isActive: isActive,
                        selector: subrule.selectorText,
                        display: subrule.style.display || '(not set)',
                        gridCols: subrule.style.gridTemplateColumns || '(not set)'
                      });
                    }
                  } catch (e) {}
                }
              }
            } catch (e) {}
          }
        }
      } catch (e) {}
    }
    
    return {
      elementMatches: allRules,
      computedDisplay: window.getComputedStyle(el).display,
      computedGridCols: window.getComputedStyle(el).gridTemplateColumns
    };
  });

  console.log('All matching CSS rules (in cascade order):\n');
  info.elementMatches.forEach((rule, idx) => {
    console.log(`${idx + 1}. [${rule.type}]${rule.media ? ` ${rule.media}${rule.isActive ? ' ✓ACTIVE' : ' ✗inactive'}` : ' global'}`);
    console.log(`   ${rule.selector}`);
    console.log(`   display: ${rule.display}, grid-template-columns: ${rule.gridCols}\n`);
  });

  console.log(`\nFinal computed values:`);
  console.log(`  display: ${info.computedDisplay}`);
  console.log(`  gridTemplateColumns: ${info.computedGridCols}`);

  await browser.close();
}

debugRulesApplied().catch(err => console.error(err.message));
