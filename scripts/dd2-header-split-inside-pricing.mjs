import { chromium } from 'playwright';

async function analyze() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const headerSplitInPricing = document.querySelector('.pricing-inner .header-split');
    const button = headerSplitInPricing?.querySelector('.btn-wrapper');
    
    return {
      buttonText: button?.textContent?.trim(),
      buttonScrollWidth: button?.scrollWidth,
      buttonWidth: window.getComputedStyle(button).width,
      buttonMaxWidth: window.getComputedStyle(button).maxWidth,
      headerSplitScrollWidth: headerSplitInPricing?.scrollWidth,
      headerSplitInnerFlex: window.getComputedStyle(headerSplitInPricing?.querySelector('.header-split-inner')).flexDirection
    };
  });

  console.log('HeaderSplit inside .pricing-inner @ 375px:');
  console.log(`  HeaderSplit scrollWidth: ${result.headerSplitScrollWidth}px`);
  console.log(`  Button text: "${result.buttonText}"`);
  console.log(`  Button scrollWidth: ${result.buttonScrollWidth}px`);
  console.log(`  Button width: ${result.buttonWidth}`);
  console.log(`  Button max-width: ${result.buttonMaxWidth}`);
  console.log(`  HeaderSplit flex-direction: ${result.headerSplitInnerFlex}`);

  await browser.close();
}

analyze().catch(console.error);
