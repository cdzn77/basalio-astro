import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

console.log('=== PATTERN LOG ITEM VERIFICATION ===\n');

// ITEM 1: Mobile breakpoint carousel collapse (375px, 320px)
console.log('ITEM 1: Mobile Carousel Collapse Test');
console.log('------------------------------------');

for (const w of [375, 320]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const measurements = await page.evaluate(() => {
    const leftCol = document.querySelector('.courses-left');
    const viewport = document.querySelector('.carousel-viewport');
    
    if (!leftCol || !viewport) {
      return { leftCol: 'NOT FOUND', viewport: 'NOT FOUND', rendered: false };
    }

    const leftColWidth = window.getComputedStyle(leftCol).width;
    const viewportWidth = window.getComputedStyle(viewport).width;
    const leftColDisplay = window.getComputedStyle(leftCol).display;
    const viewportDisplay = window.getComputedStyle(viewport).display;

    return {
      leftColWidth,
      leftColDisplay,
      viewportWidth,
      viewportDisplay,
      rendered: leftColDisplay !== 'none' && viewportDisplay !== 'none'
    };
  });

  console.log(`${w}px:`);
  console.log(`  .courses-left: ${measurements.leftColWidth} (display: ${measurements.leftColDisplay})`);
  console.log(`  .carousel-viewport: ${measurements.viewportWidth} (display: ${measurements.viewportDisplay})`);
  console.log(`  Carousel renders: ${measurements.rendered}`);
}

// ITEM 2: Heading line-count regression at 1280-1440px
console.log('\nITEM 2: Heading Line-Count Test');
console.log('--------------------------------');

for (const w of [1280, 1360, 1440]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const headingData = await page.evaluate(() => {
    // Find the "Nine blocks. Nothing you don't need." heading
    const headings = document.querySelectorAll('h1, h2, h3');
    let targetHeading = null;
    
    for (const h of headings) {
      if (h.textContent.includes('Nine blocks') && h.textContent.includes("don't need")) {
        targetHeading = h;
        break;
      }
    }

    if (!targetHeading) {
      return { found: false };
    }

    const computed = window.getComputedStyle(targetHeading);
    const lineHeight = parseFloat(computed.lineHeight);
    const height = targetHeading.offsetHeight;
    const estimatedLines = Math.round(height / lineHeight);

    return {
      found: true,
      tagName: targetHeading.tagName,
      text: targetHeading.textContent.substring(0, 50),
      height: `${height}px`,
      lineHeight: `${computed.lineHeight}`,
      estimatedLines,
      fontSize: computed.fontSize
    };
  });

  console.log(`${w}px:`);
  if (headingData.found) {
    console.log(`  Tag: ${headingData.tagName}`);
    console.log(`  Height: ${headingData.height}, Line-height: ${headingData.lineHeight}`);
    console.log(`  Estimated lines: ${headingData.estimatedLines}`);
    console.log(`  Font-size: ${headingData.fontSize}`);
  } else {
    console.log('  Heading not found');
  }
}

// ITEM 4: 1440px waste (current 500px)
console.log('\nITEM 4: 1440px Card Display Test');
console.log('--------------------------------');

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const currentState = await page.evaluate(() => {
  const leftCol = document.querySelector('.courses-left');
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-track > *');

  if (!leftCol || !viewport || !track || cards.length === 0) {
    return { error: 'Elements not found' };
  }

  const leftColWidth = parseInt(window.getComputedStyle(leftCol).width);
  const viewportWidth = parseInt(window.getComputedStyle(viewport).width);
  const trackWidth = parseInt(window.getComputedStyle(track).width);
  const containerWidth = parseInt(window.getComputedStyle(viewport.parentElement).width);
  
  // Get card width from first card
  const cardWidth = cards[0] ? parseInt(window.getComputedStyle(cards[0]).width) : 0;
  
  // Get gap from track
  const gap = parseInt(window.getComputedStyle(track).gap) || 0;
  
  // Calculate cardsPerView from viewport
  const cardsPerView = Math.max(1, Math.floor((viewportWidth + gap) / (cardWidth + gap)));
  
  // Calculate leftover space
  const usedWidth = leftColWidth + viewportWidth;
  const totalAvailable = containerWidth;
  const leftover = totalAvailable - usedWidth;

  return {
    leftColWidth,
    viewportWidth,
    cardWidth,
    gap,
    cardsPerView,
    leftover,
    trackWidth,
    totalCards: cards.length,
    containerWidth
  };
});

console.log('CURRENT STATE (500px left column):');
if (currentState.error) {
  console.log(`  Error: ${currentState.error}`);
} else {
  console.log(`  .courses-left: ${currentState.leftColWidth}px`);
  console.log(`  .carousel-viewport: ${currentState.viewportWidth}px`);
  console.log(`  Card width: ${currentState.cardWidth}px`);
  console.log(`  Gap: ${currentState.gap}px`);
  console.log(`  cardsPerView: ${currentState.cardsPerView}`);
  console.log(`  Leftover space: ${currentState.leftover}px`);
  console.log(`  Total cards: ${currentState.totalCards}`);
}

await browser.close();
