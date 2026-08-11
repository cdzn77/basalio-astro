import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  // Test at 1440px viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // HOME: H2 heading (40px)
  await page.goto('http://localhost:4322/');
  const h2LS = await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    if (!h2) return null;
    const s = window.getComputedStyle(h2);
    return { letterSpacing: s.letterSpacing, fontSize: s.fontSize };
  });
  console.log('=== HOME H2 (expected 40px, -0.8px letter-spacing) ===');
  console.log(JSON.stringify(h2LS, null, 2));
  
  // PRICING: .card-name (20px)
  await page.goto('http://localhost:4322/pricing');
  const cardLS = await page.evaluate(() => {
    const card = document.querySelector('.card-name');
    if (!card) return null;
    const s = window.getComputedStyle(card);
    return { letterSpacing: s.letterSpacing, fontSize: s.fontSize };
  });
  console.log('\n=== PRICING .card-name (expected 20px, -0.4px letter-spacing) ===');
  console.log(JSON.stringify(cardLS, null, 2));
  
  // FAQ: h3 title (32px)
  await page.goto('http://localhost:4322/');
  const faqLS = await page.evaluate(() => {
    const faq = document.querySelector('.faq-item h3');
    if (!faq) return null;
    const s = window.getComputedStyle(faq);
    return { letterSpacing: s.letterSpacing, fontSize: s.fontSize };
  });
  console.log('\n=== FAQ H3 (expected 32px, -0.64px letter-spacing) ===');
  console.log(JSON.stringify(faqLS, null, 2));
  
  // 404: .not-found-heading and .not-found-text
  await page.goto('http://localhost:4322/404');
  const notFoundMargins = await page.evaluate(() => {
    const heading = document.querySelector('.not-found-heading');
    const text = document.querySelector('.not-found-text');
    const hStyles = heading ? window.getComputedStyle(heading) : null;
    const tStyles = text ? window.getComputedStyle(text) : null;
    return {
      heading: hStyles ? { marginBlockEnd: hStyles.marginBlockEnd, marginBottom: hStyles.marginBottom } : null,
      text: tStyles ? { marginBlockEnd: tStyles.marginBlockEnd, marginBottom: tStyles.marginBottom } : null
    };
  });
  console.log('\n=== 404 MARGINS (expected 20px, 40px) ===');
  console.log(JSON.stringify(notFoundMargins, null, 2));
  
} catch (e) {
  console.error('Error:', e);
}

await browser.close();
