# Divergence Log — Basalio Mobile System Pass

## Critical Finding: Dead Stylesheets Misled Session

**Date:** 2026-08-08
**Impact:** 557 lines of CSS read as authoritative but never applied

### The Problem

`src/styles/components.css` (292 lines) and `src/styles/responsive.css` (265 lines) exist in the codebase but are never imported anywhere. During this session:

1. Both Claude and the developer cited values from these files as if they were live
2. ED2 and EG2 commits were evaluated against rules in components.css
3. Measurements were attempted against selectors that only existed in dead files
4. Neither file is loaded by the browser—their rules have zero effect on rendered pages

### Verification Method

**Empirical test (not grep-inferred):**
- Distinctive selector from components.css: `.hero > div > p:last-of-type { font-size: clamp(16px, 2.5vw, 20px); }`
- Distinctive selector from components.css: `nav { backdrop-filter: blur(14px); position: fixed; }`
- Browser rendered: `nav` has `backdrop-filter: none`, `position: static`, `z-index: auto`
- Conclusion: **The file is not loaded.**

### Why They Were Missed

1. `grep` found "font-size: 16px" in both files → mistaken for "imported"
2. No Astro glob imports in config
3. No explicit `@import` statements in active CSS files
4. Files were in src/styles/ directory (looked authoritative)
5. Both had historical commits (ED2, EG2) that appeared to modify them

### Standing Rule

Before citing any CSS file as the source of a rendered value:
1. Confirm it is imported: `grep "@import\|import.*css" src/layouts/ src/pages/ src/styles/`
2. Verify a distinctive selector actually applies: render page, read computed style, check browser DevTools
3. Grep alone is insufficient—file existence ≠ file is loaded

### Resolution

Commit 231354d: Deleted both files. All 104/104 overflow checks pass post-deletion. Screenshots identical. No regression.

---

## Design Finding: 14px Prose Is Intentional, Not Drift

**Context:** EB2 upgraded body copy from 16px → 18px (--font-size-body token).
**Audit result:** 18 prose elements at 14px across 9 routes, 6 classes.

### Classification

**Intentional hierarchy (DO NOT CONVERT):**
1. **Constrained card copy:**
   - `.block-description` — 280px card width on 375px viewport, ~2 lines
   - `.teaser` — pricing card descriptions, 1-2 lines
   - `.resource-description` — 285px resource card, constrained
   
   **Reasoning:** Small prose inside fixed-width cards is a legitimate visual hierarchy choice. Enlarging to 18px would force 3+ lines and break card layouts.

2. **Secondary content:**
   - `.footer-description` — footer tagline, 14pt by convention
   - `.ledger-item-note` — pricing feature list, 14px for secondary info

   **Reasoning:** Footer and secondary content uses smaller type across web design. Not an oversight.

### Body Copy (Converted)

- Homepage and page body paragraphs: 18px via `p { font-size: var(--font-size-body); }`
- Hero descriptions: 18px
- Contrast confirmed: 18px body text now visually larger than 14px card captions

### Future Pass

Do not "fix" 14px prose in future passes. The 4px delta between body (18px) and card copy (14px) is the design system working as intended.

---

## Known Debt: Carousel Viewport min-height Band-Aids

**Date:** 2026-08-08 (FF1 commit 627b15b)
**Root Cause:** `.carousel-viewport { height: auto }` with `position: absolute` track children collapse to 0px because absolute children don't contribute to parent height.

**Current Band-Aid (FF1 fix):**
```css
.carousel-viewport {
  height: auto;
  min-height: 308px;  /* BlocksCarousel */
}

.carousel-viewport-v2 {
  height: auto;
  min-height: 503px;  /* WhoItsFor */
}
```

**Problem:** These hardcoded values match the current card heights. If card content changes (longer titles, different image aspect ratios), the carousel collapses again.

**Real Solution:** Remove `position: absolute` from `.carousel-track` and use `position: relative` at mobile. This allows the track to contribute natural height to the viewport, eliminating the need for hardcoded min-height values. The `transform: translateX()` animation works identically with `position: relative`.

**Why not applied yet:** Refactoring track positioning requires testing transform-based pagination across all breakpoints. Deferred to future pass.

**Incident:** Earlier BD1.2 mistakenly reported "cardsRendered: true" based on card count alone, missing the 0px viewport height. Added to verification debt: carousel visibility checks must assert `viewport.offsetHeight > 0` and `card.getBoundingClientRect().height > 0`, not just card count.

---

## Incident: Component Fixes Only Applied to One Axis (2026-08-09)

**Date:** 2026-08-09
**Impact:** Two separate fixes shipped broken on the untested axis

### Example 1: Carousel Responsive Sizing
- **What shipped:** Desktop carousel made responsive (JS-computed card width)
- **What broke:** Mobile kept hardcoded 335px derived from 375px baseline
- **Where found:** Live on iPhone 17 Pro Max at 440px viewport
- **Damage:** Card label clipped ("Ca"/"Te" instead of full text) — exact bug spent 9 commits fixing at desktop
- **Root cause:** Desktop and mobile use separate CSS media queries; when one axis gets a responsive fix, the other remains hardcoded by default

