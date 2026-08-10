import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== RM1: RAMP vs BASALIO MOBILE SYSTEM (375px) ===\n');

// ============================================================
// 1. SECTION PADDING
// ============================================================

console.log('1. SECTION PADDING\n');

async function measureSectionPadding(url, siteName) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(url, { waitUntil: 'networkidle' });

  const sections = await page.evaluate(() => {
    const allSections = document.querySelectorAll('section, [role="region"], main > div, .hero, .section');
    const results = [];
    
    let seen = new Set();
    for (const section of allSections) {
      const cs = window.getComputedStyle(section);
      const key = `${cs.paddingTop}|${cs.paddingRight}|${cs.paddingBottom}|${cs.paddingLeft}`;
      
      if (!seen.has(key) && cs.paddingTop !== '0px') {
        seen.add(key);
        results.push({
          selector: section.className?.split(' ')[0] || section.tagName.toLowerCase(),
          paddingBlockStart: cs.paddingTop,
          paddingInlineStart: cs.paddingLeft,
          paddingBlockEnd: cs.paddingBottom,
          paddingInlineEnd: cs.paddingRight
        });
      }
    }
    
    return results;
  });

  console.log(`${siteName} — Section Padding (375px):`);
  sections.slice(0, 5).forEach(s => {
    console.log(`  .${s.selector}:`);
    console.log(`    block-start: ${s.paddingBlockStart}, inline-start: ${s.paddingInlineStart}`);
    console.log(`    block-end: ${s.paddingBlockEnd}, inline-end: ${s.paddingInlineEnd}`);
  });
  
  // Count distinct padding combinations
  const paddingCombos = new Set();
  sections.forEach(s => {
    paddingCombos.add(`${s.paddingBlockStart}/${s.paddingInlineStart}/${s.paddingBlockEnd}/${s.paddingInlineEnd}`);
  });
  console.log(`  Distinct padding combos: ${paddingCombos.size}`);
  console.log('');

  await page.close();
  return sections;
}

const rampPadding = await measureSectionPadding('https://rampstudio.framer.website', 'RAMP');
const basalioPadding = await measureSectionPadding('http://localhost:4321/', 'BASALIO');

// ============================================================
// 2. VERTICAL RHYTHM (eyebrow → heading → body → button)
// ============================================================

console.log('\n2. VERTICAL RHYTHM STACK\n');

async function measureVerticalRhythm(url, siteName) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(url, { waitUntil: 'networkidle' });

  const rhythm = await page.evaluate(() => {
    // Find a stack: eyebrow, heading, body paragraph, button
    const eyebrow = document.querySelector('[class*="eyebrow"], .label, [class*="label"]');
    const heading = document.querySelector('h1, h2, h3');
    const body = document.querySelector('p');
    const button = document.querySelector('button, a[class*="btn"], a[class*="button"]');
    
    if (!eyebrow || !heading || !body || !button) {
      return { error: 'Not all stack elements found' };
    }
    
    const eyebrowRect = eyebrow.getBoundingClientRect();
    const headingRect = heading.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    return {
      eyebrowHeight: Math.round(eyebrowRect.height),
      eyebrowToHeading: Math.round(headingRect.top - eyebrowRect.bottom),
      headingHeight: Math.round(headingRect.height),
      headingToBody: Math.round(bodyRect.top - headingRect.bottom),
      bodyHeight: Math.round(bodyRect.height),
      bodyToButton: Math.round(buttonRect.top - bodyRect.bottom),
      buttonHeight: Math.round(buttonRect.height)
    };
  });

  console.log(`${siteName} — Vertical Stack (375px):`);
  console.log(JSON.stringify(rhythm, null, 2));
  console.log('');

  await page.close();
  return rhythm;
}

const rampRhythm = await measureVerticalRhythm('https://rampstudio.framer.website', 'RAMP');
const basilioRhythm = await measureVerticalRhythm('http://localhost:4321/', 'BASALIO');

// ============================================================
// 3. TYPE SCALE
// ============================================================

console.log('\n3. TYPE SCALE\n');

