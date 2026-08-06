import { chromium } from 'playwright';

async function inspectRamp() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  // Get ALL divs with interesting widths and overflow properties
  const allElements = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll('div'));
    const interesting = divs
      .filter(d => {
        const style = window.getComputedStyle(d);
        const rect = d.getBoundingClientRect();
        // Look for elements between 200-375px width with overflow or multiple children
        return rect.width > 200 && rect.width <= 375 && d.children.length > 1;
      })
      .slice(0, 20)
      .map(d => {
        const style = window.getComputedStyle(d);
        const rect = d.getBoundingClientRect();
        return {
          className: d.className?.slice(0, 50),
          boundingWidth: Math.round(rect.width),
          offsetWidth: d.offsetWidth,
          scrollWidth: d.scrollWidth,
          overflowX: style.overflowX,
          overflowY: style.overflowY,
          childrenCount: d.children.length,
          firstChildText: d.children[0]?.textContent?.slice(0, 30)
        };
      });
    
    return interesting;
  });

  console.log('Elements sized 200-375px with multiple children:');
  allElements.forEach((el, i) => {
    console.log(`\n[${i}] ${el.className || '(no class)'}`);
    console.log(`    Width: ${el.boundingWidth}px (offset: ${el.offsetWidth}, scroll: ${el.scrollWidth})`);
    console.log(`    Overflow: ${el.overflowX} / ${el.overflowY}`);
    console.log(`    Children: ${el.childrenCount}`);
    console.log(`    First child: "${el.firstChildText}..."`);
  });

  await browser.close();
}

inspectRamp().catch(err => console.error(err.message));
