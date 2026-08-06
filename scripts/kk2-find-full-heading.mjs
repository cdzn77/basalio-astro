import { chromium } from 'playwright';

async function findFullHeading() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  const headings = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const coursesSection = sections.find(s => s.textContent.includes('Courses'));
    
    // Find ALL headings in the courses section
    const allHeadings = coursesSection?.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    return Array.from(allHeadings || []).map(h => ({
      text: h.textContent?.slice(0, 50),
      tag: h.tagName,
      fontSize: window.getComputedStyle(h).fontSize,
      fontWeight: window.getComputedStyle(h).fontWeight,
      lineHeight: window.getComputedStyle(h).lineHeight
    }));
  });

  console.log('All headings in Courses section:');
  headings.forEach((h, i) => {
    console.log(`\n[${i}] <${h.tag}> "${h.text}"`);
    console.log(`    Font-size: ${h.fontSize}`);
    console.log(`    Font-weight: ${h.fontWeight}`);
    console.log(`    Line-height: ${h.lineHeight}`);
  });

  await browser.close();
}

findFullHeading().catch(err => console.error(err.message));
