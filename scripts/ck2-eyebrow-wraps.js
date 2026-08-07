import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  
  console.log("CK2.3 — EYEBROW LINE COUNTS AT 390PX\n");
  
  const eyebrows = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.divider-item'));
    
    return items.map((item, i) => {
      const label = item.querySelector('.divider-label');
      const text = label?.textContent || '';
      const lineCount = label?.innerText?.split('\n').length || 1;
      
      return {
        item: i + 1,
        eyebrow: text.trim(),
        lines: lineCount
      };
    });
  });
  
  eyebrows.forEach(e => {
    console.log(`Item ${e.item}: "${e.eyebrow}" — ${e.lines} line${e.lines !== 1 ? 's' : ''}`);
  });
  
  await page.close();
  await browser.close();
})();
