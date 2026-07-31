import { chromium } from 'playwright';

const routes = ['/terms', '/privacy'];
const browser = await chromium.launch();

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
        const inParagraph = link.closest('p') !== null;
        const inList = link.closest('li') !== null;
        results.push({
          text: link.textContent.trim().substring(0, 25),
          size: `${Math.round(rect.width)}×${Math.round(rect.height)}`,
          inParagraph,
          inList,
          parent: link.parentElement.className || link.parentElement.tagName
        });
      }
    });

    return results;
  });

  if (failures.length > 0) {
    console.log(`\n${route}:`);
    failures.forEach(f => {
      const exemption = f.inParagraph ? '(p-inline, exempt)' : f.inList ? '(li-inline, exempt)' : '(STANDALONE)';
      console.log(`  "${f.text}" ${f.size} ${exemption}`);
    });
  }

  await page.close();
}

await browser.close();
