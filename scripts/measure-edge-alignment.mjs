import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

console.log('=== DS10a: HERO vs SECTION EDGE ALIGNMENT (1920px) ===\n');

const edgeData = await page.evaluate(() => {
  const hero = document.querySelector('.hero');
  const headerSplit = document.querySelector('.header-split-inner');
  
  let heroRect = null;
  let sectionRect = null;
  
  if (hero) {
    const rect = hero.getBoundingClientRect();
    heroRect = {
      element: '.hero',
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width)
    };
  }
  
  if (headerSplit) {
    const rect = headerSplit.getBoundingClientRect();
    sectionRect = {
      element: '.header-split-inner',
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width)
    };
  }
  
  return { heroRect, sectionRect };
});

console.log('Hero edges:');
console.log(`  Left: ${edgeData.heroRect.left}px, Right: ${edgeData.heroRect.right}px`);
console.log(`  Width: ${edgeData.heroRect.width}px`);

console.log('\nHeader-split-inner edges (below hero):');
console.log(`  Left: ${edgeData.sectionRect.left}px, Right: ${edgeData.sectionRect.right}px`);
console.log(`  Width: ${edgeData.sectionRect.width}px`);

console.log('\nAlignment check:');
const leftDiff = Math.abs(edgeData.heroRect.left - edgeData.sectionRect.left);
const rightDiff = Math.abs(edgeData.heroRect.right - edgeData.sectionRect.right);
console.log(`  Left edge difference: ${leftDiff}px`);
console.log(`  Right edge difference: ${rightDiff}px`);

if (leftDiff < 3 && rightDiff < 3) {
  console.log('  → ALIGNED (edges within 2.5px)');
} else {
  console.log(`  → MISALIGNED (${leftDiff}px / ${rightDiff}px apart)`);
}

await browser.close();
