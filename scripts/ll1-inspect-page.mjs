import { chromium } from 'playwright';

async function inspectPage() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/test-card-widths', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Get page text to see structure
  const structure = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent);
    const allDivs = Array.from(document.querySelectorAll('div')).filter(d => 
      d.style.width && parseInt(d.style.width) >= 250
    ).slice(0, 20).map(d => ({
      width: d.style.width,
      height: d.offsetHeight,
      children: d.children.length,
      hasImage: !!d.querySelector('[style*="aspect"], [style*="height"]')
    }));

    return { headings, widthDivs: allDivs };
  });

  console.log('Page structure:');
  console.log('Headings:', structure.headings);
  console.log('\nDivs with explicit width (first 20):');
  structure.widthDivs.forEach((d, i) => {
    console.log(`[${i}] width: ${d.width}, height: ${d.height}px, children: ${d.children}, image: ${d.hasImage}`);
  });

  // Take screenshot
  const screenshotPath = '/private/tmp/test-cards-inspect.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`\nScreenshot saved: ${screenshotPath}`);

  await browser.close();
}

inspectPage().catch(err => console.error(err.message));
