import { chromium } from 'playwright';

async function testDropdown(browser, route, label) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  
  // Click menu button to open dropdown
  await page.click('#menu-toggle');
  await page.waitForTimeout(300);
  
  const dropdownInfo = await page.evaluate(() => {
    const container = document.querySelector('.header-container');
    const isInverted = container?.classList.contains('is-inverted');
    const dropdown = document.querySelector('.menu-dropdown');
    const items = dropdown?.querySelectorAll('.menu-item') || [];
    
    if (!dropdown) return { error: 'dropdown not found' };
    
    const dropdownBg = window.getComputedStyle(dropdown).backgroundColor;
    const firstItemColor = items.length > 0 ? window.getComputedStyle(items[0]).color : 'N/A';
    
    return {
      isInverted,
      dropdownBg,
      firstItemColor,
      itemCount: items.length
    };
  });
  
  console.log(`\n${label}: ${route}`);
  console.log(`  Header state: ${dropdownInfo.isInverted ? 'INVERTED' : 'DEFAULT'}`);
  console.log(`  Dropdown bg: ${dropdownInfo.dropdownBg}`);
  console.log(`  Menu item text: ${dropdownInfo.firstItemColor}`);
  
  // Calculate contrast
  const bgMatch = dropdownInfo.dropdownBg.match(/\d+/g);
  const textMatch = dropdownInfo.firstItemColor.match(/\d+/g);
  if (bgMatch && textMatch) {
    const [br, bg, bb] = bgMatch.slice(0, 3).map(Number);
    const [tr, tg, tb] = textMatch.slice(0, 3).map(Number);
    const bgLum = (0.299 * br + 0.587 * bg + 0.114 * bb) / 255;
    const textLum = (0.299 * tr + 0.587 * tg + 0.114 * tb) / 255;
    const contrast = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
    console.log(`  Contrast: ${contrast.toFixed(1)}:1 ${contrast >= 4.5 ? '✓' : '✗'}`);
  }
  
  await page.close();
}

const browser = await chromium.launch();

console.log('\nDROPDOWN CONTRAST TESTS');
console.log('=======================');

await testDropdown(browser, '/', 'Homepage (DEFAULT)');
await testDropdown(browser, '/roadmap', 'Roadmap (INVERTED)');

await browser.close();
