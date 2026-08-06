import { chromium } from 'playwright';

async function measureCards() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/test-card-widths', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const measurements = await page.evaluate(() => {
    const widths = [260, 280, 300, 320];
    const allDivs = document.querySelectorAll('div');
    
    const results = {
      blocks: [],
      testimonials: []
    };

    // Find all divs that look like cards (have border, border-radius, padding)
    allDivs.forEach(div => {
      const style = window.getComputedStyle(div);
      const rect = div.getBoundingClientRect();
      const width = rect.width;
      
      // Look for elements matching our card widths
      if (widths.includes(Math.round(width)) && 
          style.border !== 'none' &&
          style.borderRadius !== '0px') {
        
        const hasImage = !!div.querySelector('div[style*="aspectRatio"], div[style*="height: 180"]');
        const titleEl = div.querySelector('h3');
        const descEl = Array.from(div.querySelectorAll('p')).find(p => p.style.color);
        
        if (titleEl || descEl) {
          const record = {
            width: Math.round(width),
            height: Math.round(rect.height),
            hasImage: hasImage,
            titleText: titleEl?.textContent?.trim().slice(0, 30) || '',
            titleHeight: titleEl?.offsetHeight || 0,
            descText: descEl?.textContent?.trim().slice(0, 50) || '',
            descHeight: descEl?.offsetHeight || 0,
            childCount: div.children.length
          };
          
          // Classify by whether it has taller image height (testimonial = 180px, blocks = 3:2)
          if (hasImage && Math.round(rect.height) > 400) {
            results.testimonials.push(record);
          } else if (hasImage) {
            results.blocks.push(record);
          }
        }
      }
    });

    return results;
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('LL1-LL3: CARD MEASUREMENTS (260, 280, 300, 320px)');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log('BLOCKSCAROUSEL CARDS:\n');
  measurements.blocks
    .sort((a, b) => a.width - b.width)
    .forEach(card => {
      console.log(`${card.width}px wide:`);
      console.log(`  Rendered height: ${card.height}px`);
      console.log(`  Title height: ${card.titleHeight}px (${Math.round(card.titleHeight / 16)} line-heights)`);
      console.log(`  Description height: ${card.descHeight}px (${Math.round(card.descHeight / 14)} line-heights)`);
      console.log(`  Title text: "${card.titleText}..."`);
      console.log(`  Description: "${card.descText}..."\n`);
    });

  console.log('\nWHOITSFOR CARDS:\n');
  measurements.testimonials
    .sort((a, b) => a.width - b.width)
    .forEach(card => {
      console.log(`${card.width}px wide:`);
      console.log(`  Rendered height: ${card.height}px`);
      console.log(`  Title height: ${card.titleHeight}px`);
      console.log(`  Description height: ${card.descHeight}px`);
      console.log(`  Title text: "${card.titleText}..."`);
      console.log(`  Description: "${card.descText}..."\n`);
    });

  await browser.close();
}

measureCards().catch(err => console.error(err.message));
