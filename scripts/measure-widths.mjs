import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });

console.log('Measuring at 1920px viewport:\n');

// Test Hero (1791px max-width)
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
const heroMeasure = await page.evaluate(() => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const computed = window.getComputedStyle(hero);
    return {
      element: 'hero',
      maxWidth: computed.maxWidth,
      width: computed.width,
      paddingLeft: computed.paddingLeft,
      paddingRight: computed.paddingRight,
      borderLeft: computed.borderLeftWidth
    };
  }
  return null;
});

console.log('Hero component (defines 1791px max-width):');
console.log(JSON.stringify(heroMeasure, null, 2));

// Test HeaderSplit (1786px max-width)
const headerSplitMeasure = await page.evaluate(() => {
  const elem = document.querySelector('.header-split');
  if (elem) {
    const computed = window.getComputedStyle(elem);
    return {
      element: 'header-split',
      maxWidth: computed.maxWidth,
      width: computed.width,
      paddingLeft: computed.paddingLeft,
      paddingRight: computed.paddingRight
    };
  }
  return null;
});

console.log('\nHeaderSplit component (defines 1786px max-width):');
console.log(JSON.stringify(headerSplitMeasure, null, 2));

console.log('\nDifference: 1791px (Hero) vs 1786px (HeaderSplit) = 5px');
console.log('Analysis: If both components have identical padding/borders,');
console.log('the 5px difference suggests intentional design variance.');

await browser.close();
