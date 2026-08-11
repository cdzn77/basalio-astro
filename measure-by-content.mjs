import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.setViewportSize({ width: 1440, height: 900 });
  
  const measurements = [];
  
  // /pricing .card-name
  await page.goto('http://localhost:4323/pricing');
  const cardName = await page.evaluate(() => {
    let el = null;
    // Find by text content - look for card names like "The blocks", "Dashboard", etc
    for (const candidate of document.querySelectorAll('[class*="card"]')) {
      if (candidate.textContent.includes('The blocks') || candidate.textContent.includes('blocks')) {
        el = candidate;
        break;
      }
    }
    if (!el) {
      for (const candidate of document.querySelectorAll('.card-name')) {
        if (candidate.textContent.trim().length > 0 && candidate.textContent.trim().length < 100) {
          el = candidate;
          break;
        }
      }
    }
    if (!el) return { selector: '.card-name', error: 'NOT_FOUND' };
    const s = window.getComputedStyle(el);
    return {
      selector: '.card-name',
      textContent: el.textContent.substring(0, 40),
      fontSize: s.fontSize,
      letterSpacing: s.letterSpacing
    };
  });
  measurements.push(cardName);
  
  // /pricing .risk-title
  const riskTitle = await page.evaluate(() => {
    let el = null;
    for (const candidate of document.querySelectorAll('[class*="risk"]')) {
      if (candidate.textContent.includes("don't ship")) {
        el = candidate;
        break;
      }
    }
    if (!el) return { selector: '.risk-title', error: 'NOT_FOUND' };
    const s = window.getComputedStyle(el);
    return {
      selector: '.risk-title',
      textContent: el.textContent.substring(0, 40),
      fontSize: s.fontSize,
      letterSpacing: s.letterSpacing
    };
  });
  measurements.push(riskTitle);
  
  // /roadmap .heading
  await page.goto('http://localhost:4323/roadmap');
  const roadmapHeading = await page.evaluate(() => {
    let el = null;
    for (const candidate of document.querySelectorAll('h1, h2, h3, [class*="heading"]')) {
      const text = candidate.textContent.trim();
      if (text.includes('Roadmap') || text.includes('roadmap') || text === 'Roadmap') {
        el = candidate;
        break;
      }
    }
    if (!el) return { selector: '.heading', error: 'NOT_FOUND' };
    const s = window.getComputedStyle(el);
    return {
      selector: '.heading',
      textContent: el.textContent.substring(0, 40),
      fontSize: s.fontSize,
      letterSpacing: s.letterSpacing
    };
  });
  measurements.push(roadmapHeading);
  
  // /support .contact-heading
  await page.goto('http://localhost:4323/support');
  const contactHeading = await page.evaluate(() => {
    let el = null;
    for (const candidate of document.querySelectorAll('h1, h2, h3, [class*="contact"]')) {
      const text = candidate.textContent.trim();
      if (text.includes('Contact') || text.includes('contact') || text.includes('Get in touch')) {
        el = candidate;
        break;
      }
    }
    if (!el) return { selector: '.contact-heading', error: 'NOT_FOUND' };
    const s = window.getComputedStyle(el);
    return {
      selector: '.contact-heading',
      textContent: el.textContent.substring(0, 40),
      fontSize: s.fontSize,
      letterSpacing: s.letterSpacing
    };
  });
  measurements.push(contactHeading);
  
  // / .heading (both instances)
  await page.goto('http://localhost:4323/');
  const homeHeadings = await page.evaluate(() => {
    const results = [];
    let count = 0;
    for (const candidate of document.querySelectorAll('[class*="heading"], h1, h2, h3')) {
      const text = candidate.textContent.trim();
      // Skip footer, navigation, etc - look for main page headings
      if (text.length > 10 && text.length < 200 && !text.includes('©') && !text.includes('http')) {
        const s = window.getComputedStyle(candidate);
        results.push({
          selector: '.heading',
          textContent: text.substring(0, 40),
          fontSize: s.fontSize,
          letterSpacing: s.letterSpacing
        });
        count++;
        if (count >= 2) break;
      }
    }
    return results;
  });
  measurements.push(...homeHeadings);
  
  console.log('=== MEASUREMENTS BY TEXTCONTENT (1440px) ===\n');
  measurements.forEach((m, i) => {
    console.log(`${i + 1}. ${m.selector} | ${m.textContent || m.error}`);
    console.log(`   fontSize: ${m.fontSize}, letterSpacing: ${m.letterSpacing}\n`);
  });
  
} catch (e) {
  console.error('Error:', e.message);
}

await browser.close();
