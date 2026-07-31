import { chromium } from 'playwright';

const routes = ['/', '/pricing', '/roadmap'];

async function auditHeader(browser, route) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const header = document.querySelector('.ramp-header');
    const logo = document.querySelector('.ramp-logo-text');
    const menuPill = document.querySelector('.ramp-nav-menu-pill');
    const menuText = menuPill?.querySelector('span');
    const dropdown = document.querySelector('.ramp-nav-dropdown');

    const headerStyles = window.getComputedStyle(header);
    const logoStyles = window.getComputedStyle(logo);
    const pillStyles = window.getComputedStyle(menuPill);
    const textStyles = window.getComputedStyle(menuText);
    const dropdownStyles = window.getComputedStyle(dropdown);

    // Check what surfaces scroll under the header
    const baseMain = document.querySelector('.base-main');
    const firstSection = baseMain?.querySelector('section:first-of-type');
    const firstSectionStyles = window.getComputedStyle(firstSection);

    return {
      header: {
        position: headerStyles.position,
        backgroundColor: headerStyles.backgroundColor,
        zIndex: headerStyles.zIndex
      },
      logo: {
        color: logoStyles.color,
        fontSize: logoStyles.fontSize,
        fontWeight: logoStyles.fontWeight
      },
      menuPill: {
        backgroundColor: pillStyles.backgroundColor,
        borderRadius: pillStyles.borderRadius,
        padding: pillStyles.padding
      },
      menuText: {
        color: textStyles.color,
        fontSize: textStyles.fontSize
      },
      dropdown: {
        backgroundColor: dropdownStyles.backgroundColor,
        color: dropdownStyles.color
      },
      firstSectionBg: firstSectionStyles.backgroundColor
    };
  });

  await page.close();
  return { route, ...data };
}

async function main() {
  const browser = await chromium.launch();

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('STICKY HEADER AUDIT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  for (const route of routes) {
    const data = await auditHeader(browser, route);
    console.log(`${route}:`);
    console.log(`  Header position: ${data.header.position}`);
    console.log(`  Header background: ${data.header.backgroundColor}`);
    console.log(`  Header z-index: ${data.header.zIndex}`);
    console.log(`  Logo color: ${data.logo.color}`);
    console.log(`  Menu pill background: ${data.menuPill.backgroundColor}`);
    console.log(`  Menu text color: ${data.menuText.color}`);
    console.log(`  Dropdown background: ${data.dropdown.backgroundColor}`);
    console.log(`  Dropdown text color: ${data.dropdown.color}`);
    console.log(`  First section background: ${data.firstSectionBg}\n`);
  }

  await browser.close();
}

main().catch(console.error);
