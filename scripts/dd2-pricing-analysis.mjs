import { chromium } from 'playwright';

async function analyzePricing() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const pricingInner = document.querySelector('.pricing-inner');
    const innerCS = window.getComputedStyle(pricingInner);
    
    // Find deepest overflowing child
    const allChildren = pricingInner?.querySelectorAll('*') || [];
    const overflowers = Array.from(allChildren)
      .filter(el => el.scrollWidth > 375)
      .map(el => ({
        tag: el.tagName,
        class: el.className,
        scrollWidth: el.scrollWidth,
        offsetWidth: el.offsetWidth,
        computedWidth: window.getComputedStyle(el).width,
        marginLeft: window.getComputedStyle(el).marginLeft,
        marginRight: window.getComputedStyle(el).marginRight,
        padding: `${window.getComputedStyle(el).paddingLeft}/${window.getComputedStyle(el).paddingRight}`,
        boxSizing: window.getComputedStyle(el).boxSizing,
        flex: window.getComputedStyle(el).flex
      }));

    return {
      pricingInner: {
        scrollWidth: pricingInner?.scrollWidth,
        offsetWidth: pricingInner?.offsetWidth,
        width: innerCS.width,
        padding: `${innerCS.paddingLeft}/${innerCS.paddingRight}`,
        boxSizing: innerCS.boxSizing,
        display: innerCS.display,
        flexDirection: innerCS.flexDirection
      },
      overflowingChildren: overflowers.slice(0, 5)
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('DD2: / section[3] (.pricing-inner) @ 375px');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('Container (.pricing-inner):');
  console.log(`  scrollWidth: ${result.pricingInner.scrollWidth}px`);
  console.log(`  offsetWidth: ${result.pricingInner.offsetWidth}px`);
  console.log(`  width: ${result.pricingInner.width}`);
  console.log(`  padding: ${result.pricingInner.padding}`);
  console.log(`  box-sizing: ${result.pricingInner.boxSizing}`);
  console.log(`  display: ${result.pricingInner.display}\n`);

  console.log('Children exceeding 375px:');
  result.overflowingChildren.forEach((el, i) => {
    console.log(`\n[${i}] <${el.tag}.${el.class}>`);
    console.log(`    scrollWidth: ${el.scrollWidth}px`);
    console.log(`    width: ${el.computedWidth}`);
    console.log(`    margin: ${el.marginLeft}/${el.marginRight}`);
    console.log(`    padding: ${el.padding}`);
    console.log(`    box-sizing: ${el.boxSizing}`);
    console.log(`    flex: ${el.flex}`);
  });

  await browser.close();
}

analyzePricing().catch(console.error);
