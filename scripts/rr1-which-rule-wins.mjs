import { chromium } from 'playwright';

async function rr1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const ruleInfo = await page.evaluate(() => {
    const card = document.querySelector('.testimonial-card-v2');
    const allRules = [];
    
    for (const sheet of document.styleSheets) {
      try {
        const sheetRules = sheet.cssRules || sheet.rules;
        for (let i = 0; i < sheetRules.length; i++) {
          const rule = sheetRules[i];
          
          // Check regular rules
          if (rule.selectorText && rule.selectorText.includes('testimonial-card-v2')) {
            allRules.push({
              type: 'regular',
              selector: rule.selectorText,
              height: rule.style.height || '(not set)',
              padding: rule.style.padding || '(not set)'
            });
          }
          
          // Check media rules
          if (rule.media) {
            try {
              const isActive = window.matchMedia(rule.media.mediaText).matches;
              for (const subrule of rule.cssRules) {
                if (subrule.selectorText && subrule.selectorText.includes('testimonial-card-v2')) {
                  allRules.push({
                    type: 'media',
                    media: rule.media.mediaText,
                    isActive: isActive,
                    selector: subrule.selectorText,
                    height: subrule.style.height || '(not set)',
                    padding: subrule.style.padding || '(not set)'
                  });
                }
              }
            } catch (e) {}
          }
        }
      } catch (e) {}
    }
    
    return {
      allRules: allRules,
      computedHeight: window.getComputedStyle(card).height,
      computedPadding: window.getComputedStyle(card).padding
    };
  });

  console.log('RR1.4: Which CSS rule applies to .testimonial-card-v2 at 375px?\n');
  ruleInfo.allRules.forEach((rule, idx) => {
    const label = rule.type === 'media' ? `[${rule.media}] ${rule.isActive ? '✅ ACTIVE' : '❌ inactive'}` : '[global]';
    console.log(`${idx + 1}. ${label}`);
    console.log(`   ${rule.selector}`);
    console.log(`   height: ${rule.height}, padding: ${rule.padding}\n`);
  });

  console.log(`FINAL COMPUTED VALUES:`);
  console.log(`  height: ${ruleInfo.computedHeight}`);
  console.log(`  padding: ${ruleInfo.computedPadding}`);

  await page.close();
  await browser.close();
}

rr1().catch(err => console.error(err.message));
