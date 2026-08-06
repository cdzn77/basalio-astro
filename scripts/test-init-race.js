import { chromium } from 'playwright';

async function testInitRace() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Start navigation
  const navigationPromise = page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
  
  // Capture state immediately after navigation starts (before it completes)
  await page.waitForTimeout(10);
  const immed = await page.evaluate(() => {
    const h = document.querySelector('.header-container');
    return { surface: h?.getAttribute('data-surface'), timestamp: performance.now() };
  }).catch(() => ({ surface: 'ERROR-no-header', timestamp: 0 }));
  
  // Wait for navigation to complete
  await navigationPromise;
  
  // Collect readings at key moments
  const readings = [];
  readings.push({ label: 'immediate-after-nav', ...immed });
  
  for (const delay of [50, 100, 200, 500, 1000]) {
    await page.waitForTimeout(delay - (readings[readings.length - 1].timestamp || 0));
    const state = await page.evaluate(() => ({
      surface: document.querySelector('.header-container').getAttribute('data-surface'),
      scrollY: window.scrollY,
      timestamp: performance.now()
    }));
    readings.push({ label: `+${delay}ms`, ...state });
  }
  
  // Final state
  const final = await page.evaluate(() => ({
    surface: document.querySelector('.header-container').getAttribute('data-surface'),
    logoColor: window.getComputedStyle(document.querySelector('.brand-logo')).color,
    menuBtnBg: window.getComputedStyle(document.querySelector('.menu-btn')).backgroundColor,
    scrollY: window.scrollY
  }));
  
  await browser.close();
  
  console.log('AI1.1 — Initialization race condition test:');
  console.log('═'.repeat(80));
  readings.forEach(r => {
    console.log(`${r.label.padEnd(20)} surface=${r.surface} scrollY=${r.scrollY || 0}`);
  });
  console.log('═'.repeat(80));
  console.log('Final state:');
  console.log(`  surface: ${final.surface}`);
  console.log(`  logo: ${final.logoColor}`);
  console.log(`  btn: ${final.menuBtnBg}`);
  
  if (readings.some(r => r.surface === 'paper') && readings.some(r => r.surface === 'ink')) {
    console.log('\n⚠️ RACE CONDITION DETECTED: surface changes from paper to ink during load');
    const paperIdx = readings.findIndex(r => r.surface === 'paper');
    const inkIdx = readings.findIndex(r => r.surface === 'ink');
    console.log(`  paper at: ${readings[paperIdx].label}`);
    console.log(`  ink at: ${readings[inkIdx].label}`);
  } else if (readings.every(r => r.surface === 'ink')) {
    console.log('\n✅ NO RACE: Consistently ink from initialization');
  }
}

testInitRace().catch(console.error);
