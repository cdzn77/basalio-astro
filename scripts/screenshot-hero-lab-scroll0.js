import { chromium } from 'playwright';
import fs from 'fs';

async function screenshot() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/hero-lab', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  
  const img = await page.screenshot({ fullPage: false });
  const path = '/tmp/hero-lab-scroll0.png';
  fs.writeFileSync(path, img);
  
  const headerState = await page.evaluate(() => ({
    surface: document.querySelector('.header-container').getAttribute('data-surface'),
    logoColor: window.getComputedStyle(document.querySelector('.brand-logo')).color,
    menuBtnBg: window.getComputedStyle(document.querySelector('.menu-btn')).backgroundColor
  }));
  
  await browser.close();
  
  console.log('AK3.4 — Screenshot at scroll 0:');
  console.log('═'.repeat(80));
  console.log(`Header surface: ${headerState.surface}`);
  console.log(`Logo color: ${headerState.logoColor}`);
  console.log(`Menu-btn background: ${headerState.menuBtnBg}`);
  console.log(`\nScreenshot saved to: ${path}`);
  
  if (headerState.surface === 'paper' && headerState.logoColor === 'rgb(0, 0, 0)') {
    console.log('⚠️  ISSUE: Header is paper (black logo) over dark section');
    console.log('   Wordmark may be hard to see');
  } else if (headerState.surface === 'ink' && headerState.logoColor.includes('246')) {
    console.log('✅ Header is ink (cream logo) — visible over dark background');
  }
}

screenshot().catch(console.error);
