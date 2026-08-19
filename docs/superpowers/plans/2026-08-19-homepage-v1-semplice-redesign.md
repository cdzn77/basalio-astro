# Homepage v1 Semplice-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the compact 3-column block grid on `homepage-v1` with nine Semplice-style full-width feature sections, each containing a headline, body, and a looping animated browser mockup built from inline SVG/CSS.

**Architecture:** Add reusable `FeatureSection` and `BrowserFrame` components, then create one focused mockup component per Basalio block. Each mockup is pure CSS/SVG animation, rendered inside a shared dark browser chrome. Scroll-triggered fade-ins are applied with a lightweight `IntersectionObserver` utility. `homepage-v1.astro` composes the sections in an alternating surface rhythm.

**Tech Stack:** Astro 7, vanilla CSS, inline SVG, IntersectionObserver (no animation libraries).

**Spec:** `docs/superpowers/specs/2026-08-19-homepage-v1-semplice-redesign.md`

## Global Constraints

- Basalio brand colors only: `--acid`, `--surface-ink`, `--surface-paper`, `--surface-alt`.
- No raster images of humans; all mockups are code (SVG/CSS).
- Do not reuse existing `/assets/demos/block-*.svg` files.
- Respect `prefers-reduced-motion`.
- Every task ends with a working build check (`npm run build`).

---

## File Structure

- `src/components/demos/FeatureSection.astro` — full-width section shell with alternating 2-column layout.
- `src/components/demos/BrowserFrame.astro` — dark browser chrome wrapper.
- `src/components/demos/mockups/GridRevealMockup.astro`
- `src/components/demos/mockups/TextRevealMockup.astro`
- `src/components/demos/mockups/ScrollSequenceMockup.astro`
- `src/components/demos/mockups/PinnedScrollMockup.astro`
- `src/components/demos/mockups/BeforeAfterMockup.astro`
- `src/components/demos/mockups/CaseStudyTransitionMockup.astro`
- `src/components/demos/mockups/CustomCursorMockup.astro`
- `src/components/demos/mockups/FilterableGridMockup.astro`
- `src/components/demos/mockups/MagneticButtonMockup.astro`
- `src/pages/homepage-v1.astro` — restructure block gallery into feature sections.
- `src/styles/global.css` — add `.reveal`, `.reveal-visible`, and reduced-motion rules.

---

### Task 1: Add scroll-reveal CSS utilities

**Files:**
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: `.reveal`, `.reveal-visible`, `.reveal > *` stagger, and `@media (prefers-reduced-motion: reduce)` overrides.

- [ ] **Step 1: Add reveal styles**

Append to `src/styles/global.css`:

```css
/* Scroll-triggered reveal */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal > * {
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.reveal > *:nth-child(1) { transition-delay: 0ms; }
.reveal > *:nth-child(2) { transition-delay: 100ms; }
.reveal > *:nth-child(3) { transition-delay: 200ms; }
.reveal > *:nth-child(4) { transition-delay: 300ms; }
.reveal > *:nth-child(5) { transition-delay: 400ms; }

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal > * {
    opacity: 1;
    transform: none;
    transition: opacity 0.2s ease-out;
    transition-delay: 0ms !important;
  }
}
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add scroll-reveal utility classes"
```

---

### Task 2: Create BrowserFrame component

**Files:**
- Create: `src/components/demos/BrowserFrame.astro`

**Interfaces:**
- Props: `children` (slot)
- Produces: `.browser-frame` markup with dark chrome and three traffic-light dots.

- [ ] **Step 1: Write BrowserFrame.astro**

```astro
---
// BrowserFrame — minimal dark browser chrome for mockups
---

<div class="browser-frame" aria-hidden="true">
  <div class="browser-chrome">
    <span class="browser-dot"></span>
    <span class="browser-dot"></span>
    <span class="browser-dot"></span>
  </div>
  <div class="browser-content">
    <slot />
  </div>
</div>

<style>
  .browser-frame {
    width: 100%;
    background: #0d0d0d;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .browser-chrome {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .browser-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.18);
  }

  .browser-dot:first-child {
    background: #ff5f57;
  }

  .browser-dot:nth-child(2) {
    background: #febc2e;
  }

  .browser-dot:nth-child(3) {
    background: #28c840;
  }

  .browser-content {
    padding: 24px;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .browser-content {
      min-height: 220px;
      padding: 16px;
    }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/BrowserFrame.astro
git commit -m "feat: add BrowserFrame mockup shell"
```

