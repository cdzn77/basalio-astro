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
    await page.goto('http://localhost:4322/', { waitUntil: 'load', timeout: 30000 });
    
    const screenshot = await page.screenshot({ fullPage: false, type: 'png' });
    const hash = crypto.createHash('md5').update(screenshot).digest('hex').substring(0, 8);
    
    results.push({
      capture: i + 1,
      hash,
      sizeKB: (screenshot.length / 1024).toFixed(1)
    });
    
    await page.close();
  }
  
  await context.close();
  await browser.close();
  
  console.log('KK4.4 — Pixel Baseline (1440×900, fullPage=false, reducedMotion=reduce):');
  console.log('═'.repeat(80));
  results.forEach(r => console.log(`Capture ${r.capture}: hash=${r.hash} size=${r.sizeKB}KB`));
  
  const unique = new Set(results.map(r => r.hash));
  console.log(`\nUnique hashes: ${unique.size}/5 → ${unique.size === 1 ? '✅ Deterministic' : '⚠️  Non-deterministic'}`);
}

captureBaseline().catch(console.error);
