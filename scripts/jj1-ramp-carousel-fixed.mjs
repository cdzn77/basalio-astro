import { chromium } from 'playwright';

async function measureRampCarousels() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const innerWidth = await page.evaluate(() => window.innerWidth);
  console.log(`✓ Viewport asserted: ${innerWidth}px\n`);

  // Measure the carousel
  const carouselData = await page.evaluate(() => {
    // Find the carousel element with overflow-x
    const carousel = Array.from(document.querySelectorAll('*')).find(el => {
      const style = window.getComputedStyle(el);
      return (style.overflowX === 'auto' || style.overflowX === 'scroll') && el.scrollWidth > el.offsetWidth;
    });

    if (!carousel) return { error: 'No carousel found' };

    const cards = Array.from(carousel.children);
    const firstCard = cards[0];
    const secondCard = cards[1];

    const firstCardRect = firstCard?.getBoundingClientRect();
    const secondCardRect = secondCard?.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();

    // Peek amount = how much of the second card is visible
    const peekAmount = secondCard ? (secondCardRect.right - carouselRect.right) : 0;

    // Find parent section for padding info
    const section = carousel.closest('section') || carousel.parentElement;
    const sectionStyle = section ? window.getComputedStyle(section) : {};

    // Look for arrows/buttons
    const arrowContainer = section?.querySelector('[class*="arrow"], [class*="button"], button');

    return {
      carouselTag: carousel.tagName,
      carouselClass: carousel.className?.slice(0, 60),
      cardsCount: cards.length,
      firstCardWidth: firstCard?.offsetWidth,
      firstCardHeight: firstCard?.offsetHeight,
      carouselScrollWidth: carousel.scrollWidth,
      carouselOffsetWidth: carousel.offsetWidth,
      carouselOverflowX: window.getComputedStyle(carousel).overflowX,
      carouselGap: window.getComputedStyle(carousel).gap,
      scrollSnapType: window.getComputedStyle(carousel).scrollSnapType,
      
      // Peek amount (how much of next card is visible)
      peekAmountPx: peekAmount,
      
      // Section info
      sectionPaddingLeft: sectionStyle.paddingLeft,
      sectionPaddingRight: sectionStyle.paddingRight,
      
      // Arrow info if found
      arrowFound: !!arrowContainer,
      arrowClass: arrowContainer?.className?.slice(0, 40),
      arrowOffsetWidth: arrowContainer?.offsetWidth,
      arrowOffsetHeight: arrowContainer?.offsetHeight
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('JJ1: Ramp Carousel Measurements (375×812)');
  console.log('═══════════════════════════════════════════════════════\n');
  
  if (carouselData.error) {
    console.log('ERROR:', carouselData.error);
  } else {
    console.log(JSON.stringify(carouselData, null, 2));
  }

  await browser.close();
}

measureRampCarousels().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
