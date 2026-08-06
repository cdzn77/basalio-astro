import { chromium } from 'playwright';

async function kk4HeroFold() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const heroData = await page.evaluate(() => {
    const hero = document.querySelector('section') || document.querySelector('[class*="hero"]');
    const h1 = document.querySelector('h1');
    const cta = document.querySelector('[class*="btn"], button, a[class*="cta"]');
    
    if (!hero || !h1 || !cta) {
      return { error: 'Hero section elements not found' };
    }

    const heroRect = hero.getBoundingClientRect();
    const h1Rect = h1.getBoundingClientRect();
    const ctaRect = cta.getBoundingClientRect();
    
    // Line count estimate: h1 height / line-height
    const h1Style = window.getComputedStyle(h1);
    const lineHeight = parseFloat(h1Style.lineHeight);
    const h1LineCount = Math.round(h1Rect.height / lineHeight);

    const ctaBottom = ctaRect.bottom;
    const foldLine = window.innerHeight;
    const pixelsFromFold = ctaBottom - foldLine;

    return {
      heroTop: heroRect.top,
      heroBottom: heroRect.bottom,
      heroHeight: heroRect.height,
      h1Height: h1Rect.height,
      h1LineCount: h1LineCount,
      h1Text: h1.textContent.substring(0, 60),
      ctaY: ctaRect.top,
      ctaHeight: ctaRect.height,
      ctaBottom: ctaBottom,
      foldLine: foldLine,
      ctaVisibleAboveFold: ctaBottom <= foldLine,
      pixelsFromFold: pixelsFromFold,
      viewportHeight: window.innerHeight
    };
  });

  if (heroData.error) {
    console.log(`❌ ${heroData.error}`);
  } else {
    console.log('KK4.1: Hero fold analysis at 1280x900\n');
    console.log(`📐 Viewport: 1280x900, fold line at 900px`);
    console.log(`\nHero section:`);
    console.log(`  Top: ${heroData.heroTop}px`);
    console.log(`  Height: ${heroData.heroHeight}px`);
    console.log(`  Bottom: ${heroData.heroBottom}px`);
    
    console.log(`\nH1 heading:`);
    console.log(`  Height: ${heroData.h1Height}px`);
    console.log(`  Line count: ${heroData.h1LineCount}`);
    console.log(`  Text: "${heroData.h1Text}..."`);
    
    console.log(`\nCTA button:`);
    console.log(`  Top: ${heroData.ctaY}px`);
    console.log(`  Height: ${heroData.ctaHeight}px`);
    console.log(`  Bottom: ${heroData.ctaBottom}px`);
    console.log(`  Above fold: ${heroData.ctaVisibleAboveFold ? '✅ YES' : '❌ NO (BELOW FOLD)'}`);
    console.log(`  Distance from fold: ${heroData.pixelsFromFold > 0 ? `${heroData.pixelsFromFold}px below` : `${Math.abs(heroData.pixelsFromFold)}px above`}`);
    
    if (heroData.ctaVisibleAboveFold) {
      console.log(`\n✅ CTA is above the fold line (900px). Hero is fully visible without scrolling.`);
    } else {
      console.log(`\n⚠️ STOP: CTA is below the fold line. Hero does not fit in 1280x900 viewport.`);
    }
  }

  // Take screenshot
  await page.screenshot({ path: '/private/tmp/kk4-hero-fold-1280x900.png', fullPage: false });
  console.log(`\n📸 Screenshot saved: /private/tmp/kk4-hero-fold-1280x900.png`);

  await browser.close();
}

kk4HeroFold().catch(err => console.error(err.message));
