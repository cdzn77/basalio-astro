import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const sectionStructure = await page.evaluate(() => {
  const heading = document.querySelector('.courses-heading');
  if (!heading) return { error: 'Heading not found' };
  
  // Get parent section
  let section = heading.closest('section, div[class*="course"], div[class*="block"]');
  if (!section) section = heading.parentElement;
  
  // Get all elements in this section
  const allElements = section ? section.querySelectorAll('*') : [];
  
  const results = {
    heading: heading.textContent,
    headingParent: section ? section.className : 'not found',
    allParagraphsInSection: []
  };
  
  // Find all paragraphs in the section
  const paragraphs = section ? section.querySelectorAll('p') : [];
  paragraphs.forEach(p => {
    results.allParagraphsInSection.push({
      className: p.className,
      text: p.textContent.substring(0, 80),
      nextSibling: p.nextElementSibling ? p.nextElementSibling.tagName : 'none'
    });
  });
  
  return results;
});

console.log('SECTION STRUCTURE:');
console.log(JSON.stringify(sectionStructure, null, 2));

await browser.close();
