import { chromium } from 'playwright';

async function debug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const pricingSection = sections[3];
    const pricingInner = pricingSection?.querySelector('.pricing-inner');
    const dividerList = pricingSection?.querySelector('.pricing-divider-list');
    
    return {
      pricing: {
        scrollWidth: pricingSection?.scrollWidth || 0,
        offsetWidth: pricingSection?.offsetWidth || 0
      },
      pricingInner: {
        scrollWidth: pricingInner?.scrollWidth || 0,
        offsetWidth: pricingInner?.offsetWidth || 0,
        padding: window.getComputedStyle(pricingInner).padding
      },
      dividerList: {
        scrollWidth: dividerList?.scrollWidth || 0,
        padding: window.getComputedStyle(dividerList).padding
      }
    };
  });

  console.log('Pricing section breakdown at 320px:\n');
  console.log(`Section: scrollWidth=${data.pricing.scrollWidth}px, offsetWidth=${data.pricing.offsetWidth}px`);
  console.log(`  > .pricing-inner: scrollWidth=${data.pricingInner.scrollWidth}px, padding=${data.pricingInner.padding}`);
  console.log(`  > .pricing-divider-list: scrollWidth=${data.dividerList.scrollWidth}px, padding=${data.dividerList.padding}`);
  console.log(`\nCulprit: pricing-inner has ${data.pricingInner.scrollWidth}px scrollWidth`);

  await browser.close();
}

debug().catch(err => console.error(err.message));
