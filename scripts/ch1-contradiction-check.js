import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  
  console.log("CH1.1 — / AT 50% SCROLL\n");
  
  let page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  
  // Get document height
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const scroll50 = Math.floor(docHeight * 0.5);
  
  // Scroll to 50%
  await page.evaluate((px) => window.scrollTo(0, px), scroll50);
  await page.waitForTimeout(300);
  
  // Get actual scroll position
  const actualScrollY = await page.evaluate(() => window.scrollY);
  
  const headerSurface = await page.locator('.header-container').getAttribute('data-surface');
  const logoColor = await page.locator('.brand-logo').evaluate(el => 
    window.getComputedStyle(el).color
  );
  
  console.log(`Document height: ${docHeight}px`);
  console.log(`Target scroll (50%): ${scroll50}px`);
  console.log(`Actual scrollY: ${actualScrollY}px`);
  console.log(`data-surface: "${headerSurface}"`);
  console.log(`.brand-logo colour: ${logoColor}`);
  
  const isDark = logoColor.startsWith('rgb(0') || logoColor.includes('rgb(27') || logoColor.includes('rgb(28');
  console.log(`Logo is ${isDark ? 'DARK' : 'CREAM'}`);
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/ch1_homepage_50percent.png' });
  console.log("Screenshot: /tmp/ch1_homepage_50percent.png");
  
  await page.close();
  
  console.log("\n═══════════════════════════════════════════════════");
  console.log("CH1.2 — HERO BOUNDARY\n");
  
  page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  
  const heroEnd = await page.evaluate(() => {
    const hero = document.querySelector('[data-surface="ink"]');
    if (!hero) return 'hero not found';
    const rect = hero.getBoundingClientRect();
    return hero.offsetTop + hero.offsetHeight;
  });
  
  console.log(`Hero section ends at: ~${heroEnd}px`);
  console.log(`50% scroll is at: ${scroll50}px`);
  console.log(`Is 50% scroll past hero? ${scroll50 > heroEnd ? 'YES' : 'NO'}`);
  
  await page.close();
  
  console.log("\n═══════════════════════════════════════════════════");
  console.log("CH1.4 — /HERO-LAB AT 50%\n");
  
  page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}/hero-lab`, { waitUntil: 'networkidle' });
  
  const hlDocHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const hlScroll50 = Math.floor(hlDocHeight * 0.5);
  
  await page.evaluate((px) => window.scrollTo(0, px), hlScroll50);
  await page.waitForTimeout(300);
  
  const hlActualScrollY = await page.evaluate(() => window.scrollY);
  const hlHeaderSurface = await page.locator('.header-container').getAttribute('data-surface');
  const hlLogoColor = await page.locator('.brand-logo').evaluate(el => 
    window.getComputedStyle(el).color
  );
  
  console.log(`Document height: ${hlDocHeight}px`);
  console.log(`Actual scrollY: ${hlActualScrollY}px`);
  console.log(`data-surface: "${hlHeaderSurface}"`);
  console.log(`.brand-logo colour: ${hlLogoColor}`);
  
  const hlIsDark = hlLogoColor.startsWith('rgb(0') || hlLogoColor.includes('rgb(27') || hlLogoColor.includes('rgb(28');
  console.log(`Logo is ${hlIsDark ? 'DARK' : 'CREAM'}`);
  
  await page.close();
  await browser.close();
})();
