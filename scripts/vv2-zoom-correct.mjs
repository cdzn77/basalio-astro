import { chromium } from 'playwright';

async function vv2() {
  const browser = await chromium.launch({ headless: true });

  console.log('VV2: Correct 400% zoom simulation at 320px CSS px\n');
  
  // VV2.2: Correct method: viewport 1280/4 = 320px CSS px
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // VV2.1: Report how zoom was applied previously (wrong way)
  console.log('VV2.1: Previous zoom method (incorrect):');
  console.log('  Used: document.body.style.zoom = "400%"');
  console.log('  Problem: Does not re-trigger media queries or reflow\n');

  // VV2.2: New method
  console.log('VV2.2: Correct zoom method (this run):');
  console.log('  Used: viewport width 320px (1280px ÷ 4 = 320px CSS px)\n');

  // VV2.3: Report scrollWidth vs innerWidth
  const data = await page.evaluate(() => {
    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
      overflow: document.documentElement.scrollWidth - window.innerWidth
    };
  });

  console.log('VV2.3: Document reflow at 320px viewport:');
  console.log(`  innerWidth: ${data.innerWidth}px`);
  console.log(`  documentElement.scrollWidth: ${data.scrollWidth}px`);
  console.log(`  Horizontal scrollbar: ${data.hasHorizontalScroll ? '❌ PRESENT' : '✅ NONE'}`);
  console.log(`  Overflow: ${data.overflow}px`);

  if (data.hasHorizontalScroll) {
    console.log(`\n⚠️ 320px viewport has overflow: ${data.overflow}px`);
    console.log('   WCAG 1.4.10 (reflow at 320px CSS px) is FAILING');
  } else {
    console.log(`\n✅ 320px viewport reflows correctly, no horizontal scroll`);
  }

  await browser.close();
}

vv2().catch(err => console.error(err.message));
