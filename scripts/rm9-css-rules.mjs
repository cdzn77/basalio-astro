import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== RM9b: CSS RULES PRODUCING EYEBROW→HEADING GAPS ===\n');

const page = await browser.newPage();
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const cssRules = await page.evaluate(() => {
  const results = {};
  
  // Find .courses-eyebrow and its parent container
  const eyebrow = document.querySelector('.courses-eyebrow');
  const heading = document.querySelector('.courses-heading');
  
  if (eyebrow) {
    const parent = eyebrow.parentElement;
    const eyebrowStyles = window.getComputedStyle(eyebrow);
    const parentStyles = window.getComputedStyle(parent);
    
    results.coursesSection = {
      eyebrow: {
        marginBlockEnd: eyebrowStyles.marginBlockEnd,
        marginBottom: eyebrowStyles.marginBottom,
        paddingBlockEnd: eyebrowStyles.paddingBlockEnd,
        element: eyebrow.tagName + '.' + eyebrow.className
      },
      parent: {
        display: parentStyles.display,
        gap: parentStyles.gap,
        flexDirection: parentStyles.flexDirection,
        element: parent.tagName + '.' + parent.className
      }
    };
  }
  
  // Find hero eyebrow→heading
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const heroHeading = document.querySelector('.hero-heading');
  
  if (heroEyebrow) {
    const heroContainer = heroEyebrow.parentElement;
    const heroEyebrowStyles = window.getComputedStyle(heroEyebrow);
    const heroContainerStyles = window.getComputedStyle(heroContainer);
    
    results.heroSection = {
      eyebrow: {
        marginBlockEnd: heroEyebrowStyles.marginBlockEnd,
        marginBottom: heroEyebrowStyles.marginBottom,
        paddingBlockEnd: heroEyebrowStyles.paddingBlockEnd,
        element: heroEyebrow.tagName + '.' + heroEyebrow.className
      },
      container: {
        display: heroContainerStyles.display,
        gap: heroContainerStyles.gap,
        flexDirection: heroContainerStyles.flexDirection,
        element: heroContainer.tagName + '.' + heroContainer.className
      }
    };
  }
  
  return results;
});

console.log('COURSES SECTION (.courses-eyebrow → .courses-heading):');
console.log(`  Eyebrow element: ${cssRules.coursesSection.eyebrow.element}`);
console.log(`    margin-block-end: ${cssRules.coursesSection.eyebrow.marginBlockEnd}`);
console.log(`    margin-bottom: ${cssRules.coursesSection.eyebrow.marginBottom}`);
console.log(`    padding-block-end: ${cssRules.coursesSection.eyebrow.paddingBlockEnd}`);
console.log(`  Parent container: ${cssRules.coursesSection.parent.element}`);
console.log(`    display: ${cssRules.coursesSection.parent.display}`);
console.log(`    gap: ${cssRules.coursesSection.parent.gap}`);
console.log(`    flex-direction: ${cssRules.coursesSection.parent.flexDirection}`);

console.log('\nHERO SECTION (.hero-eyebrow → .hero-heading):');
console.log(`  Eyebrow element: ${cssRules.heroSection.eyebrow.element}`);
console.log(`    margin-block-end: ${cssRules.heroSection.eyebrow.marginBlockEnd}`);
console.log(`    margin-bottom: ${cssRules.heroSection.eyebrow.marginBottom}`);
console.log(`    padding-block-end: ${cssRules.heroSection.eyebrow.paddingBlockEnd}`);
console.log(`  Container: ${cssRules.heroSection.container.element}`);
console.log(`    display: ${cssRules.heroSection.container.display}`);
console.log(`    gap: ${cssRules.heroSection.container.gap}`);
console.log(`    flex-direction: ${cssRules.heroSection.container.flexDirection}`);

await page.close();
await browser.close();
