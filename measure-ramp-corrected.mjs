import { chromium } from 'playwright';

async function measureRampCorrected() {
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

  const innerWidth = await page.evaluate(() => window.innerWidth);
  console.log(`Assertion: window.innerWidth = ${innerWidth}`);
  if (innerWidth !== 375) throw new Error(`Expected 375, got ${innerWidth}`);

  await page.waitForTimeout(2000);

  const results = await page.evaluate(() => {
    const find = (targetText, tag = null) => {
      const selector = tag ? tag : '*';
      const elements = [...document.querySelectorAll(selector)]
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
            }
          };
        }
      }
      return null;
    };

    // Special handling for hero (split across multiple h1s)
    const h1s = [...document.querySelectorAll('h1.framer-text')]
      .filter(e => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 &&
               r.top < window.innerHeight && r.bottom > 0 &&
               !e.closest('foreignObject');
      })
      .slice(0, 3);

    const heroTexts = h1s.map(h1 => h1.textContent.trim()).join(' ');
    const hero = h1s.length > 0 ? {
      tag: 'h1 (split)',
      className: h1s[0].className,
      text: heroTexts,
      fontSize: window.getComputedStyle(h1s[0]).fontSize,
      fontWeight: window.getComputedStyle(h1s[0]).fontWeight,
      lineHeight: window.getComputedStyle(h1s[0]).lineHeight,
      letterSpacing: window.getComputedStyle(h1s[0]).letterSpacing,
      boundingRect: {
        top: Math.round(h1s[0].getBoundingClientRect().top),
        left: Math.round(h1s[0].getBoundingClientRect().left),
        width: Math.round(Math.max(...h1s.map(h => h.getBoundingClientRect().width))),
        height: Math.round(h1s[h1s.length-1].getBoundingClientRect().bottom - h1s[0].getBoundingClientRect().top)
      }
    } : null;

    return {
      hero: hero,
      eyebrow: find('what we do', 'h2'),
      body: find('we believe marketing', 'p'),
      ctaViewCourse: find('view course', 'p'),
      ctaViewAll: find('view all', 'p'),
      cardTitle: find('social media growth', 'p')
    };
  });

  console.log('\n════════════════════════════════════════════════════════');
  console.log('RAMP STUDIO CORRECTED MEASUREMENTS (375×812)');
  console.log('════════════════════════════════════════════════════════\n');

  const report = (name, el) => {
    console.log(`[${name}]`);
    if (!el) {
      console.log('  NOT FOUND\n');
    } else {
      console.log(`  TAG: ${el.tag}`);
      console.log(`  CLASS: ${el.className}`);
      console.log(`  TEXT: "${el.text}"`);
      console.log(`  FONT-SIZE: ${el.fontSize}`);
      console.log(`  FONT-WEIGHT: ${el.fontWeight}`);
      console.log(`  LINE-HEIGHT: ${el.lineHeight}`);
      console.log(`  LETTER-SPACING: ${el.letterSpacing}`);
      console.log(`  BOUNDING-RECT: top=${el.boundingRect.top}px left=${el.boundingRect.left}px width=${el.boundingRect.width}px height=${el.boundingRect.height}px bottom=${el.boundingRect.bottom}px\n`);
    }
  };

  report('HERO', results.hero);
  report('EYEBROW', results.eyebrow);
  report('BODY', results.body);
  report('CTA: VIEW COURSE', results.ctaViewCourse);
  report('CTA: VIEW ALL', results.ctaViewAll);
  report('CARD TITLE', results.cardTitle);

  console.log('════════════════════════════════════════════════════════');

  await context.close();
  await browser.close();
}

measureRampCorrected().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
