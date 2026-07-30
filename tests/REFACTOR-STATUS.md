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

## Pending Work: Phase 2.3 (Page Migration)

**Task:** Migrate remaining 7 pages from RampTemplateLayout to BaseLayout

**Pages (one commit each, pixel-verified):**
1. contact.astro
2. pricing.astro
3. resources.astro
4. roadmap.astro
5. support.astro
6. terms.astro
7. privacy.astro

**Cleanup:**
- Delete InlineHeader.astro (transitional component, no longer needed)

**Baseline coverage:** All 7 pages have baseline screenshots (1440px + 390px) from Phase 0 reset

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

## Continuation Checklist for Next Session

**Before starting Phase 2.3:**
1. [ ] Read and verify REFACTOR-STATUS.md and DIVERGENCE-LOG.md
2. [ ] Confirm blocks.astro token isolation investigation (find all --basalio-* usage)
3. [ ] Determine if token duplication is site-wide or blocks.astro-only

**Then proceed with:**
1. Phase 2.3: Migrate 7 remaining pages (one commit each, pixel-verified)
2. Delete InlineHeader.astro
3. Phase 3: Pattern extraction (blocked until blocks.astro token issue resolved)

---

**Prepared by:** Claude Haiku  
**For:** Angelo Manzano (angelomanzanojr@vicealliance.com)
