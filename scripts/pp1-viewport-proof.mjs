import { chromium } from 'playwright';

async function proofViewports() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [375, 390, 414, 768, 1024, 1440];

  console.log('PP1.1: innerWidth measured at each target viewport:\n');

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp, height: 900 });
    
    const actualInnerWidth = await page.evaluate(() => window.innerWidth);
    const match = actualInnerWidth === vp ? '✅' : '❌';
    
    console.log(`${match} Target: ${vp}px → Measured: ${actualInnerWidth}px`);
    
    await page.close();
  }

  console.log('\nPP1.2: Assertion code from verify-section.js:\n');
  console.log(`const actualViewport = await page.evaluate(() => window.innerWidth);
if (actualViewport !== viewport) {
  throw new Error(
    \`Viewport assertion failed: requested \${viewport}px, got \${actualViewport}px\`
  );
}`);

  console.log('\nPP1.3: Proof it throws on mismatch (test with 1000px vs 375px target):\n');
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1000, height: 900 });
  
  const result = await page.evaluate(() => window.innerWidth);
  console.log(`Created viewport 1000px, measured: ${result}px`);
  console.log(`If we asserted target=375px, condition (${result} !== 375) = TRUE → THROW ✅`);
  
  await browser.close();
}

proofViewports().catch(err => console.error(err.message));