---

### Task 3: Create FeatureSection component

**Files:**
- Create: `src/components/demos/FeatureSection.astro`

**Interfaces:**
- Props: `surface: 'acid' | 'ink' | 'paper' | 'alt'`, `number?: string`, `label?: string`, `headline: string`, `body?: string`, `href?: string`, `reverse?: boolean`
- Slot: `mockup` — receives the animated browser mockup.
- Produces: `.feature-section` markup with alternating 2-column layout and reveal classes.

- [ ] **Step 1: Write FeatureSection.astro**

```astro
---
// FeatureSection — Semplice-style full-width feature block
import EditorialLabel from './EditorialLabel.astro';

interface Props {
  surface: 'acid' | 'ink' | 'paper' | 'alt';
  number?: string;
  label?: string;
  headline: string;
  body?: string;
  href?: string;
  reverse?: boolean;
}

const { surface, number, label, headline, body, href, reverse = false } = Astro.props;

const bgMap = {
  acid: 'var(--acid)',
  ink: 'var(--surface-ink)',
  paper: 'var(--surface-paper)',
  alt: 'var(--surface-alt)',
};

const colorMap = {
  acid: 'var(--text-on-acid)',
  ink: 'var(--text-on-ink)',
  paper: 'var(--text-on-paper)',
  alt: 'var(--text-on-paper)',
};

const mutedMap = {
  acid: 'var(--text-on-acid-muted)',
  ink: 'var(--text-on-ink-muted)',
  paper: 'var(--text-on-paper-muted)',
  alt: 'var(--text-on-paper-muted)',
};

const labelColor = surface === 'ink' ? 'paper' : 'ink';
---

<section class="feature-section" data-surface={surface} data-reverse={reverse}>
  <div class="feature-inner reveal">
    <div class="feature-text">
      {number && <span class="feature-number" aria-hidden="true">{number}</span>}
      {label && <EditorialLabel text={label} color={labelColor} />}
      <h2 class="feature-headline">{headline}</h2>
      {body && <p class="feature-body">{body}</p>}
      {href && (
        <a href={href} class="feature-cta">
          <span>Learn more</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      )}
    </div>
    <div class="feature-mockup">
      <slot name="mockup" />
    </div>
  </div>
</section>

<style define:vars={{ bg: bgMap[surface], color: colorMap[surface], muted: mutedMap[surface] }}>
  .feature-section {
    width: 100%;
    background-color: var(--bg);
    padding: 120px 40px;
    box-sizing: border-box;
  }

  .feature-inner {
    width: 100%;
    max-width: var(--container-wide);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .feature-section[data-reverse='true'] .feature-inner {
    direction: rtl;
  }

  .feature-section[data-reverse='true'] .feature-text,
  .feature-section[data-reverse='true'] .feature-mockup {
    direction: ltr;
  }

  .feature-text {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .feature-number {
    font-family: var(--font-mono);
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--label-letter-spacing);
    text-transform: uppercase;
    color: var(--muted);
  }

  .feature-headline {
    font-family: var(--font-sans);
    font-size: clamp(36px, 5vw, 72px);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--heading-letter-spacing);
    color: var(--color);
    margin: 0;
    text-wrap: balance;
  }

  .feature-body {
    font-size: var(--font-size-body);
    line-height: var(--line-height-relaxed);
    color: var(--muted);
    margin: 0;
    max-width: 520px;
  }

  .feature-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
    padding: 12px 20px;
    border: 1px solid currentColor;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-medium);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .feature-cta:hover {
    background-color: var(--color);
    color: var(--bg);
  }

  .feature-cta svg {
    transition: transform 0.3s ease;
  }

  .feature-cta:hover svg {
    transform: translateX(4px);
  }

  @media (max-width: 1024px) {
    .feature-inner {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }

  @media (max-width: 768px) {
    .feature-section {
      padding: 80px 20px;
    }

    .feature-headline {
      font-size: clamp(28px, 8vw, 48px);
    }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/FeatureSection.astro
git commit -m "feat: add FeatureSection shell"
```

