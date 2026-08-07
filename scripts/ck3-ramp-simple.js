import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 375, height: 812 });
  
  try {
    await page.goto('https://rampstudio.framer.website', { waitUntil: 'load', timeout: 20000 });
    
    console.log("CK3 — RAMP WEBSITE LAYOUT AT 375x812\n");
    
    const metrics = await page.evaluate(() => {
      // Find any grid or flex container with multiple children
      const flexContainers = Array.from(document.querySelectorAll('[style*="display: flex"], [style*="display:flex"], [class*="grid"]'));
      
      if (flexContainers.length === 0) {
        return { status: 'no flex containers found' };
      }
      
      const container = flexContainers[0];
      const computed = window.getComputedStyle(container);
      
      return {
        flexDirection: computed.flexDirection || 'row',
        gap: computed.gap || 'not set',
        children: container.children.length,
        containerWidth: container.offsetWidth,
        containerHeight: container.offsetHeight
      };
    });
    
    console.log(`Flex direction: ${metrics.flexDirection}`);
    console.log(`Column count: ${metrics.children}`);
    console.log(`Gap: ${metrics.gap}`);
    console.log(`Container height: ${metrics.containerHeight}px`);
    
  } catch (err) {
    console.log(`Could not measure Ramp live site: ${err.message}`);
    console.log("(Network timeout or page structure differs from expected)");
  }
  
  await page.close();
  await browser.close();
})();
