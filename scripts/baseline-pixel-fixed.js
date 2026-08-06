import { chromium } from 'playwright';
import crypto from 'crypto';

async function captureBaseline() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce'
  });
  
  const results = [];
  
  for (let i = 0; i < 5; i++) {
    const page = await context.newPage();
    
    await page.goto('http://localhost:4322/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for observer to settle: header data-surface should be stable
    await page.waitForFunction(() => {
      const header = document.querySelector('.header-container');
      return header && header.getAttribute('data-surface') === 'ink';
    }, { timeout: 5000 });
    
    // Extra wait for render to fully settle
    await page.waitForTimeout(300);
    
    const screenshot = await page.screenshot({ fullPage: false, type: 'png' });
    const hash = crypto.createHash('md5').update(screenshot).digest('hex').substring(0, 8);
    
    results.push({
      capture: i + 1,
      hash,
      size: screenshot.length,
      sizeKB: (screenshot.length / 1024).toFixed(1)
    });
    
    await page.close();
  }
  
  await context.close();
  await browser.close();
  
  console.log('AK1.3 — Pixel Baseline (observer settled):');
  console.log('═'.repeat(100));
  results.forEach(r => console.log(`Capture ${r.capture}: hash=${r.hash} size=${r.size} bytes (${r.sizeKB}KB)`));
  
  const hashes = results.map(r => r.hash);
  const sizes = results.map(r => r.size);
  const uniqueHashes = new Set(hashes);
  const uniqueSizes = new Set(sizes);
  
  console.log('\n' + '═'.repeat(100));
  console.log(`Unique hashes: ${uniqueHashes.size}/5`);
  console.log(`Unique sizes: ${uniqueSizes.size}/5`);
  console.log(`Size variance: ${Math.max(...sizes) - Math.min(...sizes)} bytes`);
  
  if (uniqueHashes.size === 1 && uniqueSizes.size === 1) {
    console.log('\n✅ AK1.4: ALL 5/5 IDENTICAL — baseline accepted');
  } else {
    console.log('\n❌ FAILED: Baseline still non-deterministic');
    hashes.forEach((h, idx) => console.log(`   [${idx + 1}] ${h}`));
  }
}

captureBaseline().catch(console.error);
