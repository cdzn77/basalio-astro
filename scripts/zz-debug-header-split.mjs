import { chromium } from 'playwright';

async function debug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const pricingSection = sections[3];
    const headerSplit = pricingSection?.querySelector('.header-split');
    
    // Get all children of header-split
    const children = Array.from(headerSplit?.children || []).map(el => ({
      tag: el.tagName,
      class: el.className.substring(0, 50),
      scrollWidth: el.scrollWidth,
      offsetWidth: el.offsetWidth,
      maxWidth: window.getComputedStyle(el).maxWidth,
      width: window.getComputedStyle(el).width
    }));

    return {
      headerSplit: {
        scrollWidth: headerSplit?.scrollWidth || 0,
        offsetWidth: headerSplit?.offsetWidth || 0,
        maxWidth: window.getComputedStyle(headerSplit).maxWidth,
        width: window.getComputedStyle(headerSplit).width,
        padding: window.getComputedStyle(headerSplit).padding
      },
      children
    };
  });

  console.log('HeaderSplit structure at 320px:\n');
  console.log(`HeaderSplit: scrollWidth=${data.headerSplit.scrollWidth}px, offsetWidth=${data.headerSplit.offsetWidth}px`);
  console.log(`  maxWidth=${data.headerSplit.maxWidth}, width=${data.headerSplit.width}, padding=${data.headerSplit.padding}\n`);
  
  console.log('Direct children:');
  data.children.forEach((child, idx) => {
    console.log(`  ${idx + 1}. <${child.tag}> scrollWidth=${child.scrollWidth}px`);
    if (child.class) console.log(`     class: ${child.class}`);
    if (child.width !== 'auto') console.log(`     width: ${child.width}, maxWidth: ${child.maxWidth}`);
  });

  await browser.close();
}

debug().catch(err => console.error(err.message));
