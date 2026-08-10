import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/404', { waitUntil: 'networkidle' });

const measurements = await page.evaluate(() => {
  const h1 = document.querySelector('.not-found-heading');
  const p = document.querySelector('.not-found-text');
  const a = document.querySelector('.not-found-cta');
  
  const getComputedVals = (el) => {
    const cs = window.getComputedStyle(el);
    return {
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      marginBlockStart: cs.marginBlockStart,
      marginBlockEnd: cs.marginBlockEnd,
    };
  };

  return {
    h1_1440: getComputedVals(h1),
    p_1440: getComputedVals(p),
    a_1440: getComputedVals(a),
  };
});

console.log('=== 1440px ===');
console.log('\nH1 (.not-found-heading):');
Object.entries(measurements.h1_1440).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('\nP (.not-found-text):');
Object.entries(measurements.p_1440).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
console.log('\nA (.not-found-cta):');
Object.entries(measurements.a_1440).forEach(([key, val]) => console.log(`  ${key}: ${val}`));

await browser.close();
