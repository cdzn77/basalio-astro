# Basalio Responsive Fix — Handoff (2026-08-05)

**Session context:** 2026-08-04 to 2026-08-05. Font loading crisis RESOLVED. New blocker: 375px mobile responsive failure.

---

## RESOLVED SINCE LAST HANDOFF

- **Font loading:** FIXED. Self-hosted variable WOFF2 in `public/fonts/` (71 KB total: Instrument Sans + Azeret Mono, wght 400–700). Preload with `crossorigin`. Verified via `document.fonts.check()` and network single-download check. Site now renders in Instrument Sans.
- **Switzer, IBM Plex Mono, Manrope:** Removed (24 refs deleted, malformed @font-face purged, .brand-logo switched to Instrument Sans).
- **Malformed @font-face block:** Deleted from global.css. It was what made every prior CSS-read audit falsely report "success."
- **Commits:** 6 total (MM5 phases). All merged to session/hero-cascade-fix-2026-08-04. Type-checked and verified.

---

## STATE OF THE SITE

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

**ADD THIS RULE:**
- **sections/verify-overflow.js** — Must assert `scrollWidth <= innerWidth` at every tested viewport and throw on failure. This 322px overflow existed for weeks with no automated check that would have caught it.

**EXISTING RULES (REFERENCE):**

1. **Measurement deliverables** — Always paste actual output, never mark "complete" without data
2. **Actual vs requested fonts** — Use `document.fonts.check()` + width test, not getComputedStyle
3. **Pixel-diff validity** — Only when layout height unchanged; rebaseline if height changes
4. **animations: 'disabled'** — Freezes current position; use `reducedMotion: 'reduce'` to suppress entirely
5. **"Report and stop"** — Means STOP, not "report then continue"
6. **Task size** — Say explicitly if too large; propose split, don't just propose strategy
