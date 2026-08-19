# Homepage-v1 Sample Blend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `src/pages/homepage-v1.astro` as a hybrid of the Basalio Astro brand system and the Kimi-generated sample site (`/Users/angelomanzanojr/basalio-sample`), keeping Basalio's header/footer/buttons/menu/acid brand and porting the sample's dark glowy hero, product shots, block cards, live demos, comparison table, stats, testimonials, and FAQ.

**Architecture:** All new components live under `src/components/demos/sample/`. Shared sample-specific styles live in `sample-styles.css` and are imported once by the page. Each component is an `.astro` file with scoped markup and, where needed, a small inline `<script>` for interaction. No Tailwind, React, or new dependencies are added; all motion is CSS + vanilla JS.

**Tech Stack:** Astro 7, plain CSS, inline SVG, IntersectionObserver, `requestAnimationFrame`.

**Spec:** `docs/superpowers/specs/2026-08-19-homepage-v1-sample-blend-design.md`

## Global Constraints

- Basalio brand colors only: `--acid`, `--surface-ink`, `--surface-paper`, `--surface-alt`, plus existing overlay tokens.
- No raster images of humans; all visuals are code (SVG/CSS) or existing brand assets.
- Keep existing `Header.astro`, `Footer.astro`, `Button.astro`, and menu unchanged.
- No new runtime dependencies (Tailwind, React, GSAP, Framer Motion, Lottie, etc.).
- Respect `prefers-reduced-motion`.
- Every task ends with a working build check (`npm run build`).
- Block cards link to existing `/blocks#slug` anchors (no new detail routes).
- Prefix sample-specific utility classes with `sample-` to avoid collisions with Basalio globals.

---

## File Structure

```
src/components/demos/sample/
  sample-styles.css          # shared prefixed utilities + keyframes
  SampleIcons.astro          # inline SVG icons ported from sample icons.tsx
  EditorShot.astro           # hero product mockup
  Marquee.astro              # infinite studio logo bar
  BlockCard.astro            # individual block card
  BlockCardGrid.astro        # 9-card grid
  StageShell.astro           # dark stage wrapper for live demos
  ComparisonTable.astro      # Basalio vs others table
  Stats.astro                # animated counter band
  Testimonials.astro         # 3 glass testimonial cards
  Faq.astro                  # accordion
  demos/
    GridRevealDemo.astro
    TextRevealDemo.astro
    ScrollSequenceDemo.astro
    PinnedScrollDemo.astro
    BeforeAfterDemo.astro
    CaseStudyDemo.astro
    CustomCursorDemo.astro
    FilterableGridDemo.astro
    MagneticDemo.astro
src/pages/homepage-v1.astro  # rewritten composition
```

---

### Task 1: Create shared sample styles and icons

**Files:**
- Create: `src/components/demos/sample/sample-styles.css`
- Create: `src/components/demos/sample/SampleIcons.astro`

**Interfaces:**
- Produces: `.sample-display`, `.sample-mono-label`, `.sample-glass`, `.sample-lift`, `.sample-slats`, `.sample-stage`, `.sample-stage-grid-lines`, `.sample-gr-item`, `.sample-gr-on`, `.sample-tr-char`, `.sample-tr-on`, `.sample-marquee`, `.sample-acc-body`, `.sample-acc-icon`, keyframes.

