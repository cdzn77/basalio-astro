import { chromium } from 'playwright';

async function diagnoseBlocks() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const results = await page.evaluate(() => {
    const innerWidth = window.innerWidth;
    const sections = Array.from(document.querySelectorAll('section')).map((section, idx) => ({
      index: idx,
      scrollWidth: section.scrollWidth,
      innerWidth: innerWidth,
      pass: section.scrollWidth <= innerWidth,
      overflow: section.scrollWidth - innerWidth
    }));

    return { innerWidth, sections };
  });

  console.log('Viewport:', results.innerWidth, 'px\n');
  results.sections.forEach(s => {
    const status = s.pass ? '✅' : '❌';
    console.log(`${status} section[${s.index}]: ${s.scrollWidth}px (overflow: ${s.overflow}px)`);
  });

  await browser.close();
}

diagnoseBlocks().catch(err => console.error(err.message));
