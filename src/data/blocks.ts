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
    description: 'Reorder gallery items with animated, keyboard-friendly filtering. Identity, packaging, editorial: visitors cut a portfolio down to the work they care about without a page reload.',
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
