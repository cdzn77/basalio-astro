# Basalio Responsive & Performance Complete — Handoff (2026-08-07)

**Session context:** 2026-08-07. Header glow & divider list fixes COMPLETE and MERGED to main. **DEPLOYING** to production (basalio.com) — commit e193834. Previous production: commit 83159a3, 2026-08-06 22:54 UTC.

**Checkout consolidation:** Three stale checkouts of this repo existed on disk (`~/Projects/products/basalio/marketing-site`, `~/Projects/themes/ramp-astro-template`). Both contained zero unpushed commits; all work was on origin. Both archived to `~/_archive` with remotes removed to prevent accidental pushes from a stale checkout (the actual failure mode we hit this session). **Canonical checkout: `~/basalio-astro` only.** Never work from a second checkout of this repo.

---

## SESSION 2026-08-07 — Header Glow & Divider List (Merged to main)

### CO1 — Header Tint with Surface-Aware Gating
- ✅ **Frosted glass effect:** rgba(255, 255, 255, 0.85) + backdrop-filter: blur(8px)
- ✅ **Paper-only gating:** Applied only when data-surface="paper"; transparent over ink (video hero)
- ✅ **Implementation:** Sync data-surface from .header-container to .base-header via IntersectionObserver callback
- ✅ **Verification:** 
  - CP1.1 (scrollY=0, ink hero): computed backgroundColor = `rgba(0, 0, 0, 0)` ✓
  - CP1.2 (scrollY=1200px, paper): computed backgroundColor = `rgba(255, 255, 255, 0.85)` ✓
  - Wordmark contrast: 21:1 (WCAG AA+)
- **Fixes:** CJ1 acid pricing card glow (smudge artifact when scrolled)

### CO2 — Divider List Mobile Stacking
- ✅ **Below 640px:** flex-direction: column, gap: 24px (was row, gap: 40px)
- ✅ **Full-width items:** .divider-item inherits container width with padding
- ✅ **Tested at:** 375px, 390px, 414px viewports
- ✅ **Verification:** All three viewports show stacked layout in viewport
- **Fixes:** CJ2 cramped three-column layout at mobile (gap exceeded half column width at 77px)

### CO3 — LAB Banner Overlap Fix (/hero-lab only)
- ✅ **Banner repositioned:** top: 0 → top: 80px (below fixed header)
- ✅ **z-index adjusted:** 9999 → 50 (header z-index 100 > banner 50)
- ✅ **Body padding:** 48px → 128px (80px header + 48px banner)
- ✅ **Verification:** Header fully visible at top, banner below, no overlap
- **Fixes:** CM4 LAB banner covering wordmark (z-stacking collision)

### Final Verification
- ✅ **Overflow checks:** npm run verify:overflow → 104/104 pass
- ✅ **No regressions:** scrollWidth ≤ innerWidth at all 13 routes × 8 viewports

### Commits Merged to main
- b74b4e9 CO1: Implement header tint with surface-aware gating
- c006e84 CO2: Stack divider list vertically below 640px
- e193834 CO3: Fix LAB banner overlap with header on /hero-lab
- c06237e Update HANDOFF.md with session progress

### Production Deployment
- **Status:** Merged to main, Netlify auto-deploy in progress
- **Production site:** https://basalio.com (public; Cloudflare challenges bare curl with 401 — this is a bot filter, not auth. Use browser user-agent or check in browser. A 401 from curl does not indicate outage.)
- **Commit:** e193834 queued for deployment
- **Verification:** Check Netlify dashboard for deployment status

---

## SESSION 2026-08-06 — COMPLETE

### Responsive Design (AG–AH)
- ✅ **WCAG 1.4.10 Compliance:** 104/104 checks pass at 8 viewports (320, 360, 375, 390, 414, 768, 1024, 1440)
- ✅ **Hero heading fix:** Breakpoint extended to 374px to cover WCAG reflow band (321–374px)
- ✅ **HeaderSplit containment:** Max-width constraint added at 374px breakpoint