---

### Task 4: Create GridReveal mockup

**Files:**
- Create: `src/components/demos/mockups/GridRevealMockup.astro`

**Interfaces:**
- Consumes: `BrowserFrame`
- Produces: Animated cascading masonry cards inside a browser frame.

- [ ] **Step 1: Write GridRevealMockup.astro**

```astro
---
// GridRevealMockup — cascading cards animate into a masonry layout
import BrowserFrame from '../BrowserFrame.astro';
---

<BrowserFrame>
  <div class="grid-reveal">
    <div class="gr-card gr-card-1"></div>
    <div class="gr-card gr-card-2"></div>
    <div class="gr-card gr-card-3"></div>
    <div class="gr-card gr-card-4"></div>
  </div>
</BrowserFrame>

<style>
  .grid-reveal {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 60px);
    gap: 12px;
    width: 100%;
  }

  .gr-card {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    opacity: 0;
    transform: translateY(20px) scale(0.96);
    animation: gridRevealIn 2.4s ease-in-out infinite;
  }

  .gr-card-1 {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    animation-delay: 0s;
  }

  .gr-card-2 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    animation-delay: 0.25s;
  }

  .gr-card-3 {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
    animation-delay: 0.5s;
  }

  .gr-card-4 {
    grid-column: 2 / 3;
    grid-row: 2 / 4;
    animation-delay: 0.75s;
  }

  @keyframes gridRevealIn {
    0%, 35% {
      opacity: 0;
      transform: translateY(20px) scale(0.96);
    }
    45%, 80% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    90%, 100% {
      opacity: 0;
      transform: translateY(-10px) scale(0.98);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .gr-card {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/mockups/GridRevealMockup.astro
git commit -m "feat: add GridReveal mockup"
```

---

### Task 5: Create TextReveal mockup

**Files:**
- Create: `src/components/demos/mockups/TextRevealMockup.astro`

**Interfaces:**
- Consumes: `BrowserFrame`
- Produces: Headline lines that reveal with a stagger loop.

- [ ] **Step 1: Write TextRevealMockup.astro**

```astro
---
// TextRevealMockup — headline lines reveal with a stagger loop
import BrowserFrame from '../BrowserFrame.astro';
---

<BrowserFrame>
  <div class="text-reveal">
    <div class="tr-line"><span>Design</span></div>
    <div class="tr-line"><span>that</span></div>
    <div class="tr-line"><span>moves.</span></div>
  </div>
</BrowserFrame>

<style>
  .text-reveal {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .tr-line {
    overflow: hidden;
    font-family: var(--font-sans);
    font-size: clamp(28px, 4vw, 52px);
    font-weight: var(--font-weight-bold);
    line-height: 1.1;
    color: #fff;
  }

  .tr-line span {
    display: inline-block;
    transform: translateY(100%);
    opacity: 0;
    animation: textRevealLine 2.8s ease-in-out infinite;
  }

  .tr-line:nth-child(1) span { animation-delay: 0s; }
  .tr-line:nth-child(2) span { animation-delay: 0.25s; }
  .tr-line:nth-child(3) span { animation-delay: 0.5s; }

  @keyframes textRevealLine {
    0%, 30% {
      transform: translateY(100%);
      opacity: 0;
    }
    40%, 75% {
      transform: translateY(0);
      opacity: 1;
    }
    85%, 100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tr-line span {
      animation: none;
      transform: none;
      opacity: 1;
    }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/mockups/TextRevealMockup.astro
git commit -m "feat: add TextReveal mockup"
```

---

### Task 6: Create ScrollSequence mockup

**Files:**
- Create: `src/components/demos/mockups/ScrollSequenceMockup.astro`

**Interfaces:**
- Consumes: `BrowserFrame`
- Produces: Vertical strip of frames that translates upward in a loop.

- [ ] **Step 1: Write ScrollSequenceMockup.astro**

