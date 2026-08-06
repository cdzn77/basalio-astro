import { chromium } from 'playwright';

async function ww2() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const hero = document.querySelector('.hero, [class*="hero"], section:first-of-type');
    const cta = hero?.querySelector('[class*="btn"], a[href*="blocks"]');
    
    // Find all children and check their widths
    const children = hero?.children ? Array.from(hero.children).map((child, idx) => ({
      index: idx,
      tag: child.tagName,
      className: child.className.substring(0, 40),
      scrollWidth: child.scrollWidth,
      offsetWidth: child.offsetWidth,
      computed: {
        width: window.getComputedStyle(child).width,
        padding: window.getComputedStyle(child).padding,
        margin: window.getComputedStyle(child).margin,
        minWidth: window.getComputedStyle(child).minWidth
      }
    })) : [];

    // Find deepest overflowing element
    const getDeepest = (el, path = []) => {
      if (el.scrollWidth > 320) {
        return {
          path: path.map(e => e.tagName + (e.className ? '.' + e.className.split(' ')[0] : '')).join(' > '),
          scrollWidth: el.scrollWidth,
          offsetWidth: el.offsetWidth,
          computed: {
            width: window.getComputedStyle(el).width,
            minWidth: window.getComputedStyle(el).minWidth,
            padding: window.getComputedStyle(el).padding,
            margin: window.getComputedStyle(el).margin
          }
        };
      }
      
      let deepest = null;
      for (const child of el.children) {
        const result = getDeepest(child, [...path, el]);
        if (result) deepest = result;
      }
      return deepest;
    };

    return {
      heroScrollWidth: hero?.scrollWidth,
      heroOffsetWidth: hero?.offsetWidth,
      ctaInfo: cta ? {
        tag: cta.tagName,
        class: cta.className.substring(0, 40),
        text: cta.textContent.substring(0, 20),
        width: window.getComputedStyle(cta).width,
        scrollWidth: cta.scrollWidth,
        offsetWidth: cta.offsetWidth
      } : null,
      children,
      deepestOverflow: getDeepest(hero)
    };
  });

  console.log('WW2: Hero overflow diagnosis at 320px\n');
  console.log('Hero container:');
  console.log(`  scrollWidth: ${data.heroScrollWidth}px (viewport 320px)`);
  console.log(`  overflow: ${data.heroScrollWidth - 320}px\n`);

  console.log('WW2.2: CTA button ("EXPLORE BLOCKS"):');
  if (data.ctaInfo) {
    console.log(`  Tag: ${data.ctaInfo.tag}`);
    console.log(`  Class: ${data.ctaInfo.className}`);
    console.log(`  Text: "${data.ctaInfo.text}"`);
    console.log(`  Computed width: ${data.ctaInfo.width}`);
    console.log(`  scrollWidth: ${data.ctaInfo.scrollWidth}px`);
    console.log(`  offsetWidth: ${data.ctaInfo.offsetWidth}px\n`);
  }

  console.log('WW2.1: Deepest overflowing element:');
  if (data.deepestOverflow) {
    console.log(`  Path: ${data.deepestOverflow.path}`);
    console.log(`  scrollWidth: ${data.deepestOverflow.scrollWidth}px`);
    console.log(`  offsetWidth: ${data.deepestOverflow.offsetWidth}px`);
    console.log(`  Computed:`);
    console.log(`    width: ${data.deepestOverflow.computed.width}`);
    console.log(`    min-width: ${data.deepestOverflow.computed.minWidth}`);
    console.log(`    padding: ${data.deepestOverflow.computed.padding}`);
    console.log(`    margin: ${data.deepestOverflow.computed.margin}`);
  } else {
    console.log('  No overflowing child found');
  }

  await browser.close();
}

ww2().catch(err => console.error(err.message));
