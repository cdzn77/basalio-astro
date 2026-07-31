import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });

// Check WHO IT'S FOR section
const carouselData = await page.evaluate(() => {
  const section = document.querySelector('[class*="who"]');
  if (!section) return { error: 'WHO section not found' };

  const cards = section.querySelectorAll('[class*="card"], [class*="item"]');
  const rendered = section.textContent.length > 0;

  return {
    sectionFound: true,
    sectionClass: section.className,
    cardsFound: cards.length,
    textContent: section.textContent.substring(0, 200),
    rendered
  };
});

console.log('\nWHO IT\'S FOR CAROUSEL CHECK');
console.log('============================\n');
console.log('Section found:', carouselData.sectionFound);
console.log('Section class:', carouselData.sectionClass);
console.log('Cards found:', carouselData.cardsFound);
console.log('Rendered:', carouselData.rendered);
console.log('\nText content preview:');
console.log(carouselData.textContent || '(empty)');

// Check for data issues
const dataCheck = await page.evaluate(() => {
  const script = document.querySelector('script');
  if (!script) return 'No scripts found';
  
  // Check if WhoItsFor component exists
  const componentCheck = Array.from(document.querySelectorAll('[class*="who"]')).map(el => ({
    tag: el.tagName,
    class: el.className,
    children: el.children.length,
    text: el.textContent.substring(0, 50)
  }));

  return componentCheck;
});

console.log('\nComponent structure:', JSON.stringify(dataCheck, null, 2));

await browser.close();