async function measureTypeScale(url, siteName) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(url, { waitUntil: 'networkidle' });

  const typeScale = await page.evaluate(() => {
    const eyebrow = document.querySelector('[class*="eyebrow"], .label, [class*="label"]');
    const heading = document.querySelector('h1, h2');
    const body = document.querySelector('p:not([class*="label"])');
    const button = document.querySelector('button, a[class*="btn"]');
    
    const results = {};
    
    if (eyebrow) {
      const cs = window.getComputedStyle(eyebrow);
      const lh = parseFloat(cs.lineHeight);
      const fs = parseFloat(cs.fontSize);
      results.eyebrow = {
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        lineHeightRatio: (lh / fs).toFixed(2),
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing
      };
    }
    
    if (heading) {
      const cs = window.getComputedStyle(heading);
      const lh = parseFloat(cs.lineHeight);
      const fs = parseFloat(cs.fontSize);
      results.heading = {
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        lineHeightRatio: (lh / fs).toFixed(2),
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing
      };
    }
    
    if (body) {
      const cs = window.getComputedStyle(body);
      const lh = parseFloat(cs.lineHeight);
      const fs = parseFloat(cs.fontSize);
      results.body = {
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        lineHeightRatio: (lh / fs).toFixed(2),
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing
      };
    }
    
    if (button) {
      const cs = window.getComputedStyle(button);
      const lh = parseFloat(cs.lineHeight);
      const fs = parseFloat(cs.fontSize);
      results.buttonLabel = {
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        lineHeightRatio: (lh / fs).toFixed(2),
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing
      };
    }
    
    return results;
  });

  console.log(`${siteName} — Type Scale (375px):`);
  console.log(JSON.stringify(typeScale, null, 2));
  console.log('');

  await page.close();
  return typeScale;
}

const rampType = await measureTypeScale('https://rampstudio.framer.website', 'RAMP');
const basilioType = await measureTypeScale('http://localhost:4321/', 'BASALIO');

// ============================================================
// 4. BUTTON TREATMENT
// ============================================================

console.log('\n4. BUTTON TREATMENT\n');

async function measureButton(url, siteName) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(url, { waitUntil: 'networkidle' });

  const button = await page.evaluate(() => {
    const btn = document.querySelector('button:not([aria-hidden]), a[class*="btn"]:not([aria-hidden])');
    if (!btn) return { error: 'No button found' };
    
    const cs = window.getComputedStyle(btn);
    const rect = btn.getBoundingClientRect();
    
    return {
      height: Math.round(rect.height),
      padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      borderRadius: cs.borderRadius,
      fontSize: cs.fontSize,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
      fontWeight: cs.fontWeight
    };
  });

  console.log(`${siteName} — Button (375px):`);
  console.log(JSON.stringify(button, null, 2));
  console.log('');

  await page.close();
  return button;
}

const rampButton = await measureButton('https://rampstudio.framer.website', 'RAMP');
const basilioButton = await measureButton('http://localhost:4321/', 'BASALIO');

// ============================================================
// 5. STATS / LEDGER ROW
// ============================================================

console.log('\n5. STATS/LEDGER ROW\n');

async function measureLedgerRow(url, siteName) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(url, { waitUntil: 'networkidle' });

  const ledger = await page.evaluate(() => {
    // Look for stats rows or feature lists
    const rows = document.querySelectorAll('[class*="stat"], [class*="row"], [class*="item"]');
    
    if (rows.length === 0) return { error: 'No ledger/stats rows found' };
    
    const firstRow = rows[0];
    const cs = window.getComputedStyle(firstRow);
    const rect = firstRow.getBoundingClientRect();
    
    // Look for divider
    const divider = firstRow.querySelector('hr, [class*="divid"]');
    const dividerCs = divider ? window.getComputedStyle(divider) : null;
    
    // Look for label and value
    const label = firstRow.querySelector('[class*="label"], .name, .title');
    const value = firstRow.querySelector('[class*="value"], .amount');
    
    return {
      rowHeight: Math.round(rect.height),
      rowPadding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      dividerWeight: dividerCs ? dividerCs.borderTopWidth : 'none',
      dividerColor: dividerCs ? dividerCs.borderTopColor : 'none',
      labelFontSize: label ? window.getComputedStyle(label).fontSize : 'not found',
      valueFontSize: value ? window.getComputedStyle(value).fontSize : 'not found'
    };
  });

  console.log(`${siteName} — Ledger Row (375px):`);
  console.log(JSON.stringify(ledger, null, 2));
  console.log('');

  await page.close();
  return ledger;
}

const rampLedger = await measureLedgerRow('https://rampstudio.framer.website', 'RAMP');
const basilioLedger = await measureLedgerRow('http://localhost:4321/', 'BASALIO');

await browser.close();
