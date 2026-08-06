import { chromium } from 'playwright';

async function qq2() {
  const browser = await chromium.launch({ headless: true });
  
  // BlocksCarousel
  const page1 = await browser.newPage({ viewport: { width: 375, height: 1200 } });
  await page1.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page1.waitForTimeout(500);
  
  const blocks = await page1.evaluate(() => {
    const vp = document.querySelector('.carousel-viewport');
    const card = document.querySelector('.block-card');
    const cr = document.querySelector('.courses-right');
    return {
      container: cr?.offsetWidth || 0,
      viewport: vp?.offsetWidth || 0,
      cardWidth: card?.offsetWidth || 0,
      cardHeight: card?.offsetHeight || 0
    };
  });
  
  console.log('BlocksCarousel at 375px:');
  console.log(`  Container: ${blocks.container}px`);
  console.log(`  Viewport: ${blocks.viewport}px`);
  console.log(`  Card width: ${blocks.cardWidth}px`);
  console.log(`  Card height: ${blocks.cardHeight}px`);
  console.log(`  Gap: 14px (spec)`);
  console.log(`  Peek: ${blocks.viewport - blocks.cardWidth - 14}px`);
  
  await page1.close();

  // WhoItsFor
  const page2 = await browser.newPage({ viewport: { width: 375, height: 1200 } });
  await page2.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(500);
  
  const whoitsfor = await page2.evaluate(() => {
    const vp = document.querySelector('.carousel-viewport-v2');
    const card = document.querySelector('.testimonial-card-v2');
    const cr = document.querySelector('.courses-right');
    return {
      container: cr?.offsetWidth || 0,
      viewport: vp?.offsetWidth || 0,
      cardWidth: card?.offsetWidth || 0,
      cardHeight: card?.offsetHeight || 0
    };
  });
  
  console.log('\nWhoItsFor at 375px:');
  console.log(`  Container: ${whoitsfor.container}px`);
  console.log(`  Viewport: ${whoitsfor.viewport}px`);
  console.log(`  Card width: ${whoitsfor.cardWidth}px`);
  console.log(`  Card height: ${whoitsfor.cardHeight}px`);
  console.log(`  Gap: 14px (spec)`);
  console.log(`  Peek: ${whoitsfor.viewport - whoitsfor.cardWidth - 14}px`);
  
  await page2.close();
  await browser.close();
}

qq2().catch(err => console.error(err.message));
