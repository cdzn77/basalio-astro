import { chromium } from 'playwright';

const BASE = process.env.URL || 'http://localhost:4321';

const paths = [
  '/',
  '/blocks/',
  '/blocks/grid-reveal/',
  '/pricing/',
  '/hacks/',
  '/contact/',
  '/support/',
  '/terms/',
  '/privacy/',
  '/roadmap/',
  '/early-access/',
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const errors = [];
page.on('pageerror', (err) => errors.push({ type: 'pageerror', message: err.message }));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push({ type: 'console', text: msg.text() });
});

const results = [];
for (const path of paths) {
  const url = `${BASE}${path}`;
  errors.length = 0;
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const hasHeader = await page.locator('header, [data-header]').count() > 0;
    const hasFooter = await page.locator('footer, [data-footer]').count() > 0;
    const title = await page.title();
    results.push({
      path,
      status: response?.status() || null,
      title,
      hasHeader,
      hasFooter,
      errors: errors.map((e) => e.message || e.text),
    });
  } catch (e) {
    results.push({ path, error: e.message });
  }
}

await browser.close();

const failed = results.filter((r) => r.error || r.status !== 200 || r.errors.length > 0);
console.log(JSON.stringify({ passed: results.length - failed.length, total: results.length, results }, null, 2));
