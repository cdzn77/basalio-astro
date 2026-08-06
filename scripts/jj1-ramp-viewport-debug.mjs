import { chromium } from 'playwright';

async function debugViewport() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });

  await page.goto('https://rampstudio.framer.website', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const viewportInfo = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    
    return {
      windowInnerWidth: window.innerWidth,
      windowInnerHeight: window.innerHeight,
      documentElementClientWidth: html.clientWidth,
      documentBodyClientWidth: body?.clientWidth,
      documentElementScrollWidth: html.scrollWidth,
      documentBodyScrollWidth: body?.scrollWidth,
      devicePixelRatio: window.devicePixelRatio,
      htmlTransform: window.getComputedStyle(html).transform,
      bodyTransform: window.getComputedStyle(body).transform,
      htmlScale: window.getComputedStyle(html).scale,
      bodyScale: window.getComputedStyle(body).scale,
      viewportMeta: document.querySelector('meta[name="viewport"]')?.getAttribute('content')
    };
  });

  console.log('Viewport Debug Info:');
  console.log(JSON.stringify(viewportInfo, null, 2));

  // Now re-measure carousel with correct viewport
  const carouselReMeasure = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const coursesSection = sections.find(s => s.textContent.includes('Courses'));
    
    if (!coursesSection) return { error: 'Courses not found' };

    const carousel = coursesSection.querySelector('[style*="overflow"], [class*="carousel"]') || 
                     Array.from(coursesSection.querySelectorAll('div')).find(d => {
                       const s = window.getComputedStyle(d);
                       return (s.overflowX === 'auto' || s.overflowX === 'scroll') && d.children.length > 2;
                     });

    if (!carousel) return { error: 'Carousel not found' };

    const rect = carousel.getBoundingClientRect();
    const cards = Array.from(carousel.children);
    const firstCardRect = cards[0]?.getBoundingClientRect();

    return {
      carouselBoundingRect: {
        left: rect.left,
        right: rect.right,
        width: rect.width,
        top: rect.top
      },
      firstCardRect: {
        left: firstCardRect?.left,
        width: firstCardRect?.width
      },
      carouselOffsetWidth: carousel.offsetWidth,
      carouselScrollWidth: carousel.scrollWidth,
      carouselStyle: {
        overflow: window.getComputedStyle(carousel).overflow,
        overflowX: window.getComputedStyle(carousel).overflowX,
        width: window.getComputedStyle(carousel).width
      }
    };
  });

  console.log('\nCarousel Re-measure (with BoundingClientRect):');
  console.log(JSON.stringify(carouselReMeasure, null, 2));

  await browser.close();
}

debugViewport().catch(err => console.error(err.message));
