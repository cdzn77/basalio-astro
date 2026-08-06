import { chromium } from 'playwright';

async function analyzeButton(route, sectionIdx) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(`http://localhost:4322${route}`, { waitUntil: 'networkidle' });

  const actual = await page.evaluate(() => window.innerWidth);
  if (actual !== 375) throw new Error(`Viewport: ${actual}px`);

  const result = await page.evaluate((idx) => {
    const section = document.querySelectorAll('section')[idx];
    const headerSplitInner = section?.querySelector('.header-split-inner');
    const button = section?.querySelector('.btn-wrapper');
    const buttonText = button?.textContent?.trim();

    const cs = window.getComputedStyle(headerSplitInner || {});
    const buttonCS = window.getComputedStyle(button || {});

    return {
      headerSplitInner: {
        flexDirection: cs.flexDirection,
        width: cs.width,
        padding: `${cs.paddingLeft}/${cs.paddingRight}`,
        display: cs.display
      },
      button: {
        scrollWidth: button?.scrollWidth,
        offsetWidth: button?.offsetWidth,
        width: buttonCS.width,
        minWidth: buttonCS.minWidth,
        maxWidth: buttonCS.maxWidth,
        whiteSpace: buttonCS.whiteSpace,
        padding: `${buttonCS.paddingLeft}/${buttonCS.paddingRight}`,
        letterSpacing: buttonCS.letterSpacing,
        text: buttonText
      }
    };
  }, sectionIdx);

  await browser.close();
  return { route, sectionIdx, result };
}

console.log('═══════════════════════════════════════════════════════');
console.log('DD1.1-DD1.4: HeaderSplit stacking & button analysis');
console.log('═══════════════════════════════════════════════════════\n');

// /welcome section[0]
const welcome = await analyzeButton('/welcome', 0);
console.log(`/welcome section[0] @ 375px:`);
console.log(`  HeaderSplit flex-direction: ${welcome.result.headerSplitInner.flexDirection}`);
console.log(`  Button text: "${welcome.result.button.text}"`);
console.log(`  Button scrollWidth: ${welcome.result.button.scrollWidth}px`);
console.log(`  Button computed width: ${welcome.result.button.width}`);
console.log(`  Button min-width: ${welcome.result.button.minWidth}`);
console.log(`  Button max-width: ${welcome.result.button.maxWidth}`);
console.log(`  Button white-space: ${welcome.result.button.whiteSpace}`);
console.log(`  Button padding: ${welcome.result.button.padding}`);
console.log(`  Button letter-spacing: ${welcome.result.button.letterSpacing}\n`);

// /blocks section[2]
const blocks = await analyzeButton('/blocks', 2);
console.log(`/blocks section[2] @ 375px:`);
console.log(`  HeaderSplit flex-direction: ${blocks.result.headerSplitInner.flexDirection}`);
console.log(`  Button text: "${blocks.result.button.text}"`);
console.log(`  Button scrollWidth: ${blocks.result.button.scrollWidth}px`);
console.log(`  Button computed width: ${blocks.result.button.width}`);
console.log(`  Button min-width: ${blocks.result.button.minWidth}`);
console.log(`  Button max-width: ${blocks.result.button.maxWidth}`);
console.log(`  Button white-space: ${blocks.result.button.whiteSpace}`);
console.log(`  Button padding: ${blocks.result.button.padding}`);
console.log(`  Button letter-spacing: ${blocks.result.button.letterSpacing}\n`);
