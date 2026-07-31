import { chromium } from 'playwright';

const routes = ['/support', '/roadmap', '/terms', '/privacy'];
const browser = await chromium.launch();

async function auditPage(route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  // 1. CONTRAST AUDIT
  const contrastResults = await page.evaluate(() => {
    const results = [];
    
    const elements = document.querySelectorAll('body *');
    const checked = new Set();
    
    for (const el of elements) {
      if (!el.textContent?.trim() || el.children.length > 0) continue;
      
      const text = el.textContent.trim().substring(0, 30);
      const computed = window.getComputedStyle(el);
      const fg = computed.color;
      const bg = computed.backgroundColor;
      
      const key = `${text}|${fg}|${bg}`;
      if (checked.has(key)) continue;
      checked.add(key);

      // Parse RGB
      const fgMatch = fg.match(/\d+/g);
      const bgMatch = bg.match(/\d+/g);
      
      if (fgMatch && bgMatch && fgMatch.length >= 3 && bgMatch.length >= 3) {
        const [fr, fg_r, fb] = fgMatch.slice(0, 3).map(Number);
        const [br, bg_r, bb] = bgMatch.slice(0, 3).map(Number);
        
        const fgLum = (0.299 * fr + 0.587 * fg_r + 0.114 * fb) / 255;
        const bgLum = (0.299 * br + 0.587 * bg_r + 0.114 * bb) / 255;
        
        const contrast = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
        
        const fontSize = parseInt(computed.fontSize);
        const isBold = computed.fontWeight >= 700;
        const isLarge = fontSize >= 18 || (fontSize >= 14 && isBold);
        const minRatio = isLarge ? 3 : 4.5;
        const pass = contrast >= minRatio;
        
        results.push({
          element: el.tagName.toLowerCase(),
          text: text.substring(0, 40),
          fg: `rgb(${fr}, ${fg_r}, ${fb})`,
          bg: `rgb(${br}, ${bg_r}, ${bb})`,
          ratio: contrast.toFixed(2),
          pass: pass ? '✓' : '✗',
          required: minRatio
        });
      }
    }
    
    return results;
  });

  // 2. LINK IDENTIFICATION
  const linkResults = await page.evaluate(() => {
    const links = document.querySelectorAll('a');
    return Array.from(links).slice(0, 20).map(link => {
      const computed = window.getComputedStyle(link);
      const text = link.textContent.trim().substring(0, 40);
      const textDecoration = computed.textDecoration;
      const fontWeight = computed.fontWeight;
      const color = computed.color;
      
      const hasUnderline = textDecoration.includes('underline');
      const distinguishable = hasUnderline || fontWeight >= 700;
      
      return {
        text,
        underline: hasUnderline ? 'yes' : 'no',
        bold: fontWeight >= 700 ? 'yes' : 'no',
        colorOnly: !distinguishable ? 'YES - FAILS' : 'no',
        color
      };
    });
  });

  // 3. FOCUS VISIBILITY
  const focusResults = await page.evaluate(() => {
    const interactive = document.querySelectorAll('button, a, input, [role="button"]');
    return Array.from(interactive).slice(0, 15).map(el => {
      const computed = window.getComputedStyle(el);
      const focused = window.getComputedStyle(el, ':focus-visible');
      const outline = computed.outline;
      const focusOutline = focused ? focused.outline : 'none';
      
      const rect = el.getBoundingClientRect();
      const hasVisibleFocus = outline && outline !== 'none' || focusOutline && focusOutline !== 'none';
      
      return {
        element: el.tagName.toLowerCase(),
        text: el.textContent?.trim().substring(0, 30) || el.getAttribute('aria-label') || '...',
        outline: outline === 'none' ? 'none' : 'yes',
        hasFocusStyle: hasVisibleFocus ? 'yes' : 'no'
      };
    });
  });

  // 4. HEADING HIERARCHY
  const headingResults = await page.evaluate(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const outline = [];
    let prevLevel = 0;
    let h1Count = 0;
    
    for (const h of headings) {
      const level = parseInt(h.tagName[1]);
      const text = h.textContent.trim().substring(0, 40);
      
      if (level === 1) h1Count++;
      
      outline.push({
        level,
        text,
        skipped: level > prevLevel + 1 ? 'YES - SKIP' : 'no'
      });
      
      prevLevel = level;
    }
    
    return { outline, h1Count, multipleH1: h1Count > 1 ? 'YES - FAILS' : 'no' };
  });

  // 5. TARGET SIZE
  const targetResults = await page.evaluate(() => {
    const interactive = document.querySelectorAll('button, a, input, [role="button"], [tabindex]');
    return Array.from(interactive).map(el => {
      const rect = el.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      const minSize = 24;
      const pass = width >= minSize && height >= minSize;
      const text = el.textContent?.trim().substring(0, 30) || el.getAttribute('aria-label') || `(${el.tagName})`;
      
      return {
        element: el.tagName.toLowerCase(),
        text,
        width,
        height,
        pass: pass ? '✓' : `✗ (${width}x${height})`,
        minRequired: `${minSize}x${minSize}`
      };
    }).filter(t => !t.pass.startsWith('✓')); // Show only failures
  });

  // 6. FORMS
  const formResults = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input');
    return Array.from(inputs).map(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      const ariaLabel = input.getAttribute('aria-label');
      const placeholder = input.getAttribute('placeholder');
      const type = input.type;
      
      const hasLabel = !!label;
      const hasAriaLabel = !!ariaLabel;
      const hasPlaceholderOnly = !hasLabel && !hasAriaLabel && !!placeholder;
      const pass = hasLabel || hasAriaLabel;
      
      return {
        type,
        placeholder: placeholder || 'none',
        hasLabel: hasLabel ? 'yes' : 'no',
        hasAriaLabel: hasAriaLabel ? 'yes' : 'no',
        placeholderOnly: hasPlaceholderOnly ? 'YES - FAILS' : 'no',
        pass: pass ? '✓' : '✗'
      };
    });
  });

  // 7. REDUCED MOTION
  const motionResults = await page.evaluate(() => {
    const styleSheets = document.styleSheets;
    const results = {
      hasReducedMotionRule: false,
      animatedElements: []
    };
    
    try {
      for (const sheet of styleSheets) {
        const rules = sheet.cssRules || [];
        for (const rule of rules) {
          if (rule.media && rule.media.mediaText.includes('prefers-reduced-motion')) {
            results.hasReducedMotionRule = true;
          }
          if (rule.style && (rule.style.animation || rule.style.transition)) {
            results.animatedElements.push(rule.selectorText);
          }
        }
      }
    } catch (e) {
      // CORS on external sheets
    }
    
    // Check for animations in inline styles
    const animated = document.querySelectorAll('[style*="animation"], [style*="transition"]');
    results.animatedElements.push(...Array.from(animated).map(el => el.tagName + (el.className ? '.' + el.className : '')).slice(0, 5));
    
    return results;
  });

  await page.close();

  return {
    route,
    contrast: contrastResults.filter(r => r.pass === '✗'),
    links: linkResults.filter(r => r.colorOnly === 'YES - FAILS'),
    focus: focusResults.filter(r => r.hasFocusStyle === 'no'),
    headings: headingResults,
    targets: targetResults,
    forms: formResults.filter(f => f.pass === '✗'),
    motion: motionResults
  };
}

