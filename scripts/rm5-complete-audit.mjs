import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== RM5a: RAMP CTA SEARCH (anchors, roles, links) ===\n');

const page1 = await browser.newPage();
await page1.setViewportSize({ width: 375, height: 812 });
await page1.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

// Scroll to see full page
await page1.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});

await page1.waitForTimeout(500);

const rampCTAs = await page1.evaluate(() => {
  const ctas = [];
  
  // Search for a[href]
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const text = link.textContent.trim();
    // Filter for likely CTAs (not navigation, not footer)
    if (text.length > 2 && text.length < 40 && !text.toLowerCase().includes('privacy') && !text.toLowerCase().includes('terms')) {
      const rect = link.getBoundingClientRect();
      const yOffset = window.scrollY + rect.top;
      ctas.push({
        tag: link.tagName,
        text: text,
        yOffset: Math.round(yOffset),
        className: link.className
      });
    }
  });
  
  // Search for [role="button"]
  const roleButtons = document.querySelectorAll('[role="button"]');
  roleButtons.forEach(btn => {
    const text = btn.textContent.trim();
    if (text.length > 2) {
      const rect = btn.getBoundingClientRect();
      const yOffset = window.scrollY + rect.top;
      ctas.push({
        tag: btn.tagName,
        text: text,
        yOffset: Math.round(yOffset),
        className: btn.className
      });
    }
  });
  
  return ctas;
});

console.log('RAMP CTAs (a[href], [role="button"]):');
rampCTAs.slice(0, 15).forEach((cta, i) => {
  console.log(`  ${i+1}. <${cta.tag}> @ ${cta.yOffset}px: "${cta.text}"`);
});
console.log(`  [total found: ${rampCTAs.length}]\n`);

await page1.close();

console.log('\n=== RM5b-c: FIVE TABLES + SECTION RHYTHM ===\n');

