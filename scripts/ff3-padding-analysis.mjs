import { chromium } from 'playwright';

async function analyzePaddingStructure() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const pricingInner = document.querySelector('.pricing-inner');
    const btn = pricingInner?.querySelector('.btn-wrapper');
    const btnText = btn?.querySelector('.btn-text');
    const btnArrowContainer = btn?.querySelector('.btn-arrow-container');
    
    return {
      buttonStructure: {
        btnWrapper: {
          display: window.getComputedStyle(btn).display,
          gap: window.getComputedStyle(btn).gap,
          scrollWidth: btn?.scrollWidth,
          children: [
            {
              element: '.btn-text',
              display: window.getComputedStyle(btnText).display,
              padding: `${window.getComputedStyle(btnText).paddingLeft}/${window.getComputedStyle(btnText).paddingRight}`,
              scrollWidth: btnText?.scrollWidth,
              flex: window.getComputedStyle(btnText).flex
            },
            {
              element: '.btn-arrow-container',
              display: window.getComputedStyle(btnArrowContainer).display,
              scrollWidth: btnArrowContainer?.scrollWidth,
              flex: window.getComputedStyle(btnArrowContainer).flex
            }
          ]
        }
      },
      explanation: 'The .btn-wrapper uses display: inline-flex with two children (.btn-text and .btn-arrow-container). Both are flex children. Padding on .btn-text does not affect .btn-arrow-container width. Total width = .btn-text scrollWidth + .btn-arrow-container scrollWidth.'
    };
  });

  await browser.close();
  return result;
}

console.log('═══════════════════════════════════════════════════════');
console.log('FF3: Why padding reduction had zero effect');
console.log('═══════════════════════════════════════════════════════\n');

const result = await analyzePaddingStructure();

console.log('Button structure (.btn-wrapper):');
console.log(`  display: ${result.buttonStructure.btnWrapper.display}`);
console.log(`  gap: ${result.buttonStructure.btnWrapper.gap}`);
console.log(`  scrollWidth: ${result.buttonStructure.btnWrapper.scrollWidth}px\n`);

console.log('Children:');
result.buttonStructure.btnWrapper.children.forEach(child => {
  console.log(`  ${child.element}:`);
  console.log(`    display: ${child.display}`);
  console.log(`    padding: ${child.padding || 'N/A'}`);
  console.log(`    scrollWidth: ${child.scrollWidth}px`);
  console.log(`    flex: ${child.flex}\n`);
});

console.log('Root cause:');
console.log(result.explanation);
