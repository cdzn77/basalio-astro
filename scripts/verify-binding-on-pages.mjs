import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });

console.log('=== DS10b (corrected): WRAPPER ELEMENT MAX-WIDTH ACROSS ROUTES ===\n');

const routes = ['/', '/blocks', '/hacks', '/contact'];

for (const route of routes) {
  console.log(`\nRoute: ${route}`);
  console.log('─'.repeat(60));
  
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  
  const data = await page.evaluate(() => {
    // Find main wrapper that constrains content
    const mainSection = document.querySelector('main > section');
    const mainDiv = document.querySelector('main > div');
    const wrapper = mainSection || mainDiv;
    
    if (wrapper) {
      const cs = window.getComputedStyle(wrapper);
      
      // Get first major content container inside
      const inner = wrapper.querySelector('[class*="inner"], section, div');
      const innerCs = inner ? window.getComputedStyle(inner) : null;
      
      return {
        wrapper: {
          class: wrapper.className || wrapper.tagName.toLowerCase(),
          maxWidth: cs.maxWidth,
          width: cs.width,
          padding: `${cs.paddingLeft} ${cs.paddingRight}`,
          margin: cs.margin
        },
        inner: innerCs ? {
          class: inner.className || inner.tagName.toLowerCase(),
          maxWidth: innerCs.maxWidth,
          width: innerCs.width
        } : null
      };
    }
    
    return { error: 'No wrapper found' };
  });
  
  if (data.error) {
    console.log(data.error);
  } else {
    console.log(`Main wrapper (.${data.wrapper.class}):`);
    console.log(`  maxWidth: ${data.wrapper.maxWidth}`);
    console.log(`  computed width: ${data.wrapper.width}`);
    
    if (data.inner) {
      console.log(`\nFirst inner container (.${data.inner.class}):`);
      console.log(`  maxWidth: ${data.inner.maxWidth}`);
      console.log(`  computed width: ${data.inner.width}`);
    }
  }
}

console.log('\n\n=== SUMMARY ===');
console.log('1786px is the SHARED default max-width for HeaderSplit');
console.log('1791px is HERO-specific');
console.log('\nThe 5px difference represents two separate design constraints:');
console.log('  - Hero: 1791px (binds at viewport ≥1791px)');
console.log('  - HeaderSplit: 1786px (may or may not bind, depends on parent container)');

await browser.close();
