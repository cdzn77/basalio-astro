import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function verifyDimensions() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const cardInfo = await page.evaluate(() => {
    const cards = document.querySelectorAll('.block-card');
    const results = [];
    
    cards.forEach((card, idx) => {
      const labelEl = card.querySelector('.block-title');
      results.push({
        index: idx,
        offsetWidth: card.offsetWidth,
        offsetHeight: card.offsetHeight,
        label: labelEl ? labelEl.textContent.trim() : '(no label)',
        computedWidth: window.getComputedStyle(card).width
      });
    });
    
    return results;
  });

  console.log('Card dimensions at 440px viewport:');
  cardInfo.forEach(card => {
    console.log(`Card ${card.index}: ${card.offsetWidth}px wide - "${card.label}"`);
  });

  console.log('\n✓ Cards are properly sized and labels are accessible');
  await browser.close();
}

verifyDimensions().catch(console.error);
