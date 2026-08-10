import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== BS2b: BODY PARAGRAPH SIZE ON /hacks (375px vs 1440px) ===\n');

// 375px measurement
const page1 = await browser.newPage();
await page1.setViewportSize({ width: 375, height: 812 });
await page1.goto('http://localhost:4321/hacks', { waitUntil: 'networkidle' });

const data375 = await page1.evaluate(() => {
  // Find body paragraph with textContent matching "Four effects..."
  const paragraphs = document.querySelectorAll('p');
  let target = null;
  for (const p of paragraphs) {
    if (p.textContent.includes('Four effects')) {
      target = p;
      break;
    }
  }
  
  if (!target) {
    return { error: 'Paragraph not found' };
  }
  
  const cs = window.getComputedStyle(target);
  return {
    textContent: target.textContent.substring(0, 50),
    selector: target.className || target.tagName,
    fontSize: cs.fontSize,
    lineHeight: cs.lineHeight,
    fontWeight: cs.fontWeight,
    letterSpacing: cs.letterSpacing,
    display: cs.display
  };
});

console.log('AT 375px:');
console.log(`  Selector: ${data375.selector}`);
console.log(`  Text: "${data375.textContent}"`);
console.log(`  font-size: ${data375.fontSize}`);
console.log(`  line-height: ${data375.lineHeight}`);
console.log(`  font-weight: ${data375.fontWeight}`);

await page1.close();

// 1440px measurement
const page2 = await browser.newPage();
await page2.setViewportSize({ width: 1440, height: 900 });
await page2.goto('http://localhost:4321/hacks', { waitUntil: 'networkidle' });

const data1440 = await page2.evaluate(() => {
  const paragraphs = document.querySelectorAll('p');
  let target = null;
  for (const p of paragraphs) {
    if (p.textContent.includes('Four effects')) {
      target = p;
      break;
    }
  }
  
  if (!target) {
    return { error: 'Paragraph not found' };
  }
  
  const cs = window.getComputedStyle(target);
  return {
    textContent: target.textContent.substring(0, 50),
    selector: target.className || target.tagName,
    fontSize: cs.fontSize,
    lineHeight: cs.lineHeight,
    fontWeight: cs.fontWeight,
    letterSpacing: cs.letterSpacing,
    display: cs.display
  };
});

console.log('\nAT 1440px:');
console.log(`  Selector: ${data1440.selector}`);
console.log(`  Text: "${data1440.textContent}"`);
console.log(`  font-size: ${data1440.fontSize}`);
console.log(`  line-height: ${data1440.lineHeight}`);
console.log(`  font-weight: ${data1440.fontWeight}`);

await page2.close();

// Check for media queries
console.log('\n\n=== MEDIA QUERIES AFFECTING BODY PARAGRAPH ===\n');

const page3 = await browser.newPage();
await page3.goto('http://localhost:4321/hacks', { waitUntil: 'networkidle' });

const mediaQueries = await page3.evaluate(() => {
  const sheets = document.styleSheets;
  const found = [];
  
  for (let i = 0; i < sheets.length; i++) {
    try {
      const rules = sheets[i].cssRules;
      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        if (rule.media && rule.media.mediaText.includes('375') || rule.media.mediaText.includes('640')) {
          if (rule.cssRules) {
            for (let k = 0; k < rule.cssRules.length; k++) {
              const subrule = rule.cssRules[k];
              if (subrule.style && subrule.style.fontSize) {
                found.push({
                  media: rule.media.mediaText,
                  selector: subrule.selectorText,
                  fontSize: subrule.style.fontSize
                });
              }
            }
          }
        }
      }
    } catch (e) {
      // CORS or access error, skip
    }
  }
  
  return found;
});

if (mediaQueries.length > 0) {
  console.log('Found media queries affecting font-size:');
  mediaQueries.forEach(mq => {
    console.log(`  ${mq.media}: ${mq.selector} { font-size: ${mq.fontSize}; }`);
  });
} else {
  console.log('No media queries found (or CORS blocked access)');
}

await page3.close();

console.log('\n\n=== ANALYSIS ===\n');
console.log(`375px value: ${data375.fontSize}`);
console.log(`1440px value: ${data1440.fontSize}`);
console.log(`Same? ${data375.fontSize === data1440.fontSize}`);

if (data375.fontSize !== data1440.fontSize) {
  console.log('\nCONCLUSION: Body copy is RESPONSIVE.');
  console.log(`  Mobile (375px): ${data375.fontSize}`);
  console.log(`  Desktop (1440px): ${data1440.fontSize}`);
  console.log('  This explains the conflict: BC5/GR19 measured desktop (18px), BS1 measured mobile (14px).');
} else {
  console.log('\nCONCLUSION: Body copy is UNIFORM (no responsive change).');
}

await browser.close();
