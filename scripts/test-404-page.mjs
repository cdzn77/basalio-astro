import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Navigate to non-existent path — dev server will serve 404.astro
await page.goto('http://localhost:4321/nonexistent-path', { waitUntil: 'networkidle' });

// Take screenshot
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/404-page-1440x900.png' });

// Check what rendered
const title = await page.title();
const heading = await page.$eval('h1', el => el.textContent);
const linkText = await page.$eval('a', el => el.textContent);

console.log('✓ Screenshot: /nonexistent-path renders 404 page');
console.log(`Title: "${title}"`);
console.log(`H1: "${heading}"`);
console.log(`Link: "${linkText}"`);

await browser.close();
