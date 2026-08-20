import { chromium } from 'playwright';

const BASE_URL = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const URL = `${BASE_URL}/homepage-v1/`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let failed = false;

function log(section, ok, detail = '') {
  const icon = ok ? '✓' : '✗';
  console.log(`${icon} ${section}${detail ? ': ' + detail : ''}`);
  if (!ok) failed = true;
}

try {
  await page.goto(URL, { waitUntil: 'networkidle' });

  // 1. Header: should start with dark surface (ink) on dark hero
  const headerContainer = page.locator('.header-container');
  const headerSurface = await headerContainer.getAttribute('data-surface');
  log('Header initial surface', headerSurface === 'ink', headerSurface);

  // 2. Scroll down and check header gets scrolled class and clear blur background
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(150);
  const baseHeader = page.locator('.base-header');
  const hasScrolled = await baseHeader.evaluate((el) => el.classList.contains('scrolled'));
  log('Header scrolled class', hasScrolled);
  const headerBg = await baseHeader.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  const hasBlur = await baseHeader.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return (style.backdropFilter || style.webkitBackdropFilter).includes('blur');
  });
  const isNotDark = !headerBg.startsWith('rgba(10, 10, 10');
  log('Header scrolled background is clear blur', isNotDark && hasBlur, headerBg);

  // 3. Hero eyebrow copy
  const eyebrow = page.locator('.sample-hero-eyebrow');
  const eyebrowText = await eyebrow.textContent();
  log('Hero eyebrow', eyebrowText?.includes('For WordPress. Not a page builder'), eyebrowText);

  // 4. Hero shot max-width should be <= 900px
  const shot = page.locator('.sample-editor-shot');
  const shotBox = await shot.boundingBox();
  log('Hero shot width', shotBox && shotBox.width <= 905, shotBox ? `${Math.round(shotBox.width)}px` : 'not found');

  // 5. Grid Reveal replay button exists and is clickable
  const grRoot = page.locator('[data-sample-gr-root]').first();
  const grReplay = grRoot.locator('[data-sample-replay-trigger]');
  log('Grid Reveal replay button', await grReplay.isVisible());

  // Scroll Grid Reveal into view, trigger initial reveal, then click replay
  await grRoot.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await grReplay.click();
  await page.waitForTimeout(100);
  const grItems = grRoot.locator('.sample-gr-item');
  const grOnAfterReplay = await grRoot.locator('.sample-gr-grid').evaluate((el) => el.classList.contains('sample-gr-on'));
  log('Grid Reveal replay re-applied .sample-gr-on', grOnAfterReplay);

  // 6. Text Reveal replay
  const trRoot = page.locator('[data-sample-tr-root]').first();
  const trReplay = trRoot.locator('[data-sample-replay-trigger]');
  await trRoot.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  log('Text Reveal replay button', await trReplay.isVisible());
  await trReplay.click();
  await page.waitForTimeout(100);
  const trOnAfterReplay = await trRoot.locator('.sample-tr-line').evaluate((el) => el.classList.contains('sample-tr-on'));
  log('Text Reveal replay re-applied .sample-tr-on', trOnAfterReplay);

  // 7. Filterable Grid: click 'Identity' and verify only matching items are visible
  const fgRoot = page.locator('[data-sample-fg-root]').first();
  await fgRoot.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const identityTab = fgRoot.locator('[data-sample-fg-tab="Identity"]');
  await identityTab.click();
  await page.waitForTimeout(200);
  const hiddenCount = await fgRoot.locator('[data-sample-fg-item].is-hidden').count();
  const visibleCount = await fgRoot.locator('[data-sample-fg-item]:not(.is-hidden)').count();
  log('Filterable Grid Identity filter', hiddenCount === 4 && visibleCount === 2, `hidden=${hiddenCount}, visible=${visibleCount}`);

  // 8. Founder pricing section should be ink surface
  const pricingSection = page.locator('.pricing-section');
  const pricingSurface = await pricingSection.getAttribute('data-surface');
  log('Pricing section surface', pricingSurface === 'ink', pricingSurface);

  // 9. Footer should be present and not have extra scrollable white space
  const footer = page.locator('.footer');
  log('Footer present', await footer.isVisible());
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const winHeight = await page.evaluate(() => window.innerHeight);
  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);
  const scrollTop = await page.evaluate(() => window.scrollY);
  log('Scrolled to bottom', scrollTop + winHeight >= docHeight - 10, `scrollTop=${scrollTop}, docHeight=${docHeight}`);

  // 10. No em dash in visible page text (basic check)
  const bodyText = await page.locator('body').textContent();
  const hasEmDash = bodyText?.includes('—') ?? false;
  log('No em dash in body text', !hasEmDash);
} catch (err) {
  console.error('Verification error:', err.message);
  failed = true;
} finally {
  await browser.close();
}

process.exit(failed ? 1 : 0);
