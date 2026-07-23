# Ramp Astro Template - Ready for Production

A fully-featured, pixel-perfect Astro template based on the Ramp Studio marketing site. This template is ready to use as a foundation for creating modern marketing websites and course platforms.

## What's Included

### Core Components
- **RampHeader** - Navigation with responsive menu dropdown
- **RampHero** - Hero section with course teaser
- **RampWhatWeDo** - Service breakdown with percentages
- **RampCourses** - Carousel-based course grid with pagination
- **RampResources** - Resource cards grid
- **RampRetainer** - Pricing cards for subscription plans
- **RampTestimonials** - Testimonials section with rounded styling
- **RampFAQ** - Accordion-based FAQ section
- **RampFooter** - Responsive footer with links and metadata
- **Button** - Unified button component with dual-arrow animation

### Pages
- **Homepage** (`/index-ramp-rebuild`) - Complete Ramp template rebuild
- **Courses** (`/courses`) - Course listing with carousel
- **Subscription** (`/subscription`) - Subscription/retainer details
- **Contact** (`/contact`) - Contact information page
- **404** - Custom 404 error page

### Styling System
- Unified button design with 6px radius on all corners
- Two-button pill design (text + icon)
- Arrow animation on hover (opacity + transform)
- Responsive breakpoints (mobile ≤540px, tablet 541-1024px, desktop ≥1025px)
- CSS custom properties for theming
- Scoped CSS for component isolation

## Recent Improvements (Jul 23, 2026)

### Button Component Redesign
✅ Unified button design across all pages  
✅ Two distinct button sections (text + icon)  
✅ 6px border-radius on all corners  
✅ Arrow animation on hover (opacity + transform)  
✅ Consistent sizing and styling globally  
✅ Applied to: RampHero, RampCourses, RampResources, RampRetainer, Contact, Subscribe buttons

### Navigation Reorganization
✅ Menu links reorganized in order: Home → Courses → Subscription → Resources → Contact  
✅ Removed FAQ from main navigation  
✅ Responsive menu dropdown with toggle

## Development Workflow

### Start Development Server
```bash
npm run dev -- --port 4321
```
Access at `http://localhost:4321/index-ramp-rebuild`

### Type Check
```bash
npx astro check
```

### Build for Production
```bash
npm run build
```

### Take Screenshots (Playwright)
```bash
npx playwright screenshot --browser chromium --full-page --viewport-size "1440,900" --wait-for-timeout 2500 http://localhost:4321/index-ramp-rebuild screenshot.png
```

## Git Workflow

All changes have been committed. Recent commits include:
- Button component unification (9 commits)
- Button styling fixes (6 commits)
- Menu reorganization (1 commit)
- Button usage replacement (1 commit)

```bash
git log --oneline | head -20  # View recent commits
git status                     # Check working tree
git push origin main           # Deploy to production (if connected)
```

## Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: ≤540px, 541-1024px, ≥1025px
- Flexbox and CSS Grid layouts
- Adaptive typography with clamp()

### Button System
- **Unified Component**: Single Button.astro component
- **Two-Section Design**: Text section + Icon section
- **Animation**: Arrow fades and translates on hover
- **Usage**: `<Button label="TEXT" href="/path" />`
- **Props**: label, href, onClick, fontSize, fontWeight, letterSpacing, uppercase

### Navigation
- Sticky header with responsive menu
- Menu dropdown with click-to-close
- Keyboard-accessible (ARIA labels)
- Mobile hamburger menu toggle

### Typography
- **Display**: Switzer (24px-72px, fw: 400)
- **Body**: Inter (16px, fw: 400-700)
- **Mono**: Azeret Mono (14px, fw: 500)
- **Labels**: Manrope (30px, fw: 600 for logo)

### Colors
- **Background**: #FFEA00 (yellow hero), #FAFAFA (light sections), #FFFFFF (white)
- **Text**: #000000 (black)
- **Accent**: #000000 (buttons)
- **Card Backgrounds**: White or custom per section

## Template Structure

```
ramp-astro-template/
├── src/
│   ├── components/        # All Ramp components
│   │   ├── Button.astro              # Unified button
│   │   ├── RampHero.astro            # Hero section
│   │   ├── RampHeader.astro          # Navigation
│   │   ├── RampCourses.astro         # Course carousel
│   │   ├── RampFooter.astro          # Footer
│   │   └── ...                       # Other components
│   ├── layouts/           # Page layouts
│   │   └── RampTemplateLayout.astro  # Main layout
│   ├── pages/             # Route pages
│   │   ├── index-ramp-rebuild.astro  # Homepage
│   │   ├── courses/
│   │   ├── subscription.astro
│   │   ├── contact.astro
│   │   └── 404.astro
│   ├── content/           # Markdown content
│   └── styles/            # Global styles
├── public/                # Static assets
├── astro.config.mjs       # Astro configuration
├── package.json           # Dependencies
└── TEMPLATE-README.md     # This file
```

## Customization Guide

### Change Brand/Logo
Edit `RampHeader.astro` line 13:
```astro
<a href="/index-ramp-rebuild" class="brand-logo">{brand}</a>
```

### Update Menu Links
Edit `RampHeader.astro` lines 24-28:
```astro
<a href="/path" class="menu-item">LINK_TEXT</a>
```

### Customize Button Styling
Edit `Button.astro` CSS:
- `.btn-text` - Text section background/padding
- `.btn-arrow-container` - Arrow section styling
- Adjust colors, padding, radius, animations

### Change Colors
Global colors are defined in component scoped CSS. Update per section:
- Hero: `.hero { background: #FFEA00; }`
- Sections: `.section { background: #FAFAFA; }`

### Add New Pages
Create `.astro` file in `src/pages/` and import layout:
```astro
---
import RampTemplateLayout from '../layouts/RampTemplateLayout.astro';
---
<RampTemplateLayout title="Page Title" description="Meta desc">
  <!-- Content -->
</RampTemplateLayout>
```

## Deployment

This template is configured for Netlify auto-deploy from git main branch.

1. Push to main: `git push origin main`
2. Netlify automatically builds and deploys (~1-3 minutes)
3. View live at your Netlify domain

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Astro static site generation (fast builds)
- Minimal JavaScript (mostly static HTML)
- Optimized images with Astro's built-in tools
- Fast load times and Core Web Vitals

## Known Issues & Solutions

| Issue | Solution |
|-------|----------|
| Button styling not applying | Check scoped CSS with `!important` flags |
| Menu dropdown not closing | Ensure menu-toggle script is loaded |
| Responsive layout breaking | Check breakpoint values in media queries |
| Content overflow on mobile | Use flexbox with `flex-wrap` or reduce padding |

## Git History

All changes tracked with descriptive commits. Key commits:

- `3fd0b0c` - Reorganize menu links
- `c3417bf` - Replace Contact/Subscribe buttons with unified component
- `382a045` - Fix button height
- `20864c6` - Fix button design and corners
- `74bd429` - Unify button design

## Next Steps

1. **Customize Content**: Update hero text, course descriptions, pricing
2. **Add Your Brand**: Update logo, colors, fonts
3. **Configure Navigation**: Update menu links for your site structure
4. **Test Locally**: Run `npm run dev` and verify all pages
5. **Deploy**: Push to git and let Netlify handle the rest

## Support

For issues or questions:
- Check the git commit history for implementation details
- Review component code for customization options
- Test locally with dev server before deploying

---

**Template Version**: 1.0 (Jul 23, 2026)  
**Astro Version**: 7.1.3  
**Node**: 22.12.0+  
**Last Updated**: Jul 23, 2026
