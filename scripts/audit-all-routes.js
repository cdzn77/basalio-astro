import { chromium } from 'playwright';

async function auditRoute(route) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(`http://localhost:4322${route}`, { waitUntil: 'networkidle', timeout: 30000 });
  
  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map(s => ({
      className: s.className.substring(0, 30),
      dataSurface: s.getAttribute('data-surface'),
      bgColor: window.getComputedStyle(s).backgroundColor
    }));
  });
  
  await browser.close();
  
  const darkSections = sections.filter(s => {
    const bgStr = s.bgColor;
    return bgStr.includes('45, 43, 41') || bgStr.includes('28, 25, 23') || bgStr.includes('0, 0, 0') || bgStr.includes('26, 26, 26');
  });
  
  const missing = darkSections.filter(s => !s.dataSurface);
  
  return { route, darkSections, missing };
}

async function main() {
  const routes = ['/', '/blocks', '/contact', '/early-access', '/hacks', '/hero-lab', '/pricing', '/privacy', '/roadmap', '/support', '/terms', '/welcome', '/404'];
  
  console.log('AL1.4 — Audit all routes for data-surface on dark sections:');
  console.log('═'.repeat(100));
  
  const allMissing = [];
  
  for (const route of routes) {
    const result = await auditRoute(route);
    if (result.missing.length > 0) {
      console.log(`\n⚠️  ${route} — ${result.missing.length} dark section(s) missing data-surface`);
      result.missing.forEach(s => console.log(`   ${s.className}`));
      allMissing.push(route);
    } else {
      console.log(`✅ ${route}`);
    }
  }
  
  console.log('\n' + '═'.repeat(100));
  if (allMissing.length === 0) {
    console.log('✅ All routes compliant: every dark section has data-surface="ink"');
  } else {
    console.log(`⚠️  ${allMissing.length} route(s) need fixes: ${allMissing.join(', ')}`);
  }
}

main().catch(console.error);
