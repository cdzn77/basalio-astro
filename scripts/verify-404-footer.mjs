import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Load non-existent path
await page.goto('http://localhost:4321/some-nonexistent-path', { waitUntil: 'networkidle' });

// Screenshot
await page.screenshot({ path: '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/8272501e-7869-4d98-84b2-a8d42155f5b2/scratchpad/404-fixed-1440x900.png' });

// Check footer overlap styling
const overlap = await page.evaluate(() => {
  const section = document.querySelector('.base-main > section:last-of-type');
  if (!section) {
    return { found: false };
  }
  const style = window.getComputedStyle(section);
  return {
    found: true,
    borderBottomLeftRadius: style.borderBottomLeftRadius,
    borderBottomRightRadius: style.borderBottomRightRadius,
    marginBottom: style.marginBottom
  };
});

console.log('✓ Screenshot captured: /nonexistent-path');
console.log('Footer overlap on 404 page:');
console.log(JSON.stringify(overlap, null, 2));

await browser.close();
