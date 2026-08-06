import { chromium } from 'playwright';

async function rr1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const card = document.querySelector('.testimonial-card-v2');
    const cardStyle = window.getComputedStyle(card);
    
    const paddingTop = parseFloat(cardStyle.paddingTop);
    const paddingBottom = parseFloat(cardStyle.paddingBottom);
    const borderTop = parseFloat(cardStyle.borderTop) || 0;
    const borderBottom = parseFloat(cardStyle.borderBottom) || 0;
    
    // Get each direct child
    const children = Array.from(card.children).map((child, idx) => {
      const childStyle = window.getComputedStyle(child);
      return {
        index: idx,
        name: child.className.substring(0, 25),
        offsetHeight: child.offsetHeight,
        marginTop: parseFloat(childStyle.marginTop),
        marginBottom: parseFloat(childStyle.marginBottom),
        borderTop: parseFloat(childStyle.borderTopWidth) || 0,
        borderBottom: parseFloat(childStyle.borderBottomWidth) || 0
      };
    });
    
    const contentHeightSum = children.reduce((sum, c) => sum + c.offsetHeight, 0);
    const marginSum = children.reduce((sum, c) => sum + c.marginTop + c.marginBottom, 0);
    
    return {
      card: {
        offsetHeight: card.offsetHeight,
        boxSizing: cardStyle.boxSizing,
        paddingTop, paddingBottom,
        borderTop, borderBottom,
        gap: cardStyle.gap
      },
      children: children,
      contentHeightSum: contentHeightSum,
      marginSum: marginSum,
      calcTotal: contentHeightSum + marginSum + paddingTop + paddingBottom
    };
  });

  console.log('RR1.5: Precise card height breakdown\n');
  console.log(`Card offsetHeight: ${data.card.offsetHeight}px (target: 408px, actual: +${data.card.offsetHeight - 408}px)`);
  console.log(`Box-sizing: ${data.card.boxSizing}`);
  console.log(`Padding: top ${data.card.paddingTop}px + bottom ${data.card.paddingBottom}px = ${data.card.paddingTop + data.card.paddingBottom}px`);
  console.log(`Flexbox gap: ${data.card.gap}`);
  
  console.log(`\nChildren breakdown:`);
  data.children.forEach(c => {
    console.log(`  [${c.index}] ${c.name}: ${c.offsetHeight}px (margin: ${c.marginTop} + ${c.marginBottom})`);
  });
  
  console.log(`\nHeight calculation:`);
  console.log(`  Content sum: ${data.contentHeightSum}px`);
  console.log(`  Margin sum: ${data.marginSum}px`);
  console.log(`  Padding: ${data.card.paddingTop + data.card.paddingBottom}px`);
  console.log(`  Calculated total: ${data.calcTotal}px`);
  console.log(`  Actual: ${data.card.offsetHeight}px`);
  console.log(`  Unexplained: ${data.card.offsetHeight - data.calcTotal}px`);

  await page.close();
  await browser.close();
}

rr1().catch(err => console.error(err.message));
