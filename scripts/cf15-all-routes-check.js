import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const ROUTES = ['/', '/blocks', '/contact', '/early-access', '/hacks', '/hero-lab', '/pricing', '/privacy', '/roadmap', '/support', '/terms', '/welcome', '/404'];

(async () => {
  const browser = await chromium.launch();
  console.log("CF1.5 — ALL ROUTES SPOT CHECK");
  console.log("═══════════════════════════════════\n");
  
  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
      
      // Get header info at scroll 0
      let headerSurface = await page.locator('.header-container').getAttribute('data-surface');
      let logoColor = await page.locator('.brand-logo').evaluate(el => 
        window.getComputedStyle(el).color
      );
      let sectionBehind = await page.evaluate(() => {
        const header = document.querySelector('.header-container');
        if (!header) return 'no-header';
        const rect = header.getBoundingClientRect();
        const elem = document.elementFromPoint(rect.left + 50, rect.top + 50);
        if (elem && elem.getAttribute('data-surface')) {
          return elem.getAttribute('data-surface');
        }
        return 'unknown';
      });
      
      const isDark = logoColor.includes('246, 244') || logoColor.includes('245, 243');
      const isLight = logoColor.startsWith('rgb(0') || logoColor.startsWith('rgb(27') || logoColor.startsWith('rgb(28');
      
      let issue = '';
      if ((headerSurface === 'ink' && !isDark) || (headerSurface === 'paper' && !isLight)) {
        issue = ' ⚠️  COLOR MISMATCH';
      }
      
      console.log(`${route.padEnd(15)} surface=${headerSurface.padEnd(6)} logo=${isDark ? 'cream' : 'dark'}${issue}`);
    } catch (err) {
      console.log(`${route.padEnd(15)} ERROR: ${err.message.split('\n')[0]}`);
    }
    
    await page.close();
  }
  
  await browser.close();
})();
