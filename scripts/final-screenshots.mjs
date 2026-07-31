import { chromium } from 'playwright';

const routes = ['/', '/blocks', '/pricing', '/support', '/contact'];
const browser = await chromium.launch();

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  const filename = route === '/' ? 'homepage' : route.substring(1);
  await page.screenshot({ path: `/tmp/final-${filename}.png`, fullPage: false });
  await page.close();
  console.log(`✓ /tmp/final-${filename}.png`);
}

// Dropdown screenshot
const dropdownPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await dropdownPage.goto(`http://localhost:4321/`, { waitUntil: 'networkidle' });
await dropdownPage.locator('.menu-btn').click();
await dropdownPage.waitForTimeout(400);
await dropdownPage.screenshot({ path: `/tmp/final-dropdown.png`, fullPage: false });
console.log(`✓ /tmp/final-dropdown.png`);

await browser.close();
