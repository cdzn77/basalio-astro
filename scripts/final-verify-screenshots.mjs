import { chromium } from 'playwright';

const routes = ['/support', '/terms', '/privacy'];
const browser = await chromium.launch();

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  const name = route.substring(1);
  await page.screenshot({ path: `/tmp/fixed-${name}.png`, fullPage: false });
  console.log(`✓ /tmp/fixed-${name}.png`);
  await page.close();
}

await browser.close();
