import { chromium } from 'playwright';
import { ALL_ROUTES, NOT_FOUND_PROBE } from './routes.js';

const PORT = process.env.PORT || 4321;
const ROUTES = ALL_ROUTES;
const TOUCH_VIEWPORT = 375; // WCAG 2.5.8 guideline testing viewport

async function verifyTouchTargets(browser, route) {
  const page = await browser.newPage();

  try {
    await page.setViewportSize({ width: TOUCH_VIEWPORT, height: 667 });
    const response = await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle'
    });

    if (route === NOT_FOUND_PROBE) {
      const status = response.status();
      if (status !== 404) {
        throw new Error(
          `404 handler probe returned HTTP ${status}, expected 404.`
        );
      }
    }

    const results = await page.evaluate(() => {
      const targets = [];
      const elements = document.querySelectorAll('a, button');

      elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);
        const pass = width >= 44 && height >= 44;

        targets.push({
          type: el.tagName.toLowerCase(),
          index: idx,
          text: el.textContent.trim().slice(0, 30) || '(empty)',
          width,
          height,
          pass
        });
      });

      return targets;
    });

    return {
      route,
      targets: results,
      passCount: results.filter(t => t.pass).length,
      failCount: results.filter(t => !t.pass).length
    };
  } catch (error) {
    return {
      route,
      error: error.message
    };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  let totalFailures = 0;

  console.log('\n' + '═'.repeat(70));
  console.log(`WCAG 2.5.8: TOUCH TARGET VERIFICATION (>= 44x44px at ${TOUCH_VIEWPORT}px)`);
  console.log('═'.repeat(70) + '\n');

  for (const route of ROUTES) {
    const result = await verifyTouchTargets(browser, route);
    results.push(result);

    if (result.error) {
      totalFailures++;
      const label = route === NOT_FOUND_PROBE ? '404 handler' : route;
      console.log(`❌ ${label.padEnd(15)}: ERROR: ${result.error}`);
    } else {
      const label = route === NOT_FOUND_PROBE ? '404 handler' : route;
      const status = result.failCount === 0 ? '✅' : `❌ (${result.failCount} small)`;
      console.log(`${status} ${label.padEnd(15)}: ${result.passCount} OK, ${result.failCount} undersized`);

      if (result.failCount > 0) {
        totalFailures += result.failCount;
        result.targets.filter(t => !t.pass).forEach(t => {
          console.log(`     └─ ${t.type}[${t.index}]: ${t.width}×${t.height}px (text: "${t.text}")`);
        });
      }
    }
  }

  await browser.close();

  console.log('\n' + '═'.repeat(70));
  console.log(`Total: ${ROUTES.length} routes, ${totalFailures} undersized targets`);
  console.log('═'.repeat(70) + '\n');

  process.exit(totalFailures > 0 ? 1 : 0);
}

main();
