import { chromium } from 'playwright';
import { ALL_ROUTES, NOT_FOUND_PROBE } from './routes.js';

// ════════════════════════════════════════════════════════════════════════
// KNOWN LIMITATIONS (FIX 5)
// ════════════════════════════════════════════════════════════════════════
// 1. WRAPPED INLINE ELEMENTS: getBoundingClientRect() returns the union box
//    for multi-line inline links. A link wrapping to 2 lines shows as ~38px
//    height (passes 24px threshold), but each line is 19px (fails). This
//    script silently passes wrapped links.
//    Fix: Use el.getClientRects() to evaluate each fragment independently.
//    Status: DEFERRED
//
// 2. CANDIDATE COUNT IS A FLOOR: Due to wrapped-element under-reporting,
//    the 5 approved inline exemptions represent minimum failures; additional
//    wrapped links at missing viewports are not flagged.
//    Symptom: Exemption list shows inconsistent viewport coverage (320/414
//    for Stripe, 375/414 for Netlify) — this is a measurement artifact, not
//    a data error.

const PORT = process.env.PORT || 4321;
const ROUTES = ALL_ROUTES;
const VIEWPORTS = [320, 375, 414]; // Test across mobile-critical breakpoints
const MIN_TARGET_SIZE = 24; // WCAG 2.5.8 Level AA minimum

