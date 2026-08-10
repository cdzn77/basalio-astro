import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

console.log('Taking screenshots of carousel at mobile breakpoints...\n');

for (const width of [375, 320]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  // Scroll to blocks section
  await page.evaluate(() => {
    const section = document.querySelector('[data-section="blocks"]') || 
                    document.querySelector('.blocks-section') ||
                    document.querySelector('.courses-row');
    if (section) {
      section.scrollIntoView();
    }
  });

  await page.waitForTimeout(500);

  const filename = `verification/carousel-${width}px.png`;
  await page.screenshot({ path: filename, fullPage: false });
  console.log(`✓ ${filename}`);
}

await browser.close();
