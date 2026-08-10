import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

for (const vp of [375, 1440]) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: vp, height: 900 });
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
      h1: getComputedVals(h1),
      p: getComputedVals(p),
      a: getComputedVals(a),
    };
  });

  console.log(`=== ${vp}px ===\n`);
  console.log('H1 (.not-found-heading):');
  Object.entries(measurements.h1).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
  console.log('\nP (.not-found-text):');
  Object.entries(measurements.p).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
  console.log('\nA (.not-found-cta):');
  Object.entries(measurements.a).forEach(([key, val]) => console.log(`  ${key}: ${val}`));
  console.log('');

  await page.close();
}

await browser.close();
