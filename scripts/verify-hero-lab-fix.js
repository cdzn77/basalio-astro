import { chromium } from 'playwright';
import fs from 'fs';

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4322/hero-lab', { waitUntil: 'networkidle' });
  
  const scrollPositions = [0, 400, 800, 1400];
  const measurements = [];
  
  for (const scrollY of scrollPositions) {
    await page.evaluate((sy) => window.scrollTo(0, sy), scrollY);
    await page.waitForTimeout(150);
    
    const state = await page.evaluate(() => ({
      scrollY: window.scrollY,
      surface: document.querySelector('.header-container').getAttribute('data-surface'),
      logoColor: window.getComputedStyle(document.querySelector('.brand-logo')).color
    }));
    
    measurements.push(state);
  }
  
  // Screenshot at 0
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  const screenshot = await page.screenshot({ fullPage: false });
  fs.writeFileSync('/tmp/hero-lab-fixed-scroll0.png', screenshot);
  
  await browser.close();
  
  console.log('AL1.3 — /hero-lab verification (after fix):');
  console.log('═'.repeat(100));
  measurements.forEach(m => {
    const legible = m.surface === 'ink' && m.logoColor.includes('246') ? '✅ legible' : '⚠️';
    console.log(`scrollY ${m.scrollY.toString().padStart(4)}px: surface=${m.surface.padEnd(6)} logo=${m.logoColor.substring(0,16).padEnd(16)} ${legible}`);
  });
  
  const allInk = measurements.every(m => m.surface === 'ink');
  console.log(`\n${allInk ? '✅ FIXED' : '⚠️  NOT FIXED'}: All dark sections now show correct surface`);
}

verify().catch(console.error);
