import { chromium } from 'playwright';

async function measureVariants() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

  console.log('\n════════════════════════════════════════════════════════');
  console.log('VARIANT MEASUREMENTS AT 375×812');
  console.log('════════════════════════════════════════════════════════\n');

  // DA1: Measure body paragraph heights
  console.log('DA1 — BODY COPY MEASUREMENTS:\n');

  const bodySizes = [16, 18, 20];
  for (const size of bodySizes) {
    await page.addInitScript(`
      const style = document.createElement('style');
      style.textContent = \`p { font-size: ${size}px !important; line-height: 1.6 !important; }\`;
      document.head.appendChild(style);
    `);

    // Reload to apply styles
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const measurements = await page.evaluate(() => {
      // Find first visible body paragraph (not in nav, not label)
      const ps = [...document.querySelectorAll('p')]
        .filter(p => {
          const r = p.getBoundingClientRect();
          return r.height > 0 && r.top > 200 && !p.closest('[class*="nav"]') &&
                 !p.closest('[class*="label"]') && p.textContent.length > 100;
        });

      if (ps.length === 0) return null;

      const p = ps[0];
      const style = window.getComputedStyle(p);
      const rect = p.getBoundingClientRect();

      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        height: Math.round(rect.height),
        text: p.textContent.substring(0, 80)
      };
    });

    if (measurements) {
      console.log(`  ${size}px:`);
      console.log(`    Computed: ${measurements.fontSize} / ${measurements.fontWeight} / ${measurements.lineHeight}`);
      console.log(`    Paragraph height: ${measurements.height}px`);
      console.log(`    Sample: "${measurements.text}..."\n`);
    }
  }

  // DA2: Hero eyebrow current state
  console.log('DA2 — EYEBROW STYLE (CURRENT):\n');

  const eyebrowCurrent = await page.evaluate(() => {
    const eyebrow = document.querySelector('.hero-eyebrow');
    if (!eyebrow) return null;

    const style = window.getComputedStyle(eyebrow);
    const rect = eyebrow.getBoundingClientRect();

    return {
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      fontFamily: style.fontFamily,
      textTransform: style.textTransform,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      text: eyebrow.textContent.trim()
    };
  });

  if (eyebrowCurrent) {
    console.log('  Current (.hero-eyebrow):');
    console.log(`    Font: ${eyebrowCurrent.fontSize} / ${eyebrowCurrent.fontWeight} / ${eyebrowCurrent.lineHeight}`);
    console.log(`    Letter-spacing: ${eyebrowCurrent.letterSpacing}`);
    console.log(`    Font-family: ${eyebrowCurrent.fontFamily}`);
    console.log(`    Text-transform: ${eyebrowCurrent.textTransform}`);
    console.log(`    Dimensions: ${eyebrowCurrent.width}px × ${eyebrowCurrent.height}px`);
    console.log(`    Text: "${eyebrowCurrent.text}"\n`);
  }

  // DA3: Hero h1 padding/inset
  console.log('DA3 — HERO H1 FULL-BLEED INSPECTION:\n');

  const heroInspection = await page.evaluate(() => {
    const hero = document.querySelector('.hero');
    const h1 = document.querySelector('.hero-heading');

    if (!hero || !h1) return null;

    const heroRect = hero.getBoundingClientRect();
    const h1Rect = h1.getBoundingClientRect();
    const h1Style = window.getComputedStyle(h1);

    return {
      heroLeft: Math.round(heroRect.left),
      heroWidth: Math.round(heroRect.width),
      h1Left: Math.round(h1Rect.left),
      h1Width: Math.round(h1Rect.width),
      h1PaddingLeft: h1Style.paddingLeft,
      h1PaddingRight: h1Style.paddingRight,
      h1PaddingTop: h1Style.paddingTop,
      h1PaddingBottom: h1Style.paddingBottom,
      h1FontSize: h1Style.fontSize,
      h1FontWeight: h1Style.fontWeight,
      h1LineHeight: h1Style.lineHeight,
      h1LetterSpacing: h1Style.letterSpacing,
      h1Text: h1.textContent.trim().substring(0, 50)
    };
  });

  if (heroInspection) {
    console.log('  Hero container (.hero):');
    console.log(`    Left: ${heroInspection.heroLeft}px, Width: ${heroInspection.heroWidth}px`);
    console.log('\n  H1 heading (.hero-heading):');
    console.log(`    Left: ${heroInspection.h1Left}px, Width: ${heroInspection.h1Width}px`);
    console.log(`    Padding: ${heroInspection.h1PaddingLeft} top / ${heroInspection.h1PaddingRight} right / ${heroInspection.h1PaddingBottom} bottom / ${heroInspection.h1PaddingLeft} left`);
    console.log(`    Font: ${heroInspection.h1FontSize} / ${heroInspection.h1FontWeight} / ${heroInspection.h1LineHeight} / ${heroInspection.h1LetterSpacing}`);
    console.log(`    Full bleed: ${heroInspection.h1Left === 0 && heroInspection.h1Width === 375 ? 'YES (0px inset)' : `NO (${heroInspection.h1Left}px left inset)`}`);
    console.log(`    Text: "${heroInspection.h1Text}..."\n`);
  }

  // DA4: Hero h1 current state
  console.log('DA4 — HERO H1 CURRENT STATE:\n');

  const heroCurrent = await page.evaluate(() => {
    const h1 = document.querySelector('.hero-heading');
    if (!h1) return null;

    const style = window.getComputedStyle(h1);
    const rect = h1.getBoundingClientRect();

    return {
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      height: Math.round(rect.height),
      text: h1.textContent.trim().substring(0, 60)
    };
  });

  if (heroCurrent) {
    console.log('  Computed:');
    console.log(`    Font: ${heroCurrent.fontSize} / ${heroCurrent.fontWeight} / ${heroCurrent.lineHeight}`);
    console.log(`    Letter-spacing: ${heroCurrent.letterSpacing}`);
    console.log(`    Height: ${heroCurrent.height}px`);
    console.log(`    Text: "${heroCurrent.text}..."\n`);
  }

  console.log('════════════════════════════════════════════════════════\n');

  await context.close();
  await browser.close();
}

measureVariants().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
