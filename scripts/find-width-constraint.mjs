import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

console.log('=== DS9a: ANCESTOR WIDTH CASCADE (1920px viewport) ===\n');

const cascade = await page.evaluate(() => {
  const elem = document.querySelector('.header-split-inner');
  
  let current = elem;
  let level = 0;
  const results = [];
  
  while (current && level < 10) {
    const cs = window.getComputedStyle(current);
    const tag = current.tagName.toLowerCase();
    const classes = current.className || '(no class)';
    
    results.push({
      level,
      selector: `<${tag} class="${classes}">`,
      width: cs.width,
      maxWidth: cs.maxWidth,
      paddingLeft: cs.paddingLeft,
      paddingRight: cs.paddingRight,
      margin: cs.margin,
      overflow: cs.overflow,
      display: cs.display
    });
    
    current = current.parentElement;
    level++;
  }
  
  return results;
});

cascade.forEach(item => {
  console.log(`Level ${item.level}: ${item.selector}`);
  console.log(`  width: ${item.width}, maxWidth: ${item.maxWidth}`);
  console.log(`  padding-left: ${item.paddingLeft}, padding-right: ${item.paddingRight}`);
  console.log(`  margin: ${item.margin}`);
  console.log(`  display: ${item.display}, overflow: ${item.overflow}`);
  console.log('');
});

console.log('\n=== DS9b: WHEN DOES .header-split-inner MAX-WIDTH BIND? ===\n');

// Test at multiple viewports to find when max-width starts constraining
for (const width of [800, 1200, 1600, 1786, 1900, 1920, 2000]) {
  await page.setViewportSize({ width, height: 1080 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  
  const data = await page.evaluate(() => {
    const inner = document.querySelector('.header-split-inner');
    const parent = inner?.parentElement;
    if (inner && parent) {
      const innerCs = window.getComputedStyle(inner);
      const parentCs = window.getComputedStyle(parent);
      return {
        parentWidth: parentCs.width,
        innerMaxWidth: innerCs.maxWidth,
        innerComputedWidth: innerCs.width,
        isBound: innerCs.width === innerCs.maxWidth
      };
    }
    return null;
  });
  
  if (data) {
    console.log(`Viewport ${width}px:`);
    console.log(`  Parent width: ${data.parentWidth}`);
    console.log(`  Inner max-width: ${data.innerMaxWidth}`);
    console.log(`  Inner computed width: ${data.innerComputedWidth}`);
    console.log(`  Max-width binding: ${data.isBound ? 'YES' : 'NO (parent is smaller)'}`);
    console.log('');
  }
}

console.log('\n=== DS9c: HERO MAX-WIDTH BINDING ===\n');

await page.setViewportSize({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const heroData = await page.evaluate(() => {
  const hero = document.querySelector('.hero');
  const heroParent = hero?.parentElement;
  
  if (hero && heroParent) {
    const heroCs = window.getComputedStyle(hero);
    const parentCs = window.getComputedStyle(heroParent);
    
    return {
      element: 'Hero',
      parentTag: heroParent.tagName.toLowerCase(),
      parentClass: heroParent.className,
      parentWidth: parentCs.width,
      parentMaxWidth: parentCs.maxWidth,
      heroMaxWidth: heroCs.maxWidth,
      heroComputedWidth: heroCs.width,
      isBound: heroCs.width === heroCs.maxWidth
    };
  }
  return null;
});

console.log(JSON.stringify(heroData, null, 2));
console.log('\nDoes Hero max-width: 1791px bind?', heroData?.isBound ? 'YES' : 'NO');

// Test Hero at different viewports
console.log('\nHero max-width binding across viewports:\n');
for (const width of [1200, 1600, 1791, 1900, 1920, 2000]) {
  await page.setViewportSize({ width, height: 1080 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  
  const data = await page.evaluate(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
      const cs = window.getComputedStyle(hero);
      return {
        heroMaxWidth: cs.maxWidth,
        heroComputedWidth: cs.width,
        isBound: cs.width === cs.maxWidth
      };
    }
    return null;
  });
  
  if (data) {
    console.log(`Viewport ${width}px: Hero width=${data.heroComputedWidth}, max-width=${data.heroMaxWidth}, binding=${data.isBound}`);
  }
}

await browser.close();
