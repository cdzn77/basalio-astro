import { chromium } from 'playwright';
import { ALL_ROUTES, NOT_FOUND_PROBE } from './routes.js';

const PORT = process.env.PORT || 4321;
const ROUTES = ALL_ROUTES;
const VIEWPORTS = [320, 375, 414]; // Test across mobile-critical breakpoints
const MIN_TARGET_SIZE = 24; // WCAG 2.5.8 Level AA minimum

// STAGE 2 — Approved inline candidates (structural + content checks passed, manually reviewed)
// Format: { route, selector, text } with one-sentence justification per entry
// Do not add entries to this list without explicit human review.
const APPROVED_INLINE_EXEMPTIONS = [
  // (None yet — awaiting Stage 1 candidate report and manual review)
];

async function verifyTouchTargets(browser, route, viewportWidth) {
  const page = await browser.newPage();

  try {
    await page.setViewportSize({ width: viewportWidth, height: 667 });
    const response = await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle'
    });

    if (route === NOT_FOUND_PROBE) {
      const status = response.status();
      if (status !== 404) {
        throw new Error(
          `404 handler probe returned HTTP ${status}, expected 404.`
        );
      }
    }

    const results = await page.evaluate((minSize) => {
      const targets = [];
      const skipped = [];
      const inlineCandidates = [];
      const elements = document.querySelectorAll('a, button');

      elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();

        // BLOCKER C: Detailed skip tracking
        let skipReason = null;

        if (el.offsetParent === null) {
          skipReason = 'offsetParent === null (not in document flow)';
        } else if (window.getComputedStyle(el).visibility === 'hidden') {
          skipReason = 'visibility: hidden';
        } else if (window.getComputedStyle(el).display === 'none') {
          skipReason = 'display: none';
        } else if (rect.width === 0 || rect.height === 0) {
          skipReason = 'zero area (width=' + rect.width + ', height=' + rect.height + ')';
        } else if (el.disabled) {
          skipReason = 'disabled attribute';
        }

        if (skipReason) {
          skipped.push({
            index: idx,
            type: el.tagName.toLowerCase(),
            text: el.textContent.trim().slice(0, 40),
            reason: skipReason
          });
          return;
        }

        const width = rect.width;
        const height = rect.height;
        const pass = width >= minSize && height >= minSize;

        // BLOCKER B STAGE 1: Structural candidate detection for inline links
        // A target is an INLINE CANDIDATE only if ALL conditions hold:
        if (!pass && el.tagName.toLowerCase() === 'a') {
          const computed = window.getComputedStyle(el);
          const blockAncestor = el.closest('p, li, td, dd, blockquote');

          if (blockAncestor) {
            // Check if the block ancestor contains non-whitespace text outside the target
            const ancestorText = blockAncestor.textContent.trim();
            const targetText = el.textContent.trim();
            const hasExternalText = ancestorText.length > targetText.length;

            // Check if target display is inline or inline-block
            const isInlineDisplay = computed.display === 'inline' || computed.display === 'inline-block';

            // Check if height is within 2px of line-height
            const lineHeight = parseFloat(computed.lineHeight);
            const heightWithinRange = Math.abs(height - lineHeight) <= 2;

            if (hasExternalText && isInlineDisplay && heightWithinRange) {
              inlineCandidates.push({
                index: idx,
                type: el.tagName.toLowerCase(),
                text: targetText,
                width: width.toFixed(2),
                height: height.toFixed(2),
                ancestorTag: blockAncestor.tagName.toLowerCase(),
                lineHeight: lineHeight.toFixed(2),
                reason: 'Structural inline candidate (line-constrained)'
              });
              return;
            }
          }
        }

        targets.push({
          type: el.tagName.toLowerCase(),
          index: idx,
          text: el.textContent.trim().slice(0, 30) || '(empty)',
          width: width.toFixed(2),
          height: height.toFixed(2),
          pass
        });
      });

      return { targets, skipped, inlineCandidates };
    }, MIN_TARGET_SIZE);

    return {
      route,
      viewport: viewportWidth,
      targets: results.targets,
      skipped: results.skipped,
      inlineCandidates: results.inlineCandidates,
      passCount: results.targets.filter(t => t.pass).length,
      failCount: results.targets.filter(t => !t.pass).length
    };
  } catch (error) {
    return {
      route,
      viewport: viewportWidth,
      error: error.message
    };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const allResults = [];
  let totalFailures = 0;
  let totalSkipped = 0;
  let totalInlineCandidates = 0;

  // Compute header dynamically from MIN_TARGET_SIZE constant
  const headerText = `WCAG 2.5.8 Target Size (Minimum), Level AA — >= ${MIN_TARGET_SIZE}x${MIN_TARGET_SIZE} CSS px`;

  console.log('\n' + '═'.repeat(72));
  console.log(headerText);
  console.log('═'.repeat(72) + '\n');

  // Note: WCAG 2.5.8 section 4(a) includes Spacing and Equivalent exceptions.
  // Stage 1: Structural inline candidates reported separately for manual review.
  // Stage 2: Only approved entries in APPROVED_INLINE_EXEMPTIONS are exempted.

  for (const route of ROUTES) {
    console.log(`Route: ${route}`);

    for (const viewport of VIEWPORTS) {
      const result = await verifyTouchTargets(browser, route, viewport);
      allResults.push(result);

      if (result.error) {
        totalFailures++;
        console.log(`  ${viewport}px: ERROR: ${result.error}`);
      } else {
        const status = result.failCount === 0 ? '✅' : `❌ (${result.failCount} small)`;
        console.log(`  ${viewport}px: ${status} ${result.passCount} pass, ${result.failCount} undersized, ${result.skipped.length} skipped`);

        if (result.failCount > 0) {
          totalFailures += result.failCount;
          result.targets.filter(t => !t.pass).forEach(t => {
            console.log(`       └─ ${t.type}[${t.index}]: ${t.width}×${t.height}px "${t.text}"`);
          });
        }

        if (result.skipped.length > 0) {
          totalSkipped += result.skipped.length;
          result.skipped.forEach(s => {
            console.log(`       ⊘ ${s.type}[${s.index}]: skipped (${s.reason})`);
          });
        }

        if (result.inlineCandidates.length > 0) {
          totalInlineCandidates += result.inlineCandidates.length;
          result.inlineCandidates.forEach(c => {
            console.log(`       ⓘ ${c.type}[${c.index}]: ${c.width}×${c.height}px in <${c.ancestorTag}> (line-height: ${c.lineHeight}px) — ${c.reason}`);
          });
        }
      }
    }
    console.log();
  }

  await browser.close();

  console.log('═'.repeat(72));
  console.log(`SUMMARY: ${ROUTES.length} routes × ${VIEWPORTS.length} viewports = ${ROUTES.length * VIEWPORTS.length} checks`);
  console.log(`Failures: ${totalFailures}, Skipped: ${totalSkipped}, Inline candidates (Stage 1): ${totalInlineCandidates}`);
  console.log('═'.repeat(72) + '\n');

  if (totalInlineCandidates > 0) {
    console.log('⚠️ Inline candidates found. Review above, then add approved entries to APPROVED_INLINE_EXEMPTIONS.\n');
  }

  process.exit(totalFailures > 0 ? 1 : 0);
}

main();
