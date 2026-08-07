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
        console.log(`\n${route} — ${elements.length} element(s):`);

        for (let i = 0; i < elements.length; i++) {
          const elem = elements[i];
          const surface = await elem.getAttribute('data-surface');
          const tag = await elem.evaluate(el => el.tagName.toLowerCase());
          const id = await elem.getAttribute('id');
          const className = await elem.getAttribute('class');

          // Get EFFECTIVE background: walk up DOM for first non-transparent background
          const effectiveBg = await elem.evaluate(el => {
            let current = el;
            while (current && current !== document.body) {
              const computed = window.getComputedStyle(current);
              const bg = computed.backgroundColor;
              // Stop at first non-transparent background
              if (bg && !bg.includes('rgba(0, 0, 0, 0)') && bg !== 'transparent') {
                return bg;
              }
              current = current.parentElement;
            }
            return window.getComputedStyle(document.body).backgroundColor;
          });

          const selector = id ? `#${id}` : className ? `.${className.split(' ')[0]}` : tag;
          console.log(`  ${selector} data-surface="${surface}"`);
          console.log(`    effective background: ${effectiveBg}`);

          const isDark = effectiveBg.includes('rgb(28, 25, 23)') || effectiveBg.includes('rgb(11, 10, 8)') || effectiveBg.startsWith('rgb(0') || effectiveBg.includes('rgb(27');
          const isLight = effectiveBg.includes('rgb(246') || effectiveBg.includes('rgb(250') || effectiveBg.includes('rgb(255');

          if ((surface === 'ink' && !isDark) || (surface === 'paper' && !isLight)) {
            console.log(`    ⚠️  MISMATCH: surface="${surface}" but background is ${isDark ? 'dark' : 'light'}`);
          }
        }
      } else {
        console.log(`${route} — no data-surface attributes`);
      }
    } catch (err) {
      console.log(`${route} — Error: ${err.message.split('\n')[0]}`);
    }

    await page.close();
  }

  await browser.close();
})();
