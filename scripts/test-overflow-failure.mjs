import { chromium } from 'playwright';

async function testFailure() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Inject deliberate overflow
  await page.evaluate(() => {
    const section = document.querySelector('section');
    if (section) {
      section.style.width = '500px'; // Force overflow on 375px viewport
      console.log('[TEST] Injected deliberate overflow: section width 500px on 375px viewport');
    }
  });

  await page.waitForTimeout(300);

  // Now run the assertion
  const result = await page.evaluate(() => {
    const innerWidth = window.innerWidth;
    const section = document.querySelector('section');
    const scrollWidth = section?.scrollWidth || 0;
    const pass = scrollWidth <= innerWidth;
    
    return {
      viewportWidth: innerWidth,
      sectionScrollWidth: scrollWidth,
      pass,
      overflow: scrollWidth - innerWidth
    };
  });

  console.log('\n[TEST] Assertion result:');
  console.log(`  Viewport width: ${result.viewportWidth}px`);
  console.log(`  Section scrollWidth: ${result.sectionScrollWidth}px`);
  console.log(`  Pass: ${result.pass ? 'YES' : 'NO'}`);
  console.log(`  Overflow: ${result.overflow}px`);
  console.log(`\nExpected: FAIL (non-zero overflow)\nActual: ${result.pass ? '✅ PASS (FALSE NEGATIVE!)' : '❌ FAIL (correct behavior)'}`);

  await browser.close();
  
  // Exit with non-zero if assertion passed (should have failed)
  process.exit(result.pass ? 1 : 0);
}

testFailure().catch(err => {
  console.error(err.message);
  process.exit(2);
});
