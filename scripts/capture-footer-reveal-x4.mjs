import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

// Get page height
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
console.log(`Page height: ${pageHeight}px`);

// Before reveal (top of page)
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/footer-before-reveal-1440x900.png' });
console.log('✓ Before reveal: scrollY=0');

// Mid-reveal (footer entering viewport)
const midScroll = pageHeight - 1350;
await page.evaluate((scroll) => window.scrollTo(0, scroll), midScroll);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/footer-mid-reveal-1440x900.png' });
console.log(`✓ Mid-reveal: scrollY=${midScroll}px`);

// Locked at bottom
const bottomScroll = pageHeight - 900;
await page.evaluate((scroll) => window.scrollTo(0, scroll), bottomScroll);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/footer-locked-bottom-1440x900.png' });
console.log(`✓ Locked at bottom: scrollY=${bottomScroll}px`);

// Mobile 390x844
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/footer-mobile-390x844.png' });
console.log('✓ Mobile 390x844: footer static below 900px breakpoint');

await context.close();
await browser.close();
console.log('\n✓ All screenshots captured');
