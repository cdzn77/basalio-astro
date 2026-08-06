import { chromium } from 'playwright';

async function measureTypographyAndPadding() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  console.log('═══════════════════════════════════════════════════════');
  console.log('KK2: EYEBROW VS HEADING TYPOGRAPHY');
  console.log('═══════════════════════════════════════════════════════\n');

  // KK2: Measure eyebrow and heading for each carousel section
  const typographySpec = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    
    // Find Courses section
    const coursesSection = sections.find(s => s.textContent.includes('Courses'));
    
    // Find all text elements in order
    const coursesText = Array.from(coursesSection?.querySelectorAll('*') || [])
      .filter(el => {
        const text = el.textContent?.trim();
        return text && text.length > 0 && text.length < 100 && el.children.length === 0;
      })
      .slice(0, 10);

    const result = {
      sections: []
    };

    // Examine Courses section specifically
    if (coursesSection) {
      const heading = coursesSection.querySelector('h2, h3');
      const eyebrow = Array.from(coursesSection.querySelectorAll('*'))
        .find(el => el.textContent?.toUpperCase() === el.textContent && 
                   el.textContent?.length < 20 &&
                   el.textContent !== heading?.textContent);

      if (heading) {
        result.coursesHeading = {
          text: heading.textContent?.slice(0, 40),
          tag: heading.tagName,
          fontSize: window.getComputedStyle(heading).fontSize,
          fontWeight: window.getComputedStyle(heading).fontWeight,
          lineHeight: window.getComputedStyle(heading).lineHeight,
          letterSpacing: window.getComputedStyle(heading).letterSpacing
        };
      }

      if (eyebrow) {
        result.coursesEyebrow = {
          text: eyebrow.textContent?.slice(0, 40),
          tag: eyebrow.tagName,
          fontSize: window.getComputedStyle(eyebrow).fontSize,
          fontWeight: window.getComputedStyle(eyebrow).fontWeight,
          letterSpacing: window.getComputedStyle(eyebrow).letterSpacing,
          textTransform: window.getComputedStyle(eyebrow).textTransform
        };
      }
    }

    return result;
  });

  console.log('COURSES SECTION:');
  if (typographySpec.coursesEyebrow) {
    console.log(`  Eyebrow: "${typographySpec.coursesEyebrow.text}"`);
    console.log(`    Tag: ${typographySpec.coursesEyebrow.tag}`);
    console.log(`    Font-size: ${typographySpec.coursesEyebrow.fontSize}`);
    console.log(`    Font-weight: ${typographySpec.coursesEyebrow.fontWeight}`);
    console.log(`    Letter-spacing: ${typographySpec.coursesEyebrow.letterSpacing}`);
    console.log(`    Text-transform: ${typographySpec.coursesEyebrow.textTransform}`);
  }

  if (typographySpec.coursesHeading) {
    console.log(`\n  Heading: "${typographySpec.coursesHeading.text}"`);
    console.log(`    Tag: ${typographySpec.coursesHeading.tag}`);
    console.log(`    Font-size: ${typographySpec.coursesHeading.fontSize}`);
    console.log(`    Font-weight: ${typographySpec.coursesHeading.fontWeight}`);
    console.log(`    Line-height: ${typographySpec.coursesHeading.lineHeight}`);
    console.log(`    Letter-spacing: ${typographySpec.coursesHeading.letterSpacing}`);
  }

  // KK3: Measure carousel left edge position
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('KK3: CAROUSEL PADDING / LEFT EDGE POSITION');
  console.log('═══════════════════════════════════════════════════════\n');

  const paddingSpec = await page.evaluate(() => {
    // Find carousel container (335px wide, 1242px scroll)
    const carousel = Array.from(document.querySelectorAll('div')).find(d => {
      return d.offsetWidth === 335 && d.scrollWidth === 1242;
    });

    if (!carousel) return { error: 'Carousel not found' };

    // Get first card
    const firstCard = carousel.children[0];
    const carouselRect = carousel.getBoundingClientRect();
    const cardRect = firstCard?.getBoundingClientRect();

    // Get section for reference
    const section = carousel.closest('section');
    const sectionStyle = section ? window.getComputedStyle(section) : {};
    const sectionRect = section?.getBoundingClientRect();

    // Get heading above carousel for reference
    const heading = section?.querySelector('h1, h2, h3');
    const headingRect = heading?.getBoundingClientRect();

    return {
      viewportWidth: window.innerWidth,
      carouselLeftOffset: carouselRect.left,
      carouselRightOffset: carouselRect.right,
      firstCardLeftOffset: cardRect?.left,
      sectionLeftOffset: sectionRect?.left,
      headingLeftOffset: headingRect?.left,
      sectionPaddingLeft: sectionStyle.paddingLeft,
      sectionPaddingRight: sectionStyle.paddingRight,
      carouselOffsetWidth: carousel.offsetWidth,
      alignmentNote: `Carousel starts at ${carouselRect.left}px, heading starts at ${headingRect?.left}px`
    };
  });

  console.log('CAROUSEL POSITION:');
  Object.entries(paddingSpec).forEach(([key, val]) => {
    console.log(`  ${key}: ${val}`);
  });

  await browser.close();
}

measureTypographyAndPadding().catch(err => console.error(err.message));
