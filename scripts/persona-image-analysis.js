import { chromium } from 'playwright';

async function analyzePersonas() {
  const browser = await chromium.launch({ headless: true });
  
  // Test at 1440px
  const context1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page1440 = await context1440.newPage();
  await page1440.goto('http://localhost:4321/', { waitUntil: 'networkidle', timeout: 30000 });
  
  const dims1440 = await page1440.evaluate(() => {
    return Array.from(document.querySelectorAll('img[src*="whoitsfor"]')).map(img => ({
      src: img.src.split('/').pop(),
      rendered: { width: img.clientWidth, height: img.clientHeight }
    }));
  });
  
  await context1440.close();
  
  // Test at 375px
  const context375 = await browser.newContext({ viewport: { width: 375, height: 900 } });
  const page375 = await context375.newPage();
  await page375.goto('http://localhost:4321/', { waitUntil: 'networkidle', timeout: 30000 });
  
  const dims375 = await page375.evaluate(() => {
    return Array.from(document.querySelectorAll('img[src*="whoitsfor"]')).map(img => ({
      src: img.src.split('/').pop(),
      rendered: { width: img.clientWidth, height: img.clientHeight }
    }));
  });
  
  await context375.close();
  await browser.close();
  
  console.log('AM2.1 — Persona Image Analysis:\n');
  console.log('Image Details:');
  console.log('-'.repeat(100));
  
  const images = [
    { file: 'videographer_whoitsfor.png', size: 107 },
    { file: 'uxui_whoitsfor.png', size: 98 },
    { file: 'director_whoitsfor.png', size: 97 },
    { file: 'agency_whoitsfor.png', size: 122 }
  ];
  
  images.forEach(img => {
    const dims1 = dims1440.find(d => d.src === img.file);
    const dims2 = dims375.find(d => d.src === img.file);
    
    const r1440 = dims1 ? `${dims1.rendered.width}×${dims1.rendered.height}` : 'N/A';
    const r375 = dims2 ? `${dims2.rendered.width}×${dims2.rendered.height}` : 'N/A';
    
    console.log(`${img.file.padEnd(30)} ${img.size.toString().padStart(3)}KB | 420×320 native | ${r1440.padEnd(12)} @ 1440px | ${r375.padEnd(12)} @ 375px`);
  });
  
  console.log('\nAM2.2 WebP conversion opportunity:\n- Current: 4× PNG ~100KB each = 424KB\n- WebP (q80): estimated 60-80% savings = ~85-170KB\n- Potential savings: 254-339KB (25-32% of total page)');
}

analyzePersonas().catch(console.error);
