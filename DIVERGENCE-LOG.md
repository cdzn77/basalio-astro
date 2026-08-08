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

## Session Summary

- **EB2:** Body copy 16px → 18px (1 commit, verified 104/104)
- **Dead files:** components.css & responsive.css deleted (1 commit, verified 104/104)
- **14px audit:** Confirmed intentional, no conversion needed
- **Net result:** Cleaner CSS architecture, correct font hierarchy, zero regressions
