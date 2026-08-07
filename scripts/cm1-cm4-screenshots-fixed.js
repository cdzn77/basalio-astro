import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const SCREENSHOT_DIR = '/Users/angelomanzanojr/Desktop/basalio-screenshots';

(async () => {
  const browser = await chromium.launch();

  console.log('═══════════════════════════════════════════════════');
  console.log('CM1 — Header tint options with computed style verification');
  console.log('═══════════════════════════════════════════════════\n');

  const tintOptions = [
    {
      name: 'option_a_white72_blur12',
      css: `.base-header[data-surface="paper"].scrolled { background: rgba(255,255,255,0.72) !important; backdrop-filter: blur(12px) !important; }`,
    },
    {
      name: 'option_b_white85_blur8',
      css: `.base-header[data-surface="paper"].scrolled { background: rgba(255,255,255,0.85) !important; backdrop-filter: blur(8px) !important; }`,
    },
    {
      name: 'option_c_solid_paper',
      css: `.base-header[data-surface="paper"].scrolled { background: var(--surface-paper) !important; backdrop-filter: none !important; }`,
    }
  ];

  // CM1: Acid card option (pricing page, scrolled)
  for (const option of tintOptions) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:${PORT}/pricing`, { waitUntil: 'networkidle' });

    // Inject CSS
    await page.addStyleTag({ content: option.css });
    
    // Scroll to position acid card under header
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(300);

    // Read computed background color
    const computedBg = await page.evaluate(() => {
      const header = document.querySelector('.base-header');
      if (header) {
        return window.getComputedStyle(header).backgroundColor;
      }
      return 'NOT_FOUND';
    });

    const screenshotPath = `${SCREENSHOT_DIR}/cm1_${option.name}_acid.png`;
    await page.screenshot({ path: screenshotPath });
    
    console.log(`✓ ${option.name} (acid card)`);
    console.log(`  File: cm1_${option.name}_acid.png`);
    console.log(`  Computed backgroundColor: ${computedBg}`);
    console.log();

    await page.close();
  }

  // CM2: Ink hero (homepage, scrolled to 0)
  console.log('═══════════════════════════════════════════════════');
  console.log('CM2 — Over ink hero ("/", homepage video)');
  console.log('═══════════════════════════════════════════════════\n');

  for (const option of tintOptions) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

    // Inject CSS
    await page.addStyleTag({ content: option.css });
    
    // Stay at top (scroll 0) to show video hero
    await page.waitForTimeout(300);

    // Read computed background color
    const computedBg = await page.evaluate(() => {
      const header = document.querySelector('.base-header');
      if (header) {
        return window.getComputedStyle(header).backgroundColor;
      }
      return 'NOT_FOUND';
    });

    // Also check data-surface attribute
    const surfaceAttr = await page.evaluate(() => {
      const header = document.querySelector('.base-header');
      return header ? header.getAttribute('data-surface') : 'NOT_FOUND';
    });

    const screenshotPath = `${SCREENSHOT_DIR}/cm2_${option.name}_ink_hero.png`;
    await page.screenshot({ path: screenshotPath });
    
    console.log(`✓ ${option.name} (ink hero, data-surface="${surfaceAttr}")`);
    console.log(`  File: cm2_${option.name}_ink_hero.png`);
    console.log(`  Computed backgroundColor: ${computedBg}`);
    console.log();

    await page.close();
  }

  // CM3: Divider list at 375, 390, 414
  console.log('═══════════════════════════════════════════════════');
  console.log('CM3 — Divider list (FREE FOREVER / NO RENEWAL / 100 ONLY)');
  console.log('═══════════════════════════════════════════════════\n');

  const viewports = [375, 390, 414];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp, height: 844 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

    // Scroll to divider list section (pricing section)
    await page.evaluate(() => {
      const divider = document.querySelector('.pricing-divider-list');
      if (divider) {
        divider.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    });
    await page.waitForTimeout(300);

    // Verify divider list is in frame
    const dividerInFrame = await page.evaluate(() => {
      const divider = document.querySelector('.pricing-divider-list');
      if (!divider) return { found: false, rect: null };
      const rect = divider.getBoundingClientRect();
      const inViewport = rect.top >= -100 && rect.top <= 844;
      return { found: true, rect: { top: rect.top, height: rect.height, width: rect.width } };
    });

    const screenshotPath = `${SCREENSHOT_DIR}/cm3_divider_${vp}px.png`;
    await page.screenshot({ path: screenshotPath });
    
    console.log(`✓ Divider list at ${vp}px`);
    console.log(`  File: cm3_divider_${vp}px.png`);
    console.log(`  In viewport: ${dividerInFrame.found ? 'YES' : 'NOT FOUND'}`);
    if (dividerInFrame.rect) {
      console.log(`  Position: top ${dividerInFrame.rect.top.toFixed(0)}px, height ${dividerInFrame.rect.height.toFixed(0)}px, width ${dividerInFrame.rect.width.toFixed(0)}px`);
    }
    console.log();

    await page.close();
  }

  // CM4: Check LAB banner and header overlap on /hero-lab
  console.log('═══════════════════════════════════════════════════');
  console.log('CM4 — LAB banner and header overlap check (/hero-lab)');
  console.log('═══════════════════════════════════════════════════\n');

  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:${PORT}/hero-lab`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  const bannerAndHeaderInfo = await page.evaluate(() => {
    const banner = document.querySelector('.lab-banner');
    const header = document.querySelector('.base-header');

    const bannerInfo = banner ? {
      position: window.getComputedStyle(banner).position,
      top: window.getComputedStyle(banner).top,
      height: banner.offsetHeight,
      zIndex: window.getComputedStyle(banner).zIndex,
      found: true
    } : { found: false };

    const headerInfo = header ? {
      position: window.getComputedStyle(header).position,
      top: window.getComputedStyle(header).top,
      height: header.offsetHeight,
      zIndex: window.getComputedStyle(header).zIndex,
      found: true
    } : { found: false };

    return { banner: bannerInfo, header: headerInfo };
  });

  const screenshotPath = `${SCREENSHOT_DIR}/cm4_overlap_check_hero_lab.png`;
  await page.screenshot({ path: screenshotPath });

  console.log(`✓ /hero-lab overlap screenshot`);
  console.log(`  File: cm4_overlap_check_hero_lab.png`);
  console.log();
  console.log(`  LAB banner:`);
  if (bannerAndHeaderInfo.banner.found) {
    console.log(`    position: ${bannerAndHeaderInfo.banner.position}`);
    console.log(`    top: ${bannerAndHeaderInfo.banner.top}`);
    console.log(`    height: ${bannerAndHeaderInfo.banner.height}px`);
    console.log(`    z-index: ${bannerAndHeaderInfo.banner.zIndex}`);
  } else {
    console.log(`    NOT FOUND`);
  }
  console.log();
  console.log(`  Base header:`);
  if (bannerAndHeaderInfo.header.found) {
    console.log(`    position: ${bannerAndHeaderInfo.header.position}`);
    console.log(`    top: ${bannerAndHeaderInfo.header.top}`);
    console.log(`    height: ${bannerAndHeaderInfo.header.height}px`);
    console.log(`    z-index: ${bannerAndHeaderInfo.header.zIndex}`);
  } else {
    console.log(`    NOT FOUND`);
  }

  await page.close();
  await browser.close();
  
  console.log('\n✅ All screenshots captured and verified.');
})();
