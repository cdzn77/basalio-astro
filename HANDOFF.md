# BASALIO — HANDOFF
Last updated 2026-08-11 (FIN-1 site closure: refund policy, font-weight tokens, Decision 6 resolved)

## FIN-1 SITE CLOSURE — COMPLETE (2026-08-11)

Pre-launch cleanup sequence completed with 3 commits merged to main:

**FIN-1.1:** Clarified refund policy enforcement in /roadmap note 3  
- Changed: "Launch date is a hard commitment" → "February 2027 is the target. If it slips, founder licenses stay refundable until it ships."
- Ensures refund scope is bounded by Pro ship date, not indefinite

**FIN-1.2:** Font-weight design token migration  
- Replaced 152 hardcoded font-weight declarations across src/ with CSS variable tokens:
  - 400 → var(--font-weight-normal) [81 uses]
  - 500 → var(--font-weight-medium) [31 uses]
  - 600 → var(--font-weight-semibold) [30 uses]
  - 700 → var(--font-weight-bold) [10 uses]
- Verified: 130 token references in built output, build succeeds

**FIN-1.3:** Decision 6 resolved — Mobile body scale strategy documented  
- Established: Mobile body scale is intentionally per-page, not site-wide
- HeaderSplit defaults to 14px at 375px mobile; pages override at section level when needed
- Measurement conditions recorded (375px viewport, measured 2026-08-10)

**Verification before push:**
- ✅ verify:overflow: 104/104 sections pass (0 overflows)
- ✅ verify:headings: 12/12 routes pass (all h1 first, no level skips)
- ✅ npm run build: Succeeds with no warnings
- ✅ All 3 commits merged to main and pushed to origin

**FIN-1.4 (naming debt) — DEFERRED:** Attempted CSS class renames (.courses→.blocks, .testimonials-v2→.audience) introduced media query regression (overflow at 375/390/414px viewports). Reverted to avoid shipping regression. Naming alignment is cosmetic, not functional—can be addressed in a future session.

## PRICING MODEL — SETTLED

**Pricing structure:** $149 founder (first 100), $249 after. Both one-time, both perpetual, both unlimited sites. No subscription tier exists.

Founder differentiator: refundable at any time until the Pro control center ships (bounded by that milestone, not indefinite), in addition to the 30-day refund all licenses carry. Standard tier gets the 30-day refund only. This asymmetry rewards founder risk-taking without creating a tier system based on price or features.

**Revenue model:** All updates and support are funded by one-time payments. This is a deliberate obligation with no recurring revenue stream — sustainable only at small scale. Site copy now commits to perpetual updates on one-time pricing. No hedging language.

**Implementation:** All pricing copy centralized via `src/data/pricing.ts` constants (`FOUNDER_PRICE`, `POST_CAP_PRICE`). Pages import constants instead of hardcoding. Flipping `CHECKOUT_STATE` from 'founder' to 'standard' cascades all price copy automatically across every page.

External steps only: (1) Freemius Lifetime field set to "$249" one-time (not recurring), (2) Announcement/email/social posts mentioning founder tier.

## UNVERIFIED PLUGIN CLAIMS — CRITICAL BEFORE LAUNCH

**Every product claim about the plugin is unverifiable from this repo.** The plugin source code is not checked out here. These claims rest on Angelo's direct knowledge and should be confirmed against the actual plugin code before launch:

- Nine blocks exist and are built (implementation shown in marketing-site demo pages only, not plugin code)
- One shared script loads only on pages that use blocks (requires inspection of plugin PHP conditionals)
- Blocks are keyboard-operable and reduced-motion aware (demo JS shown; full accessibility testing requires WordPress environment)
- No jQuery, no framework in plugin bundle (requires build artifact inspection)
- Content survives plugin uninstall (requires inspection of plugin deactivation/uninstall hooks)
- GPL-2.0-or-later license (requires reading plugin LICENSE file or readme.txt header)

