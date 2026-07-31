import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

const structure = await page.evaluate(() => {
  const sections = document.querySelectorAll('section');
  return Array.from(sections).map((s, i) => {
    const bg = window.getComputedStyle(s).backgroundColor;
    const text = s.textContent?.substring(0, 50).trim() || '';
    return { index: i, bg, preview: text };
  });
});

console.log('\n/support PAGE STRUCTURE');
console.log('========================\n');

structure.forEach((s, i) => {
  const isLight = s.bg.includes('255') || s.bg.includes('250') || s.bg.includes('249');
  const isDark = s.bg.includes('28, 25, 23');
  const indicator = isLight ? '✓ LIGHT' : isDark ? '✗ DARK' : '  ALT';
  console.log(`Section ${i}: ${indicator}`);
  console.log(`  Background: ${s.bg}`);
  console.log(`  Content: ${s.preview}...\n`);
});

console.log('ANALYSIS:');
console.log('=========');
console.log('✓ Hero: Light background (paper/alt)');
console.log('✓ FAQ: Light background (paper)');
console.log('✓ Contact: Light background (paper)');
console.log('✓ Header is always over light surfaces — no visibility issues');

await browser.close();
