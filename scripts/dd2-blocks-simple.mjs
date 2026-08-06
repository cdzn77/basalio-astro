import { chromium } from 'playwright';

async function analyze() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const section2 = document.querySelectorAll('section')[2];
    const demoContainer = section2?.querySelector('.demo-container');
    
    return {
      section2ScrollWidth: section2?.scrollWidth,
      demoContainerScrollWidth: demoContainer?.scrollWidth,
      demoContainerOffsetWidth: demoContainer?.offsetWidth,
      demoContainerComputedWidth: window.getComputedStyle(demoContainer).width,
      demoContainerPadding: `${window.getComputedStyle(demoContainer).paddingLeft}/${window.getComputedStyle(demoContainer).paddingRight}`,
      demoContainerMargin: `${window.getComputedStyle(demoContainer).marginLeft}/${window.getComputedStyle(demoContainer).marginRight}`
    };
  });

  console.log('/blocks section[2] @ 375px - demo-container analysis:');
  console.log(`  section[2] scrollWidth: ${result.section2ScrollWidth}px`);
  console.log(`  demo-container scrollWidth: ${result.demoContainerScrollWidth}px`);
  console.log(`  demo-container offsetWidth: ${result.demoContainerOffsetWidth}px`);
  console.log(`  demo-container width: ${result.demoContainerComputedWidth}`);
  console.log(`  demo-container padding: ${result.demoContainerPadding}`);
  console.log(`  demo-container margin: ${result.demoContainerMargin}`);

  await browser.close();
}

analyze().catch(console.error);