### Header Surface Theming (AG–AJ)
- ✅ **Observer implementation:** IntersectionObserver tracks sections with data-surface attribute; updates header in real-time
- ✅ **No-JS fallback:** Markup defaults to `data-surface="paper"`, base .brand-logo has color: black
- ✅ **Acid variant removed:** Dead code; all 11 pages now use paper default (observer overrides to ink)
- ✅ **Hero-lab fixed:** Added data-surface="ink" to hero-h and hero-j sections; wordmark now legible at scroll 0
- ✅ **All routes audited:** /blocks (9 sections), /404 (1 section) corrected

### Production Performance (AK–AL–AQ)

**Page weight on / (measured, cache disabled):**
  - Before WebP: 1026KB / 16 requests
  - After WebP: ~640KB (386KB reduction = 37.6% improvement)
  - **Unaffected by orphaned assets** — orphans were never downloaded by visitors

**Build artifact size (dist/):**
  - Before cleanup: 8.2MB (includes all 13 routes + all public/assets/)
  - After AQ3: 2.3MB (5.9MB orphaned assets removed)
  - **Cost:** repo size, build time, deploy time — NOT visitor downloads

**Completed optimizations:**
- ✅ **Pixel baseline:** 5/5 deterministic captures (hash: 38c616ab, 0 byte variance)
- ✅ **Image optimization (AO):** Persona images PNG→WebP (434KB→38.2KB, 91% savings); verified at 375px & 1440px
- ✅ **Build hygiene (AQ3):** Removed 5.9MB unreferenced videos (grid-reveal 1.8M, case-study 2.1M) and PNG icons (smartwatch 1.7M, wireframe 394K, illustration 32K)

### Image Optimization (AO) — 2026-08-06
- ✅ **Persona WebP conversion:** uxui (98KB→8.4K), videographer (107KB→10K), director (97KB→10K), agency (122KB→9.8K)
- ✅ **Visual fidelity:** Verified side-by-side at native (420×320) and mobile (280×210); no quality loss detected
- ✅ **Markup updated:** src/data/whoitsfor.ts references changed from .png to .webp
- ✅ **PNG cleanup:** Original persona PNGs deleted; orphaned WebP files deployed
- ✅ **Verified rendering:** Homepage and /blocks pages load images correctly at 375px and 1440px
- ⚠️ **Estimated savings:** 386KB persona image reduction (4.8% of 8.2MB total); videos (4.4MB) remain primary optimization target

### Previous Session (2026-08-05)
- ✅ **Font loading:** FIXED. Self-hosted variable WOFF2 in `public/fonts/` (71 KB: Instrument Sans + Azeret Mono)
- ✅ **Switzer, IBM Plex Mono, Manrope:** Removed (malformed @font-face purged)
- ✅ **Branch:** session/hero-cascade-fix-2026-08-04 (6 commits MM5 phases, NOT merged to main)

---

## STATE OF THE SITE (2026-08-06)

### Status: BRANCH READY — Not Merged

**Current:** session/hero-cascade-fix-2026-08-04 (57771d7, pushed to GitHub)
**Production:** main@b64b9a8 (2026-08-02) — still has fallback fonts, broken 404, mobile overflow, invisible header, aria-label issue

**Branch passes all critical paths:**
- Responsive design: ✅ WCAG 1.4.10 compliance (104/104)
- Header theming: ✅ Observer + no-JS fallback
- Font loading: ✅ Self-hosted WOFF2 (71KB, ready to ship)
- Performance: ✅ 1026KB production weight
- Pixel baseline: ✅ 5/5 deterministic

**Next phase (image optimization):**
- 431KB images are second-largest category (42% of total)
- No oversizing detected, but compression/format opportunities exist
- Baseline established for measurement

### DEPRECATED: Previous Responsive Issues

### 375px Mobile: HORIZONTAL OVERFLOW + CAROUSEL COLLAPSE (CRITICAL)

**Issue 1: .what-we-do → .column-right does not stack**
- **Symptom:** 322px horizontal scroll on 375px viewport
- **Root cause:** `.column-right` width: 697px (fixed or forced; TBD)
- **Evidence:** scrollWidth 697 vs innerWidth 375 (measured S1620)
- **Status:** NOT a grid issue; NOT HeaderSplit; confirmed separate section
- **Fix location:** src/pages/[...marketing].astro or global CSS rule forcing width