```astro
---
// ScrollSequenceMockup — frame strip scrolls upward in a loop
import BrowserFrame from '../BrowserFrame.astro';
---

<BrowserFrame>
  <div class="scroll-sequence">
    <div class="ss-strip">
      <div class="ss-frame ss-frame-1"></div>
      <div class="ss-frame ss-frame-2"></div>
      <div class="ss-frame ss-frame-3"></div>
      <div class="ss-frame ss-frame-4"></div>
    </div>
  </div>
</BrowserFrame>

<style>
  .scroll-sequence {
    width: 100%;
    height: 260px;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
  }

  .ss-strip {
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: scrollSequence 4s ease-in-out infinite;
  }

  .ss-frame {
    height: 220px;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .ss-frame-1 { background: linear-gradient(135deg, #ff5f57 0%, #febc2e 100%); }
  .ss-frame-2 { background: linear-gradient(135deg, #28c840 0%, #00d2ff 100%); }
  .ss-frame-3 { background: linear-gradient(135deg, #7b61ff 0%, #ff61d2 100%); }
  .ss-frame-4 { background: linear-gradient(135deg, #febc2e 0%, #ff5f57 100%); }

  @keyframes scrollSequence {
    0%, 20% { transform: translateY(0); }
    33%, 53% { transform: translateY(calc(-100% / 4 - 12px)); }
    66%, 86% { transform: translateY(calc(-100% / 2 - 24px)); }
    100% { transform: translateY(calc(-100% * 3 / 4 - 36px)); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ss-strip {
      animation: none;
    }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/mockups/ScrollSequenceMockup.astro
git commit -m "feat: add ScrollSequence mockup"
```

---

### Task 7: Create PinnedScroll mockup

**Files:**
- Create: `src/components/demos/mockups/PinnedScrollMockup.astro`

**Interfaces:**
- Consumes: `BrowserFrame`
- Produces: Stacked panels that wipe/slide in sequence.

- [ ] **Step 1: Write PinnedScrollMockup.astro**

```astro
---
// PinnedScrollMockup — panels stack and wipe in sequence
import BrowserFrame from '../BrowserFrame.astro';
---

<BrowserFrame>
  <div class="pinned-scroll">
    <div class="ps-panel ps-panel-1"></div>
    <div class="ps-panel ps-panel-2"></div>
    <div class="ps-panel ps-panel-3"></div>
  </div>
</BrowserFrame>

<style>
  .pinned-scroll {
    width: 100%;
    height: 260px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
  }

  .ps-panel {
    position: absolute;
    inset: 0;
    border-radius: 8px;
    transform: translateY(100%);
    animation: pinnedScroll 3.6s ease-in-out infinite;
  }

  .ps-panel-1 {
    background: #1a1a1a;
    animation-delay: 0s;
  }

  .ps-panel-2 {
    background: var(--acid);
    animation-delay: 1.2s;
  }

  .ps-panel-3 {
    background: #2a2a2a;
    animation-delay: 2.4s;
  }

  @keyframes pinnedScroll {
    0%, 10% { transform: translateY(100%); }
    25%, 60% { transform: translateY(0); }
    75%, 100% { transform: translateY(-100%); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ps-panel {
      animation: none;
      transform: none;
      position: relative;
      height: 80px;
      margin-bottom: 8px;
    }

    .pinned-scroll {
      display: flex;
      flex-direction: column;
      gap: 8px;
      height: auto;
    }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/mockups/PinnedScrollMockup.astro
git commit -m "feat: add PinnedScroll mockup"
```

---

### Task 8: Create BeforeAfter mockup

**Files:**
- Create: `src/components/demos/mockups/BeforeAfterMockup.astro`

**Interfaces:**
- Consumes: `BrowserFrame`
- Produces: Split image with draggable divider that sweeps back and forth.

- [ ] **Step 1: Write BeforeAfterMockup.astro**

