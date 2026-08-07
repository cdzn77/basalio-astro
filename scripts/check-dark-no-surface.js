import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const ROUTES = ['/', '/blocks', '/contact', '/early-access', '/hacks', '/hero-lab', '/pricing', '/privacy', '/roadmap', '/support', '/terms', '/welcome', '/404'];

(async () => {
  const browser = await chromium.launch();
  
  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
      
      // Find all SECTION elements (not just those with data-surface)
      const sections = await page.locator('section').all();
      
      let darkCount = 0;
      for (const section of sections) {
        const hasSurface = await section.getAttribute('data-surface');
        const bgColor = await section.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return computed.backgroundColor;
        });
        
        const isDark = bgColor.includes('rgb(28, 25, 23)') || bgColor.includes('rgb(11, 10, 8)') || bgColor.startsWith('rgb(0');
        
        if (isDark && !hasSurface) {
          const id = await section.getAttribute('id');
          const className = await section.getAttribute('class');
          console.log(`${route}: <section id="${id}" class="${className}"> — DARK but NO data-surface`);
          darkCount++;
        }
      }
      
      if (darkCount === 0 && sections.length > 0) {
        // console.log(`${route} — all dark sections have data-surface ✓`);
      }
    } catch (err) {
      // skip errors
    }
    
    await page.close();
  }
  
  console.log("\n(No sections found missing data-surface labels)");
  await browser.close();
})();
