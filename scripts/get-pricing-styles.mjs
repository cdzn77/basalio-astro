import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// 1440px
const page1440 = await browser.newPage();
await page1440.setViewportSize({ width: 1440, height: 900 });
await page1440.goto('http://localhost:4321/pricing', { waitUntil: 'networkidle' });

const styles1440 = await page1440.evaluate(() => {
  const ledgerDesc = document.querySelector('.ledger-description');
  const riskPara = document.querySelector('.risk-content p');
  const result = {};
  
  if (ledgerDesc) {
    const s = window.getComputedStyle(ledgerDesc);
    result.ledger1440 = {
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      color: s.color,
      marginBlock: s.marginBlockStart + ' ' + s.marginBlockEnd
    };
  }
  
  if (riskPara) {
    const s = window.getComputedStyle(riskPara);
    result.risk1440 = {
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      color: s.color,
      marginBlock: s.marginBlockStart + ' ' + s.marginBlockEnd
    };
  }
  
  return result;
});

console.log('1440px:');
console.log('ledger-description:', JSON.stringify(styles1440.ledger1440, null, 2));
console.log('risk-content p:', JSON.stringify(styles1440.risk1440, null, 2));

await page1440.close();

// 375px
const page375 = await browser.newPage();
await page375.setViewportSize({ width: 375, height: 900 });
await page375.goto('http://localhost:4321/pricing', { waitUntil: 'networkidle' });

const styles375 = await page375.evaluate(() => {
  const ledgerDesc = document.querySelector('.ledger-description');
  const riskPara = document.querySelector('.risk-content p');
  const result = {};
  
  if (ledgerDesc) {
    const s = window.getComputedStyle(ledgerDesc);
    result.ledger375 = {
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      color: s.color,
      marginBlock: s.marginBlockStart + ' ' + s.marginBlockEnd
    };
  }
  
  if (riskPara) {
    const s = window.getComputedStyle(riskPara);
    result.risk375 = {
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      color: s.color,
      marginBlock: s.marginBlockStart + ' ' + s.marginBlockEnd
    };
  }
  
  return result;
});

console.log('375px:');
console.log('ledger-description:', JSON.stringify(styles375.ledger375, null, 2));
console.log('risk-content p:', JSON.stringify(styles375.risk375, null, 2));

await page375.close();
await browser.close();
