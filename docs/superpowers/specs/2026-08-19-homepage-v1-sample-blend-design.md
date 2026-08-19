# Homepage-v1 / Basalio-Sample Blend Design Spec

## Goal

Evolve the isolated `/homepage-v1/` demo into a unified blend of:

- **Basalio Astro identity** — acid brand color, existing `Header`, `Footer`, `Button`, menu, and surface-aware tokens.
- **Kimi-generated sample site (`/Users/angelomanzanojr/basalio-sample`)** — dark glowy product-shot aesthetic, live block demos, section rhythm, and block-highlighting patterns.

The result should feel like a single, premium design system rather than two sites stitched together, and it must remain a plain-CSS Astro project (no Tailwind/React added).

## Success Criteria

- `homepage-v1.astro` loads and passes `npm run pre-deploy`.
- All new visual elements use Basalio brand colors (`--acid`, `--surface-ink`, `--surface-paper`, `--surface-alt`) and existing overlay tokens.
- Header, footer, buttons, and menu remain the existing Basalio global components.
- No raster images of humans; all visuals are code (SVG/CSS) or existing brand assets.
- Animations loop or reveal on scroll and respect `prefers-reduced-motion`.
- The page links to existing `/blocks#slug` anchors (block detail pages are out of scope).

## Visual Language

### Palette Lock