- [ ] **Step 1: Port and prefix CSS utilities**

  Read `basalio-sample/src/index.css`. Copy the rules needed by the new components, prefixing every class with `sample-` and replacing sample color vars with Basalio tokens:

  | Sample var | Basalio replacement |
  |---|---|
  | `--accent` / `#4c7dff` | `--acid` |
  | `--accent-deep` / `#2e5cff` | `--surface-ink` or `--acid` for dark-on-acid contexts |
  | `--accent-soft` / `#7da2ff` | `--acid` or `--surface-paper` |
  | `--accent-ink` | `--surface-ink` |
  | `--violet` | omit or replace with `--acid` |
  | `--bg` / `--bg-2` | `--surface-ink` |
  | `--surface` / `--surface-2` / `--surface-3` | `--surface-ink` / `--surface-alt` |
  | `--ink` / `--ink-2` / `--ink-3` | `--text-on-ink` / `--text-on-ink-muted` |
  | `--line` | `var(--overlay-light-08)` |
  | `--line-strong` | `var(--overlay-light-15)` |
  | `--glass-1` / `--glass-2` / `--glass-3` | `var(--overlay-light-05)` / `var(--overlay-light-08)` / `rgba(28,25,23,0.72)` |

  Include at minimum:
  - `.sample-display` (tight bold headline)
  - `.sample-mono-label` (uppercase mono label)
  - `.sample-glass`, `.sample-glass-2` (glass panels)
  - `.sample-lift` (hover lift)
  - `.sample-slats` + `slat-shimmer` keyframes
  - `.sample-stage`, `.sample-stage-grid-lines`
  - `.sample-gr-item` + `.sample-gr-on` + `gridRevealIn` keyframes
  - `.sample-tr-char` + `.sample-tr-on`
  - `.sample-marquee` + `marquee` keyframe
  - `.sample-acc-body`, `.sample-acc-icon` + accordion transitions
  - `.sample-glow-hover` (acid glow border on hover)
  - `.sample-bob` + `bob` keyframe
  - reduced-motion overrides that freeze/disable all of the above.

- [ ] **Step 2: Create icon component**

  Read `basalio-sample/src/components/icons.tsx`. Create `SampleIcons.astro` that accepts a `name` prop and renders the matching inline SVG. The minimum set needed:
  - `type`, `image`, `columns`, `gallery`, `sparkle`, `sliders`, `gear`, `mobile`, `history`, `eye`, `check`, `chevron`, `duplicate`, `trash`, `plus`, `arrowRight`.

  Example interface:
  ```astro
  ---
  interface Props { name: string; size?: number; class?: string }
  const { name, size = 16, class: className = '' } = Astro.props;
  ---
  <svg class={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- paths per name -->
  </svg>
  ```

