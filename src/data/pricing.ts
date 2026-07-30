export interface PricingTier {
  id: 'free' | 'paid';
  label: string;
  name: string;
  price: string;
  billing?: string;
  oneLiner: string;
  leadLine?: string;
  teaser?: string;
  features: string[];
  footnote?: string;
  microLine?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  cta?: { label: string; href: string };
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    label: 'FREE · FOREVER',
    name: 'The blocks',
    price: '$0',
    oneLiner: 'All nine interaction blocks. Every one complete.',
    teaser: 'No locked blocks, no watermarks, no limits.',
    features: [
      'Grid Reveal',
      'Case Study Transition',
      'Text Reveal',
      'Magnetic Button',
      'Before/After',
      'Filterable Grid',
      'Custom Cursor',
      'Scroll Sequence',
      'Pinned Scroll',
      'Works with any theme — no page builder, no premium theme',
      'Keyboard-operable and reduced-motion aware by default',
      'Shared script loads only on pages that use a block',
      'Four Hacks as copy-paste snippets',
    ],
    footnote: 'Free is not a trial. Nothing here expires or gets pulled into Pro later. Usage analytics are opt-in — decline at activation and the plugin never contacts us.',
    ctaPrimary: { label: 'Get the 4 free Hacks →', href: '/hacks' },
    ctaSecondary: { label: 'Notify me at launch →', href: '/early-access' },
  },
  {
    id: 'paid',
    label: 'FOUNDER · 100 LICENSES',
    name: 'The control center',
    price: '$149',
    billing: 'one time',
    oneLiner: 'The Pro control center and the full Hacks vault.',
    teaser: '100 founder licenses, then $249/year.',
    leadLine: 'Everything in the free version, plus the Pro layer. For as long as Basalio exists. No renewal.',
    features: [
      'Full Hacks vault — 12+ recipes, growing',
      'Pro control center: live-tune all nine blocks from the editor sidebar',
      'One-click versions of the three hack-trailer effects',
      'Every future block and Hack included, no upgrade fee',
      'Direct line to the person building it',
      'Unlimited sites',
    ],
    cta: { label: 'Join the founder list →', href: '/early-access' },
    microLine: '30-day refund, no questions asked.',
    featured: true,
  },
];
