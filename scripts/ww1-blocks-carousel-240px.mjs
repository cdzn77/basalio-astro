import { chromium } from 'playwright';

async function ww1Blocks() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 240, height: 900 } });

  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.block-card')).slice(0, 9);
    
    return cards.map((card, idx) => {
      const title = card.querySelector('.block-card-title');
      const titleText = title?.textContent.trim();
      const titleStyle = window.getComputedStyle(title || {});
      
      // Rough line count: measure how many lines the title takes
      const titleHeight = title?.offsetHeight || 0;
      const lineHeight = parseFloat(titleStyle.lineHeight);
      const titleLines = Math.ceil(titleHeight / lineHeight);
      
      return {
        index: idx,
        title: titleText,
        titleLines: titleLines,
        cardHeight: card.offsetHeight,
        cardWidth: card.offsetWidth
      };
    });
  });

  console.log('WW1.1: BlocksCarousel cards at 240px viewport\n');
  
  data.forEach(card => {
    console.log(`Card ${card.index + 1}: ${card.cardWidth}px wide`);
    console.log(`  Title: "${card.title}"`);
    console.log(`  Title lines: ${card.titleLines}`);
    console.log(`  Card height: ${card.cardHeight}px\n`);
  });

  // Screenshot
  await page.screenshot({ path: '/private/tmp/ww1-blocks-carousel-240px.png', fullPage: false });
  console.log('Screenshot: /private/tmp/ww1-blocks-carousel-240px.png');

  await browser.close();
}

ww1Blocks().catch(err => console.error(err.message));
