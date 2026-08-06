import { chromium } from 'playwright';

async function zz2() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // ZZ2.1: Confirm current font-size
  console.log('═'.repeat(70));
  console.log('ZZ2.1: Current hero heading font-size at 320px');
  console.log('═'.repeat(70) + '\n');

  const current = await page.evaluate(() => {
    const heading = document.querySelector('.hero-heading');
    const computed = window.getComputedStyle(heading);
    const accentWord = document.querySelector('.accent-word');
    const accentRect = accentWord?.getBoundingClientRect();
    return {
      heading: {
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing
      },
      accentWord: {
        width: Math.ceil(accentRect?.width || 0),
        height: Math.ceil(accentRect?.height || 0),
        text: accentWord?.textContent || ''
      }
    };
  });

  console.log(`Hero heading font-size: ${current.heading.fontSize}`);
  console.log(`Line-height: ${current.heading.lineHeight}`);
  console.log(`Letter-spacing: ${current.heading.letterSpacing}`);
  console.log(`Accent-word "${current.accentWord.text}": ${current.accentWord.width}px wide × ${current.accentWord.height}px tall\n`);

  // ZZ2.2(a): Test clamp(40px, 8vw, 96px)
  console.log('─'.repeat(70));
  console.log('ZZ2.2(a): Test clamp(40px, 8vw, 96px)');
  console.log('─'.repeat(70) + '\n');

  await page.addStyleTag({
    content: `.hero-heading { font-size: clamp(40px, 8vw, 96px) !important; }`
  });
  await page.waitForTimeout(300);

  const optionA = await page.evaluate(() => {
    const heading = document.querySelector('.hero-heading');
    const computed = window.getComputedStyle(heading);
    const accentWord = document.querySelector('.accent-word');
    const accentRect = accentWord?.getBoundingClientRect();
    return {
      fontSize: computed.fontSize,
      accentWordWidth: Math.ceil(accentRect?.width || 0),
      accentWord: accentWord?.textContent || ''
    };
  });

  console.log(`Font-size at 40px minimum: ${optionA.fontSize}`);
  console.log(`Accent-word "${optionA.accentWord}": ${optionA.accentWordWidth}px wide`);
  console.log(`Overflow at 320px viewport: ${Math.max(0, optionA.accentWordWidth - 320)}px\n`);

  await page.screenshot({ path: '/private/tmp/zz2-option-a-40px.png', fullPage: true });
  console.log('Screenshot saved: /private/tmp/zz2-option-a-40px.png\n');

  // ZZ2.2(b): Test overflow-wrap: break-word
  console.log('─'.repeat(70));
  console.log('ZZ2.2(b): Test overflow-wrap: break-word');
  console.log('─'.repeat(70) + '\n');

  // Reset font-size to current
  await page.addStyleTag({
    content: `.hero-heading { font-size: clamp(48px, 8vw, 96px) !important; overflow-wrap: break-word !important; word-break: break-word !important; }`
  });
  await page.waitForTimeout(300);

  const optionB = await page.evaluate(() => {
    const heading = document.querySelector('.hero-heading');
    return {
      fontSize: window.getComputedStyle(heading).fontSize,
      height: Math.ceil(heading.offsetHeight),
      text: heading.textContent.substring(0, 80) || ''
    };
  });

  console.log(`Font-size (original clamp): ${optionB.fontSize}`);
  console.log(`Heading height with break-word: ${optionB.height}px`);
  console.log(`Text preview: "${optionB.text}"\n`);

  await page.screenshot({ path: '/private/tmp/zz2-option-b-breakword.png', fullPage: true });
  console.log('Screenshot saved: /private/tmp/zz2-option-b-breakword.png\n');

  // ZZ2.2(c): Test media query @media (max-width: 375px)
  console.log('─'.repeat(70));
  console.log('ZZ2.2(c): Test @media (max-width: 375px) with 40px fixed');
  console.log('─'.repeat(70) + '\n');

  await page.addStyleTag({
    content: `@media (max-width: 375px) { .hero-heading { font-size: 40px !important; } }`
  });
  await page.waitForTimeout(300);

  const optionC = await page.evaluate(() => {
    const heading = document.querySelector('.hero-heading');
    const computed = window.getComputedStyle(heading);
    const accentWord = document.querySelector('.accent-word');
    const accentRect = accentWord?.getBoundingClientRect();
    return {
      fontSize: computed.fontSize,
      accentWordWidth: Math.ceil(accentRect?.width || 0),
      accentWord: accentWord?.textContent || ''
    };
  });

  console.log(`Font-size below 375px: ${optionC.fontSize}`);
  console.log(`Accent-word "${optionC.accentWord}": ${optionC.accentWordWidth}px wide`);
  console.log(`Overflow at 320px viewport: ${Math.max(0, optionC.accentWordWidth - 320)}px\n`);

  await page.screenshot({ path: '/private/tmp/zz2-option-c-375-media-query.png', fullPage: true });
  console.log('Screenshot saved: /private/tmp/zz2-option-c-375-media-query.png\n');

  await browser.close();

  console.log('═'.repeat(70));
  console.log('ZZ2.2 SUMMARY');
  console.log('═'.repeat(70));
  console.log(`(a) clamp(40px, 8vw, 96px): accent-word ${optionA.accentWordWidth}px, overflow ${Math.max(0, optionA.accentWordWidth - 320)}px`);
  console.log(`(b) overflow-wrap: break-word: heading height ${optionB.height}px`);
  console.log(`(c) @media (max-width: 375px) 40px: accent-word ${optionC.accentWordWidth}px, overflow ${Math.max(0, optionC.accentWordWidth - 320)}px`);
}

zz2().catch(err => console.error(err.message));
