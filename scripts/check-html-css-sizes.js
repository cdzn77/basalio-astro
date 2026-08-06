import { chromium } from 'playwright';

async function checkSizes() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.clearCookies();
  
  const page = await context.newPage();
  const requests = [];
  
  page.on('response', response => {
    const type = response.request().resourceType();
    if (type === 'document' || type === 'stylesheet') {
      const size = parseInt(response.headers()['content-length']) || 0;
      requests.push({ url: response.url(), type, size });
    }
  });
  
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle', timeout: 30000 });
  
  const inlineStyles = await page.evaluate(() => {
    const styles = document.querySelectorAll('style');
    return Array.from(styles).reduce((sum, s) => sum + s.textContent.length, 0);
  });
  
  await browser.close();
  
  const doc = requests.find(r => r.type === 'document');
  const sheets = requests.filter(r => r.type === 'stylesheet');
  const sheetSum = sheets.reduce((sum, s) => sum + s.size, 0);
  
  console.log('AM3 — HTML and CSS Actual Sizes:\n');
  console.log(`Document (HTML): ${doc?.size || 0} bytes (${((doc?.size || 0)/1024).toFixed(1)}KB)`);
  console.log(`External stylesheets: ${sheets.length} files, ${sheetSum} bytes transferred`);
  console.log(`Inline <style> content: ${inlineStyles} bytes (${(inlineStyles/1024).toFixed(1)}KB)`);
  console.log(`\nTotal CSS: ${sheetSum + inlineStyles} bytes (${((sheetSum + inlineStyles)/1024).toFixed(1)}KB)`);
  console.log(`\nRevised page weight calculation:`);
  console.log(`  Video: 524KB`);
  console.log(`  Images (PNG): 431KB`);
  console.log(`  Fonts: 71KB`);
  console.log(`  HTML: ${((doc?.size || 0)/1024).toFixed(1)}KB`);
  console.log(`  CSS: ${((sheetSum + inlineStyles)/1024).toFixed(1)}KB`);
  console.log(`  Total: ${((doc?.size || 0 + sheetSum + inlineStyles + 524*1024 + 431*1024 + 71*1024)/1024/1024).toFixed(2)}MB`);
}

checkSizes().catch(console.error);
