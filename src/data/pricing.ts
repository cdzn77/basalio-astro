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

export const FOUNDER_PRICE = '$149';
export const POST_CAP_PRICE = '$249';

/* CHECKOUT_STATE: Switch between founder and standard pricing.

   When the cap of 100 founder licenses is reached, change this to 'standard'.
   This single change cascades to price, billing model, and card copy across
   all pages and components (via FOUNDER_PRICE and POST_CAP_PRICE exports).

   AUTOMATED BY THIS COMMIT:
   - pricing.ts: Tiers derive price from constants
   - index.astro, pricing.astro: Import constants instead of hardcoding
   - early-access.astro: All three $149 references now import FOUNDER_PRICE
   - pricing.astro risk section: Already conditional on CHECKOUT_STATE
   - faq.ts: Already founder-neutral (driven by CHECKOUT_STATE messaging)

   REMAINING MANUAL STEPS (when transitioning from founder to standard):
   1. Freemius: Verify "Lifetime" pricing field is set to "$249" one-time (not recurring) (/admin/plugins.php?page=freemius-pricing)
   2. Any announcement/email templates or social posts referencing founder pricing
   3. (Optional) Signoff/confirmation in team comms that transition is live
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
    'Works with any theme. No page builder, no premium theme',
    'Keyboard-operable and reduced-motion aware by default',
    'Shared script loads only on pages that use a block',
    'Four Hacks as copy-paste snippets',
  ],
  footnote: 'Free is not a trial. Nothing here expires or gets pulled into Pro later. Usage analytics are opt-in. Decline at activation and the plugin never contacts us.',
  ctaPrimary: { label: 'Get the 4 free Hacks', href: '/hacks' },
  ctaSecondary: { label: 'Notify me at launch', href: '/early-access' },
};

const founderTier: PricingTier = {
  id: 'paid',
  label: 'FOUNDER · 100 LICENSES',
  name: 'The control center',
  price: FOUNDER_PRICE,
  billing: 'one time',
  oneLiner: 'The Pro control center and the full Hacks vault.',
  teaser: `100 founder licenses at ${FOUNDER_PRICE}, then ${POST_CAP_PRICE}.`,
  leadLine: 'Everything in the free version, plus the Pro layer. One payment, unlimited sites, yours permanently — and refundable until the control center ships.',
  features: [
    'Full Hacks vault. 12+ recipes and growing',
    'Pro control center: live-tune all nine blocks from the editor sidebar',
    'One-click versions of the three hack-trailer effects',
    'Every future block and Hack included, no upgrade fee',
    'Direct line to the person building it',
    'Unlimited sites',
  ],
  cta: { label: 'Join the founder list', href: '/early-access' },
  microLine: '30-day refund, no questions asked.',
  featured: true,
};

const standardTier: PricingTier = {
  id: 'paid',
  label: 'PRO · CONTROL CENTER',
  name: 'The control center',
  price: POST_CAP_PRICE,
  billing: 'one time',
  oneLiner: 'The Pro control center and the full Hacks vault.',
  teaser: null,
  leadLine: 'Everything in the free version, plus the Pro layer. One payment, unlimited sites, yours permanently.',
  features: [
    'Full Hacks vault. 12+ recipes and growing',
    'Pro control center: live-tune all nine blocks from the editor sidebar',
    'One-click versions of the three hack-trailer effects',
    'Every future block and Hack included, no upgrade fee',
    'Direct line to the person building it',
    'Unlimited sites',
  ],
  cta: { label: 'Get Pro', href: '/early-access' },
  microLine: '30-day refund, no questions asked.',
  featured: true,
};

export const pricingTiers: PricingTier[] = [
  freeTier,
  CHECKOUT_STATE === 'founder' ? founderTier : standardTier,
];
