import { chromium } from 'playwright';

async function ss1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Temporarily set align-items: flex-start to disable stretching
  await page.evaluate(() => {
    const track = document.querySelector('.carousel-track-v2');
    track.style.alignItems = 'flex-start';
  });
  
  await page.waitForTimeout(300);

  const measurements = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
    
    return cards.map((card, cardIdx) => {
      const image = card.querySelector('.testimonial-image-v2');
      const label = card.querySelector('.testimonial-label-v2');
      const titleRow = card.querySelector('.testimonial-title-row-v2');
      const desc = card.querySelector('.testimonial-description-v2');
      const features = card.querySelector('.testimonial-features-v2');
      const featureItems = features?.querySelectorAll('.testimonial-feature-v2') || [];
      
      return {
        cardIndex: cardIdx,
        totalHeight: card.offsetHeight,
        image: image?.offsetHeight || 0,
        label: label?.offsetHeight || 0,
        titleRow: titleRow?.offsetHeight || 0,
        description: desc?.offsetHeight || 0,
        features: features?.offsetHeight || 0,
        featureCount: featureItems.length,
        featureTexts: Array.from(featureItems).map(f => f.textContent.trim())
      };
    });
  });

  console.log('SS1: All four cards at 375px (align-items: flex-start)\n');
  
  measurements.forEach(card => {
    console.log(`Card ${card.cardIndex + 1}: ${card.totalHeight}px total`);
    console.log(`  Image: ${card.image}px`);
    console.log(`  Label: ${card.label}px`);
    console.log(`  Title row: ${card.titleRow}px`);
    console.log(`  Description: ${card.description}px`);
    console.log(`  Features container: ${card.features}px (${card.featureCount} items)`);
    if (card.featureTexts.length > 0) {
      console.log(`    Feature texts:`);
      card.featureTexts.forEach((text, idx) => {
        console.log(`      [${idx}] ${text}`);
      });
    }
    console.log();
  });

  const heights = measurements.map(c => c.totalHeight);
  const maxHeight = Math.max(...heights);
  const tallestIdx = heights.indexOf(maxHeight);
  
  console.log(`\nSS1 Summary:`);
  console.log(`  Card heights: ${heights.join(', ')}px`);
  console.log(`  Tallest: Card ${tallestIdx + 1} at ${maxHeight}px`);
  console.log(`  Difference (max - min): ${maxHeight - Math.min(...heights)}px`);

  // Restore align-items
  await page.evaluate(() => {
    const track = document.querySelector('.carousel-track-v2');
    track.style.alignItems = '';
  });

  await browser.close();
}

ss1().catch(err => console.error(err.message));
