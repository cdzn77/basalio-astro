import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  
  console.log("CJ2.1 — DIVIDER LIST COLUMN WIDTHS & LINE COUNTS AT 390PX\n");
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:${PORT}/pricing`, { waitUntil: 'networkidle' });
  
  const measurements = await page.evaluate(() => {
    const container = document.querySelector('.pricing-divider-list');
    if (!container) return 'divider-list not found';
    
    const cells = Array.from(container.querySelectorAll('[class*="cell"], [class*="column"], div'));
    
    const result = [];
    cells.forEach((cell, i) => {
      if (i < 6) { // First row (3 cells) + second row (3 cells)
        const width = cell.offsetWidth;
        const text = cell.textContent.trim();
        const lineCount = Math.ceil(text.length / 20); // Rough estimate
        const actualLineCount = cell.innerText ? cell.innerText.split('\n').length : 1;
        
        result.push({
          index: i,
          width: `${width}px`,
          text: text.substring(0, 50),
          lineCount: actualLineCount
        });
      }
    });
    
    return result;
  });
  
  if (Array.isArray(measurements)) {
    measurements.forEach((m, i) => {
      console.log(`Column ${i + 1}: width=${m.width} | lines=${m.lineCount} | text="${m.text}..."`);
    });
  } else {
    console.log(measurements);
  }
  
  await page.close();
  
  console.log("\n" + "═".repeat(60));
  console.log("CJ2.2 — LOCATING .pricing-divider-list IN SOURCE\n");
  
  // Search for the divider list in source
  console.log("Searching for pricing-divider-list definition...");
  
  await browser.close();
})();
