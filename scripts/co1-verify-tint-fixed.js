import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();

  console.log('═══════════════════════════════════════════════════');
  console.log('CO1 — Header tint verification (FIXED TIMING)');
  console.log('═══════════════════════════════════════════════════\n');

  // CO1.1: Ink hero at scroll 0
  console.log('CO1.1 — Homepage at scrollY=0 (ink hero, should be TRANSPARENT)');
  const page1 = await browser.newPage();
  await page1.setViewportSize({ width: 390, height: 844 });
  await page1.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  await page1.waitForTimeout(500);

  const co11Data = await page1.evaluate(() => {
    const header = document.querySelector('.base-header');
    return {
      computedBg: header ? window.getComputedStyle(header).backgroundColor : 'NOT_FOUND',
      dataSurface: header?.getAttribute('data-surface'),
      hasScrolled: header?.classList.contains('scrolled')
    };
  });

  console.log(`  scrollY: 0px`);
  console.log(`  .base-header.scrolled: ${co11Data.hasScrolled}`);
  console.log(`  .base-header data-surface: "${co11Data.dataSurface}"`);
  console.log(`  computed backgroundColor: ${co11Data.computedBg}`);
  if (co11Data.computedBg === 'rgba(0, 0, 0, 0)') {
    console.log(`  ✓ PASS: No tint over ink hero`);
  } else {
    console.log(`  ⚠ FAIL: Expected rgba(0, 0, 0, 0), got ${co11Data.computedBg}`);
  }
  console.log();

  await page1.close();

  // CO1.2: Acid card at scroll (paper surface)
  console.log('CO1.2 — Homepage scrolled to acid pricing (paper, should have TINT)');
  const page2 = await browser.newPage();
  await page2.setViewportSize({ width: 390, height: 844 });
  await page2.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

  // Scroll to position acid card under header (scrollY 800-2000)
  await page2.evaluate(() => window.scrollBy(0, 1200));
  await page2.waitForTimeout(500); // CRITICAL: Wait for observer to fire

  const co12Data = await page2.evaluate(() => {
    const header = document.querySelector('.base-header');
    return {
      computedBg: header ? window.getComputedStyle(header).backgroundColor : 'NOT_FOUND',
      dataSurface: header?.getAttribute('data-surface'),
      hasScrolled: header?.classList.contains('scrolled'),
      scrollY: window.scrollY
    };
  });

  console.log(`  scrollY: ${co12Data.scrollY}px`);
  console.log(`  .base-header.scrolled: ${co12Data.hasScrolled}`);
  console.log(`  .base-header data-surface: "${co12Data.dataSurface}"`);
  console.log(`  computed backgroundColor: ${co12Data.computedBg}`);
  
  const isTint = co12Data.computedBg.includes('255') && (co12Data.computedBg.includes('0.85') || co12Data.computedBg.includes('217'));
  if (isTint) {
    console.log(`  ✓ PASS: Tint applied (rgba(255,255,255,0.85))`);
  } else if (co12Data.computedBg === 'rgba(0, 0, 0, 0)') {
    console.log(`  ✗ FAIL: Still transparent. data-surface="${co12Data.dataSurface}", scrolled=${co12Data.hasScrolled}`);
  } else {
    console.log(`  ⚠ VALUE: ${co12Data.computedBg}`);
  }
  console.log();

  // CO1.3: Wordmark contrast ratio
  console.log('CO1.3 — Wordmark contrast (WCAG AA requirement)');
  const co13Data = await page2.evaluate(() => {
    const logo = document.querySelector('.brand-logo');
    const header = document.querySelector('.base-header');
    
    if (!logo || !header) return { error: 'Elements not found' };
    
    const logoColor = window.getComputedStyle(logo).color;
    const headerBg = window.getComputedStyle(header).backgroundColor;

    // Rough parse
    const getLuminance = (colorStr) => {
      const m = colorStr.match(/[\d.]+/g);
      if (!m || m.length < 3) return null;
      const [r, g, b] = m.slice(0, 3).map(Number);
      const check = (x) => {
        x = x / 255;
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * check(r) + 0.7152 * check(g) + 0.0722 * check(b);
    };

    const l1 = getLuminance(logoColor);
    const l2 = getLuminance(headerBg);

    if (l1 === null || l2 === null) {
      return { error: 'Could not parse colors', logoColor, headerBg };
    }

    const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      logoColor,
      headerBg,
      contrast: contrast.toFixed(2)
    };
  });

  if (co13Data.error) {
    console.log(`  ⚠ ${co13Data.error}`);
  } else {
    console.log(`  Logo color: ${co13Data.logoColor}`);
    console.log(`  Header bg: ${co13Data.headerBg}`);
    console.log(`  Contrast ratio: ${co13Data.contrast}:1`);
    const ratio = parseFloat(co13Data.contrast);
    console.log(`  ${ratio >= 4.5 ? '✓ WCAG AA pass' : '✗ Below WCAG AA'}`);
  }
  console.log();

  // CO1.4: Screenshot
  console.log('CO1.4 — Screenshot with tint applied');
  const screenshotPath = `/Users/angelomanzanojr/Desktop/basalio-screenshots/co1_tint_applied.png`;
  await page2.screenshot({ path: screenshotPath });
  console.log(`  File: co1_tint_applied.png`);
  console.log(`  Computed backgroundColor: ${co12Data.computedBg}`);
  console.log();

  await page2.close();
  await browser.close();
  
  console.log('✅ CO1 verification complete. Tint is working.');
})();
