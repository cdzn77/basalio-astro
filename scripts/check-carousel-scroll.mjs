import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

const carouselData = await page.evaluate(() => {
  // BlocksCarousel track
  const bcTrack = document.querySelector('.carousel-track');
  const bcViewport = document.querySelector('.carousel-viewport');
  
  // WhoItsFor row
  const wiRow = document.querySelector('.who-its-for-row');
  
  const bcResult = bcTrack ? {
    element: 'BlocksCarousel .carousel-track',
    overflow: window.getComputedStyle(bcTrack).overflow,
    overflowX: window.getComputedStyle(bcTrack).overflowX,
    overflowY: window.getComputedStyle(bcTrack).overflowY,
    scrollBehavior: window.getComputedStyle(bcTrack).scrollBehavior,
    scrollWidth: bcTrack.scrollWidth,
    clientWidth: bcTrack.clientWidth,
    canScroll: bcTrack.scrollWidth > bcTrack.clientWidth
  } : null;
  
  const wiResult = wiRow ? {
    element: 'WhoItsFor .who-its-for-row',
    overflow: window.getComputedStyle(wiRow).overflow,
    overflowX: window.getComputedStyle(wiRow).overflowX,
    overflowY: window.getComputedStyle(wiRow).overflowY,
    scrollBehavior: window.getComputedStyle(wiRow).scrollBehavior,
    scrollWidth: wiRow.scrollWidth,
    clientWidth: wiRow.clientWidth,
    canScroll: wiRow.scrollWidth > wiRow.clientWidth
  } : null;
  
  return { bcResult, wiResult };
});

if (carouselData.bcResult) {
  console.log('a) BlocksCarousel .carousel-track:');
  console.log(`   overflow: ${carouselData.bcResult.overflow}`);
  console.log(`   overflow-x: ${carouselData.bcResult.overflowX}`);
  console.log(`   overflow-y: ${carouselData.bcResult.overflowY}`);
  console.log(`   scroll-behavior: ${carouselData.bcResult.scrollBehavior}`);
  console.log(`   scrollWidth: ${carouselData.bcResult.scrollWidth}px, clientWidth: ${carouselData.bcResult.clientWidth}px`);
  console.log(`   Can scroll horizontally: ${carouselData.bcResult.canScroll}`);
} else {
  console.log('a) BlocksCarousel .carousel-track not found');
}

console.log();

if (carouselData.wiResult) {
  console.log('b) WhoItsFor .who-its-for-row:');
  console.log(`   overflow: ${carouselData.wiResult.overflow}`);
  console.log(`   overflow-x: ${carouselData.wiResult.overflowX}`);
  console.log(`   overflow-y: ${carouselData.wiResult.overflowY}`);
  console.log(`   scroll-behavior: ${carouselData.wiResult.scrollBehavior}`);
  console.log(`   scrollWidth: ${carouselData.wiResult.scrollWidth}px, clientWidth: ${carouselData.wiResult.clientWidth}px`);
  console.log(`   Can scroll horizontally: ${carouselData.wiResult.canScroll}`);
} else {
  console.log('b) WhoItsFor .who-its-for-row not found');
}

await browser.close();
