import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // /pricing page
  await page.goto('http://localhost:4323/pricing');
  
  // Check .risk-title elements
  console.log('=== .risk-title ELEMENTS ===');
  const riskData = await page.evaluate(() => {
    const els = document.querySelectorAll('.risk-title');
    return {
      length: els.length,
      elements: [...els].map(e => ({
        outerHTML: e.outerHTML.slice(0, 200),
        fontSize: window.getComputedStyle(e).fontSize,
        letterSpacing: window.getComputedStyle(e).letterSpacing,
        textContent: e.textContent.substring(0, 50)
      }))
    };
  });
  console.log(`Count: ${riskData.length}`);
  if (riskData.length > 0) {
    riskData.elements.forEach((el, i) => {
      console.log(`\n[${i}] ${el.outerHTML}`);
      console.log(`    fontSize: ${el.fontSize}, letterSpacing: ${el.letterSpacing}`);
      console.log(`    text: ${el.textContent}`);
    });
  }
  
  // Check .ledger-title elements
  console.log('\n\n=== .ledger-title ELEMENTS ===');
  const ledgerData = await page.evaluate(() => {
    const els = document.querySelectorAll('.ledger-title');
    return {
      length: els.length,
      elements: [...els].map(e => ({
        outerHTML: e.outerHTML.slice(0, 200),
        fontSize: window.getComputedStyle(e).fontSize,
        letterSpacing: window.getComputedStyle(e).letterSpacing,
        textContent: e.textContent.substring(0, 50)
      }))
    };
  });
  console.log(`Count: ${ledgerData.length}`);
  if (ledgerData.length > 0) {
    ledgerData.elements.forEach((el, i) => {
      console.log(`\n[${i}] ${el.outerHTML}`);
      console.log(`    fontSize: ${el.fontSize}, letterSpacing: ${el.letterSpacing}`);
      console.log(`    text: ${el.textContent}`);
    });
  }
  
} catch (e) {
  console.error('Error:', e.message);
}

await browser.close();
