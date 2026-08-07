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

      // Find all elements with data-surface
      const elements = await page.locator('[data-surface]').all();

      if (elements.length > 0) {
        console.log(`\n${route}:`);

        for (let i = 0; i < elements.length; i++) {
          const elem = elements[i];
          const surface = await elem.getAttribute('data-surface');
          const id = await elem.getAttribute('id');
          const className = await elem.getAttribute('class');

          // Get computed color of content inside this surface
          const logoOrContentColor = await elem.evaluate(el => {
            const logo = el.querySelector('.brand-logo');
            if (logo) {
              return window.getComputedStyle(logo).color;
            }
            // Fallback to element's computed text color
            return window.getComputedStyle(el).color;
          });

          const selector = id ? `#${id}` : className ? `.${className.split(' ')[0]}` : 'element';
          const isDark = logoOrContentColor.startsWith('rgb(0') || logoOrContentColor.includes('rgb(27') || logoOrContentColor.includes('rgb(28');
          const colorDesc = isDark ? 'dark' : 'cream';

          console.log(`  ${selector.padEnd(25)} surface="${surface.padEnd(6)}" content=${colorDesc}`);

          if ((surface === 'ink' && !isDark) || (surface === 'paper' && isDark)) {
            console.log(`    ⚠️  MISMATCH: surface="${surface}" but content is ${isDark ? 'dark' : 'cream'}`);
          }
        }
      } else {
        console.log(`${route}: no data-surface attributes`);
      }
    } catch (err) {
      console.log(`${route}: Error — ${err.message.split('\n')[0]}`);
    }

    await page.close();
  }

  console.log(`\nNote: Background detection via CSS background-color cannot resolve video or image backgrounds. data-surface is the source of truth; visual confirmation via screenshot.`);

  await browser.close();
})();
