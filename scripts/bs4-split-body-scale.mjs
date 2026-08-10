import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== BS4a: SPLIT BODY SCALE CHECK ===\n');

const routes = ['/hacks', '/pricing'];

for (const route of routes) {
  console.log(`\nROUTE: ${route} at 375px\n`);
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    // Find HeaderSplit body paragraph
    const headerSplitBody = document.querySelector('.body p');
    let headerSplitSize = 'NOT FOUND';
    if (headerSplitBody) {
      const cs = window.getComputedStyle(headerSplitBody);
      headerSplitSize = cs.fontSize;
    }
    
    // Find a non-HeaderSplit paragraph (look for one that's NOT inside .body)
    const allParagraphs = Array.from(document.querySelectorAll('p'));
    let nonHeaderSplitSize = 'NOT FOUND';
    let nonHeaderSplitText = '';
    
    for (const p of allParagraphs) {
      // Check if this p is inside .body (HeaderSplit)
      if (!p.closest('.body')) {
        const cs = window.getComputedStyle(p);
        nonHeaderSplitSize = cs.fontSize;
        nonHeaderSplitText = p.textContent.substring(0, 40);
        break;
      }
    }
    
    return {
      headerSplitBodySize: headerSplitSize,
      headerSplitBodyText: headerSplitBody ? headerSplitBody.textContent.substring(0, 40) : 'N/A',
      nonHeaderSplitSize: nonHeaderSplitSize,
      nonHeaderSplitText: nonHeaderSplitText,
      headerSplitParent: headerSplitBody ? headerSplitBody.parentElement.className : 'N/A'
    };
  });

  console.log(`HeaderSplit .body p:`);
  console.log(`  Text: "${data.headerSplitBodyText}"`);
  console.log(`  Font-size: ${data.headerSplitBodySize}`);
  
  console.log(`\nNon-HeaderSplit paragraph:`);
  console.log(`  Text: "${data.nonHeaderSplitText}"`);
  console.log(`  Font-size: ${data.nonHeaderSplitSize}`);
  
  if (data.headerSplitBodySize !== data.nonHeaderSplitSize) {
    console.log(`\n✓ SPLIT DETECTED: ${data.headerSplitBodySize} vs ${data.nonHeaderSplitSize}`);
  } else {
    console.log(`\n✗ No split: both ${data.headerSplitBodySize}`);
  }
  
  await page.close();
}

console.log('\n\n=== BS4b: MEDIA QUERY BREAKPOINT INVENTORY ===\n');

import fs from 'fs';
import path from 'path';

const breakpoints = {};

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (['.astro', '.css'].some(ext => entry.name.endsWith(ext))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      
      lines.forEach((line, i) => {
        // Match media query breakpoints
        const matches = line.match(/max-width:\s*(\d+)px|min-width:\s*(\d+)px|width\s*<=\s*(\d+)px|width\s*>=\s*(\d+)px/g);
        if (matches) {
          matches.forEach(match => {
            const value = match.match(/(\d+)/)[1];
            if (!breakpoints[value]) {
              breakpoints[value] = [];
            }
            breakpoints[value].push({
              file: fullPath.replace('src/', ''),
              line: i + 1
            });
          });
        }
      });
    }
  }
}

scanDir('src');

console.log('Breakpoint values found:\n');
const sorted = Object.keys(breakpoints).sort((a, b) => parseInt(a) - parseInt(b));
for (const bp of sorted) {
  console.log(`  ${bp}px: ${breakpoints[bp].length} uses`);
}

console.log(`\nTotal distinct breakpoints: ${sorted.length}`);
console.log(`\nDefined in tokens.css:`);
console.log(`  --breakpoint-mobile: 390px`);
console.log(`  --breakpoint-tablet: 768px`);
console.log(`  --breakpoint-desktop: 1024px`);

console.log(`\nOrphan breakpoints (not in tokens.css):`);
const orphans = sorted.filter(bp => !['390', '768', '1024'].includes(bp));
orphans.forEach(bp => console.log(`  ${bp}px: ${breakpoints[bp].length} uses`));

await browser.close();
