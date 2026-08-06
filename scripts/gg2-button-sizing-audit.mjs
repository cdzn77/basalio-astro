import { chromium } from 'playwright';

async function auditButtonSizing(viewport) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: viewport, height: 900 });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  const actual = await page.evaluate(() => window.innerWidth);
  if (actual !== viewport) throw new Error(`Viewport mismatch: requested ${viewport}px, got ${actual}px`);

  const result = await page.evaluate(() => {
    const pricingSection = document.querySelector('.pricing-inner');
    const btn = pricingSection?.querySelector('.btn-wrapper');
    const btnText = btn?.querySelector('.btn-text');

    return {
      assertedViewport: window.innerWidth,
      buttonScrollWidth: btn?.scrollWidth,
      computedFontSize: window.getComputedStyle(btnText).fontSize,
      computedLetterSpacing: window.getComputedStyle(btnText).letterSpacing,
      computedWidth: window.getComputedStyle(btn).width,
      computedMaxWidth: window.getComputedStyle(btn).maxWidth,
      buttonTextContent: btn?.textContent?.trim().substring(0, 30),
      // Check for responsive sizing
      btnTextComputedStyle: {
        fontSize: window.getComputedStyle(btnText).fontSize,
        lineHeight: window.getComputedStyle(btnText).lineHeight,
        padding: `${window.getComputedStyle(btnText).paddingLeft} / ${window.getComputedStyle(btnText).paddingRight}`,
        width: window.getComputedStyle(btnText).width
      }
    };
  });

  await browser.close();
  return { viewport: actual, ...result };
}

console.log('═══════════════════════════════════════════════════════');
console.log('GG2: Button font-size and responsive sizing audit');
console.log('═══════════════════════════════════════════════════════\n');

const results = await Promise.all([375, 390, 414].map(v => auditButtonSizing(v)));

results.forEach(r => {
  console.log(`@${r.viewport}px:`);
  console.log(`  Text: "${r.buttonTextContent}..."`);
  console.log(`  Button scrollWidth: ${r.buttonScrollWidth}px`);
  console.log(`  Font size: ${r.btnTextComputedStyle.fontSize}`);
  console.log(`  Letter spacing: ${r.computedLetterSpacing}`);
  console.log(`  Button width (CSS): ${r.computedWidth}`);
  console.log(`  Button max-width (CSS): ${r.computedMaxWidth}`);
  console.log(`  .btn-text width: ${r.btnTextComputedStyle.width}`);
  console.log(`  .btn-text padding: ${r.btnTextComputedStyle.padding}\n`);
});
