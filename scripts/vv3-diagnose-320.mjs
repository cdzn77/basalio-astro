import { chromium } from 'playwright';

async function vv3() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const overflowing = [];

    sections.forEach((section, idx) => {
      const scrollWidth = section.scrollWidth;
      const innerWidth = window.innerWidth;
      const overflow = scrollWidth - innerWidth;

      if (overflow > 0) {
        // Get identifying info
        const id = section.id || '';
        const className = section.className || '';
        const heading = section.querySelector('h1, h2, h3');
        const headingText = heading?.textContent?.trim().substring(0, 40);

        overflowing.push({
          index: idx,
          id,
          className: className.substring(0, 50),
          heading: headingText,
          scrollWidth,
          innerWidth,
          overflow
        });
      }
    });

    return { overflowing, totalSections: sections.length };
  });

  console.log('VV3.2: Overflowing elements at 320px viewport\n');
  
  if (data.overflowing.length === 0) {
    console.log('✅ No overflowing sections at 320px');
  } else {
    console.log(`❌ ${data.overflowing.length} overflowing section(s):\n`);
    data.overflowing.forEach(s => {
      console.log(`Section[${s.index}]:`);
      console.log(`  ID: ${s.id || '(none)'}`);
      console.log(`  Class: ${s.className || '(none)'}`);
      console.log(`  Heading: "${s.heading}"`);
      console.log(`  scrollWidth: ${s.scrollWidth}px`);
      console.log(`  innerWidth: ${s.innerWidth}px`);
      console.log(`  Overflow: ${s.overflow}px\n`);
    });
  }

  await browser.close();
}

vv3().catch(err => console.error(err.message));
