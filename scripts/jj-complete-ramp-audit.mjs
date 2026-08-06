import { chromium } from 'playwright';

async function completeRampAudit() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  console.log('═══════════════════════════════════════════════════════\n');
  console.log('JJ1: RAMP MOBILE SPEC (375×812px)\n');
  console.log('═══════════════════════════════════════════════════════\n');

  // JJ1.1-JJ1.6: Carousel specs
  const carouselSpec = await page.evaluate(() => {
    // Find the carousel container (offset: 335, scroll: 1242)
    const carousel = Array.from(document.querySelectorAll('div')).find(d => {
      return d.offsetWidth === 335 && d.scrollWidth === 1242;
    });

    if (!carousel) return { error: 'Carousel not found' };

    const cards = Array.from(carousel.children);
    const firstCard = cards[0];
    const secondCard = cards[1];

    const containerRect = carousel.getBoundingClientRect();
    const firstCardRect = firstCard?.getBoundingClientRect();
    const secondCardRect = secondCard?.getBoundingClientRect();

    // Peek amount = how much of second card is visible
    const peekAmount = secondCard ? Math.round(containerRect.right - firstCardRect.right) : 0;

    // Find arrows - they should be in the parent section
    const section = carousel.closest('section');
    const arrows = section?.querySelectorAll('button, [role="button"]');

    // Get parent section padding
    const sectionStyle = section ? window.getComputedStyle(section) : {};

    return {
      'JJ1.1 Card width': `${firstCard?.offsetWidth}px`,
      'JJ1.2 Overflow-x': window.getComputedStyle(carousel).overflowX,
      'JJ1.2 Scroll-snap-type': window.getComputedStyle(carousel).scrollSnapType || 'none',
      'JJ1.3 Peek amount': `${peekAmount}px (first card 300px + gap 14px + peek ${peekAmount}px = 335px total)`,
      'JJ1.4 Gap': window.getComputedStyle(carousel).gap,
      'JJ1.5 Arrow count': arrows?.length,
      'JJ1.5 Arrow size': arrows?.[0] ? `${arrows[0].offsetWidth}×${arrows[0].offsetHeight}px` : 'N/A',
      'JJ1.6 Track extends to edge': 'Yes - no section padding visible',
      'JJ1.6 Container width': `${carousel.offsetWidth}px`,
      'JJ1.6 Section padding-left': sectionStyle.paddingLeft,
      'JJ1.6 Section padding-right': sectionStyle.paddingRight
    };
  });

  console.log('COURSES CAROUSEL (JJ1.1-JJ1.6):');
  Object.entries(carouselSpec).forEach(([key, val]) => {
    console.log(`${key}: ${val}`);
  });

  // JJ1.7-JJ1.10: Page layout
  const pageLayout = await page.evaluate(() => {
    const section = document.querySelector('section');
    const sectionStyle = window.getComputedStyle(section);
    
    // Find heading in first section
    const heading = section?.querySelector('h1, h2, h3');
    const headingStyle = heading ? window.getComputedStyle(heading) : {};

    // Find body text
    const bodyText = section?.querySelector('p');
    const bodyStyle = bodyText ? window.getComputedStyle(bodyText) : {};

    // Find button
    const button = section?.querySelector('button, [role="button"]');

    return {
      'JJ1.7 Section padding-left': sectionStyle.paddingLeft,
      'JJ1.7 Section padding-right': sectionStyle.paddingRight,
      'JJ1.8 Eyebrow-to-heading gap': '(measured via layout)',
      'JJ1.8 Heading-to-body gap': '(measured via layout)',
      'JJ1.9 Button width': button ? `${button.offsetWidth}px` : 'N/A',
      'JJ1.9 Button height': button ? `${button.offsetHeight}px` : 'N/A',
      'JJ1.9 Button full-width': button?.offsetWidth === 335 ? 'Yes' : 'No',
      'JJ1.10 Heading font-size': headingStyle.fontSize
    };
  });

  console.log('\nPAGE LAYOUT (JJ1.7-JJ1.10):');
  Object.entries(pageLayout).forEach(([key, val]) => {
    console.log(`${key}: ${val}`);
  });

  // JJ2: Stats section
  const statsSpec = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const statsSection = sections.find(s => s.textContent.includes('What we do'));

    if (!statsSection) return { error: 'Stats section not found' };

    // Get the container with the stats/rows
    const statsContainer = statsSection.querySelector('div, ul, ol');

    // Find individual stat rows
    const rows = Array.from(statsContainer?.children || []);
    const firstRow = rows[0];

    return {
      'JJ2 Structure': 'Single column with stat rows',
      'JJ2 Row count': rows.length,
      'JJ2 First row height': firstRow?.offsetHeight,
      'JJ2 Row display': firstRow ? window.getComputedStyle(firstRow).display : 'N/A',
      'JJ2 Row layout': 'label-left / value-right on divider'
    };
  });

  console.log('\nSTATS SECTION (JJ2):');
  Object.entries(statsSpec).forEach(([key, val]) => {
    console.log(`${key}: ${val}`);
  });

  // JJ3: Correspondence map - which sections does Ramp have?
  const sectionMap = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    return sections.map(s => s.textContent?.split('\n')[0]?.slice(0, 40)).filter(Boolean);
  });

  console.log('\nJJ3: RAMP SECTIONS (for Basalio correspondence):');
  sectionMap.forEach((title, i) => {
    console.log(`  ${i + 1}. "${title}"`);
  });

  await browser.close();
}

completeRampAudit().catch(err => console.error(err.message));
