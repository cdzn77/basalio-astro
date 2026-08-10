import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// /pricing at 1440px
const pricing1440 = await browser.newPage();
await pricing1440.setViewportSize({ width: 1440, height: 900 });
await pricing1440.goto('http://localhost:4321/pricing', { waitUntil: 'networkidle' });

const p1440 = await pricing1440.evaluate(() => {
  const ledger = document.querySelector('.ledger-description');
  const risk = document.querySelector('.risk-content p');
  return {
    ledger: ledger ? { fontSize: window.getComputedStyle(ledger).fontSize, lineHeight: window.getComputedStyle(ledger).lineHeight } : null,
    risk: risk ? { fontSize: window.getComputedStyle(risk).fontSize, lineHeight: window.getComputedStyle(risk).lineHeight } : null
  };
});

console.log('/pricing 1440px:');
console.log(`  .ledger-description: ${p1440.ledger.fontSize} / ${p1440.ledger.lineHeight}`);
console.log(`  .risk-content p: ${p1440.risk.fontSize} / ${p1440.risk.lineHeight}`);

await pricing1440.close();

// /pricing at 375px
const pricing375 = await browser.newPage();
await pricing375.setViewportSize({ width: 375, height: 900 });
await pricing375.goto('http://localhost:4321/pricing', { waitUntil: 'networkidle' });

const p375 = await pricing375.evaluate(() => {
  const ledger = document.querySelector('.ledger-description');
  const risk = document.querySelector('.risk-content p');
  return {
    ledger: ledger ? { fontSize: window.getComputedStyle(ledger).fontSize, lineHeight: window.getComputedStyle(ledger).lineHeight } : null,
    risk: risk ? { fontSize: window.getComputedStyle(risk).fontSize, lineHeight: window.getComputedStyle(risk).lineHeight } : null
  };
});

console.log('/pricing 375px:');
console.log(`  .ledger-description: ${p375.ledger.fontSize} / ${p375.ledger.lineHeight}`);
console.log(`  .risk-content p: ${p375.risk.fontSize} / ${p375.risk.lineHeight}`);

await pricing375.close();

// /hacks reference
const hacks = await browser.newPage();
await hacks.setViewportSize({ width: 1440, height: 900 });
await hacks.goto('http://localhost:4321/hacks', { waitUntil: 'networkidle' });

const hacksPara = await hacks.evaluate(() => {
  // Find the 18px body paragraph we found before
  const paragraphs = document.querySelectorAll('p');
  for (const p of paragraphs) {
    const s = window.getComputedStyle(p);
    if (s.fontSize === '18px' && !p.className) {
      return { fontSize: s.fontSize, lineHeight: s.lineHeight };
    }
  }
  return null;
});

console.log('/hacks reference (body paragraph):');
console.log(`  ${hacksPara.fontSize} / ${hacksPara.lineHeight}`);

await hacks.close();
await browser.close();
