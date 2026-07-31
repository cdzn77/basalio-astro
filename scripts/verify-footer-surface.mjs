import { chromium } from 'playwright';

async function testFooterSurface(browser, route, label) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  
  // Scroll to footer
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(h => window.scrollTo(0, h - 200), pageHeight);
  await page.waitForTimeout(300);
  
  const footerInfo = await page.evaluate(() => {
    const container = document.querySelector('.header-container');
    const isInverted = container?.classList.contains('is-inverted');
    const footer = document.querySelector('.base-footer');
    const footerBg = footer ? window.getComputedStyle(footer).backgroundColor : 'N/A';
    
    // Get the logo and menu pill colors
    const logo = document.querySelector('.brand-logo');
    const menuBtn = document.querySelector('.menu-btn');
    const logoBg = window.getComputedStyle(logo).color;
    const menuBtnBg = window.getComputedStyle(menuBtn).backgroundColor;
    const menuBtnText = window.getComputedStyle(menuBtn).color;
    
    return {
      isInverted,
      footerBg,
      logoBg,
      menuBtnBg,
      menuBtnText
    };
  });
  
  console.log(`\n${label}: ${route}`);
  console.log(`  Header state: ${footerInfo.isInverted ? 'INVERTED' : 'DEFAULT'}`);
  console.log(`  Footer bg: ${footerInfo.footerBg}`);
  console.log(`  Logo color: ${footerInfo.logoBg}`);
  console.log(`  Menu pill: ${footerInfo.menuBtnBg} text ${footerInfo.menuBtnText}`);
  
  // Calculate contrast of logo against footer
  const footerMatch = footerInfo.footerBg.match(/\d+/g);
  const logoMatch = footerInfo.logoBg.match(/\d+/g);
  if (footerMatch && logoMatch) {
    const [fbr, fbg, fbb] = footerMatch.slice(0, 3).map(Number);
    const [lr, lg, lb] = logoMatch.slice(0, 3).map(Number);
    const footerLum = (0.299 * fbr + 0.587 * fbg + 0.114 * fbb) / 255;
    const logoLum = (0.299 * lr + 0.587 * lg + 0.114 * lb) / 255;
    const contrast = (Math.max(footerLum, logoLum) + 0.05) / (Math.min(footerLum, logoLum) + 0.05);
    console.log(`  Logo contrast on footer: ${contrast.toFixed(1)}:1 ${contrast >= 4.5 ? '✓' : '✗'}`);
  }
  
  await page.close();
}

const browser = await chromium.launch();

console.log('\nFOOTER SURFACE CONTRAST TESTS');
console.log('==============================');

await testFooterSurface(browser, '/', 'Homepage');
await testFooterSurface(browser, '/roadmap', 'Roadmap');

await browser.close();
