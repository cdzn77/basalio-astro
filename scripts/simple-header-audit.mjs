import { chromium } from 'playwright';

async function audit(browser, route) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const header = document.querySelector('.base-header');
    const logo = document.querySelector('.brand-logo');
    const btn = document.querySelector('.menu-btn');
    const dropdown = document.querySelector('.menu-dropdown');
    const baseMain = document.querySelector('.base-main');
    const firstSection = baseMain?.querySelector('section');

    if (!header || !logo || !btn) return { error: 'elements not found' };

    const h = window.getComputedStyle(header);
    const l = window.getComputedStyle(logo);
    const b = window.getComputedStyle(btn);
    const d = dropdown ? window.getComputedStyle(dropdown) : null;
    const s = firstSection ? window.getComputedStyle(firstSection) : null;

    return {
      header: { position: h.position, bg: h.backgroundColor, zIndex: h.zIndex },
      logo: { color: l.color },
      menuBtn: { bg: b.backgroundColor, color: b.color },
      dropdown: d ? { bg: d.backgroundColor, color: d.color } : null,
      firstSectionBg: s ? s.backgroundColor : null
    };
  });

  await page.close();
  return { route, ...data };
}

const browser = await chromium.launch();

console.log('\n1. HEADER POSITIONING & BACKGROUND\n');
for (const route of ['/', '/pricing', '/roadmap']) {
  const data = await audit(browser, route);
  console.log(`${route}:`);
  if (data.error) {
    console.log(`  Error: ${data.error}`);
  } else {
    console.log(`  Position: ${data.header.position}`);
    console.log(`  Background: ${data.header.bg}`);
    console.log(`  Z-index: ${data.header.zIndex}\n`);
  }
}

console.log('\n2. COMPUTED COLORS\n');
for (const route of ['/', '/pricing', '/roadmap']) {
  const data = await audit(browser, route);
  if (!data.error) {
    console.log(`${route}:`);
    console.log(`  Logo color: ${data.logo.color}`);
    console.log(`  Menu pill bg: ${data.menuBtn.bg}`);
    console.log(`  Menu text color: ${data.menuBtn.color}`);
    console.log(`  Dropdown bg: ${data.dropdown?.bg || 'N/A'}`);
    console.log(`  Dropdown text: ${data.dropdown?.color || 'N/A'}`);
    console.log(`  First section bg: ${data.firstSectionBg}\n`);
  }
}

await browser.close();
