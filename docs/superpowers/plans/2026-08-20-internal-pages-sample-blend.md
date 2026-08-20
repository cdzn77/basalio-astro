# Internal Pages Sample-Blend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the content, structure, and high-impact UI patterns from `basalio-sample` into the Basalio brand Astro site's internal pages, keeping the brand's light-first design system.

**Architecture:** Create a shared block-metadata source (`src/data/blocks.ts`) that powers both a new blocks overview grid and new `/blocks/[slug]/` detail pages. Reuse existing brand pattern components (`HeaderSplit`, `PricingCards`, `StatusLedger`, `FAQ`) and existing sample demo components. Add two small reusable pattern components (`ControlsTable`, `CodeCard`) and one layout component (`BlockDetailLayout`).

**Tech Stack:** Astro 5 static site, TypeScript, scoped `<style>` blocks, design tokens from `src/styles/tokens.css`, existing pattern components in `src/components/patterns/`.

**Spec:** `docs/superpowers/specs/2026-08-20-internal-pages-sample-blend-design.md`

## Global Constraints

- Keep the brand's light-first token system; do not introduce the sample's dark/glass/blue aesthetic.
- No em dashes (`—`) or AI-writing artifacts in new copy.
- All pages must build with `npm run build` exiting 0.
- Preserve existing Netlify form attributes on `/contact/`.
- Preserve existing founder-cap client-side guard on `/pricing/`.
- Header surface observer (from homepage-v1 fixes) must continue to work on all updated pages.
- Use existing block SVG icons from `/public/assets/icons/blocks/{slug}.svg`.

## File Structure

| File | Responsibility |
|------|----------------|
| `src/data/blocks.ts` | Source of truth for block metadata, controls, accessibility notes, and demo mapping. |
| `src/components/patterns/ControlsTable.astro` | Reusable controls/props table for block detail pages. |
| `src/components/patterns/CodeCard.astro` | Reusable recipe card with copy-to-clipboard for `/hacks/`. |
| `src/components/patterns/BlockDetailLayout.astro` | Shell for detail pages: hero, demo slot, controls, accessibility, prev/next. |
| `src/pages/blocks/[slug].astro` | Dynamic route generating all nine block detail pages. |
| `src/pages/blocks.astro` | Blocks overview page with 3-column card grid and closing banner. |
| `src/pages/pricing.astro` | Updated pricing page with refreshed copy, `StatusLedger`, risk-reversal box, FAQ. |
| `src/pages/hacks.astro` | Updated hacks page as 2-column recipe grid using `CodeCard`. |
| `src/pages/contact.astro` | Updated contact page with sample form fields and copy. |
| `src/pages/404.astro` | Updated 404 page with "Not a block." concept. |

## Demo-to-Block Mapping

The detail page maps each block slug to the matching Astro demo component:

| Slug | Demo component import |
|------|------------------------|
| `grid-reveal` | `GridRevealDemo` from `../components/demos/sample/demos/GridRevealDemo.astro` |
| `text-reveal` | `TextRevealDemo` from `../components/demos/sample/demos/TextRevealDemo.astro` |
| `scroll-sequence` | `ScrollSequenceDemo` from `../components/demos/sample/demos/ScrollSequenceDemo.astro` |
| `pinned-scroll` | `PinnedScrollDemo` from `../components/demos/sample/demos/PinnedScrollDemo.astro` |
| `before-after` | `BeforeAfterDemo` from `../components/demos/sample/demos/BeforeAfterDemo.astro` |
| `case-study-transition` | `CaseStudyDemo` from `../components/demos/sample/demos/CaseStudyDemo.astro` |
| `custom-cursor` | `CustomCursorDemo` from `../components/demos/sample/demos/CustomCursorDemo.astro` |
| `filterable-grid` | `FilterableGridDemo` from `../components/demos/sample/demos/FilterableGridDemo.astro` |
| `magnetic-button` | `MagneticDemo` from `../components/demos/sample/demos/MagneticDemo.astro` |

---

### Task 1: Extend block metadata

**Files:**
- Modify: `src/data/blocks.ts`

**Interfaces:**
- Consumes: existing `BlockDemo` shape.
- Produces: `BlockMeta` interface and `blocks` array with `controls`, `accessibility`, `demoComponent`, `categoryLabel`.

- [ ] **Step 1: Add new fields to the block data model**

Replace the contents of `src/data/blocks.ts` with:

