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
export const proShipTarget = 'Q1 2026';

/* CHECKOUT_STATE: Single-line flag controls site-wide pricing.

   When the cap of 100 founder licenses is reached, change 'founder' to 'standard'.

   ALL SITE COPY CASCADES AUTOMATICALLY:
   - Pricing cards (price, billing, teaser, leadLine, microLine)
   - Early-access form text and radio value
   - FAQ answers (already founder-neutral, driven by CHECKOUT_STATE)
   - Pricing page risk-reversal section (conditional render)

   No hardcoded prices remain. All page copies and components import
   FOUNDER_PRICE and POST_CAP_PRICE constants.

   Verified 2026-08-11: built at both states and grepped dist output
   (commits 61c0779, 2a2140e). Confirms zero $149 matches when state='standard',
   $249 appears only in post-cap teaser and FAQ references when state='founder'.

   EXTERNAL STEPS STILL REQUIRED (cannot automate):
   1. Freemius: /admin/plugins.php?page=freemius-pricing → verify "Lifetime"
      field is "$249" one-time (NOT recurring subscription)
   2. Comms: Update any announcement/email/social posts mentioning founder pricing
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
    'Full Hacks vault. Five recipes in development, included as they ship.',
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
    'Full Hacks vault. Five recipes in development, included as they ship.',
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
