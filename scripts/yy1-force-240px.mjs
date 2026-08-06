import { chromium } from 'playwright';

async function yy1() {
  const browser = await chromium.launch({ headless: true });

  // BlocksCarousel at 240px
  console.log('YY1.1: BlocksCarousel cards forced to 240px\n');
  const page1 = await browser.newPage({ viewport: { width: 240, height: 900 } });
  await page1.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page1.waitForTimeout(500);

  await page1.addStyleTag({
    content: `.block-card { width: 240px !important; flex-basis: 240px !important; }`
  });
  await page1.waitForTimeout(300);

  const blocksData = await page1.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.block-card')).slice(0, 9);
    return cards.map((card, idx) => {
      const title = card.querySelector('.block-card-title');
      const desc = card.querySelector('.block-card-description');
      
      const titleHeight = title?.offsetHeight || 0;
      const descHeight = desc?.offsetHeight || 0;
      const titleLineHeight = 18; // estimate
      const descLineHeight = 16; // estimate
      
      return {
        index: idx,
        measuredWidth: card.offsetWidth,
        title: title?.textContent.trim().substring(0, 30) || '',
        titleHeight,
        titleLines: Math.ceil(titleHeight / titleLineHeight),
        description: desc?.textContent.trim().substring(0, 20) || '',
        descHeight,
        descLines: Math.ceil(descHeight / descLineHeight),
        totalHeight: card.offsetHeight
      };
    });
  });

  blocksData.forEach(card => {
    console.log(`Card ${card.index + 1}: width=${card.measuredWidth}px, height=${card.totalHeight}px`);
    console.log(`  Title (${card.titleLines} lines): "${card.title}"`);
    console.log(`  Desc (${card.descLines} lines): "${card.description}"`);
  });

  await page1.screenshot({ path: '/private/tmp/yy1-blocks-240px-forced.png', fullPage: false });
  console.log('\nScreenshot: /private/tmp/yy1-blocks-240px-forced.png');
  await page1.close();

  // WhoItsFor at 240px
  console.log('\n\nYY1.2: WhoItsFor cards forced to 240px\n');
  const page2 = await browser.newPage({ viewport: { width: 240, height: 900 } });
  await page2.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(500);

  await page2.addStyleTag({
    content: `.testimonial-card-v2 { width: 240px !important; flex-basis: 240px !important; }`
  });
  await page2.waitForTimeout(300);

  const whoitsforData = await page2.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
    return cards.map((card, idx) => ({
      index: idx,
      measuredWidth: card.offsetWidth,
      title: card.querySelector('.testimonial-name-v2')?.textContent.trim() || '',
      height: card.offsetHeight
    }));
  });

  whoitsforData.forEach(card => {
    console.log(`Card ${card.index + 1}: width=${card.measuredWidth}px, height=${card.height}px`);
    console.log(`  Title: "${card.title}"`);
  });

  await page2.screenshot({ path: '/private/tmp/yy1-whoitsfor-240px-forced.png', fullPage: false });
  console.log('\nScreenshot: /private/tmp/yy1-whoitsfor-240px-forced.png');
  await page2.close();

  await browser.close();
}

yy1().catch(err => {
  console.error(err.message);
  process.exit(1);
});
