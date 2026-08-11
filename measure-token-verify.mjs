import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // PRICING PAGE: .card-name (should be 20px with -0.4px)
  await page.goto('http://localhost:4323/pricing');
  const cardName = await page.evaluate(() => {
    const el = document.querySelector('.card-name');
    if (!el) return null;
    const s = window.getComputedStyle(el);
    return {
      fontSize: s.fontSize,
      letterSpacing: s.letterSpacing,
      text: el.textContent.substring(0, 50)
    };
  });
  console.log('=== PRICING .card-name (expect: 20px, -0.4px) ===');
  console.log(JSON.stringify(cardName, null, 2));
  
  // Find 28px and 32px headings
  await page.goto('http://localhost:4323/');
  const sizeSamples = await page.evaluate(() => {
    const results = {};
    
    // Check all headings and styled elements for specific sizes
    document.querySelectorAll('*').forEach(el => {
      const s = window.getComputedStyle(el);
      const fs = s.fontSize;
      const ls = s.letterSpacing;
      
      // Only check if it has non-normal letter-spacing (applied the token)
      if (ls && ls !== 'normal' && ls !== '0px') {
        if (fs === '28px' && !results['28px']) {
          results['28px'] = { letterSpacing: ls, className: el.className, text: el.textContent.substring(0, 30) };
        }
        if (fs === '32px' && !results['32px']) {
          results['32px'] = { letterSpacing: ls, className: el.className, text: el.textContent.substring(0, 30) };
        }
      }
    });
    
    return results;
  });
  
  console.log('\n=== 28px HEADING (expect: -0.56px) ===');
  console.log(JSON.stringify(sizeSamples['28px'] || 'NOT_FOUND', null, 2));
  
  console.log('\n=== 32px HEADING (expect: -0.64px) ===');
  console.log(JSON.stringify(sizeSamples['32px'] || 'NOT_FOUND', null, 2));
  
} catch (e) {
  console.error('Error:', e.message);
}

await browser.close();
