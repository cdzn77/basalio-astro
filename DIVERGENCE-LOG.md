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
