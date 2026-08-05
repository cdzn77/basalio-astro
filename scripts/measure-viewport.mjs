import { chromium } from 'playwright';

const VIEWPORTS = [375, 768, 1280, 1920];
const ROUTES = ['/', '/hero-lab'];

async function measureFontSize(browser, route, viewport) {
  const page = await browser.newPage();

  try {
    // Set viewport before navigation
    await page.setViewportSize({ width: viewport, height: 900 });

    await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

    // ASSERT viewport before measuring
    const actual = await page.evaluate(() => window.innerWidth);
    if (actual !== viewport) {
      throw new Error(
        `Viewport assertion failed: requested ${viewport}, got ${actual}`
      );
    }

    // I1b ASSERTION: Read font-size twice to verify CSS has settled
    const read1 = await page.evaluate(() => {
      const headline = document.querySelector('.hero-heading');
      if (!headline) {
        return { error: 'No .hero-heading found' };
      }

      const fontSize = window.getComputedStyle(headline).fontSize;
      if (!fontSize || fontSize === '') {
        return { error: 'fontSize is empty' };
      }

      return { fontSize };
    });

    if (read1.error) {
      return { route, viewport, error: read1.error };
    }

    // Wait 50ms for any async style resolution
    await page.waitForTimeout(50);

    // Second read: verify consistency
    const read2 = await page.evaluate(() => {
      const headline = document.querySelector('.hero-heading');
      if (!headline) {
        return { error: 'Element disappeared' };
      }

      const fontSize = window.getComputedStyle(headline).fontSize;
      return { fontSize };
    });

    if (read2.error) {
      return { route, viewport, error: read2.error };
    }

    // Assert both reads agree
    if (read1.fontSize !== read2.fontSize) {
      return {
        route,
        viewport,
        error: `CSS not settled: read1=${read1.fontSize}, read2=${read2.fontSize}`
      };
    }

    // Assert not the global fallback (40px) — signature of unapplied CSS
    const fontSize = read1.fontSize;
    if (fontSize === '40px' && route === '/') {
      return {
        route,
        viewport,
        error: `Value is global h1 fallback (40px), .hero-heading class may not have applied to ${route}`
      };
    }

    return { route, viewport, fontSize };
  } catch (e) {
    return { route, viewport, error: e.message };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch();
  const results = [];
  let failed = false;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('HERO HEADLINE FONT-SIZE MEASUREMENT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      try {
        const result = await measureFontSize(browser, route, viewport);
        results.push(result);

        if (result.error) {
          failed = true;
          console.log(`✗ ERROR ${route} @ ${viewport}px: ${result.error}`);
        } else {
          console.log(`${route.padEnd(11)} ${viewport}px   →  ${result.fontSize}`);
        }
      } catch (e) {
        failed = true;
        console.log(`✗ CRITICAL ${route} @ ${viewport}px: ${e.message}`);
      }
    }
  }

  await browser.close();

  console.log('\n' + '━'.repeat(60));

  if (failed) {
    console.log('FAILED: Some measurements could not be completed');
    process.exit(1);
  } else {
    console.log('SUCCESS: All measurements completed');
    console.log('\nRaw output for reporting:');
    console.log('');
    for (const result of results) {
      if (!result.error) {
        console.log(`${result.route.padEnd(11)} ${result.viewport}px   →  ${result.fontSize}`);
      }
    }
    process.exit(0);
  }
}

main().catch(e => {
  console.error('Script execution error:', e);
  process.exit(1);
});
