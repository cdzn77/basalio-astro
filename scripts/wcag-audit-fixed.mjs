import { chromium } from 'playwright';

const routes = ['/support', '/roadmap', '/terms', '/privacy'];
const browser = await chromium.launch();

async function auditPage(route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  // FIXED: Walk DOM to find actual painted background
  const contrastResults = await page.evaluate(() => {
    function getResolvedBackground(el) {
      let current = el;
      while (current && current !== document.body) {
        const computed = window.getComputedStyle(current);
        const bg = computed.backgroundColor;
        
        // Check if non-transparent
        if (bg && !bg.includes('rgba(0, 0, 0, 0)') && !bg.includes('transparent')) {
          return { element: current, bg };
        }
        current = current.parentElement;
      }
      
      // Fallback to body
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      return { element: document.body, bg: bodyBg || 'rgba(255, 255, 255, 1)' };
    }

    const results = [];
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, p, a, span, button, label')).filter(el => {
      const text = el.textContent?.trim();
      return text && text.length > 0 && el.offsetHeight > 0;
    });

    const checked = new Set();
    
    for (const el of elements.slice(0, 50)) {
      const text = el.textContent.trim().substring(0, 30);
      const computed = window.getComputedStyle(el);
      const fg = computed.color;
      
      // Get element's own background
      const elementBg = computed.backgroundColor;
      
      // Get resolved backdrop
      const { bg: resolvedBg } = getResolvedBackground(el);
      
      const key = `${text}|${fg}|${resolvedBg}`;
      if (checked.has(key)) continue;
      checked.add(key);

      // Parse RGB for both
      const fgMatch = fg.match(/(\d+),\s*(\d+),\s*(\d+)/);
      const bgMatch = resolvedBg.match(/(\d+),\s*(\d+),\s*(\d+)/);
      
      if (fgMatch && bgMatch) {
        const [, fr, fg_g, fb] = fgMatch;
        const [, br, bg_g, bb] = bgMatch;
        
        const fgLum = (0.299 * fr + 0.587 * fg_g + 0.114 * fb) / 255;
        const bgLum = (0.299 * br + 0.587 * bg_g + 0.114 * bb) / 255;
        
        const contrast = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
        
        const fontSize = parseInt(computed.fontSize);
        const isBold = parseInt(computed.fontWeight) >= 700;
        const isLarge = fontSize >= 18 || (fontSize >= 14 && isBold);
        const minRatio = isLarge ? 3 : 4.5;
        const pass = contrast >= minRatio;
        
        results.push({
          element: el.tagName.toLowerCase(),
          text: text.substring(0, 40),
          fg: `rgb(${fr}, ${fg_g}, ${fb})`,
          elementBg: elementBg.substring(0, 40),
          resolvedBg: `rgb(${br}, ${bg_g}, ${bb})`,
          ratio: contrast.toFixed(2),
          pass: pass ? '✓' : '✗',
          required: minRatio
        });
      }
    }
    
    return results;
  });

  // LINK IDENTIFICATION - check styling
  const linkStyles = await page.evaluate(() => {
    const links = document.querySelectorAll('a');
    return Array.from(links).slice(0, 30).map(link => {
      const computed = window.getComputedStyle(link);
      const text = link.textContent.trim().substring(0, 40);
      const textDecoration = computed.textDecoration;
      const fontWeight = computed.fontWeight;
      const color = computed.color;
      
      const hasUnderline = textDecoration && textDecoration.includes('underline');
      const isBold = parseInt(fontWeight) >= 700;
      const distinguishable = hasUnderline || isBold;
      
      return {
        text,
        treatment: distinguishable ? `${isBold ? 'bold' : ''}${hasUnderline ? ' underline' : ''}` : 'COLOR ONLY',
        color: color.match(/\d+/g)?.slice(0, 3).join(', ') || color
      };
    });
  });

  // TARGET SIZE - comprehensive
  const targetSizes = await page.evaluate(() => {
    const interactive = document.querySelectorAll('button, a, input, [role="button"], [tabindex]');
    return Array.from(interactive).map(el => {
      const rect = el.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      const text = el.textContent?.trim().substring(0, 30) || el.getAttribute('aria-label') || `(${el.tagName})`;
      
      return {
        element: el.tagName.toLowerCase(),
        text,
        width,
        height,
        pass: width >= 24 && height >= 24,
        minRequired: '24x24'
      };
    });
  });

  await page.close();

  return {
    route,
    contrast: contrastResults,
    links: linkStyles,
    targets: targetSizes
  };
}

// Run audits
const audits = [];
for (const route of routes) {
  audits.push(await auditPage(route));
}

await browser.close();

// Print detailed results
console.log('\n' + '='.repeat(70));
console.log('WCAG 2.2 AA AUDIT (CORRECTED METHOD)');
console.log('='.repeat(70));

for (const audit of audits) {
  console.log(`\n\n${audit.route.toUpperCase()}`);
  console.log('-'.repeat(70));
  
  // CONTRAST - with resolved backgrounds
  console.log('\n1. CONTRAST (element bg vs resolved backdrop)\n');
  const failures = audit.contrast.filter(c => c.pass === '✗');
  if (failures.length === 0) {
    console.log('   ✓ All text meets minimum contrast');
  } else {
    failures.slice(0, 15).forEach(c => {
      console.log(`   ✗ <${c.element}> "${c.text}"`);
      console.log(`     FG: ${c.fg}`);
      console.log(`     Element BG: ${c.elementBg}`);
      console.log(`     Resolved BG: ${c.resolvedBg}`);
      console.log(`     Ratio: ${c.ratio}:1 (need ≥${c.required}:1)\n`);
    });
  }
  
  // LINK IDENTIFICATION - exact styles
  console.log('\n2. LINK IDENTIFICATION\n');
  const colorOnlyLinks = audit.links.filter(l => l.treatment === 'COLOR ONLY');
  if (colorOnlyLinks.length === 0) {
    console.log('   ✓ All links have underline or bold');
  } else {
    colorOnlyLinks.forEach(l => {
      console.log(`   ✗ "${l.text}" — color only (no underline/bold)`);
    });
  }
  
  // TARGET SIZE - all under 24px
  console.log('\n3. TARGET SIZE (24x24px minimum)\n');
  const tooSmall = audit.targets.filter(t => !t.pass);
  if (tooSmall.length === 0) {
    console.log('   ✓ All targets ≥24x24px');
  } else {
    tooSmall.slice(0, 15).forEach(t => {
      console.log(`   ✗ <${t.element}> "${t.text}" — ${t.width}×${t.height}px`);
    });
  }
}

console.log('\n' + '='.repeat(70) + '\n');
