import { chromium } from 'playwright';

async function auditButtonChildren(viewport) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: viewport, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  const actual = await page.evaluate(() => window.innerWidth);
  if (actual !== viewport) throw new Error(`Viewport mismatch`);

  const result = await page.evaluate(() => {
    const btn = document.querySelector('.pricing-inner .btn-wrapper');
    const btnText = btn?.querySelector('.btn-text');
    const btnArrow = btn?.querySelector('.btn-arrow-container');

    return {
      viewport: window.innerWidth,
      buttonScrollWidth: btn?.scrollWidth,
      btnTextScrollWidth: btnText?.scrollWidth,
      btnArrowOffsetWidth: btnArrow?.offsetWidth,
      btnArrowComputedWidth: window.getComputedStyle(btnArrow).width,
      btnArrowMargin: `${window.getComputedStyle(btnArrow).marginLeft} / ${window.getComputedStyle(btnArrow).marginRight}`,
      // Check the wrapper itself
      wrapperGap: window.getComputedStyle(btn).gap,
      wrapperDisplay: window.getComputedStyle(btn).display,
      // Manual sum
      textPlusPadding: (btnText?.scrollWidth || 0),
      arrowWidth: (btnArrow?.offsetWidth || 0),
      calculatedSum: (btnText?.scrollWidth || 0) + (btnArrow?.offsetWidth || 0)
    };
  });

  await browser.close();
  return result;
}

console.log('═══════════════════════════════════════════════════════');
console.log('GG2: Button child widths — identifying growth');
console.log('═══════════════════════════════════════════════════════\n');

const results = await Promise.all([375, 390, 414].map(v => auditButtonChildren(v)));

results.forEach(r => {
  const difference = r.calculatedSum - r.buttonScrollWidth;
  console.log(`@${r.viewport}px:`);
  console.log(`  .btn-text scrollWidth: ${r.textPlusPadding}px`);
  console.log(`  .btn-arrow-container offsetWidth: ${r.arrowWidth}px`);
  console.log(`  Calculated sum (.btn-text + .btn-arrow): ${r.calculatedSum}px`);
  console.log(`  Actual button.scrollWidth: ${r.buttonScrollWidth}px`);
  console.log(`  Difference (overflow space): ${difference}px`);
  console.log(`  Wrapper gap: ${r.wrapperGap}`);
  console.log(`  Display: ${r.wrapperDisplay}\n`);
});
