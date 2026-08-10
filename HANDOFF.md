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

## RESOLVED

**[object Module] in block icons** — Fixed 2026-08-09 (commits 0b4790b, d259a54).
`import.meta.glob()` returned module namespace objects; fixed with `query: '?raw', import: 'default'`.
Verified live production clean on / and /blocks (2026-08-10).

**Orphaned build assets — claim contradicted, not a blocker** — Audited
2026-08-10. Scanned public/ (source assets). Found 127 media files: 12
REFERENCED (0.6MB), 26 UNCERTAIN (0.1MB @3x/@0.5x retina variants), 89
UNREFERENCED (0.3MB truly orphaned). Original claim of "6.1MB, 2 videos + 5
PNGs" was wrong by 20x. dist/ (built output) is 1.9MB regenerated each build,
not stranded. Non-issue. Icon debt minimal, lower priority than dead CSS.

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

**Route list scope clarification (HC28-HC30):**
- **PUBLIC_ROUTES (10):** Indexable pages listed in sitemap.xml, not disallowed by robots.txt
- **PRODUCTION_ROUTES (11):** User-reachable pages in production (includes /welcome, disallowed but live)
- **HEADING_ROUTES (12):** Pages tested for heading hierarchy (PRODUCTION_ROUTES + synthetic 404-handler probe)
- **ALL_ROUTES (13):** All routes including internal tests (/hero-lab, /404) and disallowed pages
- **Synthetic probe:** `/__404-handler-probe` is a nonexistent path that triggers Netlify's 404 error handler. Not a user-reachable page; used for verification only. Separated into HEADING_ROUTES to avoid conflating synthetic test probes with actual production routes.

**Verification scripts:**
- **HC21 — Transcription error** — Pasted "/contact @ 375px: 2/3 sections pass" in HC14 output. Script logic unchanged (verify-section.js pass/fail condition identical across commits). Error was manual transcription when copying output, not a script bug. All subsequent pasted numbers verified via re-run. Records the risk: any output from this task may have been retyped rather than pasted verbatim, including 104/104.
- **HC22 — Overflow detection proven** — Forced width: 200vw on first section of / route. verify:overflow detected failure: `❌ (3 overflow) / @ 1440px: 4/7 sections pass`, summary showed 13 total, 12 passed, 1 failed (not 104/104). Script reliably detects and reports failures.

**404 and /welcome findings:**
- **/404 has h1 in source and build** — 404.astro contains h1; /404.html (direct file) renders 1 h1. Live route /404/ unreachable via Netlify (0 h1 from curl). This is a hosting/routing issue (Netlify serves 404.html as error handler), not a code issue. The page heading exists and is correct.
- **/welcome has 1 h1** — Confirmed for heading hierarchy compliance. Disallowed by robots.txt but live and user-reachable, correctly included in PRODUCTION_ROUTES (11).

**Content markup:**
- **.testimonial-name-v2 naming debt** — Class renders audience roles/disciplines (e.g., "Portfolio & Brand Designers"), not person names. Markup is correct (h3 precedes quote content in order). Naming mismatch only—no change needed.

**Deferred Item Audit (GR6-GR9, re-verified 2026-08-10):**
- **Dead CSS rules** — STILL OPEN. 15 rule definitions in src/pages:
  .hero-description (4: blocks:435,676,697 + contact:112),
  .social-link (2: contact:299,310), .social-links-inline (1: contact:293),
  .social-links (1: contact:363), .ledger-description (2: index:335 + pricing:208),
  .risk-content (5: index:463,469 + pricing:340,346,629). No HTML elements use
  these rules (verified built HTML). Rules remain in source CSS. Removal deferred.
- **13 hardcoded font-size: 16px in page styles** — STILL OPEN. EB2 only
  covered components. Verified in src: terms(1), support(3), index(2), blocks(1),
  contact(3), privacy(1), pricing(2). Not yet migrated to --font-size-body token.
- **BlocksCarousel.astro:126 — flex: 0 0 500px on .courses-left** — STILL OPEN.
  Constraint remains. Known to cause five bugs. Requires multi-tier responsive
  solution.
- **Body copy font-size regression** — UNVERIFIED. GF1 audit showed 12px on 12
  routes (should be 18px). BUT: measuring selector may pick up labels (happened
  twice). Confirm selector before treating as bug.
- **335px mobile hardcode** — FIXED. No 335px values found in codebase.

**Deferred (earlier sessions):**
- **EO2** — Left column shrink to 431px (tested, working, awaiting Angelo review)
- **DESIGN-SYSTEM.md rewrite** — Approach approved (decisions-only doc, values in
  tokens.css, generated reference). Prerequisite: complete line-by-line inventory.
- **Internal naming debt** — .courses-* classes in BlocksCarousel/blocks.astro,
  .testimonials-v2-heading in WhoItsFor, headerType:'ramp'|'simple' in BaseLayout,
  Ramp provenance comments. Not user-facing.
