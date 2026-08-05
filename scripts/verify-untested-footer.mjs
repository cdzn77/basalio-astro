import { chromium } from 'playwright';

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
      return { pass, checks, values: { radiusLeft, radiusRight, margin } };
    });
    
    return { route, ...result };
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch();
const untested = ['/', '/404', '/hero-lab', '/welcome'];

console.log('\nUNTESTED PAGES FOOTER OVERLAP VERIFICATION\n');
for (const route of untested) {
  const result = await verifyFooterOverlap(browser, route);
  const status = result.pass ? '✓ PASS' : '✗ FAIL';
  console.log(`${status} ${route}`);
  if (!result.pass) {
    console.log(`  Error: ${result.error || JSON.stringify(result.values)}`);
  }
}

await browser.close();
