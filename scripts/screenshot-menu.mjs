import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';

const URL = 'http://127.0.0.1:4321/homepage-v1/';
const OUT_DIR = '/Users/angelomanzanojr/basalio-astro/verification';
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(URL, { waitUntil: 'networkidle' });
await page.click('#menu-toggle');
await page.waitForTimeout(200);
await page.screenshot({ path: `${OUT_DIR}/v1-menu-open.png`, fullPage: false });

await browser.close();
console.log('Menu screenshot saved');
