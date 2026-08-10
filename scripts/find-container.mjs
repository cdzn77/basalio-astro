import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const data = await page.evaluate(() => {
  const viewport = document.querySelector('.carousel-viewport');
  
  let el = viewport;
  let level = 0;
  const hierarchy = [];

  while (el && level < 6) {
    const tagName = el.tagName;
    const className = el.className || '(no class)';
    const width = window.getComputedStyle(el).width;
    const display = window.getComputedStyle(el).display;
    
    hierarchy.push({
      level,
      tagName,
      className: typeof className === 'string' ? className : '[object]',
      width,
      display
    });
    
    el = el.parentElement;
    level++;
  }

  return hierarchy;
});

console.log('Container hierarchy from .carousel-viewport up:');
data.forEach(item => {
  console.log(`L${item.level}: <${item.tagName}> class="${item.className}" width=${item.width} display=${item.display}`);
});

await browser.close();
