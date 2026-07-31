import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

// Take full page screenshot
await page.screenshot({ path: '/tmp/blocks-page.png', fullPage: true });

// Get all major section headings
const headings = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
    tag: h.tagName,
    text: h.textContent.substring(0, 50)
  }));
});

console.log('Page headings:');
headings.forEach(h => console.log(`  ${h.tag}: ${h.text}`));

await browser.close();
