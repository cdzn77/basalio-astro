import { chromium } from 'playwright';

async function extractMetrics() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/test-card-widths', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const allDivs = Array.from(document.querySelectorAll('div'));
    const results = { blocks: [], testimonials: [] };
    
    let blockIdx = 0, testIdx = 0;

    allDivs.forEach(div => {
      const width = parseInt(div.style.width);
      const height = div.offsetHeight;
      
      // BlocksCarousel: 3 children, heights 303-329, has aspectRatio image
      if (div.children.length === 3 && height >= 300 && height <= 330) {
        const h3 = div.querySelector('h3');
        const p = Array.from(div.querySelectorAll('p')).find(el => 
          el.offsetHeight > 30 && el.style.color
        );
        
        results.blocks.push({
          width,
          height,
          title: h3?.textContent?.trim() || '',
          titleLines: Math.ceil((h3?.offsetHeight || 0) / 18),
          description: p?.textContent?.trim() || '',
          descriptionHeight: p?.offsetHeight || 0,
          descLines: Math.ceil((p?.offsetHeight || 0) / 18)
        });
      }
      
      // WhoItsFor: 5 children, height 460, has 180px image height
      if (div.children.length === 5 && height === 460) {
        const h3 = div.querySelector('h3');
        const ps = Array.from(div.querySelectorAll('p'));
        const desc = ps[1]; // Second p is description
        const features = ps.slice(2);
        
        results.testimonials.push({
          width,
          height,
          title: h3?.textContent?.trim() || '',
          titleHeight: h3?.offsetHeight || 0,
          description: desc?.textContent?.trim() || '',
          descHeight: desc?.offsetHeight || 0,
          featureCount: features.length,
          featureVisibility: features.map((f, i) => ({
            index: i,
            text: f.textContent?.trim().slice(0, 20),
            height: f.offsetHeight
          }))
        });
      }
    });

    return results;
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('LL1-LL3: CARD READABILITY AT 260/280/300/320px');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log('BLOCKSCAROUSEL CARDS:\n');
  data.blocks.forEach(card => {
    const contentWidth = card.width - 40;
    const titleWraps = card.titleLines > 1 ? `wraps ${card.titleLines} lines` : 'single line ✅';
    const descWraps = card.descLines <= 3 ? `${card.descLines} lines ✅` : `${card.descLines} lines ⚠️`;
    
    console.log(`${card.width}px: height ${card.height}px`);
    console.log(`  Content width: ${contentWidth}px`);
    console.log(`  Title: "${card.title}" → ${titleWraps}`);
    console.log(`  Description (${card.descriptionHeight}px): ${descWraps}`);
    console.log(`  Verdict: ${card.titleLines === 1 && card.descLines <= 3 ? '✅ READABLE' : '⚠️ MARGINAL'}\n`);
  });

  console.log('\nWHOITSFOR CARDS:\n');
  data.testimonials.forEach(card => {
    const contentWidth = card.width - 40;
    const titleOK = card.titleHeight <= 20 ? '✅' : '⚠️';
    const descOK = card.descHeight <= 30 ? '✅' : '⚠️';
    
    console.log(`${card.width}px: height ${card.height}px`);
    console.log(`  Content width: ${contentWidth}px`);
    console.log(`  Title: "${card.title}" (${card.titleHeight}px) ${titleOK}`);
    console.log(`  Description: (${card.descHeight}px) ${descOK}`);
    console.log(`  Features visible: ${card.featureCount}`);
    card.featureVisibility.forEach(f => {
      console.log(`    • ${f.text}... (${f.height}px)`);
    });
    const readable = card.titleHeight <= 20 && card.descHeight <= 30 && card.featureCount >= 2;
    console.log(`  Verdict: ${readable ? '✅ READABLE' : '⚠️ TIGHT'}\n`);
  });

  // Peek calculation
  console.log('\nPEEK AMOUNTS (container 335px - gap 14px):\n');
  [260, 280, 300, 320].forEach(w => {
    const peek = 335 - 14 - w;
    console.log(`  ${w}px card → ${peek}px peek visible`);
  });

  await browser.close();
}

extractMetrics().catch(err => console.error(err.message));
