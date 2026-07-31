import { chromium } from 'playwright';

async function check(browser) {
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/pricing', { waitUntil: 'networkidle' });
  
  const result = await page.evaluate(() => {
    const baseMain = document.querySelector('.base-main');
    const sections = baseMain.querySelectorAll('section');
    return {
      totalSections: sections.length,
      lastSection: {
        class: sections[sections.length - 1].className,
        styles: {
          radius: window.getComputedStyle(sections[sections.length - 1]).borderBottomLeftRadius,
          margin: window.getComputedStyle(sections[sections.length - 1]).marginBottom
        }
      },
      lastOfType: {
        class: baseMain.querySelector('section:last-of-type').className,
        styles: {
          radius: window.getComputedStyle(baseMain.querySelector('section:last-of-type')).borderBottomLeftRadius,
          margin: window.getComputedStyle(baseMain.querySelector('section:last-of-type')).marginBottom
        }
      }
    };
  });
  
  await page.close();
  return result;
}

const browser = await chromium.launch();
const data = await check(browser);
console.log(JSON.stringify(data, null, 2));
await browser.close();
