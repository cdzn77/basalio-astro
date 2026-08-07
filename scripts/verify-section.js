import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const VIEWPORTS = [320, 360, 375, 390, 414, 768, 1024, 1440];
const ROUTES = [
  '/',
  '/blocks',
  '/contact',
  '/early-access',
  '/hacks',
  '/hero-lab',
  '/pricing',
  '/privacy',
  '/roadmap',
  '/support',
  '/terms',
  '/welcome',
  '/404'
];

async function verifySectionOverflow(browser, route, viewport) {
  const page = await browser.newPage();

  try {
    // Set viewport BEFORE navigation
    await page.setViewportSize({ width: viewport, height: 900 });

    // Navigate to route
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle'
    });

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

  console.log(
    '\n' + '═'.repeat(70)
  );
  console.log(
    'RM4: SECTION OVERFLOW VERIFICATION (ALL 13 ROUTES × 8 VIEWPORTS = 104 CHECKS)'
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
        console.log(
          `❌ ${route.padEnd(15)} @ ${viewport.toString().padStart(4)}px: ERROR: ${result.error}`
        );
      } else {
        const status =
          result.failCount === 0 ? '✅' : `❌ (${result.failCount} overflow)`;
        console.log(
          `${status} ${route.padEnd(15)} @ ${result.actualViewport.toString().padStart(4)}px: ${result.passCount}/${result.totalSections} sections pass`
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
