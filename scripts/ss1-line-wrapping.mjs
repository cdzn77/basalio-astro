import { chromium } from 'playwright';

async function ss1lines() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const lineData = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
    
    return cards.map((card, cardIdx) => {
      const features = card.querySelectorAll('.testimonial-feature-v2');
      
      return {
        cardIndex: cardIdx,
        features: Array.from(features).map((f, fIdx) => {
          const style = window.getComputedStyle(f);
          const lineHeight = parseFloat(style.lineHeight);
          const contentHeight = f.offsetHeight;
          const lineCount = Math.round(contentHeight / lineHeight);
          
          return {
            index: fIdx,
            text: f.textContent.trim(),
            height: contentHeight,
            lineHeight: style.lineHeight,
            lines: lineCount,
            wraps: lineCount > 1
          };
        })
      };
    });
  });

  console.log('SS1.3-SS1.4: Feature line wrapping at 280px card width\n');
  
  lineData.forEach(card => {
    console.log(`Card ${card.cardIndex + 1}:`);
    card.features.forEach(f => {
      const wrap = f.wraps ? '📝 WRAPS' : '→ single line';
      console.log(`  Feature [${f.index}] (${f.lines} lines) ${wrap}`);
      console.log(`    "${f.text}"`);
      console.log(`    Height: ${f.height}px, line-height: ${f.lineHeight}`);
    });
    console.log();
  });

  await browser.close();
}

ss1lines().catch(err => console.error(err.message));
