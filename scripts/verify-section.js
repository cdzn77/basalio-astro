import { chromium } from 'playwright';
import { ALL_ROUTES, NOT_FOUND_PROBE } from './routes.js';

const PORT = process.env.PORT || 4321;
const VIEWPORTS = [320, 360, 375, 390, 414, 768, 1024, 1440];
const ROUTES = ALL_ROUTES;

async function assertNotDevServer(page) {
  // Detect dev server by inspecting document for dev-only markers
  const isDev = await page.evaluate(() => {
    const hasDevToolbar = !!document.querySelector('astro-dev-toolbar');
    const hasViteClient = !!document.querySelector('script[src*="/@vite/client"]');
    const hasViteRSC = !!window.__vite_plugin_react_preamble_installed__;
    return hasDevToolbar || hasViteClient || hasViteRSC;
  });

  if (isDev) {
    console.error('\n❌ ERROR: Detected dev server (astro dev)');
    console.error('   Dev servers have different caching and timing behavior than production builds.\n');
    console.error('   REQUIRED: Run `npm run build && npm run preview` in another terminal, then:');
    console.error('   $ npm run verify:overflow\n');
    process.exit(1);
  }
}

async function verifySectionOverflow(browser, route, viewport) {
  const page = await browser.newPage();

  try {
    // Set viewport BEFORE navigation
    await page.setViewportSize({ width: viewport, height: 900 });

    // Navigate to route
    const response = await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle'
    });

    // For 404 probe, verify HTTP 404 status
    if (route === NOT_FOUND_PROBE) {
      const status = response.status();
      if (status !== 404) {
        throw new Error(
          `404 handler probe returned HTTP ${status}, expected 404. Probe path may be wrong.`
        );
      }
    }

    // BB1.2 ASSERT: window.innerWidth matches requested viewport
    const actualViewport = await page.evaluate(() => window.innerWidth);
    if (actualViewport !== viewport) {
      throw new Error(
        `Viewport assertion failed: requested ${viewport}px, got ${actualViewport}px`
      );
    }

    // Measure all sections
    const results = await page.evaluate(() => {
      const innerWidth = window.innerWidth;
      const sections = Array.from(document.querySelectorAll('section')).map(
        (section, idx) => ({
          index: idx,
          scrollWidth: section.scrollWidth,
          innerWidth: innerWidth,
          pass: section.scrollWidth <= innerWidth
        })
      );
      return { innerWidth, sections };
    });

    return {
      route,
      viewport,
      actualViewport,
      innerWidth: results.innerWidth,
      sections: results.sections,
      totalSections: results.sections.length,
      passCount: results.sections.filter(s => s.pass).length,
      failCount: results.sections.filter(s => !s.pass).length
    };
  } catch (error) {
    return {
      route,
      viewport,
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

  // GATE: Assert not dev server (only check once at startup)
  const probePage = await browser.newPage();
  try {
    await probePage.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
    await assertNotDevServer(probePage);
  } finally {
    await probePage.close();
  }

  console.log(
    '\n' + '═'.repeat(70)
  );
  console.log(
    `RM4: SECTION OVERFLOW VERIFICATION (ALL ${ROUTES.length} ROUTES × ${VIEWPORTS.length} VIEWPORTS = ${ROUTES.length * VIEWPORTS.length} CHECKS)`
  );
  console.log(
    '═'.repeat(70) + '\n'
  );

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      const result = await verifySectionOverflow(browser, route, viewport);
      results.push(result);

      if (result.error) {
        totalFailures++;
        const label = route === NOT_FOUND_PROBE ? '404 handler' : route;
        console.log(
          `❌ ${label.padEnd(15)} @ ${viewport.toString().padStart(4)}px: ERROR: ${result.error}`
        );
      } else {
        const label = route === NOT_FOUND_PROBE ? '404 handler' : route;
        const status =
          result.failCount === 0 ? '✅' : `❌ (${result.failCount} overflow)`;
        console.log(
          `${status} ${label.padEnd(15)} @ ${result.actualViewport.toString().padStart(4)}px: ${result.passCount}/${result.totalSections} sections pass`
        );

        if (result.failCount > 0) {
          totalFailures += result.failCount;
          result.sections
            .filter(s => !s.pass)
            .forEach(s => {
              console.log(
                `     └─ section[${s.index}]: scrollWidth=${s.scrollWidth}px > innerWidth=${s.innerWidth}px (overflow: ${s.scrollWidth - s.innerWidth}px)`
              );
            });
        }
      }
    }
  }

  await browser.close();

  // Summary
  console.log('\n' + '═'.repeat(70));
  console.log('SUMMARY');
  console.log('═'.repeat(70));
  const totalChecks = ROUTES.length * VIEWPORTS.length;
  const passedChecks = results.filter(
    r => !r.error && r.failCount === 0
  ).length;
  console.log(`Total route×viewport checks: ${totalChecks}`);
  console.log(`Passed (0 overflows): ${passedChecks}`);
  console.log(`Failed (1+ overflow): ${results.filter(r => !r.error && r.failCount > 0).length}`);
  console.log(`Errors (navigation/assertion): ${results.filter(r => r.error).length}`);
  console.log(`Total overflow instances: ${totalFailures}`);

  if (totalFailures > 0) {
    console.log(
      `\n⚠️  ${totalFailures} overflow(s) detected across ${results.filter(r => !r.error && r.failCount > 0).length} routes.`
    );
    console.log('Fix before proceeding.\n');
    process.exit(1);
  } else {
    console.log('\n✅ All sections pass: scrollWidth <= innerWidth at all viewports.\n');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Script execution error:', err);
  process.exit(1);
});
