import { chromium } from 'playwright';

const selectors = {
  '/blocks': [
    { selector: '.block-title', name: 'block-title' },
  ],
  '/privacy': [
    { selector: '.section-heading', name: 'section-heading' },
  ],
  '/terms': [
    { selector: '.section-heading', name: 'section-heading' },
  ],
  '/contact': [
    { selector: '.hero-description', name: 'hero-description' },
    { selector: '.resources-description', name: 'resources-description' },
    { selector: '.social-link', name: 'social-link' },
  ],
  '/pricing': [
    { selector: '.ledger-description', name: 'ledger-description' },
    { selector: '.risk-content p', name: 'risk-content p' },
  ],
  '/support': [
    { selector: '.accordion-answer', name: 'accordion-answer' },
    { selector: '.contact-text', name: 'contact-text' },
  ],
  '/': [
    { selector: '.ledger-description', name: 'ledger-description' },
    { selector: '.risk-content p', name: 'risk-content p' },
  ],
};

(async () => {
  const browser = await chromium.launch();
  const routes = ['/blocks', '/support'];

  console.log('═══════════════════════════════════════════════════');
  console.log('GN3 HEADING SEQUENCE — /blocks AND /support');
  console.log('═══════════════════════════════════════════════════\n');

  for (const route of routes) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

    const headingData = await page.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(headings).map((h) => {
        const computed = window.getComputedStyle(h);
        return {
          level: parseInt(h.tagName[1]),
          tagName: h.tagName,
          fontSize: computed.fontSize,
          className: h.className || '(no class)',
          text: h.textContent?.slice(0, 60) || '',
        };
      });
    });

    const h1Count = headingData.filter(h => h.level === 1).length;
    console.log(`${route || '/'} — ${h1Count} h1 element(s)`);

    headingData.forEach((h, i) => {
      console.log(`  ${i + 1}. <${h.tagName} class="${h.className}"> ${h.fontSize} | "${h.text}"`);
    });

    if (h1Count !== 1) {
      console.log(`  ⚠️ FAIL — Page needs exactly 1 h1, has ${h1Count}`);
    }
    console.log();

    await page.close();
  }

  await browser.close();
})();
