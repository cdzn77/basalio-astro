import { chromium } from 'playwright';

async function verifyPricingButton(viewport) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: viewport, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  const actual = await page.evaluate(() => window.innerWidth);
  if (actual !== viewport) throw new Error(`Viewport: ${actual}px`);

  const result = await page.evaluate(() => {
    const pricingInner = document.querySelector('.pricing-inner');
    const btn = pricingInner?.querySelector('.btn-wrapper');
    
    return {
      buttonScrollWidth: btn?.scrollWidth,
      buttonText: btn?.textContent?.trim(),
      availableWidth: 335, // .pricing-inner content area (375 - 40px padding)
      headroom: 335 - (btn?.scrollWidth || 0)
    };
  });

  await browser.close();
  return { viewport, ...result };
}

console.log('═══════════════════════════════════════════════════════');
console.log('FF2.3: Verify shortened pricing label @ 375, 390, 414px');
console.log('═══════════════════════════════════════════════════════\n');

const results = await Promise.all([375, 390, 414].map(v => verifyPricingButton(v)));

results.forEach(r => {
  const compliant = r.headroom >= 20 ? '✅' : '❌';
  console.log(`@${r.viewport}px:`);
  console.log(`  Button text: "${r.buttonText}"`);
  console.log(`  Button width: ${r.buttonScrollWidth}px`);
  console.log(`  Available: ${r.availableWidth}px`);
  console.log(`  Headroom: ${r.headroom}px ${compliant} (need ≥20px)`);
  console.log(`  Status: ${r.headroom >= 20 ? 'PASS' : 'FAIL'}\n`);
});
