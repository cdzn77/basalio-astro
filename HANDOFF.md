# BASALIO — HANDOFF
Last updated 2026-08-07

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
- Hero clamp(48px, 8vw, 96px); 40px below 375px
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

## NEXT PROJECT — Ramp mobile system extraction
Extract the SYSTEM, not the layout. Only about half of Ramp's sections
correspond to Basalio's, so section-by-section copying does not apply.

Measure https://rampstudio.framer.website at 375x812, isMobile true:
  1. Section padding — horizontal inset, top/bottom per section
  2. Vertical rhythm — gaps between eyebrow / heading / body / button,
     and between sections
  3. Mobile type scale — eyebrow, section heading, body, card title,
     card body: size / weight / line-height
  4. Button treatment — width, height, padding, letter-spacing, position
     relative to text

Then a second table with Basalio's current measured values beside each.
That gap list is the work.

Already banked: Ramp stacks its stats row FULL-WIDTH, label-left /
value-right with divider lines. Not columns. Basalio's divider list was
changed to match.

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
