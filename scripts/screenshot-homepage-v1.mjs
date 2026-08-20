import { chromium } from 'playwright';
import { existsSync } from 'fs';
import { mkdirSync } from 'fs';

const BASE_URL = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const URL = `${BASE_URL}/homepage-v1/`;
const OUT_DIR = '/Users/angelomanzanojr/basalio-astro/verification';

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(URL, { waitUntil: 'networkidle' });

// Hero (top)
await page.screenshot({ path: `${OUT_DIR}/v1-hero.png`, fullPage: false });

// Scroll to show header scrolled state
await page.evaluate(() => window.scrollTo(0, 400));
await page.waitForTimeout(200);
await page.screenshot({ path: `${OUT_DIR}/v1-header-scrolled.png`, fullPage: false });

// Pricing section
await page.locator('.pricing-section').scrollIntoViewIfNeeded();
await page.waitForTimeout(200);
await page.screenshot({ path: `${OUT_DIR}/v1-pricing.png`, fullPage: false });

// Footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(200);
await page.screenshot({ path: `${OUT_DIR}/v1-footer.png`, fullPage: false });

// Full page
await page.goto(URL, { waitUntil: 'networkidle' });
await page.screenshot({ path: `${OUT_DIR}/v1-full.png`, fullPage: true });

await browser.close();
console.log('Screenshots saved to', OUT_DIR);
