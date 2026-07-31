import { chromium } from 'playwright';

const routes = ['/', '/blocks', '/pricing', '/support', '/contact', '/early-access'];
const browser = await chromium.launch();

console.log('\nHEADER HEIGHT VERIFICATION');
console.log('===========================\n');

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const headerDims = await page.evaluate(() => {
    const header = document.querySelector('.ramp-header, header');
    if (!header) return { error: 'header not found' };

    const rect = header.getBoundingClientRect();
    const computed = window.getComputedStyle(header);
    
    return {
      route: window.location.pathname,
      height: Math.round(rect.height),
      width: Math.round(rect.width),
      display: computed.display,
      position: computed.position,
      padding: `${computed.paddingTop} ${computed.paddingRight} ${computed.paddingBottom} ${computed.paddingLeft}`
    };
  });

  console.log(`${headerDims.route.padEnd(18)} | Height: ${headerDims.height}px`);

  await page.close();
}

await browser.close();
