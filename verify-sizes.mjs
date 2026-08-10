import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const h1 = document.querySelector('h1.heading');
    const h2 = document.querySelector('h2.heading');
    const h1Computed = window.getComputedStyle(h1);
    const h2Computed = window.getComputedStyle(h2);
    return {
      h1Title: h1.textContent?.slice(0, 40),
      h1FontSize: h1Computed.fontSize,
      h2Title: h2.textContent?.slice(0, 40),
      h2FontSize: h2Computed.fontSize,
    };
  });

  console.log('Page title (h1):', result.h1Title);
  console.log('  Font-size:', result.h1FontSize);
  console.log('Section heading (h2):', result.h2Title);
  console.log('  Font-size:', result.h2FontSize);

  await browser.close();
})();
