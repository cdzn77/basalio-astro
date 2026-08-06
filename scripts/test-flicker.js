import { chromium } from 'playwright';

async function testFlicker() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  
  // Get boundary position
  const boundary = await page.evaluate(() => {
    const whatWeDo = document.querySelector('.what-we-do');
    return whatWeDo.offsetTop;
  });
  
  console.log(`Hero/PositioningStats boundary at: ${boundary}px`);
  console.log('Scrolling from 0 to boundary in 50px steps, reading surface at each step:');
  console.log('═'.repeat(80));
  
  const readings = [];
  
  for (let y = 0; y <= boundary + 100; y += 50) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(100);
    
    const surface = await page.evaluate(() => {
      return document.querySelector('.header-container').getAttribute('data-surface');
    });
    
    readings.push({ scrollY: y, surface });
    console.log(`scrollY ${y.toString().padStart(4)}px: surface=${surface}`);
  }
  
  // Detect flicker
  let flickerCount = 0;
  for (let i = 1; i < readings.length - 1; i++) {
    if (readings[i].surface !== readings[i-1].surface && readings[i].surface !== readings[i+1].surface) {
      flickerCount++;
      console.log(`  ⚠️ FLICKER at ${readings[i].scrollY}px: ${readings[i-1].surface} → ${readings[i].surface} → ${readings[i+1].surface}`);
    }
  }
  
  // Find single transition point
  const transitions = [];
  for (let i = 1; i < readings.length; i++) {
    if (readings[i].surface !== readings[i-1].surface) {
      transitions.push({
        before: readings[i-1].scrollY,
        after: readings[i].scrollY,
        fromSurface: readings[i-1].surface,
        toSurface: readings[i].surface
      });
    }
  }
  
  console.log('═'.repeat(80));
  console.log(`Transitions detected: ${transitions.length}`);
  if (transitions.length === 1) {
    console.log(`✅ CLEAN: Single transition at scrollY ${transitions[0].before}→${transitions[0].after}px (${transitions[0].fromSurface} → ${transitions[0].toSurface})`);
    console.log(`   Boundary is at ${boundary}px, transition occurs ${Math.abs(boundary - transitions[0].after)}px ${boundary > transitions[0].after ? 'before' : 'after'}`);
  } else if (transitions.length > 1) {
    console.log(`❌ FLICKER: ${transitions.length} transitions detected (expected 1)`);
    transitions.forEach(t => console.log(`   scrollY ${t.before}→${t.after}px: ${t.fromSurface} → ${t.toSurface}`));
  }
  console.log(`Oscillations detected: ${flickerCount}`);
  
  await browser.close();
  process.exit(flickerCount > 0 ? 1 : 0);
}

testFlicker().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
