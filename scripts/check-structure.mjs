import { chromium } from 'playwright';

async function checkStructure(browser, route) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
  
  const structure = await page.evaluate(() => {
    const baseMain = document.querySelector('.base-main');
    const children = Array.from(baseMain.children);
    return {
      totalChildren: children.length,
      lastThree: children.slice(-3).map(el => ({
        tag: el.tagName.toLowerCase(),
        className: el.className,
        id: el.id,
        textContent: el.textContent.substring(0, 50)
      }))
    };
  });
  
  await page.close();
  return structure;
}

async function main() {
  const browser = await chromium.launch();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('STRUCTURAL ANALYSIS: Last 3 children of .base-main');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  for (const route of ['/', '/blocks', '/pricing']) {
    const data = await checkStructure(browser, route);
    console.log(`${route} (total children: ${data.totalChildren}):`);
    data.lastThree.forEach((child, i) => {
      console.log(`  ${i + 1}. <${child.tag}${child.className ? ` class="${child.className}"` : ''}>`);
    });
    console.log();
  }
  
  await browser.close();
}

main().catch(console.error);