**Issue 2: Carousel viewport collapses to 0px below 620px**
- **Symptom:** Both carousels (.modules-carousel, .testimonials-carousel) render arrows but no cards. Cards ARE in DOM at left: 560/1080/1600px, clipped.
- **Root cause:** `.courses-right { flex: 1 1 0%; display: block; }` — flex: 1 1 0% zeroes container width when parent is flex but child is display: block. Threshold resolves at 620px (not 640px).
- **Evidence:** Measured S1620 (binary search: 520–620px range); no console errors; 0px scrollWidth below threshold.
- **Fix location:** src/components/RampHero.astro line ~XX (flex-direction or .courses-right display rule)
- **NOT a JS issue** — no console errors; cards not hidden; viewport genuinely 0px wide.

**Issue 3: 9 inconsistent breakpoints (360/480/540/640/768/782/900/1024)**
- **Status:** No unified system; breakpoints accumulated organically
- **Problem:** Difficult to predict behavior at new viewports; 900px is load-bearing (sticky footer reveal gated on it, broken twice)
- **Proposal:** Consolidate to 375 (baseline, not a breakpoint), 640 (tablet), 768 (iPad), 1024 (desktop), 1280 (large)
- **Risk:** 900px is currently used; removal may break sticky footer reveal logic

---

## GIT STATE

### Canonical Checkout
```
/Users/angelomanzanojr/basalio-astro
├── Current branch: session/hero-cascade-fix-2026-08-04
├── Remote: GitHub (linked to Netlify auto-deploy)
└── Status: Pushed (no unpushed commits after final handoff)
```

### Main Branch Status
- **Commit:** b64b9a8 (2026-08-02)
- **Behind:** Session branch now 53 commits ahead (font fix + diagnostics)
- **Production issues:** 404 redirect bug (fixed locally, waiting for PR merge)
- **Font fix status:** Deployed to session branch; ready for merge after responsive fixes complete

### Other Checkouts (STALE, DO NOT USE)
- `/Users/angelomanzanojr/Projects/products/basalio/marketing-site` — divergent fork
- `ramp-astro-template` (if exists) — reference only

### WIP Branches
- **wip/courses-refactor-2026-07-22:** DO NOT merge (design divergence)

---

## BUILD HYGIENE (AQ3) — OPEN, Non-Blocking

### ✅ AQ3 — 5.9MB Orphaned Assets Removed

**Audit confirmed unreferenced assets:**

Videos (verified against src/, no dynamic references):
- ✅ DELETED: basalio-grid-reveal.mp4 (1.8MB)
- ✅ DELETED: basalio-case-study-transition-ink.mp4 (2.1MB)
- ✓ KEPT: basalio-hero.mp4 (524KB) — used on / and /hero-lab

PNG icons (verified against src/, no dynamic references):
- ✅ DELETED: High-res-smartwatch-01.png (515K)
- ✅ DELETED: High-res-smartwatch-02.png (613K)
- ✅ DELETED: High-res-smartwatch-03.png (612K)
- ✅ DELETED: Supply-page-wireframekit.png (394K)
- ✅ DELETED: layerd-lines-illustration3.png (32K)

**Result:** dist/ reduced from 8.2MB to 2.3MB (75% smaller build). All 13 routes render post-cleanup. No impact on page weight (640KB) — orphaned assets were never downloaded by visitors. Reduction affects repo size, build time, and Netlify deploy time.

---

## NEXT WORK (IN STRICT ORDER)

### ZZ1 — Section Identity Clarification
**Question:** Is the "POSITIONING · 01" overlap in the homepage the same section as `.what-we-do`, or a separate bug?
**Impact:** Determines if one fix resolves both or if they need separate patches.
**Deliverable:** Screenshot at 375px showing both issues labeled; clarify if same section or adjacent.

