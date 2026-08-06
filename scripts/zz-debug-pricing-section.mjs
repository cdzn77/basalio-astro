import { chromium } from 'playwright';

async function debug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const pricingSection = sections[3]; // The one with scrollWidth=335px
    
    if (!pricingSection) return { error: 'No section[3]' };

    // Get all direct children with their dimensions
    const directChildren = Array.from(pricingSection.children).map(el => ({
      tag: el.tagName,
      class: el.className.substring(0, 50),
      width: el.offsetWidth,
      scrollWidth: el.scrollWidth
    }));

    // Get pricing-inner specifically
    const pricingInner = pricingSection.querySelector('.pricing-inner');
    const pricingDivider = pricingSection.querySelector('.pricing-divider-list');

    return {
      pricingSection: {
        scrollWidth: pricingSection.scrollWidth,
        offsetWidth: pricingSection.offsetWidth,
        directChildren
      },
      pricingInner: pricingInner ? {
        scrollWidth: pricingInner.scrollWidth,
        offsetWidth: pricingInner.offsetWidth
      } : null,
      pricingDivider: pricingDivider ? {
        scrollWidth: pricingDivider.scrollWidth,
        offsetWidth: pricingDivider.offsetWidth
      } : null
    };
  });

  console.log('Pricing section[3] structure at 320px:\n');
  console.log(`Section: scrollWidth=${data.pricingSection.scrollWidth}px, offsetWidth=${data.pricingSection.offsetWidth}px\n`);
  
  console.log('Direct children:');
  data.pricingSection.directChildren.forEach((child, idx) => {
    console.log(`  ${idx + 1}. <${child.tag}> width=${child.width}px, scrollWidth=${child.scrollWidth}px`);
    if (child.class) console.log(`     class: ${child.class}`);
  });

  if (data.pricingInner) {
    console.log(`\n.pricing-inner: scrollWidth=${data.pricingInner.scrollWidth}px, offsetWidth=${data.pricingInner.offsetWidth}px`);
  }

  if (data.pricingDivider) {
    console.log(`\n.pricing-divider-list: scrollWidth=${data.pricingDivider.scrollWidth}px, offsetWidth=${data.pricingDivider.offsetWidth}px`);
  }

  await browser.close();
}

debug().catch(err => console.error(err.message));
