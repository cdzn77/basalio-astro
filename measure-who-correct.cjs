const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  
  // Direct selector: testimonial cards are direct children of carousel-track-v2
  const measurements = await page.evaluate(() => {
    // Find the WhoItsFor section
    const section = document.querySelector('.testimonials-v2, .testimonials-rounded');
    if (!section) return { error: 'no testimonials section found' };
    
    // Get the carousel-viewport-v2 (the direct container)
    const viewport = section.querySelector('.carousel-viewport-v2');
    if (!viewport) return { error: 'no carousel-viewport-v2 found' };
    
    // Get the track
    const track = section.querySelector('.carousel-track-v2');
    if (!track) return { error: 'no carousel-track-v2 found' };
    
    // Get DIRECT children of track (the actual cards)
    const cards = track.children;
    
    return {
      sectionClass: section.className,
      viewportClass: viewport.className,
      viewportComputedHeight: window.getComputedStyle(viewport).height,
      viewportOffsetHeight: viewport.offsetHeight,
      trackClass: track.className,
      trackChildren: cards.length,
      trackHeight: track.offsetHeight,
      firstCardClass: cards[0]?.className,
      firstCardHeight: cards[0]?.offsetHeight,
      cardHeights: Array.from(cards).slice(0, 4).map(c => c.offsetHeight)
    };
  });
  
  console.log('FE1.2 — WhoItsFor carousel correct measurement at 390px:');
  console.log('Section:', measurements.sectionClass);
  console.log('Viewport:');
  console.log('  Class:', measurements.viewportClass);
  console.log('  Computed height:', measurements.viewportComputedHeight);
  console.log('  Offset height:', measurements.viewportOffsetHeight, 'px');
  console.log('Track:');
  console.log('  Class:', measurements.trackClass);
  console.log('  Direct children (cards):', measurements.trackChildren);
  console.log('  Track height:', measurements.trackHeight, 'px');
  console.log('First card:');
  console.log('  Class:', measurements.firstCardClass);
  console.log('  Height:', measurements.firstCardHeight, 'px');
  console.log('First 4 card heights:', measurements.cardHeights);
  
  if (measurements.viewportOffsetHeight === 0) {
    console.log('\nFE1.3 — The broken element: .carousel-viewport-v2 has 0px height');
  }
  
  await browser.close();
})();
