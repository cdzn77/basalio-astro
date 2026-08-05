# DIVERGENCE LOG

## Hero-Lab Cascade Path Testing (2026-08-04)

### Root Cause of Concept M Promotion Failure

**/hero-lab uses page-scoped CSS and therefore tests a different cascade path than production.**

The lab page defines hero heading styles at page level:
```css
h1.hero-heading.hero-headline {
  font-size: clamp(36px, 4.5vw, 72px);
}
```

Production (/) uses global unscoped styles:
```css
.hero-heading {
  font-size: clamp(48px, 8vw, 96px);
}
```

**Cascade difference:**
- Lab: h1.hero-heading.hero-headline (specificity 0,2,1) at page level = wins
- Production: .hero-heading (specificity 0,1,0) globally = wins

Lab approval does not validate production behavior. This is why Concept M reached production without proper testing — the lab verified the wrong code path.

**Mitigation:**
- Added visible banner to /hero-lab warning of cascade path difference
- Process: variants approved in lab must be re-verified on / production route before shipping

---

## Astro Scoped CSS Scope Boundary Issue

### 2026-08-04: RampHero Typography Rules Never Applied to Slotted Content

**Issue:** Astro scoped CSS does not apply to slotted content that crosses scope boundaries.

**Root Cause:** The RampHero component defines scoped styles for `.hero-heading[data-astro-cid-c3taymar]`. When the h1 is passed as a slot to RampHero, it retains the **page's** astro-cid (e.g., `data-astro-cid-lcdefpme` on index.astro), not the component's astro-cid. The scoped selector requires an exact cid match, so the rule never applies.

**Impact:**
- Homepage hero headline rendered at 40px (global `h1 { font-size: 40px }`) throughout all work on this thread
- The "72px baseline" premise was fiction for the homepage
- /hero-lab appeared to validate the component but was actually relying on its own page-level override, masking the broken mechanism
- RampHero's typography rules (lines 251-260 and 368-376) were dead code on every page using the component

**Resolution:**
- Moved `.hero-heading` typography rules to global.css as unscoped class rules (specificity 0,1,0)
- Deleted dead scoped rules from RampHero.astro
- Measurement post-fix: Homepage now renders 48px @ mobile, 72px @ desktop as intended
- Hero-lab unchanged (its own page-level override still wins with higher specificity)

**Implication for Future Work:**
Component slots containing styled content must either:
1. Define styles globally (as done here)
2. Move styled content inside the component boundary (not as a slot)
3. Refactor RampHero to accept heading as a prop with internal rendering

**Commits:**
- 5062140: Move hero heading typography to global.css (unscoped)
- 0aac34a: Remove dead hero-heading typography rules from RampHero.astro

---

## B1 Implementation Findings (2026-08-04)

### Hero H1 Size: Documented vs Implemented

**Documentation (DESIGN-SYSTEM.md:239):** `clamp(48px, 8vw, 96px)`
**Implementation before B1.1:** `font-size: 72px` (fixed, no clamp)
**Source:** Inherited from Ramp template clone (initial component import)

**Impact:** Concept M attempted to "enlarge" the hero but shipped a 72px max — matching the existing template default, not the documented spec. This is why Concept M produced no enlargement: 72px is where the homepage was already rendering.

**Resolution (B1.1):** Updated to documented spec. Now renders 48px (mobile) → 96px (desktop) via responsive clamp.

---

## Astro Scoped CSS Pattern Finding (2026-08-04)

### Styles for Slotted Content Must Be Global

**Problem:** RampHero component defines scoped CSS for `.hero-heading[data-astro-cid-c3taymar]`. When the h1 is passed as a slot to RampHero, it retains the **page's** astro-cid, not the component's. Scoped selectors require exact cid match, so the rule never applies.

**Impact:** Homepage hero headline rendered at 40px (global h1 fallback) throughout all prior work. Component styles were dead code.

**Pattern:** Astro scoped CSS does not apply to slotted content that crosses scope boundaries. Solution: define styles globally (unscoped), not in component scope.

**Rule:** Styles for slotted content live in global.css. Component scoping cannot protect them.

---

## Concept M Status (2026-08-04)

**Decision:** Tested, not adopted.

**What was tried:** clamp(36px, 4.5vw, 72px) responsive headline + acid CTA button
**Why rejected:** Clamp max was 72px (same as baseline) — no actual enlargement
**Superseded by:** Adoption of documented clamp(48px, 8vw, 96px) scale

