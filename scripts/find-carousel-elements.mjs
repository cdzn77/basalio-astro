import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

const elements = await page.evaluate(() => {
  // Search for carousel-related elements
  const allElems = document.querySelectorAll('[class*="carousel"], [class*="row"], [class*="track"]');
  const results = [];
  
  for (const el of allElems) {
    if (el.className.includes('carousel') || el.className.includes('track') || el.className.includes('row')) {
      const s = window.getComputedStyle(el);
      results.push({
        tag: el.tagName,
        className: el.className.substring(0, 50),
        overflowX: s.overflowX,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        canScroll: el.scrollWidth > el.clientWidth
      });
    }
  }
  
  return results.slice(0, 10);
});

console.log('Found carousel-related elements:');
elements.forEach((el, i) => {
  console.log(`\n[${i}] <${el.tag} class="${el.className}">`);
  console.log(`    overflow-x: ${el.overflowX}`);
  console.log(`    scrollWidth: ${el.scrollWidth}px, clientWidth: ${el.clientWidth}px`);
  console.log(`    Can scroll: ${el.canScroll}`);
});

await browser.close();
