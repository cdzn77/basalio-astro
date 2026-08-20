# Internal Pages Sample-Blend Design

## Goal
Blend the content, structure, and high-impact UI patterns from `/Users/angelomanzanojr/basalio-sample` into the Basalio brand Astro site's internal pages, while preserving the brand's light-first design system (paper/alt/ink surfaces, acid accent, Instrument Sans + Azeret Mono typography, HeaderSplit heroes).

## Scope
First pass covers the six routes that have direct equivalents or natural derivations in the sample site:

1. **Blocks overview** (`/blocks/`)
2. **Block detail** (`/blocks/[slug]/`) — new dynamic routes for all nine blocks
3. **Pricing** (`/pricing/`)
4. **Hacks** (`/hacks/`)
5. **Contact** (`/contact/`)
6. **404** (`/404/`)

Brand-only pages (`/support/`, `/roadmap/`, `/early-access/`, `/privacy/`, `/terms/`, `/welcome/`) are out of scope for this pass.

## Visual Direction
- Keep the existing brand token system (`src/styles/tokens.css`).
- Use `HeaderSplit` heroes for page headers on all new/updated internal pages.
- Use `surface="paper"` as the default; use `surface="ink"` only where the brand site already does or where strong contrast is needed.
- Replace the sample's cool-blue accent and glassmorphism with the brand's acid yellow and flat surfaces.
- Replace sample CSS-composed product shots with existing brand assets (block icons from `/public/assets/icons/blocks/`, demo components from `src/components/demos/sample/demos/`).

## Page Designs

### 1. Blocks Overview (`/blocks/`)

**Current state:** Single page with a 2-column acid-tile grid and long anchored detail sections for each block.

**New design:**
- Hero: `HeaderSplit` (paper surface), eyebrow "Nine blocks", headline "Built for portfolios and case studies.", body copy from sample.
- Grid: 3-column card grid linking to detail pages. Each card shows block icon, name, one-line description, and an acid "Explore" arrow.
- Closing banner: full-width acid surface with "All nine. Free. Forever." and a CTA to `/pricing/`.
- Remove the long anchored detail sections; the grid now links out.

### 2. Block Detail (`/blocks/[slug]/`)

**Current state:** Does not exist; detail content is inlined on `/blocks/`.

**New design:**
- Route: `src/pages/blocks/[slug].astro` using Astro file-based dynamic routing.
- Hero: `HeaderSplit` (paper surface). Left: eyebrow "Block", block name as headline, block description, link back to `/blocks/`. Right: a static block preview or icon at large scale.
- Demo section: full-width paper/alt surface containing the live block demo (reuse existing demo components from `src/components/demos/sample/demos/`).
- Controls table: list of controls/settings the block exposes (e.g., direction, easing, stagger, color), mapped from sample data.
- Accessibility note: a compact callout summarizing keyboard/screen-reader behavior.
- Prev/next nav: footer strip linking to the previous and next block in the defined order.

### 3. Pricing (`/pricing/`)

**Current state:** `HeaderSplit` hero, `PricingCards` full layout, build ledger table, risk-reversal section, FAQ.

**New design:**
- Keep brand page structure and `PricingCards` component.
- Refresh copy using sample pricing page content where it improves clarity (headlines, value props, founder pricing explanation).
- Replace the duplicated local ledger styles with the canonical `StatusLedger` pattern component.
- Add a sample-style transparency/risk-reversal box below the cards.
- FAQ content can be enriched from the sample if it adds marketing impact.

### 4. Hacks (`/hacks/`)

**Current state:** Single-column stacked recipe list with step-by-step prose.

**New design:**
- Hero: `HeaderSplit` (paper surface), eyebrow "Hacks", headline and body from sample.
- Grid: 2-column card grid of code recipes. Each card has a title, short description, code block with copy button, and "Paste it / Use it" steps.
- Closing CTA: brand founder-vault or newsletter CTA.

### 5. Contact (`/contact/`)

**Current state:** `HeaderSplit` hero with Netlify form and resources cards.

