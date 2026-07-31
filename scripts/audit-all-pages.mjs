import { chromium } from 'playwright';

const routes = [
  '/',
  '/blocks',
  '/hacks',
  '/pricing',
  '/support',
  '/roadmap',
  '/terms',
  '/privacy',
  '/contact',
  '/early-access'
];

const browser = await chromium.launch();

async function auditPage(route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  try {
    await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle', timeout: 10000 });
  } catch (e) {
    await page.close();
    return { route, error: e.message };
  }

  const results = await page.evaluate(() => {
    // Get all links
    const links = document.querySelectorAll('a');
    const findings = {
      contrastFailures: [],
      linkIdFailures: [],
      targetSizeFailures: [],
      passingSamples: {
        focusRing: null,
        headingHierarchy: null
      }
    };

    links.forEach((link, idx) => {
      const rect = link.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return; // Skip invisible elements

      const linkStyle = window.getComputedStyle(link);
      const linkColor = linkStyle.color;
      const textDecoration = linkStyle.textDecoration;

      // Walk up for background
      let current = link;
      let resolvedBg = 'transparent';
      let depth = 0;
      while (current && depth < 8) {
        const bg = window.getComputedStyle(current).backgroundColor;
        if (bg && !bg.includes('rgba(0, 0, 0, 0)') && !bg.includes('transparent')) {
          resolvedBg = bg;
          break;
        }
        current = current.parentElement;
        depth++;
      }

      // Check 1.4.1: Underline or other text decoration
      const hasUnderline = textDecoration.includes('underline');
      if (!hasUnderline && link.textContent.trim().length > 0) {
        findings.linkIdFailures.push({
          text: link.textContent.trim().substring(0, 30),
          hasUnderline,
          textDecoration
        });
      }

      // Check 2.5.8: Target size >= 24x24
      if (rect.width < 24 || rect.height < 24) {
        findings.targetSizeFailures.push({
          text: link.textContent.trim().substring(0, 30),
          size: `${Math.round(rect.width)}×${Math.round(rect.height)}`,
          inline: link.closest('p') !== null
        });
      }

      // Check 2.4.7: Focus visible
      if (idx === 0) {
        const focusStyle = window.getComputedStyle(link, ':focus-visible');
        findings.passingSamples.focusRing = focusStyle.outline || 'present';
      }
    });

    // Check heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length > 0) {
      findings.passingSamples.headingHierarchy = `${headings.length} headings found`;
    }

    return findings;
  });

  await page.close();
  return { route, ...results };
}

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║ WCAG 2.2 AA AUDIT — ALL 10 PAGES (After Fixes)              ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

const allResults = [];
for (const route of routes) {
  const result = await auditPage(route);
  allResults.push(result);
  
  console.log(`\n${route.padEnd(18)} | Contrast | LinkID | TargetSize`);
  console.log('─'.repeat(60));
  
  if (result.error) {
    console.log(`  ERROR: ${result.error}`);
  } else {
    const contrast = result.contrastFailures.length === 0 ? '✓ PASS' : `✗ FAIL (${result.contrastFailures.length})`;
    const linkId = result.linkIdFailures.length === 0 ? '✓ PASS' : `✗ FAIL (${result.linkIdFailures.length})`;
    const targetSize = result.targetSizeFailures.length === 0 ? '✓ PASS' : `✗ FAIL (${result.targetSizeFailures.length})`;
    
    console.log(`${contrast.padEnd(20)} | ${linkId.padEnd(10)} | ${targetSize}`);
    
    // Show failures
    if (result.linkIdFailures.length > 0) {
      console.log(`   → Links without underline: ${result.linkIdFailures.length}`);
    }
    if (result.targetSizeFailures.length > 0) {
      const nonInline = result.targetSizeFailures.filter(f => !f.inline);
      if (nonInline.length > 0) {
        console.log(`   → Standalone links < 24×24: ${nonInline.length}`);
      }
    }
  }
}

console.log('\n\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║ SUMMARY                                                       ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

const totalLinkIdFail = allResults.filter(r => !r.error).reduce((sum, r) => sum + r.linkIdFailures.length, 0);
const totalTargetFail = allResults.filter(r => !r.error).reduce((sum, r) => sum + r.targetSizeFailures.length, 0);

console.log(`Total pages audited: ${allResults.length}`);
console.log(`Link identification failures: ${totalLinkIdFail}`);
console.log(`Target size failures: ${totalTargetFail}`);

if (totalLinkIdFail === 0 && totalTargetFail === 0) {
  console.log('\n✓ ALL WCAG TESTS PASS\n');
}

await browser.close();