**Action:** Before shipping, verify these claims are true by reviewing the actual plugin source code. Marketing copy commits to these features; if they do not exist or are incomplete, update copy to match reality.

**Verified 2026-08-11:**
- Commit 61c0779: Corrected all renewal/subscription language (moved from dual-model: founder with no renewal vs $249/year standard, to single one-time model)
- Commit 2a2140e: Centralized pricing constants, tested at both CHECKOUT_STATE values (zero $149 matches when state='standard'; $249 only in post-cap teaser + FAQ when state='founder')
- All verify:overflow (104/104) and verify:headings (12/12) checks pass after corrections

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

**EO2: Left column shrink refinement** (REJECTED 2026-08-10)
  - Tested: @media (min-width: 1024px) and (max-width: 1508px): 431px left
  - Claimed result: 3 cards instead of 2 at 1440px
  - Measured result: 431px yields 2 cards (same as 500px). 3 cards require 1270px
    viewport; unreachable by column shrink. Claim disproven by measurement (BC6).
  - If 431px is wanted for compositional reasons, that is a new decision
    requiring separate justification. Not approved on stated purpose.

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

RULE: Fixed pixel widths inside flex containers need explicit plans for
every responsive breakpoint. If width < viewport, siblings get squeezed.

Claims and Testing History:
Four layout failures were documented for .courses-left 500px flex-basis.
All four were measured and disproven 2026-08-10 (BC3, BC6):
  1. Mobile breakpoint collapse — DISPROVEN: carousel renders at 320/375px
  2. Heading 3→5 lines at 1280–1440px — DISPROVEN: renders as 2 lines all widths
  3. Carousel clipping at 1280px — DISPROVEN: last card resolves via arrows
  4. 1440px waste prevents 3-card display — MEASUREMENTS CONTRADICT: 431px yields 2 cards
     (3 cards require 1270px viewport; unreachable by column shrink at 1440px)

No observed layout failures remain. Fixed-width constraint is covered by 104/104
overflow checks across 8 breakpoints. Item removed from open queue.

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

**Claim Verification Notice (2026-08-10):**
Nine inherited claims were systematically checked on 2026-08-10:
- BC3: BlocksCarousel edge-bleed — VERIFIED WORKING (not a bug, intentional peek)
- BC4: "Five bugs" claim — UNSUBSTANTIATED (replaced with four measured items, all disproven)
- BC5: Body copy 12px — DISPROVEN (GF1 selector error, actual 18px across all routes)
- BC6: PATTERN LOG items 1–4 — DISPROVEN (all four measured and failed)
- EO2: 431px yields 3 cards — DISPROVEN (still only 2 cards, measured)

Any item in this file written before 2026-08-10 should be treated as UNVERIFIED
until re-measured. Claims written during active debugging describe transient states
and often outlive their conditions. If an item references specific commit messages
or previous sessions' findings, assume it needs re-verification.

**DESIGN-SYSTEM.md Rewrite Input (DS1–DS11, 2026-08-10):**

Comprehensive token audit completed. Findings for rewrite:

1. **Orphan tokens (69 total):** 45 tokens used, 69 unused. Colors carry most volume
   (well-distributed). Prunable. Full audit: DS1 token usage report.

2. **Font-weight gap (genuine):** No tokens for weights 300, 600, 700. Distribution:
   - 400 (body standard): 84 uses
   - 600 (semibold): 30 uses
   - 700 (bold): 11 uses
   - 300 (light): 1 use
   Recommend tokens: --font-weight-normal (400), --font-weight-semibold (600),
   --font-weight-bold (700).

3. **Parallel scales (decision pending):** --gap-* (4 refs, all in 404.astro) vs
   --space-* (5 refs, global.css). Both cover spacing concept. Same semantic purpose,
   ~equal usage, different names. Naming decision pending. Recommendation: consolidate
   to --space-* scale, migrate 404.astro. Cost: 3–4 search-replace operations.

