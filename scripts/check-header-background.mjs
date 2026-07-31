import { chromium } from 'playwright';

const routes = ['/support', '/terms'];
const browser = await chromium.launch();

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

  const analysis = await page.evaluate(() => {
    // Get header
    const header = document.querySelector('header, .ramp-header, [class*="header"]');
    if (!header) return { error: 'header not found' };
    
    const headerStyle = window.getComputedStyle(header);
    
    // Get first section
    const section = document.querySelector('section');
    const sectionStyle = window.getComputedStyle(section);
    
    // Sample pixel colors at y=100 and y=300
    const y100 = document.elementFromPoint(720, 100);
    const y100Computed = window.getComputedStyle(y100);
    
    const y300 = document.elementFromPoint(720, 300);
    const y300Computed = window.getComputedStyle(y300);
    
    return {
      route: window.location.pathname,
      header: {
        tagName: header.tagName,
        className: header.className,
        backgroundColor: headerStyle.backgroundColor,
        backdropFilter: headerStyle.backdropFilter,
        position: headerStyle.position,
        zIndex: headerStyle.zIndex
      },
      firstSection: {
        tagName: section?.tagName,
        className: section?.className,
        backgroundColor: section ? window.getComputedStyle(section).backgroundColor : 'N/A'
      },
      pixelAt100: {
        tagName: y100?.tagName,
        className: y100?.className,
        backgroundColor: y100Computed.backgroundColor
      },
      pixelAt300: {
        tagName: y300?.tagName,
        className: y300?.className,
        backgroundColor: y300Computed.backgroundColor
      }
    };
  });

  if (analysis.error) {
    console.log(`${route}: ${analysis.error}`);
    continue;
  }

  console.log(`\n${route.toUpperCase()}`);
  console.log('='.repeat(60));
  
  console.log('\nHeader (<' + analysis.header.tagName + analysis.header.className + '>):');
  console.log(`  background-color: ${analysis.header.backgroundColor}`);
  console.log(`  backdrop-filter: ${analysis.header.backdropFilter}`);
  console.log(`  position: ${analysis.header.position}`);
  console.log(`  z-index: ${analysis.header.zIndex}`);
  
  console.log('\nFirst Section (<' + analysis.firstSection.tagName + analysis.firstSection.className + '>):');
  console.log(`  background-color: ${analysis.firstSection.backgroundColor}`);
  
  console.log('\nPixel at y=100 (header band):');
  console.log(`  Element: <${analysis.pixelAt100.tagName}${analysis.pixelAt100.className}>`);
  console.log(`  Computed background: ${analysis.pixelAt100.backgroundColor}`);
  
  console.log('\nPixel at y=300 (section):');
  console.log(`  Element: <${analysis.pixelAt300.tagName}${analysis.pixelAt300.className}>`);
  console.log(`  Computed background: ${analysis.pixelAt300.backgroundColor}`);
  
  const match = analysis.pixelAt100.backgroundColor === analysis.pixelAt300.backgroundColor;
  console.log(`\n→ Colours MATCH: ${match ? 'YES' : 'NO'}`);
  console.log(`  Interpretation: ${match ? 'Section boundary only' : 'Header has own background/blur'}`);

  await page.close();
}

await browser.close();
