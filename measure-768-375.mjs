import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  console.log('=== PRICING PAGE — .risk-title AND .ledger-title ===\n');
  
  // 768px (tablet)
  console.log('--- 768px VIEWPORT ---');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('http://localhost:4323/pricing');
  
  const measurements768 = await page.evaluate(() => {
    const risk = document.querySelector('.risk-title');
    const ledger = document.querySelector('.ledger-title');
    return {
      riskTitle: risk ? {
        textContent: risk.textContent.substring(0, 40),
        fontSize: window.getComputedStyle(risk).fontSize,
        letterSpacing: window.getComputedStyle(risk).letterSpacing
      } : null,
      ledgerTitle: ledger ? {
        textContent: ledger.textContent.substring(0, 40),
        fontSize: window.getComputedStyle(ledger).fontSize,
        letterSpacing: window.getComputedStyle(ledger).letterSpacing
      } : null
    };
  });
  
  console.log('Risk Title:');
  console.log(`  Text: "${measurements768.riskTitle?.textContent}"`);
  console.log(`  fontSize: ${measurements768.riskTitle?.fontSize}`);
  console.log(`  letterSpacing: ${measurements768.riskTitle?.letterSpacing}`);
  console.log(`  Expected: 28px / -0.56px`);
  
  console.log('\nLedger Title:');
  console.log(`  Text: "${measurements768.ledgerTitle?.textContent}"`);
  console.log(`  fontSize: ${measurements768.ledgerTitle?.fontSize}`);
  console.log(`  letterSpacing: ${measurements768.ledgerTitle?.letterSpacing}`);
  console.log(`  Expected: 28px / -0.56px`);
  
  // 375px (mobile)
  console.log('\n\n--- 375px VIEWPORT ---');
  await page.setViewportSize({ width: 375, height: 667 });
  // Navigation causes page to reload, so re-navigate
  await page.goto('http://localhost:4323/pricing');
  
  const measurements375 = await page.evaluate(() => {
    const risk = document.querySelector('.risk-title');
    const ledger = document.querySelector('.ledger-title');
    return {
      riskTitle: risk ? {
        textContent: risk.textContent.substring(0, 40),
        fontSize: window.getComputedStyle(risk).fontSize,
        letterSpacing: window.getComputedStyle(risk).letterSpacing
      } : null,
      ledgerTitle: ledger ? {
        textContent: ledger.textContent.substring(0, 40),
        fontSize: window.getComputedStyle(ledger).fontSize,
        letterSpacing: window.getComputedStyle(ledger).letterSpacing
      } : null
    };
  });
  
  console.log('Risk Title:');
  console.log(`  Text: "${measurements375.riskTitle?.textContent}"`);
  console.log(`  fontSize: ${measurements375.riskTitle?.fontSize}`);
  console.log(`  letterSpacing: ${measurements375.riskTitle?.letterSpacing}`);
  console.log(`  Expected: 28px / -0.56px`);
  
  console.log('\nLedger Title:');
  console.log(`  Text: "${measurements375.ledgerTitle?.textContent}"`);
  console.log(`  fontSize: ${measurements375.ledgerTitle?.fontSize}`);
  console.log(`  letterSpacing: ${measurements375.ledgerTitle?.letterSpacing}`);
  console.log(`  Expected: 28px / -0.56px`);
  
  // Analysis
  console.log('\n\n=== ANALYSIS ===');
  const risk768ls = measurements768.riskTitle?.letterSpacing;
  const ledger768ls = measurements768.ledgerTitle?.letterSpacing;
  const risk375ls = measurements375.riskTitle?.letterSpacing;
  const ledger375ls = measurements375.ledgerTitle?.letterSpacing;
  
  if (risk768ls === '-0.56px' && ledger768ls === '-0.56px' && risk375ls === '-0.56px' && ledger375ls === '-0.56px') {
    console.log('✓ Token APPLIED correctly at media query breakpoints');
  } else {
    console.log('✗ Token NOT applied at media query breakpoints (still showing -0.8px)');
    console.log(`  Risk 768px: ${risk768ls}, Ledger 768px: ${ledger768ls}`);
    console.log(`  Risk 375px: ${risk375ls}, Ledger 375px: ${ledger375ls}`);
  }
  
} catch (e) {
  console.error('Error:', e.message);
}

await browser.close();
