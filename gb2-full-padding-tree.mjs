import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function checkFullTree() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const tree = await page.evaluate(() => {
    const coursesRight = document.querySelector('.courses-right');
    let element = coursesRight;
    const path = [];

    while (element && element !== document.body) {
      const computed = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      
      path.push({
        tag: element.tagName,
        class: element.className || '(no class)',
        width: element.offsetWidth,
        paddingL: computed.paddingLeft,
        paddingR: computed.paddingRight,
        marginL: computed.marginLeft,
        marginR: computed.marginRight,
        boundingWidth: Math.round(rect.width)
      });
      
      element = element.parentElement;
    }

    return path;
  });

  console.log('DOM tree from .courses-right up to body:');
  tree.forEach((item, idx) => {
    console.log(`${idx}: ${item.tag} (${item.class}) | W=${item.width}px | pL=${item.paddingL} pR=${item.paddingR}`);
  });

  // Calculate effective available space
  const coursesRight = tree[0];
  const coursesInner = tree[1];
  console.log(`\nEffective space:`);
  console.log(`  .courses-right width: ${coursesRight.width}px`);
  console.log(`  .courses-inner width: ${coursesInner.width}px`);
  console.log(`  Viewport width: 375px`);

  await browser.close();
}

checkFullTree().catch(console.error);
