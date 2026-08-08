import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { width: 1280, height: 900, name: '1280px' },
  { width: 1440, height: 900, name: '1440px' },
  { width: 1920, height: 900, name: '1920px' },
  { width: 375, height: 667, name: '375px-mobile' }
];

const SCREENSHOT_DIR = '/Users/angelomanzanojr/Desktop/basalio-screenshots';

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

  // FK1.1 - Inject code to log cardsPerView calculation
  const measurements = await page.evaluate(() => {
    // BlocksCarousel
    const blocksViewport = document.querySelector('.carousel-viewport');
    const blocksTrack = document.querySelector('.carousel-track');
    const blocksCards = document.querySelectorAll('.block-card');

    let blocksData = null;
    if (blocksViewport && blocksCards.length > 0) {
      const cardWidth = blocksCards[0].offsetWidth;
      const gap = 20; // hardcoded in CSS

      // Calculate cardsPerView using the FIXED formula
      const cardsPerView = Math.max(1, Math.floor((blocksViewport.offsetWidth + gap) / (cardWidth + gap)));

      // FK1.2 - Check which cards fully intersect (no partial)
      const firstCardRect = blocksCards[0].getBoundingClientRect();
      const secondCardRect = blocksCards[1] ? blocksCards[1].getBoundingClientRect() : null;
      const thirdCardRect = blocksCards[2] ? blocksCards[2].getBoundingClientRect() : null;
      const viewportRect = blocksViewport.getBoundingClientRect();

      const fullyIntersects = (cardRect, vpRect) => {
        return cardRect &&
               cardRect.left >= vpRect.left &&
               cardRect.right <= vpRect.right &&
               cardRect.top >= vpRect.top &&
               cardRect.bottom <= vpRect.bottom;
      };

      const partiallyIntersects = (cardRect, vpRect) => {
        if (!cardRect) return false;
        const horizontalOverlap = !(cardRect.right < vpRect.left || cardRect.left > vpRect.right);
        const verticalOverlap = !(cardRect.bottom < vpRect.top || cardRect.top > vpRect.bottom);
        return horizontalOverlap && verticalOverlap;
      };

      blocksData = {
        viewportWidth: blocksViewport.offsetWidth,
        cardWidth: cardWidth,
        gap: gap,
        calculatedCardsPerView: cardsPerView,
        firstCardFullyIntersects: fullyIntersects(firstCardRect, viewportRect),
        firstCardPartiallyIntersects: partiallyIntersects(firstCardRect, viewportRect),
        secondCardFullyIntersects: secondCardRect ? fullyIntersects(secondCardRect, viewportRect) : false,
        secondCardPartiallyIntersects: secondCardRect ? partiallyIntersects(secondCardRect, viewportRect) : false,
        thirdCardPartiallyIntersects: thirdCardRect ? partiallyIntersects(thirdCardRect, viewportRect) : false,
        trackTransformBefore: window.getComputedStyle(blocksTrack).transform
      };
    }

    // WhoItsFor
    const whoViewport = document.querySelector('.carousel-viewport-v2');
    const whoTrack = document.querySelector('.carousel-track-v2');
    const whoCards = document.querySelectorAll('.testimonial-card-v2');

    let whoData = null;
    if (whoViewport && whoCards.length > 0) {
      const cardWidth = whoCards[0].offsetWidth;
      const gap = 20;

      const cardsPerView = Math.max(1, Math.floor((whoViewport.offsetWidth + gap) / (cardWidth + gap)));

      const firstCardRect = whoCards[0].getBoundingClientRect();
      const secondCardRect = whoCards[1] ? whoCards[1].getBoundingClientRect() : null;
      const thirdCardRect = whoCards[2] ? whoCards[2].getBoundingClientRect() : null;
      const viewportRect = whoViewport.getBoundingClientRect();

      const fullyIntersects = (cardRect, vpRect) => {
        return cardRect &&
               cardRect.left >= vpRect.left &&
               cardRect.right <= vpRect.right &&
               cardRect.top >= vpRect.top &&
               cardRect.bottom <= vpRect.bottom;
      };

      const partiallyIntersects = (cardRect, vpRect) => {
        if (!cardRect) return false;
        const horizontalOverlap = !(cardRect.right < vpRect.left || cardRect.left > vpRect.right);
        const verticalOverlap = !(cardRect.bottom < vpRect.top || cardRect.top > vpRect.bottom);
        return horizontalOverlap && verticalOverlap;
      };

      whoData = {
        viewportWidth: whoViewport.offsetWidth,
        cardWidth: cardWidth,
        gap: gap,
        calculatedCardsPerView: cardsPerView,
        firstCardFullyIntersects: fullyIntersects(firstCardRect, viewportRect),
        firstCardPartiallyIntersects: partiallyIntersects(firstCardRect, viewportRect),
        secondCardFullyIntersects: secondCardRect ? fullyIntersects(secondCardRect, viewportRect) : false,
        secondCardPartiallyIntersects: secondCardRect ? partiallyIntersects(secondCardRect, viewportRect) : false,
        thirdCardPartiallyIntersects: thirdCardRect ? partiallyIntersects(thirdCardRect, viewportRect) : false,
        trackTransformBefore: window.getComputedStyle(whoTrack).transform
      };
    }

    return { blocksCarousel: blocksData, whoItsFor: whoData };
  });

  // FK1.3 - Click next and measure transform change
  const transformBefore = {
    blocks: measurements.blocksCarousel?.trackTransformBefore || 'none',
    who: measurements.whoItsFor?.trackTransformBefore || 'none'
  };

  await page.click('.carousel-button-next');
  await page.waitForTimeout(300);

  const transformAfter = await page.evaluate(() => {
    const blocksTrack = document.querySelector('.carousel-track');
    const whoTrack = document.querySelector('.carousel-track-v2');
    return {
      blocks: blocksTrack ? window.getComputedStyle(blocksTrack).transform : 'none',
      who: whoTrack ? window.getComputedStyle(whoTrack).transform : 'none'
    };
  });

  // Take screenshots for 1280 and 1920
  if (viewport.width === 1280 || viewport.width === 1920) {
    const screenshotPath = path.join(SCREENSHOT_DIR, `FK1-${viewport.name}-carousels.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Screenshot: ${screenshotPath}`);
  }

  await page.close();

  return {
    viewport: viewport.name,
    measurements,
    transformBefore,
    transformAfter
  };
}

