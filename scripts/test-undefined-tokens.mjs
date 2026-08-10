import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

console.log('Testing undefined token declarations:\n');

// Test 1: layout.css:8 — padding: 0 var(--space-4xl)
const test1 = await page.evaluate(() => {
  // Find an element with this rule - likely in .footer-wrapper or similar
  const elems = document.querySelectorAll('[class*="footer"], [class*="footer-wrapper"]');
  if (elems.length > 0) {
    const computed = window.getComputedStyle(elems[0]);
    return {
      element: elems[0].className,
      paddingLeft: computed.paddingLeft,
      paddingRight: computed.paddingRight,
      paddingTop: computed.paddingTop,
      paddingBottom: computed.paddingBottom
    };
  }
  return { error: 'Element not found' };
});

console.log('Test 1: layout.css:8 — padding: 0 var(--space-4xl)');
console.log(JSON.stringify(test1, null, 2));
console.log('EXPECTED: if inert, padding-left/right would be 0 (not applied)');
console.log('');

// Test 2: utilities.css:9 — .mt-sm { margin-top: var(--space-sm) }
const test2 = await page.evaluate(() => {
  // Create a test element with mt-sm class
  const testElem = document.createElement('div');
  testElem.className = 'mt-sm';
  testElem.style.display = 'none';
  document.body.appendChild(testElem);
  const computed = window.getComputedStyle(testElem);
  const marginTop = computed.marginTop;
  testElem.remove();
  return { marginTop };
});

console.log('Test 2: utilities.css:9 — .mt-sm { margin-top: var(--space-sm) }');
console.log(JSON.stringify(test2, null, 2));
console.log('EXPECTED: if inert, margin-top would be 0 (not applied)');
console.log('');

// Test 3: animations.css:114 — animation: fadeIn 0.4s var(--transition-fast) forwards
const test3 = await page.evaluate(() => {
  // Find an animated element
  const elems = document.querySelectorAll('[style*="animation"]');
  if (elems.length > 0) {
    const computed = window.getComputedStyle(elems[0]);
    return {
      element: elems[0].className,
      animationDuration: computed.animationDuration,
      animationTimingFunction: computed.animationTimingFunction
    };
  }
  return { error: 'Animated element not found' };
});

console.log('Test 3: animations.css:114 — animation: fadeIn 0.4s var(--transition-fast) forwards');
console.log(JSON.stringify(test3, null, 2));
console.log('EXPECTED: if inert, animation might not apply or have default timing');

await browser.close();
