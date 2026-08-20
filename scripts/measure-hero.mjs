import { chromium } from 'playwright';

const URL = process.env.URL || 'http://localhost:4321/';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(URL, { waitUntil: 'networkidle' });

const dims = await page.evaluate(() => {
  const hero = document.querySelector('.sample-hero');
  const shot = document.querySelector('.sample-editor-shot');
  const text = document.querySelector('.sample-hero-text');
  return {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    hero: hero ? hero.getBoundingClientRect().toJSON() : null,
    shot: shot ? shot.getBoundingClientRect().toJSON() : null,
    text: text ? text.getBoundingClientRect().toJSON() : null,
  };
});

console.log(JSON.stringify(dims, null, 2));

await browser.close();
