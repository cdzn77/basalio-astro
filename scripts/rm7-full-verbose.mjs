import { chromium } from 'playwright';

async function verifyVerbose() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Testing /blocks at 375px\n');
  
  // Set viewport EXACTLY as verify script does
  await page.setViewportSize({ width: 375, height: 900 });
  
  const actualVp = await page.evaluate(() => window.innerWidth);
  console.log(`Requested: 375px, Actual innerWidth: ${actualVp}px\n`);

  // Navigate
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Get detailed section info
  const results = await page.evaluate(() => {
    const innerWidth = window.innerWidth;
    const sections = Array.from(document.querySelectorAll('section')).map((section, idx) => ({
      index: idx,
      scrollWidth: section.scrollWidth,
      innerWidth: innerWidth,
      pass: section.scrollWidth <= innerWidth,
      overflow: section.scrollWidth - innerWidth,
      tag: section.tagName,
      html: section.outerHTML.slice(0, 100)
    }));
    return { innerWidth, sections, docWidth: document.documentElement.scrollWidth };
  });

  console.log(`Document width: ${results.docWidth}px\n`);
  
  results.sections.forEach(s => {
    const icon = s.pass ? '✅' : '❌';
    console.log(`${icon} section[${s.index}]: ${s.scrollWidth}px (overflow: ${s.overflow > 0 ? '+' : ''}${s.overflow}px)`);
  });

  const fails = results.sections.filter(s => !s.pass);
  console.log(`\nSummary: ${results.sections.length - fails.length}/${results.sections.length} pass`);

  await browser.close();
}

verifyVerbose().catch(err => console.error(err.message));
