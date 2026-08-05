import { chromium } from 'playwright';

const VIEWPORTS = [375, 768, 1280, 1920];
const ROUTES = ['/', '/hero-lab'];

async function measureFontSize(browser, route, viewport) {
  const page = await browser.newPage();

  try {
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
      const headlines = document.querySelectorAll('.hero-heading');

      if (headlines.length === 0) {
        return { error: 'No .hero-heading found' };
      }
      if (headlines.length > 1) {
        return { error: `Multiple .hero-heading elements found: ${headlines.length}` };
      }

      const headline = headlines[0];
      const fontSize = window.getComputedStyle(headline).fontSize;

      return {
        tagName: headline.tagName,
        className: headline.className,
        fontSize: fontSize,
        innerWidth: window.innerWidth
      };
    });

    if (result.error) {
      return { route, viewport, error: result.error };
    }

    // Verify fontSize is numeric
    if (!result.fontSize || !result.fontSize.match(/^\d+(\.\d+)?px$/)) {
      return { route, viewport, error: `Invalid fontSize format: ${result.fontSize}` };
    }

    return {
      route,
      viewport,
      tagName: result.tagName,
      className: result.className,
      fontSize: result.fontSize,
      innerWidth: result.innerWidth
    };
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
  console.log('HARDENED MEASUREMENT - Element verification + double read');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      // Read 1
      const result1 = await measureFontSize(browser, route, viewport);
      results.push(result1);

      if (result1.error) {
        failed = true;
        console.log(`✗ ERROR ${route} @ ${viewport}px: ${result1.error}`);
      } else {
        console.log(
          `${route.padEnd(11)} ${viewport}px   ` +
          `tag=${result1.tagName} className="${result1.className}" fontSize=${result1.fontSize}`
        );

        // Read 2 - verify consistency
        const result2 = await measureFontSize(browser, route, viewport);
        if (result2.fontSize !== result1.fontSize) {
          failed = true;
          console.log(
            `  ✗ INCONSISTENT: read 2 gave ${result2.fontSize} (was ${result1.fontSize})`
          );
        }
      }
    }
  }

  await browser.close();

  console.log('\n' + '━'.repeat(70));

  if (failed) {
    console.log('FAILED: Measurements could not be verified');
    process.exit(1);
  } else {
    console.log('SUCCESS: All measurements verified (double-read consistency)');
    process.exit(0);
  }
}

main().catch(e => {
  console.error('Script execution error:', e);
  process.exit(1);
});
