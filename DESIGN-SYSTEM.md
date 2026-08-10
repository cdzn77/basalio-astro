# Basalio Design System — Decisions Document

This document records design decisions and their rationale. All token VALUES live in `src/styles/tokens.css`. This document explains the "why" behind the decisions.

---

## Decision 1: Token Consolidation — Remove 24 orphan tokens

**Decision:** Audit found 69 orphan tokens in tokens.css (24 truly unused, 45 with 1–2 references). Remove the 24 with zero usage.

**Rationale:** During the August 2026 audit, token usage was inventoried. A set of orphan color tokens exist with no markup references. Keeping them creates maintenance debt and makes future audits harder. The 45 tokens with 1–2 references stay; low usage doesn't mean low value — some may be reserved for upcoming work.

**Color tokens**: Retain all orphan color tokens despite low usage. Colors carry semantic meaning and may be deliberate reserves for accent/theme flexibility. Removal of colors is deferred.

**Action:** Grep src/ for `class="token-name"` attributes. Only remove if zero matches. (Scoped Astro CSS complicates grep; use build verification.)

**Status:** DECISION PENDING IMPLEMENTATION. Await cleanup commit.

---

## Decision 2: Font-Weight System — Add tokens for 300, 400, 500, 600, 700

**Decision:** Add five font-weight tokens to tokens.css:
- `--font-weight-light: 300`
- `--font-weight-normal: 400`
- `--font-weight-medium: 500`
- `--font-weight-semibold: 600`
- `--font-weight-bold: 700`

**Rationale:** Audit found all font-weight values hardcoded across components: 300 (1 use), 400 (84 uses), 500 (8 uses), 600 (30 uses), 700 (11 uses). No tokens exist. Tokenization:
- Centralizes weight decisions in one place
- Allows tuning of emphasis hierarchy
- Supports brand voice consistency across components

**Critical distinction:** The `@font-face` weight-range declaration (`font-weight: 400 700;` in font imports) is font metadata and remains untouched in global.css. These tokens are for element-level styling only (`font-weight: var(--font-weight-bold)`), not for @font-face ranges.

**Current hardcoded usage**: 400 (84), 500 (8), 600 (30), 700 (11), 300 (1).

**Action:** Add to tokens.css, then migrate components in separate commits per file.

**Status:** DECISION PENDING IMPLEMENTATION.

---

## Decision 3: Heading Letter-Spacing — Adopt -0.02em single ratio

**Decision:** Replace all hardcoded `-0.8px` heading letter-spacing with a single `--heading-letter-spacing: -0.02em` token.

**Rationale:** Audit found 11 sites with hardcoded `-0.8px` applied to headings of 5 different sizes (20, 24, 28, 32, 40px). This produces inconsistent ratios: -0.020em at 40px, -0.040em at 20px. No documented rule exists.

Standardizing on `-0.02em` creates a unified tracking ratio across all heading sizes. At 40px it's already `-0.02em` (no change); at 20px it loosens from -0.040em to -0.020em (visual delta +0.2px per character, sub-perceptual). Largest delta at 20px: +0.4px absolute (within measurement noise).

**Sites affected**: WhoItsFor.astro, FAQ.astro, BlocksCarousel.astro, StatusLedger.astro, HeaderSplit.astro, index.astro (×2), pricing.astro (×2), roadmap.astro, support.astro.

**Action:** Add `--heading-letter-spacing: -0.02em` to tokens.css. Migrate each component in separate commits.

**Status:** DECISION PENDING IMPLEMENTATION. Verify at 20px headings post-deployment for perceptual impact.

---

## Decision 4: Spacing Scale Consolidation — Consolidate --gap-* and --space-* 

**Decision:** Audit found two parallel spacing scales:
- `--gap-*` (4 working references, all in 404.astro)
- `--space-*` (5 working references, global.css + pages)

Consolidate to single `--space-*` scale. Migrate 404.astro's gap tokens to --space equivalents.

