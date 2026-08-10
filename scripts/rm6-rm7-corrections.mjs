import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== RM6a: RAMP 690px SECTION — FIND HEADING AFTER EYEBROW ===\n');

const page1 = await browser.newPage();
await page1.setViewportSize({ width: 375, height: 812 });
await page1.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

await page1.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});

await page1.waitForTimeout(500);

const ramp690Section = await page1.evaluate(() => {
  const results = [];
  
  // Find the h2 "What we do" and get its parent section
  const h2s = document.querySelectorAll('h2');
  let targetSection = null;
  let targetH2 = null;
  
  for (const h2 of h2s) {
    if (h2.textContent.includes('What we do')) {
      targetH2 = h2;
      targetSection = h2.closest('section, div[class*="section"], div[class*="container"]');
      if (!targetSection) targetSection = h2.parentElement;
      break;
    }
  }
  
  if (!targetH2) {
    return { error: 'What we do heading not found' };
  }
  
  // Get all elements in this section in order
  const allElements = targetSection.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, [role="button"]');
  
  allElements.forEach(el => {
    if (el.textContent.trim()) {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const yOffset = window.scrollY + rect.top;
      results.push({
        tag: el.tagName,
        text: el.textContent.substring(0, 50),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        yOffset: Math.round(yOffset)
      });
    }
  });
  
  return results;
});

console.log('RAMP section @ 690px in document order:');
ramp690Section.forEach((el, i) => {
  console.log(`  ${i+1}. <${el.tag}> ${el.text}`);
  console.log(`     ${el.fontSize} | weight ${el.fontWeight} | letter-spacing ${el.letterSpacing} | @ ${el.yOffset}px`);
});

await page1.close();

console.log('\n\n=== RM6b: RAMP 1304px & 1988px SECTIONS ===\n');

const page2 = await browser.newPage();
await page2.setViewportSize({ width: 375, height: 812 });
await page2.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

await page2.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});

await page2.waitForTimeout(500);

const otherSections = await page2.evaluate(() => {
  const targets = ['Our Courses', 'Our Resources'];
  const sections = {};
  
  const h2s = document.querySelectorAll('h2');
  for (const h2 of h2s) {
    const text = h2.textContent.trim();
    if (targets.includes(text)) {
      const targetSection = h2.closest('section, div[class*="section"]') || h2.parentElement;
      const allElements = targetSection.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button');
      
      const sectionData = [];
      allElements.forEach(el => {
        if (el.textContent.trim()) {
          const cs = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          const yOffset = window.scrollY + rect.top;
          sectionData.push({
            tag: el.tagName,
            text: el.textContent.substring(0, 50),
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            letterSpacing: cs.letterSpacing,
            yOffset: Math.round(yOffset)
          });
        }
      });
      
      sections[text] = sectionData;
    }
  }
  
  return sections;
});

console.log('RAMP section @ 1304px ("Our Courses"):');
if (otherSections['Our Courses']) {
  otherSections['Our Courses'].forEach((el, i) => {
    console.log(`  ${i+1}. <${el.tag}> ${el.text}`);
    console.log(`     ${el.fontSize} | weight ${el.fontWeight} | letter-spacing ${el.letterSpacing} | @ ${el.yOffset}px`);
  });
}

console.log('\nRAMP section @ 1988px ("Our Resources"):');
if (otherSections['Our Resources']) {
  otherSections['Our Resources'].forEach((el, i) => {
    console.log(`  ${i+1}. <${el.tag}> ${el.text}`);
    console.log(`     ${el.fontSize} | weight ${el.fontWeight} | letter-spacing ${el.letterSpacing} | @ ${el.yOffset}px`);
  });
}

await page2.close();

console.log('\n\n=== RM7a: BASALIO HERO HEADING TEXT & COMPUTED VALUES ===\n');

const page3 = await browser.newPage();
await page3.setViewportSize({ width: 375, height: 812 });
await page3.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const heroHeadingData = await page3.evaluate(() => {
  const heading = document.querySelector('.hero-heading');
  if (!heading) return { error: 'Hero heading not found' };
  
  const cs = window.getComputedStyle(heading);
  const lh = parseFloat(cs.lineHeight);
  const fs = parseFloat(cs.fontSize);
  
  return {
    textContent: heading.textContent,
    tag: heading.tagName,
    className: heading.className,
    fontSize: cs.fontSize,
    lineHeight: cs.lineHeight,
    lineHeightRatio: (lh / fs).toFixed(2),
    fontWeight: cs.fontWeight,
    letterSpacing: cs.letterSpacing
  };
});

console.log('Basalio .hero-heading:');
console.log(`  textContent: "${heroHeadingData.textContent}"`);
console.log(`  tag: <${heroHeadingData.tag}>`);
console.log(`  className: ${heroHeadingData.className}`);
console.log(`  font-size: ${heroHeadingData.fontSize}`);
console.log(`  line-height: ${heroHeadingData.lineHeight} (ratio: ${heroHeadingData.lineHeightRatio})`);
console.log(`  font-weight: ${heroHeadingData.fontWeight}`);
console.log(`  letter-spacing: ${heroHeadingData.letterSpacing}`);

console.log('\n\n=== RM7d: BASALIO BUTTON HEIGHT (375px) ===\n');

const btnData = await page3.evaluate(() => {
  const btn = document.querySelector('.btn-wrapper.btn-acid');
  if (!btn) return { error: 'Button not found' };
  
  const rect = btn.getBoundingClientRect();
  const cs = window.getComputedStyle(btn);
  const label = btn.querySelector('.btn-label');
  
  return {
    element: 'btn-wrapper.btn-acid',
    computedHeight: Math.round(rect.height),
    paddingTop: cs.paddingTop,
    paddingBottom: cs.paddingBottom,
    minHeight: cs.minHeight,
    labelFontSize: label ? window.getComputedStyle(label).fontSize : 'N/A'
  };
});

console.log('Basalio .btn-wrapper.btn-acid (375px):');
console.log(`  Computed height: ${btnData.computedHeight}px`);
console.log(`  padding-top: ${btnData.paddingTop}`);
console.log(`  padding-bottom: ${btnData.paddingBottom}`);
console.log(`  min-height: ${btnData.minHeight}`);
console.log(`  label font-size: ${btnData.labelFontSize}`);

console.log('\n\n=== RM7c: RAMP "VIEW COURSE" CTA FONT SIZE ===\n');

const ctaData = await page3.evaluate(() => {
  // Measure Ramp CTA instead
  return 'Will measure on Ramp page in next call...';
});

await page3.close();

// Now measure on Ramp
const page4 = await browser.newPage();
await page4.setViewportSize({ width: 375, height: 812 });
await page4.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

const rampCtaData = await page4.evaluate(() => {
  // Find "View course" link
  const links = document.querySelectorAll('a');
  for (const link of links) {
    if (link.textContent.includes('View course')) {
      const cs = window.getComputedStyle(link);
      const rect = link.getBoundingClientRect();
      const yOffset = window.scrollY + rect.top;
      return {
        text: link.textContent,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        yOffset: Math.round(yOffset),
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`
      };
    }
  }
  return { error: '"View course" link not found' };
});

console.log('Ramp "View course" link @ 586px:');
console.log(`  font-size: ${rampCtaData.fontSize}`);
console.log(`  font-weight: ${rampCtaData.fontWeight}`);
console.log(`  letter-spacing: ${rampCtaData.letterSpacing}`);
console.log(`  y-offset: ${rampCtaData.yOffset}px`);
console.log(`  padding: ${rampCtaData.padding}`);

await page4.close();
await browser.close();
