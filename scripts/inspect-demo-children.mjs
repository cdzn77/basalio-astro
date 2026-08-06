import { chromium } from 'playwright';

async function inspectChildren() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const info = await page.evaluate(() => {
    const demoContainer = document.querySelector('.demo-container');
    if (!demoContainer) return { error: 'demo-container not found' };

    // Check all descendants for overflow
    const checkElement = (el, path = '') => {
      const scroll = el.scrollWidth;
      const offset = el.offsetWidth;
      const vp = window.innerWidth;
      const name = el.className || el.tagName;
      
      if (scroll > vp) {
        return {
          path: path + ' > ' + name,
          scrollWidth: scroll,
          offsetWidth: offset,
          overflow: scroll - vp
        };
      }
      
      const results = [];
      Array.from(el.children).forEach((child, idx) => {
        const sub = checkElement(child, path + ' > ' + name);
        if (Array.isArray(sub)) results.push(...sub);
        else if (sub) results.push(sub);
      });
      return results;
    };

    return checkElement(demoContainer);
  });

  console.log('Elements forcing 448px width:\n');
  if (Array.isArray(info)) {
    info.forEach(item => {
      console.log(`${item.path}`);
      console.log(`  scrollWidth: ${item.scrollWidth}px, overflow: ${item.overflow}px\n`);
    });
  } else {
    console.log(JSON.stringify(info, null, 2));
  }

  await browser.close();
}

inspectChildren().catch(err => console.error(err.message));
