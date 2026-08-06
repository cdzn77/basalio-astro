import { chromium } from 'playwright';

async function deepAnalyze() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const pricingInner = document.querySelector('.pricing-inner');
    
    // Check ALL direct children
    const directChildren = Array.from(pricingInner?.children || []).map((el, idx) => ({
      index: idx,
      tag: el.tagName,
      class: el.className,
      scrollWidth: el.scrollWidth,
      offsetWidth: el.offsetWidth,
      marginLeft: window.getComputedStyle(el).marginLeft,
      marginRight: window.getComputedStyle(el).marginRight,
      flex: window.getComputedStyle(el).flex,
      minWidth: window.getComputedStyle(el).minWidth
    }));

    return {
      containerScrollWidth: pricingInner?.scrollWidth,
      containerDisplay: window.getComputedStyle(pricingInner).display,
      directChildren: directChildren
    };
  });

  console.log('DD2 Deep: Direct children of .pricing-inner @ 375px\n');
  console.log(`Container scrollWidth: ${result.containerScrollWidth}px`);
  console.log(`Container display: ${result.containerDisplay}\n`);
  console.log('Direct children:');
  
  let childrenWidthSum = 0;
  result.directChildren.forEach(child => {
    console.log(`\n[${child.index}] <${child.tag}.${child.class}>`);
    console.log(`    scrollWidth: ${child.scrollWidth}px, offsetWidth: ${child.offsetWidth}px`);
    console.log(`    margin: ${child.marginLeft}/${child.marginRight}`);
    console.log(`    flex: ${child.flex}, min-width: ${child.minWidth}`);
    childrenWidthSum += child.offsetWidth;
  });

  console.log(`\nSum of children offsetWidths: ${childrenWidthSum}px`);
  console.log(`Overflow from: 393 - 375 = 18px`);

  await browser.close();
}

deepAnalyze().catch(console.error);
