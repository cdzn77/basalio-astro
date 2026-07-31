import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const failures = await page.evaluate(() => {
  const links = document.querySelectorAll('a');
  const results = [];

  links.forEach((link) => {
    const rect = link.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Check if inline (inside paragraph or list)
    const inlineParagraph = link.closest('p');
    const inlineList = link.closest('li:not([class*="footer"])');
    const isInline = inlineParagraph || (inlineList && !inlineList.className.includes('footer'));

    if (rect.width < 24 || rect.height < 24) {
      results.push({
        text: link.textContent.trim().substring(0, 25),
        size: `${Math.round(rect.width)}×${Math.round(rect.height)}`,
        classes: link.className,
        isInline,
        parent: link.parentElement.tagName + (link.parentElement.className ? '.' + link.parentElement.className : '')
      });
    }
  });

  return results.slice(0, 15);
});

console.log('\nFAILING LINKS ON / (First 15)');
console.log('=============================\n');

failures.forEach(f => {
  console.log(`${f.text.padEnd(26)} | ${f.size.padEnd(10)} | ${f.parent}`);
  if (f.classes) console.log(`  → classes: ${f.classes}`);
  console.log();
});

await browser.close();
