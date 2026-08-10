import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

const routes = ['/', '/blocks', '/pricing', '/hacks', '/support'];

console.log('=== BS1: BASALIO INTERNAL CONSISTENCY AT 375px ===\n');

for (const route of routes) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`ROUTE: ${route}`);
  console.log('='.repeat(60));

  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const results = {};

    // a) EYEBROW
    const eyebrow = document.querySelector('[class*="eyebrow"]');
    if (eyebrow) {
      const cs = window.getComputedStyle(eyebrow);
      results.eyebrow = {
        selector: eyebrow.className,
        textContent: eyebrow.textContent.substring(0, 30),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        marginBlockEnd: cs.marginBlockEnd
      };
    }

    // b) PAGE HEADING (H1)
    const h1 = document.querySelector('h1');
    if (h1) {
      const cs = window.getComputedStyle(h1);
      const fs = parseFloat(cs.fontSize);
      const ls = parseFloat(cs.letterSpacing);
      const em = ls === 0 ? '0em' : (ls / fs).toFixed(4) + 'em';
      results.h1 = {
        selector: h1.className || h1.tagName,
        textContent: h1.textContent.substring(0, 30),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        letterSpacingEm: em
      };
    }

    // c) SECTION HEADINGS (H2)
    const h2s = document.querySelectorAll('h2');
    results.h2s = [];
    h2s.forEach((h2, i) => {
      const cs = window.getComputedStyle(h2);
      const fs = parseFloat(cs.fontSize);
      const ls = parseFloat(cs.letterSpacing);
      const em = ls === 0 ? '0em' : (ls / fs).toFixed(4) + 'em';
      results.h2s.push({
        index: i + 1,
        selector: h2.className || h2.tagName,
        textContent: h2.textContent.substring(0, 30),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        letterSpacingEm: em
      });
    });

    // d) BODY PARAGRAPH
    const body = document.querySelector('p:not([class*="eyebrow"]):not([class*="label"])');
    if (body) {
      const cs = window.getComputedStyle(body);
      results.body = {
        selector: body.className || body.tagName,
        textContent: body.textContent.substring(0, 30),
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        fontWeight: cs.fontWeight
      };
    }

    // e) SECTION PADDING
    const sections = document.querySelectorAll('section, [class*="section"]');
    results.sectionPadding = [];
    sections.forEach((sec, i) => {
      const cs = window.getComputedStyle(sec);
      results.sectionPadding.push({
        index: i + 1,
        selector: sec.className || sec.tagName,
        paddingBlockStart: cs.paddingBlockStart,
        paddingBlockEnd: cs.paddingBlockEnd
      });
    });

    return results;
  });

  console.log('\na) EYEBROW:');
  if (data.eyebrow) {
    console.log(`   Selector: .${data.eyebrow.selector}`);
    console.log(`   Text: "${data.eyebrow.textContent}"`);
    console.log(`   font-size: ${data.eyebrow.fontSize}`);
    console.log(`   font-weight: ${data.eyebrow.fontWeight}`);
    console.log(`   letter-spacing: ${data.eyebrow.letterSpacing}`);
    console.log(`   margin-block-end: ${data.eyebrow.marginBlockEnd}`);
  } else {
    console.log('   [not found]');
  }

  console.log('\nb) PAGE HEADING (H1):');
  if (data.h1) {
    console.log(`   Selector: ${data.h1.selector}`);
    console.log(`   Text: "${data.h1.textContent}"`);
    console.log(`   font-size: ${data.h1.fontSize}`);
    console.log(`   font-weight: ${data.h1.fontWeight}`);
    console.log(`   letter-spacing: ${data.h1.letterSpacing}`);
    console.log(`   letter-spacing (em): ${data.h1.letterSpacingEm}`);
  } else {
    console.log('   [not found]');
  }

  console.log('\nc) SECTION HEADINGS (H2):');
  if (data.h2s.length === 0) {
    console.log('   [none found]');
  } else {
    data.h2s.forEach(h2 => {
      console.log(`   ${h2.index}. "${h2.textContent}" (.${h2.selector})`);
      console.log(`      ${h2.fontSize} | weight ${h2.fontWeight} | ${h2.letterSpacing} (${h2.letterSpacingEm})`);
    });
  }

  console.log('\nd) BODY PARAGRAPH:');
  if (data.body) {
    console.log(`   Selector: ${data.body.selector}`);
    console.log(`   Text: "${data.body.textContent}"`);
    console.log(`   font-size: ${data.body.fontSize}`);
    console.log(`   line-height: ${data.body.lineHeight}`);
    console.log(`   font-weight: ${data.body.fontWeight}`);
  } else {
    console.log('   [not found]');
  }

  console.log('\ne) SECTION PADDING:');
  if (data.sectionPadding.length === 0) {
    console.log('   [none found]');
  } else {
    data.sectionPadding.slice(0, 5).forEach(sec => {
      console.log(`   ${sec.index}. .${sec.selector}`);
      console.log(`      padding-block-start: ${sec.paddingBlockStart} | -end: ${sec.paddingBlockEnd}`);
    });
    if (data.sectionPadding.length > 5) {
      console.log(`   [... ${data.sectionPadding.length - 5} more sections]`);
    }
  }

  await page.close();
}

await browser.close();
