import { chromium } from 'playwright';

async function verifyButton(viewport) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: viewport, height: 900 });
  await page.goto('http://localhost:4322/welcome', { waitUntil: 'networkidle' });

  const actual = await page.evaluate(() => window.innerWidth);
  if (actual !== viewport) throw new Error(`Viewport: ${actual}px`);

  const result = await page.evaluate(() => {
    const btn = document.querySelector('.btn-wrapper');
    const section = document.querySelector('section');
    
    return {
      buttonScrollWidth: btn?.scrollWidth,
      buttonOffsetWidth: btn?.offsetWidth,
      buttonHeight: window.getComputedStyle(btn).height,
      sectionScrollWidth: section?.scrollWidth,
      sectionInnerWidth: window.innerWidth,
      overflowDetected: section?.scrollWidth > window.innerWidth,
      buttonText: btn?.textContent?.trim(),
      tapTargetSize: window.getComputedStyle(btn).height
    };
  });

  await browser.close();
  return { viewport, ...result };
}

console.log('═══════════════════════════════════════════════════════');
console.log('RM5a: Verify shortened label @ 375, 390, 414px');
console.log('═══════════════════════════════════════════════════════\n');

const results = await Promise.all([375, 390, 414].map(v => verifyButton(v)));

results.forEach(r => {
  console.log(`@${r.viewport}px:`);
  console.log(`  Button text: "${r.buttonText}"`);
  console.log(`  Button: scrollWidth=${r.buttonScrollWidth}px, offsetWidth=${r.buttonOffsetWidth}px`);
  console.log(`  Tap target height: ${r.tapTargetSize}`);
  console.log(`  Section overflow: ${r.overflowDetected ? '❌ YES' : '✅ NO'}`);
  console.log(`  Status: ${r.overflowDetected ? 'FAIL' : 'PASS'}\n`);
});
