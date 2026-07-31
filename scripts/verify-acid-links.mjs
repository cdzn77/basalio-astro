import { chromium } from 'playwright';

const routes = ['/support', '/terms', '/privacy'];
const browser = await chromium.launch();

console.log('\nVERIFICATION: Email & External Link Colours\n');

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const links = await page.evaluate(() => {
    const results = [];
    
    // Email links
    document.querySelectorAll('a[href*="mailto"]').forEach(link => {
      if (link.textContent.includes('hello@basalio.com')) {
        const computed = window.getComputedStyle(link);
        results.push({
          text: link.textContent.substring(0, 20),
          type: 'email',
          color: computed.color,
          textDecoration: computed.textDecoration,
          decorationColor: computed.textDecorationColor
        });
      }
    });
    
    // External links
    document.querySelectorAll('a[href*="https"]').forEach(link => {
      if (link.textContent.includes('privacy') || link.textContent.includes('Stripe') || link.textContent.includes('Netlify') || link.textContent.includes('GitHub')) {
        const computed = window.getComputedStyle(link);
        results.push({
          text: link.textContent.substring(0, 20),
          type: 'external',
          color: computed.color,
          textDecoration: computed.textDecoration,
          decorationColor: computed.textDecorationColor
        });
      }
    });
    
    return results;
  });

  if (links.length > 0) {
    console.log(`${route}`);
    links.forEach(l => {
      const isAcid = l.color === 'rgb(223, 255, 0)';
      const status = isAcid ? '✗ ACID' : '✓ OK';
      console.log(`  ${status} | ${l.text.padEnd(20)} | ${l.color}`);
      if (l.textDecoration !== 'none') {
        console.log(`       Underline: ${l.decorationColor}`);
      }
    });
    console.log();
  }

  await page.close();
}

await browser.close();
