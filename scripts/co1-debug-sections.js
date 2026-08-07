import { chromium } from 'playwright';

const PORT = process.env.PORT || 4321;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

  const sections = await page.evaluate(() => {
    const all = document.querySelectorAll('section[data-surface]');
    return Array.from(all).map(s => ({
      surface: s.getAttribute('data-surface'),
      class: s.getAttribute('class'),
      offsetTop: s.offsetTop,
      offsetHeight: s.offsetHeight,
      endAt: s.offsetTop + s.offsetHeight
    }));
  });

  console.log('Sections with data-surface on homepage:');
  sections.forEach((s, i) => {
    console.log(`${i + 1}. ${s.surface.padEnd(6)} | top: ${s.offsetTop.toString().padStart(5)}px | height: ${s.offsetHeight.toString().padStart(4)}px | ends: ${s.endAt.toString().padStart(5)}px | class: ${s.class}`);
  });

  console.log('\nScrolling to 800px, checking observer state:');
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(300);

  const state = await page.evaluate(() => {
    const header = document.querySelector('.base-header');
    const hc = document.querySelector('.header-container');
    const all = document.querySelectorAll('section[data-surface]');
    const rects = Array.from(all).map(s => ({
      surface: s.getAttribute('data-surface'),
      inViewport: s.getBoundingClientRect().top < 844 && s.getBoundingClientRect().bottom > 0
    }));
    return {
      scrollY: window.scrollY,
      headerDataSurface: header?.getAttribute('data-surface'),
      hcDataSurface: hc?.getAttribute('data-surface'),
      sectionsInViewport: rects
    };
  });

  console.log(`scrollY: ${state.scrollY}px`);
  console.log(`header data-surface: ${state.headerDataSurface}`);
  console.log(`Sections in viewport:`);
  state.sectionsInViewport.forEach((s, i) => {
    console.log(`  ${i + 1}. ${s.surface.padEnd(6)} | in viewport: ${s.inViewport}`);
  });

  await browser.close();
})();
