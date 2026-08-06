import { chromium } from 'playwright';

async function diagnoseRoute(route, viewport, sectionIdx) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: viewport, height: 900 });
  await page.goto(`http://localhost:4322${route}`, { waitUntil: 'networkidle' });

  // Assert viewport
  const actual = await page.evaluate(() => window.innerWidth);
  if (actual !== viewport) throw new Error(`Viewport mismatch: ${actual}px`);

  const result = await page.evaluate((idx) => {
    const sections = document.querySelectorAll('section');
    const section = sections[idx];
    if (!section) return null;

    const children = section.querySelectorAll('*');
    const overflowingElements = Array.from(children)
      .filter(el => el.scrollWidth > window.innerWidth)
      .slice(0, 15)
      .map(el => ({
        tag: el.tagName,
        class: el.className.slice(0, 40),
        scrollWidth: el.scrollWidth,
        offsetWidth: el.offsetWidth,
        width: window.getComputedStyle(el).width,
        marginLeft: window.getComputedStyle(el).marginLeft,
        marginRight: window.getComputedStyle(el).marginRight,
        paddingLeft: window.getComputedStyle(el).paddingLeft,
        paddingRight: window.getComputedStyle(el).paddingRight,
        boxShadow: window.getComputedStyle(el).boxShadow,
        position: window.getComputedStyle(el).position
      }));

    return {
      sectionScrollWidth: section.scrollWidth,
      innerWidth: window.innerWidth,
      topOverflowers: overflowingElements
    };
  }, sectionIdx);

  await browser.close();
  return result;
}

// Diagnose /welcome section[0]
console.log('═══════════════════════════════════════════════════════');
console.log('CC3: /welcome section[0] @ 375px (priority: waitlist redirect)');
console.log('═══════════════════════════════════════════════════════\n');

const welcomeResult = await diagnoseRoute('/welcome', 375, 0);
console.log(`section[0] scrollWidth: ${welcomeResult.sectionScrollWidth}px`);
console.log(`Viewport innerWidth: ${welcomeResult.innerWidth}px`);
console.log(`Overflow: ${welcomeResult.sectionScrollWidth - welcomeResult.innerWidth}px\n`);
console.log('Overflowing elements:');
welcomeResult.topOverflowers.forEach((el, i) => {
  console.log(`\n[${i}] <${el.tag}.${el.class}>`);
  console.log(`    scrollWidth: ${el.scrollWidth}px, offsetWidth: ${el.offsetWidth}px`);
  console.log(`    width: ${el.width} | margin: ${el.marginLeft}/${el.marginRight}`);
  console.log(`    padding: ${el.paddingLeft}/${el.paddingRight} | box-shadow: ${el.boxShadow}`);
  console.log(`    position: ${el.position}`);
});

// Diagnose / section[3]
console.log('\n═══════════════════════════════════════════════════════');
console.log('CC2: / section[3] @ 375px');
console.log('═══════════════════════════════════════════════════════\n');

const homeResult = await diagnoseRoute('/', 375, 3);
console.log(`section[3] scrollWidth: ${homeResult.sectionScrollWidth}px`);
console.log(`Viewport innerWidth: ${homeResult.innerWidth}px`);
console.log(`Overflow: ${homeResult.sectionScrollWidth - homeResult.innerWidth}px\n`);
console.log('Overflowing elements:');
homeResult.topOverflowers.forEach((el, i) => {
  console.log(`\n[${i}] <${el.tag}.${el.class}>`);
  console.log(`    scrollWidth: ${el.scrollWidth}px, offsetWidth: ${el.offsetWidth}px`);
  console.log(`    width: ${el.width} | margin: ${el.marginLeft}/${el.marginRight}`);
  console.log(`    padding: ${el.paddingLeft}/${el.paddingRight} | box-shadow: ${el.boxShadow}`);
  console.log(`    position: ${el.position}`);
});

// Diagnose /blocks section[2]
console.log('\n═══════════════════════════════════════════════════════');
console.log('CC2: /blocks section[2] @ 375px');
console.log('═══════════════════════════════════════════════════════\n');

const blocksResult = await diagnoseRoute('/blocks', 375, 2);
console.log(`section[2] scrollWidth: ${blocksResult.sectionScrollWidth}px`);
console.log(`Viewport innerWidth: ${blocksResult.innerWidth}px`);
console.log(`Overflow: ${blocksResult.sectionScrollWidth - blocksResult.innerWidth}px\n`);
console.log('Overflowing elements:');
blocksResult.topOverflowers.forEach((el, i) => {
  console.log(`\n[${i}] <${el.tag}.${el.class}>`);
  console.log(`    scrollWidth: ${el.scrollWidth}px, offsetWidth: ${el.offsetWidth}px`);
  console.log(`    width: ${el.width} | margin: ${el.marginLeft}/${el.marginRight}`);
  console.log(`    padding: ${el.paddingLeft}/${el.paddingRight} | box-shadow: ${el.boxShadow}`);
  console.log(`    position: ${el.position}`);
});
