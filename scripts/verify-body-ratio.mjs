import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Check /support for a plain <p> tag
await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

const results = await page.evaluate(() => {
  const accordion = document.querySelector('.accordion-answer');
  const contactText = document.querySelector('.contact-text');
  const plainP = document.querySelector('section p');
  
  const check = (elem, label) => {
    if (elem) {
      const s = window.getComputedStyle(elem);
      return {
        label,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        ratio: (parseInt(s.lineHeight) / parseInt(s.fontSize)).toFixed(2)
      };
    }
    return null;
  };
  
  return [
    check(accordion, '.accordion-answer'),
    check(contactText, '.contact-text'),
    check(plainP, 'first p in section')
  ].filter(Boolean);
});

console.log('Body copy line-height audit at /support:');
results.forEach(r => {
  console.log(`${r.label}: ${r.fontSize} / ${r.lineHeight} = ${r.ratio}`);
});

await browser.close();
