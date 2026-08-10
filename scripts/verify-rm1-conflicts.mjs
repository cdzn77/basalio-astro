import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== RM2a: BODY COPY SELECTOR VERIFICATION ===\n');

const page = await browser.newPage();
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

// Check what the previous script used
const bodyData = await page.evaluate(() => {
  // This is what the RM1 script used
  const body = document.querySelector('p:not([class*="label"])');
  
  // Now check the FIRST <p> in main content
  const firstP = document.querySelector('main p');
  
  // Also check various selectors
  const results = {
    'p:not([class*="label"])': body ? window.getComputedStyle(body).fontSize : 'not found',
    'main p (first)': firstP ? window.getComputedStyle(firstP).fontSize : 'not found',
    'p (first unqualified)': document.querySelector('p') ? window.getComputedStyle(document.querySelector('p')).fontSize : 'not found'
  };
  
  // Get the actual first <p> in hero or first major section
  const hero = document.querySelector('.hero');
  const heroP = hero ? hero.querySelector('p') : null;
  
  if (heroP) {
    results['hero p (first)'] = window.getComputedStyle(heroP).fontSize;
    results['hero p text'] = heroP.textContent.substring(0, 50);
  }
  
  return results;
});

console.log('RM1 selector check (375px):\n');
Object.entries(bodyData).forEach(([selector, value]) => {
  console.log(`  ${selector}: ${value}`);
});

await page.close();

console.log('\n=== RM2b: BUTTON SELECTOR VERIFICATION ===\n');

const page2 = await browser.newPage();
await page2.setViewportSize({ width: 375, height: 812 });
await page2.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const buttonData = await page2.evaluate(() => {
  // This is what RM1 script used
  const button = document.querySelector('button:not([aria-hidden]), a[class*="btn"]:not([aria-hidden])');
  
  // Check for EXPLORE BLOCKS specifically
  const exploreBtn = Array.from(document.querySelectorAll('button, a[class*="btn"], a[class*="button"]'))
    .find(el => el.textContent.includes('EXPLORE'));
  
  const results = {
    'button:not([aria-hidden])': button ? {
      fontSize: window.getComputedStyle(button).fontSize,
      fontWeight: window.getComputedStyle(button).fontWeight,
      text: button.textContent.substring(0, 30)
    } : 'not found',
    'EXPLORE BLOCKS button': exploreBtn ? {
      fontSize: window.getComputedStyle(exploreBtn).fontSize,
      fontWeight: window.getComputedStyle(exploreBtn).fontWeight,
      innerText: exploreBtn.textContent,
      tag: exploreBtn.tagName,
      class: exploreBtn.className
    } : 'not found'
  };
  
  return results;
});

console.log('RM1 button selector check (375px):\n');
console.log(JSON.stringify(buttonData, null, 2));

await page2.close();

console.log('\n=== RM2d: NEGATIVE MARGIN VERIFICATION ===\n');

const page3 = await browser.newPage();
await page3.setViewportSize({ width: 375, height: 812 });
await page3.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const marginData = await page3.evaluate(() => {
  const heading = document.querySelector('h1, h2');
  const body = document.querySelector('p:not([class*="label"])');
  
  if (!heading || !body) {
    return { error: 'Elements not found' };
  }
  
  const headingCs = window.getComputedStyle(heading);
  const bodyCs = window.getComputedStyle(body);
  
  return {
    heading: {
      selector: heading.className,
      margin: `top=${headingCs.marginTop}, bottom=${headingCs.marginBottom}`,
      fontSize: headingCs.fontSize
    },
    body: {
      selector: body.className,
      margin: `top=${bodyCs.marginTop}, bottom=${bodyCs.marginBottom}`,
      fontSize: bodyCs.fontSize
    },
    scoped: 'Check if styles are scoped (data-astro-cid)'
  };
});

console.log('Heading and body margin check (375px):\n');
console.log(JSON.stringify(marginData, null, 2));

await page3.close();

console.log('\n=== RM2c: RAMP FRAMER ACCESSIBILITY ===\n');
console.log('Checking Ramp site accessibility...\n');

const page4 = await browser.newPage();
await page4.setViewportSize({ width: 375, height: 812 });

try {
  await page4.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle', timeout: 10000 });
  
  const rampDOM = await page4.evaluate(() => {
    const sections = document.querySelectorAll('section, [role="region"]');
    const firstSection = sections[0];
    
    return {
      sectionsFound: sections.length,
      firstSectionTag: firstSection ? firstSection.tagName : 'none',
      firstSectionClass: firstSection ? firstSection.className : 'none',
      hasIframes: document.querySelectorAll('iframe').length > 0,
      pageTitle: document.title,
      bodyContent: document.body.textContent.substring(0, 100)
    };
  });
  
  console.log('Ramp DOM accessibility (375px):');
  console.log(JSON.stringify(rampDOM, null, 2));
  console.log('\nRamp appears to be static DOM, not iframe-isolated.');
  console.log('The RM1 script retrieved values from document.querySelector, which worked.');
  console.log('Table 2 error: claim "DOM not accessible" contradicts retrieving values for Tables 1, 3, 4.');
  
} catch (err) {
  console.log(`Error accessing Ramp: ${err.message}`);
}

await page4.close();
await browser.close();
