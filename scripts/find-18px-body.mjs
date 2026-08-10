import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

async function checkRoute(route) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const allElements = await page.evaluate(() => {
    const elements = document.querySelectorAll('p, div, span');
    const results = [];
    for (const el of elements) {
      const s = window.getComputedStyle(el);
      const fontSize = s.fontSize;
      if (fontSize === '18px') {
        results.push({
          tag: el.tagName,
          className: el.className,
          fontSize,
          lineHeight: s.lineHeight,
          text: el.textContent.substring(0, 50)
        });
        if (results.length >= 3) break;
      }
    }
    return results;
  });

  console.log(`${route} - 18px elements:`);
  allElements.forEach((el, i) => {
    console.log(`  [${i}] <${el.tag} class="${el.className}"> ${el.fontSize} / ${el.lineHeight}`);
  });

  await page.close();
}

await checkRoute('/hacks');
await checkRoute('/roadmap');

await browser.close();
