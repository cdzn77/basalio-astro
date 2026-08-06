import { chromium } from 'playwright';

async function inspectStyles() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const info = await page.evaluate(() => {
    const dc = document.querySelector('.demo-container');
    const grd = document.querySelector('.grid-reveal-demo');
    
    if (!dc || !grd) return { error: 'elements not found' };

    const dcStyles = window.getComputedStyle(dc);
    const grdStyles = window.getComputedStyle(grd);

    return {
      demoContainer: {
        overflow: dcStyles.overflow,
        overflowX: dcStyles.overflowX,
        overflowY: dcStyles.overflowY,
        width: dcStyles.width,
        maxWidth: dcStyles.maxWidth,
        boxSizing: dcStyles.boxSizing,
        padding: dcStyles.padding,
        scrollWidth: dc.scrollWidth,
        offsetWidth: dc.offsetWidth
      },
      gridRevealDemo: {
        display: dcStyles.display,
        width: grdStyles.width,
        maxWidth: grdStyles.maxWidth,
        gridTemplateColumns: grdStyles.gridTemplateColumns,
        gap: grdStyles.gap,
        scrollWidth: grd.scrollWidth,
        offsetWidth: grd.offsetWidth,
        overflow: grdStyles.overflow
      }
    };
  });

  console.log(JSON.stringify(info, null, 2));

  await browser.close();
}

inspectStyles().catch(err => console.error(err.message));
