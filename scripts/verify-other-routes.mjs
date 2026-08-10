import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// Check /hacks
const pageHacks = await browser.newPage();
await pageHacks.setViewportSize({ width: 1440, height: 900 });
await pageHacks.goto('http://localhost:4321/hacks', { waitUntil: 'networkidle' });

const hacksStyle = await pageHacks.evaluate(() => {
  const p = document.querySelector('p');
  if (p) {
    const s = window.getComputedStyle(p);
    return {
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      ratio: (parseInt(s.lineHeight) / parseInt(s.fontSize)).toFixed(2)
    };
  }
  return null;
});

console.log('/hacks body paragraph:');
console.log(`  font-size: ${hacksStyle?.fontSize}`);
console.log(`  line-height: ${hacksStyle?.lineHeight}`);
console.log(`  ratio: ${hacksStyle?.ratio}`);

await pageHacks.close();

// Check /roadmap
const pageRoadmap = await browser.newPage();
await pageRoadmap.setViewportSize({ width: 1440, height: 900 });
await pageRoadmap.goto('http://localhost:4321/roadmap', { waitUntil: 'networkidle' });

const roadmapStyle = await pageRoadmap.evaluate(() => {
  const p = document.querySelector('p');
  if (p) {
    const s = window.getComputedStyle(p);
    return {
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      ratio: (parseInt(s.lineHeight) / parseInt(s.fontSize)).toFixed(2)
    };
  }
  return null;
});

console.log('/roadmap body paragraph:');
console.log(`  font-size: ${roadmapStyle?.fontSize}`);
console.log(`  line-height: ${roadmapStyle?.lineHeight}`);
console.log(`  ratio: ${roadmapStyle?.ratio}`);

await pageRoadmap.close();
await browser.close();
