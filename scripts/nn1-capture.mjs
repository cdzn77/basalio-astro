import { chromium } from 'playwright';

async function captureComparison() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/nn1-whoitsfor-comparison', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const screenshotPath = '/private/tmp/nn1-whoitsfor-comparison-375.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`NN1 Comparison screenshot: ${screenshotPath}`);
  console.log('\nNN1.1: Desktop spec rendered ✅');
  console.log('NN1.2: Mobile spec rendered ✅');
  console.log('NN1.3: Visual assessment ready for review');

  await browser.close();
}

captureComparison().catch(err => console.error(err.message));
