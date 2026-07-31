import { chromium } from 'playwright';

const routes = ['/', '/blocks', '/hacks', '/pricing', '/support', '/roadmap', '/terms', '/privacy', '/contact', '/early-access'];
const browser = await chromium.launch();

const allFailures = [];

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const failures = await page.evaluate(() => {
    const links = document.querySelectorAll('a');
    const results = [];

    links.forEach((link) => {
      const rect = link.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      if (rect.width < 24 || rect.height < 24) {
        results.push({
          text: link.textContent.trim().substring(0, 20),
          size: `${Math.round(rect.width)}×${Math.round(rect.height)}`,
          classes: link.className
        });
      }
    });

    return results;
  });

  if (failures.length > 0) {
    allFailures.push({ route, failures });
  }

  await page.close();
}

console.log('\nREMAINING TARGET SIZE FAILURES');
console.log('==============================\n');

allFailures.forEach(({ route, failures }) => {
  console.log(`${route}:`);
  failures.forEach(f => {
    console.log(`  "${f.text}" (${f.size})`);
    if (f.classes) console.log(`     class: ${f.classes}`);
  });
  console.log();
});

await browser.close();
