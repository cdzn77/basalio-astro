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
    
    // Find all children of pricing-inner
    const children = Array.from(pricingInner?.children || []).map(el => ({
      tag: el.tagName,
      class: el.className.substring(0, 40),
      scrollWidth: el.scrollWidth,
      offsetWidth: el.offsetWidth
    }));

    // Check HeaderSplit specifically
    const headerSplit = pricingInner?.querySelector('[class*="header-split"]');
    
    return {
      pricingInner: {
        scrollWidth: pricingInner?.scrollWidth || 0,
        offsetWidth: pricingInner?.offsetWidth || 0
      },
      children,
      headerSplitExists: !!headerSplit
    };
  });

  console.log('Pricing inner structure at 320px:\n');
  console.log(`Pricing-inner: scrollWidth=${data.pricingInner.scrollWidth}px, offsetWidth=${data.pricingInner.offsetWidth}px\n`);
  console.log('Direct children:');
  data.children.forEach((child, idx) => {
    console.log(`  ${idx + 1}. <${child.tag}> class="${child.class}" scrollWidth=${child.scrollWidth}px`);
  });
  console.log(`\nHeaderSplit component present: ${data.headerSplitExists}`);

  await browser.close();
}

debug().catch(err => console.error(err.message));