async function main() {
  const browser = await chromium.launch();

  console.log('\n' + '='.repeat(80));
  console.log('FK1 — CardsPerView Calculation Verification (Gap Fix)');
  console.log('='.repeat(80));

  for (const viewport of VIEWPORTS) {
    console.log(`\nViewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
    const result = await measureCardsPerView(browser, viewport);

    if (!result) {
      console.log('  ✗ Viewport assertion failed');
      continue;
    }

    const { measurements, transformBefore, transformAfter } = result;

    // FK1.1 - CardsPerView calculation
    if (measurements.blocksCarousel) {
      const bc = measurements.blocksCarousel;
      const isDesktop = viewport.width >= 1280;
      const expectedCardsPerView = isDesktop ? 2 : 1;
      const pass = bc.calculatedCardsPerView === expectedCardsPerView;

      console.log(`  BlocksCarousel:`);
      console.log(`    Viewport: ${bc.viewportWidth}px, Card: ${bc.cardWidth}px, Gap: ${bc.gap}px`);
      console.log(`    Calculated cardsPerView: ${bc.calculatedCardsPerView} ${pass ? '✓' : '✗'} (expect ${expectedCardsPerView})`);

      // FK1.2 - Card intersection (no partials)
      console.log(`    Card 1: Fully intersects: ${bc.firstCardFullyIntersects ? '✓' : '✗'} (partial: ${bc.firstCardPartiallyIntersects ? 'YES' : 'NO'})`);
      if (bc.secondCardPartiallyIntersects) {
        console.log(`    Card 2: Fully intersects: ${bc.secondCardFullyIntersects ? '✓' : '✗'} (partial: YES ${bc.thirdCardPartiallyIntersects ? '- Card 3 also partial!' : '- Card 3 not visible'})`);
      }

      const noPartialAtRight = isDesktop ? !bc.thirdCardPartiallyIntersects : true;
      console.log(`    No partial at right edge: ${noPartialAtRight ? '✓' : '✗'}`);
    }

    if (measurements.whoItsFor) {
      const wi = measurements.whoItsFor;
      const isDesktop = viewport.width >= 1280;
      const expectedCardsPerView = isDesktop ? 2 : 1;
      const pass = wi.calculatedCardsPerView === expectedCardsPerView;

      console.log(`  WhoItsFor:`);
      console.log(`    Viewport: ${wi.viewportWidth}px, Card: ${wi.cardWidth}px, Gap: ${wi.gap}px`);
      console.log(`    Calculated cardsPerView: ${wi.calculatedCardsPerView} ${pass ? '✓' : '✗'} (expect ${expectedCardsPerView})`);

      console.log(`    Card 1: Fully intersects: ${wi.firstCardFullyIntersects ? '✓' : '✗'} (partial: ${wi.firstCardPartiallyIntersects ? 'YES' : 'NO'})`);
      if (wi.secondCardPartiallyIntersects) {
        console.log(`    Card 2: Fully intersects: ${wi.secondCardFullyIntersects ? '✓' : '✗'} (partial: YES ${wi.thirdCardPartiallyIntersects ? '- Card 3 also partial!' : '- Card 3 not visible'})`);
      }

      const noPartialAtRight = isDesktop ? !wi.thirdCardPartiallyIntersects : true;
      console.log(`    No partial at right edge: ${noPartialAtRight ? '✓' : '✗'}`);
    }

    // FK1.3 - Transform before/after
    if (viewport.width >= 1280) {
      console.log(`  Navigation (next button):`);
      console.log(`    BlocksCarousel before: ${transformBefore.blocks}`);
      console.log(`    BlocksCarousel after:  ${transformAfter.blocks}`);

      if (measurements.blocksCarousel) {
        const bc = measurements.blocksCarousel;
        const expectedOffset = (bc.cardWidth + bc.gap) * 2;
        console.log(`    Expected offset: -${expectedOffset}px (${bc.cardWidth} + ${bc.gap}) × 2`);
      }

      console.log(`    WhoItsFor before: ${transformBefore.who}`);
      console.log(`    WhoItsFor after:  ${transformAfter.who}`);

      if (measurements.whoItsFor) {
        const wi = measurements.whoItsFor;
        const expectedOffset = (wi.cardWidth + wi.gap) * 2;
        console.log(`    Expected offset: -${expectedOffset}px (${wi.cardWidth} + ${wi.gap}) × 2`);
      }
    }
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log('Summary: All desktop viewports should show cardsPerView = 2, no partials at edge');
  console.log('='.repeat(80));

  await browser.close();
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
