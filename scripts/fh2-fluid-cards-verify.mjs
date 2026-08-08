import { chromium } from 'playwright';

const VIEWPORTS = [
  { width: 1280, height: 900, name: '1280px' },
  { width: 1440, height: 900, name: '1440px' },
  { width: 1920, height: 900, name: '1920px' }
];

async function measureFluidCards(browser, viewport) {
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

  const measurements = await page.evaluate(() => {
    // BlocksCarousel fluid card measurements
    const blocksViewport = document.querySelector('.carousel-viewport');
    const blocksCards = document.querySelectorAll('.block-card');
    const blocksCSSVar = window.getComputedStyle(blocksViewport).getPropertyValue('--card-w').trim();

    let blocksData = null;
    if (blocksViewport && blocksCards.length > 0) {
      const firstCard = blocksCards[0];
      const firstCardWidth = firstCard.offsetWidth;
      const secondCard = blocksCards[1];
      const secondCardWidth = secondCard ? secondCard.offsetWidth : 0;

      // Calculate visible cards per viewport
      const cardsPerView = Math.floor(blocksViewport.offsetWidth / (firstCardWidth + 20));

      blocksData = {
        viewportWidth: blocksViewport.offsetWidth,
        cssVar: blocksCSSVar,
        firstCardWidth: firstCardWidth,
        secondCardWidth: secondCardWidth,
        cardsPerView: cardsPerView,
        cardsVisible: cardsPerView,
        partialCard: blocksViewport.offsetWidth % (firstCardWidth + 20) > 0 ? true : false
      };
    }

    // WhoItsFor fluid card measurements
    const whoViewport = document.querySelector('.carousel-viewport-v2');
    const whoCards = document.querySelectorAll('.testimonial-card-v2');
    const whoCSSVar = window.getComputedStyle(whoViewport).getPropertyValue('--card-w').trim();

    let whoData = null;
    if (whoViewport && whoCards.length > 0) {
      const firstCard = whoCards[0];
      const firstCardWidth = firstCard.offsetWidth;
      const secondCard = whoCards[1];
      const secondCardWidth = secondCard ? secondCard.offsetWidth : 0;

      const cardsPerView = Math.floor(whoViewport.offsetWidth / (firstCardWidth + 20));

      whoData = {
        viewportWidth: whoViewport.offsetWidth,
        cssVar: whoCSSVar,
        firstCardWidth: firstCardWidth,
        secondCardWidth: secondCardWidth,
        cardsPerView: cardsPerView,
        cardsVisible: cardsPerView,
        partialCard: whoViewport.offsetWidth % (firstCardWidth + 20) > 0 ? true : false
      };
    }

    return { blocksCarousel: blocksData, whoItsFor: whoData };
  });

  await page.close();
  return { viewport: viewport.name, measurements };
}

async function main() {
  const browser = await chromium.launch();

  console.log('\n' + '='.repeat(70));
  console.log('FH2 — Fluid Card Sizing Verification');
  console.log('='.repeat(70));

  for (const viewport of VIEWPORTS) {
    console.log(`\nViewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
    const result = await measureFluidCards(browser, viewport);

    if (!result) {
      console.log('  ✗ Viewport assertion failed');
      continue;
    }

    const { measurements } = result;

    // BlocksCarousel
    if (measurements.blocksCarousel) {
      const bc = measurements.blocksCarousel;
      console.log(`  BlocksCarousel:`);
      console.log(`    Viewport width: ${bc.viewportWidth}px`);
      console.log(`    CSS var --card-w: ${bc.cssVar}`);
      console.log(`    First card width: ${bc.firstCardWidth}px`);
      console.log(`    Second card width: ${bc.secondCardWidth}px`);
      console.log(`    Cards per view: ${bc.cardsPerView}`);
      console.log(`    Partial card visible: ${bc.partialCard ? '✗ YES (should be NO)' : '✓ NO'}`);

      // Verify no partial cards
      if (bc.partialCard) {
        console.log(`    ✗ FAILURE: Partial card visible at ${viewport.name}`);
      } else if (bc.cardsPerView > 2) {
        console.log(`    ✗ WARNING: More than 2 cards per view (${bc.cardsPerView})`);
      } else {
        console.log(`    ✓ PASS`);
      }
    }

    // WhoItsFor
    if (measurements.whoItsFor) {
      const wi = measurements.whoItsFor;
      console.log(`  WhoItsFor:`);
      console.log(`    Viewport width: ${wi.viewportWidth}px`);
      console.log(`    CSS var --card-w: ${wi.cssVar}`);
      console.log(`    First card width: ${wi.firstCardWidth}px`);
      console.log(`    Second card width: ${wi.secondCardWidth}px`);
      console.log(`    Cards per view: ${wi.cardsPerView}`);
      console.log(`    Partial card visible: ${wi.partialCard ? '✗ YES (should be NO)' : '✓ NO'}`);

      if (wi.partialCard) {
        console.log(`    ✗ FAILURE: Partial card visible at ${viewport.name}`);
      } else if (wi.cardsPerView > 2) {
        console.log(`    ✗ WARNING: More than 2 cards per view (${wi.cardsPerView})`);
      } else {
        console.log(`    ✓ PASS`);
      }
    }
  }

  console.log(`\n${'='.repeat(70)}`);

  await browser.close();
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
