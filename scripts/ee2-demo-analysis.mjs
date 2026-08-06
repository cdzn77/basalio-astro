import { chromium } from 'playwright';

async function analyzeDemo() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:4322/blocks', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    
    // Analyze section[2]
    const section2 = sections[2];
    const demo2Container = section2?.querySelector('.demo-container');
    const demo2Content = demo2Container?.firstElementChild;
    const demo2Class = demo2Content?.className || 'unknown';
    
    // Analyze section[3]
    const section3 = sections[3];
    const demo3Container = section3?.querySelector('.demo-container');
    const demo3Content = demo3Container?.firstElementChild;
    const demo3Class = demo3Content?.className || 'unknown';

    // Check all sections for demo-containers
    const allDemos = Array.from(sections).map((sec, idx) => ({
      index: idx,
      hasDemoContainer: !!sec.querySelector('.demo-container'),
      demoScrollWidth: sec.querySelector('.demo-container')?.scrollWidth,
      demoClass: sec.querySelector('.demo-container')?.querySelector('div')?.className || 'none'
    }));

    return {
      section2Demo: {
        contentClass: demo2Class,
        contentScrollWidth: demo2Content?.scrollWidth,
        contentOffsetWidth: demo2Content?.offsetWidth,
        contentWidth: window.getComputedStyle(demo2Content).width,
        contentMinWidth: window.getComputedStyle(demo2Content).minWidth
      },
      section3Demo: {
        contentClass: demo3Class,
        contentScrollWidth: demo3Content?.scrollWidth,
        contentOffsetWidth: demo3Content?.offsetWidth,
        contentWidth: window.getComputedStyle(demo3Content).width,
        contentMinWidth: window.getComputedStyle(demo3Content).minWidth
      },
      allDemos: allDemos
    };
  });

  console.log('═══════════════════════════════════════════════════════');
  console.log('EE2: Demo analysis @ 375px (/blocks)');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('Section[2] demo:');
  console.log(`  Content class: ${result.section2Demo.contentClass}`);
  console.log(`  scrollWidth: ${result.section2Demo.contentScrollWidth}px`);
  console.log(`  computed width: ${result.section2Demo.contentWidth}`);
  console.log(`  min-width: ${result.section2Demo.contentMinWidth}\n`);
  
  console.log('Section[3] demo:');
  console.log(`  Content class: ${result.section3Demo.contentClass}`);
  console.log(`  scrollWidth: ${result.section3Demo.contentScrollWidth}px`);
  console.log(`  computed width: ${result.section3Demo.contentWidth}`);
  console.log(`  min-width: ${result.section3Demo.contentMinWidth}\n`);

  console.log('All sections with demo-containers:');
  result.allDemos.forEach(demo => {
    if (demo.hasDemoContainer) {
      console.log(`  Section[${demo.index}]: scrollWidth=${demo.demoScrollWidth}px, demo=${demo.demoClass}`);
    }
  });

  await browser.close();
}

analyzeDemo().catch(console.error);
