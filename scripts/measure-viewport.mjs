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

    // Measure font-size on hero headline
    const result = await page.evaluate(() => {
      const headline = document.querySelector('.hero-heading');
      if (!headline) {
        return { error: 'No .hero-heading found' };
      }

      const fontSize = window.getComputedStyle(headline).fontSize;
      return { fontSize };
    });

    if (result.error) {
      return { route, viewport, error: result.error };
    }

    return { route, viewport, fontSize: result.fontSize };
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
