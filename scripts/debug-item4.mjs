import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const data = await page.evaluate(() => {
  const leftCol = document.querySelector('.courses-left');
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.querySelector('.carousel-track');
  const coursesRow = document.querySelector('.courses-row');
  const cards = document.querySelectorAll('.carousel-track > *');

  if (!leftCol || !viewport || !track) {
    return { error: 'Elements not found' };
  }

  const leftColWidth = parseInt(window.getComputedStyle(leftCol).width);
  const viewportWidth = parseInt(window.getComputedStyle(viewport).width);
  const trackWidth = parseInt(window.getComputedStyle(track).width);
  
  // Get the actual container (courses-row)
  const coursesRowWidth = coursesRow ? parseInt(window.getComputedStyle(coursesRow).width) : 'N/A';
  const coursesRowMaxWidth = coursesRow ? window.getComputedStyle(coursesRow).maxWidth : 'N/A';
  
  // Get card width from first card
  const cardWidth = cards[0] ? parseInt(window.getComputedStyle(cards[0]).width) : 0;
  
  // Get gap from track
  const gap = parseInt(window.getComputedStyle(track).gap) || 0;
  
  // Calculate cardsPerView from viewport
  const cardsPerView = Math.max(1, Math.floor((viewportWidth + gap) / (cardWidth + gap)));
  
  // Calculate space used
  const totalUsed = leftColWidth + viewportWidth;

  return {
    leftColWidth,
    viewportWidth,
    cardWidth,
    gap,
    cardsPerView,
    totalCards: cards.length,
    coursesRowWidth,
    coursesRowMaxWidth,
    trackWidth,
    totalUsed,
    leftover: coursesRowWidth - totalUsed
  };
});

console.log('ITEM 4 DEBUG — 1440px (current 500px left column):');
console.log(JSON.stringify(data, null, 2));

// Calculate what EO2 would be (431px left column)
const eo2Data = await page.evaluate(() => {
  // Simulate shrinking left column to 431px
  const cards = document.querySelectorAll('.carousel-track > *');
  const cardWidth = cards[0] ? parseInt(window.getComputedStyle(cards[0]).width) : 410;
  const gap = 20; // standard gap
  
  const leftColShrunk = 431;
  const coursesRow = document.querySelector('.courses-row');
  const coursesRowWidth = coursesRow ? parseInt(window.getComputedStyle(coursesRow).width) : 1440;
  
  const viewportWithEO2 = coursesRowWidth - leftColShrunk;
  const cardsPerViewEO2 = Math.max(1, Math.floor((viewportWithEO2 + gap) / (cardWidth + gap)));

  return {
    leftColShrunk,
    viewportWithEO2,
    cardWidth,
    gap,
    cardsPerViewEO2,
    totalCards: cards.length
  };
});

console.log('\nEO2 SIMULATION — 431px left column:');
console.log(JSON.stringify(eo2Data, null, 2));

await browser.close();
