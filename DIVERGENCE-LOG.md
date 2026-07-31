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

### Step 3: Grey Consolidation (#E8E8E8, #F5F5F5 → var(--surface-alt)) ✓ COMPLETE

**Files Changed:** 8 files (27 instances)

#### Visual Changes
- **Component Backgrounds:** PositioningStats stat boxes now use canonical light grey
- **Borders:** All light grey borders updated to use the surface-alt token
- **Form Backgrounds:** Contact and pricing form backgrounds now use canonical light grey
- **Dividers:** Pricing table dividers and section separators use the light grey token
- **Consistency:** All light grey surfaces now use the same colour value (#FAFAFA)

#### Files Modified
- `src/components/PositioningStats.astro` — stat box backgrounds (1 instance)
- `src/components/BlocksCarousel.astro` — button borders (1 instance)
- `src/components/RampTestimonialsV2.astro` — carousel borders (2 instances)
- `src/layouts/RampTemplateLayout.astro` — light grey token definition + section background (2 instances)
- `src/pages/index.astro` — pricing section backgrounds + dividers (6 instances)
- `src/pages/contact.astro` — form background + borders (4 instances)
- `src/pages/pricing.astro` — table dividers + backgrounds (6 instances)
- `src/styles/tokens.css` — token references

#### Colour Details
- **Old:** Mixed greys (#E8E8E8, #F5F5F5 with different RGB values)
- **New:** Canonical --surface-alt (#FAFAFA)
- **Real Difference:** Minimal visual change; greys are close in value
- **Semantic:** Single light grey surface colour, no variation

#### Token Notes
- Updated `--color-off-white-95` to reference var(--surface-alt)
- Updated `--color-gray-light` to reference var(--surface-alt)
- --surface-alt (#FAFAFA) is the canonical light grey

#### Proof
- `baseline-index-step3.png` — Homepage with consolidated greys
- `baseline-pricing-step3.png` — Pricing page with canonical light grey

---

### Step 4: Add Surface Tokens ✓ COMPLETE

**Status:** Already defined in tokens.css

No action needed. Surface tokens already exist:
- `--surface-paper: #FFFFFF` (white background)
- `--surface-ink: #1C1917` (warm dark background)
- `--text-on-paper: #0A0A0A` (off-black text on white)
- `--text-on-paper-muted: rgba(10, 10, 10, 0.6)` (muted text on white)
- `--text-on-ink: #F6F4EF` (cream text on dark)
- `--text-on-ink-muted: rgba(246, 244, 239, 0.6)` (muted text on dark)
- `--acid: #DFFF00` (brand yellow)
- `--stone: #DFDCD5` (stone/beige)
- `--surface-alt: #FAFAFA` (light grey)

---

### Step 5: Delete Orphaned --color-* Tokens ⏸ DEFERRED

**Status:** Pending audit of legacy CSS file usage

Found active --color-* references in legacy files:
- utilities.css (10+ references)
- global.css (4 references)
- components.css (40+ references)
- layout.css (1 reference)

**Decision:** Defer token deletion until legacy CSS audit determines if these files are actively used. Tokens that are only referenced in unused CSS can then be safely removed.

**Tokens to eventually remove:**
- `--color-off-white-95` (now var(--surface-alt))
- `--color-gray-light` (now var(--surface-alt))
- Legacy --color-primary, --color-text, --color-light, --color-accent tokens
- Any others unused after audit

---

### Step 6: Resume Token Migration ⏳ NEXT

After surface tokens are confirmed and legacy CSS audit is complete, begin systematic token migration across remaining components:

Priority order (based on instance count):
1. RampTemplateLayout (36+ instances)
2. index.astro (38+ instances)
3. pricing.astro (32+ instances)
4. contact.astro (32+ instances)
5. Others (roadmap, support, terms, privacy, blocks)

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
