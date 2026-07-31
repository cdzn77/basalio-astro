import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

// First check what's on the page
const pageContent = await page.evaluate(() => {
  return {
    menuBtn: !!document.querySelector('.menu-btn'),
    dropdownPanel: !!document.querySelector('.dropdown-panel'),
    dropdownLinks: document.querySelectorAll('.dropdown-panel a, .dropdown-menu a, nav a').length,
    navElement: !!document.querySelector('nav'),
    allText: document.body.innerText.substring(0, 500)
  };
});

console.log('Page content check:', pageContent);

// Try clicking menu if it exists
if (pageContent.menuBtn) {
  await page.locator('.menu-btn').click();
  await page.waitForTimeout(500);
}

// Take screenshot
await page.screenshot({ path: '/tmp/dropdown-open.png', fullPage: false });

// Now sample colors of nav links
const navAnalysis = await page.evaluate(() => {
  // Get all nav links
  const links = document.querySelectorAll('nav a, .menu a, [class*="nav"] a');
  
  const results = [];
  
  links.forEach((link, idx) => {
    const rect = link.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const x = Math.round(rect.left + rect.width / 2);
      const y = Math.round(rect.top + rect.height / 2);
      
      const el = document.elementFromPoint(x, y);
      let current = el;
      let resolvedBg = 'transparent';
      let bgElement = 'unknown';
      
      while (current && current !== document.body) {
        const computed = window.getComputedStyle(current);
        const bg = computed.backgroundColor;
        if (bg && !bg.includes('rgba(0, 0, 0, 0)') && !bg.includes('transparent')) {
          resolvedBg = bg;
          bgElement = current.tagName + (current.className ? '.' + current.className : '');
          break;
        }
        current = current.parentElement;
      }
      
      const linkStyle = window.getComputedStyle(link);
      
      results.push({
        text: link.textContent.trim(),
        index: idx,
        linkColor: linkStyle.color,
        linkBg: linkStyle.backgroundColor,
        resolvedBg,
        bgElement,
        position: { x, y, width: Math.round(rect.width), height: Math.round(rect.height) }
      });
    }
  });
  
  return results;
});

console.log(`\nNAVIGATION LINKS ANALYSIS`);
console.log(`=========================\n`);

navAnalysis.forEach(link => {
  console.log(`${link.text}:`);
  console.log(`  Link color: ${link.linkColor}`);
  console.log(`  Link own bg: ${link.linkBg}`);
  console.log(`  Resolved bg: ${link.resolvedBg}`);
  console.log(`  From element: ${link.bgElement}`);
  console.log(`  Size: ${link.position.width}×${link.position.height}px`);
  console.log();
});

console.log(`✓ Screenshot saved to /tmp/dropdown-open.png\n`);

await browser.close();