- [ ] **Step 3: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/demos/sample/sample-styles.css src/components/demos/sample/SampleIcons.astro
  git commit -m "feat: add shared sample-blend styles and icons"
  ```

---

### Task 2: Create EditorShot hero mockup

**Files:**
- Create: `src/components/demos/sample/EditorShot.astro`
- Source: `basalio-sample/src/components/shots/EditorShot.tsx`

**Interfaces:**
- Consumes: `SampleIcons`, `sample-styles.css` classes.
- Produces: `EditorShot` component with no props.

- [ ] **Step 1: Port EditorShot to Astro**

  Convert the React component to Astro:
  - Replace JSX conditional classes with Astro template logic.
  - Replace `useState`/`useEffect` px ticker with a small inline `<script>` that updates the `.px-value` span every 1400ms through the sequence `[47, 48, 48, 47, 46, 47]`.
  - Use `SampleIcons` for all icons.
  - Replace all blue gradients with acid-compatible or ink-compatible alternatives. For example, the hero canvas gradient `linear-gradient(155deg, #24365e 0%, #16223f 38%, #0b1020 78%, #070a14 100%)` becomes `linear-gradient(155deg, #1C1917 0%, #121110 38%, #0a0908 78%, #000 100%)` or a subtle acid-tinted dark gradient `linear-gradient(155deg, rgba(237,255,16,0.08), transparent 60%)` layered over `--surface-ink`.
  - Replace the blue radial glow with an acid radial glow using `rgba(237,255,16,0.16)`.
  - Replace the blue `.sp-box.hot` shadow with acid: `box-shadow: 0 0 0 3px rgba(237,255,16,0.25)`.
  - Replace the `HandCursor` SVG inline (port the relevant paths from `basalio-sample/src/components/HandCursor.tsx`) or simplify to a CSS pointer.

- [ ] **Step 2: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/demos/sample/EditorShot.astro
  git commit -m "feat: add acid-recolored EditorShot hero mockup"
  ```

---

### Task 3: Create Marquee component

**Files:**
- Create: `src/components/demos/sample/Marquee.astro`

**Interfaces:**
- Props: `items: string[]`
- Produces: infinite-scrolling `.sample-marquee` band.

- [ ] **Step 1: Write Marquee.astro**

  ```astro
  ---
  interface Props { items: string[] }
  const { items } = Astro.props;
  ---
  <div class="sample-marquee-wrap">
    <div class="sample-marquee" aria-hidden="false">
      {items.map((s) => <span class="sample-marquee-item">{s}</span>)}
      {items.map((s) => <span class="sample-marquee-item" aria-hidden="true">{s}</span>)}
    </div>
  </div>
  ```

  Add scoped styles using `.sample-marquee` from `sample-styles.css`.

- [ ] **Step 2: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/demos/sample/Marquee.astro
  git commit -m "feat: add studio marquee component"
  ```

---

### Task 4: Create BlockCard and BlockCardGrid

**Files:**
- Create: `src/components/demos/sample/BlockCard.astro`
- Create: `src/components/demos/sample/BlockCardGrid.astro`

**Interfaces:**
- `BlockCard.astro` props:
  - `number: string`
  - `name: string`
  - `category: string`
  - `tagline: string`
  - `href: string`
  - `iconSvg: string` (raw SVG string)
- `BlockCardGrid.astro` props:
  - `blocks: { id, name, category, headline }[]` (uses Basalio `blocks` data shape)

- [ ] **Step 1: Write BlockCard.astro**

  Port the card markup from `basalio-sample/src/pages/Blocks.tsx` lines 24–50. Use Basalio tokens, `sample-glass`, `sample-lift`, `sample-glow-hover`. Render the icon via `set:html={iconSvg}`. Add hover arrow animation.

- [ ] **Step 2: Write BlockCardGrid.astro**

  ```astro
  ---
  import BlockCard from './BlockCard.astro';
  import { blocks, blockCategories } from '../../../data/blocks';
  import { getBlockIcon } from './SampleIcons.astro'; // or import glob helper
  ---
  <div class="sample-block-grid">
    {blocks.map((b, i) => (
      <BlockCard
        number={`0${i + 1}`}
        name={b.name}
        category={blockCategories[b.category]}
        tagline={b.headline}
        href={`/blocks#${b.id}`}
        iconSvg={/* import b.id icon */}
      />
    ))}
  </div>
  ```

  To load icons, use the same pattern as `src/pages/blocks.astro`:
  ```ts
  const icons = import.meta.glob('/public/assets/icons/blocks/*.svg', { query: '?raw', import: 'default', eager: true });
  const iconFor = (id: string) => icons[`/public/assets/icons/blocks/${id}.svg`] as string;
  ```

- [ ] **Step 3: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/demos/sample/BlockCard.astro src/components/demos/sample/BlockCardGrid.astro
  git commit -m "feat: add nine-block card grid"
  ```

---

### Task 5: Create StageShell for live demos

**Files:**
- Create: `src/components/demos/sample/StageShell.astro`

**Interfaces:**
- Props: `label: string`, `children` (slot), optional `onReplay?: string` (client-side replay handler name)
- Produces: dark rounded stage with grid lines, label, optional replay button.

- [ ] **Step 1: Port StageShell**

  Source: `basalio-sample/src/components/demos/demos-a.tsx` lines 4–19.

  ```astro
  ---
  interface Props { label: string; showReplay?: boolean }
  const { label, showReplay = false } = Astro.props;
  ---
  <div class="sample-stage sample-stage-grid-lines" data-stage-label={label}>
    <span class="sample-stage-label">{label}</span>
    {showReplay && <button class="sample-stage-replay" type="button">↺ Replay</button>}
    <slot />
  </div>
  ```

  Add scoped CSS for label/replay positioning; grid-line background is in `sample-styles.css`.