### Example 2: Surface Theming
- **What shipped:** data-surface corrected on /blocks page
- **What broke:** Homepage regression nearly missed (would have broken hero surface colors)
- **Where nearly found:** Late-stage screenshot review caught it
- **Root cause:** Component used across multiple pages; fix on one page requires re-testing others

### Pattern

Two-axis components (mobile/desktop, multiple pages, light/dark theme) are highest risk for split fixes. A fix shipped to one axis while the other remains in the old state is **not** regression-free.

### Standing Rule

**When a component has separate treatment on multiple axes (mobile vs desktop, multiple pages, theme variants), ANY FIX requires re-measuring ALL axes before shipping.**

This rule applies even when:
- The fix appears atomic (change one function, one CSS variable)
- One axis was the stated focus ("this is the mobile pass")
- The other axis appears untouched ("desktop wasn't changed")
- Testing passed on the changed axis

**Why:** "Desktop unchanged" or "mobile unchanged" is a claim to verify, not an assumption. A responsive formula or CSS variable works identically on both axes only if both are wired to use it. Silent hardcodes (fixed widths, positions, sizes) only surface under actual rendering on the untested axis.

### Verification Checklist

Before shipping a fix to a dual-axis component:
1. [ ] Implement fix on stated axis
2. [ ] Measure stated axis at all relevant viewports
3. [ ] **Explicitly verify the OTHER axis** — take screenshots or measurements at representative sizes
4. [ ] Confirm both axes use the same formula/variable, or both have independent fixes
5. [ ] Run full 104/104 overflow check

---

## Incident: Text Content Bug Missed by Geometric Verification (2026-08-09)

**Date:** 2026-08-09
**Bug ID:** GB1

### What Happened

All 9 block cards rendered "[object Module]" as visible text on the live homepage. Root cause: `import.meta.glob()` with `as: 'raw'` option returned module objects instead of raw SVG strings. When rendered via `set:html={import}`, the object stringified to "[object Module]" in the DOM.

### Why Verification Missed It

The fix was verified using:
- Build status ✓
- Overflow checks (104/104) ✓
- Screenshot review (visual appearance) ✓

None of these caught the bug because:
- Build passed (code syntax correct, imports valid)
- Overflow checks only measure scroll width, not text content
- Screenshots showed yellow cards with black icons (visual appearance correct), but DOM contained "[object Module]" text below the visual frame or overlaid by CSS

The bug was **invisible in screenshots** — it appeared as DOM text but was hidden by `color: transparent` or positioned off-screen in the visual composition.

### Verification Debt

Current verification skips text content entirely. Before shipping:
- Screenshots catch visual regressions
- Overflow checks catch layout overflows
- Type-checking catches syntax errors
- **But text rendering bugs are only caught by reading rendered text content**

### Standing Rule

When shipping text-containing components, include at least one of:
1. DOM text content audit (grep/DOM query for expected strings, screenshot OCR of visible text)
2. Playwright `page.innerText` assertion (verify expected strings appear in rendered content)
3. Visual inspection of full-page screenshots at representative viewports (zoom in to read text)

For inline SVG or icon rendering, verify that the rendered output is NOT a stringified JavaScript object (`[object Module]`, `[object Object]`, etc.).

---

## Session Summary (2026-08-08 to 2026-08-09)

### Previous Session (2026-08-08)
- **EB2:** Body copy 16px → 18px (1 commit, verified 104/104)
- **Dead files:** components.css & responsive.css deleted (1 commit, verified 104/104)
- **14px audit:** Confirmed intentional, no conversion needed
- **FF1:** Carousel height collapse fixed with min-height band-aids (commit 627b15b, verified 104/104)
- **FH2:** JS-calculated card width replaces fixed 500px (commit 02f7dc9, verified 104/104)

### Current Session (2026-08-09)
- **GB1:** Fixed "[object Module]" rendering in BlocksCarousel icons (commit 10ee712)
  - Root cause: import.meta.glob 'as: raw' returned module objects, not SVG strings
  - Fix: Changed to 'as: url', updated rendering to img tag with CSS styling
  - Impact: Text content bug invisible to geometric verification (overflow checks, screenshots)
  - Lesson: Add text content audits to verification checklist

- **GB2:** Implemented responsive mobile carousel sizing (commit 99c9f37)
  - Formula: containerWidth = viewport - 40px, cardWidth = container - 55px peek
  - Results: 280px (375) → 295px (390) → 319px (414) → 345px (440)
  - Fixed card label clipping bug (was showing "Te"/"Ca", now shows full text at 440px)
  - Verified 104/104 overflow checks, both carousels, all viewports
  - Lesson: Dual-axis fixes require re-testing BOTH axes before shipping; "unchanged" is a claim to verify

### Net Result
- Cleaner CSS architecture with responsive variables
- Correct carousel sizing across all mobile viewports
- Text rendering bugs and dual-axis fixes identified as systematic verification gaps
- Standing rules added for multi-axis components and text content verification
