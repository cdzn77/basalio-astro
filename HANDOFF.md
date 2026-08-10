# BASALIO — HANDOFF
Last updated 2026-08-09 (Icon import bug fixed, full-site audit run)

## STATE
Site is LIVE AND PUBLIC at basalio.com. Netlify, production branch main.
feat/mobile-system branch (19 commits) ready for review before merge.
All carousel work verified with Playwright; 104/104 overflow checks pass.

Canonical checkout: /Users/angelomanzanojr/basalio-astro
Two stale copies archived to ~/_archive with git remotes REMOVED:
  basalio-marketing-site.stale-2026-08-06
  ramp-astro-template.stale-2026-08-06
NEVER work from a second checkout of this repo. Three checkouts sharing
one remote caused verification to run against the wrong tree more than
once.

## SHIPPED AND VERIFIED
- Instrument Sans + Azeret Mono, self-hosted variable WOFF2 in
  public/fonts/, 71KB, preload with crossorigin
- Hero clamp(48px, 8vw, 96px); 40px below 375px; letter-spacing -0.01em
- Hero .hero-left width 70% on desktop (>1024px) — fixes 5-line
  regression at 1280–1440px viewports
- Label tokens unified: --label-size 14px, --weight 500,
  --line-height 19.6px, --letter-spacing 2.8px
  Consumed by .hero-eyebrow and .block-label
- Carousel multi-tier viewports (2/3/4 cards + 41px peek):
  @media (min-width: 1024px): max-width 615px
  @media (min-width: 1509px): max-width 909px
  @media (min-width: 1803px): max-width 1203px
  Applied to BlocksCarousel and WhoItsFor
- Responsive: 104/104 overflow checks, 13 routes x 8 viewports
  (320/360/375/390/414/768/1024/1440)
- Header surface theming via IntersectionObserver, ink/paper, no-JS
  fallback in markup
- Header tint rgba(255,255,255,0.85) + blur(8px), gated to paper only
- Divider list stacks below 640px, 24px gap
- LAB banner offset below header on /hero-lab
- robots.txt (disallows /hero-lab and /welcome only), sitemap.xml
  (10 public routes)
- Page weight 640KB / 16 requests measured on a preview build

## MOBILE SYSTEM PASS — COMPLETE
Phase 1 (commit c4d9e14) + Phase 2 (commits 1274869, 231354d):

**EB2: Body copy 16px → 18px** (commit 1274869)
  - Added --font-size-body: 18px token to tokens.css
  - Updated p { font-size: var(--font-size-body); } in global.css
  - Replaced 13 hardcoded 16px with var(--font-size-body) in:
    BlocksCarousel (2×), WhoItsFor, PositioningStats, HeaderSplit,
    PricingCards, StatusLedger, Footer, Hero, FAQ (2×), Accordion (2×)
  - Preserved --font-size-16 (h6 sizing, unrelated)
  - Verified: 104/104 overflow checks, +55px on homepage, +4px on pricing

**Dead stylesheets cleanup** (commit 231354d)
  - Deleted components.css (292 lines, never imported)
  - Deleted responsive.css (265 lines, never imported)
  - Verified empirically: nav { backdrop-filter: blur } rendered as none
  - Confirmed: ED2's label tokens live in tokens.css, correctly consumed
  - No regression: 104/104 overflow checks pass, screenshots identical

**14px prose audit** — INTENTIONAL HIERARCHY (NO CONVERSION)
  - Card-constrained copy (.block-description, .teaser, .resource-description)
    stay at 14px. Enlarging would break card layouts (280–335px width).
  - Secondary content (.footer-description, .ledger-item-note) stay at 14px
    by design convention (footer smaller type, feature lists).
  - Body prose is 18px via --font-size-body token.
  - See DIVERGENCE-LOG.md for full audit and standing rules.

**EO2: Left column shrink refinement** (DEFERRED, low priority)
  - Tested: @media (min-width: 1024px) and (max-width: 1508px): 431px left
  - Result: Tier 2 activates at 1440px instead of 1509px
  - Improves only 1440–1508px band (3 cards instead of 2)
  - 1280–1350px remain at 2 cards — minimal gain
  - Pending: visual review by Angelo

## CAROUSEL MOBILE SYSTEM PASS — COMPLETE (2026-08-08)

Comprehensive carousel responsiveness fix across all breakpoints:

**Phase 3: Mobile Carousel Restructuring** (commits 627b15b–db840f8)
  - **FF1** (627b15b): Height collapse fixed with min-height band-aids
    - Root cause: .carousel-viewport { height: auto } with position: absolute track
    - Quick fix applied: min-height: 308px (BC), 503px (WI)
    - **KNOWN DEBT**: Band-aid values hardcode card heights; real fix is
      removing position: absolute from track (deferred)
  
  - **FI1** (8284561): Structural fix—position: relative at mobile
    - Changed track from absolute to relative below 640px
    - Allows viewport to get natural height from children
    - Transform animation unaffected
  
  - **FH2** (02f7dc9): JS-calculated responsive card widths
    - Replaced fixed 500px with dynamic --card-w CSS variable
    - Formula: (viewport.offsetWidth - gap) / 2 cards per row
    - Mobile below 640px: fixed 280px (unchanged)
  
  - **FJ1** (96f458a): Off-by-one gap bug in cardsPerView calculation
    - Last card in row has no trailing gap
    - Fixed: floor((viewport + gap) / (card + gap)) instead of floor(viewport / (card + gap))
    - Result: 2 complete cards per view at desktop (no partial cards)
  
  - **FK1** (5da2446): Apply cardsPerView to offset calculation
    - updateTrackPosition() now uses cardsPerView for correct page advances
    - Offset = currentPage × cardsPerView × (cardWidth + gap)
    - Pagination model: ceil(cards.length / cardsPerView)
  
  - **FL1** (db840f8): Verify pagination arithmetic
    - Confirmed 2-card page advances at 1280/1440/1920px
    - Last card visible when next button disables
    - No unreachable cards

Result:
  - Desktop (1280/1440/1920px): 2 cards per view, responsive sizing
  - Mobile (375px): 1 card per view, 280px fixed, peek pattern
  - All: No partial cards at page boundaries
  - Verified: 104/104 overflow checks pass
  - Verified: Transform steps match calculated offsets
  - Verified: Navigation reaches all cards without overflow

Verification scripts added:
  - fi2-carousel-verify.mjs: Visibility + navigation checks
  - fh2-fluid-cards-verify.mjs: Card width scaling
  - fj1-gap-fix-verify.mjs: CardsPerView calculation
  - fl1-pagination-arithmetic.mjs: Page stepping & math

## PATTERN LOG — Fixed-pixel-widths in flex rows
Four separate layout failures caused by hardcoded .courses-left 500px
constraint in flex rows, exacerbated when:
  1. Mobile breakpoint caused carousel collapse (RM1)
  2. Desktop 1280–1440px: heading went from 3 to 5 lines
  3. Carousel clipping at 1280 due to available space squeeze
  4. 1440px wastes 225px, prevents 3-card display without shrinking left column

RULE: Fixed pixel widths inside flex containers need explicit plans for
every responsive breakpoint. If width < viewport, siblings get squeezed.

SOLUTIONS TRIED (ranked by outcome):
  A. Flex-shrink without pressure: failed (carousel has no intrinsic width)
  B. Cap carousel viewport everywhere: worked but wastes space at 1600+
  C. Multi-tier viewports: works, wastes tolerable ~50–120px per tier
  D. Shrink left column per band: viable refinement, awaiting review

## ICON IMPORT BUG FIX (2026-08-09)

**The Bug:** All 9 block icons rendered as "[object Module]" text on live site.
Shipped to production 4 times before root cause was identified.

**Root Cause:** `import.meta.glob()` returns a MODULE NAMESPACE OBJECT, not file
contents. Neither `as: 'raw'` nor `as: 'url'` unwraps this — both are deprecated
in Vite. The missing piece: `import: 'default'` explicitly unwraps to get the
actual value (raw SVG string).

**The Fix:**
```javascript
// BEFORE (broken, shipped 4 times):
const icons = import.meta.glob('/public/assets/icons/blocks/*.svg', {
  as: 'raw', eager: true
});

// AFTER (fixed):
const icons = import.meta.glob('/public/assets/icons/blocks/*.svg', {
  query: '?raw', import: 'default', eager: true
});
```

Applied to:
- BlocksCarousel.astro (homepage carousel) — commit 0b4790b
- blocks.astro (/blocks page grid + detail sections) — commit d259a54

**Verification Learnings:**
- Verification checked element existence (`querySelector`, `offsetHeight`) instead
  of functional correctness (image loaded, SVG rendered with children)
- Dev server (`npm run dev`) masks build-time failures — Vite resolves globs
  differently than production build
- Browser cache and Cloudflare were misread as outages — always curl the live
  HTML first before diagnosing a "broken deploy"

## STANDING RULES (from 2026-08-09)

**Imports & Globs:**
- Never verify against `npm run dev`. Always test with `npm run build && npm run preview`
- Verify the rendered output functionally (image dimensions > 0, SVG has children,
  text content is correct), not just element existence

**Verification:**
- Before accepting a new check as valid, prove it FAILS against known broken state
- A check that has never failed is not a check

**Deployment:**
- curl the live HTML before diagnosing a "broken deploy"
- Browser cache and CDN/firewall rules have both been misread as outages

## DEFERRED

**Known Debt from Mobile System Pass:**
- **FF1 min-height band-aids** — Carousel height fix uses hardcoded 308px/503px
  values that match current card heights. Real fix: remove position: absolute
  from .carousel-track; use position: relative for natural height contribution.
  Deferred: requires testing transform-based animation with new positioning.