```astro
---
// BeforeAfterMockup — draggable divider sweeps across an abstract image
import BrowserFrame from '../BrowserFrame.astro';
---

<BrowserFrame>
  <div class="before-after">
    <div class="ba-layer ba-before"></div>
    <div class="ba-layer ba-after"></div>
    <div class="ba-divider">
      <div class="ba-handle">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 4l4 4-4 4M6 12L2 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</BrowserFrame>

<style>
  .before-after {
    width: 100%;
    height: 260px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
  }

  .ba-layer {
    position: absolute;
    inset: 0;
  }

  .ba-before {
    background: #1a1a1a;
  }

  .ba-before::after {
    content: 'Before';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-mono);
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.35);
  }

  .ba-after {
    background: var(--acid);
    clip-path: inset(0 50% 0 0);
    animation: beforeAfterWipe 3s ease-in-out infinite alternate;
  }

  .ba-after::after {
    content: 'After';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-mono);
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--surface-ink);
  }

  .ba-divider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: #fff;
    animation: beforeAfterDivider 3s ease-in-out infinite alternate;
  }

  .ba-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 36px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0d0d0d;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  @keyframes beforeAfterWipe {
    0% { clip-path: inset(0 80% 0 0); }
    100% { clip-path: inset(0 20% 0 0); }
  }

  @keyframes beforeAfterDivider {
    0% { left: 20%; }
    100% { left: 80%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ba-after,
    .ba-divider {
      animation: none;
    }

    .ba-after { clip-path: inset(0 50% 0 0); }
    .ba-divider { left: 50%; }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/mockups/BeforeAfterMockup.astro
git commit -m "feat: add BeforeAfter mockup"
```

---

### Task 9: Create CaseStudyTransition mockup

**Files:**
- Create: `src/components/demos/mockups/CaseStudyTransitionMockup.astro`

**Interfaces:**
- Consumes: `BrowserFrame`
- Produces: Project card that expands into detail view.

- [ ] **Step 1: Write CaseStudyTransitionMockup.astro**

```astro
---
// CaseStudyTransitionMockup — project card expands into detail view
import BrowserFrame from '../BrowserFrame.astro';
---

<BrowserFrame>
  <div class="case-study-transition">
    <div class="cst-card">
      <div class="cst-thumb"></div>
      <div class="cst-meta">
        <span class="cst-label">Project</span>
        <span class="cst-title">Monograph</span>
      </div>
    </div>
    <div class="cst-detail">
      <span class="cst-detail-label">Case Study</span>
      <span class="cst-detail-title">Monograph Studio</span>
      <div class="cst-detail-line"></div>
      <div class="cst-detail-line cst-detail-line-short"></div>
    </div>
  </div>
</BrowserFrame>

<style>
  .case-study-transition {
    width: 100%;
    height: 260px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cst-card {
    position: absolute;
    width: 140px;
    background: #1a1a1a;
    border-radius: 8px;
    overflow: hidden;
    animation: cstCard 4s ease-in-out infinite;
  }

  .cst-thumb {
    height: 100px;
    background: linear-gradient(135deg, #7b61ff 0%, #ff61d2 100%);
  }

  .cst-meta {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .cst-label {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }

  .cst-title {
    font-family: var(--font-sans);
    font-size: 16px;
    font-weight: var(--font-weight-bold);
    color: #fff;
  }

  .cst-detail {
    position: absolute;
    width: 100%;
    max-width: 320px;
    padding: 24px;
    opacity: 0;
    transform: scale(0.95);
    animation: cstDetail 4s ease-in-out infinite;
  }

  .cst-detail-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--acid);
    margin-bottom: 8px;
  }

  .cst-detail-title {
    display: block;
    font-family: var(--font-sans);
    font-size: 28px;
    font-weight: var(--font-weight-bold);
    color: #fff;
    margin-bottom: 16px;
  }

  .cst-detail-line {
    height: 8px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .cst-detail-line-short {
    width: 60%;
  }

  @keyframes cstCard {
    0%, 25% {
      opacity: 1;
      transform: scale(1);
    }
    40%, 100% {
      opacity: 0;
      transform: scale(1.08);
    }
  }

  @keyframes cstDetail {
    0%, 35% {
      opacity: 0;
      transform: scale(0.95);
    }
    50%, 90% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.98);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cst-card,
    .cst-detail {
      animation: none;
    }

    .cst-card { opacity: 0; }
    .cst-detail { opacity: 1; transform: none; }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/mockups/CaseStudyTransitionMockup.astro
git commit -m "feat: add CaseStudyTransition mockup"
```

