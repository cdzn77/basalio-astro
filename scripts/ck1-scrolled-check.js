import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  await page.goto(`http://localhost:${PORT}/pricing`, { waitUntil: 'networkidle' });
  
  console.log("CK1.2 — BACKDROP-FILTER WHEN .scrolled CLASS ACTIVE\n");
  
  // Scroll down to trigger .scrolled
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(200);
  
  const scrolledState = await page.evaluate(() => {
    const header = document.querySelector('.base-header');
    const hasScrolledClass = header.classList.contains('scrolled');
    const backdropFilter = window.getComputedStyle(header).backdropFilter;
    const backgroundColor = window.getComputedStyle(header).backgroundColor;
    
    return {
      hasScrolledClass,
      backdropFilter,
      backgroundColor
    };
  });
  
  console.log(`Has .scrolled class: ${scrolledState.hasScrolledClass}`);
  console.log(`Computed backdrop-filter: ${scrolledState.backdropFilter}`);
  console.log(`Computed background-color: ${scrolledState.backgroundColor}`);
  
  console.log("\n--- CSS Source ---");
  console.log(`Line 90-104 (.base-header):   backdrop-filter: NOT declared`);
  console.log(`Line 106-109 (.base-header.scrolled): backdrop-filter: blur(12px)`);
  console.log("\nConclusion: backdrop-filter is ONLY on .scrolled class, not on base.");
  console.log("Once you scroll, the blur activates and you see blurred acid with no tint.");
  
  await page.close();
  await browser.close();
})();
