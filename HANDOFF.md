# BASALIO — HANDOFF
Last updated 2026-08-08

## STATE
Site is LIVE AND PUBLIC at basalio.com. Netlify, production branch main.
Working tree clean, everything pushed.

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

## STILL OPEN — Mobile system pass phase 2
- EB2: Body copy 16px → 18px
  Add --font-size-body: 18px token to tokens.css
  Update global.css p { font-size: var(--font-size-body); }
  Replace 18 hardcoded 16px instances with var(--font-size-body) in
  component styles. Preserve --font-size-16 (affects h6, unrelated).
- EO2: Left column shrink refinement (1440–1508px band)
  @media (min-width: 1440px) and (max-width: 1508px):
    .courses-left { flex: 0 0 431px; }
  This trades heading/button space for 3-card display at 1440.
  Screenshot comparison taken at 431px vs 500px to assess legibility.
  Pending: review if the narrower column is acceptable design-wise.

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

## DEFERRED
- DESIGN-SYSTEM.md rewrite. Approach approved: decisions-only doc, values
  live in tokens.css, implementation reference generated. The
  line-by-line inventory (EE2) was never completed — do that first.
- Heading hierarchy audit. 2 of 13 pages done. h2 elements render 18px on
  /blocks — heading levels appear chosen for size rather than structure.
  Semantic problem, affects screen-reader navigation.
- ~6.1MB orphaned build assets confirmed unreferenced (2 videos, 5 PNGs).
  Build hygiene, NOT page weight — orphans are never downloaded.
- Internal naming debt, none user-facing: .courses-* classes in
  BlocksCarousel/blocks.astro, .testimonials-v2-heading in WhoItsFor,
  headerType:'ramp'|'simple' in BaseLayout, Ramp provenance comments.