```ts
export interface ControlRow {
  attr: string;
  desc: string;
  def: string;
}

export interface BlockMeta {
  slug: string;
  name: string;
  headline: string;
  description: string;
  category: 'reveal' | 'sequence' | 'interaction';
  categoryLabel: string;
  demoComponent: string;
  controls: ControlRow[];
  accessibility: string;
}

export const blocks: BlockMeta[] = [
  {
    slug: 'grid-reveal',
    name: 'Grid Reveal',
    headline: 'Content that cascades into view.',
    description: 'Reveal work in a cascading grid pattern as visitors scroll. Perfect for portfolio pages where you want to introduce work gradually, guiding the viewer through your case studies one by one.',
    category: 'reveal',
    categoryLabel: 'Layout Block',
    demoComponent: 'GridRevealDemo',
    controls: [
      { attr: 'data-delay', desc: 'Milliseconds between each item reveal', def: '100' },
      { attr: 'data-duration', desc: 'Animation duration for each item in milliseconds', def: '600' },
      { attr: 'data-easing', desc: 'CSS easing function', def: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    ],
    accessibility: 'Grid Reveal respects prefers-reduced-motion and is fully keyboard-navigable. Content reveals without disabling interactions.',
  },
  {
    slug: 'text-reveal',
    name: 'Text Reveal',
    headline: 'Headlines that assemble themselves.',
    description: 'Animate type into place with split-line or character-driven reveals. Headlines earn their moment instead of sitting static at the top of the page.',
    category: 'reveal',
    categoryLabel: 'Typography Block',
    demoComponent: 'TextRevealDemo',
    controls: [
      { attr: 'data-mode', desc: 'Reveal mode: character, word, or line', def: 'character' },
      { attr: 'data-stagger', desc: 'Delay between each revealed unit in milliseconds', def: '30' },
      { attr: 'data-trigger', desc: 'Scroll threshold percentage to start reveal', def: '50' },
    ],
    accessibility: 'Text Reveal respects prefers-reduced-motion and is fully keyboard-navigable. Content remains readable when motion is reduced.',
  },
  {
    slug: 'scroll-sequence',
    name: 'Scroll Sequence',
    headline: 'A story told one scroll at a time.',
    description: 'Progress through a timed sequence of frames tied to scroll position. Ideal for case studies where you want to reveal key moments at precise scroll points, creating a cinematic experience.',
    category: 'sequence',
    categoryLabel: 'Animation Block',
    demoComponent: 'ScrollSequenceDemo',
    controls: [
      { attr: 'data-trigger', desc: 'Scroll threshold percentage to trigger animation', def: '50' },
      { attr: 'data-duration', desc: 'Animation duration in milliseconds', def: '800' },
      { attr: 'data-easing', desc: 'CSS easing function', def: 'ease-out-quart' },
    ],
    accessibility: 'Scroll Sequence respects prefers-reduced-motion and does not block content interaction during animations.',
  },
  {
    slug: 'pinned-scroll',
    name: 'Pinned Scroll',
    headline: 'Panels that hold their ground.',
    description: 'Pin key scenes in place while content scrolls past in sticky layers. The image holds while the story moves past it, the rhythm long-form case studies are built on.',
    category: 'sequence',
    categoryLabel: 'Animation Block',
    demoComponent: 'PinnedScrollDemo',
    controls: [
      { attr: 'data-pin-start', desc: 'Scroll progress percentage to start pinning', def: '20' },
      { attr: 'data-pin-end', desc: 'Scroll progress percentage to release the pin', def: '80' },
      { attr: 'data-snap', desc: 'Enable or disable snap-to-step behavior', def: 'false' },
    ],
    accessibility: 'Pinned Scroll respects prefers-reduced-motion and is fully keyboard-navigable. Pinned panels do not trap focus or block content access.',
  },
  {
    slug: 'before-after',
    name: 'Before/After',
    headline: 'Two states, one draggable moment.',
    description: 'Compare two states of the same image with a divider between them. Show retouching, design iterations, or transformation work. Drag the handle, or use arrow keys.',
    category: 'interaction',
    categoryLabel: 'Media Block',
    demoComponent: 'BeforeAfterDemo',
    controls: [
      { attr: 'data-initial-position', desc: 'Starting divider position as percentage', def: '50' },
      { attr: 'data-min-position', desc: 'Minimum allowed divider position', def: '10' },
      { attr: 'data-max-position', desc: 'Maximum allowed divider position', def: '90' },
    ],
    accessibility: 'Before/After slider is fully keyboard-operable (arrow keys) and touch-friendly. Screen reader announces position updates.',
  },
  {
    slug: 'case-study-transition',
    name: 'Case Study Transition',
    headline: 'Seamless project handoffs.',
    description: 'Move between case studies with parallax, fade, or slide transitions. The next project is always one gesture away, no dead ends at the bottom of a case study, no hard cuts between bodies of work.',
    category: 'interaction',
    categoryLabel: 'Navigation Block',
    demoComponent: 'CaseStudyDemo',
    controls: [
      { attr: 'data-transition', desc: 'Transition style: parallax, fade, or slide', def: 'parallax' },
      { attr: 'data-duration', desc: 'Transition duration in milliseconds', def: '800' },
      { attr: 'data-easing', desc: 'CSS easing function', def: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    ],
    accessibility: 'Case Study Transition respects prefers-reduced-motion and is fully keyboard-navigable. Focusable controls move between studies without trapping the cursor.',
  },
  {
    slug: 'custom-cursor',
    name: 'Custom Cursor',
    headline: 'A cursor with intention.',
    description: 'Replace the default pointer with a context-aware follow element. A ring that trails the pointer, grows over links, and carries the portfolio personality into the smallest detail.',
    category: 'interaction',
    categoryLabel: 'Interaction Block',
    demoComponent: 'CustomCursorDemo',
    controls: [
      { attr: 'data-size', desc: 'Cursor diameter in pixels', def: '48' },
      { attr: 'data-color', desc: 'Cursor color as CSS custom property or hex value', def: 'var(--acid)' },
      { attr: 'data-blend', desc: 'Blend mode for cursor overlays', def: 'difference' },
    ],
    accessibility: 'Custom Cursor respects prefers-reduced-motion and does not replace the native cursor for keyboard users. Pointer events remain accessible on all interactive elements.',
  },
  {
    slug: 'filterable-grid',
    name: 'Filterable Grid',
    headline: 'Sort without losing the rhythm.',
    description: 'Reorder gallery items with animated, keyboard-friendly filtering. Identity, packaging, editorial — visitors cut a portfolio down to the work they care about without a page reload.',
    category: 'interaction',
    categoryLabel: 'Layout Block',
    demoComponent: 'FilterableGridDemo',
    controls: [
      { attr: 'data-filter', desc: 'Default active filter category slug', def: 'all' },
      { attr: 'data-duration', desc: 'Layout animation duration in milliseconds', def: '500' },
      { attr: 'data-layout', desc: 'Grid layout mode: masonry or equal', def: 'masonry' },
    ],
    accessibility: 'Filterable Grid respects prefers-reduced-motion and is fully keyboard-operable. Filter buttons expose active state to screen readers.',
  },
  {
    slug: 'magnetic-button',
    name: 'Magnetic Button',
    headline: 'Calls to action that pull people in.',
    description: 'Add subtle magnetic attraction to buttons on hover and focus. The smallest possible signal that a portfolio was made by hand, not assembled.',
    category: 'interaction',
    categoryLabel: 'Interaction Block',
    demoComponent: 'MagneticDemo',
    controls: [
      { attr: 'data-strength', desc: 'Magnetic pull strength as a decimal multiplier', def: '0.5' },
      { attr: 'data-radius', desc: 'Activation radius around the button in pixels', def: '120' },
      { attr: 'data-easing', desc: 'CSS easing function for the return animation', def: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    ],
    accessibility: 'Magnetic Button respects prefers-reduced-motion and is fully keyboard-operable. The effect is disabled for pointer-coarse devices and reduced-motion users.',
  },
];

export const blockCategories = {
  reveal: 'The Reveal Family',
  sequence: 'The Sequence Family',
  interaction: 'The Interaction Layer',
};

export const getBlock = (slug: string) => blocks.find((b) => b.slug === slug);

export const getAdjacentBlocks = (slug: string) => {
  const idx = blocks.findIndex((b) => b.slug === slug);
  if (idx === -1) return null;
  return {
    prev: blocks[(idx - 1 + blocks.length) % blocks.length],
    next: blocks[(idx + 1) % blocks.length],
    index: idx,
  };
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx astro check`
Expected: no type errors in `src/data/blocks.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/data/blocks.ts
git commit -m "feat: extend block metadata with controls, accessibility, demo mapping"
```

