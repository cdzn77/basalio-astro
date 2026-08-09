import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function captureAt440() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to second card to show clipping
  await page.evaluate(() => {
    const track = document.querySelector('.carousel-track');
    if (track) {
      track.style.transform = 'translateX(-294px)'; // Move to second card
    }
  });

  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/d92a17ca-6d12-4225-bf9a-d7bb74af2faa/scratchpad/GB2-440px-card-clipping.png',
    fullPage: false
  });
  
  console.log('Screenshot saved: GB2-440px-card-clipping.png');
  await browser.close();
}

captureAt440().catch(console.error);
