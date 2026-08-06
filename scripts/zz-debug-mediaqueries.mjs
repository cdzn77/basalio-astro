import { chromium } from 'playwright';

async function debug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    
    return sections.map((section, idx) => ({
      index: idx,
      class: section.className,
      scrollWidth: section.scrollWidth,
      offsetWidth: section.offsetWidth,
      innerWidth: window.innerWidth,
      id: section.id || 'no-id'
    }));
  });

  console.log('All sections at 320px viewport:');
  data.forEach(s => {
    const status = s.scrollWidth <= s.innerWidth ? '✓' : '✗';
    console.log(`${status} [${s.index}] ${s.id}: scrollWidth=${s.scrollWidth}px, offsetWidth=${s.offsetWidth}px (innerWidth=${s.innerWidth}px)`);
  });
}

debug().catch(err => console.error(err.message));
