import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function verifyIcons() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll to BlocksCarousel to see Grid Reveal card
  await page.evaluate(() => {
    const carousel = document.querySelector('.carousel-viewport');
    if (carousel) {
      carousel.scrollIntoView({ block: 'center' });
    }
  });

  await page.waitForTimeout(500);

  // Check for "[object Module]" text in DOM
  const hasObjectModule = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    return bodyText.includes('[object Module]');
  });

  // Check icon elements
  const iconInfo = await page.evaluate(() => {
    const cards = document.querySelectorAll('.block-card');
    const results = [];
    
    cards.forEach((card, idx) => {
      const img = card.querySelector('.block-icon-img');
      const src = img ? img.src : null;
      const alt = img ? img.alt : null;
      const visible = img && img.offsetHeight > 0;
      
      results.push({
        cardIndex: idx,
        hasImg: !!img,
        imgSrc: src,
        imgAlt: alt,
        imgVisible: visible
      });
    });
    
    return results;
  });

  console.log(`[object Module] in page text: ${hasObjectModule ? '❌ YES (BUG)' : '✓ NO (FIXED)'}`);
  console.log(`\nIcon verification (375px):`);
  console.log(JSON.stringify(iconInfo, null, 2));

  await page.screenshot({ 
    path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/d92a17ca-6d12-4225-bf9a-d7bb74af2faa/scratchpad/GB1-375px-icons-verify.png',
    fullPage: false
  });
  
  console.log('\nScreenshot saved: GB1-375px-icons-verify.png');
  await browser.close();
}

verifyIcons().catch(console.error);
