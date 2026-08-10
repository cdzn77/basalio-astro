import { chromium } from 'playwright';

async function analyzeSelectors() {
  const hardcoded = [
    { file: 'blocks.astro', line: 702 },
    { file: 'terms.astro', line: 268 },
    { file: 'support.astro', line: 189 },
    { file: 'support.astro', line: 217 },
    { file: 'support.astro', line: 249 },
    { file: 'index.astro', line: 335 },
    { file: 'index.astro', line: 469 },
    { file: 'pricing.astro', line: 208 },
    { file: 'pricing.astro', line: 346 },
    { file: 'privacy.astro', line: 274 },
    { file: 'contact.astro', line: 113 },
    { file: 'contact.astro', line: 204 },
    { file: 'contact.astro', line: 300 }
  ];

  console.log('GK2 ANALYSIS — What each font-size: 16px selector actually styles:\n');

  for (const item of hardcoded) {
    console.log(`${item.file}:${item.line}`);
    console.log('  (Querying element at this location — checking what elements get 16px)\n');
  }

  const browser = await chromium.launch();
  
  // Sample check on /contact which has 3 instances
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4321/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const contactAnalysis = await page.evaluate(() => {
    // Find elements with 16px font-size
    const results = [];
    document.querySelectorAll('*').forEach(el => {
      const computed = window.getComputedStyle(el);
      if (computed.fontSize === '16px') {
        results.push({
          tag: el.tagName,
          class: el.className.split(' ')[0],
          text: el.textContent.substring(0, 50),
          parent: el.parentElement.tagName + '.' + el.parentElement.className.split(' ')[0]
        });
      }
    });
    return results.slice(0, 5);
  });

  console.log('Example from /contact (elements with 16px):');
  contactAnalysis.forEach(c => {
    console.log(`  <${c.tag} class="${c.class}"> in ${c.parent}`);
    console.log(`    Text: "${c.text}..."\n`);
  });

  await browser.close();
}

analyzeSelectors().catch(console.error);
