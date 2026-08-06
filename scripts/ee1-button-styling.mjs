import { chromium } from 'playwright';

async function analyzeButtonStyling() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/welcome', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const btn = document.querySelector('.btn-wrapper');
    const label = btn?.querySelector('.btn-label') || btn?.querySelector('.btn-text') || btn;
    const cs = window.getComputedStyle(btn);
    const labelCS = window.getComputedStyle(label);

    return {
      button: {
        tag: btn?.tagName,
        class: btn?.className,
        scrollWidth: btn?.scrollWidth,
        offsetWidth: btn?.offsetWidth,
        height: cs.height,
        padding: `${cs.paddingTop}/${cs.paddingRight}/${cs.paddingBottom}/${cs.paddingLeft}`,
        whiteSpace: cs.whiteSpace,
        letterSpacing: cs.letterSpacing,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        overflow: cs.overflow
      },
      label: {
        text: label?.textContent?.trim(),
        whiteSpace: labelCS.whiteSpace,
        letterSpacing: labelCS.letterSpacing,
        fontSize: labelCS.fontSize,
        overflow: labelCS.overflow,
        wordBreak: labelCS.wordBreak
      }
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('EE1: Button styling @ 375px (/welcome section[0])');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('Button element:');
  console.log(`  Tag: <${result.button.tag}.${result.button.class}>`);
  console.log(`  scrollWidth: ${result.button.scrollWidth}px, offsetWidth: ${result.button.offsetWidth}px`);
  console.log(`  height: ${result.button.height}`);
  console.log(`  padding: ${result.button.padding}`);
  console.log(`  white-space: ${result.button.whiteSpace}`);
  console.log(`  letter-spacing: ${result.button.letterSpacing}`);
  console.log(`  font-size: ${result.button.fontSize}`);
  console.log(`  line-height: ${result.button.lineHeight}`);
  console.log(`  overflow: ${result.button.overflow}\n`);

  console.log('Label/text content:');
  console.log(`  Text: "${result.label.text}"`);
  console.log(`  white-space: ${result.label.whiteSpace}`);
  console.log(`  letter-spacing: ${result.label.letterSpacing}`);
  console.log(`  font-size: ${result.label.fontSize}`);
  console.log(`  word-break: ${result.label.wordBreak}`);
  console.log(`  overflow: ${result.label.overflow}`);

  await browser.close();
}

analyzeButtonStyling().catch(console.error);
