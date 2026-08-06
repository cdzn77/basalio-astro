import { chromium } from 'playwright';

async function rr1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const viewport = document.querySelector('.carousel-viewport-v2');
    const track = document.querySelector('.carousel-track-v2');
    const card = document.querySelector('.testimonial-card-v2');
    
    return {
      viewportHeight: viewport?.offsetHeight,
      viewportComputedHeight: window.getComputedStyle(viewport || {}).height,
      trackHeight: track?.offsetHeight,
      trackComputedHeight: window.getComputedStyle(track || {}).height,
      cardHeight: card?.offsetHeight,
      cardComputedHeight: window.getComputedStyle(card).height,
      cardDisplay: window.getComputedStyle(card).display,
      trackDisplay: window.getComputedStyle(track || {}).display,
      trackFlex: window.getComputedStyle(track || {}).flex
    };
  });

  console.log('Container height analysis at 375px:\n');
  console.log(`Viewport (.carousel-viewport-v2):`);
  console.log(`  Offset height: ${data.viewportHeight}px`);
  console.log(`  Computed height: ${data.viewportComputedHeight}`);
  
  console.log(`\nTrack (.carousel-track-v2):`);
  console.log(`  Offset height: ${data.trackHeight}px`);
  console.log(`  Computed height: ${data.trackComputedHeight}`);
  console.log(`  Display: ${data.trackDisplay}`);
  console.log(`  Flex: ${data.trackFlex}`);
  
  console.log(`\nCard (.testimonial-card-v2):`);
  console.log(`  Offset height: ${data.cardHeight}px`);
  console.log(`  Computed height: ${data.cardComputedHeight}`);
  console.log(`  Display: ${data.cardDisplay}`);

  await page.close();
  await browser.close();
}

rr1().catch(err => console.error(err.message));
