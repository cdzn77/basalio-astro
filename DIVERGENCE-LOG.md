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

### Step 2: Pure Black to Warm Dark (#000000 → #1C1917) ✓ COMPLETE

**Files Changed:** 16 files (85 instances)

#### Visual Changes
- **Button Backgrounds:** Navigation and carousel buttons now use warm dark instead of pure black
- **Image Placeholders:** BlocksCarousel image wrapper backgrounds now use warm dark
- **Text Colours:** All text that was pure black now uses the warmer dark tone
- **Borders:** Button and element borders updated to warm dark
- **Accents:** Component accents and outlines use the new warm dark

#### Files Modified
- `src/components/RampHeader.astro` — header backgrounds + text
- `src/components/RampTestimonialsV2.astro` — carousel accents
- `src/components/RampHero.astro` — text colors
- `src/components/BlocksCarousel.astro` — button backgrounds, borders, image wrappers
- `src/components/PositioningStats.astro` — stat text
- `src/components/Button.astro` — button backgrounds
- `src/components/FAQ.astro` — button + text colors
- `src/components/RampFooter.astro` — text + backgrounds
- `src/layouts/RampTemplateLayout.astro` — default body color + button styles
- `src/pages/index.astro` — section text
- `src/pages/contact.astro` — text + form accents
- `src/pages/pricing.astro` — table text + accents
- `src/pages/privacy.astro` — text
- `src/pages/support.astro` — text
- `src/pages/roadmap.astro` — status badges + text
- `src/pages/terms.astro` — text
- `src/styles/tokens.css` — token value

#### Colour Details
- **Old:** #000000 (pure black, Ramp template default)
- **New:** #1C1917 (Basalio warm dark, brown-tinted)
- **Real Difference:** Subtle warmth, softer than pure black
- **Semantic:** One black in system, not two

#### Proof
- `baseline-index-step2.png` — Homepage with warm dark text/buttons
- `baseline-blocks-step2.png` — Blocks page with warm dark accents

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
