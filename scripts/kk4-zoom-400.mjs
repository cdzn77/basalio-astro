import { chromium } from 'playwright';

async function kk4Zoom() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Set zoom to 400%
  await page.evaluate(() => {
    document.body.style.zoom = '400%';
  });
  await page.waitForTimeout(500);

  const zoomData = await page.evaluate(() => {
    const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;
    return {
      viewport: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      hasHorizontalScroll: hasHorizontalScroll,
      overflow: document.documentElement.scrollWidth - window.innerWidth
    };
  });

  console.log('KK4.3: 400% zoom at 1280x900\n');
  console.log(`Viewport width: ${zoomData.viewport}px`);
  console.log(`Document width: ${zoomData.documentWidth}px`);
  console.log(`Horizontal scrollbar: ${zoomData.hasHorizontalScroll ? '❌ PRESENT' : '✅ NONE'}`);
  console.log(`Overflow: ${zoomData.overflow}px`);

  if (zoomData.hasHorizontalScroll) {
    console.log(`\n⚠️ Horizontal scrollbar present at 400% zoom. Layout breaks.`);
  } else {
    console.log(`\n✅ No horizontal scrollbar at 400% zoom. Reflow works.`);
  }

  await page.screenshot({ path: '/private/tmp/kk4-hero-zoom-400.png', fullPage: false });
  console.log(`\n📸 Screenshot: /private/tmp/kk4-hero-zoom-400.png`);

  await browser.close();
}

kk4Zoom().catch(err => console.error(err.message));
