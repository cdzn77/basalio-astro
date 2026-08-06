import { chromium } from 'playwright';

async function measureRampCarousels() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const viewport = await page.evaluate(() => window.innerWidth);
  console.log(`✓ Viewport: ${viewport}px\n`);

  // Measure Courses carousel
  const coursesCarousel = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const coursesSection = sections.find(s => s.textContent.includes('Courses'));
    
    if (!coursesSection) return { error: 'Courses section not found' };

    // Find the carousel container (the one with overflow-x: auto or clip that's scrollable)
    const allDivs = Array.from(coursesSection.querySelectorAll('div'));
    const carouselContainer = allDivs.find(div => {
      const style = window.getComputedStyle(div);
      return (style.overflowX === 'auto' || style.overflowX === 'scroll') && div.scrollWidth > 0;
    }) || allDivs.find(div => {
      const style = window.getComputedStyle(div);
      return style.overflowX === 'clip' && div.scrollWidth > div.offsetWidth;
    });

    if (!carouselContainer) return { error: 'Carousel container not found' };

    // Get the cards
    const cards = Array.from(carouselContainer.children);
    const firstCard = cards[0];
    const secondCard = cards[1];

    const containerStyle = window.getComputedStyle(carouselContainer);
    const firstCardStyle = window.getComputedStyle(firstCard);

    // Calculate peek amount
    const containerRect = carouselContainer.getBoundingClientRect();
    const secondCardRect = secondCard?.getBoundingClientRect();
    const peekAmount = secondCard ? Math.max(0, secondCardRect.right - containerRect.right) : 0;

    // Find section padding
    const sectionStyle = window.getComputedStyle(coursesSection);

    return {
      carouselTag: carouselContainer.tagName,
      carouselClass: carouselContainer.className?.slice(0, 60),
      carouselOverflowX: containerStyle.overflowX,
      carouselGap: containerStyle.gap || 'none',
      carouselScrollSnapType: containerStyle.scrollSnapType || 'none',
      
      cardsCount: cards.length,
      firstCardWidth: firstCard?.offsetWidth,
      firstCardHeight: firstCard?.offsetHeight,
      firstCardComputedWidth: firstCardStyle.width,
      firstCardFlexShrink: firstCardStyle.flexShrink,
      firstCardFlexGrow: firstCardStyle.flexGrow,
      
      carouselScrollWidth: carouselContainer.scrollWidth,
      carouselOffsetWidth: carouselContainer.offsetWidth,
      carouselClientWidth: carouselContainer.clientWidth,
      
      peekAmount: Math.round(peekAmount),
      
      sectionPaddingLeft: sectionStyle.paddingLeft,
      sectionPaddingRight: sectionStyle.paddingRight
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('JJ1.1-JJ1.6: COURSES CAROUSEL');
  console.log('═══════════════════════════════════════════════════════');
  console.log(JSON.stringify(coursesCarousel, null, 2));

  // Measure page layout specs
  const pageLayout = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const firstSection = sections[0];
    const sectionStyle = window.getComputedStyle(firstSection);

    // Find heading and button in first section
    const heading = firstSection?.querySelector('h1, h2, h3');
    const button = firstSection?.querySelector('button, a[role="button"]');
    const eyebrow = firstSection?.querySelector('[class*="eyebrow"], [class*="label"], small, span');

    return {
      sectionPaddingLeft: sectionStyle.paddingLeft,
      sectionPaddingRight: sectionStyle.paddingRight,
      headingFontSize: heading ? window.getComputedStyle(heading).fontSize : 'not found',
      headingTag: heading?.tagName,
      eyebrowFontSize: eyebrow ? window.getComputedStyle(eyebrow).fontSize : 'not found',
      buttonWidth: button?.offsetWidth,
      buttonHeight: button?.offsetHeight,
      buttonDisplay: button ? window.getComputedStyle(button).display : 'not found'
    };
  });

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('JJ1.7-JJ1.10: PAGE LAYOUT');
  console.log('═══════════════════════════════════════════════════════');
  console.log(JSON.stringify(pageLayout, null, 2));

  // Measure stats/testimonials section
  const statsSection = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const stats = sections.find(s => s.textContent.includes('What we do'));
    
    if (!stats) return { error: 'Stats section not found' };

    // Find rows/stats items
    const rows = Array.from(stats.querySelectorAll('div, li, tr')).filter(el => {
      const text = el.textContent || '';
      return text.length > 5 && text.length < 200;
    });

    const firstRow = rows[0];
    const firstRowStyle = firstRow ? window.getComputedStyle(firstRow) : {};

    return {
      statsFound: true,
      rowCount: rows.length,
      firstRowHeight: firstRow?.offsetHeight,
      firstRowDisplay: firstRowStyle.display,
      firstRowFontSize: firstRowStyle.fontSize
    };
  });

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('JJ2: STATS SECTION');
  console.log('═══════════════════════════════════════════════════════');
  console.log(JSON.stringify(statsSection, null, 2));

  await browser.close();
}

measureRampCarousels().catch(err => console.error('Error:', err.message));
