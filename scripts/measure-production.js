import { chromium } from 'playwright';

async function measureProduction() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.clearCookies();
  
  const page = await context.newPage();
  const requests = [];
  
  page.on('response', response => {
    const size = parseInt(response.headers()['content-length']) || 0;
    requests.push({
      url: response.url(),
      type: response.request().resourceType(),
      size,
      status: response.status()
    });
  });
  
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle', timeout: 30000 });
  await browser.close();
  
  const byType = {};
  let totalBytes = 0;
  
  requests.forEach(r => {
    const type = r.type || 'other';
    if (!byType[type]) byType[type] = { count: 0, bytes: 0 };
    byType[type].count++;
    byType[type].bytes += r.size;
    totalBytes += r.size;
  });
  
  console.log('AK2 — Production Weight (preview server, cache disabled):');
  console.log('═'.repeat(100));
  console.log(`AK2.1 Total: ${(totalBytes / 1024).toFixed(0)}KB (${totalBytes.toLocaleString()} bytes) | ${requests.length} requests\n`);
  
  console.log('AK2.2 Breakdown by type:');
  Object.entries(byType)
    .sort((a, b) => b[1].bytes - a[1].bytes)
    .forEach(([type, data]) => {
      console.log(`  ${type.padEnd(12)}: ${data.count.toString().padStart(3)} req × ${(data.bytes / 1024).toFixed(0).padStart(5)}KB`);
    });
  
  const sorted = requests
    .filter(r => r.size > 0)
    .sort((a, b) => b.size - a.size)
    .slice(0, 5);
  
  console.log('\nAK2.3 Largest five assets:');
  sorted.forEach(r => {
    const name = r.url.split('/').pop() || r.url.split('/')[2];
    console.log(`  ${(r.size / 1024).toFixed(0).padStart(5)}KB  ${name.substring(0, 60)}`);
  });
  
  console.log('\nAK2.4 Dev dependencies check:');
  const devDeps = ['aria-query', 'axobject-query', 'audit-'];
  const found = devDeps.filter(dep => requests.some(r => r.url.includes(dep)));
  if (found.length === 0) {
    console.log('  ✅ No dev dependencies found');
  } else {
    console.log(`  ❌ Found: ${found.join(', ')}`);
  }
}

measureProduction().catch(console.error);
