import { chromium } from 'playwright';

async function detailedMetrics() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/test-card-widths', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const metrics = await page.evaluate(() => {
    const widths = [260, 280, 300, 320];
    
    // Find BlocksCarousel cards
    const allDivs = Array.from(document.querySelectorAll('div'));
    const cardDivs = allDivs.filter(d => 
      d.style.width && widths.includes(parseInt(d.style.width)) &&
      d.children.length === 3 &&
      d.querySelector('[style*="aspectRatio"]')
    );

    const blocksMetrics = cardDivs.map((card, idx) => {
      const width = parseInt(card.style.width);
      const title = card.querySelector('h3');
      const desc = card.querySelector('p:last-of-type');
      
      return {
        width,
        cardHeight: card.offsetHeight,
        titleText: title?.textContent || '',
        titleHeight: title?.offsetHeight || 0,
        titleLines: Math.ceil((title?.offsetHeight || 0) / 18),
        descText: desc?.textContent || '',
        descHeight: desc?.offsetHeight || 0,
        descLines: Math.ceil((desc?.offsetHeight || 0) / 18)
      };
    });

    // Find WhoItsFor cards
    const testimonialDivs = allDivs.filter(d => 
      d.style.width && widths.includes(parseInt(d.style.width)) &&
      d.children.length === 5 &&
      d.querySelector('[style*="height: 180"]')
    );

    const testimonialsMetrics = testimonialDivs.map(card => {
      const width = parseInt(card.style.width);
      const title = card.querySelector('h3');
      const desc = card.querySelector('p:nth-of-type(2)');
      const features = Array.from(card.querySelectorAll('p')).slice(2);
      
      return {
        width,
        cardHeight: card.offsetHeight,
        titleText: title?.textContent || '',
        titleHeight: title?.offsetHeight || 0,
        titleLines: Math.ceil((title?.offsetHeight || 0) / 16),
        descText: desc?.textContent || '',
        descHeight: desc?.offsetHeight || 0,
        descLines: Math.ceil((desc?.offsetHeight || 0) / 18),
        featureCount: features.length,
        featuresHeight: features.reduce((sum, f) => sum + f.offsetHeight, 0)
      };
    });

    return { blocks: blocksMetrics, testimonials: testimonialsMetrics };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('LL1-LL3: DETAILED CARD METRICS');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log('BLOCKSCAROUSEL CARDS:\n');
  metrics.blocks.forEach(card => {
    const contentWidth = card.width - 40; // 20px padding each side
    console.log(`${card.width}px wide (content: ${contentWidth}px):`);
    console.log(`  Card height: ${card.cardHeight}px`);
    console.log(`  Title: "${card.titleText}" - ${card.titleLines} line(s), ${card.titleHeight}px`);
    console.log(`  Description wraps to ${card.descLines} line(s), ${card.descHeight}px`);
    console.log(`  Readable: ${card.titleLines === 1 && card.descLines <= 3 ? '✅' : '⚠️'}\n`);
  });

  console.log('\nWHOITSFOR CARDS:\n');
  metrics.testimonials.forEach(card => {
    const contentWidth = card.width - 40; // 40px padding
    console.log(`${card.width}px wide (content: ${contentWidth}px):`);
    console.log(`  Card height: ${card.cardHeight}px`);
    console.log(`  Title: "${card.titleText}" - ${card.titleLines} line(s), ${card.titleHeight}px`);
    console.log(`  Description wraps to ${card.descLines} line(s), ${card.descHeight}px`);
    console.log(`  Features shown: ${card.featureCount} items, ${card.featuresHeight}px`);
    const readable = card.titleLines === 1 && card.descLines <= 2 && card.featureCount >= 2;
    console.log(`  Readable: ${readable ? '✅' : '⚠️'}\n`);
  });

  // Peek calculations
  console.log('PEEK AMOUNTS (container 335px - gap 14px - card width):\n');
  [260, 280, 300, 320].forEach(width => {
    const peek = 335 - 14 - width;
    console.log(`  ${width}px card → ${peek}px peek`);
  });

  await browser.close();
}

detailedMetrics().catch(err => console.error(err.message));
