import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

// Open menu to show dropdown
await page.locator('.menu-btn').click();
await page.waitForTimeout(400);

// Take screenshot
await page.screenshot({ path: '/tmp/header-with-padding.png', fullPage: false });

// Verify menu item height
const itemHeights = await page.evaluate(() => {
  const items = document.querySelectorAll('.menu-item');
  return Array.from(items).map((item, idx) => ({
    index: idx,
    text: item.textContent.trim().substring(0, 10),
    height: item.offsetHeight,
    width: item.offsetWidth,
    computedHeight: window.getComputedStyle(item).height,
    computedWidth: window.getComputedStyle(item).width
  })).slice(0, 3);
});

console.log('\nHEADER PADDING VERIFICATION');
console.log('===========================\n');
itemHeights.forEach(item => {
  console.log(`"${item.text}":`);
  console.log(`  Offset: ${item.width}×${item.height}px`);
  console.log(`  Computed: ${item.computedWidth} × ${item.computedHeight}`);
  console.log(`  ✓ Target size satisfied: ${item.height >= 24 ? 'YES' : 'NO'}`);
  console.log();
});

await browser.close();
