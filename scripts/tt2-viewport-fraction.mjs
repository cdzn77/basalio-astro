import { chromium } from 'playwright';

async function tt2() {
  const viewportHeight = 812;
  const heights = [467, 500, 547];

  console.log('TT2: Card height as fraction of 812px viewport\n');
  heights.forEach(h => {
    const fraction = (h / viewportHeight * 100).toFixed(1);
    console.log(`  ${h}px card: ${fraction}% of viewport`);
  });

  console.log('\nTT2: Measuring Ramp Studio testimonial card at 375x812\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const rampData = await page.evaluate(() => {
    // Find testimonial cards on Ramp
    const cards = document.querySelectorAll('[class*="card"]');
    const testimonialCards = Array.from(cards).filter(el => {
      const text = el.textContent || '';
      return text.length > 100 && text.length < 500; // Testimonial-sized content
    });

    if (testimonialCards.length === 0) {
      return { error: 'No testimonial cards found' };
    }

    const firstCard = testimonialCards[0];
    return {
      cardHeight: firstCard.offsetHeight,
      cardWidth: firstCard.offsetWidth,
      found: testimonialCards.length,
      innerHTML: firstCard.outerHTML.substring(0, 200)
    };
  });

  if (rampData.error) {
    console.log(`  ⚠️ ${rampData.error}`);
    console.log(`  Ramp page structure differs from expected. Manual inspection needed.`);
  } else {
    console.log(`  Ramp testimonial card height: ${rampData.cardHeight}px`);
    console.log(`  Ramp card width: ${rampData.cardWidth}px`);
    console.log(`  Fraction of viewport: ${(rampData.cardHeight / viewportHeight * 100).toFixed(1)}%`);
    console.log(`  Testimonial cards found: ${rampData.found}`);
  }

  console.log('\nComparison:\n');
  console.log(`  Basalio (current): 467–547px (57–67% of viewport)`);
  if (rampData.cardHeight) {
    console.log(`  Ramp (benchmark): ${rampData.cardHeight}px (${(rampData.cardHeight / viewportHeight * 100).toFixed(1)}% of viewport)`);
  }

  await browser.close();
}

tt2().catch(err => console.error(err.message));
