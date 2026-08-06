import { chromium } from 'playwright';

async function analyze() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const section3 = document.querySelectorAll('section')[3];
    const button = section3?.querySelector('.btn-wrapper');
    
    return {
      section3ClassName: section3?.className,
      buttonText: button?.textContent?.trim(),
      buttonScrollWidth: button?.scrollWidth,
      buttonComputedStyle: {
        width: window.getComputedStyle(button).width,
        maxWidth: window.getComputedStyle(button).maxWidth,
        whiteSpace: window.getComputedStyle(button).whiteSpace
      }
    };
  });

  console.log('/blocks section[3] button analysis:');
  console.log(JSON.stringify(result, null, 2));

  await browser.close();
}

analyze().catch(console.error);
