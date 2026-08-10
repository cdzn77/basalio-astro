import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

console.log('Investigating HeaderSplit max-width cascade:\n');

const cascade = await page.evaluate(() => {
  // Find the header-split-inner element
  const inner = document.querySelector('.header-split-inner');
  const outer = document.querySelector('.header-split');
  const section = document.querySelector('section.header-split-section');
  
  const results = {};
  
  if (outer) {
    const cs = window.getComputedStyle(outer);
    results['header-split (outer)'] = {
      maxWidth: cs.maxWidth,
      width: cs.width,
      padding: cs.padding,
      display: cs.display
    };
  }
  
  if (inner) {
    const cs = window.getComputedStyle(inner);
    results['header-split-inner'] = {
      maxWidth: cs.maxWidth,
      width: cs.width,
      padding: cs.padding,
      display: cs.display,
      margin: cs.margin
    };
  }
  
  if (section) {
    const cs = window.getComputedStyle(section);
    results['section.header-split-section'] = {
      maxWidth: cs.maxWidth,
      width: cs.width,
      padding: cs.padding,
      display: cs.display
    };
  }
  
  return results;
});

console.log(JSON.stringify(cascade, null, 2));

console.log('\n\nExpected: .header-split-inner should have maxWidth: 1786px');
console.log('Actual results show what is constraining the element.');

await browser.close();
