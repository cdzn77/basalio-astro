import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

console.log('=== CHECKING ACTUAL STYLE SOURCES ===\n');

// Get the element that supposedly has the undefined token styles
const info = await page.evaluate(() => {
  const elem = document.querySelector('.testimonials-v2');
  if (elem) {
    return {
      computedPadding: window.getComputedStyle(elem).padding,
      inlineStyle: elem.getAttribute('style'),
      classes: elem.className
    };
  }
  return { error: 'Element not found' };
});

console.log('Element with padding 200px:');
console.log(JSON.stringify(info, null, 2));

await browser.close();
