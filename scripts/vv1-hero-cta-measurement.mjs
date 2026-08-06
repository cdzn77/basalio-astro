import { chromium } from 'playwright';

async function vv1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const heroData = await page.evaluate(() => {
    // VV1.1: Report what element was matched as CTA
    const firstCta = document.querySelector('[class*="btn"], button, a[class*="cta"]');
    
    // VV1.2: Find the HERO section's CTA button specifically
    const heroSection = document.querySelector('section');
    const exploreButton = heroSection?.querySelector('[class*="btn"], button') || 
                         document.querySelector('a[href*="#blocks"], a[href*="blocks"]');
    
    const heroRect = heroSection?.getBoundingClientRect() || { height: 0 };
    const h1Rect = document.querySelector('h1')?.getBoundingClientRect() || { height: 0 };
    
    // VV1.1: Details of first matched element
    const firstCtaInfo = firstCta ? {
      tag: firstCta.tagName,
      className: firstCta.className,
      textContent: firstCta.textContent?.trim().substring(0, 30),
      top: firstCta.getBoundingClientRect().top,
      bottom: firstCta.getBoundingClientRect().bottom
    } : null;
    
    // VV1.2: Details of hero section's actual CTA
    const heroCta = exploreButton ? {
      tag: exploreButton.tagName,
      className: exploreButton.className,
      textContent: exploreButton.textContent?.trim().substring(0, 30),
      top: exploreButton.getBoundingClientRect().top,
      bottom: exploreButton.getBoundingClientRect().bottom
    } : null;

    return {
      firstMatchedElement: firstCtaInfo,
      heroCta: heroCta,
      heroHeight: heroRect.height,
      heroBottom: heroRect.bottom,
      h1Height: h1Rect.height,
      viewportHeight: window.innerHeight
    };
  });

  console.log('VV1: Hero CTA Measurement Correction\n');
  
  console.log('VV1.1: First matched CTA element (was this used?)');
  if (heroData.firstMatchedElement) {
    console.log(`  Tag: ${heroData.firstMatchedElement.tag}`);
    console.log(`  Class: ${heroData.firstMatchedElement.className}`);
    console.log(`  Text: "${heroData.firstMatchedElement.textContent}"`);
    console.log(`  Top: ${heroData.firstMatchedElement.top}px`);
    console.log(`  Bottom: ${heroData.firstMatchedElement.bottom}px`);
  }
  
  console.log('\nVV1.2: Hero section CTA (EXPLORE BLOCKS button)');
  if (heroData.heroCta) {
    console.log(`  Tag: ${heroData.heroCta.tag}`);
    console.log(`  Class: ${heroData.heroCta.className}`);
    console.log(`  Text: "${heroData.heroCta.textContent}"`);
    console.log(`  Top: ${heroData.heroCta.top}px`);
    console.log(`  Bottom: ${heroData.heroCta.bottom}px`);
  } else {
    console.log('  ❌ Not found via selector');
  }
  
  console.log(`\nVV1.3: CTA vs fold line (900px)`);
  if (heroData.heroCta) {
    const aboveFold = heroData.heroCta.bottom <= 900;
    console.log(`  CTA bottom: ${heroData.heroCta.bottom}px`);
    console.log(`  Fold line: 900px`);
    console.log(`  Above fold: ${aboveFold ? '✅ YES' : '❌ NO'}`);
  }
  
  console.log(`\nVV1.4: Hero section height vs fold`);
  console.log(`  Hero height: ${heroData.heroHeight}px`);
  console.log(`  Hero bottom: ${heroData.heroBottom}px`);
  console.log(`  Fold line: 900px`);
  console.log(`  Exceeds by: ${heroData.heroBottom - 900}px`);

  await browser.close();
}

vv1().catch(err => console.error(err.message));
