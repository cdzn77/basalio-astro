// MM1 Font Weight Verification Script
// Run on each of 13 pages to collect actual font-weight usage
// Usage: Open DevTools console on each route, paste this script, run it

const results = {
  url: window.location.pathname,
  instrumentSans: new Map(),
  azeretMono: new Map(),
  manrope: new Map()
};

// Scan all elements
document.querySelectorAll('*').forEach(el => {
  const style = window.getComputedStyle(el);
  const fontFamily = style.fontFamily.toLowerCase();
  const fontWeight = style.fontWeight;

  // Filter to just text-bearing elements
  if (el.textContent && el.textContent.trim().length > 0 && el.offsetHeight > 0) {
    if (fontFamily.includes('instrument sans')) {
      if (!results.instrumentSans.has(fontWeight)) {
        results.instrumentSans.set(fontWeight, {
          example: el.textContent.substring(0, 50),
          tag: el.tagName,
          class: el.className
        });
      }
    }
    if (fontFamily.includes('azeret mono')) {
      if (!results.azeretMono.has(fontWeight)) {
        results.azeretMono.set(fontWeight, {
          example: el.textContent.substring(0, 50),
          tag: el.tagName,
          class: el.className
        });
      }
    }
    if (fontFamily.includes('manrope')) {
      if (!results.manrope.has(fontWeight)) {
        results.manrope.set(fontWeight, {
          example: el.textContent.substring(0, 50),
          tag: el.tagName,
          class: el.className
        });
      }
    }
  }
});

// Convert maps to objects for JSON
const output = {
  url: results.url,
  instrumentSans: Object.fromEntries(results.instrumentSans),
  azeretMono: Object.fromEntries(results.azeretMono),
  manrope: Object.fromEntries(results.manrope)
};

console.log(JSON.stringify(output, null, 2));
