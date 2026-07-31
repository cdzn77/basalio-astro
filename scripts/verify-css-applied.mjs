import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

// Check first few links
const linkStyles = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll('a')).slice(0, 5);
  return links.map(link => ({
    text: link.textContent.trim().substring(0, 20),
    color: window.getComputedStyle(link).color,
    textDecoration: window.getComputedStyle(link).textDecoration,
    textDecorationColor: window.getComputedStyle(link).textDecorationColor,
    textUnderlineOffset: window.getComputedStyle(link).textUnderlineOffset
  }));
});

console.log('\nCSS VERIFICATION — /support');
console.log('============================\n');

linkStyles.forEach(link => {
  console.log(`"${link.text}":`);
  console.log(`  Text decoration: ${link.textDecoration}`);
  console.log(`  Color: ${link.color}`);
  console.log(`  Decoration color: ${link.textDecorationColor}`);
  console.log(`  Underline offset: ${link.textUnderlineOffset}`);
  console.log();
});

await browser.close();
