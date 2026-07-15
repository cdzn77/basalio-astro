# Basalio Project Refactoring Guide

## Overview

This document outlines the complete restructuring of the Basalio project from a monolithic inline-CSS architecture to a modular, maintainable component-based system.

**Impact:**
- Reduced index.astro from 1,426 → 266 lines (82% reduction)
- Extracted 1,200+ lines of CSS into 7 organized files
- Created 6 reusable Astro components
- Eliminated style conflicts and !important overrides
- Improved developer experience and maintainability

---

## Architecture

### CSS File Structure

#### 1. `src/styles/tokens.css`
**Single source of truth for design decisions**
- Colors (primary, backgrounds, text)
- Typography (fonts, sizes, weights)
- Spacing scale (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl)
- Sizing (container widths, module heights)
- Breakpoints (480px, 768px, 1024px, 1320px)
- Border radius scale
- Shadows
- Z-index layers
- Transition timings

**Usage:**
```css
/* Define once */
--color-primary: #DFFF00;
--space-4xl: 60px;

/* Use everywhere */
background: var(--color-primary);
padding: var(--space-4xl);
```

#### 2. `src/styles/global.css`
**Reset and base styles**
- CSS reset (*box-sizing, margins)
- HTML/body defaults
- Typography scale (h1-h6, p)
- Link behavior
- Focus states for accessibility
- Form element defaults
- Utility classes (.visually-hidden)

#### 3. `src/styles/layout.css`
**Grid, flexbox, and container layouts**
- Container classes (.container, .container-content)
- Section defaults
- Grid utilities (.grid, .grid-2, .grid-3, .grid-4)
- Flex utilities (.flex, .flex-center, .flex-between, .flex-column)
- Gap utilities (.gap-xs through .gap-xl)
- Overflow utilities
- **Module Grid System:**
  - `.module-row`: 2-column grid, 600px height, full stretch
  - `.module-tile`: Flex column with responsive padding
  - `.module-content`: Content wrapper
  - `.module-image`: Video/image container with proper sizing

#### 4. `src/styles/components.css`
**Reusable component styles**
- Navigation (fixed, glassmorphism, responsive)
- Mobile menu (fixed overlay)
- Hero section (full-viewport, centered)
- Buttons (.btn, .btn-dark, .btn-light)
- Module tile backgrounds (.bg-light, .bg-dark, .bg-accent, .bg-mid-dark)
- Module full-bleed styling
- Eyebrows (section labels)
- Back-to-top button

#### 5. `src/styles/animations.css`
**Keyframes and animation classes**
- Keyframes: @keyframes riseIn, slideUp, fadeIn, benchPulse, revealStagger, etc.
- Animation classes: .animate-rise, .animate-slide-up, .animate-fade
- Hover animations for interactive elements
- Reduced motion support

#### 6. `src/styles/responsive.css`
**All media queries organized by breakpoint**
- Tablet + Large (max-width: 1024px): Padding reductions
- Tablet (max-width: 768px): Single-column layouts, adjusted typography
- Mobile (max-width: 480px): Compact spacing, smaller buttons
- Extra Small (max-width: 360px): Minimal padding
- Print styles

#### 7. `src/styles/utilities.css`
**Helper classes for rapid development**
- Margin utilities (m-0 through m-4xl, mx-*, my-*, mt, mb)
- Padding utilities (p-0 through p-4xl, px-*, py-*, pt, pb)
- Width/height utilities (w-full, h-screen, max-w-container)
- Display utilities (block, inline, hidden, visible)
- Text utilities (text-center, text-xs through text-xl, font-bold, uppercase)
- Color utilities (text-primary, bg-light, bg-dark)
- Border radius (.rounded-0 through .rounded-full)
- Shadow utilities (.shadow-sm through .shadow-xl)
- Position utilities (.relative, .absolute, .fixed, .sticky)
- Z-index utilities (.z-base through .z-modal)
- Transform utilities (scale, translate)
- Opacity utilities
- Pointer events, cursor, user-select

---

### Component Structure

#### 1. `Layout.astro`
**Main layout wrapper - imports all CSS**
```astro
import '../styles/tokens.css';
import '../styles/global.css';
// ... all 7 CSS files
```
- Handles DOCTYPE, meta tags, fonts
- Sets up base HTML structure
- Includes essential JavaScript (mobile menu, back-to-top)

**Usage:**
```astro
<Layout title="Page Title">
  <Navigation />
  <!-- Page content -->
  <Footer />
</Layout>
```

#### 2. `Navigation.astro`
**Reusable navigation bar**
- Fixed positioning with glassmorphism
- Desktop navigation links
- Mobile hamburger menu
- Mobile menu overlay
- No props required

#### 3. `Hero.astro`
**Full-viewport hero section**
- Props: eyebrow, title, subtitle, cta_primary, cta_secondary
- Renders centered content
- Optional CTA buttons

**Usage:**
```astro
<Hero
  eyebrow="EYEBROW TEXT"
  title="Main heading with <em>emphasis</em>"
  subtitle="Supporting text"
  cta_primary={{ text: 'Button text', href: '#link' }}
/>
```

#### 4. `Section.astro`
**Generic section wrapper**
- Props: id, title, description, class
- Renders with .container-content max-width
- Optional heading and description

**Usage:**
```astro
<Section id="modules" title="Nine modules. Zero friction.">
  <!-- Section content -->
</Section>
```

#### 5. `ModuleRow.astro`
**Grid container for module tiles**
- Props: fullBleed (boolean), class (string)
- 2-column by default, 1-column if fullBleed
- 600px height with align-items: stretch

