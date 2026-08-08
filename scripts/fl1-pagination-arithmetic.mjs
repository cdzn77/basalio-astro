import { chromium } from 'playwright';

const VIEWPORTS = [
  { width: 1280, height: 900, name: '1280px' },
  { width: 1920, height: 900, name: '1920px' }
];

async function testPaginationArithmetic(browser, viewport) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // ASSERT viewport
  const actualWidth = await page.evaluate(() => window.innerWidth);
  if (actualWidth !== viewport.width) {
    console.error(`  ✗ Viewport mismatch: requested ${viewport.width}, got ${actualWidth}`);
    await page.close();
    return null;
  }

  // FL1.2 - Get totalPages and cardsPerView
  const initialState = await page.evaluate(() => {
    const blocksViewport = document.querySelector('.carousel-viewport');
    const blocksCards = document.querySelectorAll('.block-card');
    const blocksTrack = document.querySelector('.carousel-track');

    const cardWidth = blocksCards[0]?.offsetWidth || 0;
    const gap = 20;
    const cardsPerView = Math.max(1, Math.floor((blocksViewport.offsetWidth + gap) / (cardWidth + gap)));
    const totalPages = Math.max(1, Math.ceil(blocksCards.length / Math.max(1, cardsPerView)));

    return {
      cardsPerView,
      totalPages,
      totalCards: blocksCards.length,
      cardWidth,
      viewportWidth: blocksViewport.offsetWidth,
      trackTransform: window.getComputedStyle(blocksTrack).transform
    };
  });

  console.log(`\n  BlocksCarousel @ ${viewport.name}:`);
  console.log(`    Total cards: ${initialState.totalCards}`);
  console.log(`    Card width: ${initialState.cardWidth}px, Viewport: ${initialState.viewportWidth}px`);
  console.log(`    cardsPerView: ${initialState.cardsPerView}`);
  console.log(`    totalPages: ${initialState.totalPages} (cards.length / cardsPerView = ${initialState.totalCards} / ${initialState.cardsPerView})`);
  console.log(`    Initial transform: ${initialState.trackTransform}`);

  // FL1.1 & FL1.3 - Click next repeatedly until button disables
  const transforms = [initialState.trackTransform];
  const nextButtonStates = [];
  let pageNum = 0;

  console.log(`\n  Pagination sequence:`);
  console.log(`    Page ${pageNum}: ${initialState.trackTransform}`);

  for (let i = 0; i < initialState.totalPages + 2; i++) {
    // Check if next button is enabled
    const btnState = await page.evaluate(() => {
      const nextBtn = document.querySelector('.carousel-button-next');
      return {
        disabled: nextBtn?.disabled || false,
        ariaDisabled: nextBtn?.getAttribute('aria-disabled')
      };
    });

    nextButtonStates.push(btnState);

    if (btnState.disabled) {
      console.log(`    → Next button disabled at page ${pageNum}`);
      break;
    }

    // Click next
    await page.click('.carousel-button-next');
    await page.waitForTimeout(300);
    pageNum++;

    // Get transform
    const state = await page.evaluate(() => {
      const track = document.querySelector('.carousel-track');
      const cards = document.querySelectorAll('.block-card');
      const viewport = document.querySelector('.carousel-viewport');

      const transform = window.getComputedStyle(track).transform;

      // Check if last card is visible
      const lastCard = cards[cards.length - 1];
      const lastCardRect = lastCard?.getBoundingClientRect();
      const vpRect = viewport?.getBoundingClientRect();

      const lastCardVisible = lastCardRect &&
        lastCardRect.left >= vpRect.left &&
        lastCardRect.right <= vpRect.right;

      return {
        transform,
        lastCardFullyVisible: lastCardVisible
      };
    });

    transforms.push(state.transform);
    console.log(`    Page ${pageNum}: ${state.transform} ${state.lastCardFullyVisible ? '(last card visible)' : '(last card NOT visible)'}`);
  }

  // WhoItsFor
  const whoState = await page.evaluate(() => {
    const whoViewport = document.querySelector('.carousel-viewport-v2');
    const whoCards = document.querySelectorAll('.testimonial-card-v2');
    const whoTrack = document.querySelector('.carousel-track-v2');

    const cardWidth = whoCards[0]?.offsetWidth || 0;
    const gap = 20;
    const cardsPerView = Math.max(1, Math.floor((whoViewport.offsetWidth + gap) / (cardWidth + gap)));
    const totalPages = Math.max(1, Math.ceil(whoCards.length / Math.max(1, cardsPerView)));

    return {
      cardsPerView,
      totalPages,
      totalCards: whoCards.length,
      cardWidth,
      viewportWidth: whoViewport.offsetWidth
    };
  });

  console.log(`\n  WhoItsFor @ ${viewport.name}:`);
  console.log(`    Total cards: ${whoState.totalCards}`);
  console.log(`    Card width: ${whoState.cardWidth}px, Viewport: ${whoState.viewportWidth}px`);
  console.log(`    cardsPerView: ${whoState.cardsPerView}`);
  console.log(`    totalPages: ${whoState.totalPages} (cards.length / cardsPerView = ${whoState.totalCards} / ${whoState.cardsPerView})`);

  // Analyze pagination model
  console.log(`\n  Pagination analysis:`);
  console.log(`    Model: totalPages = ceil(${initialState.totalCards} / ${initialState.cardsPerView}) = ${initialState.totalPages}`);
  console.log(`    Steps needed to reach last card: ${initialState.totalCards - initialState.cardsPerView + 1}`);
  console.log(`    Pages calculated by code: ${initialState.totalPages}`);
  const modelMatch = initialState.totalPages === (initialState.totalCards - initialState.cardsPerView + 1) ? 'ceil(cards/cardsPerView)' : 'cards - cardsPerView + 1';
  console.log(`    Model used: ${modelMatch}`);

  // Calculate expected step size per page
  const expectedStep = (initialState.cardWidth + 20) * initialState.cardsPerView;
  console.log(`    Expected step per page: ${expectedStep}px (${initialState.cardWidth} + 20) × ${initialState.cardsPerView}`);

  // Check actual steps
  if (transforms.length > 1) {
    console.log(`    Actual steps taken:`);
    for (let i = 1; i < Math.min(4, transforms.length); i++) {
      const before = transforms[i - 1];
      const after = transforms[i];
      // Extract translateX value from matrix
      const beforeMatch = before.match(/-?\d+/g);
      const afterMatch = after.match(/-?\d+/g);
      const beforeX = beforeMatch ? parseInt(beforeMatch[beforeMatch.length - 2]) : 0;
      const afterX = afterMatch ? parseInt(afterMatch[afterMatch.length - 2]) : 0;
      const step = Math.abs(afterX - beforeX);
      console.log(`      Step ${i}: ${step}px ${step === expectedStep ? '✓' : '✗'}`);
    }
  }

  await page.close();

  return { viewport: viewport.name, initialState, whoState, transforms, nextButtonStates };
}

async function main() {
  const browser = await chromium.launch();

  console.log('\n' + '='.repeat(80));
  console.log('FL1 — Pagination Arithmetic Verification');
  console.log('='.repeat(80));

  for (const viewport of VIEWPORTS) {
    const result = await testPaginationArithmetic(browser, viewport);
    if (!result) continue;
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log('Summary: Verify totalPages calculation matches actual stepping behavior');
  console.log('='.repeat(80));

  await browser.close();
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
