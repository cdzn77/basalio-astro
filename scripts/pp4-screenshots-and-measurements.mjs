import { chromium } from 'playwright';

async function pp4() {
  const browser = await chromium.launch({ headless: true });
  
  // Screenshot 1: grid-reveal-demo at 375px
  console.log('PP4.3: grid-reveal-demo screenshot at 375px...');
  const page1 = await browser.newPage({ viewport: { width: 375, height: 2000 } });
  await page1.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page1.waitForTimeout(500);
  
  // Scroll to grid-reveal-demo
  await page1.evaluate(() => {
    const el = document.querySelector('#grid-reveal');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await page1.waitForTimeout(500);
  
  // Measure grid tiles
  const gridMeasurements = await page1.evaluate(() => {
    const tiles = Array.from(document.querySelectorAll('.grid-tile')).slice(0, 9);
    return tiles.map((tile, idx) => ({
      index: idx,
      width: tile.offsetWidth,
      height: tile.offsetHeight
    }));
  });
  
  console.log('\nPP4.3a: .grid-tile dimensions at 375px (2-column grid):');
  gridMeasurements.forEach(t => {
    console.log(`  Tile ${t.index}: ${t.width}px × ${t.height}px`);
  });
  
  await page1.screenshot({ path: '/mnt/user-data/outputs/pp4-grid-reveal-demo-375px.png', fullPage: false });
  console.log('  Screenshot: /mnt/user-data/outputs/pp4-grid-reveal-demo-375px.png ✓');
  
  await page1.close();

  // Screenshot 2: BlocksCarousel at 375px with peek
  console.log('\nPP4.4: BlocksCarousel (WhoItsFor) at 375px showing 41px peek...');
  const page2 = await browser.newPage({ viewport: { width: 375, height: 2000 } });
  await page2.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(500);
  
  // Scroll to WhoItsFor
  await page2.evaluate(() => {
    const el = document.querySelector('.testimonials-v2');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await page2.waitForTimeout(500);
  
  // Measure carousel card
  const carouselMeasurements = await page2.evaluate(() => {
    const viewport = document.querySelector('.carousel-viewport-v2');
    const card = document.querySelector('.testimonial-card-v2');
    
    return {
      viewportWidth: viewport?.offsetWidth,
      cardWidth: card?.offsetWidth,
      containerLeft: card?.parentElement?.offsetLeft,
      pageInnerWidth: window.innerWidth,
      firstCardScroll: document.querySelector('.carousel-track-v2')?.style.transform
    };
  });
  
  console.log('\nPP4.4a: BlocksCarousel dimensions at 375px:');
  console.log(`  Viewport width: ${carouselMeasurements.viewportWidth}px`);
  console.log(`  Card width: ${carouselMeasurements.cardWidth}px`);
  console.log(`  Inner width (viewport): ${carouselMeasurements.pageInnerWidth}px`);
  console.log(`  Peek amount: ${((carouselMeasurements.viewportWidth - carouselMeasurements.cardWidth) / 2).toFixed(0)}px`);
  
  await page2.screenshot({ path: '/mnt/user-data/outputs/pp4-carousel-375px-peek.png', fullPage: false });
  console.log('  Screenshot: /mnt/user-data/outputs/pp4-carousel-375px-peek.png ✓');
  
  await page2.close();

  await browser.close();
  
  console.log('\n✅ All measurements and screenshots complete.');
}

pp4().catch(err => console.error(err.message));
