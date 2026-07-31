import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const viewports = [
    { width: 1440, height: 900 },
    { width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: vp });
    const page = await context.newPage();
    await page.goto('http://localhost:4321/pricing', { waitUntil: 'networkidle' });
    
    const footerHeight = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer ? Math.round(footer.getBoundingClientRect().height) : null;
    });
    
    console.log(`${vp.width}×${vp.height}: footer height = ${footerHeight}px`);
    await context.close();
  }

  await browser.close();
})();
