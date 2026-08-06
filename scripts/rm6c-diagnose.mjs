import { chromium } from 'playwright';

async function diagnoseGridReveal() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const measurements = await page.evaluate(() => {
    const grid = document.querySelector('.grid-reveal-demo');
    if (!grid) return { error: 'grid-reveal-demo not found' };

    const style = window.getComputedStyle(grid);
    const rect = grid.getBoundingClientRect();
    
    // Check parent container
    const parent = grid.parentElement;
    const parentStyle = window.getComputedStyle(parent);
    const parentRect = parent.getBoundingClientRect();

    // Check tiles
    const tiles = grid.querySelectorAll('.grid-tile');
    const firstTile = tiles[0];
    const tileStyle = firstTile ? window.getComputedStyle(firstTile) : {};

    return {
      viewport: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      },
      grid: {
        scrollWidth: grid.scrollWidth,
        offsetWidth: grid.offsetWidth,
        clientWidth: grid.clientWidth,
        boundingWidth: Math.round(rect.width),
        computedWidth: style.width,
        computedMaxWidth: style.maxWidth,
        computedPadding: `${style.paddingLeft} ${style.paddingRight}`,
        computedMargin: `${style.marginLeft} ${style.marginRight}`,
        display: style.display,
        gridTemplateColumns: style.gridTemplateColumns,
        gap: style.gap
      },
      parent: {
        offsetWidth: parent.offsetWidth,
        boundingWidth: Math.round(parentRect.width),
        computedWidth: parentStyle.width,
        computedPadding: `${parentStyle.paddingLeft} ${parentStyle.paddingRight}`,
        display: parentStyle.display
      },
      firstTile: {
        offsetWidth: firstTile?.offsetWidth,
        computedWidth: tileStyle.width,
        computedMinWidth: tileStyle.minWidth
      },
      tileCount: tiles.length
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('RM6c.1-RM6c.2: Grid Reveal Demo Diagnosis at 375px');
  console.log('═══════════════════════════════════════════════════════\n');

  if (measurements.error) {
    console.log('ERROR:', measurements.error);
  } else {
    console.log('VIEWPORT:');
    console.log(`  innerWidth: ${measurements.viewport.innerWidth}px\n`);

    console.log('RM6c.1: .grid-reveal-demo computed values:');
    console.log(`  Computed max-width: ${measurements.grid.computedMaxWidth}`);
    console.log(`  Computed width: ${measurements.grid.computedWidth}`);
    console.log(`  Bounding width: ${measurements.grid.boundingWidth}px`);
    console.log(`  Display: ${measurements.grid.display}`);
    console.log(`  Grid-template-columns: ${measurements.grid.gridTemplateColumns}`);
    console.log(`  Gap: ${measurements.grid.gap}`);
    console.log(`  Padding: ${measurements.grid.computedPadding}`);
    console.log(`  Margin: ${measurements.grid.computedMargin}\n`);

    console.log('RM6c.2: Overflow diagnosis:');
    console.log(`  Grid scrollWidth: ${measurements.grid.scrollWidth}px`);
    console.log(`  Grid offsetWidth: ${measurements.grid.offsetWidth}px`);
    console.log(`  Grid clientWidth: ${measurements.grid.clientWidth}px`);
    console.log(`  Difference (scroll - offset): ${measurements.grid.scrollWidth - measurements.grid.offsetWidth}px\n`);

    console.log('Parent container:');
    console.log(`  offsetWidth: ${measurements.parent.offsetWidth}px`);
    console.log(`  computedWidth: ${measurements.parent.computedWidth}`);
    console.log(`  Padding: ${measurements.parent.computedPadding}\n`);

    console.log('First tile:');
    console.log(`  offsetWidth: ${measurements.firstTile.offsetWidth}px`);
    console.log(`  computedWidth: ${measurements.firstTile.computedWidth}`);
    console.log(`  computedMinWidth: ${measurements.firstTile.computedMinWidth}\n`);

    console.log('ANALYSIS:');
    console.log(`  ${measurements.grid.tileCount} tiles in 3-column grid`);
    console.log(`  Max-width rule (300px) applies: ${measurements.grid.computedMaxWidth === '300px' ? 'YES' : 'NO (rule not applying!)'}`);
    console.log(`  Actual width: ${measurements.grid.boundingWidth}px`);
    if (measurements.grid.scrollWidth > measurements.viewport.innerWidth) {
      console.log(`  ⚠️  OVERFLOW: ${measurements.grid.scrollWidth - measurements.viewport.innerWidth}px`);
    }
  }

  await browser.close();
}

diagnoseGridReveal().catch(err => console.error(err.message));
