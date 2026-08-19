# Basalio Homepage Demo Variants — Design Spec

## Goal
Create four isolated homepage demo routes that re-skin Basalio's marketing homepage using the visual language of Semplice.com: massive type, high-contrast color blocking, full-bleed product imagery, editorial labels, and gallery-style block showcases. The demos keep Basalio's existing brand colors, fonts, and messaging; only the layout and visual treatment change.

## Audience
High-end designers, creative directors, and design agencies evaluating a premium WordPress plugin for portfolio and case-study sites.

## Constraints
- Keep Basalio brand tokens: `--acid` (#EDFF10), `--surface-ink` (near-black), `--surface-paper` (off-white), `--surface-alt`.
- Keep existing type system: Instrument Sans + Azeret Mono.
- No human photography, no emoji-style illustrations.
- Each demo is an isolated Astro page under `/homepage-v1` … `/homepage-v4`.
- Re-use existing components where possible; add new demo-only components as needed.
- All pages must pass `npm run verify:overflow` and `npm run verify:headings`.

## Shared Visual Principles (Semplice → Basalio)

1. **Typography as image.** Headlines are the primary visual. Use extreme scale contrast between the H1 and body.
2. **Color blocking.** Sections are flat, full-bleed fields of color (acid, ink, paper, alt) rather than gradients or photos.
3. **Editorial labels.** Small mono uppercase labels introduce sections: "BY DESIGNERS, FOR DESIGNERS" → "NINE BLOCKS, BUILT FOR WORDPRESS".
4. **Full-bleed showcases.** Blocks are presented like portfolio pieces or product screenshots, edge-to-edge.
5. **Restrained motion.** Motion is scroll-revealed and subtle; no carnival effects. Honor `prefers-reduced-motion`.
6. **Asymmetric grids.** Break the centered single-column rhythm with two-column editorial layouts.

## The Four Variants

### V1 — Color-Block Manifesto
- **Hero:** Acid yellow full-viewport field with one huge headline: "Framer-quality interactions, native to WordPress." Minimal mono eyebrow above, small body copy below, single CTA.
- **Value proposition:** Two-column text block on paper, like Semplice's sub-hero.
- **Block gallery:** Each block becomes a full-bleed color-block card (acid, ink, paper, alt alternating). Large number + block name + one-sentence description + live/static demo.
- **Social proof:** "Built for the kind of sites that win awards" section with logos or testimonial quotes.
- **CTA footer:** Ink band with founder pricing and a clear button.

### V2 — Cinematic Block Gallery
- **Hero:** Dark, full-screen live demo of one Basalio block (e.g., Text Reveal or Pinned Scroll) as the background. Headline overlays in the lower-left.
- **Block chapters:** Nine full-viewport sections, one per block. Scroll-linked transitions. Each section: block name as giant type, short description, live/static demo centered.
- **Navigation:** Fixed minimal progress indicator or block names on the right edge.
- **Closing:** Light paper section with pricing and CTA.

### V3 — Studio Product Site
- **Hero:** Clean studio layout. Left: manifesto headline. Right: live interactive Basalio block the user can play with (Magnetic Button or Custom Cursor).
- **Process strip:** Three editorial steps — "Pick a block", "Tune it in the editor", "Ship it" — with mono numbers.
- **Selected work:** Grid of three block demos presented like portfolio projects, with hover reveals.
- **Studio note:** A personal/editorial paragraph about why the plugin exists, signed "Basalio".
- **Footer CTA:** Simple, centered, high contrast.

### V4 — Editorial Case Study
- **Hero:** Magazine cover treatment. Large headline over a full-bleed abstract/interaction image. Date/issue label in mono.
- **Lead paragraph:** Two-column intro on paper.
- **Case studies:** Three deep-dive feature sections, each treating a block category as an editorial story (e.g., "The Reveal Family", "The Sequence Family", "The Interaction Layer").
- **Pull quotes:** Large quoted statements breaking the reading flow.
- **Credits/footer:** "Designed for WordPress" with a clean CTA.

## Component Plan

### Re-used from existing site
- `BaseLayout.astro` (canonical/OG already in place).
- `Header.astro`, `Footer.astro` (may hide footer newsletter on demo pages).
- `Button.astro`.
- Existing block data / helpers.

### New demo components (shared)
- `DemoHero.astro` — configurable hero shell (color, headline, eyebrow, CTA, optional live demo slot).
- `ColorBlockSection.astro` — full-bleed section with optional number, label, headline, body, demo slot.
- `BlockShowcase.astro` — portfolio-piece card for a block.
- `EditorialLabel.astro` — small mono uppercase label with optional line.
- `PullQuote.astro` — large quoted statement.
- `BlockGrid.astro` — asymmetric grid of block showcases.

### New demo components (variant-specific)
- `CinematicBlockChapter.astro` — full-viewport block section for V2.
- `InteractiveHeroDemo.astro` — client-side interactive Magnetic Button / Custom Cursor wrapper for V3.
- `CaseStudyFeature.astro` — editorial two-column feature for V4.

## Routes
- `/homepage-v1`
- `/homepage-v2`
- `/homepage-v3`
- `/homepage-v4`

All routes set `noindex` so they do not appear in sitemap/robots while being reviewed.

## Assets
- Generate abstract geometric/SVG hero images and block demo thumbnails that echo Semplice's clean graphic style.
- No human figures.
- Keep assets in `public/assets/demos/` with variant-prefixed names.

## Implementation Notes
- Each variant is a self-contained page so they can be compared side-by-side.
- CSS for demo components lives in the components to keep variants isolated.
- Avoid touching `index.astro`; these are previews only.
- After review, one variant will be promoted to the real homepage and the others removed or archived.

## Verification
- `npm run build` succeeds.
- `npm run verify:overflow` passes for all four routes.
- `npm run verify:headings` passes for all four routes.
