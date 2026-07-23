# Basalio Astro Rebuild - Setup Guide

**Project**: Basalio WordPress Portfolio  
**Template Base**: Ramp Astro Template (Jul 23, 2026)  
**Status**: Ready for Development  
**Location**: `/Users/angelomanzanojr/Projects/products/basalio/basalio-astro-rebuild`

## Project Overview

This is a rebuild of the Basalio WordPress site using the Ramp Astro template as a foundation. The template provides:
- Modern component-based architecture
- Responsive design system
- Unified button component with animations
- Production-ready structure
- Comprehensive documentation

## What Was Changed from Template

### Branding
- ✅ Updated header brand: "Ramp Studio." → "Basalio."
- Package name: basalio-astro
- Ready for content customization

### What Remains to Customize
- [ ] Menu links (currently Ramp defaults)
- [ ] Homepage content and images
- [ ] Course/service descriptions
- [ ] Color scheme (if needed)
- [ ] Footer branding and links
- [ ] Contact information

## Quick Start

### 1. Install Dependencies
```bash
cd /Users/angelomanzanojr/Projects/products/basalio/basalio-astro-rebuild
npm install
```

### 2. Start Development Server
```bash
npm run dev -- --port 4321
```

Access at: `http://localhost:4321/index-ramp-rebuild`

### 3. Customize for Basalio

#### Update Menu Links
Edit `src/components/RampHeader.astro` (lines 24-28):
```astro
<a href="/modules" class="menu-item">MODULES</a>
<a href="/services" class="menu-item">SERVICES</a>
<!-- etc -->
```

#### Update Homepage Content
Edit `src/pages/index-ramp-rebuild.astro`:
- Change hero heading and description
- Update course/service content
- Modify section texts

#### Update Colors (if needed)
Search for hex color codes in component CSS:
- Yellow backgrounds: `#FFEA00`
- White backgrounds: `#FFFFFF`
- Text: `#000000`

## Key Components to Customize

### 1. Hero Section (RampHero.astro)
- Heading text
- Course/service description
- Background image
- Call-to-action text

### 2. Services/Modules Section (RampWhatWeDo.astro)
- Service names and descriptions
- Percentages/metrics
- Styling colors

### 3. Courses/Products Section (RampCourses.astro)
- Course titles and descriptions
- Course images
- Grid layout

### 4. Footer (RampFooter.astro)
- Company information
- Social links
- Contact details
- Footer links

## File Structure for Reference

```
src/
├── components/
│   ├── RampHeader.astro          # Navigation (UPDATED)
│   ├── RampHero.astro            # Hero section
│   ├── RampCourses.astro         # Courses/modules
│   ├── RampWhatWeDo.astro        # Services breakdown
│   ├── RampRetainer.astro        # Pricing
│   ├── Button.astro              # Unified button
│   └── ... other components
├── pages/
│   ├── index-ramp-rebuild.astro  # Homepage
│   ├── courses/
│   ├── contact.astro
│   └── 404.astro
└── styles/
    ├── global.css
    ├── animations.css
    └── components.css
```

## Development Commands

```bash
# Start dev server
npm run dev -- --port 4321

# Type check
npx astro check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Git Workflow

```bash
# Check status
git status

# Commit changes
git add src/
git commit -m "Customize for Basalio: update [component] content"

# View history
git log --oneline
```

## Customization Checklist

- [ ] Update brand name (header)
- [ ] Update menu links
- [ ] Update homepage hero section
- [ ] Update service/module descriptions
- [ ] Update course/product listings
- [ ] Update pricing (if applicable)
- [ ] Update footer information
- [ ] Update contact page
- [ ] Add Basalio logo to public/
- [ ] Update social links
- [ ] Test all pages locally
- [ ] Type check: `npx astro check`
- [ ] Build test: `npm run build`
- [ ] Ready for deployment

## Component Reference

### Button Component
All buttons use the unified `Button.astro` component:
```astro
<Button label="Click Me" href="/page" />
```

Features:
- Two-section pill design (text + icon)
- 6px border-radius on all corners
- Arrow animation on hover
- Customizable via props

### Responsive Breakpoints
- Mobile: ≤540px
- Tablet: 541-1024px
- Desktop: ≥1025px

## Deployment

When ready:
1. Ensure all changes are tested locally
2. Run `npx astro check` for type checking
3. Run `npm run build` to verify production build
4. Commit all changes
5. Deploy to Netlify or your platform

## Reference Documentation

In the template directory:
- **TEMPLATE-README.md** - Complete feature documentation
- **QUICKSTART.md** - Setup and development guide
- **DESIGN-SYSTEM.md** - Design tokens and styling
- **CLAUDE.md** - Development workflow guidelines

## Notes

- This is a fresh copy of the Ramp template
- Original template remains in `/Users/angelomanzanojr/Projects/themes/ramp-astro-template/`
- All changes to Basalio won't affect the template
- Template can be used for other projects

## Next Steps

1. ✅ Copy template (done)
2. ✅ Update branding (in progress)
3. → Customize content
4. → Test locally
5. → Deploy

---

**Ready to start customizing Basalio!** 🚀
