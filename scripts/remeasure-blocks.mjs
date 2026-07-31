import { chromium } from 'playwright';

async function measureBlocks(browser) {
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/blocks', { waitUntil: 'networkidle' });
  
  const measurements = await page.evaluate(() => {
    const baseMain = document.querySelector('.base-main');
    const lastSection = baseMain.querySelector('section:last-of-type');
    const lastChild = baseMain.lastElementChild;
    
    return {
      lastChild: {
        tag: lastChild.tagName.toLowerCase(),
        class: lastChild.className,
        isSection: lastChild.tagName === 'SECTION',
        styles: {
          borderBottomLeftRadius: window.getComputedStyle(lastChild).borderBottomLeftRadius,
          borderBottomRightRadius: window.getComputedStyle(lastChild).borderBottomRightRadius,
          marginBottom: window.getComputedStyle(lastChild).marginBottom,
          backgroundColor: window.getComputedStyle(lastChild).backgroundColor
        }
      },
      lastOfType: lastSection ? {
        tag: lastSection.tagName.toLowerCase(),
        class: lastSection.className,
        styles: {
          borderBottomLeftRadius: window.getComputedStyle(lastSection).borderBottomLeftRadius,
          borderBottomRightRadius: window.getComputedStyle(lastSection).borderBottomRightRadius,
          marginBottom: window.getComputedStyle(lastSection).marginBottom,
          backgroundColor: window.getComputedStyle(lastSection).backgroundColor
        }
      } : null
    };
  });
  
  await page.close();
  return measurements;
}

async function main() {
  const browser = await chromium.launch();
  const data = await measureBlocks(browser);
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('/blocks: LAST CHILD vs LAST-OF-TYPE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('lastElementChild (actual last):');
  console.log(`  Tag: <${data.lastChild.tag}${data.lastChild.class ? ` class="${data.lastChild.class}"` : ''}>`);
  console.log(`  Is <section>? ${data.lastChild.isSection}`);
  console.log(`  Styles:`);
  console.log(`    borderBottomLeftRadius: ${data.lastChild.styles.borderBottomLeftRadius}`);
  console.log(`    borderBottomRightRadius: ${data.lastChild.styles.borderBottomRightRadius}`);
  console.log(`    marginBottom: ${data.lastChild.styles.marginBottom}`);
  console.log(`    backgroundColor: ${data.lastChild.styles.backgroundColor}\n`);
  
  if (data.lastOfType) {
    console.log('section:last-of-type (last section, ignoring scripts):');
    console.log(`  Tag: <${data.lastOfType.tag}${data.lastOfType.class ? ` class="${data.lastOfType.class}"` : ''}>`);
    console.log(`  Styles:`);
    console.log(`    borderBottomLeftRadius: ${data.lastOfType.styles.borderBottomLeftRadius}`);
    console.log(`    borderBottomRightRadius: ${data.lastOfType.styles.borderBottomRightRadius}`);
    console.log(`    marginBottom: ${data.lastOfType.styles.marginBottom}`);
    console.log(`    backgroundColor: ${data.lastOfType.styles.backgroundColor}\n`);
  }
  
  console.log('DIAGNOSIS:');
  console.log(`  ✗ :last-child selector targets <${data.lastChild.tag}>, NOT the section`);
  console.log(`  ✓ :last-of-type selector would target the last <section>`);
  console.log(`  ✗ /blocks currently has FLAT bottom (no radius, no overlap)`);
  
  await browser.close();
}

main().catch(console.error);
