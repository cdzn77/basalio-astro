import { chromium } from 'playwright';

async function verifyPricingButton(viewport) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: viewport, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  const actual = await page.evaluate(() => window.innerWidth);
  if (actual !== viewport) throw new Error(`Viewport mismatch: requested ${viewport}px, got ${actual}px`);

  const result = await page.evaluate(() => {
    const pricingInner = document.querySelector('.pricing-inner');
    const btn = pricingInner?.querySelector('.btn-wrapper');
    
    // Measure the container at THIS viewport
    const pricingInnerRect = pricingInner?.getBoundingClientRect();
    const pricingInnerComputedWidth = window.getComputedStyle(pricingInner).width;
    
    return {
      assertedInnerWidth: window.innerWidth,
      pricingInnerOffsetWidth: pricingInner?.offsetWidth,
      pricingInnerComputedWidth: pricingInnerComputedWidth,
      pricingInnerBoundingWidth: pricingInnerRect?.width,
      buttonScrollWidth: btn?.scrollWidth,
      buttonLabel: btn?.textContent?.trim(),
      // Recalculate headroom based on actual container width
      actualAvailableWidth: pricingInner?.offsetWidth,
      headroom: (pricingInner?.offsetWidth || 0) - (btn?.scrollWidth || 0)
    };
  });

  await browser.close();
  return { viewport: actual, ...result };
}

console.log('═══════════════════════════════════════════════════════');
console.log('GG1.2 CORRECTED: Re-measure pricing button at each viewport');
console.log('  (measuring actual .pricing-inner width, not stale values)');
console.log('═══════════════════════════════════════════════════════\n');

const results = await Promise.all([375, 390, 414].map(v => verifyPricingButton(v)));

results.forEach(r => {
  const compliant = r.headroom >= 20 ? '✅ PASS' : '❌ FAIL';
  console.log(`@${r.viewport}px (asserted): ${r.assertedInnerWidth}px`);
  console.log(`  Label: "${r.buttonLabel}"`);
  console.log(`  Measured .pricing-inner (offsetWidth): ${r.actualAvailableWidth}px`);
  console.log(`  Button scrollWidth: ${r.buttonScrollWidth}px`);
  console.log(`  Headroom: ${r.headroom}px ${compliant} (need ≥20px)`);
  console.log(`  Status: ${r.headroom >= 20 ? 'PASS' : 'FAIL'}\n`);
});
