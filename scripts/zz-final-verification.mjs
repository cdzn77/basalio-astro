import { chromium } from 'playwright';

async function zzFinal() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    // ZZ1: BlocksCarousel and WhoItsFor container sizes at 320px
    const blocksViewport = document.querySelector('.carousel-viewport');
    const blocksRight = document.querySelector('.courses-right');
    const whoItsForViewport = document.querySelector('.carousel-viewport-v2');
    const whoItsForRight = document.querySelector('.testimonials-v2-right');
    
    // ZZ2: Hero heading font-size and accent-word width
    const heroHeading = document.querySelector('.hero-heading');
    const accentWord = document.querySelector('.accent-word');
    const heroComputedStyle = window.getComputedStyle(heroHeading);
    const accentRect = accentWord?.getBoundingClientRect();

    return {
      viewport: window.innerWidth,
      blocksCarousel: {
        viewportWidth: blocksViewport?.offsetWidth || 0,
        rightWidth: blocksRight?.offsetWidth || 0
      },
      whoItsFor: {
        viewportWidth: whoItsForViewport?.offsetWidth || 0,
        rightWidth: whoItsForRight?.offsetWidth || 0
      },
      heroHeading: {
        fontSize: heroComputedStyle.fontSize,
        accentWordWidth: Math.ceil(accentRect?.width || 0),
        accentWordRight: Math.ceil(accentRect?.right || 0),
        viewportWidth: window.innerWidth,
        overflow: Math.max(0, Math.ceil(accentRect?.right || 0) - window.innerWidth)
      }
    };
  });

  console.log('═'.repeat(70));
  console.log('ZZ FINAL VERIFICATION at 320px viewport');
  console.log('═'.repeat(70) + '\n');

  console.log('ZZ1.1: BlocksCarousel at 320px');
  console.log(`  Container width: ${data.blocksCarousel.viewportWidth}px (should be 280px) ${data.blocksCarousel.viewportWidth === 280 ? '✓' : '✗'}`);
  console.log(`  Right column width: ${data.blocksCarousel.rightWidth}px (should be 280px) ${data.blocksCarousel.rightWidth === 280 ? '✓' : '✗'}\n`);

  console.log('ZZ1.2: WhoItsFor at 320px');
  console.log(`  Container width: ${data.whoItsFor.viewportWidth}px (should be 280px) ${data.whoItsFor.viewportWidth === 280 ? '✓' : '✗'}`);
  console.log(`  Right column width: ${data.whoItsFor.rightWidth}px (should be 280px) ${data.whoItsFor.rightWidth === 280 ? '✓' : '✗'}\n`);

  console.log('ZZ2: Hero heading at 320px');
  console.log(`  Font-size: ${data.heroHeading.fontSize} (should be 40px) ${data.heroHeading.fontSize === '40px' ? '✓' : '✗'}`);
  console.log(`  Accent-word "interactions," width: ${data.heroHeading.accentWordWidth}px`);
  console.log(`  Accent-word right position: ${data.heroHeading.accentWordRight}px (should be ≤320px)`);
  console.log(`  Overflow: ${data.heroHeading.overflow}px (should be 0px) ${data.heroHeading.overflow === 0 ? '✓' : '✗'}\n`);

  await browser.close();

  const allPass = 
    data.blocksCarousel.viewportWidth === 280 &&
    data.blocksCarousel.rightWidth === 280 &&
    data.whoItsFor.viewportWidth === 280 &&
    data.whoItsFor.rightWidth === 280 &&
    data.heroHeading.fontSize === '40px' &&
    data.heroHeading.overflow === 0;

  console.log('═'.repeat(70));
  console.log(allPass ? '✅ ALL FIXES VERIFIED' : '❌ SOME FIXES FAILED');
  console.log('═'.repeat(70));
}

zzFinal().catch(err => console.error(err.message));
