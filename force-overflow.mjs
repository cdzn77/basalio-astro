import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

// Force overflow on first section
await page.evaluate(() => {
  const section = document.querySelector('section');
  if (section) {
    section.style.width = '200vw';
    console.log(`Injected width: 200vw on first section`);
    console.log(`scrollWidth now: ${section.scrollWidth}px, innerWidth: ${window.innerWidth}px`);
  }
});

await browser.close();
