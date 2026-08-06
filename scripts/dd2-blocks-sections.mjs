import { chromium } from 'playwright';

async function analyze() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const section2 = document.querySelectorAll('section')[2];
    const section3 = document.querySelectorAll('section')[3];
    
    const section2Button = section2?.querySelector('.btn-wrapper');
    const section3Button = section3?.querySelector('.btn-wrapper');

    return {
      section2: {
        scrollWidth: section2?.scrollWidth,
        hasButton: !!section2Button,
        buttonText: section2Button?.textContent?.trim(),
        buttonScrollWidth: section2Button?.scrollWidth,
        headerSplitInner: window.getComputedStyle(section2?.querySelector('.header-split-inner')).flexDirection
      },
      section3: {
        scrollWidth: section3?.scrollWidth,
        hasButton: !!section3Button,
        buttonText: section3Button?.textContent?.trim(),
        buttonScrollWidth: section3Button?.scrollWidth,
        headerSplitInner: window.getComputedStyle(section3?.querySelector('.header-split-inner')).flexDirection
      }
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('/blocks sections @ 375px');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('Section[2]:');
  console.log(`  scrollWidth: ${result.section2.scrollWidth}px`);
  console.log(`  HeaderSplit flex-direction: ${result.section2.headerSplitInner}`);
  console.log(`  Button text: "${result.section2.buttonText}"`);
  console.log(`  Button scrollWidth: ${result.section2.buttonScrollWidth}px\n`);
  
  console.log('Section[3]:');
  console.log(`  scrollWidth: ${result.section3.scrollWidth}px`);
  console.log(`  HeaderSplit flex-direction: ${result.section3.headerSplitInner}`);
  console.log(`  Button text: "${result.section3.buttonText}"`);
  console.log(`  Button scrollWidth: ${result.section3.buttonScrollWidth}px`);

  await browser.close();
}

analyze().catch(console.error);
