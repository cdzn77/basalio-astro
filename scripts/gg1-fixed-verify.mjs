import { chromium } from 'playwright';

async function verifyPricingButton(viewport) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: viewport, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  // Assert viewport
  const actual = await page.evaluate(() => window.innerWidth);
  if (actual !== viewport) throw new Error(`Viewport mismatch: requested ${viewport}px, got ${actual}px`);

  const result = await page.evaluate(() => {
    const pricingSection = document.querySelector('.pricing-inner');
    const btn = pricingSection?.querySelector('.btn-wrapper');
    const sectionPadding = 40; // hardcoded in CSS
    const innerWidth = window.innerWidth;
    const availableWidth = innerWidth - (sectionPadding * 2);
    
    return {
      assertedInnerWidth: innerWidth,
      buttonScrollWidth: btn?.scrollWidth,
      buttonText: btn?.textContent?.trim(),
      sectionPadding: sectionPadding,
      computedAvailableWidth: availableWidth,
      headroom: availableWidth - (btn?.scrollWidth || 0)
    };
  });

  await browser.close();
  return { viewport, ...result };
}

console.log('═══════════════════════════════════════════════════════');
console.log('GG1.2: Fixed measurement - FF2.3 re-run');
console.log('═══════════════════════════════════════════════════════\n');

const results = await Promise.all([375, 390, 414].map(v => verifyPricingButton(v)));

results.forEach(r => {
  const compliant = r.headroom >= 20 ? '✅' : '❌';
  console.log(`@${r.viewport}px:`);
  console.log(`  Asserted innerWidth: ${r.assertedInnerWidth}px`);
  console.log(`  Button text: "${r.buttonText}"`);
  console.log(`  Button scrollWidth: ${r.buttonScrollWidth}px`);
  console.log(`  Computed available (${r.assertedInnerWidth} - ${r.sectionPadding*2}): ${r.computedAvailableWidth}px`);
  console.log(`  Headroom: ${r.headroom}px ${compliant} (need ≥20px)`);
  console.log(`  Status: ${r.headroom >= 20 ? 'PASS' : 'FAIL'}\n`);
});
