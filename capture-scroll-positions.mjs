import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  
  const tests = [
    { vp: { width: 1440, height: 900 }, label: '1440x900', pages: ['/', '/pricing', '/resources'] },
    { vp: { width: 390, height: 844 }, label: '390x844', pages: ['/', '/pricing'] }
  ];

  for (const test of tests) {
    console.log(`\n=== ${test.label} ===`);
    
    for (const pageUrl of test.pages) {
      const context = await browser.newContext({ viewport: test.vp });
      const page = await context.newPage();
      await page.goto(`http://localhost:4321${pageUrl}`, { waitUntil: 'networkidle' });
      
      const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const positions = [
        { scroll: 0, label: 'top' },
        { scroll: docHeight / 2, label: 'mid' },
        { scroll: docHeight, label: 'bottom' }
      ];

      for (const pos of positions) {
        await page.evaluate(s => window.scrollTo(0, s), pos.scroll);
        await page.waitForTimeout(200);
        
        const filename = `/tmp/scroll-${test.label}-${pageUrl.replace('/', '')}-${pos.label}.png`;
        await page.screenshot({ path: filename });
        console.log(`  ${pageUrl} ${pos.label}: ${filename}`);
      }
      
      await context.close();
    }
  }

  await browser.close();
  console.log('\nScreenshots captured for verification.');
})();