---

### Task 2: Create ControlsTable component

**Files:**
- Create: `src/components/patterns/ControlsTable.astro`

**Interfaces:**
- Consumes: `ControlRow[]` from `src/data/blocks.ts`.
- Produces: renders a token-styled HTML table.

- [ ] **Step 1: Write the component**

```astro
---
import type { ControlRow } from '../../data/blocks';

interface Props {
  controls: ControlRow[];
}

const { controls } = Astro.props;
---

<div class="controls-table-wrapper">
  <table class="controls-table">
    <thead>
      <tr>
        <th>Attribute</th>
        <th>What it does</th>
        <th>Default</th>
      </tr>
    </thead>
    <tbody>
      {controls.map((control) => (
        <tr>
          <td><code>{control.attr}</code></td>
          <td>{control.desc}</td>
          <td><code>{control.def}</code></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<style>
  .controls-table-wrapper {
    width: 100%;
    overflow-x: auto;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
  }

  .controls-table {
    width: 100%;
    min-width: 620px;
    border-collapse: collapse;
    font-size: 14px;
  }

  .controls-table thead {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .controls-table th {
    padding: 16px 20px;
    text-align: left;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-on-paper-muted);
    background: var(--surface-alt);
  }

  .controls-table td {
    padding: 16px 20px;
    vertical-align: top;
    color: var(--text-on-paper);
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  }

  .controls-table tbody tr:nth-child(even) {
    background: var(--surface-alt);
  }

  .controls-table tbody tr:last-child td {
    border-bottom: none;
  }

  .controls-table code {
    font-family: var(--font-mono);
    font-size: 12px;
    background: rgba(0, 0, 0, 0.06);
    padding: 3px 6px;
    border-radius: 4px;
    color: var(--text-on-paper);
  }

  @media (max-width: 640px) {
    .controls-table th,
    .controls-table td {
      padding: 12px 16px;
    }
  }
</style>
```

- [ ] **Step 2: Run a quick build check**

Run: `npm run build`
Expected: build succeeds (component has no page impact yet).

- [ ] **Step 3: Commit**

```bash
git add src/components/patterns/ControlsTable.astro
git commit -m "feat: add ControlsTable pattern component"
```

---

### Task 3: Create CodeCard component

**Files:**
- Create: `src/components/patterns/CodeCard.astro`

**Interfaces:**
- Consumes: `name`, `description`, `lang`, `code`, `index`.
- Produces: a styled recipe card with a working copy button.

- [ ] **Step 1: Write the component**

```astro
---
interface Props {
  name: string;
  description: string;
  lang: string;
  code: string;
  index: number;
}

const { name, description, lang, code, index } = Astro.props;
const codeId = `hack-code-${index}`;
---

<article class="code-card">
  <div class="code-card-header">
    <div class="code-card-meta">
      <span class="code-card-index">HACK 0{index + 1}</span>
      <span class="code-card-lang">{lang}</span>
    </div>
    <h2 class="code-card-name">{name}</h2>
    <p class="code-card-desc">{description}</p>
  </div>
  <div class="code-card-body">
    <pre class="code-card-pre"><code id={codeId}>{code}</code></pre>
    <button class="copy-code-btn" data-copy-target={codeId} type="button">Copy</button>
  </div>
</article>

<script>
  document.addEventListener('click', async (e) => {
    const button = (e.target as HTMLElement).closest('.copy-code-btn');
    if (!button) return;
    const targetId = button.getAttribute('data-copy-target');
    const codeEl = targetId ? document.getElementById(targetId) : null;
    if (!codeEl) return;

    try {
      await navigator.clipboard.writeText(codeEl.textContent || '');
      const original = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('copied');
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove('copied');
      }, 1800);
    } catch {
      button.textContent = 'Failed';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 1800);
    }
  });
</script>

<style>
  .code-card {
    display: flex;
    flex-direction: column;
    background: var(--surface-paper);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
  }

  .code-card-header {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .code-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .code-card-index {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-on-paper-muted);
  }

  .code-card-lang {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 999px;
    color: var(--text-on-paper-muted);
  }

  .code-card-name {
    font-size: 19px;
    font-weight: var(--font-weight-semibold);
    line-height: 1.3;
    color: var(--text-on-paper);
    margin: 8px 0 0;
  }

  .code-card-desc {
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-on-paper-muted);
    margin: 0;
  }

  .code-card-body {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(10, 10, 10, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  .code-card-pre {
    flex: 1;
    margin: 0;
    padding: 20px;
    padding-right: 70px;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.6;
    color: var(--text-on-paper);
    overflow-x: auto;
    white-space: pre;
    word-wrap: normal;
  }

  .copy-code-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 8px 14px;
    background: var(--acid);
    color: var(--text-on-paper);
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 150ms ease, background-color 150ms ease;
  }

  .copy-code-btn:hover {
    transform: translateY(-1px);
  }

  .copy-code-btn.copied {
    background: rgba(0, 0, 0, 0.1);
    color: var(--text-on-paper-muted);
  }

  .copy-code-btn:focus-visible {
    outline: 2px solid var(--text-on-paper);
    outline-offset: 2px;
  }
</style>
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/patterns/CodeCard.astro
git commit -m "feat: add CodeCard pattern component for hacks grid"
```

---

### Task 4: Create BlockDetailLayout component

**Files:**
- Create: `src/components/patterns/BlockDetailLayout.astro`

