import { chromium } from 'playwright';

async function auditHeroLab() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/hero-lab', { waitUntil: 'networkidle' });
  
  const sections = await page.evaluate(() => {
    const secs = Array.from(document.querySelectorAll('section')).map((s, i) => ({
      index: i,
      className: s.className,
      offsetTop: s.offsetTop,
      offsetHeight: s.offsetHeight,
      dataSurface: s.getAttribute('data-surface'),
      backgroundColor: window.getComputedStyle(s).backgroundColor
    }));
    
    return {
      sections: secs,
      labBannerHeight: document.querySelector('.lab-banner')?.offsetHeight || 0,
      headerHeight: document.querySelector('.header-container')?.offsetHeight || 0
    };
  });
  
  await browser.close();
  
  console.log('AK3.1 — /hero-lab Section Audit:');
  console.log('═'.repeat(100));
  console.log(`Lab banner height: ${sections.labBannerHeight}px`);
  console.log(`Header height: ${sections.headerHeight}px\n`);
  
  sections.sections.forEach(s => {
    const hasDataSurface = s.dataSurface ? '✅' : '❌';
    console.log(`Section ${s.index}: offsetTop=${s.offsetTop} height=${s.offsetHeight} surface=${s.dataSurface || 'NONE'} ${hasDataSurface}`);
    console.log(`  class="${s.className}" bg=${s.backgroundColor.substring(0, 25)}`);
  });
  
  const missingInk = sections.sections.filter(s => 
    !s.dataSurface && s.backgroundColor.includes('45, 43, 41') // dark ink color
  );
  
  if (missingInk.length > 0) {
    console.log(`\n⚠️  ${missingInk.length} dark sections missing data-surface="ink"`);
  }
}

auditHeroLab().catch(console.error);
