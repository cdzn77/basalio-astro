import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const DESKTOP_VIEWPORTS = [
  { width: 1280, height: 900, name: '1280px' },
  { width: 1440, height: 900, name: '1440px' },
  { width: 1920, height: 900, name: '1920px' }
];

const SCREENSHOT_DIR = '/Users/angelomanzanojr/Desktop/basalio-screenshots';

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function measureCardsPerView(browser, viewport) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // ASSERT viewport width
  const actualWidth = await page.evaluate(() => window.innerWidth);
  if (actualWidth !== viewport.width) {
    console.error(`  ✗ Viewport mismatch: requested ${viewport.width}, got ${actualWidth}`);
    await page.close();
    return null;
  }

  // FJ1.1 - Measure cardsPerView and card widths
  const measurements = await page.evaluate(() => {
    const blocksViewport = document.querySelector('.carousel-viewport');
    const blocksTrack = document.querySelector('.carousel-track');
    const blocksCards = document.querySelectorAll('.block-card');

    let blocksData = null;
    if (blocksViewport && blocksTrack && blocksCards.length > 3) {
      // Get computed cardsPerView from track element (hack: check how many cards fit)
      const firstCard = blocksCards[0];
      const secondCard = blocksCards[1];
      const thirdCard = blocksCards[2];

      const firstCardRect = firstCard.getBoundingClientRect();
      const secondCardRect = secondCard.getBoundingClientRect();
      const thirdCardRect = thirdCard.getBoundingClientRect();
      const viewportRect = blocksViewport.getBoundingClientRect();

      // Check which cards intersect viewport
      const intersectsViewport = (cardRect) => {
        return !(cardRect.right < viewportRect.left ||
                 cardRect.left > viewportRect.right ||
                 cardRect.bottom < viewportRect.top ||
                 cardRect.top > viewportRect.bottom);
      };

      const cardsInViewport = [
        intersectsViewport(firstCardRect),
        intersectsViewport(secondCardRect),
        intersectsViewport(thirdCardRect)
      ].filter(v => v).length;

      blocksData = {
        viewportWidth: blocksViewport.offsetWidth,
        viewportHeight: blocksViewport.offsetHeight,
        firstCardWidth: firstCard.offsetWidth,
        secondCardWidth: secondCard.offsetWidth,
        cardsInViewport: cardsInViewport,
        firstCardIntersects: intersectsViewport(firstCardRect),
        secondCardIntersects: intersectsViewport(secondCardRect),
        thirdCardIntersects: intersectsViewport(thirdCardRect),
        trackTransform: window.getComputedStyle(blocksTrack).transform
      };
    }

    // WhoItsFor
    const whoViewport = document.querySelector('.carousel-viewport-v2');
    const whoTrack = document.querySelector('.carousel-track-v2');
    const whoCards = document.querySelectorAll('.testimonial-card-v2');

    let whoData = null;
    if (whoViewport && whoTrack && whoCards.length > 3) {
      const firstCard = whoCards[0];
      const secondCard = whoCards[1];
      const thirdCard = whoCards[2];

      const firstCardRect = firstCard.getBoundingClientRect();
      const secondCardRect = secondCard.getBoundingClientRect();
      const thirdCardRect = thirdCard.getBoundingClientRect();
      const viewportRect = whoViewport.getBoundingClientRect();

      const intersectsViewport = (cardRect) => {
        return !(cardRect.right < viewportRect.left ||
                 cardRect.left > viewportRect.right ||
                 cardRect.bottom < viewportRect.top ||
                 cardRect.top > viewportRect.bottom);
      };

      const cardsInViewport = [
        intersectsViewport(firstCardRect),
        intersectsViewport(secondCardRect),
        intersectsViewport(thirdCardRect)
      ].filter(v => v).length;

      whoData = {
        viewportWidth: whoViewport.offsetWidth,
        viewportHeight: whoViewport.offsetHeight,
        firstCardWidth: firstCard.offsetWidth,
        secondCardWidth: secondCard.offsetWidth,
        cardsInViewport: cardsInViewport,
        firstCardIntersects: intersectsViewport(firstCardRect),
        secondCardIntersects: intersectsViewport(secondCardRect),
        thirdCardIntersects: intersectsViewport(thirdCardRect),
        trackTransform: window.getComputedStyle(whoTrack).transform
      };
    }

    return { blocksCarousel: blocksData, whoItsFor: whoData };
  });

  // FJ1.2 - Click next button and measure transform change
  const transformBefore = measurements.blocksCarousel?.trackTransform || 'none';
  await page.click('.carousel-button-next');
  await page.waitForTimeout(300);

  const transformAfter = await page.evaluate(() => {
    const track = document.querySelector('.carousel-track');
    return window.getComputedStyle(track).transform;
  });

  // FJ1.3 - Test resize and card width change
  // Get initial state at this viewport
  const cardWidthBefore = measurements.blocksCarousel?.firstCardWidth || 0;

  // Resize to next viewport in sequence (if not at max)
  let cardWidthAfter = cardWidthBefore;
  let resizeWidth = null;
  if (viewport.width === 1280) {
    resizeWidth = 1920;
  } else if (viewport.width === 1440) {
    resizeWidth = 1920;
  }

  if (resizeWidth) {
    await page.setViewportSize({ width: resizeWidth, height: 900 });
    await page.waitForTimeout(500);

    cardWidthAfter = await page.evaluate(() => {
      const card = document.querySelector('.block-card');
      return card ? card.offsetWidth : 0;
    });
  }

  // FJ1.4 - Mobile check (375px)
  let mobileData = null;
  if (viewport.width === 1280) {
    const mobilePage = await browser.newPage();
    await mobilePage.setViewportSize({ width: 375, height: 667 });
    await mobilePage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    mobileData = await mobilePage.evaluate(() => {
      const viewport = document.querySelector('.carousel-viewport');
      const card = document.querySelector('.block-card');
      return {
        cardWidth: card ? card.offsetWidth : 0,
        viewportWidth: viewport ? viewport.offsetWidth : 0
      };
    });

    await mobilePage.close();
  }

  // Take screenshot for this viewport
  const screenshotPath = path.join(SCREENSHOT_DIR, `FJ1-${viewport.name}-carousel.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  await page.close();

  return {
    viewport: viewport.name,
    measurements,
    navigation: { before: transformBefore, after: transformAfter },
    resize: { cardWidthBefore, cardWidthAfter, resizedTo: resizeWidth },
    mobile: mobileData,
    screenshot: screenshotPath
  };
}

async function main() {
  const browser = await chromium.launch();

  console.log('\n' + '='.repeat(70));
  console.log('FJ1 — Off-by-One Gap Fix Verification');
  console.log('='.repeat(70));

  const results = [];

  for (const viewport of DESKTOP_VIEWPORTS) {
    console.log(`\nViewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
    const result = await measureCardsPerView(browser, viewport);

    if (!result) {
      console.log('  ✗ Viewport assertion failed');
      continue;
    }

    const { measurements, navigation, resize, mobile, screenshot } = result;

    // FJ1.1 - Cards per view
    if (measurements.blocksCarousel) {
      const bc = measurements.blocksCarousel;
      const pass = bc.cardsInViewport === 2;
      console.log(`  BlocksCarousel:`);
      console.log(`    Viewport width: ${bc.viewportWidth}px`);
      console.log(`    First card width: ${bc.firstCardWidth}px`);
      console.log(`    Second card width: ${bc.secondCardWidth}px`);
      console.log(`    Cards in viewport: ${bc.cardsInViewport} ${pass ? '✓' : '✗'} (should be 2)`);
      if (!pass) {
        console.log(`    Card 1: ${bc.firstCardIntersects ? '✓' : '✗'}`);
        console.log(`    Card 2: ${bc.secondCardIntersects ? '✓' : '✗'}`);
        console.log(`    Card 3: ${bc.thirdCardIntersects ? '✓' : '✗'}`);
      }
    }

    if (measurements.whoItsFor) {
      const wi = measurements.whoItsFor;
      const pass = wi.cardsInViewport === 2;
      console.log(`  WhoItsFor:`);
      console.log(`    Viewport width: ${wi.viewportWidth}px`);
      console.log(`    First card width: ${wi.firstCardWidth}px`);
      console.log(`    Second card width: ${wi.secondCardWidth}px`);
      console.log(`    Cards in viewport: ${wi.cardsInViewport} ${pass ? '✓' : '✗'} (should be 2)`);
      if (!pass) {
        console.log(`    Card 1: ${wi.firstCardIntersects ? '✓' : '✗'}`);
        console.log(`    Card 2: ${wi.secondCardIntersects ? '✓' : '✗'}`);
        console.log(`    Card 3: ${wi.thirdCardIntersects ? '✓' : '✗'}`);
      }
    }

    // FJ1.2 - Navigation
    console.log(`  Navigation (next button):`);
    console.log(`    Before: ${navigation.before}`);
    console.log(`    After:  ${navigation.after}`);
    const navChanged = navigation.before !== navigation.after;
    console.log(`    Changed: ${navChanged ? '✓' : '✗'}`);

    // FJ1.3 - Resize
    if (resize.resizedTo) {
      console.log(`  Resize (${viewport.name} → ${resize.resizedTo}px):`);
      console.log(`    Card width before: ${resize.cardWidthBefore}px`);
      console.log(`    Card width after: ${resize.cardWidthAfter}px`);
      const changed = resize.cardWidthBefore !== resize.cardWidthAfter;
      console.log(`    Changed: ${changed ? '✓' : '✗'}`);
    }

    // FJ1.4 - Mobile
    if (mobile) {
      console.log(`  Mobile (375px):`);
      console.log(`    Card width: ${mobile.cardWidth}px ${mobile.cardWidth === 280 ? '✓' : '✗'} (should be 280px)`);
      console.log(`    Viewport width: ${mobile.viewportWidth}px`);
    }

    console.log(`  Screenshot: ${screenshot}`);

    results.push(result);
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log('Summary');
  console.log('='.repeat(70));
  results.forEach(r => {
    const bcPass = r.measurements.blocksCarousel?.cardsInViewport === 2 ? '✓' : '✗';
    const wiPass = r.measurements.whoItsFor?.cardsInViewport === 2 ? '✓' : '✗';
    console.log(`${r.viewport}: BC ${bcPass}, WI ${wiPass}`);
  });

  await browser.close();
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
