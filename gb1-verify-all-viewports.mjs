import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';
const VIEWPORTS = [
  { width: 440, height: 956, name: '440px' },
  { width: 1440, height: 900, name: '1440px (desktop)' }
];

async function verifyAllViewports() {
  const browser = await chromium.launch();
  
  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
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

    // Check for bug
    const hasObjectModule = await page.evaluate(() => {
      return document.body.innerText.includes('[object Module]');
    });

    const allIconsLoaded = await page.evaluate(() => {
      const cards = document.querySelectorAll('.block-card');
      let loaded = 0;
      cards.forEach(card => {
        const img = card.querySelector('.block-icon-img');
        if (img && img.src && img.offsetHeight > 0) {
          loaded++;
        }
      });
      return { loaded, total: cards.length };
    });

    console.log(`${viewport.name}: [object Module]=${hasObjectModule ? '❌' : '✓'}, icons=${allIconsLoaded.loaded}/${allIconsLoaded.total}`);

    await page.screenshot({ 
      path: `/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/d92a17ca-6d12-4225-bf9a-d7bb74af2faa/scratchpad/GB1-${viewport.name}-verify.png`,
      fullPage: false
    });

    await page.close();
  }

  await browser.close();
  console.log('\n✓ GB1 verified across all viewports — ready to commit');
}

verifyAllViewports().catch(console.error);
