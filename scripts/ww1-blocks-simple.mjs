import { chromium } from 'playwright';

async function ww1Blocks() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 240, height: 900 } });

  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const data = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.block-card')).slice(0, 9);
    
    return cards.map((card, idx) => ({
      index: idx,
      title: card.querySelector('.block-card-title')?.textContent.trim() || '',
      cardHeight: card.offsetHeight,
      cardWidth: card.offsetWidth
    }));
  });

  console.log('WW1.1: BlocksCarousel cards at 240px viewport\n');
  
  data.forEach(card => {
    console.log(`Card ${card.index + 1}: ${card.cardWidth}px wide, height ${card.cardHeight}px`);
    console.log(`  Title: "${card.title}"`);
  });

  const maxHeight = Math.max(...data.map(c => c.cardHeight));
  console.log(`\nMax height: ${maxHeight}px`);

  await page.screenshot({ path: '/private/tmp/ww1-blocks-240px.png', fullPage: false });
  console.log('Screenshot saved');

  await browser.close();
}

ww1Blocks().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
