import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

// Click menu to open dropdown
await page.locator('.menu-btn').click();
await page.waitForTimeout(400);

// Inspect the actual dropdown structure
const dropdownStructure = await page.evaluate(() => {
  // Find the menu button and the open dropdown
  const menuBtn = document.querySelector('.menu-btn');
  const allElements = document.querySelectorAll('[class*="menu"], [class*="dropdown"], [class*="panel"]');
  
  const results = {
    menuBtn: menuBtn ? {
      bg: window.getComputedStyle(menuBtn).backgroundColor,
      display: window.getComputedStyle(menuBtn).display,
      parent: menuBtn.parentElement.tagName + (menuBtn.parentElement.className ? '.' + menuBtn.parentElement.className : '')
    } : null,
    allMenuElements: []
  };
  
  allElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    results.allMenuElements.push({
      element: el.tagName + '.' + (el.className || 'no-class'),
      bg: style.backgroundColor,
      display: style.display,
      position: style.position,
      visible: rect.width > 0 && rect.height > 0,
      zIndex: style.zIndex,
      top: Math.round(rect.top),
      height: Math.round(rect.height)
    });
  });
  
  return results;
});

console.log(`\nDROPDOWN STRUCTURE ANALYSIS`);
console.log(`===========================\n`);
console.log('Menu button:');
console.log(`  Background: ${dropdownStructure.menuBtn?.bg}`);
console.log(`  Parent: ${dropdownStructure.menuBtn?.parent}\n`);

console.log('Elements with menu/dropdown/panel classes:');
dropdownStructure.allMenuElements.forEach(el => {
  console.log(`${el.element}:`);
  console.log(`  Background: ${el.bg}`);
  console.log(`  Display: ${el.display}, Position: ${el.position}`);
  console.log(`  Visible: ${el.visible}, Top: ${el.top}px, Height: ${el.height}px`);
  console.log(`  Z-Index: ${el.zIndex}`);
  console.log();
});

await browser.close();