4. **Dead code (deletable):** layout.css, utilities.css, animations.css are NOT
   imported anywhere. 27 undefined token references live only in these files.
   Safe to delete. No production CSS depends on them.

5. **Content max-width divergence (design question, not defect):**
   - / (Hero): 1791px max-width (binds at ≥1791px viewport)
   - /blocks, /hacks, /contact: 1786px (HeaderSplit, binds)
   - /pricing: 1786px (HeaderSplit, constrained by parent .pricing-inner)
   Produces 42px left-gutter difference at 1920px viewport between Hero and
   non-Hero pages. Unrelated values, never coordinated. Design intent unclear.
   Note for Angelo: is this intentional spacing or drift?

6. **False positives (retracted, do not act):**
   - Undefined --space-sm/md/lg/xl/4xl/6xl aliases — live only in unimported
     layout.css, animations.css. Dead code, not a live bug.
   - Button.astro var(--fontWeight) — working correctly via Astro define:vars
     prop conversion. No bug.
   - font-weight: 400 700 in @font-face — valid CSS for variable font weight
     range (Instrument Sans, Azeret Mono). Do not remove.
   - HeaderSplit max-width: 1786px — parent-constrained on /pricing, active on
     other pages. Harmless redundancy, keep as-is.

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
- **Verification gap (GR12-GR17)** — Neither verify:overflow nor verify:headings detects deleted CSS styles on live HTML elements. Both scripts passed 104/104 + 12/12 while three elements on /pricing (.ledger-description, .risk-content p ×2) were completely unstyled (commits 919da6f through b7f1069). This failure class—style loss without layout shift—is uncovered by current verification. Root cause: verify:overflow checks scrollWidth (layout), not applied styles; verify:headings checks heading hierarchy only.

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
- **BlocksCarousel.astro:126 — flex: 0 0 500px on .courses-left** — CLOSED. Known
  fragility (fixed width in flex row) but no observed defect. All four documented
  failure claims disproven by measurement 2026-08-10 (BC3, BC6). Covered by 104/104
  overflow checks across 8 breakpoints. No action required.
- **Body copy font-size regression** — CLOSED. GF1 audit claimed 12px on 12 routes,
  but the measuring selector was incorrect (picked up labels/secondary text, not
  body paragraphs). Verified 2026-08-10: body copy is 18px across all routes
  (/support, /contact, /terms, /privacy, /roadmap, /hacks, /roadmap measured at
  18px/24px). GF1 selector error led to false positive.
- **335px mobile hardcode** — FIXED. No 335px values found in codebase.

**Token audit findings for DESIGN-SYSTEM.md rewrite (GR18-GR19):**
- **--line-height-relaxed (1.6)** — Defined in tokens.css (line 84) but never used in
  any component or page. Aspirational token or orphan? Audit during rewrite: check
  all tokens in tokens.css against actual usage in src/. Found: no route renders
  body copy at the 1.6 ratio. Site standard for 18px body is 24px line-height (1.33).
  This is the second unused token found this session.

---

## TYPOGRAPHY & BREAKPOINT AUDIT (BS1–BS11, 2026-08-10)

### Findings Summary

**Split body scale (BS4a):** HeaderSplit component overrides body copy to 14px on mobile (640px media query), while global --font-size-body is 18px desktop. Creates 4px fragmentation within single viewport at 375px. Component-level override, no site-wide responsive system.

**Heading letter-spacing chaos (BS3c + BS5 proposal):** 45 hardcoded -0.8px declarations across 11 sites, applied to headings of 5 different sizes (20–40px), producing ratios from -0.020em to -0.040em. No ratio rule exists. **Proposed:** replace with single `-0.02em` token. Max visible delta +0.4px at 20px (sub-perceptual). Defer to DESIGN-SYSTEM.md rewrite, not standalone.

**Media query breakpoints (BS10 corrected):** The "25 breakpoints" finding was a **measurement error** — static max-width declarations were counted as responsive breakpoints. 

