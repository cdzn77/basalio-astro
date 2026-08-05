import { chromium } from 'playwright';

const viewports = [
  { width: 375, height: 667 },   // Mobile
  { width: 768, height: 1024 },  // Tablet
  { width: 1280, height: 720 },  // Laptop
  { width: 1920, height: 1080 }  // Desktop
];

async function measureH2(browser, viewport) {
  const page = await browser.newPage();
  await page.setViewportSize(viewport);
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const h2Style = await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    if (!h2) return { error: 'No h2 found' };
    const style = window.getComputedStyle(h2);
    return {
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight
    };
  });

  await page.close();
  return { viewport: `${viewport.width}x${viewport.height}`, ...h2Style };
}

async function main() {
  const browser = await chromium.launch();
  
  console.log('\n=== H2 COMPUTED SIZES AT DIFFERENT VIEWPORTS ===\n');
  for (const vp of viewports) {
    const result = await measureH2(browser, vp);
    console.log(`${result.viewport}: ${result.fontSize} (family: ${result.fontFamily.split(',')[0].trim()})`);
  }

  await browser.close();
}

main().catch(console.error);
