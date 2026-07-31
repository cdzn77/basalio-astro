import { chromium } from 'playwright';

async function checkRoute(browser, route, label) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  
  // Get header container class
  const headerClass = await page.evaluate(() => {
    const container = document.querySelector('.header-container');
    return container?.className || 'not found';
  });
  
  const sections = await page.evaluate(() => {
    const main = document.querySelector('.base-main');
    if (!main) return [];
    const sects = main.querySelectorAll('section');
    return Array.from(sects).map((s, i) => {
      const bg = window.getComputedStyle(s).backgroundColor;
      return {
        index: i,
        bg,
        isDark: bg.includes('rgb') ? (() => {
          const match = bg.match(/\d+/g);
          if (!match) return false;
          const [r, g, b] = match.slice(0, 3).map(Number);
          return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
        })() : false
      };
    });
  });
  
  const isInverted = headerClass.includes('is-inverted');
  const firstDark = sections[0]?.isDark;
  const correct = (isInverted && firstDark) || (!isInverted && !firstDark);
  
  console.log(`\n${label}: ${route}`);
  console.log(`  Header state: ${isInverted ? '✓ INVERTED' : '  DEFAULT'}`);
  console.log(`  First section: ${sections[0]?.bg} (dark: ${firstDark})`);
  console.log(`  Match: ${correct ? '✓' : '✗'}`);
  
  await page.close();
}

const browser = await chromium.launch();
const routes = [
  ['/', 'Homepage'],
  ['/pricing', 'Pricing'],
  ['/roadmap', 'Roadmap'],
  ['/support', 'Support'],
  ['/terms', 'Terms'],
  ['/privacy', 'Privacy'],
  ['/blocks', 'Blocks'],
  ['/contact', 'Contact'],
];

for (const [route, label] of routes) {
  await checkRoute(browser, route, label);
}

await browser.close();