- [ ] **Step 2: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/demos/sample/StageShell.astro
  git commit -m "feat: add StageShell demo wrapper"
  ```

---

### Task 6: Create Reveal family demos (GridReveal, TextReveal)

**Files:**
- Create: `src/components/demos/sample/demos/GridRevealDemo.astro`
- Create: `src/components/demos/sample/demos/TextRevealDemo.astro`
- Source: `basalio-sample/src/components/demos/demos-a.tsx`

**Interfaces:**
- Each consumes `StageShell` and returns a live demo.
- Produces: demos with replay via a `runId` state managed in a client `<script>`.

- [ ] **Step 1: Port GridRevealDemo**

  Convert the React component. Use a `<script>` that:
  - Watches the stage with `IntersectionObserver` (threshold 0.35).
  - On enter, adds `.sample-gr-on` to the grid.
  - On Replay click, removes `.sample-gr-on`, forces reflow, re-adds it.
  - Replace blue gradients with acid-tinted or ink-friendly gradients.

- [ ] **Step 2: Port TextRevealDemo**

  Split the sentence into characters wrapped in `<span class="sample-tr-char">` with inline `--d` delays. Toggle `.sample-tr-on` via IntersectionObserver / replay.

- [ ] **Step 3: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/demos/sample/demos/GridRevealDemo.astro src/components/demos/sample/demos/TextRevealDemo.astro
  git commit -m "feat: add GridReveal and TextReveal live demos"
  ```

---

### Task 7: Create Sequence family demos (ScrollSequence, PinnedScroll)

**Files:**
- Create: `src/components/demos/sample/demos/ScrollSequenceDemo.astro`
- Create: `src/components/demos/sample/demos/PinnedScrollDemo.astro`
- Source: `basalio-sample/src/components/demos/demos-b.tsx`

**Interfaces:**
- Each consumes `StageShell`.

- [ ] **Step 1: Port ScrollSequenceDemo**

  Use a client `<script>` with `requestAnimationFrame` to cycle through 3 steps on a 6.6s loop while the stage is in view. Update progress rail height and active dot classes.

- [ ] **Step 2: Port PinnedScrollDemo**

  Use a scrollable inner panel inside the stage. On `scroll`, update `p = scrollTop / (scrollHeight - clientHeight)` and highlight the active narrative step. Replace blue gradient with acid-tinted dark gradient.

- [ ] **Step 3: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/demos/sample/demos/ScrollSequenceDemo.astro src/components/demos/sample/demos/PinnedScrollDemo.astro
  git commit -m "feat: add ScrollSequence and PinnedScroll live demos"
  ```

---

### Task 8: Create Interaction demos part 1 (BeforeAfter, CaseStudy)

**Files:**
- Create: `src/components/demos/sample/demos/BeforeAfterDemo.astro`
- Create: `src/components/demos/sample/demos/CaseStudyDemo.astro`
- Source: `basalio-sample/src/components/demos/demos-a.tsx`

**Interfaces:**
- Each consumes `StageShell`.

- [ ] **Step 1: Port BeforeAfterDemo**

  Convert drag logic to vanilla JS pointer events. Maintain `pos` state in a `<script>`. Support ArrowLeft/ArrowRight keyboard. Replace blue gradient with acid-tinted gradient. Divider handle uses `--surface-paper` and `--surface-ink`.

- [ ] **Step 2: Port CaseStudyDemo**

  Maintain `idx` and `prev` state in a `<script>`. On prev/next click, update classes/styles to crossfade cards. Replace blue gradients with acid-compatible dark gradients. Progress dots use `--acid` for active.

- [ ] **Step 3: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/demos/sample/demos/BeforeAfterDemo.astro src/components/demos/sample/demos/CaseStudyDemo.astro
  git commit -m "feat: add BeforeAfter and CaseStudy live demos"
  ```

---

