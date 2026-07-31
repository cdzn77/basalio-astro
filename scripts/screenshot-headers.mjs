import { chromium } from 'playwright';

async function screenshot(route, filename) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/tmp/${filename}.png`, fullPage: false });
  console.log(`✓ ${filename}`);
  await browser.close();
}

await screenshot('/', 'homepage-header');
await screenshot('/roadmap', 'roadmap-header');
