import { chromium } from 'playwright';

async function verifyRM6c() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const viewport = await page.evaluate(() => window.innerWidth);
  const gridData = await page.evaluate(() => {
    const grid = document.querySelector('.grid-reveal-demo');
    const style = window.getComputedStyle(grid);
    
    return {
      scrollWidth: grid.scrollWidth,
      offsetWidth: grid.offsetWidth,
      gridTemplateColumns: style.gridTemplateColumns,
      gap: style.gap,
      tiles: grid.querySelectorAll('.grid-tile').length
    };
  });

  console.log(`Viewport: ${viewport}px`);
  console.log(`Grid scrollWidth: ${gridData.scrollWidth}px`);
  console.log(`Grid offsetWidth: ${gridData.offsetWidth}px`);
  console.log(`Columns: ${gridData.gridTemplateColumns}`);
  console.log(`Gap: ${gridData.gap}`);
  console.log(`Tiles: ${gridData.tiles}`);
  console.log(`Overflow: ${gridData.scrollWidth > viewport ? 'YES ❌' : 'NO ✅'}`);

  await browser.close();
}

verifyRM6c().catch(err => console.error(err.message));
