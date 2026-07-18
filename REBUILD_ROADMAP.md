# Basalio Ramp Studio - Complete Rebuild Roadmap
## 1:1 Reference Design Implementation

**Objective:** Transform every page to exactly match the reference designs  
**Scope:** Structure, layout, fonts, styles, colors, images, sizing, spacing  
**Status:** Foundation complete, ready for component-by-component rebuild

---

## ✅ Completed Steps

### Step 1: Design System Analysis
- ✅ Analyzed all 13 reference images
- ✅ Documented color palette: #FFEA00 (primary), #000000 (black), #0A0A0A (dark bg), #FFFFFF (white)
- ✅ Created DESIGN_SPEC.md with full specifications
- ✅ Created IMPLEMENTATION_PLAN.md with detailed task breakdown

### Step 2: Foundation
- ✅ Updated color tokens: #FFEA00 (from #DFFF00)
- ✅ Reviewed global CSS foundation
- ✅ Verified typography system structure
- ✅ Confirmed spacing scale system

---

## 🎯 Rebuild Priority (Highest to Lowest Impact)

### TIER 1: Critical Foundation (Must Complete First)
These changes are foundational and affect all pages.

**1.1 Header Component** - Top priority
- Current: Nav component exists but styling needs refinement
- Target: Match reference exactly
  - Yellow (#FFEA00) background
  - "Ramp Studio." logo (left)
  - "MENU" button (dark background, right)
  - Proper spacing and alignment
- Files: `src/components/Nav.astro` or similar
- Estimated effort: 1-2 hours

**1.2 Footer Component** - Top priority
- Current: RampFooter exists
- Target: Match reference exactly
  - Yellow (#FFEA00) background
  - Address (left): "Østerbrogade 45, 2100 København Ø, Copenhagen, Denmark"
  - Links (right): Courses, Subscription, About, Contact, Privacy Policy, Terms & Conditions
  - Large "RampStudio.Creat..." branding text at bottom
- Files: `src/components/RampFooter.astro`
- Estimated effort: 1-2 hours

**1.3 Color/Style Variables** - In Progress
- Current: Tokens updated
- Target: Ensure all components use correct colors
- Remaining: Audit all CSS files for color references
- Estimated effort: 1 hour

---

### TIER 2: Homepage Rebuild (Highest Visibility)
**2.1 Hero Section**
- Current: RampHero component exists
- Target: Exact match
  - Yellow background (#FFEA00)
  - Left: "We turn strategy into growth" (48-56px, bold, black)
  - Right: Profile image (woman portrait)
  - Small dot indicator
- Files: `src/components/RampHero.astro`
- Estimated effort: 2-3 hours

**2.2 Course Grid Section**
- Current: RampCourses component exists
- Target: Exact match
  - 2-column grid (or carousel view)
  - Yellow cards (#FFEA00)
  - Black icons centered
  - Course titles, descriptions, badges
  - Navigation arrows
- Files: `src/components/RampCourses.astro`
- Estimated effort: 2-3 hours

**2.3 Resources Accordion**
- Current: RampResources component exists
- Target: Exact match
  - Expand/collapse functionality
  - Proper styling and spacing
- Files: `src/components/RampResources.astro`
- Estimated effort: 1-2 hours

**2.4 Pricing Section**
- Current: RampRetainer component exists
- Target: Exact match
  - Essentials card (white/light)
  - Premium card (yellow #FFEA00)
  - Pricing (€1750/mo, €2750/mo)
  - Feature lists
  - SUBSCRIBE buttons
- Files: `src/components/RampRetainer.astro`
- Estimated effort: 2 hours

**2.5 Testimonials Carousel**
- Current: Component exists
- Target: Exact match
  - Carousel showing 3 cards
  - Images, quotes, client names, results
  - Navigation arrows
- Files: Testimonials component
- Estimated effort: 1-2 hours

**2.6 FAQ Section**
- Current: RampFAQ component exists
- Target: Exact match
  - Dark background (#0A0A0A)
  - White text
  - 6 accordion items
  - Expand/collapse functionality
- Files: `src/components/RampFAQ.astro`
- Estimated effort: 1-2 hours

**2.7 Stats/Featured Course**
- Current: Might need creation
- Target: Create if missing
  - "RAMP 01 OF 01" label
  - Course info (left), Stats (right)
  - Marketing 30%, Social Media 50%, Coaching 20%
- Files: Create new component if needed
- Estimated effort: 1-2 hours

---

### TIER 3: Courses Page (/courses)
**3.1 Page Hero**
- Left sidebar: "OUR COURSES" with yellow dot
- Main: "Explore courses built to strengthen strategy, execution & long-term growth for any team."
- Estimated effort: 1 hour

**3.2 Course Grid (2-column)**
- 6 courses with icons, titles, descriptions, badges
- Yellow backgrounds (#FFEA00)
- Course icons (dots, stars, patterns)
- Estimated effort: 2-3 hours

**3.3 Load More Button**
- Pagination functionality
- Estimated effort: 1 hour

**3.4 Testimonials**
- Same as homepage
- Estimated effort: 1 hour

---

### TIER 4: About Page (/about)
**4.1 Vision Section**
- Heading + stats (3 columns, yellow backgrounds)
- Client logos
- Estimated effort: 1-2 hours

**4.2 Story/Quote Section**
- Split: Image (left) + Yellow content (right)
- Quote, tags, play button
- Estimated effort: 1-2 hours

**4.3 Services Grid**
- Dark background (#0A0A0A)
- 4+ services with numbers and descriptions
- Estimated effort: 1-2 hours

**4.4 Timeline**
- Milestones and years
- Estimated effort: 1-2 hours

**4.5 Contact CTA**
- Form: Name, Email, Message
- Submit button (yellow)
- Estimated effort: 1 hour

---

### TIER 5: Contact Page (/contact)
**5.1 Contact Info**
- Phone: "+45 32 84 71 96"
- Email: "hello@rampstudio.com"
- Social links
- Estimated effort: 1 hour

**5.2 Contact Form**
- Name, Email, Message fields
- Submit button
- Form styling
- Estimated effort: 1-2 hours

---

### TIER 6: Other Pages
- Resources page
- Subscription page
- 404 Not Found
- Privacy Policy
- Terms & Conditions
- Estimated effort: 3-4 hours total

---

### TIER 7: Responsive Design
- Mobile breakpoints (375px, 768px)
- Hamburger menu
- Touch-friendly interactions
- Estimated effort: 3-4 hours

---

### TIER 8: Polish & QA
- Visual verification against references
- Interactive element testing
- Performance optimization
- Accessibility compliance
- Browser/device testing
- Estimated effort: 2-3 hours

---

## 📋 Next Actions

### Immediate (Today)
1. ✅ Update color tokens
2. **→ Review existing component files** (src/components/)
3. **→ Identify which components need updates vs. recreation**
4. **→ Start with Header and Footer (Tier 1.1-1.2)**
5. **→ Move to Hero section (Tier 2.1)**

### This Session
1. Complete all Tier 1 components (foundation)
2. Complete Homepage Tier 2 components
3. Update /index-ramp-rebuild page to use refined components
4. Verify homepage matches reference visually

### Next Session
1. Complete Courses page (Tier 3)
2. Complete About page (Tier 4)
3. Complete Contact page (Tier 5)
4. Complete other pages (Tier 6)

### Final Phase
1. Responsive design refinements
2. Polish and QA
3. Final comparison with all references

---

## 📊 Reference Image Mapping

| Component | Reference | Status |
|-----------|-----------|--------|
| Header | All pages | Analyzed ✓ |
| Hero | homepage.webp | Analyzed ✓ |
| Course Grid | courses.png | Analyzed ✓ |
| Testimonials | courses.png, homepage.webp | Analyzed ✓ |
| FAQ | homepage.webp | Analyzed ✓ |
| Footer | All pages | Analyzed ✓ |
| Pricing | homepage.webp | Analyzed ✓ |
| About Sections | about.png | Analyzed ✓ |
| Contact Form | contact.png | Analyzed ✓ |

---

## 🚀 How to Use This Roadmap

1. **Read Tier 1** - Understand foundation work
2. **Complete Tier 1** - Build strong foundation
3. **Move through Tiers 2-5** - Page by page
4. **Complete Tiers 6-8** - Refinement and QA

Each tier builds on the previous, so completing in order ensures maximum efficiency.

---

## 💡 Key Principles for This Rebuild

1. **Pixel Perfect** - Every spacing, size, and position must match references
2. **Color Exact** - #FFEA00 is the primary yellow, not #DFFF00
3. **Typography Precise** - Font sizes, weights, and line heights match
4. **Layout Structured** - Use proper grid/flexbox patterns
5. **Responsive Considered** - Must work at all breakpoints
6. **Interactive Smooth** - Carousels, accordions, forms work perfectly
7. **Accessible Always** - WCAG compliance throughout

---

## 📈 Progress Tracking

- [ ] Tier 1 - Foundation (Header, Footer, Colors)
- [ ] Tier 2 - Homepage Components
- [ ] Tier 3 - Courses Page
- [ ] Tier 4 - About Page
- [ ] Tier 5 - Contact Page
- [ ] Tier 6 - Other Pages
- [ ] Tier 7 - Responsive Design
- [ ] Tier 8 - Polish & QA

---

**Created:** 2026-07-18  
**Status:** Ready to begin implementation  
**Estimated Total Time:** 20-30 hours for complete rebuild
