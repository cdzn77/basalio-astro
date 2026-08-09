import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function verifyLocal() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Check first card's icon 
  const iconInfo = await page.evaluate(() => {
    const firstCard = document.querySelector('.block-card');
    const icon = firstCard?.querySelector('.block-icon');
    const svg = icon?.querySelector('svg');
    
    return {
      iconExists: !!icon,
      svgExists: !!svg,
      svgTagName: svg?.tagName,
      hasViewBox: svg?.hasAttribute('viewBox'),
      hasFill: svg?.querySelector('[fill]') ? true : false,
      innerHTML: icon?.innerHTML.substring(0, 100) || null
    };
  });

  console.log('Local test at localhost:4321:');
  console.log(`  Icon element exists: ${iconInfo.iconExists ? '✓' : '✗'}`);
  console.log(`  SVG element exists: ${iconInfo.svgExists ? '✓' : '✗'}`);
  console.log(`  SVG tag name: ${iconInfo.svgTagName}`);
  console.log(`  Has viewBox: ${iconInfo.hasViewBox ? '✓' : '✗'}`);
  console.log(`  Has fill: ${iconInfo.hasFill ? '✓' : '✗'}`);
  console.log(`  First 100 chars: ${iconInfo.innerHTML ? iconInfo.innerHTML : '(empty)'}`);

  await browser.close();
}

verifyLocal().catch(console.error);
