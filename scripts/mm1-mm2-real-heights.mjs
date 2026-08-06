import { chromium } from 'playwright';
import fs from 'fs';

async function measureRealContent() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/mm-real-content-test', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const measurements = await page.evaluate(() => {
    const allDivs = Array.from(document.querySelectorAll('div'));
    
    // Find sections by heading text
    const headings = Array.from(document.querySelectorAll('h1'));
    const blocksHeading = headings.find(h => h.textContent.includes('MM1a'));
    const whoitsforDesktopHeading = headings.find(h => h.textContent.includes('MM2a'));
    const whoitsforMobileHeading = headings.find(h => h.textContent.includes('MM2b'));

    // Get cards in each section
    const getCardsAfterHeading = (heading) => {
      const section = heading?.parentElement;
      const cards = section?.querySelectorAll('[style*="280px"]') || [];
      return Array.from(cards).filter(c => c.style.width);
    };

    const blocksCards = getCardsAfterHeading(blocksHeading);
    const whoitsforDesktopCards = getCardsAfterHeading(whoitsforDesktopHeading);
    const whoitsforMobileCards = getCardsAfterHeading(whoitsforMobileHeading);

    const analyzeCard = (card) => {
      const innerCard = card.querySelector('[style*="flex-direction"]');
      if (!innerCard) return null;
      
      const h3 = innerCard.querySelector('h3');
      const ps = Array.from(innerCard.querySelectorAll('p'));
      const desc = ps.find(p => p.offsetHeight > 30);
      
      return {
        height: innerCard.offsetHeight,
        titleText: h3?.textContent || '',
        titleHeight: h3?.offsetHeight || 0,
        descHeight: desc?.offsetHeight || 0
      };
    };

    return {
      blocksCards: blocksCards.map(analyzeCard).filter(Boolean),
      whoitsforDesktopCards: whoitsforDesktopCards.map(analyzeCard).filter(Boolean),
      whoitsforMobileCards: whoitsforMobileCards.map(analyzeCard).filter(Boolean)
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('MM1: BLOCKSCAROUSEL REAL CONTENT at 280px');
  console.log('═══════════════════════════════════════════════════════\n');

  const maxBlocksHeight = Math.max(...measurements.blocksCards.map(c => c.height), 0);
  const wrappingTitles = measurements.blocksCards.filter(c => c.titleHeight > 24);

  measurements.blocksCards.forEach((card, i) => {
    const blocks = ["Grid Reveal", "Case Study Transition", "Text Reveal", "Scroll Sequence", "Pinned Scroll", "Magnetic Button", "Custom Cursor", "Scroll Lock", "Focus Guides"];
    console.log(`[${i}] "${blocks[i]}"`);
    console.log(`    Height: ${card.height}px | Title: ${card.titleHeight}px | Desc: ${card.descHeight}px`);
  });

  console.log(`\nTallest card: ${maxBlocksHeight}px`);
  console.log(`Titles wrapping to 2 lines: ${wrappingTitles.length}/9`);
  if (wrappingTitles.length > 0) {
    wrappingTitles.forEach(card => {
      console.log(`  - Height ${card.height}px (title ${card.titleHeight}px)`);
    });
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('MM2a: WHOITSFOR DESKTOP (image 180px, padding 40px) at 280px');
  console.log('═══════════════════════════════════════════════════════\n');

  const maxDesktopHeight = Math.max(...measurements.whoitsforDesktopCards.map(c => c.height), 0);
  measurements.whoitsforDesktopCards.forEach((card, i) => {
    const roles = ["Portfolio & Brand Designers", "Videographers & Motion Designers", "Art & Creative Directors", "Studios & Agencies"];
    console.log(`[${i}] "${roles[i]}"`);
    console.log(`    Height: ${card.height}px`);
  });
  console.log(`\nTallest: ${maxDesktopHeight}px (${Math.round(maxDesktopHeight / 812 * 100)}% of 812px viewport)`);

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('MM2b: WHOITSFOR MOBILE (image 140px, padding 24px) at 280px');
  console.log('═══════════════════════════════════════════════════════\n');

  const maxMobileHeight = Math.max(...measurements.whoitsforMobileCards.map(c => c.height), 0);
  measurements.whoitsforMobileCards.forEach((card, i) => {
    const roles = ["Portfolio & Brand Designers", "Videographers & Motion Designers", "Art & Creative Directors", "Studios & Agencies"];
    console.log(`[${i}] "${roles[i]}"`);
    console.log(`    Height: ${card.height}px`);
  });
  console.log(`\nTallest: ${maxMobileHeight}px (${Math.round(maxMobileHeight / 812 * 100)}% of 812px viewport)`);
  console.log(`Reduction: ${maxDesktopHeight - maxMobileHeight}px (${Math.round((maxDesktopHeight - maxMobileHeight) / maxDesktopHeight * 100)}%)`);

  // Take screenshot
  const screenshots = [];
  const scroll1 = await page.evaluate(() => document.body.scrollHeight);
  const screenshotPath1 = '/private/tmp/mm-real-content-top.png';
  await page.screenshot({ path: screenshotPath1, clip: { x: 0, y: 0, width: 375, height: 812 } });
  console.log(`\nScreenshots: ${screenshotPath1}`);
  
  // Scroll and capture bottom sections
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(500);
  const screenshotPath2 = '/private/tmp/mm-real-content-bottom.png';
  await page.screenshot({ path: screenshotPath2, clip: { x: 0, y: 0, width: 375, height: 812 } });
  console.log(`         ${screenshotPath2}`);

  await browser.close();
}

measureRealContent().catch(err => console.error(err.message));
