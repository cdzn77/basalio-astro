import { chromium } from 'playwright';

async function uu2Retry() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });
  
  console.log('UU2 Retry: Content-based Ramp testimonial card measurement\n');
  
  try {
    await page.goto('https://rampstudio.framer.website', { 
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(2500);

    const result = await page.evaluate(() => {
      // Find "Maya Thompson" or similar client names in testimonials
      const allText = document.body.innerText;
      const hasMaya = allText.includes('Maya');
      const hasTestimonials = allText.includes('Learner') || allText.includes('testimonial');

      // Walk through all elements to find one with client name
      const elements = document.querySelectorAll('*');
      let mayaElement = null;
      
      for (const el of elements) {
        if (el.textContent.includes('Maya Thompson') || el.textContent.includes('Maya')) {
          mayaElement = el;
          break;
        }
      }

      if (!mayaElement) {
        return { 
          error: 'Maya Thompson not found',
          hasTestimonials,
          hasMaya,
          domPath: 'Not found'
        };
      }

      // Walk UP to find parent with image
      let current = mayaElement;
      let depth = 0;
      let cardElement = null;

      while (current && depth < 10) {
        const hasImg = current.querySelector('img');
        const rect = current.getBoundingClientRect();
        
        if (hasImg && rect.height > 300 && rect.height < 800) {
          cardElement = current;
          break;
        }
        
        current = current.parentElement;
        depth++;
      }

      if (!cardElement) {
        // Return DOM path for manual inspection
        let path = [];
        let el = mayaElement;
        for (let i = 0; i < 3 && el; i++) {
          path.unshift(`${el.tagName.toLowerCase()}${el.className ? '.' + el.className.split(' ')[0] : ''}`);
          el = el.parentElement;
        }
        return {
          error: 'No card with image found above Maya element',
          domPath: path.join(' > '),
          mayaParent: mayaElement.parentElement?.tagName
        };
      }

      const rect = cardElement.getBoundingClientRect();
      return {
        found: true,
        cardHeight: cardElement.offsetHeight,
        cardWidth: cardElement.offsetWidth,
        boundingHeight: rect.height,
        boundingWidth: rect.width,
        hasImage: !!cardElement.querySelector('img'),
        textLength: cardElement.textContent.length,
        sample: cardElement.textContent.substring(0, 80)
      };
    });

    if (result.error) {
      console.log(`⚠️ ${result.error}`);
      if (result.domPath) {
        console.log(`DOM path from "Learner Stories" heading:`);
        console.log(`  ${result.domPath}`);
      }
    } else if (result.found) {
      const fraction = (result.cardHeight / 812 * 100).toFixed(1);
      console.log(`✅ Ramp testimonial card found`);
      console.log(`   offsetHeight: ${result.cardHeight}px`);
      console.log(`   offsetWidth: ${result.cardWidth}px`);
      console.log(`   Fraction of 812px viewport: ${fraction}%`);
      console.log(`   Sample: "${result.sample}..."`);
      
      console.log(`\nComparison:`);
      console.log(`   Basalio (Scenario A): 503px (61.9% of viewport)`);
      console.log(`   Ramp benchmark: ${result.cardHeight}px (${fraction}% of viewport)`);
      
      if (result.cardHeight >= 480 && result.cardHeight <= 550) {
        console.log(`   ✅ 503px is within normal range (480–550px) for this pattern`);
      } else if (result.cardHeight < 480) {
        console.log(`   ⚠️ Ramp is leaner (${result.cardHeight}px < 480px); optimization opportunity`);
      } else if (result.cardHeight > 550) {
        console.log(`   ✅ Ramp is taller (${result.cardHeight}px > 550px); 503px is conservative`);
      }
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }

  await browser.close();
}

uu2Retry().catch(err => console.error(err.message));
