import { chromium } from 'playwright';

async function findPeekScroll() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Find all containers that are wider than viewport and have multiple children
  const allContainers = await page.evaluate(() => {
    const containers = [];
    const allDivs = document.querySelectorAll('div');
    
    for (let div of allDivs) {
      const rect = div.getBoundingClientRect();
      const style = window.getComputedStyle(div);
      
      // Look for containers that:
      // - Have visible width between 300-400px (showing one card + peek)
      // - Have overflow-x auto or scroll
      // - Have multiple children
      // - Have scroll width > offset width
      if (div.children.length >= 2 && 
          (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
          div.scrollWidth > div.offsetWidth) {
        
        const firstChild = div.children[0];
        const secondChild = div.children[1];
        
        containers.push({
          className: div.className?.slice(0, 60),
          boundingWidth: Math.round(rect.width),
          offsetWidth: div.offsetWidth,
          scrollWidth: div.scrollWidth,
          childrenCount: div.children.length,
          gap: style.gap,
          overflowX: style.overflowX,
          firstChildWidth: firstChild?.offsetWidth,
          secondChildX: secondChild?.getBoundingClientRect().x,
          peekVisible: secondChild ? Math.round(secondChild.getBoundingClientRect().right - rect.right) : 0
        });
      }
    }
    
    return containers;
  });

  console.log('Containers with scroll:');
  console.log(JSON.stringify(allContainers, null, 2));

  await browser.close();
}

findPeekScroll().catch(err => console.error(err.message));
