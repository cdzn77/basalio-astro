import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  
  console.log("CK1.1 — COMPUTED BACKGROUND-COLOR ON .base-header\n");
  
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  
  const headerComputedBg = await page.locator('.base-header').evaluate(el =>
    window.getComputedStyle(el).backgroundColor
  );
  
  console.log(`Computed background-color: ${headerComputedBg}`);
  
  console.log("\nCK1.2 — BACKDROP-FILTER DECLARATION CHECK\n");
  
  const backdropFilters = await page.evaluate(() => {
    const header = document.querySelector('.base-header');
    const baseRule = window.getComputedStyle(header).backdropFilter;
    
    // Check if .scrolled class is applied
    const hasScrolledClass = header.classList.contains('scrolled');
    
    return {
      baseBackdropFilter: baseRule,
      hasScrolledClass: hasScrolledClass
    };
  });
  
  console.log(`Base backdrop-filter: ${backdropFilters.baseBackdropFilter}`);
  console.log(`Has .scrolled class: ${backdropFilters.hasScrolledClass}`);
  console.log("\nNote: backdrop-filter declared on BOTH .base-header and .base-header.scrolled");
  console.log("If .base-header has blur(12px) unconditionally, .scrolled rule is redundant.");
  
  await page.close();
  await browser.close();
})();
