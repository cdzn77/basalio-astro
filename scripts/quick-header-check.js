import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  
  console.log("CF1.4 — HOMEPAGE REGRESSION CHECK");
  console.log("═══════════════════════════════════");
  
  // Test 1: Homepage at scroll 0
  console.log("\n/ at scrollY=0 (over video hero):");
  let page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  
  let headerContainer = await page.locator('.header-container').getAttribute('data-surface');
  let logoColor = await page.locator('.brand-logo').evaluate(el => 
    window.getComputedStyle(el).color
  );
  let headerBg = await page.locator('.header-container').evaluate(el => 
    window.getComputedStyle(el).backgroundColor
  );
  
  console.log(`  data-surface: ${headerContainer}`);
  console.log(`  .brand-logo color: ${logoColor}`);
  console.log(`  ✓ Should be: ink + cream wordmark`);
  
  // Scroll past hero
  console.log("\n/ scrolled past hero:");
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(200);
  
  logoColor = await page.locator('.brand-logo').evaluate(el => 
    window.getComputedStyle(el).color
  );
  
  console.log(`  .brand-logo color: ${logoColor}`);
  console.log(`  ✓ Should be: dark wordmark on light background`);
  
  // Test hero-lab
  console.log("\n/hero-lab at scrollY=0:");
  await page.goto(`http://localhost:${PORT}/hero-lab`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  
  headerContainer = await page.locator('.header-container').getAttribute('data-surface');
  logoColor = await page.locator('.brand-logo').evaluate(el => 
    window.getComputedStyle(el).color
  );
  
  console.log(`  data-surface: ${headerContainer}`);
  console.log(`  .brand-logo color: ${logoColor}`);
  console.log(`  ✓ Should be: ink + cream wordmark`);
  
  await page.close();
  await browser.close();
})();
