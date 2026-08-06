import { chromium } from 'playwright';

async function debug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const headerSplitInner = document.querySelector('.header-split-inner');
    
    const children = Array.from(headerSplitInner?.children || []).map(el => {
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        class: el.className.substring(0, 40),
        scrollWidth: el.scrollWidth,
        offsetWidth: el.offsetWidth,
        display: style.display,
        flex: style.flex,
        flexBasis: style.flexBasis
      };
    });

    return {
      headerSplitInner: {
        scrollWidth: headerSplitInner?.scrollWidth || 0,
        offsetWidth: headerSplitInner?.offsetWidth || 0
      },
      children
    };
  });

  console.log('Header-split-inner children at 320px:\n');
  data.children.forEach((child, idx) => {
    console.log(`${idx + 1}. <${child.tag}> scrollWidth=${child.scrollWidth}px, offsetWidth=${child.offsetWidth}px`);
    console.log(`   class: ${child.class}`);
    console.log(`   display: ${child.display}, flex: ${child.flex}`);
  });

  await browser.close();
}

debug().catch(err => console.error(err.message));
