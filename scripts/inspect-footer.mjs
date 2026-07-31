import { chromium } from 'playwright';

const routes = ['/', '/blocks', '/pricing', '/contact', '/roadmap', '/support', '/terms', '/privacy'];

async function inspectRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });
    
    const result = await page.evaluate(() => {
      const baseMain = document.querySelector('.base-main');
      if (!baseMain) return { error: 'No .base-main found' };
      
      const lastChild = baseMain.lastElementChild;
      if (!lastChild) return { error: 'No last child' };
      
      const styles = window.getComputedStyle(lastChild);
      const isDirectChild = lastChild.parentElement === baseMain;
      
      return {
        tagName: lastChild.tagName.toLowerCase(),
        isDirectChild,
        borderBottomLeftRadius: styles.borderBottomLeftRadius,
        borderBottomRightRadius: styles.borderBottomRightRadius,
        marginBottom: styles.marginBottom,
        backgroundColor: styles.backgroundColor,
        className: lastChild.className,
        id: lastChild.id
      };
    });
    
    return { route, ...result };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('FOOTER OVERLAP DIAGNOSIS: .base-main last child properties');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const results = [];
  for (const route of routes) {
    try {
      const data = await inspectRoute(browser, route);
      results.push(data);
      console.log(`${data.route}:`);
      console.log(`  Last child: <${data.tagName}${data.className ? ' class="' + data.className + '"' : ''}${data.id ? ' id="' + data.id + '"' : ''}>`);
      console.log(`  Direct child of .base-main: ${data.isDirectChild ? '✓' : '✗'}`);
      console.log(`  border-bottom-left-radius: ${data.borderBottomLeftRadius}`);
      console.log(`  border-bottom-right-radius: ${data.borderBottomRightRadius}`);
      console.log(`  margin-bottom: ${data.marginBottom}`);
      console.log(`  background-color: ${data.backgroundColor}\n`);
    } catch (e) {
      console.log(`${route}: ERROR - ${e.message}\n`);
    }
  }
  
  await browser.close();
  
  // Summary table
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('SUMMARY TABLE\n');
  console.log('Route          | Tag    | Direct | Radius         | Margin | BG Color');
  console.log('───────────────┼────────┼────────┼────────────────┼────────┼──────────────────────');
  
  results.forEach(r => {
    const hasRadius = r.borderBottomLeftRadius !== '0px' ? '✓' : '✗';
    const bgMatch = r.backgroundColor === 'rgb(255, 255, 255)' ? 'white' : r.backgroundColor === 'rgb(28, 25, 23)' ? 'dark' : 'other';
    console.log(`${r.route.padEnd(14)} | ${r.tagName.padEnd(6)} | ${(r.isDirectChild ? 'Y' : 'N').padEnd(6)} | ${hasRadius} ${r.borderBottomLeftRadius.padEnd(12)} | ${r.marginBottom.padEnd(6)} | ${bgMatch}`);
  });
}

main().catch(console.error);