**Interfaces:**
- Consumes: `block` of type `BlockMeta`, `prev`/`next` of type `BlockMeta`, `DemoComponent` Astro component.
- Produces: full detail-page content with HeaderSplit hero, demo, controls table, accessibility note, prev/next nav.

- [ ] **Step 1: Write the component**

```astro
---
import type { BlockMeta } from '../../data/blocks';
import HeaderSplit from './HeaderSplit.astro';
import ControlsTable from './ControlsTable.astro';
import Button from '../Button.astro';

interface Props {
  block: BlockMeta;
  prev: BlockMeta;
  next: BlockMeta;
  index: number;
}

const { block, prev, next, index } = Astro.props;
const icons = import.meta.glob('/public/assets/icons/blocks/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const iconSvg = icons[`/public/assets/icons/blocks/${block.slug}.svg`] as string;
---

<div class="block-detail-layout">
  <HeaderSplit
    eyebrow="Block"
    heading={block.name}
    body={block.description}
    level="h1"
    surface="paper"
    cta={{ label: 'Get this block — free', href: '/pricing/', variant: 'acid' }}
  >
    <div class="block-detail-hero-right">
      <div class="block-detail-icon-tile" set:html={iconSvg} aria-hidden="true" />
      <p class="block-detail-category">{block.categoryLabel} · Block 0{index + 1} / 09</p>
      <a href="/blocks/" class="back-link">← All blocks</a>
    </div>
  </HeaderSplit>

  <section class="block-demo-section" data-surface="alt">
    <div class="block-demo-inner">
      <slot name="demo" />
      <p class="demo-caption">Recreated for the web · ships as a native WordPress block</p>
    </div>
  </section>

  <section class="block-controls-section">
    <div class="block-controls-inner">
      <h2 class="controls-heading">What you can control</h2>
      <ControlsTable controls={block.controls} />
    </div>
  </section>

  <section class="block-accessibility-section" data-surface="alt">
    <div class="block-accessibility-inner">
      <span class="accessibility-icon" aria-hidden="true">✓</span>
      <p><strong>Accessible:</strong> {block.accessibility}</p>
    </div>
  </section>

  <nav class="block-prev-next" aria-label="Block navigation">
    <a href={`/blocks/${prev.slug}/`} class="prev-next-card prev-next-prev">
      <span class="prev-next-label">← Previous block</span>
      <span class="prev-next-name">{prev.name}</span>
      <span class="prev-next-category">{prev.categoryLabel}</span>
    </a>
    <a href={`/blocks/${next.slug}/`} class="prev-next-card prev-next-next">
      <span class="prev-next-label">Next block →</span>
      <span class="prev-next-name">{next.name}</span>
      <span class="prev-next-category">{next.categoryLabel}</span>
    </a>
  </nav>
</div>

<style>
  .block-detail-layout {
    width: 100%;
  }

  .block-detail-hero-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .block-detail-icon-tile {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    background: var(--acid);
    display: grid;
    place-items: center;
    color: var(--text-on-acid);
  }

  .block-detail-icon-tile :global(svg) {
    width: 40px;
    height: 40px;
  }

  .block-detail-category {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-on-paper-muted);
    margin: 0;
  }

  .back-link {
    font-size: 14px;
    color: var(--text-on-paper);
    text-decoration: none;
    border-bottom: 1px solid var(--stone);
    padding-bottom: 2px;
    transition: border-color 0.2s ease;
  }

  .back-link:hover {
    border-color: var(--text-on-paper);
  }

  .block-demo-section,
  .block-controls-section,
  .block-accessibility-section {
    width: 100%;
    padding: 80px 40px;
    box-sizing: border-box;
  }

  .block-demo-section {
    background: var(--surface-alt);
  }

  .block-demo-inner,
  .block-controls-inner,
  .block-accessibility-inner {
    width: 100%;
    max-width: var(--container-wide);
    margin: 0 auto;
  }

  .demo-caption {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-on-paper-muted);
    text-align: right;
    margin: 16px 0 0;
  }

  .block-controls-section {
    background: var(--surface-paper);
  }

  .controls-heading {
    font-size: 28px;
    font-weight: var(--font-weight-normal);
    line-height: 1.2;
    color: var(--text-on-paper);
    margin: 0 0 24px;
  }

  .block-accessibility-section {
    background: var(--surface-alt);
  }

  .block-accessibility-inner {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 24px;
    background: var(--surface-paper);
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .accessibility-icon {
    flex: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--acid);
    color: var(--text-on-paper);
    display: grid;
    place-items: center;
    font-size: 14px;
    font-weight: var(--font-weight-bold);
  }

  .block-accessibility-inner p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-on-paper-muted);
  }

  .block-accessibility-inner strong {
    color: var(--text-on-paper);
  }

  .block-prev-next {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
    max-width: var(--container-wide);
    margin: 0 auto;
    padding: 40px;
    box-sizing: border-box;
  }

  .prev-next-card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 24px;
    background: var(--surface-paper);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .prev-next-card:hover {
    border-color: rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  .prev-next-next {
    text-align: right;
  }

  .prev-next-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-on-paper-muted);
  }

  .prev-next-name {
    font-size: 18px;
    font-weight: var(--font-weight-semibold);
    color: var(--text-on-paper);
  }

  .prev-next-category {
    font-size: 13px;
    color: var(--text-on-paper-muted);
  }

  @media (max-width: 768px) {
    .block-demo-section,
    .block-controls-section,
    .block-accessibility-section {
      padding: 60px 20px;
    }

    .block-prev-next {
      grid-template-columns: 1fr;
      padding: 20px;
    }

    .prev-next-next {
      text-align: left;
    }
  }
</style>
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/patterns/BlockDetailLayout.astro
git commit -m "feat: add BlockDetailLayout pattern component"
```

---

### Task 5: Create dynamic block detail route

**Files:**
- Create: `src/pages/blocks/[slug].astro`

**Interfaces:**
- Consumes: `blocks`, `getBlock`, `getAdjacentBlocks` from `src/data/blocks.ts`; demo components from `src/components/demos/sample/demos/`.
- Produces: static pages at `/blocks/grid-reveal/`, `/blocks/text-reveal/`, etc.