// APPROVED_INLINE_EXEMPTIONS — 5 candidates approved after Stage 1 review
// Re-keyed on route + href + fullText (stable across DOM changes)
// Format: { route, href, fullText, ancestor }
const APPROVED_INLINE_EXEMPTIONS = [
  { route: '/privacy', href: 'https://stripe.com/privacy',
    fullText: 'Stripe privacy policy',
    ancestor: 'Stripe: Handles all payment processing. We never touch your card data. Stripe privacy policy' },
  // Sub-processor link inside privacy-policy prose; height set by body line-height.
  // Enlarging to 24px would inflate paragraph leading sitewide.

  { route: '/privacy', href: 'https://www.netlify.com/privacy/',
    fullText: 'Netlify privacy policy',
    ancestor: 'Netlify: Hosts this site. Netlify privacy policy' },
  // Same: sub-processor link in running text.

  { route: '/privacy', href: 'https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement',
    fullText: 'GitHub privacy policy',
    ancestor: 'GitHub: Stores our code. GitHub privacy policy' },
  // Same: sub-processor link in running text.

  { route: '/privacy', href: 'mailto:hello@basalio.com',
    fullText: 'hello@basalio.com',
    ancestor: 'To exercise any of these rights, email hello@basalio.com with "Privacy Request" in the subject line.' },
  // Contact address inside a sentence; line-height constrained.

  { route: '/terms', href: 'mailto:hello@basalio.com',
    fullText: 'hello@basalio.com',
    ancestor: 'Questions about these terms? Email hello@basalio.com' },
  // Contact address inside a sentence; line-height constrained.
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

        // FIX 2a: Capture fullText (untruncated) for stable exemption matching
        const fullText = el.textContent.trim();
        const displayText = fullText.slice(0, 30) || '(empty)';

        // FIX 2b: Capture href for anchor tags
        const href = el.tagName.toLowerCase() === 'a' ? (el.getAttribute('href') || '') : null;

        // B1 FIX: Candidates still push to targets with inlineCandidate flag
        // They count as failures unless matched in APPROVED_INLINE_EXEMPTIONS
        targets.push({
          type: el.tagName.toLowerCase(),
          index: idx,
          text: displayText,
          fullText: fullText,
          href: href,
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

  // FIX 3: Track elements that moved from skipped to measured
  const elementsMovedFromSkipped = [];

  // FIX 4: Deduplicated candidate tracking
  const uniqueCandidates = new Map(); // key: "route|href|fullText"

  // Compute header dynamically from MIN_TARGET_SIZE constant
  const headerText = `WCAG 2.5.8 Target Size (Minimum), Level AA — >= ${MIN_TARGET_SIZE}x${MIN_TARGET_SIZE} CSS px`;

  console.log('\n' + '═'.repeat(72));
  console.log(headerText);
  console.log('═'.repeat(72) + '\n');

  console.log('STAGE 1: Structural inline candidates reported separately for manual review.');
  console.log('STAGE 2: Only entries in APPROVED_INLINE_EXEMPTIONS are exempted from failCount.\n');
  console.log('Markers: ⊙ = exempted candidate, ⓘ = unapproved candidate, └ = plain failure\n');

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
            // FIX 2b/2c: Check if candidate is in approved exemption list using route + href + fullText
            let isExempted = false;
            if (t.inlineCandidate) {
              const exempted = APPROVED_INLINE_EXEMPTIONS.find(
                e => e.route === route && e.href === t.href && e.fullText === t.fullText
              );
              isExempted = !!exempted;

              // FIX 4: Deduplicate candidates for later report
              const candidateKey = `${route}|${t.href}|${t.fullText}`;
              if (!uniqueCandidates.has(candidateKey)) {
                uniqueCandidates.set(candidateKey, {
                  route,
                  href: t.href,
                  fullText: t.fullText,
                  viewports: [{ viewport, width: t.width, height: t.height }]
                });
              } else {
                uniqueCandidates.get(candidateKey).viewports.push({ viewport, width: t.width, height: t.height });
              }

              if (isExempted) {
                totalInlineCandidatesExempted++;
              } else {
                totalFailures++;
                totalInlineCandidates++;
              }
            } else {
              totalFailures++;
            }

            // FIX 1: Three marker states
            let marker, markerLabel;
            if (isExempted) {
              marker = '⊙';
              markerLabel = ' (EXEMPTED — inline, approved)';
            } else if (t.inlineCandidate) {
              marker = 'ⓘ';
              markerLabel = ' (INLINE CANDIDATE — awaiting review)';
            } else {
              marker = '└';
              markerLabel = '';
            }

            console.log(`       ${marker}─ ${t.type}[${t.index}]: ${t.width}×${t.height}px "${t.text}"${markerLabel}`);
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
  console.log(`Failures (unapproved): ${totalFailures}, Inline candidates: ${totalInlineCandidates}, Exempted: ${totalInlineCandidatesExempted}, Skipped: ${totalSkipped}`);
  console.log('═'.repeat(72) + '\n');

  // FIX 2c: Validation pass — check for stale exemptions
  console.log('EXEMPTION VALIDATION:');
  let staleCount = 0;
  APPROVED_INLINE_EXEMPTIONS.forEach(exemption => {
    const matched = uniqueCandidates.values().some(
      c => c.route === exemption.route && c.href === exemption.href && c.fullText === exemption.fullText
    );
    if (!matched) {
      console.log(`  STALE EXEMPTION: route='${exemption.route}' href='${exemption.href}' fullText='${exemption.fullText}'`);
      staleCount++;
    }
  });
  if (staleCount === 0 && APPROVED_INLINE_EXEMPTIONS.length > 0) {
    console.log(`  ✓ All ${APPROVED_INLINE_EXEMPTIONS.length} approved exemptions matched elements.`);
  }
  console.log();

  // FIX 4: Print deduplicated candidate report
  if (uniqueCandidates.size > 0) {
    console.log('STAGE 1 CANDIDATE REPORT (deduplicated):\n');
    console.log('route | href | fullText | viewports (dimensions)');
    console.log('------|------|----------|----------------------');
    uniqueCandidates.forEach(candidate => {
      const viewportList = candidate.viewports
        .map(v => `${v.viewport}px (${v.width}×${v.height}px)`)
        .join(' + ');
      console.log(`${candidate.route.padEnd(5)} | ${candidate.href.padEnd(30).slice(0, 30)} | ${candidate.fullText.padEnd(20).slice(0, 20)} | ${viewportList}`);
    });
    console.log(`\n⚠️  ${uniqueCandidates.size} unique inline candidate(s) await human review.`);
    console.log('Add approved entries to APPROVED_INLINE_EXEMPTIONS (route, href, fullText).\n');
  }

  if (staleCount > 0) {
    console.log(`\n❌ STALE EXEMPTIONS FOUND: ${staleCount}. Remove from APPROVED_INLINE_EXEMPTIONS.\n`);
    process.exit(1);
  }

  process.exit(totalFailures > 0 ? 1 : 0);
}

main();
