import { chromium } from 'playwright';

async function rr1gaps() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const card = document.querySelector('.testimonial-card-v2');
    const cardStyle = window.getComputedStyle(card);
    
    // Check card's flexbox properties
    const cardFlex = {
      display: cardStyle.display,
      flexDirection: cardStyle.flexDirection,
      gap: cardStyle.gap,
      height: cardStyle.height,
      minHeight: cardStyle.minHeight,
      maxHeight: cardStyle.maxHeight
    };
    
    // Check each child for margin and gaps
    const children = Array.from(card.children).map((child, idx) => {
      const style = window.getComputedStyle(child);
      return {
        index: idx,
        name: child.className.substring(0, 25),
        height: child.offsetHeight,
        margin: `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`,
        marginBottom: style.marginBottom,
        display: style.display
      };
    });

    return { cardFlex, children };
  });

  console.log('RR1: Card flex layout:\n');
  console.log(`Display: ${data.cardFlex.display}`);
  console.log(`Flex-direction: ${data.cardFlex.flexDirection}`);
  console.log(`Gap: ${data.cardFlex.gap}`);
  console.log(`Height: ${data.cardFlex.height} (explicit)`);
  console.log(`Min-height: ${data.cardFlex.minHeight}`);
  console.log(`Max-height: ${data.cardFlex.maxHeight}`);
  
  console.log(`\nChild margins (could add to height with flexbox):`);
  let marginSum = 0;
  data.children.forEach(child => {
    const mb = parseInt(child.marginBottom) || 0;
    marginSum += mb;
    console.log(`  [${child.index}] ${child.name}: margin-bottom=${child.marginBottom}, height=${child.height}px`);
  });
  console.log(`\nTotal margin-bottom across children: ${marginSum}px`);
  
  console.log(`\nCalc: 140 (img) + 19 (label) + 24 (title) + 66 (desc) + 150 (features) + ${marginSum} (margins) + 48 (card padding) = ${140 + 19 + 24 + 66 + 150 + marginSum + 48}px`);

  await page.close();
  await browser.close();
}

rr1gaps().catch(err => console.error(err.message));
