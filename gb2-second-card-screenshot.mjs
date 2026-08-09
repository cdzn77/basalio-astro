import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function captureSecondCard() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll to carousel
  await page.evaluate(() => {
    const carousel = document.querySelector('.carousel-viewport');
    if (carousel) {
      carousel.scrollIntoView({ block: 'center' });
    }
  });

  await page.waitForTimeout(500);

  // Click next button to show second card more prominently
  await page.click('.carousel-button-next');
  await page.waitForTimeout(500);

  await page.screenshot({ 
    path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/d92a17ca-6d12-4225-bf9a-d7bb74af2faa/scratchpad/GB2-440px-second-card.png',
    fullPage: false
  });
  
  console.log('Screenshot saved: GB2-440px-second-card.png (first card in viewport after advance)');
  await browser.close();
}

captureSecondCard().catch(console.error);
