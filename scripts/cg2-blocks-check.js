import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  
  console.log("CG1.2 CF1.3 — /BLOCKS AT THREE SCROLL POSITIONS\n");
  
  for (const viewport of [390, 1440]) {
    console.log(`\n${viewport}px viewport:`);
    
    const positions = [
      { name: 'Hero', url: `http://localhost:${PORT}/blocks` },
      { name: 'Grid Reveal', url: `http://localhost:${PORT}/blocks#grid-reveal` },
      { name: 'Scroll Seq', url: `http://localhost:${PORT}/blocks#scroll-sequence` }
    ];
    
    for (const pos of positions) {
      const page = await browser.newPage();
      await page.setViewportSize({ width: viewport, height: 900 });
      await page.goto(pos.url, { waitUntil: 'networkidle' });
      
      const headerSurface = await page.locator('.header-container').getAttribute('data-surface');
      const logoColor = await page.locator('.brand-logo').evaluate(el => 
        window.getComputedStyle(el).color
      );
      const menuBgColor = await page.locator('.menu-btn').evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      const isDarkLogo = logoColor.startsWith('rgb(0') || logoColor.includes('rgb(27') || logoColor.includes('rgb(28');
      const logoDesc = isDarkLogo ? 'dark' : 'cream';
      
      console.log(`  ${pos.name.padEnd(12)} → surface="${headerSurface}" | logo=${logoDesc} | menu-btn=${menuBgColor}`);
      
      await page.close();
    }
  }
  
  console.log("\nExpected: wordmark DARK throughout");
  await browser.close();
})();
