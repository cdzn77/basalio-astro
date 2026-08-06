import { chromium } from 'playwright';
import crypto from 'crypto';

async function diagnoseVariance() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce'
  });
  
  const results = [];
  
  for (let i = 0; i < 5; i++) {
    const page = await context.newPage();
    
    // Disable observer to isolate the variance
    await page.addInitScript(() => {
      // Block the observer from running
      window.IntersectionObserver = class FakeObserver {
        constructor() {}
        observe() {}
        disconnect() {}
      };
    });
    
    await page.goto('http://localhost:4322/', { waitUntil: 'load', timeout: 30000 });
    
    // Wait for stable render
    await page.waitForTimeout(500);
    
    const screenshot = await page.screenshot({ fullPage: false, type: 'png' });
    const hash = crypto.createHash('md5').update(screenshot).digest('hex').substring(0, 8);
    
    results.push({
      capture: i + 1,
      hash,
      sizeKB: (screenshot.length / 1024).toFixed(1),
      size: screenshot.length
    });
    
    await page.close();
  }
  
  await context.close();
  await browser.close();
  
  console.log('AK1.2 — Variance diagnosis (observer disabled):');
  console.log('═'.repeat(80));
  results.forEach(r => console.log(`Capture ${r.capture}: hash=${r.hash} size=${r.sizeKB}KB (${r.size} bytes)`));
  
  const hashes = results.map(r => r.hash);
  const sizes = results.map(r => r.size);
  const uniqueHashes = new Set(hashes);
  const uniqueSizes = new Set(sizes);
  
  console.log(`\nUnique hashes: ${uniqueHashes.size}/5`);
  console.log(`Unique sizes: ${uniqueSizes.size}/5`);
  console.log(`Size variance: ${Math.max(...sizes) - Math.min(...sizes)} bytes`);
  
  if (uniqueHashes.size === 1 && uniqueSizes.size === 1) {
    console.log('\n✅ With observer disabled: fully deterministic');
    console.log('   → Observer is the source of variance');
  } else {
    console.log('\n⚠️  Variance persists without observer');
    console.log('   → Source is video/CSS/other');
  }
}

diagnoseVariance().catch(console.error);
