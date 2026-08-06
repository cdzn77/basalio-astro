import { chromium } from 'playwright';

async function rr1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const flex = await page.evaluate(() => {
    const track = document.querySelector('.carousel-track-v2');
    const card = document.querySelector('.testimonial-card-v2');
    const trackStyle = window.getComputedStyle(track);
    const cardStyle = window.getComputedStyle(card);
    
    return {
      track: {
        display: trackStyle.display,
        flexDirection: trackStyle.flexDirection,
        alignItems: trackStyle.alignItems,
        justifyContent: trackStyle.justifyContent,
        position: trackStyle.position,
        height: trackStyle.height
      },
      card: {
        display: cardStyle.display,
        flex: cardStyle.flex,
        flexBasis: cardStyle.flexBasis,
        flexGrow: cardStyle.flexGrow,
        flexShrink: cardStyle.flexShrink,
        alignSelf: cardStyle.alignSelf,
        height: cardStyle.height,
        minHeight: cardStyle.minHeight,
        maxHeight: cardStyle.maxHeight
      }
    };
  });

  console.log('Flexbox alignment analysis:\n');
  console.log('Track (.carousel-track-v2):');
  Object.entries(flex.track).forEach(([key, val]) => {
    console.log(`  ${key}: ${val}`);
  });
  
  console.log('\nCard (.testimonial-card-v2):');
  Object.entries(flex.card).forEach(([key, val]) => {
    console.log(`  ${key}: ${val}`);
  });

  await page.close();
  await browser.close();
}

rr1().catch(err => console.error(err.message));
