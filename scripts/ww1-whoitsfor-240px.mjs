import { chromium } from 'playwright';

async function ww1WhoItsFor() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 240, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const data = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
    
    return cards.map((card, idx) => ({
      index: idx,
      title: card.querySelector('.testimonial-name-v2')?.textContent.trim() || '',
      cardHeight: card.offsetHeight,
      cardWidth: card.offsetWidth
    }));
  });

  console.log('WW1.2: WhoItsFor cards at 240px viewport\n');
  
  data.forEach(card => {
    console.log(`Card ${card.index + 1}: ${card.cardWidth}px wide, height ${card.cardHeight}px`);
    console.log(`  Title: "${card.title}"`);
  });

  const maxHeight = Math.max(...data.map(c => c.cardHeight));
  console.log(`\nMax height: ${maxHeight}px`);
  
  if (maxHeight > 520) {
    console.log(`⚠️ WW1.3: Exceeds ~520px threshold (${maxHeight}px)`);
    console.log('         Further content reduction may be needed at 320px.');
  } else {
    console.log(`✅ WW1.3: Within ~520px threshold`);
  }

  await page.screenshot({ path: '/private/tmp/ww1-whoitsfor-240px.png', fullPage: false });
  console.log('\nScreenshot saved');

  await browser.close();
}

ww1WhoItsFor().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
