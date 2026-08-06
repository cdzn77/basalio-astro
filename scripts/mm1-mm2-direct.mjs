import { chromium } from 'playwright';

async function directMeasure() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/mm-real-content-test', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const results = await page.evaluate(() => {
    const allDivs = Array.from(document.querySelectorAll('div'));
    
    // Find all cards at 280px width
    const cardDivs = allDivs.filter(d => {
      const w = parseInt(d.style.width);
      const h = d.offsetHeight;
      return w === 280 && h > 200 && h < 700;
    });

    const results = {
      blocksCards: [],
      whoitsforDesktop: [],
      whoitsforMobile: []
    };

    let blockCount = 0, desktopCount = 0, mobileCount = 0;

    cardDivs.slice(0, 18).forEach((card, idx) => {
      const h3 = card.querySelector('h3');
      const title = h3?.textContent || '';
      const height = card.offsetHeight;
      
      // Classify by height range
      // BlocksCarousel: 300-330px
      // WhoItsFor desktop (180px image + 40px padding): ~460px
      // WhoItsFor mobile (140px image + 24px padding): ~380-390px
      
      if (height >= 290 && height <= 340) {
        results.blocksCards.push({
          index: blockCount++,
          title: title.slice(0, 25),
          height,
          titleHeight: h3?.offsetHeight || 0
        });
      } else if (height >= 450 && height <= 480) {
        results.whoitsforDesktop.push({
          index: desktopCount++,
          title: title.slice(0, 30),
          height
        });
      } else if (height >= 360 && height <= 410) {
        results.whoitsforMobile.push({
          index: mobileCount++,
          title: title.slice(0, 30),
          height
        });
      }
    });

    return results;
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('MM1: BLOCKSCAROUSEL REAL CONTENT at 280px');
  console.log('═══════════════════════════════════════════════════════\n');

  if (results.blocksCards.length > 0) {
    const max = Math.max(...results.blocksCards.map(c => c.height));
    const wrappingCount = results.blocksCards.filter(c => c.titleHeight > 20).length;
    
    results.blocksCards.forEach(card => {
      console.log(`[${card.index}] "${card.title}"`);
      console.log(`    Height: ${card.height}px | Title height: ${card.titleHeight}px`);
    });
    console.log(`\nMax height: ${max}px`);
    console.log(`Titles wrapping (>20px): ${wrappingCount}/${results.blocksCards.length}`);
  } else {
    console.log('(Cards not found in expected height range 290-340px)');
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('MM2a: WHOITSFOR DESKTOP (image 180px, padding 40px)');
  console.log('═══════════════════════════════════════════════════════\n');

  if (results.whoitsforDesktop.length > 0) {
    const max = Math.max(...results.whoitsforDesktop.map(c => c.height));
    results.whoitsforDesktop.forEach(card => {
      const pct = Math.round(card.height / 812 * 100);
      console.log(`[${card.index}] "${card.title}" - ${card.height}px (${pct}% of viewport)`);
    });
    console.log(`\nMax height: ${max}px`);
  } else {
    console.log('(Cards not found in expected height range 450-480px)');
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('MM2b: WHOITSFOR MOBILE (image 140px, padding 24px)');
  console.log('═══════════════════════════════════════════════════════\n');

  if (results.whoitsforMobile.length > 0) {
    const max = Math.max(...results.whoitsforMobile.map(c => c.height));
    const reduction = results.whoitsforDesktop.length > 0 ? 
      Math.max(...results.whoitsforDesktop.map(c => c.height)) - max : 0;
    
    results.whoitsforMobile.forEach(card => {
      const pct = Math.round(card.height / 812 * 100);
      console.log(`[${card.index}] "${card.title}" - ${card.height}px (${pct}% of viewport)`);
    });
    console.log(`\nMax height: ${max}px`);
    if (reduction > 0) {
      console.log(`Reduction from desktop: ${reduction}px (${Math.round(reduction / (Math.max(...results.whoitsforDesktop.map(c => c.height))) * 100)}%)`);
    }
  } else {
    console.log('(Cards not found in expected height range 360-410px)');
  }

  await browser.close();
}

directMeasure().catch(err => console.error(err.message));
