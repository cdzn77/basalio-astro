import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });

console.log('=== DS10b: PAGE CONTAINER MAX-WIDTH ACROSS ROUTES ===\n');

const routes = ['/', '/blocks', '/hacks', '/contact'];

for (const route of routes) {
  console.log(`\nRoute: ${route}`);
  console.log('─'.repeat(50));
  
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  
  const containerData = await page.evaluate(() => {
    // Find the main wrapper/container element that has max-width
    let wrappers = [
      document.querySelector('.pricing-inner'),
      document.querySelector('[class*="inner"]'),
      document.querySelector('section:first-of-type > div'),
      document.querySelector('main > section > div')
    ].filter(Boolean);
    
    const results = [];
    
    // Check all potential containers
    let current = document.querySelector('main');
    let level = 0;
    while (current && level < 8) {
      const cs = window.getComputedStyle(current);
      if (cs.maxWidth && cs.maxWidth !== 'none') {
        results.push({
          level,
          selector: current.className || current.tagName.toLowerCase(),
          maxWidth: cs.maxWidth,
          width: cs.width
        });
      }
      current = current.firstElementChild;
      level++;
    }
    
    return results;
  });
  
  if (containerData.length === 0) {
    console.log('No max-width constraints found');
  } else {
    containerData.forEach(item => {
      console.log(`  .${item.selector} (level ${item.level}): maxWidth=${item.maxWidth}, width=${item.width}`);
    });
  }
}

console.log('\n\n=== DS10c: ANALYSIS ===');
console.log('Checking if 1786px appears on pages other than /pricing...');

// Quick scan for 1786 in CSS
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });
const styles1786 = await page.evaluate(() => {
  const allElements = document.querySelectorAll('[class*="inner"], [class*="wrapper"], [class*="container"]');
  const found = [];
  
  for (const elem of allElements) {
    const cs = window.getComputedStyle(elem);
    if (cs.maxWidth && cs.maxWidth.includes('1786')) {
      found.push({
        class: elem.className,
        maxWidth: cs.maxWidth
      });
    }
  }
  
  return found;
});

console.log('\nElements with 1786px max-width on /blocks:', 
  styles1786.length > 0 ? styles1786 : 'none found');

await browser.close();
