import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

// Capture immediately (no animation should occur)
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/blocks-no-animation-1440x900.png' });

// Check header opacity and transform
const headerState = await page.evaluate(() => {
  const header = document.querySelector('.base-header');
  if (!header) return { error: 'No header found' };
  const style = window.getComputedStyle(header);
  return {
    opacity: style.opacity,
    transform: style.transform,
    hasAnimation: style.animation !== 'none' && style.animation !== ''
  };
});

console.log('✓ Screenshot: /blocks (no animation)');
console.log('Header state:', JSON.stringify(headerState, null, 2));

await browser.close();
