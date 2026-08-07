import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const ROUTES = ['/', '/blocks', '/hero-lab', '/contact'];

(async () => {
  const browser = await chromium.launch();
  
  console.log("CH2 — CORRECTED BACKGROUND MEASUREMENT\n");
  console.log("route      scroll  surface  logo      bg-behind-header");
  console.log("───────────────────────────────────────────────────────");
  
  for (const route of ROUTES) {
    for (const scroll of ['0', '50%']) {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1440, height: 900 });
      
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
      
      if (scroll === '50%') {
        const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        const scrollPx = Math.floor(docHeight * 0.5);
        await page.evaluate((px) => window.scrollTo(0, px), scrollPx);
        await page.waitForTimeout(300);
      }
      
      const headerSurface = await page.locator('.header-container').getAttribute('data-surface');
      const logoColor = await page.locator('.brand-logo').evaluate(el => 
        window.getComputedStyle(el).color
      );
      
      // CORRECT: measure what's ACTUALLY behind the header
      const effectiveBg = await page.evaluate(() => {
        const header = document.querySelector('.header-container');
        const headerRect = header.getBoundingClientRect();
        const centerX = headerRect.left + headerRect.width / 2;
        const centerY = headerRect.top + headerRect.height / 2;
        
        // Temporarily hide header to see behind it
        header.style.pointerEvents = 'none';
        header.style.visibility = 'hidden';
        
        const elemBehind = document.elementFromPoint(centerX, centerY);
        
        // Restore header
        header.style.pointerEvents = '';
        header.style.visibility = '';
        
        // Walk up to find first non-transparent background
        let current = elemBehind;
        while (current && current !== document.body) {
          const bg = window.getComputedStyle(current).backgroundColor;
          if (bg && !bg.includes('rgba(0, 0, 0, 0)') && bg !== 'transparent') {
            return bg;
          }
          current = current.parentElement;
        }
        return window.getComputedStyle(document.body).backgroundColor;
      });
      
      const isDarkLogo = logoColor.startsWith('rgb(0') || logoColor.includes('rgb(27') || logoColor.includes('rgb(28');
      const logoDesc = isDarkLogo ? 'dark' : 'cream';
      const isDarkBg = effectiveBg.includes('rgb(28') || effectiveBg.includes('rgb(11') || effectiveBg.startsWith('rgb(0');
      const bgDesc = isDarkBg ? 'dark' : 'light';
      
      // FLAG: logo and background same colour
      let flag = '';
      if ((isDarkLogo && isDarkBg) || (!isDarkLogo && !isDarkBg)) {
        flag = ' ⚠️';
      }
      
      console.log(`${route.padEnd(10)} ${scroll.padEnd(7)} ${headerSurface.padEnd(8)} ${logoDesc.padEnd(9)} ${bgDesc}${flag}`);
      
      await page.close();
    }
  }
  
  await browser.close();
})();
