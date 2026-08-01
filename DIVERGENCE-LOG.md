# DIVERGENCE LOG

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
