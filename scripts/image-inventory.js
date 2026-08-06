import { chromium } from 'playwright';

async function imageInventory() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  const requests = [];
  
  page.on('response', response => {
    if (response.request().resourceType() === 'image') {
      const size = parseInt(response.headers()['content-length']) || 0;
      requests.push({
        url: response.url(),
        size
      });
    }
  });
  
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Get rendered image dimensions
  const imageDims = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src.split('/').pop(),
      rendered: { width: img.clientWidth, height: img.clientHeight },
      natural: { width: img.naturalWidth, height: img.naturalHeight }
    }));
  });
  
  // Combine request data with rendered dimensions
  const images = requests.map(r => {
    const filename = r.url.split('/').pop();
    const dims = imageDims.find(d => d.src === filename) || {};
    return {
      filename,
      transferredKB: (r.size / 1024).toFixed(0),
      rendered1440: dims.rendered ? `${dims.rendered.width}×${dims.rendered.height}` : 'N/A',
      natural: dims.natural ? `${dims.natural.width}×${dims.natural.height}` : 'N/A'
    };
  });
  
  await browser.close();
  
  console.log('AL3 — Image Inventory:');
  console.log('═'.repeat(120));
  console.log('AL3.1 Every image request:\n');
  console.log(`${'Filename'.padEnd(35)} ${'Transferred'.padEnd(12)} ${'Rendered (1440px)'.padEnd(20)} ${'Natural'.padEnd(15)}`);
  console.log('-'.repeat(120));
  images.forEach(img => {
    console.log(`${img.filename.padEnd(35)} ${img.transferredKB.padStart(8)}KB    ${img.rendered1440.padEnd(20)} ${img.natural}`);
  });
  
  const formats = {};
  images.forEach(img => {
    const ext = img.filename.split('.').pop().toUpperCase();
    if (!formats[ext]) formats[ext] = 0;
    formats[ext]++;
  });
  
  console.log(`\nAL3.2 Format breakdown: ${Object.entries(formats).map(([fmt, count]) => `${fmt} (${count})`).join(', ')}`);
  
  // Check for oversizing
  const oversized = images.filter(img => {
    if (img.rendered1440 === 'N/A' || img.natural === 'N/A') return false;
    const [rw, rh] = img.rendered1440.split('×').map(Number);
    const [nw, nh] = img.natural.split('×').map(Number);
    return nw > rw * 2 || nh > rh * 2;
  });
  
  console.log(`\nAL3.3 Potential over-sizing:`);
  if (oversized.length === 0) {
    console.log('  ✅ No images served at 2x+ rendered size');
  } else {
    oversized.forEach(img => {
      console.log(`  ⚠️  ${img.filename}: ${img.natural} rendered as ${img.rendered1440}`);
    });
  }
}

imageInventory().catch(console.error);
