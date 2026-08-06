import { chromium } from 'playwright';

async function testButtonConfigs() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  // Inject CSS to test different padding/letter-spacing values
  const results = await page.evaluate(() => {
    const pricingInner = document.querySelector('.pricing-inner');
    const btn = pricingInner?.querySelector('.btn-wrapper');
    const btnText = btn?.querySelector('.btn-text');
    const btnLabel = btn?.querySelector('.btn-label');

    if (!btn || !btnText || !btnLabel) return { error: 'Elements not found' };

    // Current values
    const currentPadding = window.getComputedStyle(btnText).paddingLeft;
    const currentLetterSpacing = window.getComputedStyle(btnLabel).letterSpacing;
    const currentWidth = btn.scrollWidth;

    // Test scenarios
    const tests = [
      { name: 'Current', padding: '12px', letterSpacing: '2.8px' },
      { name: 'Padding reduced (8px)', padding: '8px', letterSpacing: '2.8px' },
      { name: 'Letter-spacing reduced (2px)', padding: '12px', letterSpacing: '2px' },
      { name: 'Both reduced (8px, 2px)', padding: '8px', letterSpacing: '2px' },
      { name: 'Both reduced (6px, 1.5px)', padding: '6px', letterSpacing: '1.5px' }
    ];

    const testResults = tests.map(test => {
      // Apply test values
      btnText.style.padding = `0 ${test.padding}`;
      btnLabel.style.letterSpacing = test.letterSpacing;

      const width = btn.scrollWidth;
      const fits = width <= 335;

      return {
        ...test,
        scrollWidth: width,
        fits: fits,
        reduction: currentWidth - width
      };
    });

    // Restore original
    btnText.style.padding = '';
    btnLabel.style.letterSpacing = '';

    return {
      currentWidth,
      targetWidth: 335,
      currentOverflow: currentWidth - 335,
      buttonText: btn.textContent.trim(),
      testResults
    };
  });

  await browser.close();
  return results;
}

console.log('═══════════════════════════════════════════════════════');
console.log('RM5b: Pricing button @ 375px - padding/letter-spacing tests');
console.log('═══════════════════════════════════════════════════════\n');

const results = await testButtonConfigs();

console.log(`Button: "${results.buttonText}"`);
console.log(`Current width: ${results.currentWidth}px`);
console.log(`Target width: ${results.targetWidth}px`);
console.log(`Current overflow: ${results.currentOverflow}px\n`);

console.log('Test scenarios:');
results.testResults.forEach(test => {
  console.log(`\n${test.name}:`);
  console.log(`  Padding: ${test.padding}, Letter-spacing: ${test.letterSpacing}`);
  console.log(`  Result width: ${test.scrollWidth}px`);
  console.log(`  Fits in 335px: ${test.fits ? '✅ YES' : '❌ NO'}`);
  console.log(`  Reduction: ${test.reduction}px`);
});

// Recommendation
const bestFit = results.testResults.find(t => t.fits);
if (bestFit) {
  console.log(`\n✅ RECOMMENDATION: ${bestFit.name}`);
  console.log(`   Padding: ${bestFit.padding}, Letter-spacing: ${bestFit.letterSpacing}`);
  console.log(`   Keeps text fully legible while eliminating overflow.`);
}
