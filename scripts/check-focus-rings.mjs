import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

// Find header dropdown button and tab to it
const dropdownBtn = await page.$('.menu-btn');
if (dropdownBtn) {
  await dropdownBtn.focus();
  const focusColor = await page.evaluate(() => {
    const elem = document.querySelector('.menu-btn:focus-visible');
    if (elem) {
      return window.getComputedStyle(elem).outline;
    }
    return 'no focus-visible';
  });
  console.log('Header dropdown button focus-visible outline:', focusColor);
}

// Check for a form field (contact page)
await page.goto('http://localhost:4321/contact', { waitUntil: 'networkidle' });
const formInputs = await page.$$('input, textarea, button[type="submit"]');
console.log(`\nFound ${formInputs.length} form elements on /contact`);

if (formInputs.length > 0) {
  // Focus the first input
  await formInputs[0].focus();
  const focusStyle = await page.evaluate(() => {
    const elem = document.activeElement;
    if (elem) {
      const style = window.getComputedStyle(elem);
      return {
        outline: style.outline,
        outlineColor: style.outlineColor,
        boxShadow: style.boxShadow,
        borderColor: style.borderColor
      };
    }
    return 'no element';
  });
  console.log('Form input focus style:', focusStyle);
}

await browser.close();
console.log('\n✓ Focus ring inspection complete');
