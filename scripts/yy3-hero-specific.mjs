import { chromium } from 'playwright';

async function yy3() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const heroSection = document.querySelector('section');
    if (!heroSection) return { error: 'No section found' };

    const elements = Array.from(heroSection.querySelectorAll('*'))
      .map(el => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          class: el.className,
          id: el.id,
          left: Math.ceil(rect.left),
          right: Math.ceil(rect.right),
          width: Math.ceil(rect.width),
          height: Math.ceil(rect.height),
          text: el.textContent?.substring(0, 30) || '',
          getComputedStyle: {
            overflow: window.getComputedStyle(el).overflow,
            overflowX: window.getComputedStyle(el).overflowX,
            overflowY: window.getComputedStyle(el).overflowY
          }
        };
      })
      .filter(el => el.right > 320 && el.right <= 330)
      .sort((a, b) => b.right - a.right);

    return {
      viewportWidth: window.innerWidth,
      heroExists: !!heroSection,
      heroHeight: heroSection?.offsetHeight || 0,
      elements
    };
  });

  console.log('YY3: Hero section overflow scan at 320px (looking for right: 320-330px)\n');
  console.log(`Viewport width: ${data.viewportWidth}px`);
  console.log(`Hero section height: ${data.heroHeight}px\n`);
  
  if (!data.elements || data.elements.length === 0) {
    console.log('No elements found with right position between 320-330px');
    console.log('\nLet me scan all elements and show those closest to 320px:');
  } else {
    console.log(`Found ${data.elements.length} element(s) with right: 320-330px\n`);
    data.elements.forEach((el, idx) => {
      const overflow = el.right - 320;
      console.log(`${idx + 1}. <${el.tag}> (right: ${el.right}px, overflow: +${overflow}px)`);
      if (el.id) console.log(`   ID: ${el.id}`);
      if (el.class) console.log(`   Class: ${el.class}`);
      console.log(`   Width: ${el.width}px, Height: ${el.height}px`);
      console.log(`   Overflow styles: ${el.getComputedStyle.overflow}, overflowX: ${el.getComputedStyle.overflowX}`);
      if (el.text) console.log(`   Text: "${el.text}"`);
      console.log('');
    });
  }

  await browser.close();
}

yy3().catch(err => console.error(err.message));
