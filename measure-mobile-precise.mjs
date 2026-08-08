import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const VIEWPORT = { width: 375, height: 812, deviceScaleFactor: 2 };

async function measureSite(url, siteName) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15'
  });

  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  // Assert viewport
  const innerWidth = await page.evaluate(() => window.innerWidth);
  if (innerWidth !== 375) {
    throw new Error(`Expected window.innerWidth === 375, got ${innerWidth}`);
  }

  await page.waitForTimeout(2000);

  // Detailed measurements
  const measurements = await page.evaluate(() => {
    const results = {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      heroHeading: null,
      sectionHeadings: [],
      eyebrows: [],
      bodyParagraphs: [],
      buttons: [],
      paddingExamples: []
    };

    // Hero heading (h1, visible only)
    const h1s = Array.from(document.querySelectorAll('h1')).filter(el =>
      el.offsetParent !== null && el.getBoundingClientRect().height > 0
    );

    if (h1s.length > 0) {
      const h1 = h1s[0];
      const style = window.getComputedStyle(h1);
      results.heroHeading = {
        tag: 'h1',
        classes: h1.className,
        text: h1.textContent.trim().substring(0, 60),
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        offsetParent: h1.offsetParent ? h1.offsetParent.tagName : null
      };
    }

    // Section headings (h2, h3, visible only)
    const headings = Array.from(document.querySelectorAll('h2, h3')).filter(el =>
      el.offsetParent !== null && el.getBoundingClientRect().height > 0
    );

    headings.slice(0, 5).forEach(heading => {
      const style = window.getComputedStyle(heading);
      const rect = heading.getBoundingClientRect();
      results.sectionHeadings.push({
        tag: heading.tagName.toLowerCase(),
        classes: heading.className,
        text: heading.textContent.trim().substring(0, 60),
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        offsetParent: heading.offsetParent ? heading.offsetParent.tagName : null,
        isVisible: rect.height > 0
      });
    });

    // Eyebrow/label elements (small caps, tracking)
    const eyebrows = Array.from(document.querySelectorAll(
      '[class*="eyebrow"], [class*="label"], [class*="subtitle"], p:first-child'
    )).filter(el =>
      el.offsetParent !== null &&
      el.getBoundingClientRect().height > 0 &&
      parseInt(window.getComputedStyle(el).fontSize) <= 14
    );

    eyebrows.slice(0, 3).forEach(el => {
      const style = window.getComputedStyle(el);
      results.eyebrows.push({
        tag: el.tagName.toLowerCase(),
        classes: el.className,
        text: el.textContent.trim().substring(0, 50),
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight
      });
    });

    // Body paragraphs
    const ps = Array.from(document.querySelectorAll('p')).filter(el =>
      el.offsetParent !== null &&
      el.getBoundingClientRect().height > 0 &&
      parseInt(window.getComputedStyle(el).fontSize) >= 14
    );

    ps.slice(0, 2).forEach(el => {
      const style = window.getComputedStyle(el);
      results.bodyParagraphs.push({
        tag: 'p',
        classes: el.className,
        text: el.textContent.trim().substring(0, 60),
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing
      });
    });

    // Buttons with full details
    const buttons = Array.from(document.querySelectorAll('button, [role="button"], a[class*="button"]'))
      .filter(el => el.offsetParent !== null && el.getBoundingClientRect().height > 0)
      .slice(0, 3);

    buttons.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const style = window.getComputedStyle(btn);
      results.buttons.push({
        tag: btn.tagName.toLowerCase(),
        classes: btn.className,
        text: btn.textContent.trim().substring(0, 30),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        paddingTop: style.paddingTop,
        paddingRight: style.paddingRight,
        paddingBottom: style.paddingBottom,
        paddingLeft: style.paddingLeft,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing
      });
    });

    // Section padding examples (top-level sections with padding)
    const sections = Array.from(document.querySelectorAll('section')).filter(el =>
      el.offsetParent !== null && el.getBoundingClientRect().height > 0
    );

    sections.slice(0, 5).forEach(sec => {
      const style = window.getComputedStyle(sec);
      const heading = sec.querySelector('h1, h2, h3, [role="heading"]');
      results.paddingExamples.push({
        headingText: heading ? heading.textContent.trim().substring(0, 50) : '(no heading)',
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight
      });
    });

    return results;
  });

  await context.close();
  await browser.close();

  return measurements;
}

// Main
(async () => {
  try {
    console.log('Measuring Ramp Studio...');
    const rampMeasurements = await measureSite('https://rampstudio.framer.website', 'Ramp');

    console.log('Measuring Basalio...');
    const basalioMeasurements = await measureSite('http://localhost:4321', 'Basalio');

    const report = {
      viewport: VIEWPORT,
      timestamp: new Date().toISOString(),
      ramp: rampMeasurements,
      basalio: basalioMeasurements
    };

    writeFileSync('./measurements-precise.json', JSON.stringify(report, null, 2));

    console.log('\n✅ Precise measurements saved to measurements-precise.json');
    console.log('\nRamp Hero H1:', rampMeasurements.heroHeading?.text);
    console.log('Basalio Hero H1:', basalioMeasurements.heroHeading?.text);
    console.log('\nRamp Section H2s found:', rampMeasurements.sectionHeadings.length);
    console.log('Basalio Section H2s found:', basalioMeasurements.sectionHeadings.length);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
