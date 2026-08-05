import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

// Wait for animation to settle
await page.waitForTimeout(1500);

// Take screenshot
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/blocks-header-animated-1440x900.png' });

// Check if .base-header exists
const headerExists = await page.evaluate(() => {
  const header = document.querySelector('.base-header');
  if (header) {
    const style = window.getComputedStyle(header);
    return {
      exists: true,
      opacity: style.opacity,
      transform: style.transform,
      display: style.display
    };
  }
  return { exists: false };
});

console.log('✓ Screenshot: /blocks header at 1440x900 (post-animation)');
console.log('Header element status:', JSON.stringify(headerExists, null, 2));

await browser.close();