const page2 = await browser.newPage();
await page2.setViewportSize({ width: 375, height: 812 });
await page2.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const basalioData = await page2.evaluate(() => {
  const results = {};
  
  // Measure each element
  const eyebrow = document.querySelector('.hero-eyebrow');
  const heading = document.querySelector('.hero-heading');
  const bodyDescription = document.querySelector('.block-description');
  const ctaButton = document.querySelector('.btn-wrapper.btn-acid');
  const sectionHeading = document.querySelector('.courses-heading');
  
  // Eyebrow measurements
  if (eyebrow) {
    const cs = window.getComputedStyle(eyebrow);
    results.eyebrow = {
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing
    };
  }
  
  // Heading measurements
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
  
  // Body description
  if (bodyDescription) {
    const cs = window.getComputedStyle(bodyDescription);
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
  
  // CTA button
  if (ctaButton) {
    const label = ctaButton.querySelector('.btn-label');
    if (label) {
      const cs = window.getComputedStyle(label);
      results.cta = {
        height: Math.round(ctaButton.getBoundingClientRect().height),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform
      };
    }
  }
  
  // Section heading
  if (sectionHeading) {
    const cs = window.getComputedStyle(sectionHeading);
    const lh = parseFloat(cs.lineHeight);
    const fs = parseFloat(cs.fontSize);
    results.sectionHeading = {
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      lineHeightRatio: (lh / fs).toFixed(2),
      fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing
    };
  }
  
  // Section rhythm: find y-offsets of major sections
  const sections = document.querySelectorAll('section, [class*="section"], .courses, .testimonials, .faq');
  const offsets = [];
  sections.forEach(s => {
    const rect = s.getBoundingClientRect();
    const yOffset = window.scrollY + rect.top;
    const heading = s.querySelector('h1, h2, h3');
    if (heading && yOffset > 0) {
      offsets.push({
        heading: heading.textContent.substring(0, 30),
        yOffset: Math.round(yOffset)
      });
    }
  });
  
  results.sectionOffsets = offsets;
  
  return results;
});

console.log('TABLE 1: EYEBROW\n');
console.log(`Basalio (.hero-eyebrow):`);
console.log(`  font-size: ${basalioData.eyebrow.fontSize}`);
console.log(`  line-height: ${basalioData.eyebrow.lineHeight}`);
console.log(`  font-weight: ${basalioData.eyebrow.fontWeight}`);
console.log(`  letter-spacing: ${basalioData.eyebrow.letterSpacing}`);
console.log('\nRamp: [no equivalent - Ramp leads with branding "Ramp Studio."]');

console.log('\n\nTABLE 2: HEADING\n');
console.log(`Basalio (.hero-heading):`);
console.log(`  font-size: ${basalioData.heading.fontSize}`);
console.log(`  line-height: ${basalioData.heading.lineHeight} (${basalioData.heading.lineHeightRatio})`);
console.log(`  font-weight: ${basalioData.heading.fontWeight}`);
console.log(`  letter-spacing: ${basalioData.heading.letterSpacing}`);
console.log('\nRamp (H1 "We turn strategy into growth", split across 3 tags @ 70-186px)');
console.log('  [need to measure - will do separately]');

console.log('\n\nTABLE 3: BODY COPY\n');
console.log(`Basalio (.block-description - hero body):`);
console.log(`  font-size: ${basalioData.body.fontSize}`);
console.log(`  line-height: ${basalioData.body.lineHeight} (${basalioData.body.lineHeightRatio})`);
console.log(`  font-weight: ${basalioData.body.fontWeight}`);
console.log(`  letter-spacing: ${basalioData.body.letterSpacing}`);
console.log('\nRamp (paragraph @ 739px "We believe marketing doesnt have to...")');
console.log('  [need to measure - will do separately]');

console.log('\n\nTABLE 4: CTA BUTTON\n');
console.log(`Basalio (.btn-wrapper.btn-acid):`);
console.log(`  height: ${basalioData.cta.height}px`);
console.log(`  font-size: ${basalioData.cta.fontSize}`);
console.log(`  font-weight: ${basalioData.cta.fontWeight}`);
console.log(`  letter-spacing: ${basalioData.cta.letterSpacing}`);
console.log(`  text-transform: ${basalioData.cta.textTransform}`);
console.log('\nRamp: [depends on RM5a search results]');

console.log('\n\nTABLE 5: SECTION HEADING\n');
console.log(`Basalio (.courses-heading):`);
console.log(`  font-size: ${basalioData.sectionHeading.fontSize}`);
console.log(`  line-height: ${basalioData.sectionHeading.lineHeight} (${basalioData.sectionHeading.lineHeightRatio})`);
console.log(`  font-weight: ${basalioData.sectionHeading.fontWeight}`);
console.log(`  letter-spacing: ${basalioData.sectionHeading.letterSpacing}`);
console.log('\nRamp (H2 "What we do" @ 690px)');
console.log('  [need to measure - will do separately]');

console.log('\n\nTABLE 6: SECTION RHYTHM\n');
console.log('Basalio section offsets:');
basalioData.sectionOffsets.forEach((s, i) => {
  console.log(`  ${i+1}. "${s.heading}" @ ${s.yOffset}px`);
});
console.log('\nRamp section offsets (from RM4a):');
console.log('  1. "What we do" @ 690px');
console.log('  2. "Our Courses" @ 1304px (gap: +614px)');
console.log('  3. "Our Resources" @ 1988px (gap: +684px)');
console.log('  4. "Monthly Retainer" @ 2676px (gap: +688px)');
console.log('  5. "Testimonials" @ 3847px (gap: +1171px)');
console.log('  6. "FAQ" @ 4652px (gap: +805px)');

await page2.close();

// Now measure Ramp elements
const page3 = await browser.newPage();
await page3.setViewportSize({ width: 375, height: 812 });
await page3.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

await page3.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});

await page3.waitForTimeout(500);

const rampData = await page3.evaluate(() => {
  const results = {};
  
  // H1 "We turn strategy into growth" - take first h1
  const h1s = document.querySelectorAll('h1');
  if (h1s.length > 1) {
    const cs = window.getComputedStyle(h1s[1]);
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
  
  // Paragraph @ 739px "We believe marketing..."
  const paras = document.querySelectorAll('p');
  let bodyPara = null;
  for (const p of paras) {
    if (p.textContent.includes('We believe marketing')) {
      const cs = window.getComputedStyle(p);
      const lh = parseFloat(cs.lineHeight);
      const fs = parseFloat(cs.fontSize);
      results.body = {
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        lineHeightRatio: (lh / fs).toFixed(2),
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing
      };
      break;
    }
  }
  
  // H2 "What we do" @ 690px
  const h2s = document.querySelectorAll('h2');
  for (const h2 of h2s) {
    if (h2.textContent.includes('What we do')) {
      const cs = window.getComputedStyle(h2);
      const lh = parseFloat(cs.lineHeight);
      const fs = parseFloat(cs.fontSize);
      results.sectionHeading = {
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        lineHeightRatio: (lh / fs).toFixed(2),
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing
      };
      break;
    }
  }
  
  return results;
});

console.log('\n\nRAMP MEASURED VALUES:\n');
console.log('Heading (H1 "We turn"):', JSON.stringify(rampData.heading, null, 2));
console.log('Body paragraph:', JSON.stringify(rampData.body, null, 2));
console.log('Section heading (H2 "What we do"):', JSON.stringify(rampData.sectionHeading, null, 2));

await page3.close();
await browser.close();