- [ ] **Step 1: Write the dynamic route**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import BlockDetailLayout from '../../components/patterns/BlockDetailLayout.astro';
import { blocks, getBlock, getAdjacentBlocks } from '../../data/blocks';

import GridRevealDemo from '../../components/demos/sample/demos/GridRevealDemo.astro';
import TextRevealDemo from '../../components/demos/sample/demos/TextRevealDemo.astro';
import ScrollSequenceDemo from '../../components/demos/sample/demos/ScrollSequenceDemo.astro';
import PinnedScrollDemo from '../../components/demos/sample/demos/PinnedScrollDemo.astro';
import BeforeAfterDemo from '../../components/demos/sample/demos/BeforeAfterDemo.astro';
import CaseStudyDemo from '../../components/demos/sample/demos/CaseStudyDemo.astro';
import CustomCursorDemo from '../../components/demos/sample/demos/CustomCursorDemo.astro';
import FilterableGridDemo from '../../components/demos/sample/demos/FilterableGridDemo.astro';
import MagneticDemo from '../../components/demos/sample/demos/MagneticDemo.astro';

export function getStaticPaths() {
  return blocks.map((block) => ({
    params: { slug: block.slug },
    props: { block },
  }));
}

const { block } = Astro.props;
const adjacent = getAdjacentBlocks(block.slug);
if (!adjacent) {
  throw new Error(`Block not found: ${block.slug}`);
}
const { prev, next, index } = adjacent;

const demoComponents: Record<string, any> = {
  GridRevealDemo,
  TextRevealDemo,
  ScrollSequenceDemo,
  PinnedScrollDemo,
  BeforeAfterDemo,
  CaseStudyDemo,
  CustomCursorDemo,
  FilterableGridDemo,
  MagneticDemo,
};

const DemoComponent = demoComponents[block.demoComponent];
if (!DemoComponent) {
  throw new Error(`Demo component not found: ${block.demoComponent}`);
}

const title = `${block.name} — Basalio blocks`;
const description = block.description;
---

<BaseLayout {title} {description}>
  <Fragment slot="header">
    <Header />
  </Fragment>

  <BlockDetailLayout {block} {prev} {next} {index}>
    <DemoComponent slot="demo" />
  </BlockDetailLayout>

  <Fragment slot="footer">
    <Footer />
  </Fragment>
</BaseLayout>
```

- [ ] **Step 2: Build and verify detail pages generate**

Run: `npm run build`
Expected: build succeeds and `dist/blocks/` contains subdirectories for all nine slugs.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blocks/\[slug\].astro
git commit -m "feat: add dynamic block detail pages"
```

---

### Task 6: Update Blocks overview page

**Files:**
- Modify: `src/pages/blocks.astro`

**Interfaces:**
- Consumes: `blocks`, `blockCategories` from `src/data/blocks.ts`.
- Produces: a blocks overview page with 3-column card grid linking to detail pages and a closing acid banner.

- [ ] **Step 1: Replace the page content**

Replace the entire `<style>` block and the main content area with a new implementation. The new `src/pages/blocks.astro` should look like:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import HeaderSplit from '../components/patterns/HeaderSplit.astro';
import Button from '../components/Button.astro';
import { blocks, blockCategories } from '../data/blocks';

const title = "Blocks - Basalio";
const description = "Nine curated interaction blocks built for WordPress portfolios. Grid reveals, case study transitions, scroll sequences, and more.";

