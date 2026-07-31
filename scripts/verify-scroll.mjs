import { chromium } from 'playwright';

async function testHomepageScroll() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  
  console.log('\nHOMEPAGE SCROLL TEST');
  console.log('====================\n');
  
  // Get all sections
  const sections = await page.evaluate(() => {
    const sects = document.querySelectorAll('.base-main > section');
    return Array.from(sects).map((s, i) => {
      const bg = window.getComputedStyle(s).backgroundColor;
      return {
        index: i,
        bg,
        isDark: bg.includes('rgb') ? (() => {
          const match = bg.match(/\d+/g);
          if (!match) return false;
          const [r, g, b] = match.slice(0, 3).map(Number);
          return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
        })() : false
      };
    });
  });
  
  console.log('Sections found:');
  sections.forEach(s => {
    console.log(`  Section ${s.index}: ${s.bg} (dark: ${s.isDark})`);
  });
  
  // Test scroll positions
  const scrollPositions = [0, 500, 1000, 1500, 2000, 2500, 3000];
  
  console.log('\nScroll position tests:');
  for (const pos of scrollPositions) {
    await page.evaluate(p => window.scrollTo(0, p), pos);
    await page.waitForTimeout(100);
    
    const state = await page.evaluate(() => {
      const container = document.querySelector('.header-container');
      const isInverted = container?.classList.contains('is-inverted');
      const main = document.querySelector('.base-main');
      if (!main) return { isInverted, visibleSection: null };
      
      const sects = main.querySelectorAll('section');
      for (const s of sects) {
        const rect = s.getBoundingClientRect();
        if (rect.top < 100 && rect.bottom > 100) {
          const bg = window.getComputedStyle(s).backgroundColor;
          return { isInverted, visibleBg: bg };
        }
      }
      return { isInverted, visibleSection: null };
    });
    
    console.log(`  Scroll ${pos}px: ${state.isInverted ? 'INVERTED' : 'DEFAULT'} (${state.visibleBg})`);
  }
  
  await browser.close();
}

testHomepageScroll().catch(console.error);
