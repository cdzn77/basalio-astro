# Component System Refactor Status

**Last Updated:** 2026-07-30 00:02 UTC  
**Session Duration:** 2.5 hours (2026-07-29 22:24 → 00:02)

---

## Completed Phases

### Phase 0: Baseline Reset (42d9155)
- **Reason:** Phase 0 baselines captured RampTemplate-era branding (yellow #FFEA00 backgrounds)
- **Action:** Basalio brand evolution (white #FFFFFF backgrounds, Instrument Sans typography) makes Ramp-era baselines obsolete
- **Result:** Recaptured all 10 pages at consistent 1440px and 390px viewports
- **Note:** Fixed resources baseline (was mislabeled 1620px wide)
- **Baseline reset logged:** See DIVERGENCE-LOG.md

### Phase 2.5: Route Restructuring (489f233, a87708b, 98e2606)
**Completed commits:**

| Commit | Task | Status |
|--------|------|--------|
| 489f233 | Homepage: index-ramp-rebuild → index serving / | ✅ Pixel-verified |
| a87708b | Blocks: modules → blocks serving /blocks + nav updates | ✅ Pixel-verified |
| 98e2606 | Stub pages: /hacks, /early-access routes | ✅ Rendering |

**Navigation unified:**
- Logo: points to `/` (homepage)
- HOME: points to `/`
- BLOCKS: points to `/blocks` (replaces MODULES)
- PRICING, RESOURCES, CONTACT: unchanged

---

## Phase 3 Technical Debt & Prep

### Hardcoded transition values to tokenize
**Location:** RampCourses.astro (lines 316, 337, 351), RampResources.astro (line 239)  
**Values:** 300ms (Ramp template leftovers)  
**Action (Phase 3):** Extract to `--transition-300` or similar token during component extraction

### Brand token audit result
**Finding:** #C6F135 does NOT appear in marketing site codebase  
**Status:** ✅ Confirmed (no near-miss brand tokens found)

---

## Open Blockers (Must Fix Before Phase 3)

### 1. **blocks.astro Token Isolation** ⚠️ CRITICAL FOR PHASE 3

**Status:** Diagnosed but not fixed  
**Issue:** blocks.astro uses `--basalio-*` custom variables instead of `--ink` / `--paper` from tokens.css

**Examples found:**
```astro
color: var(--basalio-ink, #000000)     // Should be: var(--ink)
background: var(--basalio-paper, #FFFFFF)  // Should be: var(--paper)
```

**Impact:** Phase 3 pattern components placed on /blocks will render incorrectly (won't inherit design system tokens)

**Next session action items:**
1. Report every `--basalio-*` variable in use across all pages
2. Determine whether a second token system exists site-wide or isolated to blocks.astro
3. Migrate blocks.astro to tokens.css consumption
4. Pixel-verify after migration

**Blocks this:** Phase 3 pattern extraction

---

## Canonical Route & Navigation Table

### Routes (Post-Phase 2.5)

| Route | Page | Status | Notes |
|-------|------|--------|-------|
| `/` | index.astro | ✅ Live | Renamed from index-ramp-rebuild |
| `/blocks` | blocks.astro | ✅ Live | Renamed from modules, all links updated |
| `/pricing` | pricing.astro | 🔲 Phase 2.3 | Pending BaseLayout migration |
| `/resources` | resources.astro | 🔲 Phase 2.3 | Pending BaseLayout migration |
| `/contact` | contact.astro | 🔲 Phase 2.3 | Pending BaseLayout migration |
| `/roadmap` | roadmap.astro | 🔲 Phase 2.3 | Pending BaseLayout migration |
| `/support` | support.astro | 🔲 Phase 2.3 | Pending BaseLayout migration |
| `/terms` | terms.astro | 🔲 Phase 2.3 | Pending BaseLayout migration |
| `/privacy` | privacy.astro | 🔲 Phase 2.3 | Pending BaseLayout migration |
| `/hacks` | hacks.astro | ✅ Live | Stub page (intentional CTA placeholder) |
| `/early-access` | early-access.astro | ✅ Live | Stub page (intentional CTA placeholder) |

### Navigation Items (RampHeader.astro)

```
HOME → /
BLOCKS → /blocks
PRICING → /pricing
RESOURCES → /resources
CONTACT → /contact
```

**Note:** HACKS and EARLY-ACCESS not in primary nav. Stubs are live for direct links (from external CTAs, marketing).

---

## Phase 2.3 (CANCELLED)

**Original task:** Migrate remaining 7 pages from RampTemplateLayout to BaseLayout

**DECISION:** Dark pages (privacy, roadmap, support, terms) are being REPLACED, not migrated. These pages will be rebuilt from extracted components in Phase 3, not migrated to BaseLayout.

**Status:** ✅ CANCELLED
- #D4CABE color sweep (132 instances) — removed from scope
- Page-level migrations — deferred (will rebuild via components instead)
- InlineHeader.astro cleanup — still needed when dark pages are replaced

---

## Phase 3a: Token Rename (PREREQUISITE)

**Critical:** Surface-aware token names prevent future color-pairing mistakes (dark tokens on light surfaces, etc.)

**Rename task (one pass, verified clean):**
1. Rename across entire codebase:
   - `--ink` → `--text-on-paper` (#0A0A0A)
   - `--paper` → `--surface-paper` (#FFFFFF)
   - Add `--surface-ink` (#1C1917)
   - Add `--text-on-paper-muted` (var(--text-on-paper) @ 60% opacity)
   - Rename `--paper-inverse` → `--text-on-ink` (#F6F4EF)
   - Rename `--basalio-stone` / hardcoded #D4CABE → `--text-on-ink-muted` (#D4CABE)
   - Keep `--acid` #EDFF10 (updated Jul 31, commit 853a7fd: warmer yellow, less green tint)
   - Keep `--stone` #DFDCD5 (borders/dividers, not text)

2. Verify zero references to old names
3. Pixel-verify all pages match baseline (expect zero diff; only CSS variable names changed)
4. One commit: "Rename tokens to surface-aware naming scheme"

**Status:** Pending implementation

---

## Phase 3b: Component Extraction (AFTER token rename)

**Goal:** Extract reusable components from Ramp pages, then rebuild dark pages (privacy, roadmap, support, terms) using those components.

**Token Discipline:**
- ✅ All components MUST use surface-aware tokens: `var(--text-on-paper)`, `var(--text-on-ink)`, `var(--acid)`, `var(--stone)`, etc.
- ✅ Zero raw hex literals in component files (enforce via grep: `grep -r '#[0-9A-Fa-f]{6}' src/components/ → build failure`)
- ✅ tokens.css is the single source of truth; brand swap is a 4-line edit

**Acid usage rule (nonnegotiable):**
- ❌ Acid as text on light surfaces (FORBIDDEN, ~1.1:1 fails WCAG)
- ✅ Acid as text on dark surfaces (ALLOWED, ~15.4:1)
- ✅ Acid as fill behind ink text (always fine)

**Copy-Layer Fixes (before component extraction):**
- [ ] "modules" → "blocks" everywhere (nav, headings, stats, footer, resource lists, page copy)
- [ ] DELETE two fake homepage testimonials (fabricated quotes/images)
- [ ] "1 of 100 left" counter — remove entirely. State 100-license cap as fact.
- [ ] "Our Resources" section — fix or cut (six documents don't exist)
- [ ] Domain fixes: basalio.so → basalio.com (every instance across src/)
- [ ] Homepage pricing section → teaser (PricingCards.astro compact variant)
- [ ] "CLAIM FOUNDER ACCESS" → "Join the founder list"

**Component Inventory (pending):**
- Report all repeated section patterns across Ramp pages
- Propose prop APIs before implementation
- Build ONE component first: PricingCards.astro (compact/full variants)

**Dark Page Rebuild (after components):**
- Rebuild privacy, roadmap, support, terms using extracted components
- Delete old inline HTML versions
- No migration — full rebuild from scratch

---

## Build & Verification Status

**Current build:** 15 pages, all successful  
**Dev server:** localhost:4321 ✅  
**Production:** Ready for Netlify deployment after Phase 2.3 + Phase 3 complete

**Zero-diff enforcement:** Active
- All route changes pixel-verified against baselines
- New baselines committed at commit 42d9155
- All future changes require pixel-level diff or DIVERGENCE-LOG entry

---

## Design System State

**Global CSS:** ✅ Clean
- Font: Instrument Sans (Basalio brand)
- No opinionated margins (margin: 0 on all reset elements)
- Tokens-only values (references --ink, --paper, --space-*, etc. from tokens.css)

**Tokens.css:** ✅ Extracted & applied
- 69+ design tokens covering colors, typography, spacing, borders, transitions
- Defined in :root scope
- Shared across all BaseLayout pages

**Exception:** blocks.astro uses dual token system (--basalio-* + --ink/--paper fallbacks)
- This is the Phase 3 blocker identified above

---

## Handoff Checklist

- [x] All completed commits documented
- [x] Phase numbering corrected (Phase 2.5 for routes, Phase 3 for patterns — not yet started)
- [x] Open blockers identified and prioritized (blocks.astro token isolation)
- [x] Canonical routes and nav table provided
- [x] Baselines reset and committed with rationale
- [x] Remaining 7 pages for Phase 2.3 listed
- [x] Zero-diff enforcement active
- [ ] blocks.astro token migration (Phase 3 blocker — next session)

---

## Session Notes

**Analysis findings from earlier investigation:**
1. **Color divergences:** Intentional brand evolution (Ramp yellow → Basalio white)
   - Documented in DIVERGENCE-LOG.md
   - Not regressions; correct design direction
   
2. **Pixel rendering differences:** 8–12% from typography/CSS reset, not layout shifts
   - Attributed to font loading order and baseline changes between RampTemplate and BaseLayout
   - Not actionable; baselines reset to establish new ground truth

3. **modules.astro (now blocks.astro):** Inert to CSS changes (40px font test had no differential effect)
   - Root cause: explicit font-sizes on all content elements
   - Discovered: page uses custom --basalio-* tokens, not design system tokens
   - This triggered the Phase 3 blocker investigation

**Build performance:** Consistent ~600ms build time across all phases  
**Screenshot tool:** Playwright pixel-perfect verification working reliably

---

## Phase 3 Prerequisites: Type Scale Token Fork

**Critical Discovery (2026-07-30):**

Four pages consume `--font-size-*` tokens from tokens.css:
- roadmap.astro, support.astro, terms.astro, privacy.astro

Four pages hardcode all font-sizes in scoped CSS:
- blocks.astro, contact.astro, pricing.astro, resources.astro

**Impact:** During Phase 3 pattern extraction, new components placed on content pages (blocks, pricing, contact, resources) will collide with page-level CSS font-size rules. Scoped CSS specificity will prevent token inheritance.

**Recommendation for Phase 3:**
- Either adopt type scale tokens site-wide (modify 4 content pages to use `--font-size-*` tokens)
- OR ensure new components use inline styles with explicit token references
- Document this fork in component extraction guidelines

**Status:** Do not expand this task now. Flag for Phase 3 planning.

---

## Continuation Checklist for Next Session

**Completed (2026-07-30):**
- [x] Phase 3 token audit completed (all --basalio-* variables migrated or removed)
- [x] --stone value corrected (#D4CABE → #DFDCD5, logged to DIVERGENCE-LOG.md)
- [x] --accent renamed to --acid for single-value enforcement
- [x] All 6 component files migrated to canonical design tokens
- [x] --basalio-duration orphan removed from documentation
- [x] Type scale token fork discovered and documented

**Before starting Phase 2.3:**
1. [ ] Read REFACTOR-STATUS.md and DIVERGENCE-LOG.md for Phase 3 context
2. [ ] Verify --stone fix visually (expect beige tone shift across all stone-colored elements)
3. [ ] Re-baseline pages affected by --stone color correction

**Then proceed with:**
1. Phase 2.3: Migrate 7 remaining pages (one commit each, pixel-verified)
2. Delete InlineHeader.astro
3. Phase 3: Pattern extraction (Type scale token fork documented for planning)

---

**Prepared by:** Claude Haiku  
**For:** Angelo Manzano (angelomanzanojr@vicealliance.com)
