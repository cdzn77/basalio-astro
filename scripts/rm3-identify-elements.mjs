import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

console.log('=== RM3b: ELEMENT IDENTIFICATION (BASALIO) ===\n');

const page = await browser.newPage();
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const basalioElements = await page.evaluate(() => {
  const results = {};
  
  // Eyebrow: "A WORDPRESS PLUGIN FOR CREATIVES"
  const eyebrow = Array.from(document.querySelectorAll('p, span, div'))
    .find(el => el.textContent.includes('A WORDPRESS PLUGIN FOR CREATIVES'));
  if (eyebrow) {
    results.eyebrow = {
      selector: eyebrow.className || eyebrow.tagName.toLowerCase(),
      textContent: eyebrow.textContent.substring(0, 50),
      found: true
    };
  } else {
    results.eyebrow = { found: false };
  }
  
  // Heading: "Framer-quality interactions, native to WordPress."
  const heading = Array.from(document.querySelectorAll('h1, h2, h3'))
    .find(el => el.textContent.includes('Framer-quality'));
  if (heading) {
    results.heading = {
      selector: heading.className || heading.tagName.toLowerCase(),
      textContent: heading.textContent.substring(0, 50),
      found: true
    };
  } else {
    results.heading = { found: false };
  }
  
  // Body: "Give your work a foundation to stand on..."
  const body = Array.from(document.querySelectorAll('p'))
    .find(el => el.textContent.includes('Give your work a foundation'));
  if (body) {
    results.body = {
      selector: body.className || body.tagName.toLowerCase(),
      textContent: body.textContent.substring(0, 50),
      found: true
    };
  } else {
    results.body = { found: false };
  }
  
  // CTA button: "EXPLORE BLOCKS"
  const cta = Array.from(document.querySelectorAll('button, a'))
    .find(el => el.textContent.trim() === 'EXPLORE BLOCKS');
  if (cta) {
    results.cta = {
      selector: cta.className || cta.tagName.toLowerCase(),
      textContent: cta.textContent.trim(),
      found: true
    };
  } else {
    results.cta = { found: false };
  }
  
  // Section heading: "Nine blocks. Nothing you don't need."
  const sectionHeading = Array.from(document.querySelectorAll('h1, h2, h3'))
    .find(el => el.textContent.includes('Nine blocks'));
  if (sectionHeading) {
    results.sectionHeading = {
      selector: sectionHeading.className || sectionHeading.tagName.toLowerCase(),
      textContent: sectionHeading.textContent.substring(0, 50),
      found: true
    };
  } else {
    results.sectionHeading = { found: false };
  }
  
  // Section body: paragraph under section heading
  const sectionBody = Array.from(document.querySelectorAll('p'))
    .find(el => el.textContent.includes('curated interaction blocks'));
  if (sectionBody) {
    results.sectionBody = {
      selector: sectionBody.className || sectionBody.tagName.toLowerCase(),
      textContent: sectionBody.textContent.substring(0, 50),
      found: true
    };
  } else {
    results.sectionBody = { found: false };
  }
  
  return results;
});

console.log('BASALIO Elements Found:\n');
Object.entries(basalioElements).forEach(([name, data]) => {
  console.log(`${name}:`);
  if (data.found) {
    console.log(`  Selector: ${data.selector}`);
    console.log(`  Text: "${data.textContent}"`);
  } else {
    console.log(`  NOT FOUND`);
  }
  console.log('');
});

await page.close();

console.log('\n=== RM3b: ELEMENT IDENTIFICATION (RAMP) ===\n');

const page2 = await browser.newPage();
await page2.setViewportSize({ width: 375, height: 812 });
await page2.goto('https://rampstudio.framer.website', { waitUntil: 'networkidle' });

const rampElements = await page2.evaluate(() => {
  const results = {};
  
  // Find first section heading
  const heading1 = document.querySelector('h1, h2');
  if (heading1) {
    results.firstHeading = {
      selector: heading1.className || heading1.tagName.toLowerCase(),
      textContent: heading1.textContent.substring(0, 50),
      found: true
    };
  }
  
  // Find section body paragraph
  const para1 = document.querySelector('p');
  if (para1) {
    results.firstParagraph = {
      selector: para1.className || para1.tagName.toLowerCase(),
      textContent: para1.textContent.substring(0, 50),
      found: true
    };
  }
  
  // Find first CTA button
  const btn1 = document.querySelector('button, a[class*="btn"]');
  if (btn1) {
    results.firstButton = {
      selector: btn1.className || btn1.tagName.toLowerCase(),
      textContent: btn1.textContent.trim(),
      found: true
    };
  }
  
  // Find section heading (2nd heading)
  const heading2 = document.querySelectorAll('h1, h2')[1];
  if (heading2) {
    results.secondHeading = {
      selector: heading2.className || heading2.tagName.toLowerCase(),
      textContent: heading2.textContent.substring(0, 50),
      found: true
    };
  }
  
  // Find paragraph under 2nd heading
  const allParas = Array.from(document.querySelectorAll('p'));
  const para2 = allParas[1];
  if (para2) {
    results.secondParagraph = {
      selector: para2.className || para2.tagName.toLowerCase(),
      textContent: para2.textContent.substring(0, 50),
      found: true
    };
  }
  
  return results;
});

console.log('RAMP Elements Found:\n');
Object.entries(rampElements).forEach(([name, data]) => {
  console.log(`${name}:`);
  if (data.found) {
    console.log(`  Selector: ${data.selector}`);
    console.log(`  Text: "${data.textContent}"`);
  } else {
    console.log(`  NOT FOUND`);
  }
  console.log('');
});

await page2.close();
await browser.close();
