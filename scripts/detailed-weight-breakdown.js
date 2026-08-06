import { chromium } from 'playwright';

async function detailedWeight() {
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
      size
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
  
  console.log('AL2 — Detailed weight breakdown (all types):');
  console.log('═'.repeat(100));
  console.log(`AK2.1 Total transferred: ${(totalBytes / 1024).toFixed(0)}KB | ${totalBytes.toLocaleString()} bytes`);
  console.log(`       ${requests.length} requests\n`);
  
  console.log('AL2.2 Breakdown by type (including zero-size):');
  Object.entries(byType)
    .sort((a, b) => b[1].bytes - a[1].bytes)
    .forEach(([type, data]) => {
      const pct = ((data.bytes / totalBytes) * 100).toFixed(1);
      console.log(`  ${type.padEnd(12)}: ${data.count.toString().padStart(3)} req × ${(data.bytes / 1024).toFixed(0).padStart(5)}KB (${pct}%)`);
    });
  
  console.log(`\nAL2.3 Total includes all above: ${(totalBytes / 1024).toFixed(0)}KB`);
}

detailedWeight().catch(console.error);
