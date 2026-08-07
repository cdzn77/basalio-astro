import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  
  console.log("CJ2.1 — COLUMN WIDTHS & LINE COUNTS AT 390PX\n");
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  
  const measurements = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.divider-item'));
    
    return items.map((item, i) => {
      const label = item.querySelector('.divider-label')?.textContent || '';
      const text = item.querySelector('.divider-text')?.textContent || '';
      const width = item.offsetWidth;
      const lineCount = item.querySelector('.divider-text')?.innerText?.split('\n').length || 1;
      
      return {
        item: i + 1,
        label: label.trim(),
        width: `${width}px`,
        text: text.trim(),
        lines: lineCount
      };
    });
  });
  
  measurements.forEach(m => {
    console.log(`Item ${m.item} (${m.label}):`);
    console.log(`  Width: ${m.width}`);
    console.log(`  Line wraps: ${m.lines}`);
    console.log(`  Text: "${m.text}"`);
    console.log();
  });
  
  await page.close();
  await browser.close();
})();
