import { chromium } from 'playwright';
import fs from 'fs';

async function captureRealImages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('http://localhost:4322/nn2-real-images-test', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Save to scratchpad
  const outputPath = '/private/tmp/claude-501/-Users-angelomanzanojr-vicealliance/dda2bdc6-021f-4d71-bb6e-9733c430f1d9/scratchpad/nn2-whoitsfor-140px-real-images.png';
  await page.screenshot({ path: outputPath, fullPage: true });

  console.log(`✅ Screenshot saved: ${outputPath}`);
  console.log(`   File size: ${fs.statSync(outputPath).size} bytes`);

  // Analyze images
  const analysis = await page.evaluate(() => {
    const images = document.querySelectorAll('img[src*="whoitsfor"]');
    
    return Array.from(images).map(img => {
      const rect = img.getBoundingClientRect();
      const naturalAspect = img.naturalWidth / img.naturalHeight;
      const displayAspect = rect.width / rect.height;
      
      return {
        src: img.src.split('/').pop(),
        naturalDimensions: `${img.naturalWidth}×${img.naturalHeight}`,
        naturalAspectRatio: (naturalAspect).toFixed(2),
        displayDimensions: `${Math.round(rect.width)}×${Math.round(rect.height)}`,
        displayAspectRatio: (displayAspect).toFixed(2),
        objectFit: window.getComputedStyle(img).objectFit,
        objectPosition: window.getComputedStyle(img).objectPosition
      };
    });
  });

  console.log('\nNN2 Image Analysis:');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const roles = ['Designer', 'Videographer', 'Director', 'Agency'];
  analysis.forEach((img, i) => {
    console.log(`[${i}] ${roles[i]} (${img.src})`);
    console.log(`    Natural: ${img.naturalDimensions} (${img.naturalAspectRatio}:1)`);
    console.log(`    Display: ${img.displayDimensions} (${img.displayAspectRatio}:1)`);
    console.log(`    CSS: object-fit: ${img.objectFit}; object-position: ${img.objectPosition}`);
    console.log();
  });

  console.log('NN2.1: Screenshot captured ✅');
  console.log('NN2.2: Face cropping assessment requires visual review (see screenshot)');
  console.log('NN2.3: CSS reported above');
  console.log('NN2.4: Screenshot saved to scratchpad');

  await browser.close();
}

captureRealImages().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
