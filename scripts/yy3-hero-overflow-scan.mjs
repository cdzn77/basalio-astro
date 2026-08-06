import { chromium } from 'playwright';

async function yy3() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'))
      .map(el => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          class: el.className,
          id: el.id,
          right: Math.ceil(rect.right),
          width: Math.ceil(rect.width),
          height: Math.ceil(rect.height),
          text: el.textContent?.substring(0, 50) || ''
        };
      })
      .filter(el => el.right > 320)
      .sort((a, b) => b.right - a.right)
      .slice(0, 10);

    return {
      viewportWidth: window.innerWidth,
      elements
    };
  });

  console.log('YY3: Hero overflow scan at 320px viewport\n');
  console.log(`Viewport width: ${data.viewportWidth}px\n`);
  console.log('Top 10 elements extending beyond 320px (sorted by rightmost position):\n');

  data.elements.forEach((el, idx) => {
    const overflow = el.right - 320;
    console.log(`${idx + 1}. <${el.tag}> (right: ${el.right}px, overflow: +${overflow}px)`);
    if (el.id) console.log(`   ID: ${el.id}`);
    if (el.class) console.log(`   Class: ${el.class}`);
    console.log(`   Width: ${el.width}px, Height: ${el.height}px`);
    if (el.text) console.log(`   Text: "${el.text}"`);
    console.log('');
  });

  await browser.close();
}

yy3().catch(err => console.error(err.message));
