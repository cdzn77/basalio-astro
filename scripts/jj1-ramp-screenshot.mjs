import { chromium } from 'playwright';
import fs from 'fs';

async function screenshotRamp() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const screenshotPath = '/private/tmp/ramp-mobile-375.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`Screenshot saved to: ${screenshotPath}`);
  console.log(`File size: ${fs.statSync(screenshotPath).size} bytes`);

  await browser.close();
}

screenshotRamp().catch(err => console.error(err.message));
