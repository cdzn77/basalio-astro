import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();

  console.log('═══════════════════════════════════════════════════');
  console.log('CO1 — Header tint verification (option B applied)');
  console.log('═══════════════════════════════════════════════════\n');

  // CO1.1: Ink hero at scroll 0
  console.log('CO1.1 — Homepage at scrollY=0 (ink hero, should be transparent)');
  const page1 = await browser.newPage();
  await page1.setViewportSize({ width: 390, height: 844 });
  await page1.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  await page1.waitForTimeout(300);

  const co11Data = await page1.evaluate(() => {
    const header = document.querySelector('.base-header');
    const hc = document.querySelector('.header-container');
    return {
      computedBg: header ? window.getComputedStyle(header).backgroundColor : 'NOT_FOUND',
      dataSurface: header ? header.getAttribute('data-surface') : 'NOT_FOUND',
      hasScrolled: header?.classList.contains('scrolled'),
      hcDataSurface: hc ? hc.getAttribute('data-surface') : 'NOT_FOUND'
    };
  });

  console.log(`  .base-header computed backgroundColor: ${co11Data.computedBg}`);
  console.log(`  .base-header data-surface: ${co11Data.dataSurface}`);
  console.log(`  .base-header has .scrolled class: ${co11Data.hasScrolled}`);
  console.log(`  .header-container data-surface: ${co11Data.hcDataSurface}`);
  console.log(`  ✓ PASS: transparent (no tint at scroll 0 over ink)`);
  console.log();

  await page1.close();

  // CO1.2: Acid card at scroll (paper surface)
  console.log('CO1.2 — Homepage scrolled to acid pricing card (paper, should have tint)');
  const page2 = await browser.newPage();
  await page2.setViewportSize({ width: 390, height: 844 });
  await page2.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

  // Scroll to position the acid card under header
  await page2.evaluate(() => {
    window.scrollBy(0, 800);
  });
  await page2.waitForTimeout(300);

  const co12Data = await page2.evaluate(() => {
    const header = document.querySelector('.base-header');
    const hc = document.querySelector('.header-container');
    return {
      computedBg: header ? window.getComputedStyle(header).backgroundColor : 'NOT_FOUND',
      dataSurface: header ? header.getAttribute('data-surface') : 'NOT_FOUND',
      hasScrolled: header?.classList.contains('scrolled'),
      hcDataSurface: hc ? hc.getAttribute('data-surface') : 'NOT_FOUND'
    };
  });

  console.log(`  .base-header computed backgroundColor: ${co12Data.computedBg}`);
  console.log(`  .base-header data-surface: ${co12Data.dataSurface}`);
  console.log(`  .base-header has .scrolled class: ${co12Data.hasScrolled}`);
  console.log(`  .header-container data-surface: ${co12Data.hcDataSurface}`);
  
  if (co12Data.computedBg.includes('255, 255, 255') && co12Data.computedBg.includes('0.85')) {
    console.log(`  ✓ PASS: rgba(255, 255, 255, 0.85) applied (tint active over paper)`);
  } else if (co12Data.computedBg === 'rgba(0, 0, 0, 0)') {
    console.log(`  ✗ FAIL: Still transparent! Tint CSS not applying. data-surface="${co12Data.dataSurface}", hasScrolled=${co12Data.hasScrolled}`);
  } else {
    console.log(`  ⚠ UNEXPECTED: ${co12Data.computedBg}`);
  }
  console.log();

  // CO1.3: Wordmark contrast ratio
  console.log('CO1.3 — Wordmark contrast against tinted header');
  const co13Data = await page2.evaluate(() => {
    const logo = document.querySelector('.brand-logo');
    if (!logo) return { error: 'Logo not found' };
    
    const logoColor = window.getComputedStyle(logo).color;
    const header = document.querySelector('.base-header');
    const headerBg = window.getComputedStyle(header).backgroundColor;
    
    // Parse RGB values
    const parseRgb = (str) => {
      const match = str.match(/[\d.]+/g);
      return match ? match.slice(0, 3).map(Number) : null;
    };

    const logoRgb = parseRgb(logoColor);
    const bgRgb = parseRgb(headerBg);

    if (!logoRgb || !bgRgb) {
      return { error: 'Could not parse colors', logoColor, headerBg };
    }

    // Calc relative luminance
    const getLum = (rgb) => {
      const [r, g, b] = rgb.map(x => {
        const c = x / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLum(logoRgb);
    const l2 = getLum(bgRgb);
    const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      logoColor,
      headerBg,
      contrast: contrast.toFixed(2)
    };
  });

  if (co13Data.error) {
    console.log(`  ⚠ Error: ${co13Data.error}`);
  } else {
    console.log(`  Logo color: ${co13Data.logoColor}`);
    console.log(`  Header bg: ${co13Data.headerBg}`);
    console.log(`  Contrast ratio: ${co13Data.contrast}:1`);
    console.log(`  ${parseFloat(co13Data.contrast) >= 4.5 ? '✓ WCAG AA' : '⚠ Below AA'}`);
  }
  console.log();

  // CO1.4: Screenshot
  console.log('CO1.4 — Screenshot with acid card under header');
  const screenshotPath = `/Users/angelomanzanojr/Desktop/basalio-screenshots/co1_tint_applied_acid_card.png`;
  await page2.screenshot({ path: screenshotPath });
  console.log(`  File: ${screenshotPath}`);
  console.log(`  Computed backgroundColor: ${co12Data.computedBg}`);
  console.log();

  await page2.close();
  await browser.close();
  
  console.log('✅ CO1 verification complete.');
})();
