import { chromium } from 'playwright';

async function qq2() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 1200 } });
  
  // BlocksCarousel (/blocks page)
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  const blocksData = await page.evaluate(() => {
    const viewport = document.querySelector('.carousel-viewport');
    const card = document.querySelector('.block-card');
    const track = document.querySelector('.carousel-track');
    
    return {
      container: document.querySelector('.courses-right')?.offsetWidth,
      viewport: viewport?.offsetWidth,
      cardWidth: card?.offsetWidth,
      cardHeight: card?.offsetHeight,
      gap: window.getComputedStyle(track || {}).gap,
      innerWidth: window.innerWidth
    };
  });
  
  console.log('BlocksCarousel at 375px:');
  console.log(`  Container: ${blocksData.container}px`);
  console.log(`  Viewport: ${blocksData.viewport}px`);
  console.log(`  Card: ${blocksData.cardWidth}px × ${blocksData.cardHeight}px`);
  console.log(`  Gap: ${blocksData.gap}`);
  console.log(`  Peek (viewport − card − gap): ${blocksData.viewport - blocksData.cardWidth - parseInt(blocksData.gap)}px`);
  
  await page.close();

  // WhoItsFor (/index page)
  const page2 = await browser.newPage({ viewport: { width: 375, height: 1200 } });
  await page2.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(500);
  
  const whoitsforData = await page2.evaluate(() => {
    const viewport = document.querySelector('.carousel-viewport-v2');
    const card = document.querySelector('.testimonial-card-v2');
    const track = document.querySelector('.carousel-track-v2');
    
    return {
      container: document.querySelector('.courses-right')?.offsetWidth,
      viewport: viewport?.offsetWidth,
      cardWidth: card?.offsetWidth,
      cardHeight: card?.offsetHeight,
      gap: window.getComputedStyle(track || {}).gap,
      innerWidth: window.innerWidth
    };
  });
  
  console.log('\n\nWhoItsFor (testimonials) at 375px:');
  console.log(`  Container: ${whoitsforData.container}px`);
  console.log(`  Viewport: ${whoitsforData.viewport}px`);
  console.log(`  Card: ${whoitsforData.cardWidth}px × ${whoitsforData.cardHeight}px`);
  console.log(`  Gap: ${whoitsforData.gap}`);
  console.log(`  Peek (viewport − card − gap): ${whoitsforData.viewport - whoitsforData.cardWidth - parseInt(whoitsforData.gap)}px`);
  
  await page2.close();
  await browser.close();
}

qq2().catch(err => console.error(err.message));
