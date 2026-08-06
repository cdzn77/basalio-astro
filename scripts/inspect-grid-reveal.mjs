import { chromium } from 'playwright';

async function inspectGridReveal() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const info = await page.evaluate(() => {
    const gridReveal = document.querySelector('#grid-reveal');
    if (!gridReveal) return { error: 'grid-reveal not found' };

    const children = Array.from(gridReveal.children).map((child, idx) => ({
      index: idx,
      tag: child.tagName,
      className: child.className,
      scrollWidth: child.scrollWidth,
      offsetWidth: child.offsetWidth,
      overflow: child.scrollWidth - window.innerWidth
    }));

    return {
      gridRevealScrollWidth: gridReveal.scrollWidth,
      gridRevealOffsetWidth: gridReveal.offsetWidth,
      windowInnerWidth: window.innerWidth,
      children: children
    };
  });

  console.log(JSON.stringify(info, null, 2));

  await browser.close();
}

inspectGridReveal().catch(err => console.error(err.message));
