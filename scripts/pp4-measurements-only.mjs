import { chromium } from 'playwright';

async function pp4() {
  const browser = await chromium.launch({ headless: true });
  
  // Grid-reveal measurements
  console.log('PP4.3a: .grid-tile dimensions at 375px viewport (2-column grid):');
  const page1 = await browser.newPage({ viewport: { width: 375, height: 1200 } });
  await page1.goto('http://localhost:4322/blocks#grid-reveal', { waitUntil: 'networkidle' });
  await page1.waitForTimeout(800);
  
  const gridData = await page1.evaluate(() => {
    const tiles = Array.from(document.querySelectorAll('.grid-tile')).slice(0, 6);
    const demo = document.querySelector('.grid-reveal-demo');
    return {
      demoWidth: demo?.offsetWidth,
      demoHeight: demo?.offsetHeight,
      tiles: tiles.map((tile, idx) => ({
        index: idx,
        width: tile.offsetWidth,
        height: tile.offsetHeight,
        aspectRatio: (tile.offsetWidth / tile.offsetHeight).toFixed(2)
      }))
    };
  });

  console.log(`  Grid container: ${gridData.demoWidth}px wide × ${gridData.demoHeight}px tall`);
  console.log(`  Layout: 2 columns (${gridData.demoWidth / 2}px each)\n`);
  gridData.tiles.forEach(t => {
    console.log(`    Tile ${t.index}: ${t.width}px × ${t.height}px (aspect: ${t.aspectRatio})`);
  });

  await page1.close();

  // Carousel measurements
  console.log('\n\nPP4.4a: BlocksCarousel (WhoItsFor testimonials) at 375px:');
  const page2 = await browser.newPage({ viewport: { width: 375, height: 1200 } });
  await page2.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(800);
  
  const carouselData = await page2.evaluate(() => {
    const viewport = document.querySelector('.carousel-viewport-v2');
    const card = document.querySelector('.testimonial-card-v2');
    const track = document.querySelector('.carousel-track-v2');
    
    return {
      viewportWidth: viewport?.offsetWidth,
      cardWidth: card?.offsetWidth,
      gap: window.getComputedStyle(track || {}).gap,
      innerWidth: window.innerWidth,
      containerWidth: document.querySelector('.courses-right')?.offsetWidth
    };
  });

  const peek = carouselData.viewportWidth - carouselData.cardWidth;
  console.log(`  Container (courses-right): ${carouselData.containerWidth}px`);
  console.log(`  Carousel viewport: ${carouselData.viewportWidth}px`);
  console.log(`  Card width: ${carouselData.cardWidth}px`);
  console.log(`  Gap: ${carouselData.gap}`);
  console.log(`  Peek amount: ${peek}px visible of next card`);
  console.log(`  Page innerWidth: ${carouselData.innerWidth}px`);

  await page2.close();

  await browser.close();
}

pp4().catch(err => console.error(err.message));