- **Accent:** `--acid` (#EDFF10) replaces every blue/violet accent from the sample.
- **Backgrounds:** `--surface-ink`, `--surface-paper`, `--surface-alt`.
- **Text:** `--text-on-ink`, `--text-on-paper`, `--text-on-acid`, muted variants.
- **Overlays/Glass:** existing `--overlay-light-*` and `--overlay-dark-*` tokens.
- **Glows:** acid radial gradients with low opacity, e.g. `radial-gradient(circle at 30% 40%, rgba(237,255,16,0.18), transparent 45%)`.

### Typography

- Keep existing font stack: `Instrument Sans` + `Azeret Mono`.
- Hero display: `clamp(42px, 7vw, 92px)`, weight 700, letter-spacing `-0.03em`, line-height 1.05.
- Mono labels: `11px`, uppercase, `--label-letter-spacing`.
- Body: existing `--font-size-body`.

### Shared Patterns

- **Glass card:** `background: var(--overlay-light-05); border: 1px solid var(--overlay-light-08); backdrop-filter: blur(12px); border-radius: 16px;`
- **Lift hover:** `transform: translateY(-4px)` + stronger shadow on cards and shots.
- **Glow border:** 1px acid border with low opacity on hover for highlighted cards.

## Page Sections

### 1. Header

- Use existing `src/components/Header.astro` unchanged.
- Header surface-tracking script already observes `[data-surface]` sections; new sections must declare a surface.

### 2. Hero

**Layout:**
- Full-viewport dark section (`data-surface="ink"`).
- Two large radial glows behind the text (acid, low opacity).
- Centered text column: mono eyebrow, display headline, subheadline, two CTAs.
- Below text: `EditorShot` product mockup.

**Content:**
- Eyebrow: "A WordPress plugin for creatives"
- Headline: "Framer-quality interactions, native to WordPress."
- Body: "Nine curated interaction blocks built only for portfolio and case-study sites. No page builder, no premium theme, no circus."
- CTAs: primary `Button variant="acid"` → `/blocks`, secondary outline-style link → `/pricing` (local hero CTA, does not require a new global Button variant).

**Animation:**
- Text and shot fade/slide up via `.reveal` on scroll.
- Subtle floating/bob keyframe on the `EditorShot` (CSS, respect reduced motion).

**Component:** `src/components/demos/sample/EditorShot.astro` — port from sample, recolor blue → acid.

### 3. Studio Marquee

**Layout:**
- Full-width band on `--surface-ink`, top/bottom gradient fade masks.
- Infinite horizontal scroll of studio names/logos.

**Animation:**
- CSS `@keyframes marquee` translating `-50%`; pause on `prefers-reduced-motion`.

**Component:** `src/components/demos/sample/Marquee.astro`.

### 4. The Nine Blocks (Card Grid)

**Layout:**
- Section header centered on `--surface-ink`: mono label "The blocks", headline "Nine blocks. One plugin.", short description.
- Responsive 3-column grid of glass cards (1 col mobile, 2 col tablet, 3 col desktop).
- Each card links to `/blocks#slug`.

**Card content:**
- Block number `01–09`.
- Block icon (reuse existing `/public/assets/icons/blocks/{slug}.svg` via `?raw` import).
- Block name, category pill, one-line tagline.
- "See it live" arrow.

**Interaction:**
- Hover: lift + acid glow border.
- Entire card is clickable.

**Component:** `src/components/demos/sample/BlockCard.astro` + `BlockCardGrid.astro`.

### 5. Feature Sections (Nine)

**Layout:**
- Keep the current full-width, alternating-surface rhythm from `FeatureSection.astro`.
- Text left / demo right, alternating via `reverse`.
- Surfaces cycle: `alt`, `ink`, `acid`, `paper`, repeating.

**Demo slot:**
- Replace the previous abstract `BrowserFrame` mockups with ported live block demos from the sample:
  - `GridRevealDemo`
  - `TextRevealDemo`
  - `ScrollSequenceDemo`
  - `PinnedScrollDemo`
  - `BeforeAfterDemo`
  - `CaseStudyDemo`
  - `CustomCursorDemo`
  - `FilterableGridDemo`
  - `MagneticDemo`
- Each demo renders inside a shared dark `StageShell` (rounded rectangle, dark grid-lines background, optional replay button) instead of the browser chrome.
- Demos are interactive where the sample made them so (drag, hover, filter tabs).

**CTA:**
- Each `FeatureSection` keeps `href="/blocks"` → "Learn more" outline button.

**Components:**
- `src/components/demos/sample/StageShell.astro`
- `src/components/demos/sample/demos/*.astro` (one per block)

### 6. Comparison Table

**Layout:**
- `--surface-ink` section, centered narrow container.
- Three-column table: Basalio | Page builders | Framer.
- Rows: ease of use, native WordPress, no recurring fee, designer control, performance.
- Check / cross / partial markers.

**Component:** `src/components/demos/sample/ComparisonTable.astro`.

### 7. Stats

**Layout:**
- `--surface-alt` or `--surface-paper` band.
- 4-column animated counters (e.g. "9 blocks", "0 dependencies", "1 payment", "∞ sites").

**Animation:**
- `IntersectionObserver` triggers count-up from 0; disable on reduced motion.

**Component:** `src/components/demos/sample/Stats.astro`.

### 8. Testimonials

**Layout:**
- `--surface-ink` section.
- 3-column grid of glass cards.
- Quote, attribution, role.

**Component:** `src/components/demos/sample/Testimonials.astro`.

### 9. FAQ

**Layout:**
- `--surface-paper` section with dark text.
- Accordion of 4–5 questions from existing `src/data/faq.ts`.

**Interaction:**
- Single open item at a time.
- Animated chevron + height transition.

**Component:** `src/components/demos/sample/Faq.astro`.

### 10. Founder Pricing CTA

**Layout:**
- Keep the existing `pricing-section` from current `homepage-v1.astro`.
- `--surface-acid` band, two-column text + pricing card, existing `Button variant="ink"`.

### 11. Footer

- Use existing `src/components/Footer.astro` unchanged.

## Animation System

- **Scroll reveals:** reuse existing `.reveal` / `.reveal-visible` classes and global `IntersectionObserver` script. Target threshold `0.12`, rootMargin `-40px`.
- **Looping micro-animations:** CSS `@keyframes` for marquee, floating shots, cursor demos.
- **Interaction demos:** vanilla JS pointer/keyboard handlers for Before/After drag, Magnetic button, Custom cursor, Filterable tabs. Keep handlers local to each demo component.
- **Counters:** `IntersectionObserver` triggers a CSS custom-property count or JS number tween; respect reduced motion.
- **Reduced motion:** all animations flatten or freeze under `@media (prefers-reduced-motion: reduce)`.

## Components to Create

All new components live under `src/components/demos/sample/` to isolate the sample blend from the rest of the site.

| Component | Source | Notes |
|---|---|---|
| `EditorShot.astro` | sample `shots/EditorShot` | CSS/SVG editor mockup, acid accents |
| `ModuleGridShot.astro` | sample `shots/ModuleGridShot` | Optional spotlight visual |
| `TemplateGridShot.astro` | sample `shots/TemplateGridShot` | Optional spotlight visual |
| `PresetPanelShot.astro` | sample `shots/PresetPanelShot` | Optional spotlight visual |
| `Marquee.astro` | sample `Home.tsx` marquee | Infinite studio names |
| `BlockCard.astro` | sample `Blocks.tsx` card | Links to `/blocks#slug` |
| `BlockCardGrid.astro` | sample `Blocks.tsx` grid | Wraps 9 BlockCards |
| `StageShell.astro` | sample demos `StageShell` | Dark stage for live demos |
| `demos/GridRevealDemo.astro` | sample demos | Scroll-triggered tile reveal |
| `demos/TextRevealDemo.astro` | sample demos | Character/line reveal |
| `demos/ScrollSequenceDemo.astro` | sample demos | Stepped sequence |
| `demos/PinnedScrollDemo.astro` | sample demos | Pinned narrative |
| `demos/BeforeAfterDemo.astro` | sample demos | Draggable slider |
| `demos/CaseStudyDemo.astro` | sample demos | Card transition |
| `demos/CustomCursorDemo.astro` | sample demos | Local custom cursor |
| `demos/FilterableGridDemo.astro` | sample demos | Filter tabs + grid |
| `demos/MagneticDemo.astro` | sample demos | Magnetic hover button |
| `ComparisonTable.astro` | sample `Home.tsx` table | Basalio vs others |
| `Stats.astro` | sample `Home.tsx` stats | Animated counters |
| `Testimonials.astro` | sample `Home.tsx` testimonials | Glass cards |
| `Faq.astro` | sample `Faq.tsx` | Accordion |
| `RevealWrapper.astro` | sample `Reveal.tsx` | Reuse existing `.reveal` instead; no new wrapper needed |

## Components to Modify

- `src/pages/homepage-v1.astro` — rewrite section composition.
- `src/components/demos/FeatureSection.astro` — optionally adjust spacing/padding to fit denser page; no breaking changes.
- `src/styles/tokens.css` — add any missing overlay/acid tokens if discovered during porting.

## Assets

- Reuse existing block icons from `/public/assets/icons/blocks/{slug}.svg`.
- No new raster images.
- All product shots and demos are inline CSS/SVG.

## Accessibility

- All demos usable via keyboard where the sample supported it.
- `prefers-reduced-motion` disables marquee, counters, and demo motion.
- `aria-expanded` on FAQ items.
- Focus indicators match existing Basalio focus styles.

## Verification

- `npm run build` exits 0.
- `npm run pre-deploy` passes all 6 gates.
- Rendered page contains 1 hero, 1 marquee, 9 block cards, 9 feature sections, 1 comparison table, 1 stats band, 3 testimonials, 1 FAQ, 1 pricing CTA.
- No references to sample's blue hex `#4c7dff` remain in the new components.

## Out of Scope

- Other homepage demos (`homepage-v2/3/4`) remain untouched.
- Other routes (`/blocks`, `/pricing`, `/hacks`, `/contact`) remain untouched.
- Individual block detail routes are not created; block cards link to existing `/blocks#slug` anchors.
- No new dependencies (Tailwind, React, GSAP, etc.) are added.

## Notes / Open Questions

1. The sample's `EditorShot` and demo components use Tailwind utility classes. They will be ported to scoped Astro `<style>` blocks using Basalio tokens. This is the largest implementation cost.
2. If any sample visual cannot be cleanly expressed without a new token, add it to `tokens.css` rather than hardcoding a one-off color.
3. The FAQ content should be drawn from `src/data/faq.ts` if available; otherwise reuse sample FAQ copy.
