import { chromium } from 'playwright';

async function detailedChecks() {
  const browser = await chromium.launch({ headless: true });
  const routes = ['/', '/blocks', '/contact', '/early-access', '/hacks', '/hero-lab', '/pricing', '/privacy', '/roadmap', '/support', '/terms', '/welcome', '/404'];
  const viewports = [375, 390, 414, 768, 1024, 1440];
  
  let checkNum = 1;

  console.log('PP2: All 78 checks — Route | Viewport | AssertedInnerWidth | MaxScrollWidth | Pass/Fail\n');

  for (const route of routes) {
    for (const vp of viewports) {
      const page = await browser.newPage();
      
      try {
        await page.setViewportSize({ width: vp, height: 900 });
        await page.goto(`http://localhost:4322${route}`, { waitUntil: 'networkidle' });

        const actualViewport = await page.evaluate(() => window.innerWidth);
        
        // Assertion
        if (actualViewport !== vp) {
          throw new Error(`Viewport mismatch: requested ${vp}px, got ${actualViewport}px`);
        }

        const results = await page.evaluate(() => {
          const innerWidth = window.innerWidth;
          const sections = Array.from(document.querySelectorAll('section')).map(s => ({
            scrollWidth: s.scrollWidth
          }));
          const maxScroll = Math.max(...sections.map(s => s.scrollWidth), innerWidth);
          const hasOverflow = sections.some(s => s.scrollWidth > innerWidth);
          
          return { innerWidth, maxScroll, hasOverflow, sectionCount: sections.length };
        });

        const pass = !results.hasOverflow;
        const status = pass ? '✅' : '❌';
        
        console.log(`${checkNum.toString().padStart(2, '0')}. ${status} ${route.padEnd(15)} @ ${vp.toString().padStart(4)}px | innerWidth=${results.innerWidth} | maxScroll=${results.maxScroll} | ${results.sectionCount} sections`);

      } catch (error) {
        console.log(`${checkNum.toString().padStart(2, '0')}. ❌ ${route.padEnd(15)} @ ${vp.toString().padStart(4)}px | ERROR: ${error.message}`);
      }

      await page.close();
      checkNum++;
    }
  }

  console.log(`\nTotal checks: ${checkNum - 1}`);

  await browser.close();
}

detailedChecks().catch(err => console.error(err.message));
