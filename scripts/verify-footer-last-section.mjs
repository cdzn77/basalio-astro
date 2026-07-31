import { chromium } from 'playwright';

async function testFooterLastSection(browser, route, label) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  
  // Scroll to footer
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(h => window.scrollTo(0, h - 100), pageHeight);
  await page.waitForTimeout(300);
  
  const footerInfo = await page.evaluate(() => {
    const container = document.querySelector('.header-container');
    const isInverted = container?.classList.contains('is-inverted');
    const baseMain = document.querySelector('.base-main');
    const lastSection = baseMain?.querySelector('section:last-of-type');
    const lastSectionBg = lastSection ? window.getComputedStyle(lastSection).backgroundColor : 'N/A';
    
    const logo = document.querySelector('.brand-logo');
    const menuBtn = document.querySelector('.menu-btn');
    const logoBg = window.getComputedStyle(logo).color;
    const menuBtnBg = window.getComputedStyle(menuBtn).backgroundColor;
    const menuBtnText = window.getComputedStyle(menuBtn).color;
    
    return {
      isInverted,
      lastSectionBg,
      logoBg,
      menuBtnBg,
      menuBtnText
    };
  });
  
  console.log(`\n${label}: ${route}`);
  console.log(`  Header state: ${footerInfo.isInverted ? 'INVERTED' : 'DEFAULT'}`);
  console.log(`  Last section bg: ${footerInfo.lastSectionBg}`);
  console.log(`  Logo color: ${footerInfo.logoBg}`);
  
  // Calculate contrast of logo against last section
  const sectionMatch = footerInfo.lastSectionBg.match(/\d+/g);
  const logoMatch = footerInfo.logoBg.match(/\d+/g);
  if (sectionMatch && logoMatch) {
    const [sbr, sbg, sbb] = sectionMatch.slice(0, 3).map(Number);
    const [lr, lg, lb] = logoMatch.slice(0, 3).map(Number);
    const sectionLum = (0.299 * sbr + 0.587 * sbg + 0.114 * sbb) / 255;
    const logoLum = (0.299 * lr + 0.587 * lg + 0.114 * lb) / 255;
    const contrast = (Math.max(sectionLum, logoLum) + 0.05) / (Math.min(sectionLum, logoLum) + 0.05);
    console.log(`  Logo contrast on last section: ${contrast.toFixed(1)}:1 ${contrast >= 4.5 ? '✓' : '✗'}`);
  }
  
  // Menu pill contrast
  const pillBgMatch = footerInfo.menuBtnBg.match(/\d+/g);
  if (sectionMatch && pillBgMatch) {
    const [sbr, sbg, sbb] = sectionMatch.slice(0, 3).map(Number);
    const [pbr, pbg, pbb] = pillBgMatch.slice(0, 3).map(Number);
    const sectionLum = (0.299 * sbr + 0.587 * sbg + 0.114 * sbb) / 255;
    const pillLum = (0.299 * pbr + 0.587 * pbg + 0.114 * pbb) / 255;
    const contrast = (Math.max(sectionLum, pillLum) + 0.05) / (Math.min(sectionLum, pillLum) + 0.05);
    console.log(`  Pill contrast on last section: ${contrast.toFixed(1)}:1 ${contrast >= 3.0 ? '✓' : '✗'}`);
  }
  
  await page.close();
}

const browser = await chromium.launch();

console.log('\nFOOTER LAST SECTION CONTRAST TESTS');
console.log('===================================');

await testFooterLastSection(browser, '/', 'Homepage');
await testFooterLastSection(browser, '/roadmap', 'Roadmap');

await browser.close();
