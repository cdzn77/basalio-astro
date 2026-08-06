import { chromium } from 'playwright';

async function measureWeight() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const requests = [];
  
  page.on('response', response => {
    requests.push({
      url: response.url(),
      status: response.status(),
      size: response.headers()['content-length'] || 0,
      type: response.request().resourceType()
    });
  });
  
  // Disable cache
  await context.clearCookies();
  await page.context().clearCookies();
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  
  await browser.close();
  
  // Analyze
  const byType = {};
  let totalBytes = 0;
  
  requests.forEach(r => {
    const size = parseInt(r.size) || 0;
    const type = r.type || 'other';
    if (!byType[type]) byType[type] = { count: 0, bytes: 0 };
    byType[type].count++;
    byType[type].bytes += size;
    totalBytes += size;
  });
  
  console.log('KK4.5 — Page Weight (/ with cache disabled):');
  console.log('═'.repeat(80));
  console.log(`Total: ${(totalBytes / 1024 / 1024).toFixed(2)}MB (${totalBytes.toLocaleString()} bytes)`);
  console.log(`Requests: ${requests.length}\n`);
  
  console.log('By type:');
  Object.entries(byType)
    .sort((a, b) => b[1].bytes - a[1].bytes)
    .forEach(([type, data]) => {
      console.log(`  ${type.padEnd(12)}: ${data.count.toString().padStart(3)} req × ${(data.bytes / 1024).toFixed(0).padStart(5)}KB = ${(data.bytes / 1024 / 1024).toFixed(2)}MB`);
    });
  
  // Find largest assets
  const sorted = requests
    .sort((a, b) => (parseInt(b.size) || 0) - (parseInt(a.size) || 0))
    .slice(0, 5);
  
  console.log('\nTop 5 largest assets:');
  sorted.forEach(r => {
    const size = parseInt(r.size) || 0;
    const url = r.url.split('/').pop() || r.url;
    console.log(`  ${(size / 1024).toFixed(0).padStart(5)}KB ${url.substring(0, 50)}`);
  });
}

measureWeight().catch(console.error);
