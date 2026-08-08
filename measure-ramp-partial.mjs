import { chromium } from 'playwright';

async function measureRampPartial() {
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
  console.log(`window.innerWidth: ${innerWidth}`);
  if (innerWidth !== 375) throw new Error(`Expected 375, got ${innerWidth}`);

  await page.waitForTimeout(2000);

  const results = await page.evaluate(() => {
    const findPartial = (searchText) => {
      const elements = [...document.querySelectorAll('*')]
        .filter(e => e.children.length === 0 &&
                     e.textContent.trim().toLowerCase().includes(searchText.toLowerCase()));

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
            text: el.textContent.trim().substring(0, 100),
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            top: Math.round(r.top),
            left: Math.round(r.left),
            width: Math.round(r.width),
            height: Math.round(r.height),
            bottom: Math.round(r.bottom)
          };
        }
      }
      return null;
    };

    // Hero (split h1s)
    const h1s = [...document.querySelectorAll('h1.framer-text')]
      .filter(e => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && !e.closest('foreignObject');
      })
      .slice(0, 3);

    const hero = h1s.length > 0 ? {
      tag: 'h1 (split)',
      className: h1s[0].className,
      text: h1s.map(h => h.textContent.trim()).join(' '),
      fontSize: window.getComputedStyle(h1s[0]).fontSize,
      fontWeight: window.getComputedStyle(h1s[0]).fontWeight,
      lineHeight: window.getComputedStyle(h1s[0]).lineHeight,
      letterSpacing: window.getComputedStyle(h1s[0]).letterSpacing,
      top: Math.round(h1s[0].getBoundingClientRect().top),
      left: Math.round(h1s[0].getBoundingClientRect().left),
      width: Math.round(Math.max(...h1s.map(h => h.getBoundingClientRect().width))),
      height: Math.round(h1s[h1s.length-1].getBoundingClientRect().bottom - h1s[0].getBoundingClientRect().top),
      bottom: Math.round(h1s[h1s.length-1].getBoundingClientRect().bottom)
    } : null;

    return {
      hero,
      eyebrow: findPartial('What we do'),
      body: findPartial('We believe marketing'),
      ctaViewCourse: findPartial('View course'),
      ctaViewAll: findPartial('View all'),
      cardTitle: findPartial('Social Media Growth')
    };
  });

  console.log('\n════════════════════════════════════════════════════════');
  console.log('RAMP STUDIO — FINAL MEASUREMENTS (375×812 MOBILE)');
  console.log('════════════════════════════════════════════════════════\n');

  const report = (label, el) => {
    if (!el) {
      console.log(`${label}:\n  [NOT FOUND]\n`);
      return;
    }
    console.log(`${label}:`);
    console.log(`tag: ${el.tag}`);
    console.log(`class: ${el.className}`);
    console.log(`text: "${el.text}"`);
    console.log(`font-size / font-weight / line-height / letter-spacing: ${el.fontSize} / ${el.fontWeight} / ${el.lineHeight} / ${el.letterSpacing}`);
    console.log(`getBoundingClientRect: top=${el.top}px left=${el.left}px width=${el.width}px height=${el.height}px bottom=${el.bottom}px\n`);
  };

  report('HERO', results.hero);
  report('EYEBROW', results.eyebrow);
  report('BODY', results.body);
  report('CTA: View Course', results.ctaViewCourse);
  report('CTA: View All', results.ctaViewAll);
  report('CARD TITLE', results.cardTitle);

  console.log('════════════════════════════════════════════════════════\n');

  await context.close();
  await browser.close();
}

measureRampPartial().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
