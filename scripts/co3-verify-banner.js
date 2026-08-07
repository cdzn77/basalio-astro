import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;
const SCREENSHOT_DIR = '/Users/angelomanzanojr/Desktop/basalio-screenshots';

(async () => {
  const browser = await chromium.launch();

  console.log('═══════════════════════════════════════════════════');
  console.log('CO3 — LAB banner overlap verification');
  console.log('═══════════════════════════════════════════════════\n');

  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:${PORT}/hero-lab`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  // Check positions
  const data = await page.evaluate(() => {
    const banner = document.querySelector('.lab-banner');
    const header = document.querySelector('.base-header');
    
    if (!banner || !header) {
      return { error: 'Elements not found' };
    }

    const bannerStyle = window.getComputedStyle(banner);
    const headerStyle = window.getComputedStyle(header);

    return {
      banner: {
        top: bannerStyle.top,
        height: banner.offsetHeight,
        zIndex: bannerStyle.zIndex,
        bottom: banner.offsetTop + banner.offsetHeight
      },
      header: {
        top: headerStyle.top,
        height: header.offsetHeight,
        zIndex: headerStyle.zIndex,
        bottom: header.offsetTop + header.offsetHeight
      },
      bodyPaddingTop: window.getComputedStyle(document.body).paddingTop,
      overlap: null
    };
  });

  if (data.error) {
    console.log(`✗ ${data.error}`);
  } else {
    console.log(`Header:`);
    console.log(`  top: ${data.header.top} | height: ${data.header.height}px | z-index: ${data.header.zIndex}`);
    console.log(`  occupies: 0–${data.header.height}px`);
    console.log();
    console.log(`LAB Banner:`);
    console.log(`  top: ${data.banner.top} | height: ${data.banner.height}px | z-index: ${data.banner.zIndex}`);
    console.log(`  occupies: 80–${data.banner.bottom}px`);
    console.log();
    console.log(`Body padding-top: ${data.bodyPaddingTop}`);
    console.log();

    // Check for overlap
    const headerBottom = parseInt(data.header.height);
    const bannerTop = parseInt(data.banner.top);
    const noOverlap = bannerTop >= headerBottom;
    const zIndexOk = parseInt(data.header.zIndex) > parseInt(data.banner.zIndex);

    if (noOverlap && zIndexOk) {
      console.log(`✓ PASS: No overlap (banner starts at ${bannerTop}px, below header at ${headerBottom}px)`);
      console.log(`✓ PASS: z-index order correct (header ${data.header.zIndex} > banner ${data.banner.zIndex})`);
    } else {
      console.log(`${noOverlap ? '✓' : '✗'} No positional overlap`);
      console.log(`${zIndexOk ? '✓' : '✗'} z-index order correct`);
    }
  }

  // Screenshot
  const screenshotPath = `${SCREENSHOT_DIR}/co3_banner_no_overlap.png`;
  await page.screenshot({ path: screenshotPath });
  console.log();
  console.log(`Screenshot: co3_banner_no_overlap.png`);

  await page.close();
  await browser.close();
  
  console.log('\n✅ CO3 verification complete.');
})();
