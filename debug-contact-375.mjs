import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.setViewportSize({ width: 375, height: 900 });
await page.goto('http://localhost:4321/contact', { waitUntil: 'networkidle' });

const result = await page.evaluate(() => {
  const sections = Array.from(document.querySelectorAll('section'));
  return {
    totalSections: sections.length,
    sections: sections.map((s, i) => ({
      index: i,
      classes: s.className,
      scrollWidth: s.scrollWidth,
      innerWidth: window.innerWidth,
      pass: s.scrollWidth <= window.innerWidth
    }))
  };
});

console.log(`Total sections at 375px: ${result.totalSections}`);
result.sections.forEach(s => {
  console.log(`  [${s.index}] classes="${s.classes}" scrollWidth=${s.scrollWidth} innerWidth=${s.innerWidth} pass=${s.pass}`);
});

await browser.close();
