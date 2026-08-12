import { chromium } from 'playwright';
import { ALL_ROUTES, NOT_FOUND_PROBE } from './routes.js';

const PORT = process.env.PORT || 4321;
const ROUTES = ALL_ROUTES;
const VIEWPORTS = [320, 375, 414]; // Test across mobile-critical breakpoints
const MIN_TARGET_SIZE = 24; // WCAG 2.5.8 Level AA minimum

async function verifyTouchTargets(browser, route, viewportWidth) {
  const page = await browser.newPage();

  try {
    await page.setViewportSize({ width: viewportWidth, height: 667 });
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

    const results = await page.evaluate((minSize) => {
      const targets = [];
      const elements = document.querySelectorAll('a, button');
      let skipped = 0;

      elements.forEach((el, idx) => {
        // Visibility filter: skip hidden/disabled elements and those with no layout
        if (el.offsetParent === null) {
          skipped++;
          return;
        }

        const computed = window.getComputedStyle(el);
        if (computed.visibility === 'hidden' || computed.display === 'none') {
          skipped++;
          return;
        }

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          skipped++;
          return;
        }

        if (el.disabled) {
          skipped++;
          return;
        }

        const width = rect.width;
        const height = rect.height;
        const pass = width >= minSize && height >= minSize;

        targets.push({
          type: el.tagName.toLowerCase(),
          index: idx,
          text: el.textContent.trim().slice(0, 30) || '(empty)',
          width: width.toFixed(2),
          height: height.toFixed(2),
          pass
        });
      });

      return { targets, skipped };
    }, MIN_TARGET_SIZE);

    return {
      route,
      viewport: viewportWidth,
      targets: results.targets,
      skipped: results.skipped,
      passCount: results.targets.filter(t => t.pass).length,
      failCount: results.targets.filter(t => !t.pass).length
    };
  } catch (error) {
    return {
      route,
      viewport: viewportWidth,
      error: error.message
    };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const allResults = [];
  let totalFailures = 0;
  let totalSkipped = 0;

  // Compute header dynamically from MIN_TARGET_SIZE constant
  const headerText = `WCAG 2.5.8 Target Size (Minimum), Level AA — >= ${MIN_TARGET_SIZE}x${MIN_TARGET_SIZE} CSS px`;

  console.log('\n' + '═'.repeat(72));
  console.log(headerText);
  console.log('═'.repeat(72) + '\n');

  // Note: WCAG 2.5.8 section 4(a) includes Spacing and Equivalent exceptions.
  // Those are not implemented here; all targets either measure >= 24×24 or are failures.

  for (const route of ROUTES) {
    console.log(`Route: ${route}`);

    for (const viewport of VIEWPORTS) {
      const result = await verifyTouchTargets(browser, route, viewport);
      allResults.push(result);

      if (result.error) {
        totalFailures++;
        console.log(`  ${viewport}px: ERROR: ${result.error}`);
      } else {
        const status = result.failCount === 0 ? '✅' : `❌ (${result.failCount} small)`;
        console.log(`  ${viewport}px: ${status} ${result.passCount} pass, ${result.failCount} undersized${result.skipped > 0 ? `, ${result.skipped} skipped (hidden/disabled)` : ''}`);

        if (result.failCount > 0) {
          totalFailures += result.failCount;
          result.targets.filter(t => !t.pass).forEach(t => {
            console.log(`       └─ ${t.type}[${t.index}]: ${t.width}×${t.height}px "${t.text}"`);
          });
        }
      }

      if (result.skipped) {
        totalSkipped += result.skipped;
      }
    }
    console.log();
  }

  await browser.close();

  console.log('═'.repeat(72));
  console.log(`SUMMARY: ${ROUTES.length} routes × ${VIEWPORTS.length} viewports = ${ROUTES.length * VIEWPORTS.length} checks`);
  console.log(`Failures: ${totalFailures}, Skipped: ${totalSkipped}`);
  console.log('═'.repeat(72) + '\n');

  process.exit(totalFailures > 0 ? 1 : 0);
}

main();
