import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

const btns = await page.evaluate(() => {
  const allBtns = document.querySelectorAll('button');
  const results = [];
  for (const btn of allBtns) {
    if (btn.className.includes('carousel') || btn.className.includes('prev') || btn.className.includes('next')) {
      results.push({
        className: btn.className.substring(0, 60),
        disabled: btn.disabled,
        ariaLabel: btn.getAttribute('aria-label')
      });
    }
  }
  return results;
});

console.log('Found carousel buttons:');
btns.forEach((btn, i) => {
  console.log(`[${i}] class="${btn.className}" disabled=${btn.disabled} aria-label="${btn.ariaLabel}"`);
});

await browser.close();
