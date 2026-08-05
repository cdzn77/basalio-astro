import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Navigate to /blocks immediately after page load
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

// Capture at ~100ms (during animation if active)
await page.waitForTimeout(100);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/blocks-BEFORE-animation-100ms-1440x900.png' });

// Capture at ~1500ms (after animation settles)
await page.waitForTimeout(1400);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/blocks-BEFORE-animation-settled-1440x900.png' });

console.log('✓ Before-state screenshots captured (selector = .ramp-header, animation DORMANT)');

await browser.close();
