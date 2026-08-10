import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

// Test BlocksCarousel
console.log('BlocksCarousel (.carousel-track):');
const bcTest = await page.evaluate(async () => {
  const nextBtn = document.querySelector('.carousel-button-next');
  const track = document.querySelector('.carousel-track');
  const viewport = document.querySelector('.carousel-viewport');
  const cards = document.querySelectorAll('.block-card');
  
  // Click next until button is disabled
  let clicks = 0;
  while (!nextBtn.disabled && clicks < 10) {
    nextBtn.click();
    clicks++;
    // Small delay for animation
    await new Promise(r => setTimeout(r, 100));
  }
  
  // Check last card visibility
  const lastCard = cards[cards.length - 1];
  const trackRect = track.getBoundingClientRect();
  const lastCardRect = lastCard.getBoundingClientRect();
  const lastCardFullyVisible = lastCardRect.left >= trackRect.left && lastCardRect.right <= trackRect.right;
  
  return {
    totalCards: cards.length,
    clicksToEnd: clicks,
    lastCardRect: { left: lastCardRect.left, right: lastCardRect.right },
    viewportRect: { left: trackRect.left, right: trackRect.right },
    nextBtnDisabled: nextBtn.disabled,
    lastCardFullyVisible
  };
});

console.log(`  Total cards: ${bcTest.totalCards}`);
console.log(`  Clicks to reach end: ${bcTest.clicksToEnd}`);
console.log(`  Next button disabled at end: ${bcTest.nextBtnDisabled}`);
console.log(`  Last card fully visible: ${bcTest.lastCardFullyVisible}`);
if (!bcTest.lastCardFullyVisible) {
  console.log(`  Last card rect: [${bcTest.lastCardRect.left}, ${bcTest.lastCardRect.right}]`);
  console.log(`  Viewport rect: [${bcTest.viewportRect.left}, ${bcTest.viewportRect.right}]`);
}

// Test WhoItsFor
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

console.log('\nWhoItsFor (.carousel-track-v2):');
const wiTest = await page.evaluate(async () => {
  const nextBtn = document.querySelector('.carousel-button-next-v2');
  const track = document.querySelector('.carousel-track-v2');
  const viewport = document.querySelector('.carousel-viewport-v2');
  const cards = document.querySelectorAll('.testimonial-card-v2');
  
  if (!nextBtn || !track) return { error: 'WhoItsFor elements not found' };
  
  // Click next until button is disabled
  let clicks = 0;
  while (!nextBtn.disabled && clicks < 10) {
    nextBtn.click();
    clicks++;
    await new Promise(r => setTimeout(r, 100));
  }
  
  // Check last card visibility
  const lastCard = cards[cards.length - 1];
  const trackRect = track.getBoundingClientRect();
  const lastCardRect = lastCard.getBoundingClientRect();
  const lastCardFullyVisible = lastCardRect.left >= trackRect.left && lastCardRect.right <= trackRect.right;
  
  return {
    totalCards: cards.length,
    clicksToEnd: clicks,
    nextBtnDisabled: nextBtn.disabled,
    lastCardFullyVisible
  };
});

if (wiTest.error) {
  console.log(`  ${wiTest.error}`);
} else {
  console.log(`  Total cards: ${wiTest.totalCards}`);
  console.log(`  Clicks to reach end: ${wiTest.clicksToEnd}`);
  console.log(`  Next button disabled at end: ${wiTest.nextBtnDisabled}`);
  console.log(`  Last card fully visible: ${wiTest.lastCardFullyVisible}`);
}

await browser.close();
