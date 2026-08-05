import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Navigate to /blocks immediately after page load
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

// Capture at ~100ms (during animation)
await page.waitForTimeout(100);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/blocks-AFTER-animation-100ms-1440x900.png' });

// Capture at ~1500ms (after animation settles)
await page.waitForTimeout(1400);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/blocks-AFTER-animation-settled-1440x900.png' });

console.log('✓ After-state screenshots captured (selector = .base-header, animation ACTIVE)');

await browser.close();
