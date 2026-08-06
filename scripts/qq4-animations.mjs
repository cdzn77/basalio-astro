import { chromium } from 'playwright';

async function qq4() {
  const browser = await chromium.launch({ headless: true });

  // Test 1: Staggered animation on grid-reveal-demo
  console.log('QQ4: Grid-reveal-demo animations\n');
  
  const page1 = await browser.newPage({ viewport: { width: 375, height: 2000 } });
  await page1.goto('http://localhost:4322/blocks#grid-reveal', { waitUntil: 'networkidle' });
  await page1.waitForTimeout(1000);

  const animData = await page1.evaluate(() => {
    const tiles = Array.from(document.querySelectorAll('.grid-tile'));
    return {
      totalTiles: tiles.length,
      tilesWithAnimation: tiles.filter(t => t.classList.contains('is-revealed')).length,
      tilesWithStagger: tiles
        .filter(t => t.classList.contains('is-revealed'))
        .slice(0, 3)
        .map((t, idx) => ({
          index: idx,
          animationDelay: window.getComputedStyle(t).animationDelay
        }))
    };
  });

  console.log(`Grid tiles found: ${animData.totalTiles}`);
  console.log(`Tiles with is-revealed class: ${animData.tilesWithAnimation}`);
  console.log(`\nStagger delays (first 3 revealed tiles):`);
  animData.tilesWithStagger.forEach(t => {
    console.log(`  Tile ${t.index}: ${t.animationDelay}`);
  });
  console.log(`Status: ${animData.tilesWithAnimation > 0 ? '✅ Animation applies' : '❌ No animation'}`);

  await page1.close();

  // Test 2: prefers-reduced-motion suppression
  console.log('\n\nQQ4: prefers-reduced-motion behavior\n');
  
  const page2 = await browser.newPage({ 
    viewport: { width: 375, height: 2000 },
    reducedMotion: 'reduce'
  });
  await page2.goto('http://localhost:4322/blocks#grid-reveal', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(1000);

  const reducedMotionData = await page2.evaluate(() => {
    const tiles = Array.from(document.querySelectorAll('.grid-tile'));
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return {
      prefersReducedMotion: mediaQuery,
      tilesRevealed: tiles.filter(t => t.classList.contains('is-revealed')).length,
      firstTileAnimation: window.getComputedStyle(tiles[0]).animation || 'none'
    };
  });

  console.log(`User prefers reduced motion: ${reducedMotionData.prefersReducedMotion ? '✅ YES' : '❌ NO'}`);
  console.log(`Tiles revealed with reduced motion: ${reducedMotionData.tilesRevealed}`);
  console.log(`First tile animation property: ${reducedMotionData.firstTileAnimation}`);
  console.log(`Status: ${reducedMotionData.prefersReducedMotion ? '✅ Reduced motion detected' : 'N/A'}`);

  await page2.close();
  await browser.close();
}

qq4().catch(err => console.error(err.message));
