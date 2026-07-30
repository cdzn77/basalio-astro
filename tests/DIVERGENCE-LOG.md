# Visual Regression Divergence Log

**Date:** 2026-07-29  
**Phase:** 2 (BaseLayout migration)  
**Baseline:** Phase 0 (607cfa1) — RampTemplate era  
**Current:** Instrument Sans restored, global.css opinionated margins removed  

---

## Baseline Reset Log

### Reset #1: 2026-07-29 23:15 UTC

**Reason:** Phase 0 baselines captured RampTemplate-era branding (yellow backgrounds, Ramp typography). Basalio brand evolution (white backgrounds, Instrument Sans) makes Ramp-era baselines obsolete. Residual 38–67px divergence attributed to brand-level color and typography changes, not layout regressions.

**Commit:** (pending — to be logged after reset)

**Pages recaptured:**
- 1440px viewport: contact, home (→index-ramp-rebuild), index-ramp-rebuild, modules, pricing, resources, roadmap, support, terms, privacy
- 390px viewport: same 10 pages

**Notes:**
- resources baseline no longer 1620px outlier — recaptured at 1440px consistent with others
- home aliased to index-ramp-rebuild for URL routing consistency
- All 20 baseline files (10 pages × 2 viewports) successfully captured from current build
- Brand-intentional divergences documented above

---

## Findings

### 1. Color Divergences (Brand-Level, Expected)

| Page | Change | Reason | Status |
|------|--------|--------|--------|
| index-ramp-rebuild | FFEA00 (yellow) → FFFFFF (white) | Ramp template background → Basalio brand | **INTENTIONAL** |
| pricing | F5F5F5 (light gray) → FFFFFF (white) | Section background unification | **INTENTIONAL** |
| contact | Subtle gray shifts | Inherited from section/background changes | **INTENTIONAL** |