### ZZ2 — Carousel Threshold Investigation
**Question:** The carousel resolves at 620px, not 640px. Is this threshold driven by a media query we missed, or is it the flex rule itself?
**Impact:** If it's flex, the fix goes on the flex rule. If it's a query, it goes in CSS.
**Deliverable:** Measure carousel width at 619px, 620px, 621px; report exact behavior change.

### ZZ3 — Breakpoint 900px Load-Bearing Verification
**Question:** The sticky footer reveal is gated on 900px. Will consolidation to [375, 640, 768, 1024, 1280] break it?
**Deliverable:** Measure sticky footer reveal behavior at 900px; identify the exact breakpoint and why. Decide: keep 900px or migrate reveal to 1024px?

### RM1 — Fix .what-we-do Horizontal Overflow (1 commit)
**Scope:** src/pages/[...marketing].astro or global CSS
**Deliverable:** Measure scrollWidth on 375px viewport; should be ≤375px after fix
**Verification:** Before/after screenshot at 375px showing no horizontal scroll

### RM2 — Fix Carousel Viewport Collapse (1 commit)
**Scope:** src/components/RampHero.astro (flex layout)
**Deliverable:** Carousel renders at 620px and below; cards visible without horizontal scroll
**Verification:** Screenshot at 375px, 500px, 620px showing carousel cards present

### RM3 — Test Multi-Section Coverage (1 commit)
**Scope:** All sections that exceed 375px
**Deliverable:** No section scrollWidth > 375px at mobile viewport
**Script:** scripts/verify-section.js (see Standing Rules)
**Verification:** Run script at 375px; all sections ≤ 375px width

### RM4 — Consolidate Breakpoints (3–5 commits, one per file or logical group)
**Scope:** 7 files with breakpoints (responsive.css, hacks.astro, hero-lab.astro, RampHero.astro, etc.)
**Target system:** 375 (baseline), 640, 768, 1024, 1280
**Special case:** 900px (sticky footer) — measure & decide per ZZ3 results
**Deliverable:** All media queries consolidated; orphaned breakpoints removed
**Verification:** Build succeeds; no CSS regressions at any breakpoint

---

## STILL OPEN, NOT STARTED

| Task | Reason | Est. Time |
|------|--------|-----------|
| KK4 — Re-Verification (after RM1-RM4) | Hero fold at 1280px; pixel-diff baseline; 400% zoom reflow — all void due to font change | 1 hour |
| EE2 — DESIGN-SYSTEM.md full audit | 7+ days of doc rot; line-by-line inventory needed | 2 hours |
| EE3 — Doc rewrite (decisions-only) | Blocked on EE2 | 1 hour |
| DD2 — Favicon + hex sweep | Cleanup orphaned hex values | 30 min |
| HH3 — Heading hierarchy audit | 2 of 13 pages done; semantic/visual mismatches | 2 hours |
| Main branch merge decision | 53 commits behind; 404 redirect bug + font fix waiting | — |
| Netlify branch deploy preview | Never checked | — |

---

## STANDING RULES (FOR NEXT SESSION)

**ADD THESE RULES:**
- **Restart dev server before verification** — A dev server running 21+ hours across a dozen commits produced observations (BB1, BB2) that did not reflect the code. Before any verification pass or device recording, stop the dev server and restart it on current HEAD. Stale state is a recurring failure class this session (third occurrence).
- **sections/verify-overflow.js** — Must assert `scrollWidth <= innerWidth` at every tested viewport and throw on failure. This 322px overflow existed for weeks with no automated check that would have caught it.

**EXISTING RULES (REFERENCE):**

1. **Measurement deliverables** — Always paste actual output, never mark "complete" without data
2. **Actual vs requested fonts** — Use `document.fonts.check()` + width test, not getComputedStyle
3. **Pixel-diff validity** — Only when layout height unchanged; rebaseline if height changes
4. **animations: 'disabled'** — Freezes current position; use `reducedMotion: 'reduce'` to suppress entirely
5. **"Report and stop"** — Means STOP, not "report then continue"
6. **Task size** — Say explicitly if too large; propose split, don't just propose strategy
