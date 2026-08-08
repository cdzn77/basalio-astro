import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const screenshotDir = '/Users/angelomanzanojr/Desktop/basalio-screenshots';

async function takeScreenshot(url, filename, cssOverrides = '') {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();

  // Inject CSS overrides before navigation
  if (cssOverrides) {
    await page.addInitScript(`
      const style = document.createElement('style');
      style.textContent = \`${cssOverrides}\`;
      document.head.appendChild(style);
    `);
  }

  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const screenshotPath = path.join(screenshotDir, filename);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`✓ ${filename}`);

  await context.close();
  await browser.close();
}

async function main() {
  // Ensure screenshot directory exists
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('\n════════════════════════════════════════════════════════');
  console.log('TAKING SCREENSHOTS: DA1-DA4 Variants (375×812)');
  console.log('════════════════════════════════════════════════════════\n');

  // DA1: Body copy variants (16px, 18px, 20px)
  console.log('DA1 — Body Copy Variants:\n');

  await takeScreenshot(
    'http://localhost:4321',
    'DA1-body-16px-current.png',
    'p { font-size: 16px !important; line-height: 1.6 !important; }'
  );

  await takeScreenshot(
    'http://localhost:4321',
    'DA1-body-18px.png',
    'p { font-size: 18px !important; line-height: 1.6 !important; }'
  );

  await takeScreenshot(
    'http://localhost:4321',
    'DA1-body-20px.png',
    'p { font-size: 20px !important; line-height: 1.6 !important; }'
  );

  // DA2: Hero eyebrow variants (12px current vs 14px Ramp)
  console.log('\nDA2 — Hero Eyebrow Variants:\n');

  await takeScreenshot(
    'http://localhost:4321',
    'DA2-eyebrow-12px-current.png',
    '.hero-eyebrow { font-size: 12px !important; letter-spacing: 0.1em !important; }'
  );

  await takeScreenshot(
    'http://localhost:4321',
    'DA2-eyebrow-14px-ramp-matched.png',
    '.hero-eyebrow { font-size: 14px !important; letter-spacing: 2.8px !important; }'
  );

  // DA3: Hero h1 full-bleed inspection
  console.log('\nDA3 — Hero H1 Full-Bleed:\n');

  await takeScreenshot(
    'http://localhost:4321',
    'DA3-hero-h1-current.png',
    '.hero { outline: 1px solid red !important; } .hero-heading { outline: 1px solid blue !important; }'
  );

  // DA4: Hero h1 variants
  console.log('\nDA4 — Hero H1 Weight/Tracking Variants:\n');

  await takeScreenshot(
    'http://localhost:4321',
    'DA4-hero-48-700-1.10-current.png',
    '.hero-heading { font-size: 48px !important; font-weight: 700 !important; line-height: 1.1 !important; letter-spacing: normal !important; }'
  );

  await takeScreenshot(
    'http://localhost:4321',
    'DA4-hero-44-400-1.00-ramp-matched.png',
    '.hero-heading { font-size: 44px !important; font-weight: 400 !important; line-height: 1 !important; letter-spacing: -0.02em !important; }'
  );

  await takeScreenshot(
    'http://localhost:4321',
    'DA4-hero-48-700-1.05-hybrid.png',
    '.hero-heading { font-size: 48px !important; font-weight: 700 !important; line-height: 1.05 !important; letter-spacing: -0.01em !important; }'
  );

  console.log('\n════════════════════════════════════════════════════════');
  console.log('Screenshots saved to ~/Desktop/basalio-screenshots/');
  console.log('════════════════════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
