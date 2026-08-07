import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const SCREENSHOT_DIR = '/Users/angelomanzanojr/Desktop/basalio-screenshots';

(async () => {
  const browser = await chromium.launch();

  console.log('═══════════════════════════════════════════════════');
  console.log('CO2 — Divider list verification (scroll fix)');
  console.log('═══════════════════════════════════════════════════\n');

  const viewports = [375, 390, 414];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp, height: 844 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

    // Scroll to divider list by finding its offsetTop
    await page.evaluate(() => {
      const divider = document.querySelector('.pricing-divider-list');
      if (divider) {
        const offsetTop = divider.offsetTop;
        window.scrollTo(0, offsetTop - 200); // Scroll so divider is visible in center
      }
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
      const rect = list.getBoundingClientRect();

      return {
        listFlexDirection: listStyle.flexDirection,
        listGap: listStyle.gap,
        listWidth: list.offsetWidth,
        itemWidth: item.offsetWidth,
        listTop: rect.top,
        listBottom: rect.bottom,
        inViewport: rect.top >= 0 && rect.top <= 844,
        scrollY: window.scrollY
      };
    });

    console.log(`${vp}px viewport:`);
    if (data.error) {
      console.log(`  ✗ ${data.error}`);
    } else {
      console.log(`  scrollY: ${data.scrollY}px`);
      console.log(`  .pricing-divider-list top: ${data.listTop.toFixed(0)}px (in viewport: ${data.inViewport})`);
      console.log(`  flex-direction: ${data.listFlexDirection} | gap: ${data.listGap}`);
      console.log(`  list width: ${data.listWidth}px | item width: ${data.itemWidth}px`);
      
      const passFlexDir = data.listFlexDirection === 'column';
      const passGap = data.listGap === '24px';
      const passInViewport = data.inViewport;
      
      if (passFlexDir && passGap && passInViewport) {
        console.log(`  ✓ PASS`);
      } else {
        console.log(`  ${!passFlexDir ? '✗ flex-direction' : '✓'} ${!passGap ? '✗ gap' : '✓'} ${!passInViewport ? '✗ not in viewport' : '✓'}`);
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