---

### Task 10: Create CustomCursor mockup

**Files:**
- Create: `src/components/demos/mockups/CustomCursorMockup.astro`

**Interfaces:**
- Consumes: `BrowserFrame`
- Produces: Custom ring cursor tracing a figure-eight path.

- [ ] **Step 1: Write CustomCursorMockup.astro**

```astro
---
// CustomCursorMockup — custom ring cursor traces a figure-eight path
import BrowserFrame from '../BrowserFrame.astro';
---

<BrowserFrame>
  <div class="custom-cursor">
    <div class="cc-target cc-target-1">View</div>
    <div class="cc-target cc-target-2">Explore</div>
    <div class="cc-cursor"></div>
  </div>
</BrowserFrame>

<style>
  .custom-cursor {
    width: 100%;
    height: 260px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background: #0d0d0d;
  }

  .cc-target {
    position: absolute;
    padding: 12px 24px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  .cc-target-1 {
    top: 25%;
    left: 20%;
  }

  .cc-target-2 {
    bottom: 25%;
    right: 20%;
  }

  .cc-cursor {
    position: absolute;
    top: 0;
    left: 0;
    width: 36px;
    height: 36px;
    border: 2px solid var(--acid);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: customCursorPath 4s ease-in-out infinite;
  }

  @keyframes customCursorPath {
    0% { top: 35%; left: 25%; }
    25% { top: 75%; left: 75%; }
    50% { top: 35%; left: 75%; }
    75% { top: 75%; left: 25%; }
    100% { top: 35%; left: 25%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .cc-cursor {
      animation: none;
      top: 50%;
      left: 50%;
    }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/mockups/CustomCursorMockup.astro
git commit -m "feat: add CustomCursor mockup"
```

---

### Task 11: Create FilterableGrid mockup

**Files:**
- Create: `src/components/demos/mockups/FilterableGridMockup.astro`

**Interfaces:**
- Consumes: `BrowserFrame`
- Produces: Category pills and grid items that reorder with fade/slide.

- [ ] **Step 1: Write FilterableGridMockup.astro**

```astro
---
// FilterableGridMockup — category pills reorder grid items
import BrowserFrame from '../BrowserFrame.astro';
---

<BrowserFrame>
  <div class="filterable-grid">
    <div class="fg-pills">
      <span class="fg-pill fg-pill-active">All</span>
      <span class="fg-pill">Photo</span>
      <span class="fg-pill">Type</span>
    </div>
    <div class="fg-grid">
      <div class="fg-item fg-item-1"></div>
      <div class="fg-item fg-item-2"></div>
      <div class="fg-item fg-item-3"></div>
      <div class="fg-item fg-item-4"></div>
    </div>
  </div>
</BrowserFrame>

<style>
  .filterable-grid {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .fg-pills {
    display: flex;
    gap: 10px;
  }

  .fg-pill {
    padding: 8px 14px;
    border-radius: 100px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .fg-pill-active {
    background: var(--acid);
    color: var(--surface-ink);
    border-color: var(--acid);
  }

  .fg-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .fg-item {
    aspect-ratio: 1;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    animation: filterableGrid 2.8s ease-in-out infinite;
  }

  .fg-item-1 { animation-delay: 0s; }
  .fg-item-2 { animation-delay: 0.2s; }
  .fg-item-3 { animation-delay: 0.4s; }
  .fg-item-4 { animation-delay: 0.6s; }

  @keyframes filterableGrid {
    0%, 40% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    50% {
      opacity: 0;
      transform: translateY(10px) scale(0.96);
    }
    60%, 100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fg-item {
      animation: none;
    }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/mockups/FilterableGridMockup.astro
git commit -m "feat: add FilterableGrid mockup"
```

---

### Task 12: Create MagneticButton mockup

**Files:**
- Create: `src/components/demos/mockups/MagneticButtonMockup.astro`

**Interfaces:**
- Consumes: `BrowserFrame`
- Produces: Button with orbiting dot and subtle scale pulse.