### Task 9: Create Interaction demos part 2 (CustomCursor, FilterableGrid, Magnetic)

**Files:**
- Create: `src/components/demos/sample/demos/CustomCursorDemo.astro`
- Create: `src/components/demos/sample/demos/FilterableGridDemo.astro`
- Create: `src/components/demos/sample/demos/MagneticDemo.astro`
- Source: `basalio-sample/src/components/demos/demos-b.tsx` and `demos-a.tsx`

**Interfaces:**
- Each consumes `StageShell`.

- [ ] **Step 1: Port CustomCursorDemo**

  Use a client `<script>` with `requestAnimationFrame` to lerp a local ring/dot inside the stage on `pointermove`. Grow ring on link hover. Disable for touch/coarse pointers.

- [ ] **Step 2: Port FilterableGridDemo**

  Maintain `active` filter in a `<script>`. On tab click, toggle visibility/scale/filter of grid items. Active tab uses `--acid` background/border and `--surface-ink` text.

- [ ] **Step 3: Port MagneticDemo**

  Use `pointermove` within the stage to pull the button toward the cursor within 120px, spring back on leave. Button uses `--acid` background.

- [ ] **Step 4: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/demos/sample/demos/CustomCursorDemo.astro src/components/demos/sample/demos/FilterableGridDemo.astro src/components/demos/sample/demos/MagneticDemo.astro
  git commit -m "feat: add CustomCursor, FilterableGrid, and Magnetic live demos"
  ```

---

### Task 10: Create ComparisonTable

**Files:**
- Create: `src/components/demos/sample/ComparisonTable.astro`
- Source: `basalio-sample/src/pages/Home.tsx` lines 273–314

**Interfaces:**
- Props: none (data hardcoded in component).
- Produces: glass comparison table with check/cross/partial markers.

- [ ] **Step 1: Port comparison table**

  Convert the JSX table to Astro. Use `SampleIcons` for the checkmark. Basalio column uses `--acid` badge. Other columns use `--text-on-ink-muted`.

- [ ] **Step 2: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/demos/sample/ComparisonTable.astro
  git commit -m "feat: add comparison table component"
  ```

---

### Task 11: Create Stats band

**Files:**
- Create: `src/components/demos/sample/Stats.astro`
- Source: `basalio-sample/src/components/Counter.tsx`

**Interfaces:**
- Props: `items: { value: number; suffix?: string; label: string }[]`
- Produces: 4-column counter band.

- [ ] **Step 1: Write Stats.astro**

  Render the items. For each value, add a client `<script>` that counts up from 0 to the target when the stat enters the viewport, respecting `prefers-reduced-motion`.

- [ ] **Step 2: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/demos/sample/Stats.astro
  git commit -m "feat: add animated stats band"
  ```

---

### Task 12: Create Testimonials

**Files:**
- Create: `src/components/demos/sample/Testimonials.astro`
- Source: `basalio-sample/src/pages/Home.tsx` lines 359–403

**Interfaces:**
- Props: none (data hardcoded in component).
- Produces: 3-column glass testimonial cards.

- [ ] **Step 1: Port testimonials**

  Convert to Astro. Use `sample-glass`, `sample-lift`. Avatar gradients can use acid-tinted dark gradients or `--surface-ink`.

- [ ] **Step 2: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/demos/sample/Testimonials.astro
  git commit -m "feat: add testimonials component"
  ```

---

### Task 13: Create FAQ accordion

**Files:**
- Create: `src/components/demos/sample/Faq.astro`
- Source: `basalio-sample/src/components/Faq.tsx`

**Interfaces:**
- Props: `items: { question: string; answer: string }[]`
- Produces: accordion with one item open at a time.

- [ ] **Step 1: Port Faq**

  Use a client `<script>` that toggles `.open` on click and updates `aria-expanded`. Use `sample-acc-body` / `sample-acc-icon` classes from `sample-styles.css`.