**Lab variant:** Left intact in hero-lab.astro for future reference. Page-scoped rule does not interfere with production (which uses global spec).

---

## Hero Baseline Established — Reduced-Motion Method (2026-08-04)

### New Deterministic Baseline

**File:** `baseline-hero-section-2026-08-04.png` (289 KB)
**Capture config:** 1440×900 fixed viewport, fullPage: false, deviceScaleFactor 1
**Context:** `browser.newContext({ reducedMotion: 'reduce' })`
**Determinism:** 0% variance across 5 consecutive captures (bit-identical)
**Date:** 2026-08-04 23:18 UTC

**Method:** Purpose-captured fixed-viewport, NOT cropped from full-page. Exercises shipped code path: reduced-motion suppresses video, renders deterministic poster.

**Prior baseline invalidation:**
- `baseline-index.png` (2026-07-31): Full-page snapshot predating video feature (commit 3d5f720, 2026-08-04). Invalid for hero region diffs.

**Noise floor:** 0.0000% (practical floor: zero variance under reduced-motion)

**Implication:** Hero region is diffable under reduced-motion. **Video motion is out of scope for pixel-diff; must be verified visually.**

---

## Pixel-Diff Invalidations (2026-08-04)

**Four void diffs this session:**

1. **45.67%** (D3.4) — Resized 1280×5165 capture to 1440×4812 baseline. Rescaling measures the resize, not the change. Void.

2. **Dimension mismatch** (D3.5) — Full-page diff (1440×4812 vs 1440×5196). Layout height increased 384px due to enlarged headline. Translation dominates pixel diff; measurement is invalid for layout-changing edits.

3. **99.98%** (D3.6) — Cropped 1440×4812 full-page baseline to 1440×900 hero. Two invalidating causes: baseline predates video hero (2026-07-31 vs 2026-08-04), and crop-of-full-page is not a fixed-viewport baseline. Void.

4. **37-60% variance** (G2) — Noise floor test with Node API revealed hero region non-deterministic. Video or other animated element renders differently across captures. Baseline cannot be established without reducing motion.

**Cause analysis:** Pixel-diff was attempted without understanding baseline provenance, capture method, or viewport configuration. Five consecutive captures beat one lucky capture.

**Lesson:** Baseline lineage matters. Purpose-captured ≠ cropped. Full-page ≠ fixed-viewport. Determinism must be established before noise floor is set.

---

## Commit Message Correction Outstanding (2026-08-04)

### d01a3ba: "Enlarged headline" title contradicts change

**Commit:** d01a3ba (2026-08-04) — "Apply Concept M styling to homepage: enlarged headline with clamp(36px, 4.5vw, 72px) and acid CTA button variant"

**Issue:** The commit title claims "enlarged headline" but the clamp(36px, 4.5vw, 72px) produced:
- 40px → 36px at 375px viewport (reduction)
- 40px → 36px at 768px viewport (reduction)
- 40px → 57.6px at 1280px viewport (enlargement)
- 40px → 72px at 1920px viewport (enlargement)

Net effect: size reduction below 1600px. Title is misleading.

**Status:** Not amended (would require `git push --force`). Correction logged here for the record. If amendment is needed, user approval required.

**Corrected message should be:** "Apply Concept M to homepage: clamp(36px, 4.5vw, 72px) responsive headline and acid CTA"

---

## Acid CTA Button Adoption (Independent of Concept M)

### 2026-08-04: Homepage Hero CTA Changed to buttonVariant="acid"

**Context:** The acid CTA button entered as part of Concept M (rejected feature). Initial evaluation recommended reverting it per M-DEAD. Re-evaluated independently.

**Decision:** ADOPTED (kept).

**Rationale:**
- Visual merit: #EDFF10 (acid) on #1C1917 (ink) = ~16:1 contrast, exceeds WCAG AAA
- Token compliance: Acid fill on dark surface is an explicit permitted use case in design system
- Readability: Highest-contrast element on the page; unambiguous primary action
- Provenance does not override merit: good changes that arrived in bad commits remain good changes