**Actual responsive system: 7 media queries, 55 total uses:**
- `1024px` (10 uses) — `--breakpoint-desktop` ✓
- `768px` (8 uses) — `--breakpoint-tablet` ✓
- `640px` (7 uses) — primary mobile (not `390px`, which is orphaned 0 uses)
- `374px` (4 uses) — WCAG 1.4.10 reflow guard (intentional, ≤375px edge case)
- `900px` (2 uses) — blocks.astro layout-specific breakpoint (justified, not drift)
- `782px` (1 use) — hacks.astro demo grid (low-use demo breakpoint)
- `540px` (1 use) — hero-lab test page (internal page only)

**Conclusion:** This is a **coherent, minimal responsive system**. No consolidation needed. The four orphans are each defensible:
  - 374px: WCAG reflow compliance (documented intent)
  - 900px: blocks.astro layout (component-specific, justified)
  - 782px: hacks demo (low-risk, isolated)
  - 540px: hero-lab test (internal, non-critical)

**Component max-width constraints (18 values, NOT breakpoints):** Separate inventory for sizing decisions (1786/1791/1792px content widths, 554/800/1020/1200/1400px component widths, etc.). See deferred items below.

---

### Deferred (Do NOT act this session)

**1. Hero max-width divergence (1791px vs 1786px consolidation)**
   - Hero uses 1791px (3 instances)
   - Other pages use 1786px (8 instances)
   - Consolidation delta: 5px at 1920px viewport on live containers
   - Action: Measure impact before tokenizing. Defer to deliberate design pass, not cleanup.

**2. Component max-width inventory (18 distinct values)**
   - Live components: 1786, 1791, 1792, 800, 554, 1020, 1200, 1400px
   - Demo/internal: 500, 480, 450, 365, 300px
   - Purpose: Sizing constraints, not responsive breakpoints
   - Action: Review during DESIGN-SYSTEM.md rewrite if useful for tokenization. No immediate changes.

---

## RAMP STUDIO TEMPLATE EXTRACTION (RM1–RM9, 2026-08-10)

Systematic audit of Basalio design against source Ramp Studio Framer template at 375px mobile viewport. Checked nine inherited claims (BC3–BC7 carousel, EO2 layout, RM1–RM4 design system).

**REAL FINDINGS (Actionable):**

1. **Hero heading letter-spacing inconsistency (INTERNAL, NOT Ramp comparison)**
   - Basalio section headings: 40px / -0.8px = **-0.02em** (normalized ratio)
   - Basalio hero heading: 48px / normal (0px) = **0em**
   - Ramp standardizes all headings at -0.02em (hero 44px/-0.88px, H3 28px/-0.56px)
   - **Finding:** Basalio's hero breaks its own section-heading letter-spacing pattern. No design rationale documented. Awaiting Angelo decision on whether this is intentional emphasis or an oversight.
   - **Implication:** Changing hero to -0.8px (to match -0.02em) would alter shipped hero typography. Requires explicit sign-off.

2. **Ramp body paragraph standard is 14px, not 22px**
   - Measured all 56 `<p>` elements on Ramp page: 14px (36 instances, 64%), 16px (11 instances), 20px (6), 22px (1), 18px (1), 12px (1)
   - 22px @ 739px is a one-off section introduction ("We believe marketing doesn't have to be..."), not body standard
   - Ramp's de facto body is 14px (labels, card text, pricing, testimonials)
   - **Conflict:** Table 3 (RM1) claimed "Ramp body 22px is transferable." Premise disproven. Basalio body is settled at 18px (--font-size-body, BC5). No adoption needed; values are independent design decisions.

3. **Eyebrow→heading gap spacing (measured values, not conflict)**
   - Basalio .courses-eyebrow margin-block-end: 12px
   - Ramp "Our Courses" H2 → "Courses for Digital Creatives" H3: 20px gap (1304→1324px)
   - Basalio hero .hero-eyebrow margin-block-end: 20px (different from .courses-eyebrow)
   - **Finding:** Basalio hero eyebrow has 20px margin vs section eyebrow's 12px. Ramp hero-adjacent eyebrow also uses 20px. No documented rule for this divergence.

