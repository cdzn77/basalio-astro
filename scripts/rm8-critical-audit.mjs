import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== RM8b: LETTER-SPACING RATIO VERIFICATION ===\n');

console.log('RAMP:');
console.log('  Hero H1 (44px) / -0.88px = -0.88 ÷ 44 = -0.02em');
console.log('  H3 (28px) / -0.56px = -0.56 ÷ 28 = -0.02em');
console.log('\nBASALIO:');
console.log('  Section heading (40px) / -0.8px = -0.8 ÷ 40 = -0.02em');
console.log('  Hero heading (48px) / normal = 0 ÷ 48 = 0em');
console.log('\nCONCLUSION: Ramp standardizes headings at -0.02em. Basalio uses -0.02em for section headings but 0em for hero. Inconsistency confirmed.');

console.log('\n\n=== RM8c: RAMP BODY PARAGRAPH SIZES (all <p> elements) ===\n');

const page1 = await browser.newPage();
await page1.setViewportSize({ width: 375, height: 812 });
await page1.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

await page1.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});

await page1.waitForTimeout(500);

const allParagraphs = await page1.evaluate(() => {
  const results = [];
  const paragraphs = document.querySelectorAll('p');
  
  paragraphs.forEach(p => {
    if (p.textContent.trim().length > 5) {
      const cs = window.getComputedStyle(p);
      const rect = p.getBoundingClientRect();
      const yOffset = window.scrollY + rect.top;
      results.push({
        text: p.textContent.substring(0, 40),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        yOffset: Math.round(yOffset)
      });
    }
  });
  
  return results;
});

// Group by font size
const sizeGroups = {};
allParagraphs.forEach(p => {
  const size = p.fontSize;
  if (!sizeGroups[size]) sizeGroups[size] = [];
  sizeGroups[size].push(p);
});

console.log('Ramp paragraphs by font-size:\n');
Object.keys(sizeGroups).sort().forEach(size => {
  console.log(`${size}:`);
  sizeGroups[size].forEach((p, i) => {
    console.log(`  ${i+1}. "${p.text}..." @ ${p.yOffset}px`);
  });
  console.log(`  [${sizeGroups[size].length} total at ${size}]`);
  console.log();
});

console.log(`TOTAL DISTINCT SIZES: ${Object.keys(sizeGroups).length}`);
console.log(`SIZE DISTRIBUTION:`, Object.entries(sizeGroups).map(([sz, items]) => `${sz} (${items.length})`).join(', '));

await page1.close();

console.log('\n\n=== RM8d: EYEBROW→HEADING GAP MEASUREMENT ===\n');

const page2 = await browser.newPage();
await page2.setViewportSize({ width: 375, height: 812 });
await page2.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const basalioGap = await page2.evaluate(() => {
  const eyebrow = document.querySelector('.courses-eyebrow');
  const heading = document.querySelector('.courses-heading');
  
  if (!eyebrow || !heading) {
    return { error: 'Eyebrow or heading not found' };
  }
  
  const eyebrowRect = eyebrow.getBoundingClientRect();
  const headingRect = heading.getBoundingClientRect();
  
  const eyebrowBottom = eyebrowRect.bottom;
  const headingTop = headingRect.top;
  
  const gap = Math.round(headingTop - eyebrowBottom);
  
  return {
    eyebrow: {
      text: eyebrow.textContent.substring(0, 30),
      top: Math.round(eyebrowRect.top),
      bottom: Math.round(eyebrowRect.bottom),
      height: Math.round(eyebrowRect.height)
    },
    heading: {
      text: heading.textContent.substring(0, 30),
      top: Math.round(headingRect.top),
      bottom: Math.round(headingRect.bottom),
      height: Math.round(headingRect.height)
    },
    gap: gap
  };
});

console.log('BASALIO:');
console.log(`  Eyebrow: "${basalioGap.eyebrow.text}"`);
console.log(`    top: ${basalioGap.eyebrow.top}px, height: ${basalioGap.eyebrow.height}px`);
console.log(`  Heading: "${basalioGap.heading.text}"`);
console.log(`    top: ${basalioGap.heading.top}px, height: ${basalioGap.heading.height}px`);
console.log(`  Gap (eyebrow bottom → heading top): ${basalioGap.gap}px`);

console.log('\nRAMP (from RM6b):');
console.log(`  Eyebrow: "Our Courses" @ 1304px`);
console.log(`  Heading: "Courses for Digital Creatives" @ 1324px`);
console.log(`  Gap: 20px`);

console.log('\nCOMPARISON:');
console.log(`  Ramp eyebrow→heading gap: 20px`);
console.log(`  Basalio eyebrow→heading gap: ${basalioGap.gap}px`);
console.log(`  Difference: ${Math.abs(basalioGap.gap - 20)}px`);

await page2.close();
await browser.close();
