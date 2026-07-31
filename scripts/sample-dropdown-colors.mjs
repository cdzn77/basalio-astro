import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

// Click menu to open dropdown
await page.locator('.menu-btn').click();
await page.waitForTimeout(400);

// Now sample the dropdown link colors
const dropdownAnalysis = await page.evaluate(() => {
  // Look for the dropdown specifically - it should have visible nav links
  const navLinks = document.querySelectorAll('nav a, .menu-panel a, [class*="panel"] a');
  const results = [];
  
  navLinks.forEach((link, idx) => {
    const rect = link.getBoundingClientRect();
    // Only include visible elements (not off-screen)
    if (rect.width > 0 && rect.height > 0 && rect.top >= 0) {
      const x = Math.round(rect.left + rect.width / 2);
      const y = Math.round(rect.top + rect.height / 2);
      
      const linkStyle = window.getComputedStyle(link);
      const linkBg = linkStyle.backgroundColor;
      const linkColor = linkStyle.color;
      
      // Find resolved background by walking up
      let current = link.parentElement;
      let resolvedBg = 'transparent';
      let bgElement = 'none';
      let depth = 0;
      
      while (current && depth < 8) {
        const computed = window.getComputedStyle(current);
        const bg = computed.backgroundColor;
        if (bg && !bg.includes('rgba(0, 0, 0, 0)') && !bg.includes('transparent')) {
          resolvedBg = bg;
          bgElement = current.tagName + (current.className ? '.' + current.className : '');
          break;
        }
        current = current.parentElement;
        depth++;
      }
      
      results.push({
        text: link.textContent.trim().substring(0, 20),
        linkColor,
        linkOwnBg: linkBg,
        resolvedBg,
        bgElement,
        position: { x, y, top: Math.round(rect.top), height: Math.round(rect.height) },
        parent: link.parentElement.tagName + (link.parentElement.className ? '.' + link.parentElement.className : '')
      });
    }
  });
  
  return results;
});

console.log(`\nDROPDOWN PANEL LINK COLORS`);
console.log(`==========================\n`);

dropdownAnalysis.forEach(link => {
  console.log(`"${link.text}":`);
  console.log(`  Link foreground: ${link.linkColor}`);
  console.log(`  Link own bg: ${link.linkOwnBg}`);
  console.log(`  Resolved bg: ${link.resolvedBg}`);
  console.log(`  From element: ${link.bgElement}`);
  console.log(`  Parent: ${link.parent}`);
  console.log(`  Position: top=${link.position.top}px, height=${link.position.height}px`);
  console.log();
});

await browser.close();
