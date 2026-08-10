import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

// Scroll to top
await page.evaluate(() => window.scrollTo(0, 0));

const bcTest = await page.evaluate(async () => {
  // Look for both carousel selectors
  const nextBtn = document.querySelector('[aria-label="Next blocks"], .carousel-button-next');
  const prevBtn = document.querySelector('[aria-label="Previous blocks"], .carousel-button-prev');
  const track = document.querySelector('.carousel-track');
  const viewport = document.querySelector('.carousel-viewport');
  const cards = document.querySelectorAll('.block-card');
  
  if (!nextBtn) {
    return { error: `No next button found. Looking for: [aria-label="Next blocks"], .carousel-button-next` };
  }
  if (!track) {
    return { error: 'No .carousel-track found' };
  }
  
  // Click next until button is disabled
  let clicks = 0;
  const maxClicks = 20;
  while (!nextBtn.disabled && clicks < maxClicks) {
    nextBtn.click();
    clicks++;
    await new Promise(r => setTimeout(r, 50));
  }
  
  // Check last card visibility
  const lastCard = cards[cards.length - 1];
  const trackRect = track.getBoundingClientRect();
  const lastCardRect = lastCard.getBoundingClientRect();
  const lastCardFullyVisible = lastCardRect.right <= trackRect.right + 1; // +1 for rounding
  
  return {
    totalCards: cards.length,
    clicksToEnd: clicks,
    nextBtnDisabled: nextBtn.disabled,
    lastCardFullyVisible,
    lastCardRight: Math.round(lastCardRect.right),
    viewportRight: Math.round(trackRect.right)
  };
});

console.log('BlocksCarousel test result:');
if (bcTest.error) {
  console.log(`  ERROR: ${bcTest.error}`);
} else {
  console.log(`  Total cards: ${bcTest.totalCards}`);
  console.log(`  Clicks to reach end: ${bcTest.clicksToEnd}`);
  console.log(`  Next button disabled: ${bcTest.nextBtnDisabled}`);
  console.log(`  Last card fully visible: ${bcTest.lastCardFullyVisible}`);
  console.log(`  Last card right edge: ${bcTest.lastCardRight}px`);
  console.log(`  Viewport right edge: ${bcTest.viewportRight}px`);
}

await browser.close();
