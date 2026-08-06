import { chromium } from 'playwright';

async function measureRampCarousels() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)'
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000); // Allow lazy images

  // Assert viewport
  const innerWidth = await page.evaluate(() => window.innerWidth);
  console.log(`✓ Viewport: ${innerWidth}px\n`);

  // Find ALL elements with overflow-x to locate carousels
  const measurements = await page.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const overflowElements = [];
    
    for (let el of allElements) {
      const style = window.getComputedStyle(el);
      if (style.overflowX === 'auto' || style.overflowX === 'scroll') {
        const text = el.textContent?.slice(0, 80) || el.className?.slice(0, 40);
        overflowElements.push({
          tag: el.tagName,
          className: el.className?.slice(0, 60),
          overflowX: style.overflowX,
          scrollWidth: el.scrollWidth,
          offsetWidth: el.offsetWidth,
          gap: style.gap,
          text: text
        });
      }
    }

    return {
      totalElementsWithOverflowX: overflowElements.length,
      overflowElements: overflowElements.slice(0, 10)  // First 10
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('JJ1: Finding carousels (overflow-x elements)');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log(JSON.stringify(measurements, null, 2));

  // Now measure the first carousel with overflow-x
  const carouselData = await page.evaluate(() => {
    // Find the first element with overflow-x auto/scroll
    const carousel = Array.from(document.querySelectorAll('*')).find(el => {
      const style = window.getComputedStyle(el);
      return style.overflowX === 'auto' || style.overflowX === 'scroll';
    });

    if (!carousel) return { error: 'No carousel found with overflow-x' };

    // Get the cards/items inside
    const cards = carousel.querySelectorAll('> *');
    const firstCard = cards[0];
    const secondCard = cards[1];

    const firstCardStyle = window.getComputedStyle(firstCard);
    const carouselStyle = window.getComputedStyle(carousel);

    return {
      carouselTag: carousel.tagName,
      carouselClass: carousel.className?.slice(0, 80),
      carouselOverflowX: carouselStyle.overflowX,
      carouselScrollSnapType: carouselStyle.scrollSnapType,
      carouselScrollWidth: carousel.scrollWidth,
      carouselOffsetWidth: carousel.offsetWidth,
      carouselClientWidth: carousel.clientWidth,
      carouselGap: carouselStyle.gap,
      cardsCount: cards.length,
      firstCardWidth: firstCard?.offsetWidth,
      firstCardDisplay: firstCardStyle.display,
      firstCardFlexShrink: firstCardStyle.flexShrink,
      secondCardX: secondCard?.getBoundingClientRect().x,
      firstCardX: firstCard?.getBoundingClientRect().x,
      peekAmount: secondCard ? (secondCard.getBoundingClientRect().x - carousel.getBoundingClientRect().x - carousel.clientWidth) : 0
    };
  });

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('Carousel Details (First overflow-x element):');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log(JSON.stringify(carouselData, null, 2));

  await browser.close();
}

measureRampCarousels().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
