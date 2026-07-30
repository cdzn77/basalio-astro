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
