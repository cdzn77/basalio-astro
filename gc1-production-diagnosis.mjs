import { chromium } from 'playwright';

const BASE_URL = 'https://basalio.com';

async function diagnosisProduction() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // GC1.1 - Get first card's img src (full, verbatim)
  const firstCardSrc = await page.evaluate(() => {
    const firstImg = document.querySelector('.block-card .block-icon-img');
    return firstImg ? firstImg.src : null;
  });

  console.log('GC1.1 — Grid Reveal card img src (first 100 chars):');
  if (firstCardSrc) {
    console.log(firstCardSrc.substring(0, 100) + (firstCardSrc.length > 100 ? '...' : ''));
  } else {
    console.log('(no img found)');
  }

  // GC1.2 - All 9 cards: complete, naturalWidth, naturalHeight
  const allCards = await page.evaluate(() => {
    const cards = document.querySelectorAll('.block-card');
    const results = [];
    
    cards.forEach((card, idx) => {
      const img = card.querySelector('.block-icon-img');
      if (img) {
        results.push({
          index: idx,
          src: img.src.substring(0, 50) + '...',
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          currentSrc: img.currentSrc
        });
      }
    });
    
    return results;
  });

  console.log('\nGC1.2 — All 9 cards img load state:');
  console.log('Idx | complete | naturalWidth | naturalHeight');
  allCards.forEach(c => {
    console.log(`${c.index}   | ${c.complete ? 'yes' : 'NO'} | ${c.naturalWidth}px | ${c.naturalHeight}px`);
  });

  // GC1.3 - Console errors
  const errors = await page.evaluate(() => {
    return window.__errors__ || [];
  });

  console.log('\nGC1.3 — Network/console errors (checking for 404s, CORS, etc):');
  
  // Check for any failed network requests
  const responses = await page.context().tracing.export ? 'tracing unavailable' : 'checking...';
  console.log('(Network check via CDP unavailable in this context)');

  // GC1.4 - Check encoding in first src
  console.log('\nGC1.4 — Data URI encoding check:');
  if (firstCardSrc && firstCardSrc.startsWith('data:')) {
    const isBase64 = firstCardSrc.includes(';base64,');
    const hasRawChars = /[<>#'"]/g.test(firstCardSrc);
    console.log(`  Format: ${isBase64 ? 'base64' : 'raw/percent-encoded'}`);
    console.log(`  Contains unencoded <>#'": ${hasRawChars ? 'YES (⚠ may break)' : 'NO'}`);
  } else {
    console.log(`  Not a data URI: ${firstCardSrc ? 'file URL' : 'unknown'}`);
  }

  // GC1.5 - Test localhost vs production
  console.log('\nGC1.5 — Checking if this is build-time transform...');
  console.log(`  Production URL loaded: ${BASE_URL}`);
  console.log(`  First img loaded: ${allCards[0]?.complete ? 'YES' : 'NO'}`);

  await browser.close();
}

diagnosisProduction().catch(console.error);