**Rationale:** Two nearly identical scales with similar usage counts indicate unintentional duplication. Both serve the same semantic purpose (responsive spacing). Consolidation:
- Reduces cognitive load for future developers
- Prevents scale drift (if one evolves, the other won't)
- Centralizes spacing decisions in one place

**Action:** Migrate 404.astro 4 uses from --gap-* to --space-* equivalents. Delete orphaned --gap-* token definitions.

**Status:** DECISION PENDING IMPLEMENTATION.

---

## Decision 5: Dead CSS Files — Delete layout.css, utilities.css, animations.css

**Decision:** Three CSS files are never imported and contain 27+ undefined token references. Delete them.

**Files to delete:**
- `src/styles/layout.css` (292 lines, never imported)
- `src/styles/utilities.css` (265 lines, never imported)
- `src/styles/animations.css` (undefined, referenced only in orphan tokens)

**Rationale:** Build audit verified these files have zero grep matches in import statements. They contain:
- Dead CSS rules that never render
- Undefined token references (--space-sm, --line-height-relaxed, etc.)
- Legacy patterns from earlier design iterations

Deletion removes code burden without functional impact.

**Verification:** Run `npm run build` after deletion. Confirm no "undefined variable" errors in build output.

**Action:** Delete files. Verify build succeeds. Commit.

**Status:** DECISION PENDING IMPLEMENTATION.

---

## Decision 6: HeaderSplit Body Override — Document, don't change

**Decision:** HeaderSplit component deliberately overrides body paragraph font-size from 18px (global default) to 14px at `max-width: 640px`.

**Rule:** `@media (max-width: 640px) { .body p { font-size: 14px; line-height: 20px; } }`

**Rationale:** This is a component-level responsive decision, not drift. It creates a 4px body scale fragmentation at mobile viewports (14px in HeaderSplit, default 18px elsewhere). No rationale is documented in the code; this is a DECISION NEEDING REVIEW.

**Question for Angelo:** Is this fragmentation intentional? Options:
1. Keep as-is (component makes its own call)
2. Remove override, use site body standard everywhere (18px at all viewports)
3. Apply site-wide to all mobile pages (generalize the rule)

**Action:** DEFERRED. Awaiting design intent clarification before any change.

**Status:** DOCUMENTED, AWAITING DECISION.

---

## Deferred — DO NOT ACT THIS SESSION

### 1. Max-Width Divergence (1786px vs 1791px vs 1792px)

Hero uses `1791px` (3 instances). Pages use `1786px` (8 instances). blocks.astro:469 uses `1792px` (1 instance).

Consolidating 1791→1786 and 1792→1786 would tighten content width by 5–6px at ultra-wide viewports (1920px+).

**Status:** DEFERRED. Measure impact on Hero at 1920px before consolidating. Affects live containers; requires visual verification.

### 2. Component Max-Width Inventory (18 values)

Audit identified 18 static `max-width` declarations on component wrappers (sizing constraints, not responsive breakpoints):
- Live components: 554px, 800px, 1020px, 1200px, 1400px
- Demo/internal: 300px, 365px, 450px, 480px, 500px

**Status:** DEFERRED. Review during DESIGN-SYSTEM.md phase if component-level sizing would benefit from tokenization. Not urgent; these are intentional sizing choices, not system drift.

---

## Implementation Order

1. Decision 5: Delete dead CSS files (animations.css, layout.css, utilities.css) — FIRST
   - After deletion, re-run orphan count (tokens used only in dead code become orphaned)
   - Update Decision 1 with corrected orphan list before proceeding
2. Decision 1: Remove orphan tokens (after true orphan count verified)
3. Decision 2: Font-weight tokens (enables component updates)
4. Decision 3: Heading letter-spacing token (11 component updates)
5. Decision 4: Spacing scale consolidation (5 references)
6. Decision 6: Awaiting screenshot review and decision

---

## Audit References

All findings sourced from August 2026 comprehensive audit:
- **Token inventory:** DS1 audit, verified via grep src/ for class= attributes
- **Font-weight gap:** DS2 reconciliation, usage counts from EB2 migration
- **Heading tracking:** BS3c analysis, -0.02em ratio calculation
- **Spacing scales:** DS4 reconciliation, reference count verification
- **Dead CSS:** Dead code discovery via import scanning
- **HeaderSplit override:** BS4a body scale fragmentation finding

See HANDOFF.md for full audit trail.
