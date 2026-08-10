import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== RM4a: RAMP FULL-PAGE SCROLL AUDIT (375px) ===\n');

const page = await browser.newPage();
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

// Scroll to bottom
await page.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});

await page.waitForTimeout(1000);

const rampContent = await page.evaluate(() => {
  const results = { headings: [], paragraphs: [], buttons: [] };
  
  // Get all headings
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(h => {
    const rect = h.getBoundingClientRect();
    const yOffset = window.scrollY + rect.top;
    results.headings.push({
      tag: h.tagName,
      text: h.textContent.substring(0, 60),
      yOffset: Math.round(yOffset)
    });
  });
  
  // Get all paragraphs
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => {
    const text = p.textContent.trim();
    if (text.length > 10) { // Skip tiny paragraphs
      const rect = p.getBoundingClientRect();
      const yOffset = window.scrollY + rect.top;
      results.paragraphs.push({
        text: text.substring(0, 60),
        yOffset: Math.round(yOffset)
      });
    }
  });
  
  // Get all buttons/CTAs
  const buttons = document.querySelectorAll('button, a[class*="btn"], a[class*="button"], a[class*="cta"]');
  buttons.forEach(btn => {
    const text = btn.textContent.trim();
    if (text.length > 2) {
      const rect = btn.getBoundingClientRect();
      const yOffset = window.scrollY + rect.top;
      results.buttons.push({
        text: text.substring(0, 40),
        tag: btn.tagName,
        yOffset: Math.round(yOffset)
      });
    }
  });
  
  return results;
});

console.log('RAMP HEADINGS (document order):');
rampContent.headings.forEach((h, i) => {
  console.log(`  ${i+1}. <${h.tag}> @ ${h.yOffset}px: "${h.text}"`);
});

console.log('\nRAMP PARAGRAPHS (document order):');
rampContent.paragraphs.forEach((p, i) => {
  console.log(`  ${i+1}. @ ${p.yOffset}px: "${p.text}"`);
});

console.log('\nRAMP BUTTONS/CTAS (document order):');
rampContent.buttons.forEach((b, i) => {
  console.log(`  ${i+1}. <${b.tag}> @ ${b.yOffset}px: "${b.text}"`);
});

await page.close();

console.log('\n\n=== RM4b: BASALIO SELECTOR VERIFICATION ===\n');

const page2 = await browser.newPage();
await page2.setViewportSize({ width: 375, height: 812 });
await page2.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const basalioSelectors = await page2.evaluate(() => {
  // b1. Eyebrow should be .hero-eyebrow
  const eyebrow = document.querySelector('.hero-eyebrow');
  
  // b2. Find paragraph AFTER "Nine blocks. Nothing you don't need."
  const sectionHeading = document.querySelector('.courses-heading');
  let sectionBodyPara = null;
  if (sectionHeading) {
    // Find the next paragraph sibling
    let next = sectionHeading.nextElementSibling;
    while (next) {
      if (next.tagName === 'P') {
        sectionBodyPara = next;
        break;
      }
      next = next.nextElementSibling;
    }
  }
  
  // If that didn't work, find any P that comes after the heading in the section
  if (!sectionBodyPara) {
    const allP = document.querySelectorAll('p');
    const headingText = 'Nine blocks';
    let found = false;
    for (const p of allP) {
      if (found && p.textContent.includes('curated')) {
        sectionBodyPara = p;
        break;
      }
      if (p.textContent.includes(headingText)) {
        found = true;
      }
    }
  }
  
  // b3. Confirm .courses-heading
  const coursesHeading = document.querySelector('.courses-heading');
  
  return {
    eyebrow: eyebrow ? {
      found: true,
      text: eyebrow.textContent.substring(0, 60),
      className: eyebrow.className,
      tagName: eyebrow.tagName
    } : { found: false },
    sectionHeading: coursesHeading ? {
      found: true,
      text: coursesHeading.textContent.substring(0, 60),
      className: coursesHeading.className,
      tagName: coursesHeading.tagName
    } : { found: false },
    sectionBody: sectionBodyPara ? {
      found: true,
      text: sectionBodyPara.textContent.substring(0, 60),
      className: sectionBodyPara.className,
      tagName: sectionBodyPara.tagName
    } : { found: false }
  };
});

console.log('BASALIO SELECTORS:');
console.log(`  Eyebrow (.hero-eyebrow): ${basalioSelectors.eyebrow.found ? basalioSelectors.eyebrow.className : 'NOT FOUND'}`);
console.log(`    Text: "${basalioSelectors.eyebrow.found ? basalioSelectors.eyebrow.text : ''}"`);
console.log(`  Section Heading (.courses-heading): ${basalioSelectors.sectionHeading.found ? basalioSelectors.sectionHeading.className : 'NOT FOUND'}`);
console.log(`    Text: "${basalioSelectors.sectionHeading.found ? basalioSelectors.sectionHeading.text : ''}"`);
console.log(`  Section Body (paragraph after heading): ${basalioSelectors.sectionBody.found ? basalioSelectors.sectionBody.className : 'NOT FOUND'}`);
console.log(`    Text: "${basalioSelectors.sectionBody.found ? basalioSelectors.sectionBody.text : ''}"`);

await page2.close();

console.log('\n\n=== RM4c: BUTTON FONT-SIZE CASCADE ===\n');

const page3 = await browser.newPage();
await page3.setViewportSize({ width: 375, height: 812 });
await page3.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const buttonCascade = await page3.evaluate(() => {
  const btn = document.querySelector('.btn-wrapper.btn-acid');
  const label = btn ? btn.querySelector('.btn-label') : null;
  
  if (!label) return { error: 'Button not found' };
  
  // Get all computed styles
  const computed = window.getComputedStyle(label);
  
  // Get the actual CSS rules (this is limited, but shows computed result)
  return {
    'computed font-size': computed.fontSize,
    'computed font-weight': computed.fontWeight,
    'computed line-height': computed.lineHeight,
    'font-family': computed.fontFamily,
    'classList': label.className,
    'style attribute': label.getAttribute('style'),
    'parent classList': btn ? btn.className : 'N/A',
    'innerHTML': label.innerHTML.substring(0, 30)
  };
});

console.log('BUTTON .btn-label CASCADE:');
Object.entries(buttonCascade).forEach(([key, value]) => {
  console.log(`  ${key}: ${value}`);
});

// Get the actual define:vars values
const defineVars = await page3.evaluate(() => {
  const btn = document.querySelector('.btn-wrapper.btn-acid');
  if (!btn) return { error: 'Button not found' };
  
  const style = btn.getAttribute('style');
  return {
    'inline style': style
  };
});

console.log('\nBUTTON INLINE STYLE (define:vars):');
Object.entries(defineVars).forEach(([key, value]) => {
  console.log(`  ${key}: ${value}`);
});

await page3.close();
await browser.close();
