import { chromium } from 'playwright';

async function tt1() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Scenario A: Remove 4th feature only
  console.log('TT1.1: Remove 4th feature (3 features instead of 4)\n');
  await page.evaluate(() => {
    const features = document.querySelectorAll('.testimonial-feature-v2');
    features.forEach((f, idx) => {
      const cardIdx = Math.floor(idx / 4);
      const featureIdx = idx % 4;
      if (featureIdx === 3) f.style.display = 'none'; // Hide 4th feature
    });
  });
  await page.waitForTimeout(300);

  const scenarioA = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
    return cards.map((card, idx) => {
      card.style.alignItems = 'flex-start'; // Measure natural height
      return { cardIndex: idx, height: card.offsetHeight };
    });
  });

  scenarioA.forEach(c => {
    console.log(`  Card ${c.cardIndex + 1}: ${c.height}px`);
  });
  console.log();

  // Restore 4th feature
  await page.evaluate(() => {
    document.querySelectorAll('.testimonial-feature-v2').forEach(f => {
      f.style.display = '';
    });
  });

  // Scenario B: Remove 4th feature + shorten description to 1 line
  console.log('TT1.2: Remove 4th feature + shorten description to ~33px\n');
  await page.evaluate(() => {
    // Hide 4th feature
    document.querySelectorAll('.testimonial-feature-v2').forEach((f, idx) => {
      const featureIdx = idx % 4;
      if (featureIdx === 3) f.style.display = 'none';
    });
    
    // Shorten descriptions
    document.querySelectorAll('.testimonial-description-v2').forEach(d => {
      d.style.height = '33px';
      d.style.overflow = 'hidden';
    });
  });
  await page.waitForTimeout(300);

  const scenarioB = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
    return cards.map((card, idx) => {
      card.style.alignItems = 'flex-start';
      return { cardIndex: idx, height: card.offsetHeight };
    });
  });

  scenarioB.forEach(c => {
    console.log(`  Card ${c.cardIndex + 1}: ${c.height}px`);
  });
  console.log();

  // Scenario C: Remove 4th feature + short description + reduce image to 120px
  console.log('TT1.3: Remove 4th feature + short description + 120px image\n');
  await page.evaluate(() => {
    document.querySelectorAll('.testimonial-image-v2').forEach(img => {
      img.style.height = '120px';
    });
  });
  await page.waitForTimeout(300);

  const scenarioC = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.testimonial-card-v2')).slice(0, 4);
    return cards.map((card, idx) => {
      card.style.alignItems = 'flex-start';
      return { cardIndex: idx, height: card.offsetHeight };
    });
  });

  scenarioC.forEach(c => {
    console.log(`  Card ${c.cardIndex + 1}: ${c.height}px`);
  });
  console.log();

  // Summary
  const maxA = Math.max(...scenarioA.map(c => c.height));
  const maxB = Math.max(...scenarioB.map(c => c.height));
  const maxC = Math.max(...scenarioC.map(c => c.height));

  console.log('TT1.4: Summary\n');
  console.log(`  Baseline (current): 547px max`);
  console.log(`  Scenario A (−4th feature): ${maxA}px max (saves ${547 - maxA}px)`);
  console.log(`  Scenario B (−4th feature, −description lines): ${maxB}px max (saves ${547 - maxB}px)`);
  console.log(`  Scenario C (−4th feature, −description, −image 20px): ${maxC}px max (saves ${547 - maxC}px)`);
  console.log(`\n  Under 450px target: ${maxC < 450 ? '✅ YES (Scenario C)' : '❌ NO'}`);

  // Restore all
  await page.evaluate(() => {
    document.querySelectorAll('.testimonial-feature-v2').forEach(f => f.style.display = '');
    document.querySelectorAll('.testimonial-description-v2').forEach(d => {
      d.style.height = '';
      d.style.overflow = '';
    });
    document.querySelectorAll('.testimonial-image-v2').forEach(img => img.style.height = '');
    document.querySelectorAll('.testimonial-card-v2').forEach(c => c.style.alignItems = '');
  });

  await browser.close();
}

tt1().catch(err => console.error(err.message));
