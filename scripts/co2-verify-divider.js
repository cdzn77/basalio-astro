import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const SCREENSHOT_DIR = '/Users/angelomanzanojr/Desktop/basalio-screenshots';

(async () => {
  const browser = await chromium.launch();

  console.log('═══════════════════════════════════════════════════');
  console.log('CO2 — Divider list mobile stacking verification');
  console.log('═══════════════════════════════════════════════════\n');

  const viewports = [375, 390, 414];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp, height: 844 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

    // Scroll to divider list
    await page.evaluate(() => {
      const divider = document.querySelector('.pricing-divider-list');
      if (divider) divider.scrollIntoView({ behavior: 'auto', block: 'center' });
    });
    await page.waitForTimeout(300);

    // Get computed styles and dimensions
    const data = await page.evaluate(() => {
      const list = document.querySelector('.pricing-divider-list');
      const item = document.querySelector('.divider-item');
      
      if (!list || !item) {
        return { error: 'Elements not found' };
      }

      const listStyle = window.getComputedStyle(list);
      const itemStyle = window.getComputedStyle(item);

      return {
        listFlexDirection: listStyle.flexDirection,
        listGap: listStyle.gap,
        listWidth: list.offsetWidth,
        itemWidth: item.offsetWidth,
        listInViewport: Math.abs(list.getBoundingClientRect().top) < 844
      };
    });

    console.log(`${vp}px viewport:`);
    if (data.error) {
      console.log(`  ✗ ${data.error}`);
    } else {
      console.log(`  .pricing-divider-list flex-direction: ${data.listFlexDirection}`);
      console.log(`  .pricing-divider-list gap: ${data.listGap}`);
      console.log(`  .pricing-divider-list width: ${data.listWidth}px`);
      console.log(`  .divider-item width: ${data.itemWidth}px`);
      console.log(`  In viewport: ${data.listInViewport}`);
      
      // Verify
      const passFlexDir = data.listFlexDirection === 'column';
      const passGap = data.listGap === '24px';
      const passInViewport = data.listInViewport;
      
      if (passFlexDir && passGap && passInViewport) {
        console.log(`  ✓ PASS`);
      } else {
        console.log(`  ✗ FAIL: flex-dir=${passFlexDir}, gap=${passGap}, inViewport=${passInViewport}`);
      }
    }

    // Screenshot
    const screenshotPath = `${SCREENSHOT_DIR}/co2_divider_${vp}px.png`;
    await page.screenshot({ path: screenshotPath });
    console.log(`  Screenshot: co2_divider_${vp}px.png`);
    console.log();

    await page.close();
  }

  await browser.close();
  console.log('✅ CO2 verification complete.');
})();
