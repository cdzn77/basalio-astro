import { chromium } from 'playwright';

async function confirm() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const state = await page.evaluate(() => {
    const track = document.querySelector('.carousel-track-v2');
    const computed = window.getComputedStyle(track).alignItems;
    const inline = track.style.alignItems;
    return { computed, inline };
  });

  console.log('Align-items state:');
  console.log(`  Inline style: "${state.inline}" ${state.inline === '' ? '✅ CLEARED' : '❌ SET'}`);
  console.log(`  Computed: ${state.computed} (expected: normal or stretch)`);

  await browser.close();
}

confirm().catch(err => console.error(err.message));
