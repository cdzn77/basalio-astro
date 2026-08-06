import { chromium } from 'playwright';

async function uu2() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  console.log('UU2: Measuring Ramp testimonial card height at 375x812\n');
  
  try {
    await page.goto('https://rampstudio.framer.website', { 
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(2000);

    const rampHeight = await page.evaluate(() => {
      // Find "Learner Stories" heading
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const learnerStoriesHeading = headings.find(h => 
        h.textContent.includes('Learner') || h.textContent.includes('Stories')
      );

      if (!learnerStoriesHeading) {
        return { error: 'Learner Stories heading not found' };
      }

      // Walk down to find the first card-like container
      let current = learnerStoriesHeading;
      let depth = 0;
      while (current && depth < 10) {
        const next = current.nextElementSibling;
        if (next) {
          // Check if this looks like a testimonial card
          const hasImage = next.querySelector('img');
          const hasQuote = next.textContent.length > 100 && next.textContent.length < 1000;
          const isCard = next.offsetHeight > 300 && next.offsetHeight < 800;
          
          if (hasImage && hasQuote && isCard) {
            return {
              found: true,
              cardHeight: next.offsetHeight,
              cardWidth: next.offsetWidth,
              hasImage: !!hasImage,
              contentLength: next.textContent.length,
              sample: next.textContent.substring(0, 100)
            };
          }
        }
        current = next;
        depth++;
      }

      // Fallback: look for any card with image + text that's in viewport range
      const allCards = document.querySelectorAll('[class*="card"], div[style*="flex"]');
      for (const card of allCards) {
        const img = card.querySelector('img');
        const text = card.textContent;
        const h = card.offsetHeight;
        if (img && text.length > 100 && text.length < 1000 && h > 300 && h < 800) {
          return {
            found: true,
            cardHeight: h,
            cardWidth: card.offsetWidth,
            hasImage: true,
            contentLength: text.length,
            sample: text.substring(0, 100)
          };
        }
      }

      return { error: 'No testimonial card found via DOM walk' };
    });

    if (rampHeight.error) {
      console.log(`⚠️ ${rampHeight.error}`);
      console.log(`Ramp page structure requires manual inspection.`);
    } else {
      const fraction = (rampHeight.cardHeight / 812 * 100).toFixed(1);
      console.log(`✅ Ramp testimonial card found`);
      console.log(`   Height: ${rampHeight.cardHeight}px`);
      console.log(`   Width: ${rampHeight.cardWidth}px`);
      console.log(`   Fraction of 812px viewport: ${fraction}%`);
      console.log(`   Sample text: "${rampHeight.sample}..."`);
      
      console.log(`\nComparison:`);
      console.log(`   Basalio (Scenario A): 503px (61.9% of viewport)`);
      console.log(`   Ramp benchmark: ${rampHeight.cardHeight}px (${fraction}% of viewport)`);
      
      if (rampHeight.cardHeight >= 480 && rampHeight.cardHeight <= 550) {
        console.log(`   ✅ 503px is within normal range for this pattern`);
      } else if (rampHeight.cardHeight < 480) {
        console.log(`   ⚠️ Ramp is leaner; optimization may continue`);
      } else {
        console.log(`   ⚠️ Ramp is taller; 503px is conservative`);
      }
    }
  } catch (error) {
    console.log(`❌ Error loading Ramp: ${error.message}`);
    console.log(`Unable to fetch benchmark. Manual inspection recommended.`);
  }

  await browser.close();
}

uu2().catch(err => console.error(err.message));
