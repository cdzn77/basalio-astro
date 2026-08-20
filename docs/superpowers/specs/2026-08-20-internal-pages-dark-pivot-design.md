# Internal Pages Dark Pivot — Design Spec

**Date:** 2026-08-20  
**Project:** Basalio Astro brand site  
**Goal:** Pivot all internal pages to a dark surface treatment inspired by `basalio-sample`, fix layout/accessibility defects, and add a Support page.

## Decisions

- **Surface:** All internal pages use the existing Basalio `--surface-ink` dark token (`#1C1917`) with `--text-on-ink` (`#F6F4EF`) copy and `--text-on-ink-muted` (`#D4CABE`) secondary text.
- **Accent:** Keep Basalio acid (`#EDFF10`) as the primary accent. Do not switch to the sample site’s blue accent.
- **Typography:** Keep Instrument Sans + Azeret Mono.
- **Footer:** Remains **acid** as the brand accent, even on dark pages.
- **Glass component:** Introduce a reusable `.glass` panel utility for cards, tables, and CTAs.
- **Scope pages:** `/blocks/`, `/blocks/[slug]/`, `/pricing/`, `/hacks/`, `/contact/`, `/early-access/`, `/support/` (new), `/terms/`, `/privacy/`.

## Global additions

### `.glass` utility (CSS)

```css
.glass {
  background: rgba(255, 255, 255, 0.045);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
}
```

Optional variants:
- `.glass-2` — `rgba(255,255,255,0.075)` background, stronger border.
- `.glass-toplight` — subtle top edge gradient highlight for emphasis panels.

## Page-by-page design

### `/blocks/`

- Switch hero to dark `HeaderSplit` (`surface="ink"`).
- Replace current block cards with glass panels:
  - Icon in a subtle bordered square.
  - Mono index label (`01`–`09`).
  - Block name, category mono label, tagline.
  - "See it live" link with arrow hover animation.
- Bottom CTA banner becomes a glass panel:
  - Heading: "All nine. Free. Forever."
  - Body: "No locked blocks, no watermarks, no instance limits."
  - Button links to `/pricing/`.

### `/blocks/[slug]/`

- Dark two-column layout: copy left, sticky live demo right.
- Breadcrumb: "Blocks / {Block name}" in muted text.
- Block icon in a bordered square.
- Accessibility note in a compact glass panel.
- Demo stage:
  - Fixed aspect ratio container (`aspect-ratio: 4/3` or `16/10`).
  - Dark stage shell (`#0C0E12` equivalent) so demos render consistently.
  - Ensure demos scale to fit without overflowing the viewport.
- Controls table in a glass wrapper with sticky horizontal scroll on small screens.
- Prev/next navigation as glass cards.

### `/pricing/`

- Dark centered `HeaderSplit` hero.
- Pricing cards:
  - Dark glass variant.
  - Equal-height cards using flexbox (`display: flex; flex-direction: column;`).
  - Card content grows (`flex: 1 1 auto;`) so CTA buttons align at the bottom.
- Status ledger in a glass table wrapper.
- Risk-reversal section in `.glass-2.glass-toplight` panel.
- FAQ accordion section remains dark.
- Add `id="faq"` to the FAQ section so the contact page support link can target it if needed.

### `/hacks/`

- Dark `HeaderSplit` hero.
- Code cards:
  - Glass card body.
  - Code block area: dark background (`#0A0C10` or `rgba(0,0,0,0.35)`) with light accessible text (`#F6F4EF` / `rgba(255,255,255,0.85)`).
  - Copy button with sufficient contrast.
- Bottom "Five more in the vault." section:
  - Change from acid to **glass CTA banner**.
  - Max-width: `1100px`–`1200px`, centered.
  - Heading + body left, button right on desktop; stack on mobile.
  - Button links to `/pricing/`.

### `/contact/` & `/early-access/`

- Dark `HeaderSplit` heroes.
- Form wrappers:
  - `max-width: 640px`.
  - Never shrink below `min-width: 500px` on desktop viewports.
  - Responsive: below ~640px, the form fills the column but respects padding.
- `/contact/` bottom-left resource link changes from "View FAQ" to "View Support" and points to `/support/`.

### `/support/` (new page)

- Dark `HeaderSplit` hero: "Support" / "Troubleshooting, licensing, and common fixes."
- Search input at top (visual only, no backend).
- Categorized sections:
  - Getting started / Installation
  - Block behavior & demos
  - Licensing & founder tier
  - Performance & compatibility
  - Common errors
- Each section uses a dark accordion or definition list.
- Bottom CTA: "Still stuck? Contact us." linking to `/contact/`.

### `/terms/` & `/privacy/`

- Dark `HeaderSplit` heroes.
- Content sections capped at `--container-narrow` (~760px) for readability.
- Use glass panels or clean dark sections for major article groupings.
- Polish spacing and typography to match the sample site’s clean, readable legal pages while keeping Basalio tokens.

## Accessibility requirements

- All dark-page text meets WCAG 2.1 AA contrast:
  - Body text on dark: at least `rgba(255,255,255,0.85)`.
  - Muted text: at least `rgba(255,255,255,0.55)`.
- Code blocks on `/hacks/` must have at least 4.5:1 contrast between text and background.
- Focus outlines remain visible on dark surfaces (use acid or white outline).
- No horizontal overflow on viewports down to 320px.

## Files expected to change

- `src/styles/global.css` — add `.glass` utilities, dark page base tweaks.
- `src/components/patterns/HeaderSplit.astro` — ensure dark surface support is robust.
- `src/components/Footer.astro` — confirm acid footer works after dark-page changes.
- `src/components/patterns/PricingCards.astro` — dark variant + button alignment.
- `src/components/patterns/CodeCard.astro` — accessible dark code styling.
- `src/components/patterns/ControlsTable.astro` — dark glass table.
- `src/components/FAQ.astro` — dark accordion styling.
- `src/pages/blocks.astro`
- `src/pages/blocks/[slug].astro`
- `src/pages/pricing.astro`
- `src/pages/hacks.astro`
- `src/pages/contact.astro`
- `src/pages/early-access.astro`
- `src/pages/terms.astro`
- `src/pages/privacy.astro`
- `src/pages/support.astro` (new)
- `src/data/navigation.ts` — add Support link if needed.

## Out of scope

- Homepage variants (`homepage-v1`…`v4`) remain unchanged unless review findings overlap.
- Header behavior changes beyond ensuring it flips correctly on dark surfaces.
- New block demos or block functionality changes.
