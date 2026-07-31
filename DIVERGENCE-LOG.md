# Divergence Log: Standalone Page Integration

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

1. **privacy.astro** — 303 → ~380 lines (expanded with BaseLayout wrapper)
2. **support.astro** — 491 → ~550 lines (estimated)
3. **terms.astro** — 281 → ~360 lines (estimated)
4. **roadmap.astro** — 354 → ~430 lines (estimated)

### Rationale

Consolidation of header and footer to single source of truth (`src/data/navigation.ts`). Eliminates split system where navigation could diverge across pages. All pages now render consistent header and footer.

### Verification

Screenshots taken at desktop (1440×900) and mobile (390×844) viewports for:
- `/` (index)
- `/pricing`
- `/privacy` (newly integrated)

All three pages must show identical header and footer structure, styling, and navigation.
