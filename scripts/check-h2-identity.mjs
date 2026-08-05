import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const h2Info = await page.evaluate(() => {
  const h2 = document.querySelector('h2');
  if (!h2) return { error: 'No h2 found' };
  return {
    tagName: h2.tagName,
    className: h2.className,
    id: h2.id,
    textContent: h2.textContent.substring(0, 50),
    fontSize: window.getComputedStyle(h2).fontSize,
    allClasses: Array.from(h2.classList)
  };
});

console.log('First H2 on /:\n', JSON.stringify(h2Info, null, 2));

await browser.close();
