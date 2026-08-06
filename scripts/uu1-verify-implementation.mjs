import { chromium } from 'playwright';

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [375, 390, 414];

  console.log('UU1.3: Verification at mobile viewports\n');
  
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp, height: 812 } });
    await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const data = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
      const track = document.querySelector('.carousel-track-v2');
      const viewport = document.querySelector('.carousel-viewport-v2');
      
      return {
        cardHeights: cards.map(c => c.offsetHeight),
        documentWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        viewportWidth: viewport?.offsetWidth,
        cardWidths: cards.map(c => c.offsetWidth),
        peek: (viewport?.offsetWidth || 0) - (cards[0]?.offsetWidth || 0) - 14 // gap 14px
      };
    });

    console.log(`📱 ${vp}px viewport:`);
    console.log(`  Card heights: ${data.cardHeights.join(', ')}px`);
    console.log(`  Max: ${Math.max(...data.cardHeights)}px ✓`);
    console.log(`  Document width: ${data.documentWidth}px`);
    console.log(`  Inner width: ${data.innerWidth}px`);
    console.log(`  Overflow: ${data.documentWidth === data.innerWidth ? '✅ PASS (scrollWidth === innerWidth)' : '❌ FAIL'}`);
    console.log(`  Peek: ${data.peek}px ${data.peek === 41 ? '✅ (41px spec)' : '⚠️'}`);
    console.log();

    await page.close();
  }

  await browser.close();
}

verify().catch(err => console.error(err.message));
