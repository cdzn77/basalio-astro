import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  
  // Measure all three states with fresh build
  const result = await page.evaluate(() => {
    const hc = document.querySelector('.header-container');
    const bl = document.querySelector('.brand-logo');
    const mb = document.querySelector('.menu-btn');
    
    const test = {};
    for (const state of ['acid', 'paper', 'ink']) {
      hc.setAttribute('data-surface', state);
      void hc.offsetHeight;
      test[state] = {
        logoColor: window.getComputedStyle(bl).color,
        menuBtnBg: window.getComputedStyle(mb).backgroundColor
      };
    }
    hc.setAttribute('data-surface', 'ink');
    return test;
  });
  
  await browser.close();
  
  console.log('AI2.1 — Fresh build paint rule test:');
  console.log('════════════════════════════════════');
  console.log(`Acid:  logo=${result.acid.logoColor.substring(0,20)} btn=${result.acid.menuBtnBg.substring(0,20)}`);
  console.log(`Paper: logo=${result.paper.logoColor.substring(0,20)} btn=${result.paper.menuBtnBg.substring(0,20)}`);
  console.log(`Ink:   logo=${result.ink.logoColor.substring(0,20)} btn=${result.ink.menuBtnBg.substring(0,20)}`);
  
  const paperLogoBlack = result.paper.logoColor === 'rgb(0, 0, 0)';
  const paperLogoNotBlack = !paperLogoBlack && result.paper.logoColor.includes('246');
  
  if (paperLogoBlack) {
    console.log('\n✅ FIXED: Paper logo is now black (rule applies)');
  } else if (paperLogoNotBlack) {
    console.log('\n❌ STILL BROKEN: Paper logo is cream (rule not applying)');
    console.log('  → CSS selector matching issue persists');
  }
}

test().catch(console.error);
