import { chromium } from 'playwright';

async function testMediaQuery() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const info = await page.evaluate(() => {
    return {
      windowInnerWidth: window.innerWidth,
      mediaQuery640: window.matchMedia('(max-width: 640px)').matches,
      mediaQuery768: window.matchMedia('(max-width: 768px)').matches,
      mediaQuery1024: window.matchMedia('(max-width: 1024px)').matches,
      
      gridElement: {
        hasDataAttr: document.querySelector('.grid-reveal-demo')?.hasAttribute('data-astro-cid-pla7cx5f'),
        element: document.querySelector('.grid-reveal-demo')?.outerHTML.substring(0, 100)
      }
    };
  });

  console.log(JSON.stringify(info, null, 2));

  await browser.close();
}

testMediaQuery().catch(err => console.error(err.message));
