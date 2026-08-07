import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  
  // Test all three options
  const options = [
    {
      name: 'option-a',
      label: 'Option A: 72% white + blur 12px',
      css: `.base-header[data-surface="paper"].scrolled { background: rgba(255,255,255,0.72) !important; backdrop-filter: blur(12px) !important; }`,
      file: '/tmp/cl1_option-a_acid.png'
    },
    {
      name: 'option-b',
      label: 'Option B: 85% white + blur 8px',
      css: `.base-header[data-surface="paper"].scrolled { background: rgba(255,255,255,0.85) !important; backdrop-filter: blur(8px) !important; }`,
      file: '/tmp/cl1_option-b_acid.png'
    },
    {
      name: 'option-c',
      label: 'Option C: solid paper background, no blur',
      css: `.base-header[data-surface="paper"].scrolled { background: var(--surface-paper) !important; backdrop-filter: none !important; }`,
      file: '/tmp/cl1_option-c_acid.png'
    }
  ];
  
  for (const option of options) {
    // Screenshot 1: Over acid card (scrolled, paper surface)
    const page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:${PORT}/pricing`, { waitUntil: 'networkidle' });
    
    // Inject CSS for this option
    await page.addStyleTag({ content: option.css });
    
    // Scroll to position acid card under header
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(300);
    
    // Capture
    await page.screenshot({ path: option.file });
    console.log(`✓ ${option.label}`);
    console.log(`  File: ${option.file}`);
    
    await page.close();
  }
  
  // Now test over INK hero for each option
  console.log("\n--- Testing over INK hero (should be untouched) ---\n");
  
  for (const option of options) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://localhost:${PORT}/hero-lab`, { waitUntil: 'networkidle' });
    
    // Inject CSS
    await page.addStyleTag({ content: option.css });
    
    // Stay at top (scroll 0) to show ink hero
    await page.waitForTimeout(200);
    
    // Capture
    const heroFile = option.file.replace('_acid', '_ink');
    await page.screenshot({ path: heroFile });
    console.log(`✓ ${option.label} over INK hero`);
    console.log(`  File: ${heroFile}`);
    
    await page.close();
  }
  
  await browser.close();
  console.log("\nAll screenshots captured.");
})();