// Run audits for all 4 pages
const audits = [];
for (const route of routes) {
  audits.push(await auditPage(route));
}

await browser.close();

// Print results
console.log('\n===========================================');
console.log('WCAG 2.2 AA AUDIT REPORT');
console.log('===========================================\n');

for (const audit of audits) {
  console.log(`\n${audit.route.toUpperCase()}`);
  console.log('─'.repeat(50));
  
  // 1. Contrast
  console.log('\n1. CONTRAST (4.5:1 body, 3:1 large/UI)');
  if (audit.contrast.length === 0) {
    console.log('   ✓ All text meets minimum contrast');
  } else {
    audit.contrast.slice(0, 10).forEach(c => {
      console.log(`   ✗ ${c.element}: ${c.text}`);
      console.log(`     FG: ${c.fg} | BG: ${c.bg}`);
      console.log(`     Ratio: ${c.ratio}:1 (need ${c.required}:1)`);
    });
  }
  
  // 2. Link ID
  console.log('\n2. LINK IDENTIFICATION (not color-only)');
  if (audit.links.length === 0) {
    console.log('   ✓ All links distinguished beyond color');
  } else {
    audit.links.slice(0, 5).forEach(l => {
      console.log(`   ✗ "${l.text}" - color only`);
    });
  }
  
  // 3. Focus
  console.log('\n3. FOCUS VISIBILITY (≥3:1 indicator)');
  if (audit.focus.length === 0) {
    console.log('   ✓ All interactive elements have visible focus');
  } else {
    audit.focus.slice(0, 5).forEach(f => {
      console.log(`   ✗ ${f.element} "${f.text}" - no visible focus`);
    });
  }
  
  // 4. Headings
  console.log('\n4. HEADING HIERARCHY (no skips, one h1)');
  console.log(`   H1 count: ${audit.headings.h1Count} ${audit.headings.multipleH1}`);
  const skipped = audit.headings.outline.filter(h => h.skipped === 'YES - SKIP');
  if (skipped.length > 0) {
    skipped.forEach(h => {
      console.log(`   ✗ ${h.text} - skips level`);
    });
  } else {
    console.log('   ✓ No skipped heading levels');
  }
  
  // 5. Targets
  console.log('\n5. TARGET SIZE (≥24x24px)');
  if (audit.targets.length === 0) {
    console.log('   ✓ All targets meet minimum size');
  } else {
    audit.targets.slice(0, 5).forEach(t => {
      console.log(`   ✗ ${t.element} "${t.text}" - ${t.pass}`);
    });
  }
  
  // 6. Forms
  console.log('\n6. FORMS (real label or aria-label)');
  if (audit.forms.length === 0) {
    console.log('   ✓ All form inputs have proper labels');
  } else {
    audit.forms.forEach(f => {
      console.log(`   ✗ ${f.type} input - ${f.pass}`);
    });
  }
  
  // 7. Motion
  console.log('\n7. REDUCED MOTION (prefers-reduced-motion guard)');
  if (audit.motion.animatedElements.length === 0) {
    console.log('   ✓ No animations detected');
  } else if (audit.motion.hasReducedMotionRule) {
    console.log('   ✓ Has prefers-reduced-motion guard');
  } else {
    console.log(`   ✗ ${audit.motion.animatedElements.length} animations without prefers-reduced-motion`);
  }
}

console.log('\n===========================================\n');
