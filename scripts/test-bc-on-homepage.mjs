import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

async function testViewport(width) {
  const page = await browser.newPage();
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const result = await page.evaluate(async () => {
    const nextBtn = document.querySelector('.carousel-button-next');
    const track = document.querySelector('.carousel-track');
    const viewport = document.querySelector('.carousel-viewport');
    const cards = document.querySelectorAll('.block-card');

    if (!track || !nextBtn) {
      return { error: 'Track or next button not found' };
    }

    const transforms = [];
    let clicks = 0;
    const maxClicks = 20;

    while (!nextBtn.disabled && clicks < maxClicks) {
      const currentTransform = window.getComputedStyle(track).transform;
      transforms.push({ click: clicks, transform: currentTransform });
      nextBtn.click();
      clicks++;
      await new Promise(r => setTimeout(r, 100));
    }

    // Final state
    const lastCard = cards[cards.length - 1];
    const trackRect = track.getBoundingClientRect();
    const lastCardRect = lastCard.getBoundingClientRect();
    const lastCardFullyVisible = lastCardRect.right <= trackRect.right + 1;

    return {
      totalCards: cards.length,
      totalClicks: clicks,
      nextBtnDisabledAtEnd: nextBtn.disabled,
      lastCardFullyVisible,
      lastCardRight: Math.round(lastCardRect.right),
      trackRight: Math.round(trackRect.right),
      finalTransform: window.getComputedStyle(track).transform,
      transforms
    };
  });

  await page.close();
  return result;
}

for (const viewport of [1440, 1280, 1024]) {
  console.log(`\n${viewport}px viewport:`);
  const result = await testViewport(viewport);
  if (result.error) {
    console.log(`  ${result.error}`);
  } else {
    console.log(`  Total cards: ${result.totalCards}`);
    console.log(`  Clicks to reach end: ${result.totalClicks}`);
    console.log(`  Next button disabled at end: ${result.nextBtnDisabledAtEnd}`);
    console.log(`  Last card fully visible: ${result.lastCardFullyVisible}`);
    if (!result.lastCardFullyVisible) {
      console.log(`  Last card right edge: ${result.lastCardRight}px`);
      console.log(`  Track right edge: ${result.trackRight}px`);
      console.log(`  Overflow: ${result.lastCardRight - result.trackRight}px`);
    }
    console.log(`  Final transform: ${result.finalTransform}`);
    if (result.transforms.length > 0) {
      console.log(`  Transform progression (first 3 and last):`);
      result.transforms.slice(0, 3).forEach(t => {
        console.log(`    Click ${t.click}: ${t.transform}`);
      });
      if (result.transforms.length > 3) {
        console.log(`    ...`);
        const last = result.transforms[result.transforms.length - 1];
        console.log(`    Click ${last.click}: ${last.transform}`);
      }
    }
  }
}

await browser.close();
