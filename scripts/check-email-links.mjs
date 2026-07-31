import { chromium } from 'playwright';

const routes = ['/support', '/terms'];
const browser = await chromium.launch();

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const emailLinks = await page.evaluate(() => {
    const links = document.querySelectorAll('a[href*="mailto"]');
    const results = [];

    links.forEach((link) => {
      if (link.textContent.includes('hello@basalio.com')) {
        const parent = link.parentElement;
        const computed = window.getComputedStyle(link);
        
        // Walk up to find the parent structure
        let markup = '';
        let current = link;
        for (let i = 0; i < 3; i++) {
          if (current) {
            const tag = current.tagName.toLowerCase();
            const className = current.className ? '.' + current.className : '';
            markup = `<${tag}${className}> → ${markup}`;
            current = current.parentElement;
          }
        }

        results.push({
          text: link.textContent,
          color: computed.color,
          textDecoration: computed.textDecoration,
          textDecorationColor: computed.textDecorationColor,
          parentTag: parent?.tagName,
          parentClass: parent?.className,
          markup: markup.substring(0, 150)
        });
      }
    });

    return results;
  });

  console.log(`\n${route.toUpperCase()} - Email Links`);
  console.log('='.repeat(60));

  emailLinks.forEach((link, idx) => {
    console.log(`\nInstance ${idx + 1}:`);
    console.log(`  Text: ${link.text}`);
    console.log(`  Parent: <${link.parentTag}${link.parentClass ? '.' + link.parentClass : ''}>`);
    console.log(`  Color: ${link.color}`);
    console.log(`  Text-decoration: ${link.textDecoration}`);
    console.log(`  Decoration-color: ${link.textDecorationColor}`);
    console.log(`  Markup: ${link.markup}`);
    
    // Check if parent is p or li
    const inProse = link.parentTag === 'P' || link.parentTag === 'LI';
    console.log(`  → In prose selector (p a, li a): ${inProse ? 'YES' : 'NO'}`);
  });

  await page.close();
}

await browser.close();
