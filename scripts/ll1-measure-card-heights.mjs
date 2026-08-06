import { chromium } from 'playwright';
import fs from 'fs';

async function measureCardHeights() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/test-card-widths', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('═══════════════════════════════════════════════════════');
  console.log('LL1-LL3: CARD WIDTH & HEIGHT MEASUREMENTS');
  console.log('═══════════════════════════════════════════════════════\n');

  // Measure BlocksCarousel cards
  const blocksHeights = await page.evaluate(() => {
    const widths = [260, 280, 300, 320];
    const results = [];

    // Find all BlocksCarousel card containers
    const cardContainers = document.querySelectorAll('h1');
    const blocksSection = Array.from(cardContainers).find(h => 
      h.textContent.includes('BlocksCarousel')
    )?.parentElement;

    const cardDivs = blocksSection?.querySelectorAll('[style*="width"]');
    const cards = Array.from(cardDivs || []).filter(div => 
      div.style.width && widths.includes(parseInt(div.style.width))
    );

    cards.forEach(card => {
      const width = parseInt(card.style.width);
      const innerCard = card.querySelector('[style*="flex-direction"]');
      
      if (innerCard) {
        const title = innerCard.querySelector('h3');
        const description = innerCard.querySelector('p:last-of-type');
        
        results.push({
          width,
          cardHeight: Math.round(innerCard.offsetHeight),
          titleText: title?.textContent || '',
          titleLines: Math.ceil(title?.offsetHeight / 20) || 1,
          descriptionText: description?.textContent || '',
          descriptionLines: Math.ceil(description?.offsetHeight / 20) || 1,
          descriptionHeight: description?.offsetHeight
        });
      }
    });

    return results;
  });

  console.log('BLOCKSCAROUSEL CARDS:\n');
  if (blocksHeights.length > 0) {
    blocksHeights.forEach(card => {
      console.log(`Width: ${card.width}px`);
      console.log(`  Card height: ${card.cardHeight}px`);
      console.log(`  Title wraps to: ${card.titleLines} line(s)`);
      console.log(`  Description wraps to: ${card.descriptionLines} line(s)`);
      console.log(`  Description height: ${card.descriptionHeight}px\n`);
    });
  } else {
    console.log('  (Cards not found in DOM)\n');
  }

  // Measure WhoItsFor cards
  const testimonialHeights = await page.evaluate(() => {
    const widths = [260, 280, 300, 320];
    const results = [];

    const cardContainers = document.querySelectorAll('h1');
    const testimonialsSection = Array.from(cardContainers).find(h => 
      h.textContent.includes('WhoItsFor')
    )?.parentElement;

    const cardDivs = testimonialsSection?.querySelectorAll('[style*="width"]');
    const cards = Array.from(cardDivs || []).filter(div => 
      div.style.width && widths.includes(parseInt(div.style.width))
    );

    cards.forEach(card => {
      const width = parseInt(card.style.width);
      const innerCard = card.querySelector('[style*="flex-direction"]');
      
      if (innerCard) {
        const title = innerCard.querySelector('h3');
        const description = innerCard.querySelector('p:nth-of-type(2)');
        const features = innerCard.querySelectorAll('p:nth-of-type(n+3)');
        
        results.push({
          width,
          cardHeight: Math.round(innerCard.offsetHeight),
          titleText: title?.textContent || '',
          titleLines: Math.ceil(title?.offsetHeight / 17) || 1,
          descriptionText: description?.textContent || '',
          descriptionLines: Math.ceil(description?.offsetHeight / 20) || 1,
          featureCount: features.length,
          totalContentHeight: innerCard.offsetHeight
        });
      }
    });

    return results;
  });

  console.log('WHOITSFOR CARDS:\n');
  if (testimonialHeights.length > 0) {
    testimonialHeights.forEach(card => {
      console.log(`Width: ${card.width}px`);
      console.log(`  Card height: ${card.cardHeight}px`);
      console.log(`  Title wraps to: ${card.titleLines} line(s)`);
      console.log(`  Description wraps to: ${card.descriptionLines} line(s)`);
      console.log(`  Features shown: ${card.featureCount}\n`);
    });
  } else {
    console.log('  (Cards not found in DOM)\n');
  }

  // Take full-page screenshot
  const screenshotPath = '/private/tmp/test-card-widths-375.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot: ${screenshotPath}`);

  await browser.close();
}

measureCardHeights().catch(err => console.error(err.message));
