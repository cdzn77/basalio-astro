import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const ROUTES = ['/', '/blocks', '/contact', '/early-access', '/hacks', '/hero-lab', '/pricing', '/privacy', '/roadmap', '/support', '/terms', '/welcome', '/404'];

(async () => {
  const browser = await chromium.launch();
  
  console.log("CG1.3 CF1.5 — ALL 13 ROUTES × 2 POSITIONS\n");
  console.log("route           scroll  surface  logo      background-behind-header");
  console.log("─────────────────────────────────────────────────────────────────────");
  
  for (const route of ROUTES) {
    for (const scroll of ['0', '50%']) {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1440, height: 900 });
      
      let url = `http://localhost:${PORT}${route}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      
      if (scroll !== '0') {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight / 2));
        await page.waitForTimeout(200);
      }
      
      const headerSurface = await page.locator('.header-container').getAttribute('data-surface');
      const logoColor = await page.locator('.brand-logo').evaluate(el => 
        window.getComputedStyle(el).color
      );
      const bgBehind = await page.locator('.header-container').evaluate(el => {
        let current = el.parentElement;
        while (current) {
          const bg = window.getComputedStyle(current).backgroundColor;
          if (bg && !bg.includes('rgba(0, 0, 0, 0)') && bg !== 'transparent') {
            return bg;
          }
          current = current.parentElement;
        }
        return 'unknown';
      });
      
      const isDarkLogo = logoColor.startsWith('rgb(0') || logoColor.includes('rgb(27') || logoColor.includes('rgb(28');
      const logoDesc = isDarkLogo ? 'dark' : 'cream';
      const isDarkBg = bgBehind.includes('rgb(28') || bgBehind.includes('rgb(0');
      
      console.log(`${route.padEnd(15)} ${scroll.padEnd(7)} ${headerSurface.padEnd(8)} ${logoDesc.padEnd(9)} ${isDarkBg ? 'dark' : 'light'}`);
      
      await page.close();
    }
  }
  
  await browser.close();
})();
