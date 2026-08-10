import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

const scrollable = await page.evaluate(() => {
  // Find all divs with overflow:auto or similar
  const divs = document.querySelectorAll('div');
  const results = [];
  
  for (const div of divs) {
    const s = window.getComputedStyle(div);
    if ((s.overflowX === 'auto' || s.overflowX === 'scroll' || s.overflow === 'auto' || s.overflow === 'scroll') 
        && div.scrollWidth > div.clientWidth) {
      results.push({
        className: div.className.substring(0, 60),
        overflowX: s.overflowX,
        overflow: s.overflow,
        scrollBehavior: s.scrollBehavior,
        scrollWidth: div.scrollWidth,
        clientWidth: div.clientWidth
      });
    }
  }
  
  return results;
});

if (scrollable.length > 0) {
  console.log('Found horizontally scrollable elements:');
  scrollable.forEach((el, i) => {
    console.log(`\n[${i}] class="${el.className}"`);
    console.log(`    overflow: ${el.overflow}, overflow-x: ${el.overflowX}`);
    console.log(`    scroll-behavior: ${el.scrollBehavior}`);
    console.log(`    scrollWidth: ${el.scrollWidth}px, clientWidth: ${el.clientWidth}px`);
  });
} else {
  console.log('No horizontally scrollable elements found');
}

await browser.close();
