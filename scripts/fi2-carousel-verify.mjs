import { chromium } from 'playwright';

const VIEWPORTS = [
  { width: 320, height: 667, name: '320px' },
  { width: 375, height: 667, name: '375px' },
  { width: 390, height: 844, name: '390px' },
  { width: 1280, height: 900, name: '1280px' },
  { width: 1440, height: 900, name: '1440px' }
];

async function measureCarousels(browser, viewport) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // ASSERT viewport width before measuring
  const actualWidth = await page.evaluate(() => window.innerWidth);
  if (actualWidth !== viewport.width) {
    console.error(`  ✗ Viewport mismatch: requested ${viewport.width}, got ${actualWidth}`);
    await page.close();
    return null;
  }

  const measurements = await page.evaluate(() => {
    // BlocksCarousel measurements
    const blocksViewport = document.querySelector('.carousel-viewport');
    const blocksTrack = document.querySelector('.carousel-track');
    const blocksCards = document.querySelectorAll('.block-card');

    let blocksData = null;
    if (blocksViewport && blocksTrack && blocksCards.length > 0) {
      const firstCardRect = blocksCards[0].getBoundingClientRect();
      const viewportRect = blocksViewport.getBoundingClientRect();

      // Check intersection: card top/bottom within viewport top/bottom AND card left/right within viewport left/right
      const horizontalIntersect = !(firstCardRect.right < viewportRect.left || firstCardRect.left > viewportRect.right);
      const verticalIntersect = !(firstCardRect.bottom < viewportRect.top || firstCardRect.top > viewportRect.bottom);
      const intersects = horizontalIntersect && verticalIntersect;

      blocksData = {
        viewportHeight: blocksViewport.offsetHeight,
        trackHeight: blocksTrack.offsetHeight,
        firstCardHeight: blocksCards[0].offsetHeight,
        cardCount: blocksCards.length,
        firstCardIntersects: intersects,
        trackPosition: window.getComputedStyle(blocksTrack).position
      };
    }

    // WhoItsFor measurements
    const whoViewport = document.querySelector('.carousel-viewport-v2');
    const whoTrack = document.querySelector('.carousel-track-v2');
    const whoCards = document.querySelectorAll('.testimonial-card-v2');

    let whoData = null;
    if (whoViewport && whoTrack && whoCards.length > 0) {
      const firstCardRect = whoCards[0].getBoundingClientRect();
      const viewportRect = whoViewport.getBoundingClientRect();

      const horizontalIntersect = !(firstCardRect.right < viewportRect.left || firstCardRect.left > viewportRect.right);
      const verticalIntersect = !(firstCardRect.bottom < viewportRect.top || firstCardRect.top > viewportRect.bottom);
      const intersects = horizontalIntersect && verticalIntersect;

      whoData = {
        viewportHeight: whoViewport.offsetHeight,
        trackHeight: whoTrack.offsetHeight,
        firstCardHeight: whoCards[0].offsetHeight,
        cardCount: whoCards.length,
        firstCardIntersects: intersects,
        trackPosition: window.getComputedStyle(whoTrack).position
      };
    }

    return { blocksCarousel: blocksData, whoItsFor: whoData };
  });

  // Test navigation if mobile
  let navTest = null;
  if (viewport.width <= 640) {
    const before = await page.evaluate(() => {
      const track = document.querySelector('.carousel-track');
      return track ? window.getComputedStyle(track).transform : 'none';
    });

    // Click next button
    await page.click('.carousel-button-next');
    await page.waitForTimeout(300);

    const after = await page.evaluate(() => {
      const track = document.querySelector('.carousel-track');
      return track ? window.getComputedStyle(track).transform : 'none';
    });

    navTest = { before, after, changed: before !== after };
  }

  // Screenshot at 375px
  if (viewport.width === 375) {
    const screenshotPath = `/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/d92a17ca-6d12-4225-bf9a-d7bb74af2faa/scratchpad/FI2-375px-carousels.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Screenshot: ${screenshotPath}`);
  }

  await page.close();
  return { viewport: viewport.name, measurements, navTest };
}

async function main() {
  const browser = await chromium.launch();
  const results = [];

  console.log('\n' + '='.repeat(70));
  console.log('FI2 — Carousel Visibility Verification with Playwright');
  console.log('='.repeat(70));

  for (const viewport of VIEWPORTS) {
    console.log(`\nViewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
    const result = await measureCarousels(browser, viewport);

    if (!result) {
      console.log('  ✗ Viewport assertion failed');
      continue;
    }

    const { measurements, navTest } = result;

    // FI2.1 - BlocksCarousel
    if (measurements.blocksCarousel) {
      const bc = measurements.blocksCarousel;
      const allPositive = bc.viewportHeight > 0 && bc.trackHeight > 0 && bc.firstCardHeight > 0;
      console.log(`  BlocksCarousel:`);
      console.log(`    Viewport height: ${bc.viewportHeight}px ${bc.viewportHeight > 0 ? '✓' : '✗'}`);
      console.log(`    Track height: ${bc.trackHeight}px ${bc.trackHeight > 0 ? '✓' : '✗'}`);
      console.log(`    First card height: ${bc.firstCardHeight}px ${bc.firstCardHeight > 0 ? '✓' : '✗'}`);
      console.log(`    Card count: ${bc.cardCount}`);
      console.log(`    Track position: ${bc.trackPosition}`);
      console.log(`    First card intersects viewport: ${bc.firstCardIntersects ? '✓' : '✗'}`);
      if (!allPositive || !bc.firstCardIntersects) {
        console.log(`    ✗ FAILURE: Not all dimensions > 0 or card not visible`);
      } else {
        console.log(`    ✓ PASS`);
      }
    }

    // FI2.1 - WhoItsFor
    if (measurements.whoItsFor) {
      const wi = measurements.whoItsFor;
      const allPositive = wi.viewportHeight > 0 && wi.trackHeight > 0 && wi.firstCardHeight > 0;
      console.log(`  WhoItsFor:`);
      console.log(`    Viewport height: ${wi.viewportHeight}px ${wi.viewportHeight > 0 ? '✓' : '✗'}`);
      console.log(`    Track height: ${wi.trackHeight}px ${wi.trackHeight > 0 ? '✓' : '✗'}`);
      console.log(`    First card height: ${wi.firstCardHeight}px ${wi.firstCardHeight > 0 ? '✓' : '✗'}`);
      console.log(`    Card count: ${wi.cardCount}`);
      console.log(`    Track position: ${wi.trackPosition}`);
      console.log(`    First card intersects viewport: ${wi.firstCardIntersects ? '✓' : '✗'}`);
      if (!allPositive || !wi.firstCardIntersects) {
        console.log(`    ✗ FAILURE: Not all dimensions > 0 or card not visible`);
      } else {
        console.log(`    ✓ PASS`);
      }
    }

    // FI2.3 - Navigation test
    if (navTest) {
      console.log(`  Navigation (next button):`);
      console.log(`    Before: ${navTest.before}`);
      console.log(`    After:  ${navTest.after}`);
      console.log(`    Changed: ${navTest.changed ? '✓' : '✗'}`);
    }

    results.push(result);
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log('SUMMARY');
  console.log('='.repeat(70));
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
