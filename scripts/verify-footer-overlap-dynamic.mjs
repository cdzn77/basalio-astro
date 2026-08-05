import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// Enumerate routes from dist/ build output
function enumerateRoutesFromBuild() {
  const distPath = './dist';
  const routes = [];
  
  // Scan dist/ for generated pages
  const files = fs.readdirSync(distPath, { recursive: true });
  
  for (const file of files) {
    if (file.endsWith('index.html')) {
      // index.html in a subdirectory → /dirname/
      const dir = path.dirname(file);
      const route = '/' + dir;
      routes.push(route);
    } else if (file === 'index.html') {
      // Root index.html → /
      routes.push('/');
    } else if (file.endsWith('.html') && !file.includes('/')) {
      // Root-level .html files like 404.html → /404
      const name = path.basename(file, '.html');
      if (name !== 'index') {
        routes.push('/' + name);
      }
    }
  }
  
  return routes.sort();
}

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

      const checks = {
        radiusLeft: radiusLeft === '40px',
        radiusRight: radiusRight === '40px',
        margin: margin === '-40px'
      };

      const pass = Object.values(checks).every(v => v);

      return {
        pass,
        checks,
        values: { radiusLeft, radiusRight, margin }
      };
    });

    return { route, ...result };
  } finally {
    await page.close();
  }
}

async function main() {
  const routes = enumerateRoutesFromBuild();
  const browser = await chromium.launch();
  let failed = false;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('DYNAMIC FOOTER OVERLAP VERIFICATION TEST');
  console.log(`Routes enumerated from dist/ build: ${routes.length} pages`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  for (const route of routes) {
    const result = await verifyFooterOverlap(browser, route);
    if (result.pass) {
      console.log(`✓ PASS ${route}`);
    } else {
      console.log(`✗ FAIL ${route}`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      } else {
        console.log(`  Values:`, result.values);
      }
      failed = true;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (failed) {
    console.log('FAILURE: Some routes failed footer overlap check');
  } else {
    console.log(`SUCCESS: All ${routes.length} routes have proper footer overlap styling`);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await browser.close();
  process.exit(failed ? 1 : 0);
}

main().catch(console.error);