**Measurement:** 
- Homepage hero heading: 48px (mobile) → 72px (desktop) via global `.hero-heading` class
- CTA button: yellow (#EDFF10) with dark text (#1C1917)
- Both verified 2026-08-04, post-mechanism fix

**Note:** This decision is independent of Concept M status. The acid CTA is adopted on its own merits.

---

## Invalid Pixel-Diff Attempt (2026-08-04)

### Problem: Resized Capture Invalidates Comparison

A new pixel-diff script (scripts/pixel-diff.mjs) was authored that:
1. Captured homepage at 1280px viewport (mismatch vs. 1440px baseline)
2. Resized the 1280×5165 capture to match baseline dimensions (1440×4812)
3. Reported 45.67% diff against the 0.0140% noise floor

**Why this is invalid:**
- Resizing a screenshot measures the rescale, not the actual change
- 45.67% is meaningless and void
- The script circumvented the established Playwright harness (visual-regression.spec.ts)
- Two diff instruments with different configs cause baseline rot

**Correct approach:**
- Pixel-diff must use the established harness at its own capture config (1440px, full-page)
- Homepage full-page height increased from 4812px → 5196px due to enlarged headline
- Dimension mismatch prevents baseline comparison
- This is expected behavior, not an error

**Resolution:**
- scripts/pixel-diff.mjs marked as DEPRECATED
- No pixel-diff percentage recorded
- Real change (48/72px headline) documented via direct measurements and screenshots

**Lesson:** Different measurement instruments produce incomparable results. Stick to one established harness for all diffs.

### Full-Page Diff Invalid for Layout-Shifting Changes

**Finding:** Full-page screenshot comparison is the wrong instrument for any change that alters vertical flow (content height).

**Why:** When layout height changes, every pixel below the shift is translated vertically. A pixel-diff comparison measures this translation as "different" even though the actual change is only at the shift point. The diff becomes dominated by translation noise, not by the intended change.

**Example — This Change:**
- Baseline full-page: 1440×4812 px
- Current full-page: 1440×5196 px
- Height delta: +384 px (due to enlarged 40px → 72px headline)

A full-page diff would report high percentage difference (mostly translation). This is not actionable.

**Correct Approach:**
- Use fixed-viewport region capture (1440×900, fullPage: false) for the changed region only
- Hero region diff for this change: 1440×900 px
- Fixed height prevents translation noise
- 0.0140% noise floor is valid only for height-stable captures

**Rule for Future:** Layout-height-changing edits (headline size, added sections, removed content) are verified by fixed-viewport region diff, not full-page. Document the height delta as the measured effect.

---

## Color Token Updates

### 2026-07-31: Acid Yellow Token Adjusted

**Change:** `--acid: #DFFF00 → #EDFF10`

**Scope:** Site-wide accent color affecting:
- Hero backgrounds (homepage)
- Button backgrounds (acid variant)
- Pricing card accents
- Demo container borders
- All secondary UI elements using `var(--acid)`

**Contrast Ratios** (verified, all pass):
- `--text-on-acid` (--surface-ink @ normal): 15.75:1 ✓
- `--text-on-acid-muted` (--surface-ink @ 70%): 6.19:1 ✓
- `--border-on-acid` (--surface-ink @ 50%): 3.29:1 ✓

**Standing Rule:** Acid is never text on light surface (would be 1.11:1, fails WCAG)

**Affected Pages:**
- / (homepage): Hero background, button accents
- /pricing: Card highlights, CTA buttons
- /hacks: Demo containers, button accents
- /blocks: Demo box borders
- All: Footer accent elements, secondary UI

**Visual Impact:** Intended real diff. Acid yellow is slightly warmer (more yellow, less green tint) — #EDFF10 vs #DFFF00.

**Aliases Updated:**
- `--color-acid: #EDFF10` (orphaned, not in active use)
- `--color-yellow: #EDFF10` (orphaned, not in active use)
- Comment on line 47 updated for documentation

**Verification:**
- ✅ Zero #DFFF00 hardcoded hex values remain
- ✅ All opacity-derived values auto-update from token
- ✅ Build passes, 10 pages generated
- ✅ Screenshots show new color across all pages

**Baseline:** Updated. All future diffs measured against #EDFF10 as canonical acid.

---

## Format

Each entry documents a color, spacing, or design token change that creates a site-wide visual divergence. Include:
- Token name and old → new value
- Scope (which pages/components affected)
- Contrast ratio verification (if applicable)
- Visual impact description
- Verification steps taken
- Baseline note (if resetting baseline)