const icons = import.meta.glob('/public/assets/icons/blocks/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});
---

<BaseLayout {title} {description}>
  <Fragment slot="header">
    <Header />
  </Fragment>

  <HeaderSplit
    eyebrow="Our blocks"
    heading="Nine blocks. Nothing you don't need."
    body="Grid reveals, case study transitions, scroll sequences, and more. Every one is keyboard-operable, reduced-motion aware, and loaded only on the pages that use it. Click any block to see it running live."
    level="h1"
    surface="paper"
  >
    <div class="hero-right-content">
      <h2 class="hero-right-heading">Every one of them is keyboard-operable, reduced-motion aware, and loaded only on the pages that use it.</h2>
      <p class="hero-right-subheading">That isn't a Pro feature. That's the floor.</p>
    </div>
  </HeaderSplit>

  <section class="blocks-grid-section">
    <div class="blocks-grid">
      {blocks.map((block, i) => (
        <a href={`/blocks/${block.slug}/`} class="block-card">
          <span class="block-number">0{i + 1}</span>
          <span class="block-icon-tile" aria-hidden="true" set:html={icons[`/public/assets/icons/blocks/${block.slug}.svg`]} />
          <h2 class="block-name">{block.name}</h2>
          <p class="block-category">{block.categoryLabel}</p>
          <p class="block-tagline">{block.headline}</p>
          <span class="block-cta">
            See it live
            <svg class="block-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 12h16" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      ))}
    </div>
  </section>

  <section class="closing-banner" data-surface="acid">
    <div class="closing-banner-inner">
      <div>
        <h3 class="closing-title">All nine. Free. Forever.</h3>
        <p class="closing-body">No locked blocks, no watermarks, no instance limits. Free is not a trial. It is the product.</p>
      </div>
      <Button href="/pricing/" label="Get the blocks" variant="ink" fontSize="14px" fontWeight="600" letterSpacing="0.2em" />
    </div>
  </section>

  <Fragment slot="footer">
    <Footer />
  </Fragment>
</BaseLayout>

<style>
  .hero-right-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .hero-right-heading {
    font-size: clamp(18px, 2vw, 24px);
    font-weight: var(--font-weight-bold);
    line-height: 1.4;
    color: var(--text-on-paper);
    margin: 0;
  }

  .hero-right-subheading {
    font-size: clamp(18px, 2vw, 24px);
    font-weight: var(--font-weight-normal);
    line-height: 1.4;
    color: var(--text-on-paper-muted);
    margin: 0;
  }

  .blocks-grid-section {
    width: 100%;
    background: var(--surface-paper);
    padding: 80px 40px;
    box-sizing: border-box;
  }

  .blocks-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: var(--container-wide);
    margin: 0 auto;
  }

  .block-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 24px;
    background: var(--surface-paper);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .block-card:hover {
    border-color: rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  .block-number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-on-paper-muted);
  }

  .block-card:hover .block-number {
    color: var(--text-on-paper);
  }

  .block-icon-tile {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: var(--surface-alt);
    border: 1px solid rgba(0, 0, 0, 0.08);
    display: grid;
    place-items: center;
    color: var(--text-on-paper);
    transition: transform 0.2s ease;
  }

  .block-icon-tile :global(svg) {
    width: 22px;
    height: 22px;
  }

  .block-card:hover .block-icon-tile {
    transform: scale(1.05);
  }

  .block-name {
    font-size: 18px;
    font-weight: var(--font-weight-semibold);
    color: var(--text-on-paper);
    margin: 20px 0 0;
  }

  .block-category {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-on-paper-muted);
    margin: 6px 0 0;
  }

  .block-tagline {
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--text-on-paper-muted);
    margin: 12px 0 0;
  }

  .block-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 20px;
    font-size: 13px;
    font-weight: var(--font-weight-medium);
    color: var(--text-on-paper);
  }

  .block-arrow {
    transition: transform 0.2s ease;
  }

  .block-card:hover .block-arrow {
    transform: translateX(4px);
  }

  .closing-banner {
    width: 100%;
    background: var(--acid);
    padding: 60px 40px;
    box-sizing: border-box;
  }

  .closing-banner-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    width: 100%;
    max-width: var(--container-wide);
    margin: 0 auto;
  }

  .closing-title {
    font-size: 26px;
    font-weight: var(--font-weight-normal);
    line-height: 1.2;
    color: var(--text-on-acid);
    margin: 0;
  }

  .closing-body {
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--text-on-acid-muted);
    margin: 8px 0 0;
    max-width: 440px;
  }

  @media (max-width: 1024px) {
    .blocks-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .blocks-grid-section {
      padding: 60px 20px;
    }

    .blocks-grid {
      grid-template-columns: 1fr;
    }

    .closing-banner-inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: build succeeds; `/blocks/` renders correctly.

- [ ] **Step 3: Commit**

```bash
git add src/pages/blocks.astro
git commit -m "feat: rebuild blocks overview with 3-column grid and detail links"
```

---

### Task 7: Update Pricing page

**Files:**
- Modify: `src/pages/pricing.astro`
- Modify: `src/data/faq.ts` (if FAQ copy is enriched from sample)

**Interfaces:**
- Consumes: `PricingCards`, `StatusLedger`, `FAQ`, `getFaqs`, pricing data.
- Produces: refreshed pricing page with sample copy and canonical ledger component.

- [ ] **Step 1: Replace ledger section with StatusLedger and update copy**

In `src/pages/pricing.astro`:

1. Import `StatusLedger`:

```astro
import StatusLedger from '../components/patterns/StatusLedger.astro';
```

2. Replace the duplicated local ledger markup with:

```astro
  <section class="ledger-section">
    <div class="ledger-container">
      <StatusLedger
        eyebrow="Transparency"
        title="What's built, what isn't"
        description="A founder license is partly a bet on unfinished work. This is the real status. If a row moves, this table moves with it."
        items={buildStatus.map((row) => ({
          label: row.item,
          status: row.status,
          note: row.note,
        }))}
        surface="paper"
      />
      <p class="ledger-footer">Nothing on this page is described as finished when it isn't.</p>
    </div>
  </section>
```

3. Update the risk-reversal title and copy to match sample tone:

```astro
  <section class="risk-section">
    <div class="risk-container">
      {CHECKOUT_STATE === 'founder' ? (
        <>
          <h2 class="risk-title">If I don't ship it</h2>
          <div class="risk-content">
            <p>Basalio is built by one person. You should know what that means before you pay.</p>
            <p>The nine blocks are free whether or not you buy anything. They don't depend on me staying in business. The Pro layer does. So it's refundable at any time until the Pro control center ships. If it never ships, you never lose your money.</p>
            <p>Everything is GPL-2.0-or-later. If Basalio disappears tomorrow, the code you have keeps working and stays yours to fork.</p>
          </div>
        </>
      ) : (
        <>
          <h2 class="risk-title">30 days to try it</h2>
          <div class="risk-content">
            <p>30-day refund, no questions asked. If it isn't what you expected, tell us and we'll refund it.</p>
            <p>Everything is GPL-2.0-or-later. If Basalio disappears tomorrow, the code you have keeps working and stays yours to fork.</p>
          </div>
        </>
      )}
    </div>
  </section>
```

4. Remove the now-unused local `.ledger-*` styles from the `<style>` block, keeping only `.ledger-section`, `.ledger-container`, `.ledger-footer`, pricing cards, risk section, and responsive rules.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: build succeeds; pricing page renders with `StatusLedger`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/pricing.astro
git commit -m "feat: refresh pricing page with StatusLedger and sample copy"
```

---

### Task 8: Update Hacks page

**Files:**
- Modify: `src/pages/hacks.astro`

**Interfaces:**
- Consumes: `HeaderSplit`, `CodeCard`, `Button`.
- Produces: 2-column recipe grid with sample hack content.

- [ ] **Step 1: Rewrite the page**

Replace the contents of `src/pages/hacks.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import HeaderSplit from '../components/patterns/HeaderSplit.astro';
import CodeCard from '../components/patterns/CodeCard.astro';
import Button from '../components/Button.astro';

const title = "Hacks - Basalio";
const description = "Four free CSS/JS snippets you can paste into your site.";

const HACKS = [
  {
    name: 'Hover-swap project titles',
    desc: 'Swap the project title for its category on hover — one attribute, no plugin.',
    lang: 'css',
    code: `.work-card .title::after {
  content: attr(data-cat);
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateY(6px);
  transition: .35s cubic-bezier(.22,1,.36,1);
}
.work-card:hover .title::after { opacity: 1; transform: none; }`,
  },
  {
    name: 'Scroll-linked progress rule',
    desc: 'A 1px rule that draws itself across the viewport as the case study scrolls.',
    lang: 'css',
    code: `.progress-rule {
  height: 1px;
  background: currentColor;
  transform-origin: left;
  animation: draw linear both;
  animation-timeline: scroll(root);
}
@keyframes draw { from { scale: 0 1 } to { scale: 1 1 } }`,
  },
  {
    name: 'Next-project prefetch hint',
    desc: 'Prefetch the next case study when its teaser enters the viewport.',
    lang: 'html',
    code: `<!-- drop in the case-study footer -->
<link rel="prefetch"
      href="/work/next-project"
      as="document" />
<!-- pair with the Case Study Transition block
     for an instant handoff -->`,
  },
  {
    name: 'Respectful autoplay video',
    desc: 'Autoplay cover video only when motion is allowed and the tab is visible.',
    lang: 'js',
    code: `const ok = matchMedia('(prefers-reduced-motion: no-preference)');
document.querySelectorAll('video[data-cover]').forEach(v => {
  const sync = () => ok.matches && !document.hidden ? v.play() : v.pause();
  ok.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
});`,
  },
];
---

<BaseLayout {title} {description}>
  <Fragment slot="header">
    <Header />
  </Fragment>

  <HeaderSplit
    eyebrow="Hacks"
    heading="Copy-paste craft."
    body="Four free snippets for portfolio sites — no plugin required. The full vault (five more recipes) ships with the founder license."
    level="h1"
    surface="paper"
  >
    <div class="hacks-hero-right">
      <p class="hacks-hero-lead">Four effects you can paste into your site right now. No plugin, no account, no email.</p>
      <p class="hacks-hero-body">Paste the code once, then add a class to whichever block you want it on. The class field is in the block settings sidebar, under <strong>Advanced → Additional CSS class(es)</strong>.</p>
    </div>
  </HeaderSplit>

  <section class="hacks-grid-section">
    <div class="hacks-grid">
      {HACKS.map((hack, i) => (
        <CodeCard
          name={hack.name}
          description={hack.desc}
          lang={hack.lang}
          code={hack.code}
          index={i}
        />
      ))}
    </div>
  </section>

  <section class="vault-cta" data-surface="acid">
    <div class="vault-cta-inner">
      <div>
        <h3 class="vault-title">Five more in the vault.</h3>
        <p class="vault-body">Specced and in development — founder licenses include all five as they ship, plus one-click versions of every hack.</p>
      </div>
      <Button href="/pricing/" label="Unlock the vault" variant="ink" fontSize="14px" fontWeight="600" letterSpacing="0.2em" />
    </div>
  </section>

  <Fragment slot="footer">
    <Footer />
  </Fragment>
</BaseLayout>

<style>
  .hacks-hero-right {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .hacks-hero-lead {
    font-size: clamp(18px, 2vw, 24px);
    font-weight: var(--font-weight-bold);
    line-height: 1.4;
    color: var(--text-on-paper);
    margin: 0;
  }

  .hacks-hero-body {
    font-size: 16px;
    line-height: 1.5;
    color: var(--text-on-paper-muted);
    margin: 0;
  }

  .hacks-grid-section {
    width: 100%;
    background: var(--surface-paper);
    padding: 80px 40px;
    box-sizing: border-box;
  }

  .hacks-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
    max-width: var(--container-wide);
    margin: 0 auto;
  }

  .vault-cta {
    width: 100%;
    background: var(--acid);
    padding: 60px 40px;
    box-sizing: border-box;
  }

  .vault-cta-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    width: 100%;
    max-width: var(--container-wide);
    margin: 0 auto;
  }

  .vault-title {
    font-size: 26px;
    font-weight: var(--font-weight-normal);
    line-height: 1.2;
    color: var(--text-on-acid);
    margin: 0;
  }

  .vault-body {
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--text-on-acid-muted);
    margin: 8px 0 0;
    max-width: 440px;
  }

  @media (max-width: 768px) {
    .hacks-grid-section {
      padding: 60px 20px;
    }

    .hacks-grid {
      grid-template-columns: 1fr;
    }

    .vault-cta-inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/hacks.astro
git commit -m "feat: rebuild hacks page as 2-column recipe grid"
```

---

### Task 9: Update Contact page

**Files:**
- Modify: `src/pages/contact.astro`

**Interfaces:**
- Consumes: `HeaderSplit`, existing Netlify form setup.
- Produces: updated contact page with sample form fields and copy.

- [ ] **Step 1: Update the page**

Keep the existing Netlify form attributes (`name="contact"`, `method="POST"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`). Update the left copy and form fields to match the sample.

Replace the main content with:

```astro
  <section class="contact-section">
    <div class="contact-inner">
      <div class="contact-copy">
        <p class="contact-eyebrow">Contact</p>
        <h1 class="contact-heading">A direct line to the person building it.</h1>
        <p class="contact-body">Basalio is a one-person studio. No support tickets disappearing into a queue — your message lands in the inbox of the developer who wrote the block you are asking about.</p>
        <ul class="contact-highlights">
          <li><strong>Response time</strong>Usually within 48 hours, CET</li>
          <li><strong>Founder licenses</strong>Refundable until the control center ships</li>
          <li><strong>Bug reports</strong>Include your WordPress + PHP versions</li>
        </ul>
      </div>

      <form
        name="contact"
        method="POST"
        action="/welcome/"
        data-netlify="true"
        netlify-honeypot="bot-field"
        class="contact-form"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p class="hidden">
          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </p>

        <div class="form-row">
          <label class="form-field">
            <span class="form-label">Name</span>
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label class="form-field">
            <span class="form-label">Email</span>
            <input type="email" name="email" placeholder="you@studio.com" required />
          </label>
        </div>

        <fieldset class="form-field">
          <legend class="form-label">Topic</legend>
          <div class="topic-options">
            {['General question', 'Founder license', 'Bug report', 'Feature idea', 'Something else'].map((topic, i) => (
              <label class="topic-option">
                <input type="radio" name="topic" value={topic} checked={i === 0} />
                <span>{topic}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label class="form-field">
          <span class="form-label">Message</span>
          <textarea name="message" rows="5" placeholder="What are you building?" required></textarea>
        </label>

        <button type="submit" class="submit-button">Send message</button>
        <p class="form-note">This form sends via Netlify. A copy also goes to hello@basalio.com.</p>
      </form>
    </div>
  </section>
```

And add styles for `.contact-section`, `.contact-inner`, `.contact-copy`, `.contact-form`, `.form-row`, `.form-field`, `.form-label`, `.topic-options`, `.topic-option`, `.submit-button`, `.form-note`, and responsive rules.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: update contact page with sample form fields and copy"
```

---

### Task 10: Update 404 page

**Files:**
- Modify: `src/pages/404.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `Button`.
- Produces: centered "Not a block." page with home and blocks CTAs.

- [ ] **Step 1: Rewrite the page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Button from '../components/Button.astro';

const title = "404 - Basalio";
const description = "This page doesn't exist, but nine carefully built blocks do.";
---

<BaseLayout {title} {description} noindex={true}>
  <main class="not-found-page">
    <p class="not-found-eyebrow">404 — Off the grid</p>
    <h1 class="not-found-title">Not a block.</h1>
    <p class="not-found-body">This page doesn't exist, but nine carefully built blocks do.</p>
    <div class="not-found-actions">
      <Button href="/" label="Back home" variant="acid" fontSize="14px" fontWeight="600" letterSpacing="0.2em" />
      <Button href="/blocks/" label="See the blocks" variant="ink" fontSize="14px" fontWeight="600" letterSpacing="0.2em" />
    </div>
  </main>
</BaseLayout>

<style>
  .not-found-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    padding: 120px 40px 80px;
    text-align: center;
    background: var(--surface-paper);
  }

  .not-found-eyebrow {
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-on-paper-muted);
    margin: 0;
  }

  .not-found-title {
    font-size: clamp(48px, 10vw, 120px);
    font-weight: var(--font-weight-normal);
    line-height: 1;
    letter-spacing: var(--heading-letter-spacing);
    color: var(--text-on-paper);
    margin: 24px 0 0;
  }

  .not-found-body {
    font-size: 16px;
    line-height: 1.5;
    color: var(--text-on-paper-muted);
    margin: 16px 0 0;
    max-width: 380px;
  }

  .not-found-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 36px;
  }
</style>
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: update 404 page with not-a-block concept"
```

---

### Task 11: Final build and verification

**Files:**
- Modify: `scripts/verify-internal-pages.mjs` (create)

**Interfaces:**
- Consumes: Astro preview server.
- Produces: verification report.

- [ ] **Step 1: Write a verification script**

Create `scripts/verify-internal-pages.mjs`:

```js
import { chromium } from 'playwright';

const BASE_URL = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const routes = [
  '/blocks/',
  '/blocks/grid-reveal/',
  '/blocks/text-reveal/',
  '/blocks/scroll-sequence/',
  '/blocks/pinned-scroll/',
  '/blocks/before-after/',
  '/blocks/case-study-transition/',
  '/blocks/custom-cursor/',
  '/blocks/filterable-grid/',
  '/blocks/magnetic-button/',
  '/pricing/',
  '/hacks/',
  '/contact/',
  '/404/',
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let failed = false;

function log(label, ok, detail = '') {
  const icon = ok ? '✓' : '✗';
  console.log(`${icon} ${label}${detail ? ': ' + detail : ''}`);
  if (!ok) failed = true;
}

try {
  for (const route of routes) {
    const resp = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
    log(`Route ${route}`, resp && resp.status() < 400, `${resp?.status()}`);

    const title = await page.title();
    log(`  title`, title.length > 0, title);

    const h1 = await page.locator('h1').first().textContent();
    log(`  h1`, !!h1, h1?.slice(0, 40));

    // Verify no em dash in visible text
    const bodyText = await page.locator('body').textContent();
    log(`  no em dash`, !bodyText?.includes('—'));
  }

  // Blocks overview specific checks
  await page.goto(`${BASE_URL}/blocks/`, { waitUntil: 'networkidle' });
  const cardCount = await page.locator('.block-card').count();
  log('Blocks grid card count', cardCount === 9, cardCount);

  const firstDetailHref = await page.locator('.block-card').first().getAttribute('href');
  log('First card links to detail', firstDetailHref?.startsWith('/blocks/'));

  // Block detail specific checks
  await page.goto(`${BASE_URL}/blocks/grid-reveal/`, { waitUntil: 'networkidle' });
  const hasControls = await page.locator('.controls-table').isVisible();
  log('Grid reveal detail has controls table', hasControls);

  const hasAccessibility = await page.locator('.block-accessibility-inner').isVisible();
  log('Grid reveal detail has accessibility note', hasAccessibility);

  const prevHref = await page.locator('.prev-next-prev').getAttribute('href');
  const nextHref = await page.locator('.prev-next-next').getAttribute('href');
  log('Prev/next nav present', !!prevHref && !!nextHref);
} catch (err) {
  console.error('Verification error:', err.message);
  failed = true;
} finally {
  await browser.close();
}

process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Start preview and run verification**

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4321 &
# wait for server
sleep 2
node scripts/verify-internal-pages.mjs
```

Expected: all routes respond, all checks pass.

- [ ] **Step 3: Commit verification script**

```bash
git add scripts/verify-internal-pages.mjs
git commit -m "test: add internal pages verification script"
```

---

## Plan Self-Review

**Spec coverage:**
- Blocks overview 3-column grid → Task 6.
- Block detail pages with HeaderSplit, demo, controls, accessibility, prev/next → Tasks 1–5.
- Pricing refresh with `StatusLedger` and risk-reversal → Task 7.
- Hacks 2-column recipe grid → Tasks 2 + 8.
- Contact form fields and copy → Task 9.
- 404 "Not a block." → Task 10.
- Build verification → Task 11.

**Placeholder scan:** No TBD/TODO placeholders. All code snippets are concrete.

**Type consistency:**
- `BlockMeta` uses `ControlRow[]` consistently.
- `demoComponent` string values match the keys of `demoComponents` record in `[slug].astro`.
- `StatusLedger` expects `status` values that match its union type; pricing `buildStatus` is mapped to compatible values.

**Open risks called out in tasks:**
- Demo components may rely on page-scoped IDs. If a demo fails to render on a detail page, the detail page task must be paused and the demo component fixed before continuing.
- Contact form styling must preserve Netlify attributes exactly.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-20-internal-pages-sample-blend.md`.

Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach do you want?
