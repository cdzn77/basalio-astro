import { chromium } from 'playwright';

async function identifySections() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const info = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section')).map((section, idx) => ({
      index: idx,
      id: section.id || 'no-id',
      classes: section.className,
      firstChild: section.children[0]?.tagName,
      html: section.outerHTML.slice(0, 200)
    }));
    return sections;
  });

  info.forEach(s => {
    console.log(`\nsection[${s.index}]:`);
    console.log(`  ID: ${s.id}`);
    console.log(`  Classes: ${s.classes}`);
    console.log(`  First child: ${s.firstChild}`);
  });

  await browser.close();
}

identifySections().catch(err => console.error(err.message));
