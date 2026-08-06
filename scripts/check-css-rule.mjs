import { chromium } from 'playwright';

async function checkCSS() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const rule = await page.evaluate(() => {
    // Find all stylesheets and check for the media query rule
    let foundRule = false;
    
    for (const sheet of document.styleSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        for (const rule of rules) {
          if (rule.media && rule.media.mediaText && rule.media.mediaText.includes('640px')) {
            for (const subrule of rule.cssRules) {
              if (subrule.selectorText && subrule.selectorText.includes('grid-reveal-demo')) {
                foundRule = true;
                return {
                  selector: subrule.selectorText,
                  cssText: subrule.cssText
                };
              }
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheets throw errors, skip them
      }
    }

    return { foundRule, message: 'No 640px grid-reveal-demo rule found' };
  });

  console.log(JSON.stringify(rule, null, 2));

  await browser.close();
}

checkCSS().catch(err => console.error(err.message));
