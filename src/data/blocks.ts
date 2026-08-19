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
  {
    id: 'text-reveal',
    name: 'Text Reveal',
    headline: 'Headlines that assemble themselves.',
    description: 'Animate type into place with split-line or character-driven reveals.',
    category: 'reveal',
  },
  {
    id: 'scroll-sequence',
    name: 'Scroll Sequence',
    headline: 'A story told one scroll at a time.',
    description: 'Progress through a timed sequence of frames tied to scroll position.',
    category: 'sequence',
  },
  {
    id: 'pinned-scroll',
    name: 'Pinned Scroll',
    headline: 'Panels that hold their ground.',
    description: 'Pin key scenes in place while content scrolls past in sticky layers.',
    category: 'sequence',
  },
  {
    id: 'before-after',
    name: 'Before/After',
    headline: 'Two states, one draggable moment.',
    description: 'Let visitors wipe between before and after views with a clean slider.',
    category: 'interaction',
  },
  {
    id: 'case-study-transition',
    name: 'Case Study Transition',
    headline: 'Seamless project handoffs.',
    description: 'Morph from overview into detail with a smooth editorial transition.',
    category: 'interaction',
  },
  {
    id: 'custom-cursor',
    name: 'Custom Cursor',
    headline: 'A cursor with intention.',
    description: 'Replace the default pointer with a context-aware follow element.',
    category: 'interaction',
  },
  {
    id: 'filterable-grid',
    name: 'Filterable Grid',
    headline: 'Sort without losing the rhythm.',
    description: 'Reorder gallery items with animated, keyboard-friendly filtering.',
    category: 'interaction',
  },
  {
    id: 'magnetic-button',
    name: 'Magnetic Button',
    headline: 'Calls to action that pull people in.',
    description: 'Add subtle magnetic attraction to buttons on hover and focus.',
    category: 'interaction',
  },
];

export const blockCategories = {
  reveal: 'The Reveal Family',
  sequence: 'The Sequence Family',
  interaction: 'The Interaction Layer',
};
