import { chromium } from 'playwright';

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const pricingSection = sections[3];
    const dividerList = pricingSection?.querySelector('.pricing-divider-list');
    
    return {
      dividerList: {
        scrollWidth: dividerList?.scrollWidth || 0,
        offsetWidth: dividerList?.offsetWidth || 0,
        padding: window.getComputedStyle(dividerList).padding
      },
      section: {
        scrollWidth: pricingSection?.scrollWidth || 0
      }
    };
  });

  console.log('Pricing divider fix verification at 320px:\n');
  console.log(`.pricing-divider-list scrollWidth=${data.dividerList.scrollWidth}px (should be ≤320px) ${data.dividerList.scrollWidth <= 320 ? '✓' : '✗'}`);
  console.log(`Computed padding: ${data.dividerList.padding}`);
  console.log(`Section scrollWidth: ${data.section.scrollWidth}px (should be ≤320px) ${data.section.scrollWidth <= 320 ? '✓' : '✗'}`);

  await browser.close();
}

verify().catch(err => console.error(err.message));
