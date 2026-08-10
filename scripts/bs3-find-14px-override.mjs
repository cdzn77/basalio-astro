import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('Finding where 14px comes from on /hacks at 375px...\n');

const page = await browser.newPage();
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:4321/hacks', { waitUntil: 'networkidle' });

const styleInfo = await page.evaluate(() => {
  // Find the paragraph
  const p = Array.from(document.querySelectorAll('p')).find(el => 
    el.textContent.includes('Four effects')
  );
  
  if (!p) return { error: 'Paragraph not found' };
  
  // Get all computed styles
  const cs = window.getComputedStyle(p);
  
  // Find stylesheet rules
  const sheets = document.styleSheets;
  const rules = [];
  
  for (let i = 0; i < sheets.length; i++) {
    try {
      const sheet = sheets[i];
      const sheetRules = sheet.cssRules;
      
      for (let j = 0; j < sheetRules.length; j++) {
        const rule = sheetRules[j];
        
        // Check for media query rules
        if (rule.media) {
          const mediaText = rule.media.mediaText;
          // Look for mobile/375px related media queries
          if (mediaText.includes('374') || mediaText.includes('375') || mediaText.includes('640') || mediaText.includes('max-width: 3')) {
            if (rule.cssRules) {
              for (let k = 0; k < rule.cssRules.length; k++) {
                const subrule = rule.cssRules[k];
                if ((subrule.selectorText && subrule.selectorText.includes('p')) || 
                    (subrule.style && subrule.style.fontSize)) {
                  rules.push({
                    type: 'media',
                    media: mediaText,
                    selector: subrule.selectorText,
                    fontSize: subrule.style.fontSize,
                    sheet: sheet.href || 'inline'
                  });
                }
              }
            }
          }
        }
        
        // Check regular rules
        if (rule.selectorText && rule.selectorText.includes('p')) {
          if (rule.style && rule.style.fontSize) {
            rules.push({
              type: 'regular',
              selector: rule.selectorText,
              fontSize: rule.style.fontSize,
              sheet: sheet.href || 'inline'
            });
          }
        }
      }
    } catch (e) {
      // CORS blocked, skip
    }
  }
  
  return {
    computedFontSize: cs.fontSize,
    computedLineHeight: cs.lineHeight,
    fontSize: cs.fontSize,
    lineHeight: cs.lineHeight,
    applicableRules: rules
  };
});

console.log('Computed styles:');
console.log(`  font-size: ${styleInfo.computedFontSize}`);
console.log(`  line-height: ${styleInfo.computedLineHeight}`);

console.log('\nApplicable CSS rules found:');
if (styleInfo.applicableRules && styleInfo.applicableRules.length > 0) {
  styleInfo.applicableRules.forEach(r => {
    console.log(`  ${r.type}: ${r.selector}`);
    if (r.media) console.log(`    @media ${r.media}`);
    if (r.fontSize) console.log(`    font-size: ${r.fontSize}`);
  });
} else {
  console.log('  [None found via stylesheet inspection - may be computed by clamp() or var() fallback]');
}

console.log('\nDirect check: Does the element have a style attribute?');
await page.evaluate(() => {
  const p = Array.from(document.querySelectorAll('p')).find(el => 
    el.textContent.includes('Four effects')
  );
  if (p.getAttribute('style')) {
    console.log(`  style="${p.getAttribute('style')}"`);
  } else {
    console.log('  No inline style attribute');
  }
});

await page.close();
await browser.close();
