import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

console.log('Testing Button font-weight on / (homepage):\n');
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const homeButton = await page.evaluate(() => {
  const btn = document.querySelector('.btn-label');
  if (btn) {
    return {
      text: btn.textContent,
      computedFontWeight: window.getComputedStyle(btn).fontWeight,
      computedFontSize: window.getComputedStyle(btn).fontSize
    };
  }
  return null;
});

console.log('Homepage button (.btn-label):');
console.log(JSON.stringify(homeButton, null, 2));

console.log('\n\nTesting Button font-weight on /pricing:\n');
await page.goto('http://localhost:4321/pricing', { waitUntil: 'networkidle' });

const pricingButton = await page.evaluate(() => {
  const btn = document.querySelector('.btn-label');
  if (btn) {
    return {
      text: btn.textContent,
      computedFontWeight: window.getComputedStyle(btn).fontWeight,
      computedFontSize: window.getComputedStyle(btn).fontSize
    };
  }
  return null;
});

console.log('Pricing button (.btn-label):');
console.log(JSON.stringify(pricingButton, null, 2));

await browser.close();