**INHERITED FROM TEMPLATE (Not Findings):**

1. **Eyebrow styling (14px / 500 / 2.8px letter-spacing)** — Identical across Basalio and Ramp. Template inheritance; no design decision here. Already shipped and correct.

2. **Section heading letter-spacing -0.02em ratio** — Both sites compress headings at -0.02em (Ramp H3 28px/-0.56px, Basalio section heading 40px/-0.8px). This is template standard, not a Basalio design choice. Consistent with source.

3. **Class naming debt** — .courses-* (BlocksCarousel), .testimonials-v2-* (WhoItsFor), headerType:'ramp'|'simple' (BaseLayout). All carry Ramp Studio provenance. Internal, not user-facing. Consolidation is future refactor work, not a current defect.

**RETRACTED DURING EXTRACTION (False Claims Corrected):**

These claims were made in earlier sessions but contradicted by measurement:

1. "Eyebrow styling is a universal design pattern" — **Retracted (RM8a).** Basalio inherits from Ramp template; convergence due to shared ancestry, not universality.

2. "Multiple H1 tags violate WCAG 2.1 Level A" — **Retracted (RM7e).** Ramp's split H1 is a 1.3.1 Info and Relationships structure issue, not a Level A failure. Noted as structural divergence but not an accessibility violation.

3. "Ramp body is 22px" — **Retracted (RM8c).** Ramp body standard is 14px (36 of 56 paragraphs). Single 22px outlier at 739px. Table 3 premise disproven.

4. "Ramp has no CTA on the page" — **Retracted (RM5a).** Ramp has promotional links including "View course" (@586px, 12px), "View all" (@1411px, 2110px), "Contact us" (@2750px), "Subscribe" (@3147px, 3544px). Also 8 footer navigation links. No prominent button-style CTA like Basalio's "EXPLORE BLOCKS".

5. "Ramp DOM is inaccessible in Framer iframes" — **Retracted (RM2).** Full page DOM was successfully measured at 375px viewport. Claim was false; page-level DOM is accessible.

6. "Negative margin overlap occurs in eyebrow→heading" — **Retracted (RM4b).** No negative margins found. Gaps are produced by margin-block-end on eyebrow elements (12px courses, 20px hero). Measurement error: no overlap.

7. "Button height is 36px" — **Retracted (RM7d).** .btn-wrapper.btn-acid computed height is 44px, not 36px. RM1/RM3 data contradicted by direct measurement.

**METHODOLOGY NOTE (RM3–RM4 correction):**

Six elements were incorrectly measured before enforcing element identification by text content first:
- RM1: Body copy selector found .hero-eyebrow (14px) instead of body paragraph (18px)
- RM1: Button selector found MENU button (12px) instead of EXPLORE BLOCKS (14px)
- RM1: "Ramp DOM inaccessible" claim, contradicted by successful measurements in subsequent queries
- RM3: Section body paragraph query returned empty, selector logic flaw
- RM4: Attempted measurement before full-page scroll, missed off-fold content

**Fix applied:** Identify elements by textContent match BEFORE measuring, paste the selector with confirmation, then measure. This eliminated selector-mismatch errors in RM6–RM9 audits.

---

**Deferred (earlier sessions):**
- **EO2** — Left column shrink to 431px (tested, working, awaiting Angelo review)
- **DESIGN-SYSTEM.md rewrite** — Approach approved (decisions-only doc, values in
  tokens.css, generated reference). Prerequisite: complete line-by-line inventory.
  Add audit step: identify tokens defined but unused (--line-height-relaxed confirmed
  orphan; survey for others during rewrite).
- **Internal naming debt** — .courses-* classes in BlocksCarousel/blocks.astro,
  .testimonials-v2-heading in WhoItsFor, headerType:'ramp'|'simple' in BaseLayout,
  Ramp provenance comments. Not user-facing.
