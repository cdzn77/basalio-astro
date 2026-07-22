# Universal Header & Footer Architecture

## Overview
As of this update, **all pages use a universal header and footer** managed by the `RampTemplateLayout` component. This ensures consistency across the entire site and simplifies maintenance.

## Header Pattern

### Location
- **Component**: `src/components/RampHeader.astro`
- **Layout Slot**: `<slot name="header" />` in `RampTemplateLayout.astro`

### Usage on Every Page
Every page using `RampTemplateLayout` must include the header via the layout slot:

```astro
<RampTemplateLayout title="Page Title" description="...">
  <!-- HEADER: Navigation bar (universal across all pages) -->
  <Fragment slot="header">
    <RampHeader />
  </Fragment>

  <!-- Page content goes here -->
</RampTemplateLayout>
```

### Features
- **Transparent by default** - No background at top of page
- **Blur effect on scroll** - When scrolled 100px+, applies `backdrop-filter: blur(10px)`
- **Fixed positioning** - Stays at top of viewport
- **Menu dropdown** - Black background with white text, closes on click outside
- **Universal menu items**: HOME, COURSES, RESOURCES, RETAINER, FAQ

### Styling Details
- Height: 80px
- Padding: 20px 40px
- Background: transparent (with blur on scroll)
- Flexbox layout: `space-between` alignment
- No white background, no drop shadow

## Footer Pattern

### Location
- **Component**: `src/components/RampFooter.astro`
- **Layout Slot**: `<slot name="footer" />` in `RampTemplateLayout.astro`

### Usage on Every Page
Every page using `RampTemplateLayout` must include the footer via the layout slot:

```astro
<RampTemplateLayout title="..." description="...">
  <!-- Page content -->

  <Fragment slot="footer">
    <RampFooter address="Østerbrogade 45, 2100 København Ø, Copenhagen, Denmark" />
  </Fragment>
</RampTemplateLayout>
```

### Properties
- `address` (required): Company address displayed in footer

## Pages Using Universal Header & Footer

✅ Homepage (`src/pages/index-ramp-rebuild.astro`)
✅ Courses (`src/pages/courses.astro`)
✅ All internal pages

## Architecture Benefits

1. **Consistency** - Same header/footer on every page
2. **Maintainability** - Update in one place, applies everywhere
3. **Scalability** - Easy to add new pages with correct structure
4. **Responsive** - Unified navigation and footer behavior
5. **Brand Identity** - Consistent user experience across site

## Do NOT

❌ Create custom headers in page components
❌ Hardcode header/footer in individual pages
❌ Use different navigation styles on different pages
❌ Remove or modify the layout slots

## When to Update

If you need to change:
- **Navigation links**: Edit `RampHeader.astro`
- **Footer content**: Edit `RampFooter.astro`
- **Header styling**: Edit `.ramp-header` CSS in `RampTemplateLayout.astro`
- **Menu behavior**: Edit script in `RampHeader.astro`

The changes will automatically apply to **all pages** using the layout.
