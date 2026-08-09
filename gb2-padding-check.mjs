import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function checkPadding() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const paddingInfo = await page.evaluate(() => {
    const coursesRight = document.querySelector('.courses-right');
    if (!coursesRight) return null;

    const parent = coursesRight.parentElement;
    const computed = window.getComputedStyle(parent);
    const rect = parent.getBoundingClientRect();

    return {
      parentTagName: parent.tagName,
      parentClass: parent.className,
      paddingLeft: computed.paddingLeft,
      paddingRight: computed.paddingRight,
      paddingTop: computed.paddingTop,
      paddingBottom: computed.paddingBottom,
      parentWidth: parent.offsetWidth,
      coursesRightWidth: coursesRight.offsetWidth,
      parentBoundingWidth: rect.width
    };
  });

  console.log('Parent element padding:');
  console.log(paddingInfo);

  await browser.close();
}

checkPadding().catch(console.error);
