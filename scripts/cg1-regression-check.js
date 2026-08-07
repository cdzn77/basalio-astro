import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  
  console.log("CG1.1 CF1.4 — HOMEPAGE REGRESSION CHECK\n");
  
  // Reading 1: / at scrollY=0
  let page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  
  let headerSurface = await page.locator('.header-container').getAttribute('data-surface');
  let logoColor = await page.locator('.brand-logo').evaluate(el => 
    window.getComputedStyle(el).color
  );
  
  console.log(`/ at scrollY 0        → data-surface="${headerSurface}" | .brand-logo colour=${logoColor}`);
  
  // Reading 2: / scrolled past hero
  await page.evaluate(() => window.scrollBy(0, 1200));
  await page.waitForTimeout(200);
  
  headerSurface = await page.locator('.header-container').getAttribute('data-surface');
  logoColor = await page.locator('.brand-logo').evaluate(el => 
    window.getComputedStyle(el).color
  );
  
  console.log(`/ scrolled past hero  → data-surface="${headerSurface}" | .brand-logo colour=${logoColor}`);
  
  await page.close();
  
  // Reading 3: /hero-lab at scrollY=0
  page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}/hero-lab`, { waitUntil: 'networkidle' });
  
  headerSurface = await page.locator('.header-container').getAttribute('data-surface');
  logoColor = await page.locator('.brand-logo').evaluate(el => 
    window.getComputedStyle(el).color
  );
  
  console.log(`/hero-lab at scrollY 0 → data-surface="${headerSurface}" | .brand-logo colour=${logoColor}`);
  
  console.log("\nExpected: ink+cream, paper+dark, ink+cream");
  
  await page.close();
  await browser.close();
})();
