# Basalio Homepage Demo Variants — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build four isolated homepage demo routes (`/homepage-v1` … `/homepage-v4`) that re-skin Basalio's marketing homepage with a Semplice-inspired, high-end creative-agency visual language while keeping Basalio's existing brand colors, fonts, and messaging.

**Architecture:** Introduce a `src/components/demos/` component library plus a shared `src/data/blocks.ts` data source. Each variant is a self-contained Astro page that composes these shared and variant-specific components. Generated abstract assets live in `public/assets/demos/`. All demo pages are `noindex`.

**Tech Stack:** Astro 7, vanilla CSS in components, custom CSS tokens (`src/styles/tokens.css`), Instrument Sans + Azeret Mono, no React/Vue/Svelte.

**Spec:** `docs/superpowers/specs/2026-08-18-basalio-homepage-demos-design.md`

## Global Constraints
- Keep Basalio brand tokens: `--acid` (#EDFF10), `--surface-ink` (#1C1917), `--surface-paper` (#FFFFFF), `--surface-alt` (#FAFAFA).
- Keep existing type system: `--font-sans` (Instrument Sans) + `--font-mono` (Azeret Mono).
- No human photography, no emoji-style illustrations.
- Each demo is an isolated Astro page under `/homepage-v1` … `/homepage-v4`.
- All routes set `noindex`.
- Honor `prefers-reduced-motion` for any motion.
- `npm run build`, `npm run verify:overflow`, and `npm run verify:headings` must pass for all four routes.

---

## File Structure

```
src/
  data/
    blocks.ts                    # Shared block list + descriptions
  components/demos/
    DemoHero.astro               # Configurable hero shell
    ColorBlockSection.astro      # Full-bleed color-block section
    BlockShowcase.astro          # Portfolio-piece card
    EditorialLabel.astro         # Small mono uppercase label
    PullQuote.astro              # Large quoted statement
    BlockGrid.astro              # Asymmetric grid of showcases
    CinematicBlockChapter.astro  # Full-viewport block section (V2)
    InteractiveHeroDemo.astro    # Magnetic Button / Custom Cursor wrapper (V3)
    CaseStudyFeature.astro       # Editorial two-column feature (V4)
  pages/
    homepage-v1.astro
    homepage-v2.astro
    homepage-v3.astro
    homepage-v4.astro
public/assets/demos/
  v1-hero.svg
  v2-hero.svg
  v3-hero.svg
  v4-hero.svg
  block-*.svg                    # Abstract thumbnails for block showcases
```

---

### Task 1: Create shared block data source

**Files:**
- Create: `src/data/blocks.ts`

**Interfaces:**
- Produces: `BlockDemo` interface and `blocks` array exported for all variant pages.

- [ ] **Step 1: Define the block data**

```ts
export interface BlockDemo {
  id: string;
  name: string;
  headline: string;
  description: string;
  category: 'reveal' | 'sequence' | 'interaction';
}

export const blocks: BlockDemo[] = [
  {
    id: 'grid-reveal',
    name: 'Grid Reveal',
    headline: 'Content that cascades into view.',
    description: 'Reveal work in a cascading grid pattern as visitors scroll.',
    category: 'reveal',
  },
  // ... remaining 8 blocks
];

export const blockCategories = {
  reveal: 'The Reveal Family',
  sequence: 'The Sequence Family',
  interaction: 'The Interaction Layer',
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx astro check` (or `npm run build` as a heavier check)
Expected: No TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/blocks.ts
git commit -m "feat: add shared block data for homepage demos"
```

---

### Task 2: Create shared demo components

**Files:**
- Create: `src/components/demos/DemoHero.astro`
- Create: `src/components/demos/ColorBlockSection.astro`
- Create: `src/components/demos/BlockShowcase.astro`
- Create: `src/components/demos/EditorialLabel.astro`
- Create: `src/components/demos/PullQuote.astro`
- Create: `src/components/demos/BlockGrid.astro`

**Interfaces:**
- Consumes: `BlockDemo` from `src/data/blocks.ts`.
- Produces: shared Astro components with typed props.

- [ ] **Step 1: Create EditorialLabel.astro**

A small mono uppercase label with an optional horizontal rule.

Props:
```ts
interface Props {
  text: string;
  showLine?: boolean;
  color?: 'ink' | 'acid' | 'paper';
}
```

- [ ] **Step 2: Create DemoHero.astro**

A configurable full-viewport hero shell.

Props:
```ts
interface Props {
  surface: 'acid' | 'ink' | 'paper';
  eyebrow: string;
  headline: string;
  body?: string;
  cta?: { label: string; href: string; variant?: 'ink' | 'acid' | 'paper' };
  align?: 'left' | 'center';
  heroSlot?: boolean;
}
```

- [ ] **Step 3: Create ColorBlockSection.astro**

Full-bleed section with optional number, label, headline, body, and demo slot.

Props:
```ts
interface Props {
  surface: 'acid' | 'ink' | 'paper' | 'alt';
  number?: string;
  label?: string;
  headline?: string;
  body?: string;
  padded?: boolean;
}
```

- [ ] **Step 4: Create BlockShowcase.astro**

Portfolio-piece card for a single block.

Props:
```ts
interface Props {
  block: BlockDemo;
  index: number;
  surface?: 'acid' | 'ink' | 'paper' | 'alt';
  demo?: 'static' | 'minimal';
}
```

- [ ] **Step 5: Create PullQuote.astro**

Large quoted statement for editorial breaks.

Props:
```ts
interface Props {
  quote: string;
  attribution?: string;
  surface?: 'paper' | 'alt';
}
```

- [ ] **Step 6: Create BlockGrid.astro**

Asymmetric grid of `BlockShowcase` cards.

Props:
```ts
interface Props {
  blocks: BlockDemo[];
  layout?: 'masonry' | 'balanced';
}
```

- [ ] **Step 7: Build and verify no errors**

Run: `npm run build`
Expected: Build succeeds (no new pages yet, but components compile).

- [ ] **Step 8: Commit**

```bash
git add src/components/demos/
git commit -m "feat: add shared demo homepage components"
```

---

### Task 3: Generate abstract demo assets

**Files:**
- Create: `public/assets/demos/v1-hero.svg`
- Create: `public/assets/demos/v2-hero.svg`
- Create: `public/assets/demos/v3-hero.svg`
- Create: `public/assets/demos/v4-hero.svg`
- Create: `public/assets/demos/block-grid-reveal.svg`, etc. (9 block thumbnails)

**Interfaces:**
- Produces: SVG assets consumed by demo pages and components.

- [ ] **Step 1: Create hero SVGs**

Generate abstract geometric SVGs in Basalio colors:
- V1: bold typographic/acid geometric composition
- V2: dark, radiating lines / sequence motif
- V3: clean studio-style shapes
- V4: editorial/magazine cover graphic

No human figures, no emoji-style elements.

- [ ] **Step 2: Create block thumbnails**

One abstract SVG per block that hints at its behavior:
- Grid Reveal: staggered rectangles
- Text Reveal: fragmented letterforms
- Magnetic Button: displaced circle
- Before/After: split rectangle
- Filterable Grid: categorized squares
- Custom Cursor: ring + dot
- Scroll Sequence: stacked frames
- Pinned Scroll: sticky panel motif
- Case Study Transition: overlapping panels

- [ ] **Step 3: Verify assets build into dist**

Run: `npm run build`
Expected: `dist/assets/demos/` contains all SVGs.

- [ ] **Step 4: Commit**

```bash
git add public/assets/demos/
git commit -m "feat: add abstract demo homepage assets"
```

---

### Task 4: Build V1 — Color-Block Manifesto

**Files:**
- Create: `src/pages/homepage-v1.astro`

**Interfaces:**
- Consumes: shared demo components, `blocks` from `src/data/blocks.ts`, `pricingTiers` from `src/data/pricing.ts`.
- Produces: `/homepage-v1` route.

- [ ] **Step 1: Create the page**

Structure:
1. `BaseLayout` with `noindex`.
2. Header (existing `Header.astro`).
3. `DemoHero` — acid yellow, huge headline.
4. Two-column value proposition on paper.
5. `ColorBlockSection` block gallery with alternating surfaces, using `BlockShowcase`.
6. Social proof section on ink.
7. Founder pricing CTA on acid.
8. Footer with `hideNewsletter`.

- [ ] **Step 2: Run overflow and heading checks**

Run:
```bash
npm run build
PORT=4321 npm run verify:overflow
PORT=4321 npm run verify:headings
```
Expected: `/homepage-v1` passes.

- [ ] **Step 3: Commit**

```bash
git add src/pages/homepage-v1.astro
git commit -m "feat: add color-block manifesto homepage demo (v1)"
```

---

### Task 5: Build V2 — Cinematic Block Gallery

**Files:**
- Create: `src/components/demos/CinematicBlockChapter.astro`
- Create: `src/pages/homepage-v2.astro`

**Interfaces:**
- Consumes: `BlockDemo`, shared components.
- Produces: `/homepage-v2` route.

- [ ] **Step 1: Create CinematicBlockChapter.astro**

Full-viewport section for one block.

Props:
```ts
interface Props {
  block: BlockDemo;
  index: number;
  total: number;
  surface?: 'ink' | 'paper';
}
```

- [ ] **Step 2: Create the page**

Structure:
1. `BaseLayout` with `noindex`.
2. Fixed minimal progress indicator on the right.
3. Hero: full-screen dark demo background + lower-left headline.
4. Nine `CinematicBlockChapter` sections, one per block.
5. Closing paper section with pricing and CTA.
6. Footer with `hideNewsletter`.

- [ ] **Step 3: Run overflow and heading checks**

Run:
```bash
npm run build
PORT=4321 npm run verify:overflow
PORT=4321 npm run verify:headings
```
Expected: `/homepage-v2` passes.

- [ ] **Step 4: Commit**

```bash
git add src/components/demos/CinematicBlockChapter.astro src/pages/homepage-v2.astro
git commit -m "feat: add cinematic block gallery homepage demo (v2)"
```

---

### Task 6: Build V3 — Studio Product Site

**Files:**
- Create: `src/components/demos/InteractiveHeroDemo.astro`
- Create: `src/pages/homepage-v3.astro`

**Interfaces:**
- Consumes: shared components, `blocks`.
- Produces: `/homepage-v3` route.

- [ ] **Step 1: Create InteractiveHeroDemo.astro**

A client-side interactive Magnetic Button or Custom Cursor demo for the hero right column.

Props:
```ts
interface Props {
  type: 'magnetic' | 'cursor';
}
```

Use a `<script>` block with `matchMedia` checks for reduced motion and coarse pointers.

- [ ] **Step 2: Create the page**

Structure:
1. `BaseLayout` with `noindex`.
2. Hero: two-column studio layout (left manifesto, right interactive demo).
3. Process strip with three numbered editorial steps.
4. `BlockGrid` of three selected block demos as portfolio projects.
5. Studio note editorial paragraph.
6. Centered footer CTA.
7. Footer with `hideNewsletter`.

- [ ] **Step 3: Run overflow and heading checks**

Run:
```bash
npm run build
PORT=4321 npm run verify:overflow
PORT=4321 npm run verify:headings
```
Expected: `/homepage-v3` passes.

- [ ] **Step 4: Commit**

```bash
git add src/components/demos/InteractiveHeroDemo.astro src/pages/homepage-v3.astro
git commit -m "feat: add studio product site homepage demo (v3)"
```

---

### Task 7: Build V4 — Editorial Case Study

**Files:**
- Create: `src/components/demos/CaseStudyFeature.astro`
- Create: `src/pages/homepage-v4.astro`

**Interfaces:**
- Consumes: shared components, `blocks`, `blockCategories`.
- Produces: `/homepage-v4` route.

- [ ] **Step 1: Create CaseStudyFeature.astro**

Editorial two-column feature section for a block category.

Props:
```ts
interface Props {
  category: 'reveal' | 'sequence' | 'interaction';
  title: string;
  lead: string;
  blocks: BlockDemo[];
  surface?: 'paper' | 'alt';
}
```

- [ ] **Step 2: Create the page**

Structure:
1. `BaseLayout` with `noindex`.
2. Magazine-cover hero with full-bleed abstract image and issue/date label.
3. Two-column lead paragraph.
4. Three `CaseStudyFeature` sections for each category.
5. `PullQuote` editorial break.
6. Credits/footer CTA.
7. Footer with `hideNewsletter`.

- [ ] **Step 3: Run overflow and heading checks**

Run:
```bash
npm run build
PORT=4321 npm run verify:overflow
PORT=4321 npm run verify:headings
```
Expected: `/homepage-v4` passes.

- [ ] **Step 4: Commit**

```bash
git add src/components/demos/CaseStudyFeature.astro src/pages/homepage-v4.astro
git commit -m "feat: add editorial case study homepage demo (v4)"
```

---

### Task 8: Full verification and local preview

**Files:**
- Modify: `scripts/routes.js` (add demo routes to ALL_ROUTES for verification)

**Interfaces:**
- Consumes: all four demo pages.
- Produces: passing verification + runnable preview.

- [ ] **Step 1: Add demo routes to verification lists**

Update `scripts/routes.js` to include `/homepage-v1` … `/homepage-v4` in `ALL_ROUTES` and `HEADING_ROUTES` for verification. Keep them out of `PUBLIC_ROUTES` and `PRODUCTION_ROUTES` (they are noindex demos).

- [ ] **Step 2: Run full pre-deploy**

Run: `npm run pre-deploy`
Expected: All 6 gates pass.

- [ ] **Step 3: Start local preview**

Run: `npm run build && npx -y serve dist -l 4321`
Expected: Site serves at `http://localhost:4321/`; demo routes accessible.

- [ ] **Step 4: Commit verification update**

```bash
git add scripts/routes.js
git commit -m "chore: include homepage demo routes in verification lists"
```

---

## Self-Review

1. **Spec coverage:**
   - V1 Color-Block Manifesto → Task 4
   - V2 Cinematic Block Gallery → Task 5
   - V3 Studio Product Site → Task 6
   - V4 Editorial Case Study → Task 7
   - Shared components → Task 2
   - Abstract assets → Task 3
   - Verification → Task 8
   - No gaps identified.

2. **Placeholder scan:** No TBD/TODO, no vague steps. Each step includes concrete file paths, props, and verification commands.

3. **Type consistency:** `BlockDemo` is defined in Task 1 and consumed in Tasks 2, 4–7. `blockCategories` used in Task 7. Component prop names match across tasks.
