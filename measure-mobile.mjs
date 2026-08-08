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

  // Wait for content to render
  await page.waitForTimeout(2000);

  // Measure sections
  const measurements = await page.evaluate(() => {
    const results = {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      sections: [],
      buttons: [],
      textElements: []
    };

    // Get all sections (visible only)
    const sections = Array.from(document.querySelectorAll('section')).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.height > 0 && el.offsetParent !== null;
    });

    sections.forEach((section, idx) => {
      const heading = section.querySelector('h1, h2, h3, [role="heading"]');
      const headingText = heading ? heading.textContent.trim() : `Section ${idx}`;

      const rect = section.getBoundingClientRect();
      const style = window.getComputedStyle(section);

      // Get padding
      const paddingTop = parseFloat(style.paddingTop) || 0;
      const paddingBottom = parseFloat(style.paddingBottom) || 0;
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;

      results.sections.push({
        index: idx,
        heading: headingText,
        rect: {
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        },
        padding: {
          top: Math.round(paddingTop),
          bottom: Math.round(paddingBottom),
          left: Math.round(paddingLeft),
          right: Math.round(paddingRight)
        }
      });

      // Measure vertical rhythm within section
      const children = Array.from(section.children).filter(el => {
        const r = el.getBoundingClientRect();
        return r.height > 0 && el.offsetParent !== null;
      });

      let prevBottom = section.getBoundingClientRect().top + paddingTop;
      children.forEach((child, cIdx) => {
        const childRect = child.getBoundingClientRect();
        const gap = Math.round(childRect.top - prevBottom);

        const tag = child.tagName.toLowerCase();
        const text = child.textContent.trim().substring(0, 50);

        results.sections[idx].children = results.sections[idx].children || [];
        results.sections[idx].children.push({
          index: cIdx,
          tag,
          text: text || '(empty)',
          gap_from_prev: gap,
          height: Math.round(childRect.height)
        });

        prevBottom = childRect.bottom;
      });
    });

    // Get buttons
    const buttons = Array.from(document.querySelectorAll('button, [role="button"], a[href*="button"]')).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.height > 0 && el.offsetParent !== null;
    }).slice(0, 3); // First 3 visible buttons

    buttons.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const style = window.getComputedStyle(btn);
      const text = btn.textContent.trim().substring(0, 40);

      results.buttons.push({
        text,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        padding: `${Math.round(parseFloat(style.paddingTop))}px ${Math.round(parseFloat(style.paddingRight))}px ${Math.round(parseFloat(style.paddingBottom))}px ${Math.round(parseFloat(style.paddingLeft))}px`,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing
      });
    });

    // Get typography samples
    const typeSamples = [
      { selector: 'h1, [class*="heading"]', role: 'heading' },
      { selector: 'h2, [class*="subtitle"]', role: 'subheading' },
      { selector: 'p, [class*="body"]', role: 'body' },
      { selector: '[class*="eyebrow"], [class*="label"]', role: 'label' }
    ];

    typeSamples.forEach(sample => {
      const el = document.querySelector(sample.selector);
      if (el && el.offsetParent !== null) {
        const style = window.getComputedStyle(el);
        const text = el.textContent.trim().substring(0, 50);
        results.textElements.push({
          role: sample.role,
          text: text || '(empty)',
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing
        });
      }
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
    console.log('Measuring Ramp Studio (https://rampstudio.framer.website)...\n');
    const rampMeasurements = await measureSite('https://rampstudio.framer.website', 'Ramp');

    console.log('Measuring Basalio (http://localhost:4321)...\n');
    const basalioMeasurements = await measureSite('http://localhost:4321', 'Basalio');

    const report = {
      viewport: VIEWPORT,
      timestamp: new Date().toISOString(),
      ramp: rampMeasurements,
      basalio: basalioMeasurements
    };

    writeFileSync('./measurements.json', JSON.stringify(report, null, 2));

    console.log('\n✅ Measurements saved to measurements.json');
    console.log('\nRamp sections found:', rampMeasurements.sections.length);
    console.log('Basalio sections found:', basalioMeasurements.sections.length);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
