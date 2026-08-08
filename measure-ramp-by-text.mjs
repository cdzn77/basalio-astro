import { chromium } from 'playwright';

async function measureRampByText() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15'
  });

  const page = await context.newPage();
  await page.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

  // Assert viewport
  const innerWidth = await page.evaluate(() => window.innerWidth);
  console.log(`\nAssertion: window.innerWidth = ${innerWidth}`);
  if (innerWidth !== 375) {
    throw new Error(`Expected 375, got ${innerWidth}`);
  }

  await page.waitForTimeout(2000);

  // Find elements by text with visibility verification
  const results = await page.evaluate(() => {
    const find = (targetText) => {
      const elements = [...document.querySelectorAll('*')]
        .filter(e => e.children.length === 0 &&
                     e.textContent.trim().toLowerCase().includes(targetText.toLowerCase()));

      for (const el of elements) {
        const r = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const isVisible = r.width > 0 && r.height > 0 &&
                         r.top < window.innerHeight && r.bottom > 0 &&
                         style.visibility !== 'hidden' &&
                         style.display !== 'none' &&
                         !el.closest('foreignObject');

        if (isVisible) {
          return {
            tag: el.tagName.toLowerCase(),
            className: el.className,
            text: el.textContent.trim().substring(0, 80),
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            boundingRect: {
              top: Math.round(r.top),
              left: Math.round(r.left),
              width: Math.round(r.width),
              height: Math.round(r.height),
              bottom: Math.round(r.bottom)
            },
            visibility: 'VISIBLE'
          };
        }
      }

      return { found: false, targetText };
    };

    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      targets: {
        hero: find('We turn strategy into growth'),
        eyebrow: find('WHAT WE DO'),
        sectionHeading: find('Courses for Digital Creatives'),
        body: find('We believe marketing doesn\'t have to be'),
        ctaViewCourse: find('VIEW COURSE'),
        ctaViewAll: find('VIEW ALL'),
        cardTitle: find('SOCIAL MEDIA GROWTH')
      }
    };
  });

  // Print results
  console.log('\n════════════════════════════════════════════════════════');
  console.log('RAMP STUDIO MOBILE MEASUREMENTS (by text content)');
  console.log('════════════════════════════════════════════════════════\n');

  Object.entries(results.targets).forEach(([key, el]) => {
    console.log(`\n[${key.toUpperCase()}]`);
    if (el.found === false) {
      console.log(`  ❌ NOT FOUND: "${el.targetText}"`);
    } else {
      console.log(`  TAG: ${el.tag}`);
      console.log(`  CLASS: ${el.className}`);
      console.log(`  TEXT: "${el.text}"`);
      console.log(`  FONT-SIZE: ${el.fontSize}`);
      console.log(`  FONT-WEIGHT: ${el.fontWeight}`);
      console.log(`  LINE-HEIGHT: ${el.lineHeight}`);
      console.log(`  LETTER-SPACING: ${el.letterSpacing}`);
      console.log(`  BOUNDING-RECT: top=${el.boundingRect.top}px left=${el.boundingRect.left}px width=${el.boundingRect.width}px height=${el.boundingRect.height}px bottom=${el.boundingRect.bottom}px`);
      console.log(`  VISIBILITY: ${el.visibility}`);
    }
  });

  console.log('\n════════════════════════════════════════════════════════');

  await context.close();
  await browser.close();
}

measureRampByText().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
