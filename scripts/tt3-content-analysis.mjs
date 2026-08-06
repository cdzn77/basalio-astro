import { chromium } from 'playwright';

async function tt3() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const content = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
    
    return cards.map((card, cardIdx) => {
      const eyebrow = card.querySelector('.testimonial-label-v2')?.textContent.trim() || '';
      const title = card.querySelector('.testimonial-name-v2')?.textContent.trim() || '';
      const description = card.querySelector('.testimonial-description-v2')?.textContent.trim() || '';
      const features = Array.from(card.querySelectorAll('.testimonial-feature-v2')).map(f => f.textContent.trim());
      
      return {
        cardIndex: cardIdx,
        eyebrow,
        title,
        description,
        features,
        featureCount: features.length
      };
    });
  });

  console.log('TT3: Full content of all four cards\n');
  
  content.forEach(card => {
    console.log(`╔ CARD ${card.cardIndex + 1}`);
    console.log(`║ Eyebrow: ${card.eyebrow}`);
    console.log(`║ Title: ${card.title}`);
    console.log(`║`);
    console.log(`║ Description:`);
    console.log(`║   "${card.description}"`);
    console.log(`║`);
    console.log(`║ Features (${card.featureCount}):`);
    card.features.forEach((f, idx) => {
      console.log(`║   [${idx}] "${f}"`);
    });
    console.log(`╚\n`);
  });

  // Analysis
  console.log('TT3: Do features add work beyond description?\n');
  
  content.forEach(card => {
    const descWords = card.description.toLowerCase().split(/\s+/);
    const blockNames = ['grid', 'reveal', 'case', 'study', 'transition', 'scroll', 'sequence', 'text', 'reveal', 'pinned', 'custom', 'cursor', 'magnetic', 'button', 'before', 'after', 'filterable', 'hls', 'video'];
    
    const blockNamesInDesc = blockNames.filter(name => 
      card.description.toLowerCase().includes(name)
    );

    console.log(`Card ${card.cardIndex + 1}:`);
    console.log(`  Description mentions blocks: ${blockNamesInDesc.join(', ') || 'none'}`);
    console.log(`  Features list blocks separately: ${card.features.length > 0 ? 'YES' : 'NO'}`);
    console.log(`  Redundancy: ${blockNamesInDesc.length > 0 ? '⚠️ PARTIAL' : '✅ DISTINCT'}`);
    console.log();
  });

  await browser.close();
}

tt3().catch(err => console.error(err.message));
