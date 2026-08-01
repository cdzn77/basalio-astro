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

export const licenseScope = {
  label: 'LICENSE SCOPE',
  statement: 'A license covers unlimited sites and keeps working for as long as you use it. Founder licenses are one payment with no renewal, and are refundable at any time until the Pro control center ships. All licenses carry a 30-day refund, no questions asked.',
};

/* CHECKOUT_STATE: Switch between founder and standard pricing.

   When the cap of 100 founder licenses is reached, change this to 'standard'.
   This single change cascades to price, billing model, and card copy.

   EVERYTHING ELSE that must change the same day:
   1. Freemius: Update "Lifetime" pricing field to "$249/year" (/admin/plugins.php?page=freemius-pricing)
   2. /pricing risk-reversal section (line 129–136): Remove or update reference to $149 founder-only claim
   3. src/data/faq.ts: FAQ "What if my license lapses?" is already founder-neutral (driven by this file's CHECKOUT_STATE messaging)
   4. /early-access.astro (line 22): Update "first 100 are $149" copy to reflect new pricing
   5. Any announcement/email templates referencing founder tier exclusivity
*/
export const CHECKOUT_STATE: 'founder' | 'standard' = 'founder';

const freeTier: PricingTier = {
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
};

const founderTier: PricingTier = {
  id: 'paid',
  label: 'FOUNDER · 100 LICENSES',
  name: 'The control center',
  price: '$149',
  billing: 'one time',
  oneLiner: 'The Pro control center and the full Hacks vault.',
  teaser: '100 founder licenses, then $249/year.',
  leadLine: 'Everything in the free version, plus the Pro layer. A founder license is one payment, no renewal — your work stays yours.',
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
};

const standardTier: PricingTier = {
  id: 'paid',
  label: 'PRO · CONTROL CENTER',
  name: 'The control center',
  price: '$249',
  billing: 'per year',
  oneLiner: 'The Pro control center and the full Hacks vault.',
  teaser: null,
  leadLine: 'Everything in the free version, plus the Pro layer. Updates and support renew annually — stop paying and everything you have built stays exactly as it is.',
  features: [
    'Full Hacks vault — 12+ recipes, growing',
    'Pro control center: live-tune all nine blocks from the editor sidebar',
    'One-click versions of the three hack-trailer effects',
    'Every future block and Hack included, no upgrade fee',
    'Direct line to the person building it',
    'Unlimited sites',
  ],
  cta: { label: 'Get Pro →', href: '/early-access' },
  microLine: '30-day refund, no questions asked. Renews annually for updates and support.',
  featured: true,
};

export const pricingTiers: PricingTier[] = [
  freeTier,
  CHECKOUT_STATE === 'founder' ? founderTier : standardTier,
];
