import { chromium } from 'playwright';
import { ALL_ROUTES } from './scripts/routes.js';

const PORT = 4321;
const VIEWPORTS = [1440];  // Test one viewport to show failure clearly

async function verifySectionOverflow(browser, route, viewport) {
  const page = await browser.newPage();
  try {
    await page.setViewportSize({ width: viewport, height: 900 });
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });

    // FORCE OVERFLOW on first section only
    if (route === '/') {
      await page.addStyleTag({ content: 'section:first-of-type { width: 200vw !important; }' });
    }

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
      route, viewport,
      sections: results.sections,
      totalSections: results.sections.length,
      passCount: results.sections.filter(s => s.pass).length,
      failCount: results.sections.filter(s => !s.pass).length
    };
  } catch (error) {
    return { route, viewport, error: error.message };
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch({ headless: true });
const results = [];
let totalFailures = 0;

console.log('FORCED OVERFLOW TEST (/ route only, width: 200vw on first section)\n');

for (const route of ALL_ROUTES) {
  for (const viewport of VIEWPORTS) {
    const result = await verifySectionOverflow(browser, route, viewport);
    results.push(result);

    if (result.error) {
      console.log(`❌ ${route.padEnd(15)} @ ${viewport}px: ERROR: ${result.error}`);
    } else {
      const status = result.failCount === 0 ? '✅' : `❌ (${result.failCount} overflow)`;
      console.log(`${status} ${route.padEnd(15)} @ ${viewport}px: ${result.passCount}/${result.totalSections} sections pass`);
      if (result.failCount > 0) {
        totalFailures += result.failCount;
      }
    }
  }
}

await browser.close();

console.log('\n' + '═'.repeat(70));
console.log('SUMMARY');
console.log('═'.repeat(70));
const totalChecks = ALL_ROUTES.length * VIEWPORTS.length;
const passedChecks = results.filter(r => !r.error && r.failCount === 0).length;
console.log(`Total route×viewport checks: ${totalChecks}`);
console.log(`Passed (0 overflows): ${passedChecks}`);
console.log(`Failed (1+ overflow): ${results.filter(r => !r.error && r.failCount > 0).length}`);
console.log(`Total overflow instances: ${totalFailures}`);
