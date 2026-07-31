import { chromium } from 'playwright';

const routes = ['/', '/blocks', '/pricing', '/contact', '/hacks', '/early-access', '/roadmap', '/support', '/terms', '/privacy'];

async function verifyFooterOverlap(browser, route) {
  const page = await browser.newPage();
  try {
    await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

    const result = await page.evaluate(() => {
      const lastSection = document.querySelector('.base-main > section:last-of-type');
      if (!lastSection) {
        return { pass: false, error: 'No section:last-of-type found' };
      }

      const styles = window.getComputedStyle(lastSection);
      const radiusLeft = styles.borderBottomLeftRadius;
      const radiusRight = styles.borderBottomRightRadius;
      const margin = styles.marginBottom;
      const bgColor = styles.backgroundColor;

      const checks = {
        radiusLeft: radiusLeft === '40px',
        radiusRight: radiusRight === '40px',
        margin: margin === '-40px',
        hasBackground: bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent'
      };

      const pass = Object.values(checks).every(v => v);

      return {
        pass,
        checks,
        values: { radiusLeft, radiusRight, margin, bgColor }
      };
    });

    return { route, ...result };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch();
  let failed = false;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('FOOTER OVERLAP VERIFICATION TEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  for (const route of routes) {
    try {
      const result = await verifyFooterOverlap(browser, route);
      const status = result.pass ? '✓ PASS' : '✗ FAIL';

      console.log(`${status} ${route}`);

      if (!result.pass) {
        failed = true;
        console.log(`     Error: ${result.error || ''}`);
        if (result.checks) {
          console.log(`     Checks: ${Object.entries(result.checks).map(([k, v]) => `${k}=${v}`).join(', ')}`);
        }
        if (result.values) {
          console.log(`     Values: radius=${result.values.radiusLeft}/${result.values.radiusRight}, margin=${result.values.margin}, bg=${result.values.bgColor}`);
        }
      }
    } catch (e) {
      failed = true;
      console.log(`✗ ERROR ${route}: ${e.message}`);
    }
  }

  await browser.close();

  console.log('\n' + '━'.repeat(60));
  if (failed) {
    console.log('FAILED: Some routes do not have proper footer overlap');
    process.exit(1);
  } else {
    console.log('SUCCESS: All routes have proper footer overlap styling');
    process.exit(0);
  }
}

main().catch(e => {
  console.error('Test execution error:', e);
  process.exit(1);
});
