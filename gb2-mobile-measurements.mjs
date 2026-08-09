import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';
const VIEWPORTS = [
  { width: 375, height: 667, name: '375px (iPhone SE)' },
  { width: 390, height: 844, name: '390px (iPhone 12)' },
  { width: 414, height: 896, name: '414px (iPhone XR)' },
  { width: 440, height: 956, name: '440px (iPhone 17 Pro Max)' }
];

async function measureMobileCarousels() {
  const browser = await chromium.launch();
  
  try {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      const measurements = await page.evaluate(() => {
        // BlocksCarousel measurements
        const coursesRight = document.querySelector('.courses-right');
        const blocksViewport = document.querySelector('.carousel-viewport');
        const blocksCard = document.querySelector('.block-card');
        
        const blocksData = coursesRight && blocksViewport && blocksCard ? {
          coursesRightWidth: coursesRight.offsetWidth,
          viewportWidth: blocksViewport.offsetWidth,
          cardWidth: blocksCard.offsetWidth,
          cardHeight: blocksCard.offsetHeight,
          trackPosition: window.getComputedStyle(document.querySelector('.carousel-track')).position
        } : null;

        // WhoItsFor measurements
        const whoViewport = document.querySelector('.carousel-viewport-v2');
        const whoCard = document.querySelector('.testimonial-card-v2');
        
        const whoData = whoViewport && whoCard ? {
          viewportWidth: whoViewport.offsetWidth,
          cardWidth: whoCard.offsetWidth,
          cardHeight: whoCard.offsetHeight,
          trackPosition: window.getComputedStyle(document.querySelector('.carousel-track-v2')).position
        } : null;

        return { 
          windowWidth: window.innerWidth,
          blocksCarousel: blocksData,
          whoItsFor: whoData
        };
      });

      console.log(`\n${'='.repeat(70)}`);
      console.log(`${viewport.name}`);
      console.log('='.repeat(70));
      
      if (measurements.blocksCarousel) {
        const bc = measurements.blocksCarousel;
        const peek = bc.viewportWidth - bc.cardWidth;
        const unused = viewport.width - bc.viewportWidth;
        
        console.log(`BlocksCarousel:`);
        console.log(`  .courses-right width: ${bc.coursesRightWidth}px`);
        console.log(`  .carousel-viewport width: ${bc.viewportWidth}px`);
        console.log(`  Card width: ${bc.cardWidth}px`);
        console.log(`  Peek of next card: ${peek}px`);
        console.log(`  Unused space (rightmost): ${unused}px`);
        console.log(`  Track position: ${bc.trackPosition}`);
      }
      
      if (measurements.whoItsFor) {
        const wi = measurements.whoItsFor;
        const peek = wi.viewportWidth - wi.cardWidth;
        
        console.log(`\nWhoItsFor:`);
        console.log(`  .carousel-viewport-v2 width: ${wi.viewportWidth}px`);
        console.log(`  Card width: ${wi.cardWidth}px`);
        console.log(`  Peek of next card: ${peek}px`);
        console.log(`  Track position: ${wi.trackPosition}`);
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }
}

measureMobileCarousels().catch(console.error);
