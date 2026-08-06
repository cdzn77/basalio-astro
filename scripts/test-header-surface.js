import { chromium } from 'playwright';

const ROUTES = ['/', '/blocks', '/contact', '/early-access', '/hacks', '/hero-lab', '/pricing', '/privacy', '/roadmap', '/support', '/terms', '/welcome', '/404'];

async function testRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.goto(`http://localhost:4322${route}`, { waitUntil: 'networkidle' });
    
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    const scrollTo50Percent = (pageHeight - viewportHeight) * 0.5;
    
    const readState = async (scrollY, label) => {
      await page.evaluate((sy) => window.scrollTo(0, sy), scrollY);
      await page.waitForTimeout(150);
      
      return await page.evaluate(() => {
        const headerContainer = document.querySelector('.header-container');
        const brandLogo = document.querySelector('.brand-logo');
        const menuBtn = document.querySelector('.menu-btn');
        
        return {
          scrollY: window.scrollY,
          surface: headerContainer.getAttribute('data-surface'),
          logoColor: window.getComputedStyle(brandLogo).color,
          menuBtnBg: window.getComputedStyle(menuBtn).backgroundColor
        };
      });
    };
    
    const r0 = await readState(0, 'scroll0');
    const r50 = await readState(Math.max(0, scrollTo50Percent), 'scroll50%');
    
    return [
      { route, ...r0, position: 'scroll0' },
      { route, ...r50, position: 'scroll50%' }
    ];
  } catch (err) {
    return [{ route, error: err.message, position: 'N/A' }];
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  let allResults = [];
  
  for (const route of ROUTES) {
    const results = await testRoute(browser, route);
    allResults = allResults.concat(results);
  }
  
  await browser.close();
  
  console.log('AH3 — All 13 routes × 2 positions (26 readings)');
  console.log('═'.repeat(120));
  
  let flagCount = 0;
  for (const r of allResults) {
    if (r.error) {
      console.log(`❌ ${r.route.padEnd(15)} ${r.position.padEnd(10)} ERROR: ${r.error}`);
      continue;
    }
    
    // Check for contrast issues
    let flag = '✓';
    if (r.surface === 'paper' && r.logoColor === r.menuBtnBg) {
      flag = '⚠️';
      flagCount++;
    } else if (r.surface === 'ink' && r.logoColor === 'rgb(0, 0, 0)') {
      flag = '⚠️'; // black logo on dark bg
      flagCount++;
    }
    
    console.log(`${flag} ${r.route.padEnd(15)} @ ${r.position.padEnd(10)} surface=${r.surface} logo=[${r.logoColor.substring(0,14).padEnd(14)}] btn=[${r.menuBtnBg.substring(0,14).padEnd(14)}]`);
  }
  
  console.log('═'.repeat(120));
  console.log(`Issues flagged: ${flagCount}/26`);
  process.exit(flagCount > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Script error:', err);
  process.exit(1);
});
