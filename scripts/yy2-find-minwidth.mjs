import { chromium } from 'playwright';

async function yy2() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });

  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const card = document.querySelector('.testimonial-card-v2');
    const track = document.querySelector('.carousel-track-v2');
    const viewport = document.querySelector('.carousel-viewport-v2');

    return {
      card: {
        minWidth: window.getComputedStyle(card).minWidth,
        width: window.getComputedStyle(card).width,
        flexBasis: window.getComputedStyle(card).flexBasis
      },
      track: {
        minWidth: window.getComputedStyle(track).minWidth,
        width: window.getComputedStyle(track).width
      },
      viewport: {
        minWidth: window.getComputedStyle(viewport).minWidth,
        width: window.getComputedStyle(viewport).width,
        maxWidth: window.getComputedStyle(viewport).maxWidth
      }
    };
  });

  console.log('YY2: Min-width constraint diagnosis\n');
  console.log('YY2.1-2.2: Where is the min-width?\n');
  
  console.log('.testimonial-card-v2 (card):');
  console.log(`  min-width: ${data.card.minWidth}`);
  console.log(`  width: ${data.card.width}`);
  console.log(`  flex-basis: ${data.card.flexBasis}`);
  
  console.log('\n.carousel-track-v2 (track):');
  console.log(`  min-width: ${data.track.minWidth}`);
  console.log(`  width: ${data.track.width}`);
  
  console.log('\n.carousel-viewport-v2 (viewport):');
  console.log(`  min-width: ${data.viewport.minWidth}`);
  console.log(`  width: ${data.viewport.width}`);
  console.log(`  max-width: ${data.viewport.maxWidth}`);

  await browser.close();
}

yy2().catch(err => console.error(err.message));
