import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

// Take screenshot
await page.screenshot({ path: '/tmp/support-page.png', fullPage: false });

// Sample pixel color behind the h1
const h1Color = await page.evaluate(() => {
  const h1 = document.querySelector('h1');
  if (!h1) return { error: 'h1 not found' };
  
  const rect = h1.getBoundingClientRect();
  const x = Math.round(rect.left + rect.width / 2);
  const y = Math.round(rect.top + rect.height / 2);
  
  // Get element at that point
  const el = document.elementFromPoint(x, y);
  const computed = window.getComputedStyle(el);
  
  // Walk up to find painted background
  let current = el;
  let resolvedBg = 'transparent';
  while (current && current !== document.body) {
    const bg = window.getComputedStyle(current).backgroundColor;
    if (bg && !bg.includes('rgba(0, 0, 0, 0)') && !bg.includes('transparent')) {
      resolvedBg = bg;
      break;
    }
    current = current.parentElement;
  }
  
  return {
    h1Text: h1.textContent,
    h1FG: computed.color,
    elementAtPoint: el.tagName + (el.className ? '.' + el.className : ''),
    resolvedBG: resolvedBg,
    h1OwnBG: computed.backgroundColor
  };
});

console.log('\n/support H1 COLOR ANALYSIS');
console.log('==========================\n');
console.log('H1 text:', h1Color.h1Text);
console.log('H1 foreground:', h1Color.h1FG);
console.log('H1 own background:', h1Color.h1OwnBG);
console.log('Element at point:', h1Color.elementAtPoint);
console.log('Resolved background:', h1Color.resolvedBG);

// Check navigation menu background
const navInfo = await page.evaluate(() => {
  const nav = document.querySelector('.menu-btn');
  if (!nav) return { error: 'nav not found' };
  
  const computed = window.getComputedStyle(nav);
  return {
    bg: computed.backgroundColor,
    text: computed.color,
    element: nav.className
  };
});

console.log('\n\nNAVIGATION MENU BUTTON');
console.log('======================\n');
console.log('Background:', navInfo.bg);
console.log('Text color:', navInfo.text);

console.log('\n✓ Screenshot saved to /tmp/support-page.png\n');

await browser.close();