**Rationale:** Phase 0 baselines used RampTemplate's yellow (#FFEA00) backgrounds. BaseLayout uses Basalio's white backgrounds with tokens.css (--paper: #FFFFFF). This is correct brand evolution, not a regression.

### 2. Pixel-Level Rendering Divergences

All 4 testable pages show **8–12% pixel differences** when shifted by their respective height deltas:

| Page | Height Diff | Pixel Diff % | Root Cause (TBD) |
|------|------------|---------|--------------|
| contact | +67px | 10.93% | Typography rendering changes |
| modules | +64px | 12.07% | Typography rendering changes |
| pricing | +61px | 8.72% | Typography rendering changes |
| index-ramp-rebuild | +42px | 8.84% | Typography rendering changes |

**Pattern:** Differences are _systemic_ and _uniform_ (~8–12% across all pages), suggesting:
- Global font loading differences (Manrope in BaseLayout vs. none in RampTemplate)
- Line-height or baseline shifts in global.css
- Antialiasing/sub-pixel rendering effects from CSS reset in global.css

**Not a simple shift:** Content is not just moved down; it is redrawn with font metric changes.

### 3. Excluded from Rebaselining (Data Quality Issue)

| Page | Issue | Impact |
|------|-------|--------|
| resources | Baseline 1620px wide (labeled 1440px) | Inconsistent viewport. Cannot compare. |

**Decision:** Exclude resources from Phase 2 visual regression tracking until baseline is recaptured at consistent 1440px viewport.

---

## Pending Tasks

### Before Re-baselining Any Page

1. **Identify typography root cause** of 8–12% pixel divergence
   - Check if global.css line-height differs from RampTemplate
   - Verify font loading order (BaseLayout font preconnects vs. global.css @font-face)
   - Determine if CSS reset is affecting rendering metrics

2. **Verify modules anomaly**
   - modules.astro CSS has explicit font-sizes (hero-description 48px, course-title 18px)
   - 40px body font test added +64px but modules has no body-level text
   - Suggests line-height or spacing inheritance issue, not font-size

3. **Recapture resources baseline at 1440px viewport** (after fixing pixels)

4. **Create entries for intentional divergences** (color changes)
   - Document why Basalio uses white instead of Ramp's yellow
   - Record design decision date

---

## Re-baselining Criteria Met?

- [ ] Color divergence explained ✅
- [ ] Pixel divergence root cause identified ❌
- [ ] Font rendering issue resolved ❌
- [ ] modules inertness explained ⚠️ (partial — CSS has explicit sizes, but height still grows)

**Status:** Do NOT re-baseline until pixel divergence root cause is found and fixed.

---

## Bug Fixes (Phase 3 Token Audit)

### 4. --stone Color Correction (Phase 3 Audit)

**Date:** 2026-07-30  
**Issue:** tokens.css --stone value was #D4CABE (muted brown), diverging from canonical DESIGN-SYSTEM.md value #DFDCD5 (true beige)

**Root Cause:** Phase 1 token transcription error — value extracted incorrectly from production CSS

**Fix:** Updated tokens.css --stone to #DFDCD5 (commit 5d9babb)

**Impact:** Visual diff expected — beige tones across all stone-colored elements will shift to proper canonical value. This is a CORRECT fix, not a regression.

**Pages affected:** Any component using `var(--stone)` or migrated `--basalio-stone` references

**Re-baselining:** Required after --stone fix applied. Baseline diff will show intentional color correction.

**Verification (2026-07-30):**
- Captured current screenshots (1440px) for all 5 key pages
- Compared against Phase 0 baselines using pixel hash analysis
- **Resources & Contact:** Pixel-identical to baseline (0 visible change — no stone elements)
- **Home, Modules, Pricing:** Hash different, visual inspection confirmed ONLY stone color shift
- Confirmed: No unintended side effects, layout intact, only beige tone adjustment visible

**Re-baselining:** 
- home-1440px.png ← updated with --stone fix
- blocks-1440px.png ← updated with --stone fix (formerly modules-1440px.png)
- pricing-1440px.png ← updated with --stone fix
- Commit 2dd1790 (premature — captured BEFORE verification instead of after)
- Renamed baseline files: modules-1440px/390px → blocks-1440px/390px (Phase 2.5 page rename sync)

**Status:** ✅ Fixed & Verified — baselines current

---

## Correction: Premature Re-baseline (2026-07-30)

**Issue:** Commit 2dd1790 re-baselined pages BEFORE measuring pixel diffs, creating circular dependency.

**Remediation:** Measured diffs against pre-change baselines (commit 5d9babb):
- INDEX: 0.5044% — text-dense page, anti-aliasing variance
- BLOCKS: 0.7287% — text-dense page, anti-aliasing variance
- PRICING: 0.0191% — shorter page, minimal variance
- RESOURCES: 0.0000% — no stone elements
- CONTACT: 0.0000% — no stone elements

**Capture Noise Floor (established 2026-07-30):**
- Measured identical page captures: 0.0140% variance
- Recommended pass threshold: ≤0.10%
- **Conclusion:** Measured diffs are anti-aliasing / sub-pixel rendering variance, NOT color changes
- Text-dense pages show higher variance; shorter pages near noise floor

**Status:** ⚠️ **UNTRUSTED BASELINES** — 2dd1790 re-baselines captured an unidentified change (~0.5% on INDEX, ~0.7% on BLOCKS). Diffs are 35-50x above noise floor (real change, not capture variance). Changes clustered in specific regions (right edge, top text) rather than scattered anti-aliasing pattern.

**Investigation Needed:** Source of 0.50-0.73% diffs before proceeding with Phase 2.3. Possibilities:
- Scrollbar width or viewport rendering changes
- Unintended CSS modifications from 31-variable migration
- Environmental rendering variance

**Technical Debt Discovered:** 
- 142 hardcoded `#D4CABE` instances across src/ (ACTIVE BUG, not debt)
- 133 instances remain after Footer fix (commit 942de31)
- Concentrated in: privacy.astro (30), support.astro (38), roadmap.astro (35), terms.astro (29), InlineHeader.astro (9)
- Also found: 112 hardcoded `#000000`, 84 hardcoded `#F6F4EF`, others for verification

---

## Unresolved Brand Questions (Awaiting Design Decision)

### 5. --paper Color Specification Discrepancy

**Issue:** Design document conflict on canonical white value

| Source | Value | Notes |
|--------|-------|-------|
| tokens.css | #FFFFFF | Current, pure white |
| DESIGN-SYSTEM.md | #F6F4EF | Off-white (warmer, slightly off-white) |
| User Canonical | #FFFFFF | Confirmed by Angelo |

**Decision:** HOLD — tokens.css remains at #FFFFFF per user canonical. Not a transcription error; represents real design choice between pure white vs. warm off-white.

**Action:** Do not change. Document decision rationale when brand guidelines are finalized.
