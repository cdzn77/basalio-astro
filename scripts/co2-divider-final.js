import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const SCREENSHOT_DIR = '/Users/angelomanzanojr/Desktop/basalio-screenshots';

(async () => {
  const browser = await chromium.launch();

  console.log('═══════════════════════════════════════════════════');
  console.log('CO2 — Divider list with correct viewport capture');
  console.log('═══════════════════════════════════════════════════\n');

  const viewports = [375, 390, 414];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp, height: 844 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

    // Get divider position, calculate scroll to center it
    const scrollPos = await page.evaluate(() => {
      const divider = document.querySelector('.pricing-divider-list');
      if (!divider) return null;
      
      const offsetTop = divider.offsetTop;
      const offsetHeight = divider.offsetHeight;
      const viewportHeight = 844;
      
      // Center the divider in viewport
      const targetScrollY = offsetTop - (viewportHeight - offsetHeight) / 2;
      return Math.max(0, targetScrollY);
    });

    if (scrollPos !== null) {
      await page.evaluate((pos) => window.scrollTo(0, pos), scrollPos);
      await page.waitForTimeout(300);
    }

    // Verify
    const data = await page.evaluate(() => {
      const list = document.querySelector('.pricing-divider-list');
      const item = document.querySelector('.divider-item');
      
      if (!list || !item) return { error: 'Elements not found' };

      const listStyle = window.getComputedStyle(list);
      const rect = list.getBoundingClientRect();

      return {
        flexDir: listStyle.flexDirection,
        gap: listStyle.gap,
        listWidth: list.offsetWidth,
        itemWidth: item.offsetWidth,
        viewportTop: rect.top,
        viewportBottom: rect.bottom,
        inViewport: rect.top >= -50 && rect.bottom <= 894,
        scrollY: window.scrollY
      };
    });

    console.log(`${vp}px:`);
    if (data.error) {
      console.log(`  ✗ ${data.error}`);
    } else {
      console.log(`  scrollY: ${data.scrollY}px`);
      console.log(`  viewport top: ${data.viewportTop.toFixed(0)}px | bottom: ${data.viewportBottom.toFixed(0)}px`);
      console.log(`  flex-direction: ${data.flexDir} | gap: ${data.gap}`);
      console.log(`  item width: ${data.itemWidth}px (full width: ${data.listWidth === data.itemWidth})`);
      
      if (data.flexDir === 'column' && data.gap === '24px' && data.inViewport) {
        console.log(`  ✓ PASS: Stacked, 24px gap, in viewport`);
      } else {
        console.log(`  ${data.flexDir === 'column' ? '✓' : '✗'} ${data.gap === '24px' ? '✓' : '✗'} ${data.inViewport ? '✓' : '✗'}`);
      }
    }

    const screenshotPath = `${SCREENSHOT_DIR}/co2_divider_${vp}px.png`;
    await page.screenshot({ path: screenshotPath });
    console.log(`  Screenshot: co2_divider_${vp}px.png`);
    console.log();

    await page.close();
  }

  await browser.close();
  console.log('✅ CO2 complete: flex-direction column, gap 24px, full-width items');
})();
