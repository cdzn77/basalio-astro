import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://localhost:4321/support', { waitUntil: 'networkidle' });

const linkStyles = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll('a')).slice(0, 3);
  return links.map(link => ({
    text: link.textContent.trim().substring(0, 15),
    textDecoration: window.getComputedStyle(link).textDecoration
  }));
});

linkStyles.forEach(link => {
  const hasUnderline = link.textDecoration.includes('underline');
  console.log(`"${link.text}": ${hasUnderline ? '✓' : '✗'} ${link.textDecoration.substring(0, 20)}`);
});

await browser.close();
