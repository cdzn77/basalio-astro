import { chromium } from 'playwright';

const routes = ['/', '/blocks', '/pricing', '/support', '/terms', '/privacy', '/contact'];
const browser = await chromium.launch();

console.log('\nFINAL VERIFICATION: Acid Text on Light Surfaces\n');
console.log('Route'.padEnd(18) + '| Acid Text Found | Status');
console.log('-'.repeat(60));

let issuesFound = 0;

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const acidLinks = await page.evaluate(() => {
    const results = [];
    const elements = document.querySelectorAll('a, span, p, div, li');
    
    elements.forEach(el => {
      const computed = window.getComputedStyle(el);
      const color = computed.color;
      
      // Check if element uses acid color
      if (color === 'rgb(223, 255, 0)') {
        // Check parent background
        let current = el;
        let bg = 'unknown';
        for (let i = 0; i < 5; i++) {
          if (current) {
            const parentBg = window.getComputedStyle(current).backgroundColor;
            if (parentBg && !parentBg.includes('rgba(0, 0, 0, 0)') && !parentBg.includes('transparent')) {
              bg = parentBg;
              break;
            }
            current = current.parentElement;
          }
        }
        
        results.push({
          tag: el.tagName,
          text: el.textContent.substring(0, 20),
          bg: bg
        });
      }
    });
    
    return results;
  });

  if (acidLinks.length > 0) {
    console.log(route.padEnd(18) + '| YES (' + acidLinks.length + ')           | ✗ FAIL');
    acidLinks.forEach(link => {
      console.log('  └─ <' + link.tag + '> on ' + link.bg + ' | "' + link.text + '"');
    });
    issuesFound += acidLinks.length;
  } else {
    console.log(route.padEnd(18) + '| NO              | ✓ PASS');
  }

  await page.close();
}

console.log('\n' + '='.repeat(60));
console.log('Total issues found: ' + issuesFound);
console.log(issuesFound === 0 ? '✓ ALL PAGES PASS' : '✗ Issues remain');

await browser.close();
