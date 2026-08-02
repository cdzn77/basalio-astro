const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  // /blocks mid-scroll
  await page.goto('http://localhost:4321/blocks');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.5));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/mobile-390-blocks-mid.png' });
  console.log('✓ /blocks mid-scroll');
  
  // /blocks at footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/mobile-390-blocks-footer.png' });
  console.log('✓ /blocks at footer');
  
  // / (home) mid-scroll
  await page.goto('http://localhost:4321');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.5));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/mobile-390-home-mid.png' });
  console.log('✓ / mid-scroll');
  
  // / at footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/mobile-390-home-footer.png' });
  console.log('✓ / at footer');
  
  await browser.close();
})();
