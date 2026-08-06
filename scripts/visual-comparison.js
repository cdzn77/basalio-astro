import { chromium } from 'playwright';
import fs from 'fs';

async function compareImages() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Create HTML showing both versions side-by-side
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>PNG vs WebP Comparison</title>
  <style>
    body { font-family: mono; padding: 20px; }
    .comparison { margin: 40px 0; border: 1px solid #ccc; padding: 20px; }
    .size-row { display: flex; gap: 40px; margin: 20px 0; }
    .size-group { flex: 1; }
    .size-group h4 { margin: 0; color: #666; }
    img { max-width: 100%; border: 1px solid #ddd; }
  </style>
</head>
<body>
  <h2>Persona Image Comparison: PNG vs WebP (q80)</h2>
  
  <div class="comparison">
    <h3>videographer_whoitsfor</h3>
    <div class="size-row">
      <div class="size-group">
        <h4>PNG (109KB)</h4>
        <img src="file:///Users/angelomanzanojr/basalio-astro/public/assets/videographer_whoitsfor.png" style="max-width: 420px;" alt="PNG"/>
      </div>
      <div class="size-group">
        <h4>WebP (10KB)</h4>
        <img src="file:///tmp/videographer_whoitsfor.webp" style="max-width: 420px;" alt="WebP"/>
      </div>
    </div>
  </div>
  
  <div class="comparison">
    <h3>uxui_whoitsfor</h3>
    <div class="size-row">
      <div class="size-group">
        <h4>PNG (100KB)</h4>
        <img src="file:///Users/angelomanzanojr/basalio-astro/public/assets/uxui_whoitsfor.png" style="max-width: 420px;" alt="PNG"/>
      </div>
      <div class="size-group">
        <h4>WebP (8KB)</h4>
        <img src="file:///tmp/uxui_whoitsfor.webp" style="max-width: 420px;" alt="WebP"/>
      </div>
    </div>
  </div>
  
  <div class="comparison">
    <h3>director_whoitsfor</h3>
    <div class="size-row">
      <div class="size-group">
        <h4>PNG (99KB)</h4>
        <img src="file:///Users/angelomanzanojr/basalio-astro/public/assets/director_whoitsfor.png" style="max-width: 420px;" alt="PNG"/>
      </div>
      <div class="size-group">
        <h4>WebP (10KB)</h4>
        <img src="file:///tmp/director_whoitsfor.webp" style="max-width: 420px;" alt="WebP"/>
      </div>
    </div>
  </div>
  
  <div class="comparison">
    <h3>agency_whoitsfor</h3>
    <div class="size-row">
      <div class="size-group">
        <h4>PNG (125KB)</h4>
        <img src="file:///Users/angelomanzanojr/basalio-astro/public/assets/agency_whoitsfor.png" style="max-width: 420px;" alt="PNG"/>
      </div>
      <div class="size-group">
        <h4>WebP (10KB)</h4>
        <img src="file:///tmp/agency_whoitsfor.webp" style="max-width: 420px;" alt="WebP"/>
      </div>
    </div>
  </div>
</body>
</html>
  `;
  
  await page.setContent(html);
  const screenshot = await page.screenshot({ fullPage: true, type: 'png' });
  fs.writeFileSync('/tmp/comparison-png-vs-webp.png', screenshot);
  
  await browser.close();
  console.log('✅ Comparison screenshot saved to /tmp/comparison-png-vs-webp.png');
}

compareImages().catch(console.error);
