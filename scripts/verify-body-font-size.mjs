import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

const routes = ['/support', '/contact', '/terms', '/privacy', '/roadmap'];
const results = {};

for (const route of routes) {
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    // Find the first plain <p> tag (not inside special containers)
    const paragraphs = document.querySelectorAll('p');
    for (const p of paragraphs) {
      const s = window.getComputedStyle(p);
      const fontSize = s.fontSize;
      if (fontSize === '18px') {
        return {
          selector: 'p (plain paragraph)',
          fontSize,
          lineHeight: s.lineHeight
        };
      }
    }
    // If no 18px found, return the first p we find
    if (paragraphs.length > 0) {
      const s = window.getComputedStyle(paragraphs[0]);
      return {
        selector: 'p (first paragraph)',
        fontSize: s.fontSize,
        lineHeight: s.lineHeight
      };
    }
    return { error: 'No paragraphs found' };
  });

  results[route] = result;
}

console.log('Body copy font-size audit:\n');
Object.entries(results).forEach(([route, data]) => {
  if (data.error) {
    console.log(`${route}: ${data.error}`);
  } else {
    console.log(`${route}: ${data.fontSize} / ${data.lineHeight} (${data.selector})`);
  }
});

await browser.close();
