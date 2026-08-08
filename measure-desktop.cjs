const { chromium } = require('playwright');

const viewports = [1280, 1440, 1920];

(async () => {
  const browser = await chromium.launch();
  
  for (const width of viewports) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    
    const measurements = await page.evaluate(() => {
      const card = document.querySelector('.block-card');
      const track = document.querySelector('.carousel-track');
      const viewport = document.querySelector('.carousel-viewport');
      const coursesInner = document.querySelector('.courses-inner');
      const coursesLeft = document.querySelector('.courses-left');
      const coursesRight = document.querySelector('.courses-right');
      
      return {
        cardWidth: card?.offsetWidth,
        cardHeight: card?.offsetHeight,
        trackWidth: track?.offsetWidth,
        trackChildren: track?.children.length,
        viewportWidth: viewport?.offsetWidth,
        viewportHeight: viewport?.offsetHeight,
        coursesInnerWidth: coursesInner?.offsetWidth,
        coursesLeftWidth: coursesLeft?.offsetWidth,
        coursesRightWidth: coursesRight?.offsetWidth,
        gap: 20 // desktop gap
      };
    });
    
    if (measurements.cardWidth) {
      const cardsPerView = Math.floor(measurements.viewportWidth / (measurements.cardWidth + measurements.gap));
      console.log(`\nFD2 — ${width}px viewport:`);
      console.log(`  Card width: ${measurements.cardWidth}px | height: ${measurements.cardHeight}px`);
      console.log(`  Viewport width: ${measurements.viewportWidth}px`);
      console.log(`  Cards per view (whole): ${cardsPerView}`);
      console.log(`  Track total width: ${measurements.trackWidth}px (${measurements.trackChildren} cards)`);
      console.log(`  .courses-inner width: ${measurements.coursesInnerWidth}px`);
      console.log(`  .courses-left width: ${measurements.coursesLeftWidth}px (left column)`);
      console.log(`  .courses-right width: ${measurements.coursesRightWidth}px (carousel container)`);
      
      const availableWidth = measurements.coursesInnerWidth - measurements.coursesLeftWidth - 20; // 20px gap
      const perfectFit = Math.floor(availableWidth / (measurements.cardWidth + measurements.gap));
      console.log(`  Available width for carousel: ${availableWidth}px`);
      console.log(`  Perfect whole cards: ${perfectFit}`);
    }
    
    await ctx.close();
  }
  
  await browser.close();
})();
