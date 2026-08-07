import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle', timeout: 30000 });
  
  console.log("CK3 — RAMP LIVE WEBSITE STATS ROW MEASUREMENT (375x812, mobile)\n");
  
  const stats = await page.evaluate(() => {
    // Look for the stats row with Marketing, Social Media, Coaching
    const rows = Array.from(document.querySelectorAll('[class*="stat"], [class*="row"], [class*="metric"], div')).filter(el => {
      const text = el.textContent || '';
      return text.includes('Marketing') || text.includes('Social') || text.includes('Coaching');
    });
    
    if (rows.length === 0) {
      return 'Stats row with Marketing/Social/Coaching not found';
    }
    
    const row = rows[0].closest('[class*="grid"], [class*="flex"], div[style*="display"]') || rows[0];
    const computed = window.getComputedStyle(row);
    const children = Array.from(row.children);
    
    return {
      layoutDirection: computed.flexDirection || 'unknown',
      columnCount: children.length,
      gap: computed.gap || 'unknown',
      rowHeight: `${row.offsetHeight}px`,
      childWidths: children.map(c => `${c.offsetWidth}px`).join(', '),
      childHeights: children.map(c => `${c.offsetHeight}px`).join(', ')
    };
  });
  
  if (typeof stats === 'string') {
    console.log(stats);
  } else {
    console.log(`Layout direction: ${stats.layoutDirection}`);
    console.log(`Column count: ${stats.columnCount}`);
    console.log(`Gap: ${stats.gap}`);
    console.log(`Row height: ${stats.rowHeight}`);
    console.log(`Child widths: ${stats.childWidths}`);
    console.log(`Child heights: ${stats.childHeights}`);
  }
  
  await page.close();
  await browser.close();
})();
