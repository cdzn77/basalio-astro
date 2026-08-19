# Homepage v1 Semplice-Style Redesign

## Goal

Evolve `homepage-v1` from a compact color-block manifesto into a Semplice `features`-style product showcase: large feature sections, realistic browser/editor mockups, and looping interface animations that explain each Basalio block at a glance.

## Success Criteria

- `homepage-v1` loads and passes `npm run pre-deploy`.
- Each of the 9 Basalio blocks has its own full-width feature section with a headline, body, and animated mockup.
- No raster images of humans; all illustrations are code (SVG/CSS) or existing brand assets.
- Animations loop, fade in on scroll, and respect `prefers-reduced-motion`.
- Basalio brand colors are preserved.

## Visual Language

### Layout

- Full-viewport hero (existing `DemoHero`) stays.
- Value proposition section (existing) stays, with scroll fade-in.
- Social proof and pricing CTA (existing) stay, with scroll fade-in.
- Replace the 3-column `BlockGrid` with a vertical sequence of **feature sections**.
- Each feature section is a 2-column layout: text left / mockup right, alternating on desktop; stacked on mobile.
- Sections use an alternating surface rhythm: `ink`, `acid`, `paper`, `surface-alt`.

### Typography

- Section headline: `clamp(36px, 5vw, 72px)`, bold, tight line-height.
- Body: existing `--font-size-body`, muted surface color.
- Optional CTA: outline button style matching Semplice "Learn more" (1px border, mono label, arrow on hover).

### Mockup Frame

- Minimal browser/editor chrome: dark rounded rectangle, three traffic-light dots, optional URL/title bar.
- Inside: abstract UI representation of the block.
- Subtle shadow and 1px border for depth.

## Feature Sections

Each section renders via a reusable `FeatureSection` component and passes a mockup component into a slot.

| # | Block | Headline | Mockup Content | Looping Animation |
|---|-------|----------|----------------|-------------------|
| 1 | Grid Reveal | Content that cascades into view. | Masonry grid of cards | Cards fade/scale in with stagger |
| 2 | Text Reveal | Headlines that assemble themselves. | Large headline inside browser | Lines/chars reveal with stagger |
| 3 | Scroll Sequence | A story told one scroll at a time. | Vertical strip of frames | Frame strip translates upward |
| 4 | Pinned Scroll | Panels that hold their ground. | Stacked panels | Panels wipe/slide in sequence |
| 5 | Before/After | Two states, one draggable moment. | Split abstract image | Draggable divider sweeps back/forth |
| 6 | Case Study Transition | Seamless project handoffs. | Project card → detail expansion | Card expands and content crossfades |
| 7 | Custom Cursor | A cursor with intention. | Custom ring cursor follows path | Ring cursor traces a figure-eight |
| 8 | Filterable Grid | Sort without losing the rhythm. | Category pills + grid items | Items reorder with fade/slide |
| 9 | Magnetic Button | Calls to action that pull people in. | Button with orbiting dot | Dot orbits button; button scales |

## Animation System

### Scroll Reveals

- Use `IntersectionObserver` with a `data-animate` attribute.
- Default: `opacity: 0; translateY(40px)` → `opacity: 1; translateY(0)` over 700ms ease-out.
- Stagger children by 100ms.
- Respect `prefers-reduced-motion: reduce` by disabling translate and shortening duration.

### Looping Mockup Animations

- Pure CSS `@keyframes` inside each mockup component.
- No JavaScript animation libraries to keep bundle small.
- Loops run infinitely only when the mockup is in the viewport (optional enhancement: pause when off-screen via IntersectionObserver).

### Hover & Focus

- Mockup frame: `transform: translateY(-4px)` + shadow increase.
- CTA links: arrow slides right 4px.

## Components

### New

- `FeatureSection.astro` — section shell with alternating layout.
- `BrowserFrame.astro` — reusable dark browser chrome.
- `mockups/GridRevealMockup.astro`
- `mockups/TextRevealMockup.astro`
- `mockups/ScrollSequenceMockup.astro`
- `mockups/PinnedScrollMockup.astro`
- `mockups/BeforeAfterMockup.astro`
- `mockups/CaseStudyTransitionMockup.astro`
- `mockups/CustomCursorMockup.astro`
- `mockups/FilterableGridMockup.astro`
- `mockups/MagneticButtonMockup.astro`

### Modified

- `homepage-v1.astro` — replace `BlockGrid` with feature sections; add scroll-reveal script.
- `src/styles/global.css` — add `.reveal`, `.reveal-visible`, and reduced-motion rules.

### Removed/Deprecated

- `BlockGrid.astro` usage on `homepage-v1` (component file kept for other demos).

## Assets

- No new raster images required.
- Existing block SVGs (`/assets/demos/block-*.svg`) may be referenced inside mockups if appropriate, but most visuals will be drawn with inline SVG/CSS.

## Accessibility

- `prefers-reduced-motion` disables scroll translate and reduces animation durations.
- Mockups are decorative and use `aria-hidden="true"` where appropriate.
- All text remains selectable and readable.

## Verification

- Run `npm run pre-deploy` after implementation.
- Manually inspect all 9 feature sections and confirm looping animations.
- Check responsive behavior at 320px, 768px, 1440px.
