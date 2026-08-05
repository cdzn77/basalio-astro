# DIVERGENCE LOG

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
