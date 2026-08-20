import { chromium } from 'playwright';

const BASE_URL = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const routes = [
  '/blocks/',
  '/blocks/grid-reveal/',
  '/blocks/text-reveal/',
  '/blocks/scroll-sequence/',
  '/blocks/pinned-scroll/',
  '/blocks/before-after/',
  '/blocks/case-study-transition/',
  '/blocks/custom-cursor/',
  '/blocks/filterable-grid/',
  '/blocks/magnetic-button/',
  '/pricing/',
  '/hacks/',
  '/contact/',
  '/404/',
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let failed = false;

function log(label, ok, detail = '') {
  const icon = ok ? '✓' : '✗';
  console.log(`${icon} ${label}${detail ? ': ' + detail : ''}`);
  if (!ok) failed = true;
}

try {
  for (const route of routes) {
    const resp = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
    log(`Route ${route}`, resp && resp.status() < 400, `${resp?.status()}`);

    const title = await page.title();
    log(`  title`, title.length > 0, title);

    const h1 = await page.locator('h1').first().textContent();
    log(`  h1`, !!h1, h1?.slice(0, 40));

    // Verify no em dash in visible text
    const bodyText = await page.locator('body').textContent();
    log(`  no em dash`, !bodyText?.includes('—'));
  }

  // Blocks overview specific checks
  await page.goto(`${BASE_URL}/blocks/`, { waitUntil: 'networkidle' });
  const cardCount = await page.locator('.block-card').count();
  log('Blocks grid card count', cardCount === 9, cardCount);

  const firstDetailHref = await page.locator('.block-card').first().getAttribute('href');
  log('First card links to detail', firstDetailHref?.startsWith('/blocks/'));

  // Block detail specific checks
  await page.goto(`${BASE_URL}/blocks/grid-reveal/`, { waitUntil: 'networkidle' });
  const hasControls = await page.locator('.controls-table').isVisible();
  log('Grid reveal detail has controls table', hasControls);

  const hasAccessibility = await page.locator('.block-accessibility-inner').isVisible();
  log('Grid reveal detail has accessibility note', hasAccessibility);

  const prevHref = await page.locator('.prev-next-prev').getAttribute('href');
  const nextHref = await page.locator('.prev-next-next').getAttribute('href');
  log('Prev/next nav present', !!prevHref && !!nextHref);
} catch (err) {
  console.error('Verification error:', err.message);
  failed = true;
} finally {
  await browser.close();
}

process.exit(failed ? 1 : 0);
