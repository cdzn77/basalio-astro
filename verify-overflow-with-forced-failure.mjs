import { chromium } from 'playwright';

const PORT = 4321;

async function verifySectionOverflow(browser, route, viewport) {
  const page = await browser.newPage();

  try {
    await page.setViewportSize({ width: viewport, height: 900 });
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });

    // FORCE OVERFLOW: inject CSS to make first section wider than viewport
    await page.addStyleTag({ content: 'section:first-of-type { width: 200vw !important; }' });

    const results = await page.evaluate(() => {
      const innerWidth = window.innerWidth;
      const sections = Array.from(document.querySelectorAll('section')).map(
        (section, idx) => ({
          index: idx,
          scrollWidth: section.scrollWidth,
          innerWidth: innerWidth,
          pass: section.scrollWidth <= innerWidth
        })
      );
      return { innerWidth, sections };
    });

    return {
      route,
      viewport,
      innerWidth: results.innerWidth,
      sections: results.sections,
      totalSections: results.sections.length,
      passCount: results.sections.filter(s => s.pass).length,
      failCount: results.sections.filter(s => !s.pass).length
    };
  } catch (error) {
    return { route, viewport, error: error.message };
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch({ headless: true });

console.log('Testing / at 1440px with FORCED overflow on first section:\n');
const result = await verifySectionOverflow(browser, '/', 1440);

if (result.error) {
  console.log(`❌ ERROR: ${result.error}`);
} else {
  const status = result.failCount === 0 ? '✅' : `❌ (${result.failCount} overflow)`;
  console.log(`${status} / @ 1440px: ${result.passCount}/${result.totalSections} sections pass`);
  if (result.failCount > 0) {
    result.sections.filter(s => !s.pass).forEach(s => {
      console.log(`     └─ section[${s.index}]: scrollWidth=${s.scrollWidth}px > innerWidth=${s.innerWidth}px (overflow: ${s.scrollWidth - s.innerWidth}px)`);
    });
  }
}

await browser.close();
