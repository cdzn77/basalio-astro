import { chromium } from 'playwright';

async function debugRampText() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15'
  });

  const page = await context.newPage();
  await page.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

  const innerWidth = await page.evaluate(() => window.innerWidth);
  console.log(`viewport: ${innerWidth}x${await page.evaluate(() => window.innerHeight)}\n`);

  // Get all visible text on page
  const textContent = await page.evaluate(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const texts = [];
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text.length > 5) {
        const parent = node.parentElement;
        const rect = parent.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && !parent.closest('foreignObject')) {
          texts.push({
            text: text.substring(0, 80),
            tag: parent.tagName.toLowerCase(),
            className: parent.className,
            fontSize: window.getComputedStyle(parent).fontSize
          });
        }
      }
    }
    return texts;
  });

  console.log('VISIBLE TEXT ON PAGE (375px viewport):\n');
  textContent.slice(0, 50).forEach((t, i) => {
    console.log(`${i+1}. [${t.tag}.${t.className.split(' ')[0]}] (${t.fontSize}): ${t.text}`);
  });

  await context.close();
  await browser.close();
}

debugRampText().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