- [ ] **Step 2: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/demos/sample/Faq.astro
  git commit -m "feat: add FAQ accordion component"
  ```

---

### Task 14: Compose the new homepage-v1.astro

**Files:**
- Modify: `src/pages/homepage-v1.astro`

**Interfaces:**
- Consumes: all components created above, existing `BaseLayout`, `Header`, `Footer`, `Button`, `EditorialLabel`, `FeatureSection`, pricing data.
- Produces: full blended page.

- [ ] **Step 1: Rewrite page composition**

  Keep imports for `BaseLayout`, `Header`, `Footer`, `Button`, `FeatureSection`, pricing data.
  Add imports for sample components and `sample-styles.css`.

  Import icons for block cards:
  ```ts
  const blockIcons = import.meta.glob('/public/assets/icons/blocks/*.svg', { query: '?raw', import: 'default', eager: true });
  ```

  Import FAQ data:
  ```ts
  import { getFaqs } from '../data/faq';
  import { POST_CAP_PRICE, proShipTarget } from '../data/pricing'; // verify export name
  const faqs = getFaqs(POST_CAP_PRICE, proShipTarget);
  ```

  Section order:
  1. Hero (`data-surface="ink"`) with `EditorShot`.
  2. Marquee (`data-surface="ink"`).
  3. Block card grid (`data-surface="ink"`).
  4. Nine `FeatureSection`s with live demos (`alt`, `ink`, `acid`, `paper` cycling).
  5. Comparison table (`data-surface="ink"`).
  6. Stats (`data-surface="alt"`).
  7. Testimonials (`data-surface="ink"`).
  8. FAQ (`data-surface="paper"`).
  9. Existing founder pricing CTA (`data-surface="acid"`).

  Use existing `.reveal` class on section inner containers and keep the existing scroll-reveal `<script>` (with reduced-motion guard).

- [ ] **Step 2: Build and verify**

  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 3: Commit**

  ```bash
  git add src/pages/homepage-v1.astro
  git commit -m "feat: compose blended homepage-v1"
  ```

---

### Task 15: Verify pre-deploy and finish

**Files:**
- Modify: `docs/superpowers/sdd/.../progress.md` (optional update)

**Interfaces:**
- Produces: passing `npm run pre-deploy`.

- [ ] **Step 1: Run pre-deploy**

  Run: `npm run pre-deploy`
  Expected: all 6 gates pass, including `/homepage-v1/` at all viewports.

- [ ] **Step 2: Visual spot-check**

  Start preview: `npm run preview`
  Open `http://localhost:4321/homepage-v1/` and confirm:
  - Hero has acid glows and `EditorShot`.
  - Marquee scrolls.
  - 9 block cards render with icons and link to `/blocks#slug`.
  - 9 feature sections render with live demos.
  - Comparison, stats, testimonials, FAQ, pricing CTA, footer all present.
  - No blue colors remain.

- [ ] **Step 3: Commit final fixes if any**

  If any fixes were needed, commit them.

- [ ] **Step 4: Update SDD ledger**

  Append to `.superpowers/sdd/2026-08-19-homepage-v1-sample-blend/progress.md`:
  ```markdown
  Blend implementation complete (all tasks, pre-deploy pass).
  ```

---

## Spec Coverage Check

| Spec Section | Task(s) |
|---|---|
| Hero with acid glows + EditorShot | Task 2, Task 14 |
| Studio marquee | Task 3, Task 14 |
| Nine-block card grid | Task 4, Task 14 |
| Feature sections with live demos | Tasks 5–9, Task 14 |
| Comparison table | Task 10, Task 14 |
| Stats counters | Task 11, Task 14 |
| Testimonials | Task 12, Task 14 |
| FAQ accordion | Task 13, Task 14 |
| Founder pricing CTA + footer | Task 14 (existing components) |
| Shared styles, no Tailwind, acid palette | Task 1, all component tasks |
| Reduced motion + accessibility | Task 1 (CSS), per-component scripts |
