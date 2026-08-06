import { chromium } from 'playwright';

async function measureRampMobile() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

  // Assert viewport
  const innerWidth = await page.evaluate(() => window.innerWidth);
  if (innerWidth !== 375) throw new Error(`Viewport mismatch: got ${innerWidth}px`);
  console.log(`✓ Viewport asserted: ${innerWidth}px\n`);

  // Measure carousels
  const coursesCarousel = await page.evaluate(() => {
    const carousel = document.querySelector('[class*="courses"][class*="carousel"]') || 
                     document.querySelector('[class*="courses"]')?.closest('[class*="carousel"]') ||
                     Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Courses'))?.querySelector('[class*="carousel"], .carousel, [style*="overflow"]');
    
    if (!carousel) return { error: 'Courses carousel not found' };

    const cards = carousel.querySelectorAll('[class*="card"], [role="article"]');
    const firstCard = cards[0];
    const secondCard = cards[1];

    const carouselStyle = window.getComputedStyle(carousel);
    const trackElement = carousel.querySelector('[class*="track"]') || carousel;
    const trackStyle = window.getComputedStyle(trackElement);

    return {
      carouselFound: !!carousel,
      carouselClass: carousel?.className?.slice(0, 60),
      cardCount: cards.length,
      firstCardWidth: firstCard?.offsetWidth,
      firstCardComputedWidth: window.getComputedStyle(firstCard).width,
      secondCardOffsetX: secondCard?.getBoundingClientRect().x,
      overflowX: carouselStyle.overflowX,
      overflowY: carouselStyle.overflowY,
      trackOverflowX: trackStyle.overflowX,
      scrollSnapType: trackStyle.scrollSnapType,
      gap: window.getComputedStyle(carousel).gap || trackStyle.gap || 'not found',
      carouselScrollWidth: carousel?.scrollWidth,
      carouselOffsetWidth: carousel?.offsetWidth,
      trackScrollWidth: trackElement?.scrollWidth,
      trackOffsetWidth: trackElement?.offsetWidth
    };
  });

  // Measure testimonials carousel
  const testimonialsCarousel = await page.evaluate(() => {
    const carousel = Array.from(document.querySelectorAll('section')).find(s => 
      s.textContent.includes('Learner') || s.textContent.includes('Stories') || s.textContent.includes('Testimonial')
    )?.querySelector('[class*="carousel"], .carousel, [style*="overflow"]');
    
    if (!carousel) return { error: 'Testimonials carousel not found' };

    const cards = carousel.querySelectorAll('[class*="card"], [role="article"], [class*="story"]');
    const firstCard = cards[0];

    const carouselStyle = window.getComputedStyle(carousel);
    const trackElement = carousel.querySelector('[class*="track"]') || carousel;

    return {
      carouselFound: !!carousel,
      cardCount: cards.length,
      firstCardWidth: firstCard?.offsetWidth,
      overflowX: carouselStyle.overflowX,
      trackOverflowX: window.getComputedStyle(trackElement).overflowX,
      scrollSnapType: window.getComputedStyle(trackElement).scrollSnapType,
      carouselScrollWidth: carousel?.scrollWidth,
      carouselOffsetWidth: carousel?.offsetWidth
    };
  });

  // Measure section padding, headings, buttons
  const pageLayout = await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    const firstSection = sections[0];
    const sectionStyle = window.getComputedStyle(firstSection);

    // Find heading elements
    const h1 = firstSection?.querySelector('h1');
    const h2 = firstSection?.querySelector('h2');
    const heading = h1 || h2;

    const eyebrow = firstSection?.querySelector('[class*="eyebrow"], [class*="label"], small');
    const body = firstSection?.querySelector('p');
    const button = firstSection?.querySelector('button, [role="button"], a[class*="btn"]');

    return {
      sectionPaddingLeft: sectionStyle.paddingLeft,
      sectionPaddingRight: sectionStyle.paddingRight,
      headingFontSize: heading ? window.getComputedStyle(heading).fontSize : 'not found',
      eyebrowFontSize: eyebrow ? window.getComputedStyle(eyebrow).fontSize : 'not found',
      buttonWidth: button?.offsetWidth,
      buttonHeight: button?.offsetHeight,
      buttonPadding: button ? window.getComputedStyle(button).padding : 'not found'
    };
  });

  // Measure stats section if it exists
  const statsSection = await page.evaluate(() => {
    const statsContainer = Array.from(document.querySelectorAll('section')).find(s => 
      s.textContent.includes('What we do')
    );
    
    if (!statsSection) return { error: 'Stats section not found' };

    const rows = statsContainer?.querySelectorAll('[class*="stat"], [class*="row"], li');
    const firstRow = rows?.[0];

    return {
      statsFound: !!statsContainer,
      rowCount: rows?.length,
      firstRowHeight: firstRow?.offsetHeight,
      rowDisplay: firstRow ? window.getComputedStyle(firstRow).display : 'not found',
      statsContainer: statsContainer?.className?.slice(0, 60)
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('JJ1: Ramp Mobile Spec (375×812px)');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log('COURSES CAROUSEL:');
  console.log(JSON.stringify(coursesCarousel, null, 2));
  console.log('\nTESTIMONIALS CAROUSEL:');
  console.log(JSON.stringify(testimonialsCarousel, null, 2));
  console.log('\nPAGE LAYOUT:');
  console.log(JSON.stringify(pageLayout, null, 2));
  console.log('\nSTATS SECTION:');
  console.log(JSON.stringify(statsSection, null, 2));

  await browser.close();
}

measureRampMobile().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
