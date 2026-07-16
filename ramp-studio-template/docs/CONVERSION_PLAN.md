# Ramp Studio → Basalio Astro Conversion Plan

## Project Overview
Converting Framer-exported HTML template from Ramp Studio into Astro components while maintaining Basalio's design system and existing functionality.

## Asset Summary
- **28 image assets** extracted (logos, course thumbnails, hero images)
- **100+ font files** (Manrope, Azeret Mono)
- **1 complete HTML file** (242 lines, 677KB)
- **Responsive breakpoints**: Mobile (max 809px), Tablet (810-1199px), Desktop (1200px+)

## Phase 1: Analysis & Preparation
- [x] Download template
- [x] Extract asset URLs
- [x] Identify sections
- [ ] View template in browser
- [ ] Document layout structure
- [ ] Map sections to Astro components

## Phase 2: Component Architecture
### New Components to Create
1. **Layout Components**
   - Header/Navigation (responsive)
   - Hero section
   - Feature grid
   - Course/content cards
   - Footer

2. **Reusable Components**
   - Card (with image, title, description)
   - Button (variants)
   - Badge/Tag
   - Grid container (responsive)

3. **Page-Level Components**
   - Homepage (combining all sections)

### Keep Existing Components
- Modules section (Grid Reveal, Case Study Transition, etc.)
- Interactive elements from current Basalio
- Performance-optimized video components

## Phase 3: Design System Integration
### Fonts Adaptation
| Ramp Studio | Basalio Equivalent | Reason |
|-------------|------------------|--------|
| Manrope (600px) | Space Grotesk | Display headings |
| Azeret Mono | IBM Plex Mono | Code/labels |
| Body font | Inter | Body text |

### Color Palette
- Keep Basalio colors (#DFFF00, #0A0A0A, #E8E8E8, #2D2D2D)
- Adapt Ramp's yellow theme to Basalio yellow accent
- Maintain contrast ratios and accessibility

### Spacing & Layout
- Use existing Basalio 8px grid system
- Responsive breakpoints: 809px, 1199px (match Ramp template)
- Max-width: 1440px (current Basalio standard)

## Phase 4: Implementation Steps

### Step 1: Extract & Organize
```
ramp-studio-template/
├── index.html (reference)
├── assets/
│   ├── images/ (downloaded)
│   └── icons/ (extracted SVGs)
├── docs/
│   ├── CONVERSION_PLAN.md
│   ├── image-urls.txt
│   └── SECTION_ANALYSIS.md
└── astro-components/ (new)
    ├── Header.astro
    ├── Hero.astro
    ├── FeatureGrid.astro
    ├── CourseCard.astro
    ├── Footer.astro
    └── ...
```

### Step 2: Build Components
1. Create each component as `.astro` file
2. Extract styles inline or import from global CSS
3. Accept props for content (so we can fill with Basalio data)
4. Test responsive behavior

### Step 3: Create Astro Pages
1. New layout.astro (template)
2. index.astro (homepage with new design)
3. Import new components
4. Fill with Basalio content

### Step 4: Content Integration
- Replace Ramp branding with Basalio branding
- Fill courses section with Basalio offerings
- Update copy to match Basalio messaging
- Integrate existing modules section
- Add navigation to case studies

### Step 5: Testing & Refinement
- Mobile responsiveness
- Interactive elements
- Performance optimization
- Accessibility audit
- Browser compatibility

## Phase 5: Migration Strategy
### Option A: Parallel Build (Recommended)
- Keep current index.astro as "v1"
- Build new layout separately
- Test both
- Switch when ready
- Rollback path exists

### Option B: Direct Replace
- Backup current index.astro
- Replace with new version
- Quick to deploy but riskier

## Deliverables Timeline
| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| Analysis | Review template, extract content | 1 session |
| Components | Build 5-7 new components | 2 sessions |
| Content | Fill with Basalio data | 1 session |
| Integration | Combine with existing modules | 1 session |
| Testing | QA, performance, accessibility | 1 session |

## Success Criteria
- ✅ All sections display correctly
- ✅ Responsive at all breakpoints
- ✅ Basalio branding consistent
- ✅ Existing modules integrated
- ✅ Navigation works
- ✅ Performance maintained
- ✅ SEO metadata updated
- ✅ Accessibility WCAG 2.2 compliant

## Known Considerations
- Ramp uses Manrope; Basalio uses Space Grotesk (font substitution)
- Ramp's yellow theme aligns well with Basalio's #DFFF00
- Complex Framer animations may need simplification for Astro
- Embedded SVGs in Framer export may need cleanup
- Image optimization: download and optimize JPGs/PNGs

## Next Steps
1. View template at `ramp-studio-template/index.html` in browser
2. Document layout structure in SECTION_ANALYSIS.md
3. Decide on priority: quick launch vs. polished redesign
4. Begin Phase 2 component architecture
