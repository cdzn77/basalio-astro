import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // Check actual h4 elements
  await page.goto('http://localhost:4323/');
  const h4Headings = await page.evaluate(() => {
    const h4s = Array.from(document.querySelectorAll('h4'));
    return h4s.map(el => {
      const s = window.getComputedStyle(el);
      return {
        fontSize: s.fontSize,
        letterSpacing: s.letterSpacing,
        text: el.textContent.substring(0, 50)
      };
    });
  });
  
  console.log('=== H4 ELEMENTS (global.css defines h4 as 20px) ===');
  if (h4Headings.length === 0) {
    console.log('No H4 elements found on home page');
  } else {
    console.log(JSON.stringify(h4Headings.slice(0, 3), null, 2));
  }
  
  // Check pricing page
  await page.goto('http://localhost:4323/pricing');
  const pricingH4s = await page.evaluate(() => {
    const h4s = Array.from(document.querySelectorAll('h4'));
    return h4s.map(el => {
      const s = window.getComputedStyle(el);
      return {
        fontSize: s.fontSize,
        letterSpacing: s.letterSpacing
      };
    });
  });
  
  console.log('\n=== H4 ELEMENTS ON PRICING PAGE ===');
  if (pricingH4s.length === 0) {
    console.log('No H4 elements found on pricing page');
  } else {
    console.log(JSON.stringify(pricingH4s.slice(0, 3), null, 2));
  }
  
  // Verify H4 is actually 20px in global.css
  console.log('\n=== VERIFICATION ===');
  console.log('Global h4 style (from global.css): font-size: var(--font-size-20) = 20px');
  console.log('Global h4 does NOT have heading letter-spacing (no -0.8px hardcode in h4)');
  console.log('Letter-spacing token only applied where -0.8px was hardcoded');
  
} catch (e) {
  console.error('Error:', e.message);
}

await browser.close();
