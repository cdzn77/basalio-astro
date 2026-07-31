import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

// Take screenshots of different sections
await page.screenshot({ path: '/tmp/support-hero.png', clip: { x: 0, y: 0, width: 1440, height: 400 } });
await page.screenshot({ path: '/tmp/support-faq.png', clip: { x: 0, y: 400, width: 1440, height: 600 } });

// Scroll to bottom to capture contact section
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(300);
await page.screenshot({ path: '/tmp/support-contact.png', clip: { x: 0, y: 0, width: 1440, height: 400 } });

console.log('✓ /support screenshots captured');
await browser.close();
