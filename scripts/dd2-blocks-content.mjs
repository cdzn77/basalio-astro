import { chromium } from 'playwright';

async function analyze() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const section2 = document.querySelectorAll('section')[2];
    const directChildren = Array.from(section2?.children || []).map(el => ({
      tag: el.tagName,
      class: el.className.split(' ').slice(0, 2).join(' '),
      scrollWidth: el.scrollWidth,
      offsetWidth: el.offsetWidth
    }));

    // Find deepest overflowing element
    const allDesc = section2?.querySelectorAll('*') || [];
    const deepest = Array.from(allDesc)
      .filter(el => el.scrollWidth > 375)
      .reduce((a, b) => (a.offsetWidth > b.offsetWidth ? a : b), null);

    return {
      section2ScrollWidth: section2?.scrollWidth,
      directChildren: directChildren,
      deepestOverflow: deepest ? {
        tag: deepest.tagName,
        class: deepest.className,
        scrollWidth: deepest.scrollWidth,
        offsetWidth: deepest.offsetWidth,
        parent: deepest.parentElement?.className
      } : null
    };
  });

  console.log('/blocks section[2] content analysis @ 375px:');
  console.log(`Section scrollWidth: ${result.section2ScrollWidth}px\n`);
  console.log('Direct children:');
  result.directChildren.forEach((child, i) => {
    console.log(`  [${i}] <${child.tag}.${child.class}> scrollWidth=${child.scrollWidth}px`);
  });
  console.log(`\nDeepest overflowing element:`);
  if (result.deepestOverflow) {
    console.log(`  <${result.deepestOverflow.tag}.${result.deepestOverflow.class}>`);
    console.log(`  scrollWidth: ${result.deepestOverflow.scrollWidth}px`);
    console.log(`  Parent: ${result.deepestOverflow.parent}`);
  }

  await browser.close();
}

analyze().catch(console.error);
