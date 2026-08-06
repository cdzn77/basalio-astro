import { chromium } from 'playwright';

async function testScrollSurface(route = '/') {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(`http://localhost:4322${route}`, { waitUntil: 'networkidle' });
  
  const measurements = [];
  const scrollPositions = [0, 400, 900, 1400, 2000];
  
  for (const scrollY of scrollPositions) {
    await page.evaluate((sy) => window.scrollTo(0, sy), scrollY);
    await page.waitForTimeout(150);
    
    const state = await page.evaluate(() => ({
      scrollY: window.scrollY,
      surface: document.querySelector('.header-container').getAttribute('data-surface'),
      logoColor: window.getComputedStyle(document.querySelector('.brand-logo')).color,
      menuBtnBg: window.getComputedStyle(document.querySelector('.menu-btn')).backgroundColor
    }));
    
    measurements.push(state);
  }
  
  await browser.close();
  return measurements;
}

async function main() {
  console.log('AJ2 — Scroll-based surface verification:');
  console.log('═'.repeat(100));
  
  const routes = ['/', '/hero-lab', '/pricing'];
  
  for (const route of routes) {
    console.log(`\n${route.padEnd(15)}`);
    console.log('-'.repeat(100));
    
    const measurements = await testScrollSurface(route);
    
    for (const m of measurements) {
      const logoShort = m.logoColor.substring(0, 16);
      const btnShort = m.menuBtnBg.substring(0, 16);
      console.log(`scrollY ${m.scrollY.toString().padStart(4)}px: surface=${m.surface.padEnd(6)} logo=${logoShort.padEnd(16)} btn=${btnShort.padEnd(16)}`);
    }
  }
  
  console.log('\n' + '═'.repeat(100));
  console.log('Expected:');
  console.log('  /: ink + cream logo above 837px, paper + black below');
  console.log('  /hero-lab: ink + cream above boundary, paper + black below');
  console.log('  /pricing: always paper + black');
}

main().catch(console.error);
