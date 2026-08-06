import { chromium } from 'playwright';

async function kk4Screenshots() {
  const browser = await chromium.launch({ headless: true });
  const breakpoints = [375, 768, 1920];

  console.log('KK4.2: Taking responsive hero screenshots\n');

  for (const bp of breakpoints) {
    const page = await browser.newPage({ viewport: { width: bp, height: 900 } });
    
    await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const filename = `/private/tmp/kk4-hero-${bp}px.png`;
    await page.screenshot({ path: filename, fullPage: false });
    console.log(`✅ ${bp}px: ${filename}`);

    await page.close();
  }

  console.log('\nAll screenshots saved.');
  await browser.close();
}

kk4Screenshots().catch(err => console.error(err.message));
