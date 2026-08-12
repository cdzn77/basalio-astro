import { chromium } from 'playwright';
import { ALL_ROUTES, NOT_FOUND_PROBE } from './routes.js';

const PORT = process.env.PORT || 4321;
const ROUTES = ALL_ROUTES;
const VIEWPORTS = [320, 375, 414]; // Test across mobile-critical breakpoints
const MIN_TARGET_SIZE = 24; // WCAG 2.5.8 Level AA minimum

// APPROVED_INLINE_EXEMPTIONS — entries added here exempts candidates from failCount
// Format: { route, index, text } — route and index uniquely identify the element
// Only entries in this list are exempt. Empty list = no exemptions.
// Add entries ONLY after human review of Stage 1 candidate report.
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
      const elements = document.querySelectorAll('a, button');

      elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        let skipReason = null;

        // B3 FIX: Check display/visibility/area BEFORE offsetParent
        // This avoids skipping fixed-position visible elements
        const computed = window.getComputedStyle(el);

        if (computed.display === 'none') {
          skipReason = 'display: none';
        } else if (computed.visibility === 'hidden') {
          skipReason = 'visibility: hidden';
        } else if (rect.width === 0 || rect.height === 0) {
          skipReason = `zero area (width=${rect.width}, height=${rect.height})`;
        } else if (el.offsetParent === null && computed.position !== 'fixed' && computed.position !== 'sticky') {
          // B3 FIX: Exclude fixed/sticky from offsetParent skip
          skipReason = 'offsetParent === null (not in document flow)';
        } else if (el.disabled) {
          // B4 FIX: Clarify disabled is a coverage gap (element not measured in operable state)
          skipReason = 'disabled at page load — NOT MEASURED IN OPERABLE STATE';
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

        // B2 FIX: Three-condition structural inline candidate detection (removed line-height condition)
        // Stage 1 is permissive to avoid under-flagging; human review filters false positives
        let inlineCandidate = false;
        if (!pass && el.tagName.toLowerCase() === 'a') {
          const blockAncestor = el.closest('p, li, td, dd, blockquote');

          if (blockAncestor) {
            // Condition 1: ancestor exists (checked by closest)
            // Condition 2: ancestor contains external text
            const ancestorText = blockAncestor.textContent.trim();
            const targetText = el.textContent.trim();
            const hasExternalText = ancestorText.length > targetText.length;

            // Condition 3: target display is inline or inline-block
            const isInlineDisplay = computed.display === 'inline' || computed.display === 'inline-block';

            if (hasExternalText && isInlineDisplay) {
              inlineCandidate = true;
            }
          }
        }

        // B1 FIX: Candidates still push to targets with inlineCandidate flag
        // They count as failures unless matched in APPROVED_INLINE_EXEMPTIONS
        targets.push({
          type: el.tagName.toLowerCase(),
          index: idx,
          text: el.textContent.trim().slice(0, 30) || '(empty)',
          width: width, // B5 FIX: Full precision, no .toFixed() for display
          height: height,
          pass,
          inlineCandidate
        });
      });

      return { targets, skipped };
    }, MIN_TARGET_SIZE);

    return {
      route,
      viewport: viewportWidth,
      targets: results.targets,
      skipped: results.skipped,
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
  let totalInlineCandidatesExempted = 0;

  // Compute header dynamically from MIN_TARGET_SIZE constant
  const headerText = `WCAG 2.5.8 Target Size (Minimum), Level AA — >= ${MIN_TARGET_SIZE}x${MIN_TARGET_SIZE} CSS px`;

  console.log('\n' + '═'.repeat(72));
  console.log(headerText);
  console.log('═'.repeat(72) + '\n');

  console.log('STAGE 1: Structural inline candidates reported separately for manual review.');
  console.log('STAGE 2: Only entries in APPROVED_INLINE_EXEMPTIONS are exempted from failCount.\n');

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

        // Print failures
        if (result.failCount > 0) {
          result.targets.filter(t => !t.pass).forEach(t => {
            // B1 FIX: Check if candidate is in approved exemption list
            let isExempted = false;
            if (t.inlineCandidate) {
              const exempted = APPROVED_INLINE_EXEMPTIONS.find(
                e => e.route === route && e.index === t.index && e.text === t.text
              );
              isExempted = !!exempted;
              if (isExempted) {
                totalInlineCandidatesExempted++;
              } else {
                totalFailures++;
                totalInlineCandidates++;
              }
            } else {
              totalFailures++;
            }

            // B5 FIX: Print full precision (no .toFixed())
            const marker = isExempted ? '⊙' : '└';
            const exemptLabel = isExempted ? ' (EXEMPTED)' : '';
            console.log(`       ${marker}─ ${t.type}[${t.index}]: ${t.width}×${t.height}px "${t.text}"${exemptLabel}`);
          });
        }

        // Print skipped elements
        if (result.skipped.length > 0) {
          totalSkipped += result.skipped.length;
          result.skipped.forEach(s => {
            console.log(`       ⊘ ${s.type}[${s.index}]: skipped (${s.reason})`);
          });
        }
      }
    }
    console.log();
  }

  await browser.close();

  console.log('═'.repeat(72));
  console.log(`SUMMARY: ${ROUTES.length} routes × ${VIEWPORTS.length} viewports = ${ROUTES.length * VIEWPORTS.length} checks`);
  console.log(`Failures (unapproved): ${totalFailures}, Inline candidates (unapproved): ${totalInlineCandidates}, Exempted: ${totalInlineCandidatesExempted}, Skipped: ${totalSkipped}`);
  console.log('═'.repeat(72) + '\n');

  if (totalInlineCandidates > 0) {
    console.log(`⚠️  ${totalInlineCandidates} inline candidate(s) await human review and entry to APPROVED_INLINE_EXEMPTIONS.\n`);
  }

  process.exit(totalFailures > 0 ? 1 : 0);
}

main();