**Heading Hierarchy Fix (2026-08-09, commits 51735f9–8180c9f):**
- **HeaderSplit level prop:** Dynamic heading rendering (h1/h2). 10 h1 (page
  titles) + 11 h2 (section headings) = 21 total across 11 production routes.
  Error in GO2: table inferred index.astro without reading; it received
  level="h2" for pricing section, fixing / from 2 h1 → 1 h1.
- **Footer h4 → h2 (commits 5f6690f, 2ebaeb9):** All three footer column labels
  (PRODUCT, SUPPORT, newsletter heading) changed from h4 to h2 to eliminate
  heading-level skips on all routes. CSS .footer-column-label keyed on class
  (not tag), so styling unchanged (12px, 600 weight, 0 margins).
- **Verification script (commit 8180c9f):** npm run verify:headings asserts
  exactly 1 h1, h1 first in order, no level skips for all 11 routes.
  Prevents regression (ship with zero h1 or skip violations).
- **All 11 production routes verified live:** exactly 1 h1 each.
- **Pre-existing deferred:** /pricing has h1 → h3 skip (PricingCards headings
  appear without h2 separator). h3 rejected for same reason: routes starting
  with h1 alone until footer would create identical skip. Converting to <p> in
  <nav aria-label> deferred as lower-clutter alternative.
- **/hero-lab:** 4 h1 (internal, noindex, lowest priority).

**Still Open:**

**Heading Hierarchy & Verification (2026-08-09, HC17-HC25):**

**Route list scope clarification:**
- **PUBLIC_ROUTES (10):** Indexable pages listed in sitemap.xml, not disallowed by robots.txt
- **PRODUCTION_ROUTES (11):** User-reachable pages in production (includes /welcome, disallowed but live)
- **ALL_ROUTES (13):** All routes including internal tests (/hero-lab, /404) and disallowed pages
- **Finding (HC25):** Output header "11 Production routes verified" was followed by 10-item list. This was a labeling error (confusing "public" and "production"), not a data error. Resolved by renaming constants in scripts/routes.js to clarify scope.

**Verification scripts:**
- **HC21 — Transcription error** — Pasted "/contact @ 375px: 2/3 sections pass" in HC14 output. Script logic unchanged (verify-section.js pass/fail condition identical across commits). Error was manual transcription when copying output, not a script bug. All subsequent pasted numbers verified via re-run. Records the risk: any output from this task may have been retyped rather than pasted verbatim, including 104/104.
- **HC22 — Overflow detection proven** — Forced width: 200vw on first section of / route. verify:overflow detected failure: `❌ (3 overflow) / @ 1440px: 4/7 sections pass`, summary showed 13 total, 12 passed, 1 failed (not 104/104). Script reliably detects and reports failures.

**404 and /welcome findings:**
- **/404 has h1 in source and build** — 404.astro contains h1; /404.html (direct file) renders 1 h1. Live route /404/ unreachable via Netlify (0 h1 from curl). This is a hosting/routing issue (Netlify serves 404.html as error handler), not a code issue. The page heading exists and is correct.
- **/welcome has 1 h1** — Confirmed for heading hierarchy compliance. Disallowed by robots.txt but live and user-reachable, correctly included in PRODUCTION_ROUTES (11).

**Content markup:**
- **.testimonial-name-v2 naming debt** — Class renders audience roles/disciplines (e.g., "Portfolio & Brand Designers"), not person names. Markup is correct (h3 precedes quote content in order). Naming mismatch only—no change needed.

**From GF Full-Site Audit (2026-08-09):**
- **Body copy font-size regression** — UNVERIFIED. GF1 audit showed 12px on 12
  routes (should be 18px). BUT: the measuring selector may be picking up a label
  (happened twice earlier today). Confirm selector, class, and actual text content
  before treating as real bug.
- **15 hardcoded font-size: 16px in page styles** — EB2 only covered components.
  Page-level styles in blocks, terms, privacy, support, pricing, contact, index
  still have old hardcoded values. Likely cause of the 12px reading above.
- **BlocksCarousel.astro:127 — flex: 0 0 500px on .courses-left** — Known,
  deferred, has caused five bugs. Requires multi-tier responsive solution.
- **Heading hierarchy audit** — 2 of 13 pages done. Semantic structure issue,
  affects screen-reader navigation. h2 elements currently chosen for size.

**Deferred (earlier sessions):**
- **EO2** — Left column shrink to 431px (tested, working, awaiting Angelo review)
- **DESIGN-SYSTEM.md rewrite** — Approach approved (decisions-only doc, values in
  tokens.css, generated reference). Prerequisite: complete line-by-line inventory.
- **~6.1MB orphaned build assets** — 2 videos + 5 PNGs confirmed unreferenced.
  Build hygiene only (not page weight — orphans never downloaded).
- **Internal naming debt** — .courses-* classes in BlocksCarousel/blocks.astro,
  .testimonials-v2-heading in WhoItsFor, headerType:'ramp'|'simple' in BaseLayout,
  Ramp provenance comments. Not user-facing.
