import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function properVerification() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const results = await page.evaluate(() => {
    const cards = document.querySelectorAll('.block-card');
    const allPass = [];
    
    cards.forEach((card, idx) => {
      // NEW VERIFICATION: Check if SVG actually rendered
      const icon = card.querySelector('.block-icon');
      const svg = icon?.querySelector('svg');
      
      // Proper checks:
      // 1. SVG element exists
      // 2. SVG has actual content (viewBox, fill attributes, etc)
      // 3. NOT an img element with broken src
      
      const hasSvg = !!svg;
      const hasViewBox = svg?.hasAttribute('viewBox');
      const hasContent = svg?.children.length > 0;
      const pass = hasSvg && hasViewBox && hasContent;
      
      allPass.push({
        card: idx,
        hasSvg,
        hasViewBox,
        hasContent,
        pass
      });
    });
    
    return allPass;
  });

  console.log('GC3 Proper Verification (localhost:4321):');
  console.log('Card | SVG | ViewBox | Content | PASS');
  let passCount = 0;
  results.forEach(r => {
    const pass = r.pass ? '✓' : '✗';
    console.log(`${r.card}    | ${r.hasSvg ? '✓' : '✗'} | ${r.hasViewBox ? '✓' : '✗'} | ${r.hasContent ? '✓' : '✗'} | ${pass}`);
    if (r.pass) passCount++;
  });
  
  console.log(`\n${passCount}/9 cards pass proper verification`);
  console.log(passCount === 9 ? '\n✓ READY TO SHIP' : '\n✗ BLOCKED');
  
  await browser.close();
}

properVerification().catch(console.error);
