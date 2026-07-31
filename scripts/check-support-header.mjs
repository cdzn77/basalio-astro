import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

// Take screenshot
await page.screenshot({ path: '/tmp/support-header.png', fullPage: false });

// Check header styling
const headerStyle = await page.evaluate(() => {
  const header = document.querySelector('header, [class*="header"], .ramp-header');
  if (!header) return { error: 'header not found' };

  const computed = window.getComputedStyle(header);
  return {
    element: header.tagName + (header.className ? '.' + header.className : ''),
    background: computed.backgroundColor,
    backgroundImage: computed.backgroundImage,
    height: computed.height,
    position: computed.position
  };
});

console.log('\nSUPPORT HEADER CHECK');
console.log('====================\n');
console.log(JSON.stringify(headerStyle, null, 2));

await browser.close();