**Usage:**
```astro
<ModuleRow>
  <ModuleTile title="Grid Reveal" description="...">
    <div class="module-image"><!-- content --></div>
  </ModuleTile>
  <ModuleTile title="Case Study" description="...">
    <div class="module-image"><!-- content --></div>
  </ModuleTile>
</ModuleRow>
```

#### 6. `ModuleTile.astro`
**Individual module card**
- Props: title, description, bg ('light'|'dark'|'accent'|'mid-dark')
- Renders title and description automatically
- Slot for custom module-image content

#### 7. `Footer.astro`
**Shared footer component**
- Used across all pages
- No props required

#### 8. `Animations.astro`
**GSAP animation orchestration**
- Imports GSAP library
- Sets up ScrollTrigger
- Initializes all page animations
- Called on every page

---

## Usage Guide

### Adding a New Page

1. **Create page file** in `src/pages/yourpage.astro`

2. **Import components**
```astro
---
import Layout from '../components/Layout.astro';
import Navigation from '../components/Navigation.astro';
import Section from '../components/Section.astro';
import Footer from '../components/Footer.astro';
import Animations from '../components/Animations.astro';
---
```

3. **Wrap in Layout**
```astro
<Layout title="Your Page" description="Your description">
  <Navigation />
  <!-- Page content using Section, ModuleRow, ModuleTile, etc -->
  <Footer />
  <Animations />
</Layout>
```

### Styling Elements

**Option 1: Use existing utility classes**
```html
<div class="flex flex-center gap-lg p-4xl bg-light rounded-md shadow-lg">
  <h3 class="text-3xl font-bold text-primary">Title</h3>
</div>
```

**Option 2: Use design tokens**
```html
<div style="padding: var(--space-4xl); color: var(--color-primary);">
  Content
</div>
```

**Option 3: Create specific styles (last resort)**
Only add to `<style>` blocks if truly unique to that component:
```astro
<style>
  .custom-element {
    background: var(--color-bg-light);
    padding: var(--space-lg);
    border-radius: var(--radius-md);
  }
</style>
```

### Modifying Styles

**Changing a color globally?** → Edit `tokens.css`
**Changing button hover?** → Edit `components.css`
**Fixing mobile layout?** → Edit `responsive.css`
**Need a new utility?** → Add to `utilities.css`

---

## Breakpoints

```
Mobile:          < 480px  (--space-padding-x: 16px)
Tablet:          480-768px (--space-padding-x: 20px)
Medium:          768-1024px (--space-padding-x: 40px)
Large:           > 1024px (--space-padding-x: 60px)
Max Content:     1320px (--container-max)
```

---

## Performance Improvements

✅ **CSS Deduplication**
- Before: 1,200+ lines repeated across pages
- After: Shared styles imported once

✅ **Eliminated !important**
- Before: Video sizing needed !important overrides
- After: Proper CSS specificity, clean inheritance

✅ **Better Caching**
- CSS files are versioned and cached independently
- Unchanged styles aren't re-downloaded

✅ **Smaller Bundle**
- Removed inline styles from HTML
- CSS properly minified in production

---

## Migration Checklist

- [x] Extract CSS into organized files
- [x] Create reusable components
- [x] Refactor index.astro (1,426 → 266 lines)
- [x] Test build passes (all 6 pages)
- [ ] Refactor pricing.astro
- [ ] Refactor support.astro
- [ ] Refactor roadmap.astro
- [ ] Update Footer.astro to use new system
- [ ] Create CRUD style guide (optional)
- [ ] Document component API (optional)

---

## Quick Reference

### Common Patterns

**Centered Container**
```astro
<div class="container mx-auto">
  <!-- Content -->
</div>
```

**Responsive Grid**
```astro
<div class="grid grid-2 gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**Stacked Mobile**
```astro
<div class="grid grid-2 gap-lg">
  <!-- Desktop: 2 columns -->
  <!-- Mobile: 1 column (from responsive.css) -->
</div>
```

**Section with Heading**
```astro
<Section title="Section Title" description="Optional description">
  <!-- Content -->
</Section>
```

---

## Notes for Future Developers

1. **Always check tokens.css first** before hardcoding colors/spacing
2. **Utility classes reduce CSS** - use them before writing style blocks
3. **Components are props-based** - they should be dumb and reusable
4. **Responsive styles are centralized** - all breakpoints in one file
5. **No cascading conflicts** - each file has a single responsibility

---

## Troubleshooting

**"Style isn't applying"**
→ Check specificity (utilities.css is lowball specificity by design)
→ Ensure component is wrapped in Layout (Layout imports CSS)

**"Mobile layout is wrong"**
→ Check responsive.css for the breakpoint
→ Use utilities like `.grid-2` (auto-stacks on mobile)

**"Color looks different"**
→ Always use CSS variables from tokens.css, never hardcode hex
→ Check tokens.css for correct variable name

---

## Files Changed

**Created (11 files)**
- src/styles/tokens.css (123 lines)
- src/styles/global.css (78 lines)
- src/styles/layout.css (145 lines)
- src/styles/components.css (330 lines)
- src/styles/animations.css (165 lines)
- src/styles/responsive.css (230 lines)
- src/styles/utilities.css (330 lines)
- src/components/Layout.astro (45 lines)
- src/components/Navigation.astro (25 lines)
- src/components/Section.astro (15 lines)
- src/components/Hero.astro (20 lines)
- src/components/ModuleRow.astro (12 lines)
- src/components/ModuleTile.astro (15 lines)

**Modified (1 file)**
- src/pages/index.astro (1,426 → 266 lines, -82%)

**Total Impact**
- Added: ~1,540 lines of organized CSS + components
- Removed: 1,160 lines of inline CSS
- Net: Cleaner, more maintainable codebase