- [ ] **Step 1: Write MagneticButtonMockup.astro**

```astro
---
// MagneticButtonMockup — button with orbiting dot and scale pulse
import BrowserFrame from '../BrowserFrame.astro';
---

<BrowserFrame>
  <div class="magnetic-button">
    <button class="mb-btn">
      <span class="mb-orbit"></span>
      <span class="mb-label">Get in touch</span>
    </button>
  </div>
</BrowserFrame>

<style>
  .magnetic-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mb-btn {
    position: relative;
    padding: 18px 36px;
    border: none;
    border-radius: 100px;
    background: var(--acid);
    color: var(--surface-ink);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: var(--font-weight-medium);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    animation: magneticPulse 2.4s ease-in-out infinite;
  }

  .mb-orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    margin-top: -6px;
    margin-left: -6px;
    background: #fff;
    border-radius: 50%;
    transform: translate(60px, 0);
    animation: magneticOrbit 2.4s ease-in-out infinite;
  }

  .mb-label {
    position: relative;
    z-index: 1;
  }

  @keyframes magneticOrbit {
    0% { transform: translate(60px, 0); }
    25% { transform: translate(0, 30px); }
    50% { transform: translate(-60px, 0); }
    75% { transform: translate(0, -30px); }
    100% { transform: translate(60px, 0); }
  }

  @keyframes magneticPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.04); }
  }

  @media (prefers-reduced-motion: reduce) {
    .mb-btn,
    .mb-orbit {
      animation: none;
    }
  }
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/mockups/MagneticButtonMockup.astro
git commit -m "feat: add MagneticButton mockup"
```

---

### Task 13: Wire up homepage-v1 with feature sections and scroll reveal

**Files:**
- Modify: `src/pages/homepage-v1.astro`
- Modify: `src/components/demos/FeatureSection.astro` (if needed for slot syntax)

**Interfaces:**
- Consumes: `FeatureSection`, all mockup components.
- Produces: Restructured `homepage-v1.astro` with 9 feature sections and inline scroll-reveal script.

- [ ] **Step 1: Replace BlockGrid import with feature/mockup imports**

In `src/pages/homepage-v1.astro`, remove:

```astro
import BlockGrid from '../components/demos/BlockGrid.astro';
```

Add:

```astro
import FeatureSection from '../components/demos/FeatureSection.astro';
import GridRevealMockup from '../components/demos/mockups/GridRevealMockup.astro';
import TextRevealMockup from '../components/demos/mockups/TextRevealMockup.astro';
import ScrollSequenceMockup from '../components/demos/mockups/ScrollSequenceMockup.astro';
import PinnedScrollMockup from '../components/demos/mockups/PinnedScrollMockup.astro';
import BeforeAfterMockup from '../components/demos/mockups/BeforeAfterMockup.astro';
import CaseStudyTransitionMockup from '../components/demos/mockups/CaseStudyTransitionMockup.astro';
import CustomCursorMockup from '../components/demos/mockups/CustomCursorMockup.astro';
import FilterableGridMockup from '../components/demos/mockups/FilterableGridMockup.astro';
import MagneticButtonMockup from '../components/demos/mockups/MagneticButtonMockup.astro';
```

- [ ] **Step 2: Replace block grid section with nine FeatureSections**

Replace:

```astro
<ColorBlockSection
  surface="alt"
  number="01"
  label="The blocks"
  headline="Nine blocks. One plugin."
  body="Each block is a self-contained interaction pattern, designed to sit inside any WordPress theme without fighting it."
/>

<BlockGrid {blocks} layout="balanced" />
```

With:

```astro
<ColorBlockSection
  surface="alt"
  number="01"
  label="The blocks"
  headline="Nine blocks. One plugin."
  body="Each block is a self-contained interaction pattern, designed to sit inside any WordPress theme without fighting it."
/>

<FeatureSection
  surface="ink"
  number="01"
  label="Reveal"
  headline="Grid Reveal"
  body="Content cascades into view as visitors scroll, turning a static gallery into a choreographed entrance."
  href="/blocks"
>
  <GridRevealMockup slot="mockup" />
</FeatureSection>

<FeatureSection
  surface="acid"
  number="02"
  label="Reveal"
  headline="Text Reveal"
  body="Headlines assemble themselves line by line, so the first thing a visitor reads feels intentional."
  href="/blocks"
  reverse
>
  <TextRevealMockup slot="mockup" />
</FeatureSection>

<FeatureSection
  surface="paper"
  number="03"
  label="Sequence"
  headline="Scroll Sequence"
  body="Progress through a timed sequence of frames tied to scroll position — storytelling without a timeline tool."
  href="/blocks"
>
  <ScrollSequenceMockup slot="mockup" />
</FeatureSection>

<FeatureSection
  surface="ink"
  number="04"
  label="Sequence"
  headline="Pinned Scroll"
  body="Pin key scenes in place while content scrolls past in sticky layers, like a stack of cards being dealt."
  href="/blocks"
  reverse
>
  <PinnedScrollMockup slot="mockup" />
</FeatureSection>

<FeatureSection
  surface="alt"
  number="05"
  label="Interaction"
  headline="Before / After"
  body="Let visitors wipe between before and after views with a clean draggable slider."
  href="/blocks"
>
  <BeforeAfterMockup slot="mockup" />
</FeatureSection>

<FeatureSection
  surface="acid"
  number="06"
  label="Interaction"
  headline="Case Study Transition"
  body="Morph from project overview into detail view with a smooth editorial transition."
  href="/blocks"
  reverse
>
  <CaseStudyTransitionMockup slot="mockup" />
</FeatureSection>

<FeatureSection
  surface="paper"
  number="07"
  label="Interaction"
  headline="Custom Cursor"
  body="Replace the default pointer with a context-aware follow element that responds to the page."
  href="/blocks"
>
  <CustomCursorMockup slot="mockup" />
</FeatureSection>

<FeatureSection
  surface="ink"
  number="08"
  label="Interaction"
  headline="Filterable Grid"
  body="Reorder gallery items with animated, keyboard-friendly filtering that keeps the rhythm intact."
  href="/blocks"
  reverse
>
  <FilterableGridMockup slot="mockup" />
</FeatureSection>

<FeatureSection
  surface="alt"
  number="09"
  label="Interaction"
  headline="Magnetic Button"
  body="Add subtle magnetic attraction to buttons on hover and focus, so CTAs feel alive under the cursor."
  href="/blocks"
>
  <MagneticButtonMockup slot="mockup" />
</FeatureSection>
```

- [ ] **Step 3: Add scroll-reveal script**

At the bottom of `src/pages/homepage-v1.astro`, before the closing `</BaseLayout>` tag, add:

```astro
<script>
  const revealElements = document.querySelectorAll('.reveal');

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('reveal-visible'));
  }
</script>
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add src/pages/homepage-v1.astro
git commit -m "feat: wire Semplice-style feature sections into homepage-v1"
```

---

### Task 14: Add lazy loading and hover lift to mockups

**Files:**
- Modify: `src/components/demos/BrowserFrame.astro`

**Interfaces:**
- Produces: `loading="lazy"` on images if any; CSS hover lift on frame.

- [ ] **Step 1: Add hover lift styles**

In `src/components/demos/BrowserFrame.astro`, add inside the `.browser-frame` style block:

```css
.browser-frame {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.browser-frame:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 72px rgba(0, 0, 0, 0.42);
}
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add src/components/demos/BrowserFrame.astro
git commit -m "feat: add hover lift to browser mockups"
```

---

### Task 15: Final verification

**Files:**
- All modified/new files

**Interfaces:**
- Consumes: full build + verification scripts

- [ ] **Step 1: Run pre-deploy verification**

Run: `npm run pre-deploy`
Expected: all 6 gates pass

- [ ] **Step 2: Spot-check visually**

Run dev server: `npm run dev`
Visit: http://127.0.0.1:4321/homepage-v1/
Confirm: all 9 feature sections render, animations loop, scroll reveals trigger, responsive layout works.

- [ ] **Step 3: Commit if verification passed**

If any fixes were needed, commit them. Otherwise, no new commit.
