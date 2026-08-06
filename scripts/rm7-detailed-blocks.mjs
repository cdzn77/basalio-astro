import { chromium } from 'playwright';

async function diagnoseBlocksDetailed() {
  const browser = await chromium.launch({ headless: true });

  const viewports = [375, 390, 414];
  
  for (const vp of viewports) {
    console.log(`\n📍 Viewport: ${vp}px\n`);
    
    const page = await browser.newPage({
      viewport: { width: vp, height: 812 },
      isMobile: true
    });

    try {
      await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);

      const results = await page.evaluate(() => {
        const innerWidth = window.innerWidth;
        const sections = Array.from(document.querySelectorAll('section')).map((section, idx) => {
          const pass = section.scrollWidth <= innerWidth;
          return {
            index: idx,
            scrollWidth: section.scrollWidth,
            innerWidth: innerWidth,
            pass: pass,
            overflow: section.scrollWidth - innerWidth,
            rect: section.getBoundingClientRect()
          };
        });

        return { innerWidth, sections, documentWidth: document.documentElement.scrollWidth };
      });

      console.log(`Actual innerWidth: ${results.innerWidth}px, Document width: ${results.documentWidth}px\n`);
      
      const failures = results.sections.filter(s => !s.pass);
      if (failures.length === 0) {
        console.log('✅ All sections pass');
      } else {
        console.log(`❌ ${failures.length} section(s) fail:\n`);
        failures.forEach(s => {
          console.log(`   section[${s.index}]: ${s.scrollWidth}px (overflow: +${s.overflow}px)`);
        });
      }
    } catch (err) {
      console.error(`Error at ${vp}px:`, err.message);
    }
    
    await page.close();
  }

  await browser.close();
}

diagnoseBlocksDetailed().catch(err => console.error(err.message));
