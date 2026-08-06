import { chromium } from 'playwright';

async function rr1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const measurements = await page.evaluate(() => {
    const card = document.querySelector('.testimonial-card-v2');
    const cardStyle = window.getComputedStyle(card);
    
    // Image
    const image = card.querySelector('.testimonial-image-v2');
    const imageHeight = image?.offsetHeight || 0;
    
    // All other children
    const children = Array.from(card.children).map(child => {
      const name = child.className || child.tagName;
      return {
        name: name.substring(0, 30),
        height: child.offsetHeight,
        tag: child.tagName
      };
    });

    return {
      cardTotal: card.offsetHeight,
      cardPadding: cardStyle.padding,
      cardPaddingTop: cardStyle.paddingTop,
      cardPaddingBottom: cardStyle.paddingBottom,
      cardBoxSizing: cardStyle.boxSizing,
      imageHeight: imageHeight,
      children: children,
      viewport: window.innerWidth
    };
  });

  console.log('RR1 at 375px viewport:\n');
  console.log(`Card total height: ${measurements.cardTotal}px (spec: 408px, difference: ${measurements.cardTotal - 408}px)`);
  console.log(`Card padding: ${measurements.cardPadding}`);
  console.log(`  Top: ${measurements.cardPaddingTop}, Bottom: ${measurements.cardPaddingBottom}`);
  console.log(`Box-sizing: ${measurements.cardBoxSizing}`);
  console.log(`Image height: ${measurements.imageHeight}px (spec: 140px)`);
  
  console.log(`\nChild elements breakdown:`);
  let totalChildHeight = 0;
  measurements.children.forEach((child, idx) => {
    console.log(`  [${idx}] ${child.name}: ${child.height}px`);
    totalChildHeight += child.height;
  });
  
  console.log(`\nSum of children: ${totalChildHeight}px`);
  console.log(`Padding (top + bottom): ${parseInt(measurements.cardPaddingTop) + parseInt(measurements.cardPaddingBottom)}px`);
  console.log(`Expected total (children + padding): ${totalChildHeight + parseInt(measurements.cardPaddingTop) + parseInt(measurements.cardPaddingBottom)}px`);

  await page.close();
  await browser.close();
}

rr1().catch(err => console.error(err.message));
