# Divergence Log

## Brand Colour Pass (2026-07-31)

### Step 1: Yellow Rebrand (#FFEA00 → #DFFF00) ✓ COMPLETE

**Files Changed:** 9 files (12 instances)

#### Visual Changes
- **Hero Section:** Ramp template yellow (#FFEA00) → Basalio acid yellow (#DFFF00)
- **Carousel Cards:** BlocksCarousel card backgrounds now use brighter, warmer yellow
- **Footer Background:** RampFooter now uses acid yellow instead of Ramp yellow
- **Body Background:** RampTemplateLayout body background updated to acid yellow
- **Dot Indicator:** Small yellow indicator in blocks.astro uses new acid yellow

#### Files Modified
- `src/components/RampHeader.astro` — header background
- `src/components/RampHero.astro` — hero background
- `src/components/RampFooter.astro` — footer background
- `src/components/BlocksCarousel.astro` — carousel cards
- `src/layouts/RampTemplateLayout.astro` — body + first section
- `src/pages/blocks.astro` — dot indicator
- `src/pages/index.astro` — pricing section
- `src/pages/pricing.astro` — hero + ledger sections
- `src/styles/tokens.css` — token value

#### Colour Details
- **Old:** #FFEA00 (Ramp yellow, cool-toned lime)
- **New:** #DFFF00 (Basalio acid, warmer lime-green)
- **Contrast:** #000000 on #DFFF00 = ~19:1 (WCAG AAA)
- **Real Difference:** Visibly brighter, warmer cast

#### Proof
- `baseline-index.png` — Homepage with new yellow
- `baseline-blocks.png` — Blocks page with new yellow

---

## Standalone Page Integration (2026-07-30)

## Pages Converted (2026-07-30)

Four pages were converted from standalone HTML to use BaseLayout with shared RampHeader and RampFooter components.

### Changes Expected

**Visual Differences:**
- Header: Replaced custom navigation (Modules, Performance, Roadmap, Pricing, Support, Join beta) with canonical RampHeader (Blocks, Hacks, Pricing, Get Early Access)
- Header style: Custom fixed nav with backdrop-blur replaced with BaseLayout's fixed header
- Footer: Replaced custom footer (if present) with shared RampFooter (yellow background, links, newsletter, wordmark)
- Background color: Maintained dark theme (#1C1917) throughout
- Content sections: Preserved; styling adapted to work within BaseLayout context
- Spacing: Content sections now use standard padding consistent with other pages
- Mobile: Responsive breakpoints aligned with site-wide standards (768px, 480px)

### Pages Affected

1. **privacy.astro** — 303 → ~380 lines (expanded with BaseLayout wrapper) ✓ COMMITTED
2. **support.astro** — 491 → ~550 lines (estimated) ✓ COMMITTED
3. **roadmap.astro** — 354 → ~430 lines (estimated) ✓ COMMITTED
4. **terms.astro** — 281 → 194 lines (BaseLayout + styled sections) ✓ COMMITTED

### Rationale

Consolidation of header and footer to single source of truth (`src/data/navigation.ts`). Eliminates split system where navigation could diverge across pages. All pages now render consistent header and footer.

### Verification

Screenshots taken at desktop (1440×900) and mobile (390×844) viewports for:
- `/` (index)
- `/pricing`
- `/privacy` (newly integrated)

All three pages must show identical header and footer structure, styling, and navigation.