**New design:**
- Keep `HeaderSplit` layout and Netlify form attributes.
- Port sample form fields: name, email, topic radio group, message.
- Refresh left-side copy from sample.
- Keep resources cards (FAQ, GitHub community).

### 6. 404 (`/404/`)

**Current state:** Simple centered message with "Back home" CTA.

**New design:**
- Centered layout with headline "Not a block.", body copy, and two CTAs: "Back home" and "Browse blocks".
- Use paper surface and brand button styles.

## Data Model

Create `src/data/blocks.ts` that exports:

```ts
export interface BlockMeta {
  slug: string;
  name: string;
  description: string;
  icon: string; // SVG component name or path
  demoComponent: string; // identifier used by the detail page to render the matching demo
  controls: ControlRow[];
  accessibility: string;
}

export interface ControlRow {
  name: string;
  type: string;
  default: string;
  description: string;
}
```

This file powers both the blocks overview grid and the detail pages. The detail page maps `demoComponent` to the actual imported Astro demo via a local switch statement or record.

## Components to Create or Update

### New
- `src/components/patterns/BlockDetailLayout.astro` — detail-page shell (hero, demo, controls, accessibility, prev/next).
- `src/components/patterns/ControlsTable.astro` — props/controls table.
- `src/components/patterns/CodeCard.astro` — hack recipe card with copy-to-clipboard.

### Update
- `src/components/demos/sample/BlockCard.astro` and `BlockCardGrid.astro` — link to detail pages; ensure card styling matches brand surfaces.
- `src/pages/blocks.astro` — replace anchored detail sections with the new grid and closing banner.
- `src/pages/pricing.astro` — refresh copy, reuse `StatusLedger`, add risk-reversal box.
- `src/pages/hacks.astro` — restructure as 2-column recipe grid using `CodeCard`.
- `src/pages/contact.astro` — update form fields and copy.
- `src/pages/404.astro` — update message and CTAs.

## Routing

- `src/pages/blocks/[slug].astro` generates `/blocks/grid-reveal/`, `/blocks/text-reveal/`, etc.
- `getStaticPaths()` reads from `src/data/blocks.ts`.
- All existing anchor links (`#grid-reveal`, etc.) on `/blocks/` are replaced with links to detail routes.
- Add redirects or canonical links if needed to preserve any external bookmarks to old anchors.

## Acceptance Criteria

- [ ] `/blocks/` renders a 3-column card grid linking to all nine detail pages.
- [ ] Each `/blocks/[slug]/` page renders a HeaderSplit hero, live demo, controls table, accessibility note, and prev/next nav.
- [ ] `/pricing/` still builds and renders pricing cards, a ledger, risk-reversal, and FAQ using refreshed copy.
- [ ] `/hacks/` renders a 2-column recipe card grid with working copy buttons.
- [ ] `/contact/` renders the updated form with Netlify attributes intact.
- [ ] `/404/` renders the "Not a block." message with home and blocks CTAs.
- [ ] All pages build successfully (`npm run build` exits 0).
- [ ] Header surface logic works on all updated pages (no regressions from homepage-v1 fixes).
- [ ] No em dashes or AI-writing artifacts remain in new/updated copy.

## Risks and Open Questions

1. **Demo reuse:** Block demos currently live in `src/components/demos/sample/demos/` and may rely on IDs or page-scoped styles. They must render safely on detail pages without conflicting with each other.
2. **Content sourcing:** The sample's content is hardcoded in TSX. We'll transcribe/adapt it rather than automate conversion.
3. **Icon mapping:** The sample uses hand-drawn SVG icons in `icons.tsx`; the brand uses SVG files in `/public/assets/icons/blocks/`. Decide per-block whether to reuse the brand icon or port the sample icon.
4. **Scope creep:** This pass is intentionally limited to sample-equivalent pages. Support, roadmap, early-access, privacy, terms, and welcome are out of scope.

## Dependencies

- Existing homepage-v1 sample components (`src/components/demos/sample/*`).
- Existing brand pattern components (`HeaderSplit`, `PricingCards`, `StatusLedger`, `Accordion`, `Button`, `Footer`, `Header`).
- Astro static dynamic routes (`[slug].astro`).
