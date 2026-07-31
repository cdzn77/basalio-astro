import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });
await page.locator('.menu-btn').click();
await page.waitForTimeout(400);

const linkColors = await page.evaluate(() => {
  const items = document.querySelectorAll('.menu-item');
  return Array.from(items).map(item => ({
    text: item.textContent.trim(),
    foreground: window.getComputedStyle(item).color,
    background: window.getComputedStyle(item).backgroundColor,
    parentBg: window.getComputedStyle(item.parentElement).backgroundColor
  }));
});

console.log('\nMENU ITEM COLORS (Inside dropdown):');
linkColors.forEach(link => {
  console.log(`\n${link.text}:`);
  console.log(`  Link foreground: ${link.foreground}`);
  console.log(`  Link own bg: ${link.background}`);
  console.log(`  Parent bg: ${link.parentBg}`);
});

await browser.close();
