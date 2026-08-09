import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function captureCarouselAt440() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll down to reach BlocksCarousel
  await page.evaluate(() => {
    const carousel = document.querySelector('.carousel-viewport');
    if (carousel) {
      carousel.scrollIntoView({ block: 'center' });
    }
  });

  await page.waitForTimeout(500);

  // Advance to second card to show clipping issue
  await page.evaluate(() => {
    const track = document.querySelector('.carousel-track');
    if (track) {
      // Move to second card (~294px for 280px card + 14px gap)
      track.style.transform = 'translateX(-294px)';
    }
  });

  await page.waitForTimeout(500);

  await page.screenshot({ 
    path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/d92a17ca-6d12-4225-bf9a-d7bb74af2faa/scratchpad/GB2-440px-carousel-clipping.png',
    fullPage: false
  });
  
  console.log('Screenshot saved: GB2-440px-carousel-clipping.png');
  await browser.close();
}

captureCarouselAt440().catch(console.error);
