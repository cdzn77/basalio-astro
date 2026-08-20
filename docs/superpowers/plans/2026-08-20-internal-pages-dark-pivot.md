# Internal Pages Dark Pivot — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivot all internal pages to a dark surface treatment, fix layout/accessibility defects, and add a Support page.

**Architecture:** Reuse Basalio's existing `--surface-ink` token and `data-surface="ink"` header behavior. Introduce a global `.glass` utility for cards, tables, and CTAs. Update shared components (`HeaderSplit`, `PricingCards`, `CodeCard`, `ControlsTable`, `FAQ`) to support dark surfaces, then consume them from each internal page.

**Tech Stack:** Astro 7, scoped component CSS, CSS custom properties from `src/styles/tokens.css`, no Tailwind.

**Spec:** `docs/superpowers/specs/2026-08-20-internal-pages-dark-pivot-design.md`

## Global Constraints

- Surface: `--surface-ink` (#1C1917) for all internal page sections.
- Text: `--text-on-ink` (#F6F4EF) primary, `--text-on-ink-muted` (#D4CABE) secondary.
- Accent: `--acid` (#EDFF10) stays the primary accent.
- Footer stays acid as the brand accent.
- WCAG 2.1 AA contrast required for all text and UI controls.
- No page overflow below 320px viewport.
- Existing `trailingSlash: 'always'` config means internal links use trailing slashes (`/blocks/`, `/pricing/`, etc.).

---

## File structure

| File | Responsibility |
|------|----------------|
| `src/styles/global.css` | Add `.glass`, `.glass-2`, `.glass-toplight` utilities; dark surface base rules. |
| `src/components/patterns/HeaderSplit.astro` | Make dark surface text colors automatic when `surface="ink"`. |
| `src/components/patterns/PricingCards.astro` | Dark glass variant, equal-height cards, aligned CTAs. |
| `src/components/patterns/CodeCard.astro` | Dark glass body, accessible light code text. |
| `src/components/patterns/ControlsTable.astro` | Dark glass table styling. |
| `src/components/FAQ.astro` | Accept `surface` prop and render dark accordion. |
| `src/pages/blocks.astro` | Dark hero, glass block cards, glass bottom CTA. |
| `src/pages/blocks/[slug].astro` | No markup change; BlockDetailLayout handles dark styling. |
| `src/components/patterns/BlockDetailLayout.astro` | Dark hero, demo stage fix, glass controls/prev-next. |
| `src/pages/pricing.astro` | Dark hero, dark ledger/risk/FAQ, remove unused CSS. |
| `src/pages/hacks.astro` | Dark hero, dark CodeCards, non-acid glass CTA banner. |
| `src/pages/contact.astro` | Dark hero, form width cap, support link instead of FAQ. |
| `src/pages/early-access.astro` | Dark hero, form width cap. |
| `src/pages/support.astro` | New troubleshooting/support hub page. |
| `src/pages/terms.astro` | Dark surfaces, polished legal layout. |
| `src/pages/privacy.astro` | Dark surfaces, polished legal layout. |

---

## Verification commands (used by every task)

```bash
cd /Users/angelomanzanojr/basalio-astro
npm run build
```

After build, start preview and run existing internal-pages verification:

```bash
npm run preview &
sleep 3
node scripts/verify-internal-pages.mjs
```

Visual checks: open http://localhost:4321/blocks/, /pricing/, /hacks/, /contact/, /support/, /terms/, /privacy/ and confirm dark surfaces, readable text, aligned buttons, capped forms, no acid above footer.

---

### Task 1: Add global glass utilities and dark surface helpers

**Files:**
- Modify: `src/styles/global.css:405`

**Interfaces:**
- Produces reusable CSS classes: `.glass`, `.glass-2`, `.glass-toplight`, `.surface-ink`.

- [ ] **Step 1: Append glass utilities to global.css**

```css
/* Glass panels (used on dark internal pages) */
.glass {
  background: rgba(255, 255, 255, 0.045);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
}

.glass-2 {
  background: rgba(255, 255, 255, 0.075);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
}

.glass-toplight {
  position: relative;
}

.glass-toplight::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
  border-radius: inherit;
  pointer-events: none;
}

/* Lift hover for glass cards */
.glass-lift {
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

.glass-lift:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 24px 48px -24px rgba(0, 0, 0, 0.6);
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add glass utility classes for dark internal pages"
```

---

### Task 2: Update HeaderSplit for robust dark surface support

**Files:**
- Modify: `src/components/patterns/HeaderSplit.astro:33-124`

**Interfaces:**
- Consumes: existing `surface` prop.
- Produces: scoped CSS that flips `.eyebrow`, `.heading`, `.body p` to ink colors when `surface="ink"`.

- [ ] **Step 1: Replace inline style with data-surface attribute**

Change:
```astro
<section class="header-split" style={`background: ${surfaceClass};`}>
```
to:
```astro
<section class="header-split" data-surface={surface} style={`background: ${surfaceClass};`}>
```

- [ ] **Step 2: Add dark surface text rules in the style block**

After `.body p` rules, add:

```css
.header-split[data-surface="ink"] .eyebrow,
.header-split[data-surface="ink"] .heading,
.header-split[data-surface="ink"] .body p,
.header-split[data-surface="ink"] .hero-right-heading,
.header-split[data-surface="ink"] .hero-right-subheading,
.header-split[data-surface="ink"] .hacks-hero-lead,
.header-split[data-surface="ink"] .hacks-hero-body,
.header-split[data-surface="ink"] .terms-scope-content .scope-label,
.header-split[data-surface="ink"] .terms-scope-content .scope-statement,
.header-split[data-surface="ink"] .privacy-scope-content .scope-label,
.header-split[data-surface="ink"] .privacy-scope-content .scope-statement {
  color: var(--text-on-ink);
}

.header-split[data-surface="ink"] .body p,
.header-split[data-surface="ink"] .hero-right-subheading,
.header-split[data-surface="ink"] .hacks-hero-body {
  color: var(--text-on-ink-muted);
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/patterns/HeaderSplit.astro
git commit -m "feat: HeaderSplit dark surface text colors"
```

---

### Task 3: Update PricingCards — dark variant and bottom-aligned CTAs

**Files:**
- Modify: `src/components/patterns/PricingCards.astro:140-350`

**Interfaces:**
- Consumes: `variant`, `level` props.
- Produces: `.pricing-card` with `.pricing-card-ink` modifier; equal-height cards with aligned buttons.

- [ ] **Step 1: Add optional surface prop (default paper)**

Add to Props interface:
```astro
interface Props {
  variant: 'compact' | 'full';
  level?: 'h2' | 'h3' | 'h4';
  surface?: 'paper' | 'ink';
}
```

Update destructuring:
```astro
const { variant, level = 'h3', surface = 'paper' } = Astro.props;
```

Add wrapper class:
```astro
<div class:list={['pricing-wrapper', { 'pricing-wrapper-ink': surface === 'ink' }]}>
```

- [ ] **Step 2: Make pricing-card use glass on ink surface**

Change `.pricing-card` background:
```css
.pricing-card {
  display: flex;
  flex-direction: column;
  background: var(--surface-paper);
  ...
}
```
to:
```css
.pricing-card {
  display: flex;
  flex-direction: column;
  background: var(--surface-paper);
  border-radius: 8px;
  padding: 32px;
  gap: 24px;
  flex: 1 1 auto;
}

.pricing-wrapper-ink .pricing-card {
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(140%);
}
```

- [ ] **Step 3: Equal-height grid and aligned buttons**

Ensure cards stretch:
```css
.pricing-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;
  align-items: stretch;
}
```

Ensure card content grows and CTA/footer anchor:
```css
.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 auto;
}

.card-cta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
}
```

- [ ] **Step 4: Dark surface text colors**

Add:
```css
.pricing-wrapper-ink .tier-label,
.pricing-wrapper-ink .card-name,
.pricing-wrapper-ink .price,
.pricing-wrapper-ink .billing,
.pricing-wrapper-ink .teaser,
.pricing-wrapper-ink .one-liner,
.pricing-wrapper-ink .lead-line,
.pricing-wrapper-ink .feature-item,
.pricing-wrapper-ink .footnote,
.pricing-wrapper-ink .micro-line {
  color: var(--text-on-ink);
}

.pricing-wrapper-ink .billing,
.pricing-wrapper-ink .teaser,
.pricing-wrapper-ink .one-liner,
.pricing-wrapper-ink .feature-item,
.pricing-wrapper-ink .footnote,
.pricing-wrapper-ink .micro-line {
  color: var(--text-on-ink-muted);
}

.pricing-wrapper-ink .feature-item::before {
  color: var(--text-on-ink);
}

.pricing-wrapper-ink .card-footer {
  border-top-color: rgba(255, 255, 255, 0.12);
}

.pricing-wrapper-ink .cta-button {
  background: var(--acid);
  color: var(--text-on-acid);
}

.pricing-wrapper-ink .pricing-card.featured {
  background: var(--acid);
  border-color: var(--acid);
}

.pricing-wrapper-ink .pricing-card.featured .cta-button {
  background: var(--text-on-paper);
  color: var(--surface-paper);
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/patterns/PricingCards.astro
git commit -m "feat: PricingCards dark glass variant and aligned CTAs"
```

---

### Task 4: Update CodeCard for accessible dark code blocks

**Files:**
- Modify: `src/components/patterns/CodeCard.astro:56-166`

**Interfaces:**
- Consumes: `name`, `description`, `lang`, `code`, `index`.
- Produces: `.code-card-ink` modifier and light-on-dark code text.

- [ ] **Step 1: Add surface prop and wrapper class**

Add to Props:
```astro
interface Props {
  name: string;
  description: string;
  lang: string;
  code: string;
  index: number;
  surface?: 'paper' | 'ink';
}
```

Update destructuring:
```astro
const { name, description, lang, code, index, surface = 'paper' } = Astro.props;
```

Change article class:
```astro
<article class:list={['code-card', { 'code-card-ink': surface === 'ink' }]}>
```

- [ ] **Step 2: Add dark surface styles**

After existing `.code-card` rules, add:

```css
.code-card-ink {
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(255, 255, 255, 0.08);
}

.code-card-ink .code-card-index,
.code-card-ink .code-card-lang {
  color: var(--text-on-ink-muted);
  border-color: rgba(255, 255, 255, 0.15);
}

.code-card-ink .code-card-name {
  color: var(--text-on-ink);
}

.code-card-ink .code-card-desc {
  color: var(--text-on-ink-muted);
}

.code-card-ink .code-card-body {
  background: rgba(0, 0, 0, 0.35);
  border-top-color: rgba(255, 255, 255, 0.08);
}

.code-card-ink .code-card-pre {
  color: rgba(255, 255, 255, 0.85);
}

.code-card-ink .copy-code-btn {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-on-ink);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.code-card-ink .copy-code-btn:hover {
  background: rgba(255, 255, 255, 0.18);
}

.code-card-ink .copy-code-btn.copied {
  background: var(--acid);
  color: var(--text-on-acid);
  border-color: var(--acid);
}

.code-card-ink .copy-code-btn:focus-visible {
  outline-color: var(--acid);
}
```

- [ ] **Step 3: Set explicit light code text for paper too**

Change `.code-card-pre` color:
```css
.code-card-pre {
  flex: 1;
  margin: 0;
  padding: 20px;
  padding-right: 70px;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  overflow-x: auto;
  white-space: pre;
  word-wrap: normal;
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/patterns/CodeCard.astro
git commit -m "feat: CodeCard dark glass variant with accessible code text"
```

---

### Task 5: Update ControlsTable for dark glass styling

**Files:**
- Modify: `src/components/patterns/ControlsTable.astro:32-93`

**Interfaces:**
- Consumes: `controls` array.
- Produces: `.controls-table-ink` styling.

- [ ] **Step 1: Add surface prop and wrapper class**

Add to Props:
```astro
interface Props {
  controls: ControlRow[];
  surface?: 'paper' | 'ink';
}
```

Update:
```astro
const { controls, surface = 'paper' } = Astro.props;
```

Change wrapper:
```astro
<div class:list={['controls-table-wrapper', { 'controls-table-ink': surface === 'ink' }]}>
```

- [ ] **Step 2: Add dark surface styles**

After existing styles, add:

```css
.controls-table-ink {
  border-color: rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.045);
  backdrop-filter: blur(20px) saturate(140%);
}

.controls-table-ink .controls-table thead {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.controls-table-ink .controls-table th {
  color: var(--text-on-ink-muted);
  background: rgba(255, 255, 255, 0.05);
}

.controls-table-ink .controls-table td {
  color: var(--text-on-ink);
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

.controls-table-ink .controls-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.03);
}

.controls-table-ink .controls-table code {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-on-ink);
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/patterns/ControlsTable.astro
git commit -m "feat: ControlsTable dark glass styling"
```

---

### Task 6: Update FAQ component for dark surface

**Files:**
- Modify: `src/components/FAQ.astro:15-73`

**Interfaces:**
- Consumes: `faqs`, `heading`, optional `surface`.
- Produces: dark accordion when `surface="ink"`.

- [ ] **Step 1: Add surface prop**

Add to Props:
```astro
interface Props {
  faqs: FAQItem[];
  heading?: string;
  backgroundColor?: string;
  surface?: 'paper' | 'ink';
}
```

Update destructuring and section style:
```astro
const {
  faqs,
  heading = "FAQ",
  backgroundColor = "var(--text-on-paper)",
  surface = 'paper'
} = Astro.props;
```

Change section:
```astro
<section class:list={['faq', { 'faq-ink': surface === 'ink' }]} style={`background-color: ${backgroundColor};`}>
```

- [ ] **Step 2: Add dark styles**

Add after existing `.faq` styles:

```css
.faq-ink {
  background-color: var(--surface-ink) !important;
}

.faq-ink .faq-card {
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(255, 255, 255, 0.08);
}

.faq-ink .faq-question-text {
  color: var(--text-on-ink);
}

.faq-ink .faq-icon {
  background-color: rgba(255, 255, 255, 0.12);
}

.faq-ink .faq-icon svg {
  fill: var(--text-on-ink);
}

.faq-ink .faq-icon:hover {
  background-color: var(--acid) !important;
}

.faq-ink .faq-icon:hover svg {
  fill: var(--text-on-paper) !important;
}

.faq-ink .faq-answer {
  color: var(--text-on-ink-muted) !important;
  border-top-color: rgba(255, 255, 255, 0.1);
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/FAQ.astro
git commit -m "feat: FAQ dark surface support"
```

---

### Task 7: Update BlockDetailLayout for dark surfaces and demo rendering

**Files:**
- Modify: `src/components/patterns/BlockDetailLayout.astro:22-271`

**Interfaces:**
- Consumes: `block`, `prev`, `next`, `index`.
- Produces: dark layout, sticky demo stage, glass controls/accessibility/prev-next.

- [ ] **Step 1: Set hero to dark and add wrapper class**

Change:
```astro
<HeaderSplit ... surface="paper" ...>
```
to:
```astro
<div class="block-detail-layout" data-surface="ink">
  <HeaderSplit ... surface="ink" ...>
```

Or wrap the whole component in a div with `data-surface="ink"`.

- [ ] **Step 2: Update section backgrounds and text colors**

Add scoped dark styles at the bottom of the style block:

```css
.block-detail-layout {
  background: var(--surface-ink);
  color: var(--text-on-ink);
}

.block-detail-layout .block-demo-section,
.block-detail-layout .block-accessibility-section {
  background: transparent;
}

.block-detail-layout .block-controls-section {
  background: transparent;
}

.block-detail-layout .controls-heading {
  color: var(--text-on-ink);
}

.block-detail-layout .demo-caption {
  color: var(--text-on-ink-muted);
}

.block-detail-layout .block-detail-category,
.block-detail-layout .back-link {
  color: var(--text-on-ink-muted);
}

.block-detail-layout .back-link {
  border-bottom-color: rgba(255, 255, 255, 0.2);
}

.block-detail-layout .back-link:hover {
  border-color: var(--text-on-ink);
}

.block-detail-layout .block-accessibility-inner {
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(255, 255, 255, 0.08);
}

.block-detail-layout .block-accessibility-inner p,
.block-detail-layout .block-accessibility-inner strong {
  color: var(--text-on-ink);
}

.block-detail-layout .block-accessibility-inner strong {
  color: var(--text-on-ink);
}

.block-detail-layout .accessibility-icon {
  background: var(--acid);
  color: var(--text-on-acid);
}

.block-detail-layout .prev-next-card {
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(255, 255, 255, 0.08);
}

.block-detail-layout .prev-next-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
}

.block-detail-layout .prev-next-label,
.block-detail-layout .prev-next-category {
  color: var(--text-on-ink-muted);
}

.block-detail-layout .prev-next-name {
  color: var(--text-on-ink);
}
```

- [ ] **Step 3: Constrain demo stage**

Add:
```css
.block-demo-inner {
  width: 100%;
  max-width: var(--container-wide);
  margin: 0 auto;
}

.block-demo-inner :global(> *) {
  width: 100%;
  max-height: 70vh;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.block-demo-inner :global(> * > *) {
  width: 100%;
  height: 100%;
}
```

- [ ] **Step 4: Update ControlsTable usage**

Change:
```astro
<ControlsTable controls={block.controls} />
```
to:
```astro
<ControlsTable controls={block.controls} surface="ink" />
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/patterns/BlockDetailLayout.astro
git commit -m "feat: BlockDetailLayout dark surfaces and demo stage fix"
```

---

### Task 8: Update /blocks/ page to dark glass cards and CTA

**Files:**
- Modify: `src/pages/blocks.astro:24-267`

**Interfaces:**
- Consumes: `HeaderSplit`, `Button`, `blocks` data.
- Produces: dark page with glass block cards and glass bottom CTA.

- [ ] **Step 1: Change HeaderSplit surface to ink**

```astro
surface="ink"
```

- [ ] **Step 2: Wrap page in ink surface**

Add a wrapper div around all content with `data-surface="ink"` and set page background to ink:

```astro
<BaseLayout ...>
  <div class="blocks-page" data-surface="ink">
    ...existing content...
  </div>
</BaseLayout>
```

- [ ] **Step 3: Update section styles to dark glass**

Change `.blocks-grid-section` background to transparent.

Change `.block-card` styles:
```css
.block-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.block-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -24px rgba(0, 0, 0, 0.6);
}

.block-number {
  color: rgba(255, 255, 255, 0.3);
}

.block-card:hover .block-number {
  color: var(--acid);
}

.block-icon-tile {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--text-on-ink);
}

.block-name {
  color: var(--text-on-ink);
}

.block-category {
  color: var(--text-on-ink-muted);
}

.block-tagline {
  color: rgba(255, 255, 255, 0.55);
}

.block-cta {
  color: var(--acid);
}
```

- [ ] **Step 4: Convert closing banner to glass**

Change `.closing-banner`:
```css
.closing-banner {
  width: 100%;
  background: transparent;
  padding: 80px 40px;
  box-sizing: border-box;
}

.closing-banner-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
}

.closing-title {
  color: var(--text-on-ink);
}

.closing-body {
  color: var(--text-on-ink-muted);
}
```

Remove `data-surface="acid"` from the closing banner section.

- [ ] **Step 5: Verify build and visual**

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/blocks.astro
git commit -m "feat: dark glass /blocks/ page with non-acid CTA banner"
```

---

### Task 9: Update /pricing/ page to dark surfaces

**Files:**
- Modify: `src/pages/pricing.astro:52-485`

**Interfaces:**
- Consumes: `HeaderSplit`, `PricingCards`, `StatusLedger`, `FAQ`, pricing data.
- Produces: dark pricing page.

- [ ] **Step 1: Wrap page in ink surface**

```astro
<BaseLayout ...>
  <div class="pricing-page" data-surface="ink">
    ...existing content...
  </div>
</BaseLayout>
```

- [ ] **Step 2: Update HeaderSplit and PricingCards**

```astro
<HeaderSplit ... surface="ink" ...>
  <PricingCards variant="full" level="h2" surface="ink" />
</HeaderSplit>
```

- [ ] **Step 3: Update StatusLedger surface**

```astro
<StatusLedger ... surface="ink" />
```

- [ ] **Step 4: Update FAQ surface and add id**

```astro
<section class="faq-wrapper" id="faq">
  <FAQ {faqs} heading="Questions" surface="ink" />
</section>
```

- [ ] **Step 5: Darken risk section and ledger footer**

Change backgrounds to transparent and text colors to ink tokens:

```css
.pricing-page {
  background: var(--surface-ink);
  color: var(--text-on-ink);
}

.pricing-hero-section {
  background: transparent;
}

.ledger-section,
.risk-section,
.faq-wrapper {
  background: transparent;
}

.risk-title {
  color: var(--text-on-ink);
}

.risk-content p {
  color: var(--text-on-ink-muted);
}

.ledger-footer {
  color: var(--text-on-ink-muted);
  border-top-color: rgba(255, 255, 255, 0.1);
}
```

- [ ] **Step 6: Remove unused duplicate pricing CSS**

Delete lines 232-484 (the unused `.pricing-cards-grid`, `.pricing-card`, etc. rules). Keep only the section-level rules.

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/pages/pricing.astro
git commit -m "feat: dark /pricing/ page with aligned cards and cleaned CSS"
```

---

### Task 10: Update /hacks/ page to dark surfaces and non-acid CTA

**Files:**
- Modify: `src/pages/hacks.astro:66-198`

**Interfaces:**
- Consumes: `HeaderSplit`, `CodeCard`, `Button`.
- Produces: dark hacks page with glass code cards and glass CTA banner.

- [ ] **Step 1: Wrap page and set dark HeaderSplit**

```astro
<BaseLayout ...>
  <div class="hacks-page" data-surface="ink">
    <HeaderSplit ... surface="ink" ...>
```

- [ ] **Step 2: Pass surface="ink" to CodeCard**

```astro
<CodeCard ... surface="ink" />
```

- [ ] **Step 3: Convert vault CTA to glass banner**

Change section:
```astro
<section class="vault-cta">
  <div class="vault-cta-inner glass">
    ...
  </div>
</section>
```

Remove `data-surface="acid"`.

- [ ] **Step 4: Update styles**

```css
.hacks-page {
  background: var(--surface-ink);
  color: var(--text-on-ink);
}

.hacks-grid-section {
  background: transparent;
}

.hacks-hero-lead {
  color: var(--text-on-ink);
}

.hacks-hero-body {
  color: var(--text-on-ink-muted);
}

.hacks-hero-body strong {
  color: var(--text-on-ink);
}

.vault-cta {
  width: 100%;
  background: transparent;
  padding: 80px 40px;
  box-sizing: border-box;
}

.vault-cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
}

.vault-title {
  color: var(--text-on-ink);
}

.vault-body {
  color: var(--text-on-ink-muted);
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/hacks.astro
git commit -m "feat: dark /hacks/ page with glass code cards and CTA banner"
```

---

### Task 11: Update /contact/ page — form width cap and support link

**Files:**
- Modify: `src/pages/contact.astro:14-392`

**Interfaces:**
- Consumes: `HeaderSplit`, `socialLinks`.
- Produces: dark contact page with capped form width and support resource card.

- [ ] **Step 1: Wrap page in ink surface**

```astro
<BaseLayout ...>
  <div class="contact-page" data-surface="ink">
    <HeaderSplit ... surface="ink" ...>
```

- [ ] **Step 2: Cap form width**

Change `.contact-form-wrapper`:
```css
.contact-form-wrapper {
  width: 100%;
  max-width: 640px;
  min-width: 500px;
}
```

Add responsive min-width reset:
```css
@media (max-width: 640px) {
  .contact-form-wrapper {
    min-width: auto;
  }
}
```

- [ ] **Step 3: Dark form inputs**

```css
.contact-page .form-field input[type="text"],
.contact-page .form-field input[type="email"],
.contact-page .form-field textarea {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--text-on-ink);
}

.contact-page .form-field input[type="text"]:focus,
.contact-page .form-field input[type="email"]:focus,
.contact-page .form-field textarea:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--acid);
}

.contact-page .form-field input::placeholder,
.contact-page .form-field textarea::placeholder {
  color: var(--text-on-ink-muted);
}

.contact-page .form-label {
  color: var(--text-on-ink);
}

.contact-page .topic-option {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--text-on-ink);
}

.contact-page .topic-option:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
}

.contact-page .submit-button {
  background: var(--acid);
  color: var(--text-on-acid);
  border-color: var(--acid);
}

.contact-page .submit-button:hover {
  background: transparent;
  color: var(--acid);
}
```

- [ ] **Step 4: Change FAQ resource card to Support**

```astro
<div class="resource-card">
  <h3 class="resource-title">Support</h3>
  <p class="resource-description">Troubleshooting guides, installation help, licensing answers, and common fixes.</p>
  <a href="/support/" class="resource-link">View Support →</a>
</div>
```

- [ ] **Step 5: Dark resources section**

```css
.contact-page {
  background: var(--surface-ink);
  color: var(--text-on-ink);
}

.resources-section {
  background: transparent;
}

.resources-heading {
  color: var(--text-on-ink);
}

.resources-description {
  color: var(--text-on-ink-muted);
}

.resource-card {
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(255, 255, 255, 0.08);
}

.resource-card .resource-title {
  color: var(--text-on-ink);
}

.resource-card .resource-description {
  color: var(--text-on-ink-muted);
}

.resource-link {
  color: var(--text-on-ink);
  border-bottom-color: rgba(255, 255, 255, 0.2);
}

.resource-link:hover {
  color: var(--acid);
  border-bottom-color: var(--acid);
}
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: dark /contact/ page with capped form and support link"
```

---

### Task 12: Update /early-access/ page — dark surface and form width cap

**Files:**
- Modify: `src/pages/early-access.astro:13-321`

**Interfaces:**
- Consumes: `HeaderSplit`, `Button`, pricing data.
- Produces: dark early-access page with capped form.

- [ ] **Step 1: Wrap page and set HeaderSplit to ink**

```astro
<BaseLayout ...>
  <div class="early-access-page" data-surface="ink">
    <section class="early-access-section">
      <HeaderSplit ... surface="ink" ...>
```

- [ ] **Step 2: Cap form width**

```css
.early-access-form-wrapper {
  width: 100%;
  max-width: 640px;
  min-width: 500px;
}

@media (max-width: 640px) {
  .early-access-form-wrapper {
    min-width: auto;
  }
}
```

- [ ] **Step 3: Dark form styles**

```css
.early-access-page {
  background: var(--surface-ink);
  color: var(--text-on-ink);
}

.early-access-section {
  background: transparent;
}

.early-access-page .form-label,
.early-access-page .form-legend,
.early-access-page .radio-label {
  color: var(--text-on-ink);
}

.early-access-page .form-input {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--text-on-ink);
}

.early-access-page .form-input:focus {
  border-color: var(--acid);
  box-shadow: 0 0 0 3px rgba(237, 255, 16, 0.15);
}

.early-access-page .form-input::placeholder {
  color: var(--text-on-ink-muted);
}

.early-access-page .form-hint,
.early-access-page .form-disclaimer {
  color: var(--text-on-ink-muted);
}

.early-access-page .radio-input {
  accent-color: var(--acid);
}

.early-access-page .form-success {
  background: rgba(255, 255, 255, 0.06);
}

.early-access-page .success-heading,
.early-access-page .success-body {
  color: var(--text-on-ink);
}

.early-access-page .success-body {
  color: var(--text-on-ink-muted);
}
```

- [ ] **Step 4: Fix form action trailing slash**

Change:
```astro
action="/welcome"
```
to:
```astro
action="/welcome/"
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/early-access.astro
git commit -m "feat: dark /early-access/ page with capped form width"
```

---

### Task 13: Create /support/ troubleshooting page

**Files:**
- Create: `src/pages/support.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `Header`, `Footer`, `HeaderSplit`, `FAQ`.
- Produces: `/support/` route with dark surfaces and troubleshooting content.

- [ ] **Step 1: Create support.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import HeaderSplit from '../components/patterns/HeaderSplit.astro';
import FAQ from '../components/FAQ.astro';

const title = "Support - Basalio";
const description = "Basalio support, troubleshooting, and help documentation.";

const categories = [
  {
    title: "Getting started",
    faqs: [
      { question: "How do I install Basalio?", answer: "Download the plugin from WordPress.org, upload it to your WordPress site, and activate it. All nine blocks appear in the block editor immediately." },
      { question: "Do the blocks work with any theme?", answer: "Yes. Basalio blocks are built for the WordPress block editor and work with any modern block-ready theme." },
    ]
  },
  {
    title: "Block behavior",
    faqs: [
      { question: "Why isn't my animation playing?", answer: "Check that motion is not disabled in your OS or browser settings. Basalio respects prefers-reduced-motion, so animations are disabled when the user requests reduced motion." },
      { question: "Can I use multiple blocks on the same page?", answer: "Yes. You can stack and combine blocks however you like. Each block loads the shared script only once per page." },
    ]
  },
  {
    title: "Licensing",
    faqs: [
      { question: "Are the nine blocks free forever?", answer: "Yes. All nine blocks are free on WordPress.org under GPL-2.0-or-later. No locked features, no watermarks." },
      { question: "What does the founder license include?", answer: "The Pro control center sidebar, the full Hacks vault, future blocks, and a direct support line. It is a one-time payment for unlimited sites." },
    ]
  },
  {
    title: "Performance",
    faqs: [
      { question: "Will Basalio slow down my site?", answer: "No. A single shared script loads only on pages that use a Basalio block. There is no global framework, no jQuery, and no render-blocking stylesheet." },
      { question: "What happens if I uninstall Basalio?", answer: "Your blocks degrade to static, semantic markup. Grids stay grids; text stays text. Nothing breaks." },
    ]
  },
];

const allFaqs = categories.flatMap((c) => c.faqs);
---

<BaseLayout {title} {description}>
  <Fragment slot="header">
    <Header />
  </Fragment>

  <div class="support-page" data-surface="ink">
    <HeaderSplit
      eyebrow="Help Center"
      heading="Support & troubleshooting"
      body="Find answers to common questions about installation, blocks, licensing, and performance. Still stuck? Contact us directly."
      level="h1"
      surface="ink"
    >
      <div class="support-hero-right">
        <p class="support-hero-lead">Search the knowledge base</p>
        <input type="text" class="support-search" placeholder="What do you need help with?" aria-label="Search support" />
      </div>
    </HeaderSplit>

    <section class="support-faq-section">
      <div class="support-faq-inner">
        <FAQ faqs={allFaqs} heading="Common issues" surface="ink" />
      </div>
    </section>

    <section class="support-contact-section">
      <div class="support-contact-inner glass">
        <h2 class="support-contact-heading">Still need help?</h2>
        <p class="support-contact-body">Can't find what you're looking for? Send a message and we'll get back to you within 48 hours.</p>
        <a href="/contact/" class="support-contact-button">Contact support</a>
      </div>
    </section>
  </div>

  <Fragment slot="footer">
    <Footer hideNewsletter={true} />
  </Fragment>
</BaseLayout>

<style>
  .support-page {
    background: var(--surface-ink);
    color: var(--text-on-ink);
  }

  .support-hero-right {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .support-hero-lead {
    font-size: clamp(18px, 2vw, 24px);
    font-weight: var(--font-weight-bold);
    line-height: 1.4;
    color: var(--text-on-ink);
    margin: 0;
  }

  .support-search {
    width: 100%;
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: var(--text-on-ink);
    font-family: var(--font-sans);
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }

  .support-search::placeholder {
    color: var(--text-on-ink-muted);
  }

  .support-search:focus {
    border-color: var(--acid);
    background: rgba(255, 255, 255, 0.08);
  }

  .support-faq-section {
    width: 100%;
    padding: 0 40px 80px;
    box-sizing: border-box;
  }

  .support-faq-inner {
    width: 100%;
    max-width: var(--container-wide);
    margin: 0 auto;
  }

  .support-contact-section {
    width: 100%;
    padding: 0 40px 120px;
    box-sizing: border-box;
  }

  .support-contact-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
  }

  .support-contact-heading {
    font-size: 28px;
    font-weight: var(--font-weight-normal);
    color: var(--text-on-ink);
    margin: 0;
  }

  .support-contact-body {
    color: var(--text-on-ink-muted);
    margin: 0;
  }

  .support-contact-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 24px;
    background: var(--acid);
    color: var(--text-on-acid);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 8px;
    transition: transform 150ms ease;
  }

  .support-contact-button:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .support-faq-section,
    .support-contact-section {
      padding-left: 20px;
      padding-right: 20px;
    }

    .support-contact-inner {
      padding: 24px;
    }

    .support-contact-heading {
      font-size: 24px;
    }
  }
</style>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS and `/support/index.html` is generated.

- [ ] **Step 3: Commit**

```bash
git add src/pages/support.astro
git commit -m "feat: add /support/ troubleshooting page"
```

---

### Task 14: Update /terms/ and /privacy/ pages to dark surfaces

**Files:**
- Modify: `src/pages/terms.astro`
- Modify: `src/pages/privacy.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `Header`, `Footer`, `HeaderSplit`.
- Produces: dark, readable legal pages.

- [ ] **Step 1: Wrap terms page in ink surface and set HeaderSplit**

```astro
<BaseLayout ...>
  <div class="terms-page" data-surface="ink">
    <HeaderSplit ... surface="ink" ...>
```

- [ ] **Step 2: Darken terms styles**

```css
.terms-page {
  background: var(--surface-ink);
  color: var(--text-on-ink);
}

.terms-page .scope-label {
  color: var(--text-on-ink-muted);
}

.terms-page .scope-statement {
  color: var(--text-on-ink);
}

.terms-nav-section {
  background: transparent;
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.terms-nav-label {
  color: var(--text-on-ink-muted);
}

.terms-nav-link {
  color: var(--text-on-ink-muted);
  border-color: rgba(255, 255, 255, 0.12);
}

.terms-nav-link:hover {
  border-color: var(--acid);
  color: var(--text-on-ink);
}

.terms-content {
  background: transparent;
}

.section-heading {
  color: var(--text-on-ink);
}

.section-text,
.section-list {
  color: var(--text-on-ink-muted);
}

.section-list li::marker {
  color: var(--text-on-ink-muted);
}

.terms-link {
  color: var(--text-on-ink);
}
```

- [ ] **Step 3: Wrap privacy page in ink surface and set HeaderSplit**

Same pattern as terms.

- [ ] **Step 4: Darken privacy styles**

Same token swaps as terms, plus:

```css
.privacy-page .section-number {
  color: var(--text-on-ink-muted);
}

.privacy-page .section-list a {
  color: var(--text-on-ink);
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/terms.astro src/pages/privacy.astro
git commit -m "feat: dark /terms/ and /privacy/ pages"
```

---

### Task 15: Final verification and cleanup

**Files:**
- Modify: any remaining issues found during verification.

**Interfaces:**
- Consumes: all previous tasks.
- Produces: green build, passing verification, no regressions.

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: 27 pages generated (including new /support/).

- [ ] **Step 2: Start preview and run verification**

```bash
npm run preview &
sleep 3
node scripts/verify-internal-pages.mjs
```

Expected: all routes pass.

- [ ] **Step 3: Manual visual checklist**

Open http://localhost:4321/ in browser and verify:
- /blocks/ is dark, cards are glass, bottom CTA is not acid.
- /blocks/grid-reveal/ demo fits inside stage, controls table readable.
- /pricing/ cards are equal height and CTA buttons align.
- /hacks/ code text is light on dark, bottom CTA is glass.
- /contact/ form is capped ~640px, support link points to /support/.
- /early-access/ form is capped ~640px.
- /support/ exists, is dark, accordion works.
- /terms/ and /privacy/ are dark and readable.
- Header flips to white on all dark pages.
- Footer remains acid on all pages.
- No horizontal overflow at 320px.

- [ ] **Step 4: Fix any issues found and re-verify**

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete internal pages dark pivot"
```

---

## Self-review

**Spec coverage:**
- Dark surfaces for all internal pages: Tasks 7-14.
- Glass utility: Task 1.
- Pricing card alignment: Task 3.
- Hacks code legibility: Task 4.
- Hacks non-acid CTA banner: Task 10.
- Contact/early-access form width: Tasks 11-12.
- Support page: Task 13.
- Terms/privacy polish: Task 14.

**Placeholder scan:** No TBD/TODO/fill-in placeholders. Every step includes concrete code or exact commands.

**Type consistency:** Component props (`surface`, `variant`, `level`) are consistent across `PricingCards`, `CodeCard`, `ControlsTable`, `FAQ`, and pages.
