const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const viewports = [
    { width: 1440, height: 900, label: '1440×900' },
    { width: 390, height: 844, label: '390×844' }
  ];
  const urls = [
    { url: 'http://localhost:4321', label: 'index' },
    { url: 'http://localhost:4321/pricing', label: 'pricing' }
  ];

  for (const v of viewports) {
    console.log(`\n=== VIEWPORT: ${v.label} ===`);
    
    for (const u of urls) {
      const context = await browser.newContext({ viewport: { width: v.width, height: v.height } });
      const page = await context.newPage();
      await page.goto(u.url, { waitUntil: 'networkidle' });
      
      const result = await page.evaluate(() => {
        const footer = document.querySelector('footer');
        if (!footer) return { error: 'no footer' };
        const rect = footer.getBoundingClientRect();
        return {
          footerHeight: Math.round(rect.height),
          viewportHeight: window.innerHeight,
          exceeds: rect.height > window.innerHeight,
          headroom: Math.round(window.innerHeight - rect.height)
        };
      });
      
      console.log(`${u.label}:`);
      if (result.error) {
        console.log(`  ERROR: ${result.error}`);
      } else {
        console.log(`  Footer: ${result.footerHeight}px`);
        console.log(`  Viewport: ${result.viewportHeight}px`);
        console.log(`  Headroom: ${result.headroom}px ${result.exceeds ? '⚠️ EXCEEDS!' : '✓'}`);
      }
      
      await context.close();
    }
  }

  await browser.close();
})();
