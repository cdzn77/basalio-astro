import { chromium } from 'playwright';
import fs from 'fs';

async function verifyGridReveal() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Verify viewport assertion
  const actualViewport = await page.evaluate(() => window.innerWidth);
  console.log(`Viewport assertion: requested 375px, actual ${actualViewport}px`);
  
  if (actualViewport !== 375) {
    console.log(`⚠️  Viewport mismatch — proceeding anyway`);
  }

  // Measure grid-reveal-demo
  const gridMeasurements = await page.evaluate(() => {
    const grid = document.querySelector('.grid-reveal-demo');
    if (!grid) return null;

    const style = window.getComputedStyle(grid);
    
    return {
      scrollWidth: grid.scrollWidth,
      offsetWidth: grid.offsetWidth,
      clientWidth: grid.clientWidth,
      computed: {
        gridTemplateColumns: style.gridTemplateColumns,
        gap: style.gap,
        width: style.width
      },
      tiles: document.querySelectorAll('.grid-tile').length
    };
  });

  // Take screenshot
  const outputPath = '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/dda2bdc6-021f-4d71-bb6e-9733c430f1d9/scratchpad/rm6c-grid-reveal-375px.png';
  await page.screenshot({ path: outputPath, fullPage: false, clip: { x: 0, y: 0, width: 375, height: 812 } });

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('RM6c VERIFICATION: Grid Reveal Demo at 375px');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log('MEASUREMENTS:');
  console.log(`  Grid scrollWidth: ${gridMeasurements.scrollWidth}px`);
  console.log(`  Grid offsetWidth: ${gridMeasurements.offsetWidth}px`);
  console.log(`  Grid clientWidth: ${gridMeasurements.clientWidth}px`);
  console.log(`  Overflow: ${gridMeasurements.scrollWidth > actualViewport ? '❌ YES' : '✅ NO'}`);
  
  if (gridMeasurements.scrollWidth > actualViewport) {
    console.log(`  Amount: ${gridMeasurements.scrollWidth - actualViewport}px`);
  }
  
  console.log(`\nGRID PROPERTIES:`);
  console.log(`  Grid-template-columns: ${gridMeasurements.computed.gridTemplateColumns}`);
  console.log(`  Gap: ${gridMeasurements.computed.gap}`);
  console.log(`  Tiles: ${gridMeasurements.tiles}`);

  // Check if animation is still intact
  const animationCheck = await page.evaluate(() => {
    const firstTile = document.querySelector('.grid-tile');
    if (!firstTile) return null;
    
    const computedStyle = window.getComputedStyle(firstTile);
    const classes = firstTile.className;
    
    return {
      classes,
      animationName: computedStyle.animationName,
      animationDuration: computedStyle.animationDuration
    };
  });

  console.log(`\nANIMATION CHECK:`);
  console.log(`  First tile classes: ${animationCheck.classes}`);
  console.log(`  Animation name: ${animationCheck.animationName}`);
  console.log(`  Animation duration: ${animationCheck.animationDuration}`);
  console.log(`  Stagger preserved: ${animationCheck.animationName !== 'none' ? '✅' : '❌'}`);

  console.log(`\nSCREENSHOT: ${outputPath}`);
  console.log(`File size: ${fs.statSync(outputPath).size} bytes`);

  await browser.close();
}

verifyGridReveal().catch(err => console.error(err.message));
