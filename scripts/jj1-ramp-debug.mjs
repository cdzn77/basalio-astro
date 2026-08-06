import { chromium } from 'playwright';

async function debugRamp() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Find what sections exist
  const structure = await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    return {
      sectionCount: sections.length,
      sectionTexts: Array.from(sections).map(s => ({
        text: s.textContent?.slice(0, 60),
        hasCarousel: !!s.querySelector('[class*="carousel"], [style*="overflow"]')
      }))
    };
  });

  console.log('Page structure:');
  console.log(JSON.stringify(structure, null, 2));

  // Find Courses and Testimonials sections specifically
  const coursesSection = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const courses = sections.find(s => s.textContent.includes('Courses'));
    if (!courses) return { error: 'Courses section not found' };

    // Look for carousel-like containers
    const containers = Array.from(courses.querySelectorAll('div')).map(div => ({
      className: div.className?.slice(0, 50),
      overflowX: window.getComputedStyle(div).overflowX,
      scrollWidth: div.scrollWidth,
      offsetWidth: div.offsetWidth,
      childCount: div.children.length
    })).filter(c => c.overflowX === 'auto' || c.overflowX === 'scroll' || c.childCount > 2);

    return {
      coursesFound: true,
      containers: containers.slice(0, 5)
    };
  });

  console.log('\nCourses section analysis:');
  console.log(JSON.stringify(coursesSection, null, 2));

  await browser.close();
}

debugRamp().catch(err => console.error(err.message));
