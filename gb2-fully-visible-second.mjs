import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function captureFullSecondCard() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.evaluate(() => {
    const carousel = document.querySelector('.carousel-viewport');
    if (carousel) {
      carousel.scrollIntoView({ block: 'center' });
    }
  });

  await page.waitForTimeout(500);

  // Advance two times to get second card in main viewport
  await page.click('.carousel-button-next');
  await page.waitForTimeout(800);

  await page.screenshot({ 
    path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/d92a17ca-6d12-4225-bf9a-d7bb74af2faa/scratchpad/GB2-440px-second-card-main.png',
    fullPage: false
  });
  
  console.log('Screenshot saved: GB2-440px-second-card-main.png');
  await browser.close();
}

captureFullSecondCard().catch(console.error);
