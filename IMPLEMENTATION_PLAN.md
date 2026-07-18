# Basalio Ramp Studio - 1:1 Implementation Plan
## Complete Reference Design Rebuild

**Project:** Create exact pixel-perfect match with all reference designs  
**Status:** Ready to implement  
**Timeline:** Multi-phase implementation  

---

## 📋 Phase 1: Foundation & Global Styles

### Task 1.1: Update Color Variables
- [ ] Define all colors as CSS variables
- [ ] Primary Yellow: #FFEA00
- [ ] Black: #000000
- [ ] Dark sections: #0A0A0A
- [ ] White: #FFFFFF
- [ ] Text grays: #333333, #555555
- [ ] Background light gray: #F5F5F5

### Task 1.2: Typography System
- [ ] Set up font families (sans-serif system stack)
- [ ] Define heading sizes (h1: ~48-56px, h2: ~36-40px, h3: ~24-28px)
- [ ] Define body text sizes (base: ~16px, small: ~14px)
- [ ] Font weights (regular: 400, semibold: 600, bold: 700, extra-bold: 900)
- [ ] Line heights (headings: 1.1-1.2, body: 1.6)

### Task 1.3: Spacing System
- [ ] Define spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, etc.)
- [ ] Container max-width: 1200px
- [ ] Section padding (top/bottom): 60-80px
- [ ] Sidebar width: 20-25%

### Task 1.4: Header/Navigation Component
- [ ] Yellow background (#FFEA00)
- [ ] "Ramp Studio." logo (left)
- [ ] "MENU" button (right, dark background)
- [ ] Proper spacing and alignment
- [ ] Mobile responsive (hamburger menu)

### Task 1.5: Footer Component
- [ ] Yellow background (#FFEA00)
- [ ] Left side: Address "Østerbrogade 45, 2100 København Ø, Copenhagen, Denmark"
- [ ] Right side: Footer links (Courses, Subscription, About, Contact, Privacy Policy, Terms & Conditions)
- [ ] Bottom: Large "RampStudio.Creat..." branding text
- [ ] Proper spacing and layout

---

## 📄 Phase 2: Homepage Implementation

### Task 2.1: Hero Section
- [ ] Full yellow background (#FFEA00)
- [ ] Two-column layout (60% left, 40% right)
- [ ] Left: "We turn strategy into growth" headline
  - [ ] Font size: 48-56px
  - [ ] Font weight: 900 (extra-bold)
  - [ ] Color: Black
  - [ ] Line height: 1.1-1.2
  - [ ] Small dot indicator below
  
- [ ] Right: Profile image
  - [ ] Aspect ratio: ~2:1 or 1:1
  - [ ] Proper positioning and sizing

### Task 2.2: Featured Course / Stats Section
- [ ] Background: White with proper spacing
- [ ] "RAMP 01 OF 01" label
- [ ] Left content: Course info
  - [ ] Course title
  - [ ] Description text
  
- [ ] Right content: Stats
  - [ ] 3-column layout
  - [ ] Items: Marketing 30%, Social Media 50%, Coaching 20%
  - [ ] Proper typography and spacing

### Task 2.3: Courses Preview Section
- [ ] Background: White
- [ ] "OUR COURSES" label with accent
- [ ] "Courses for Digital Creatives" heading
- [ ] "VIEW ALL" button (dark background)
- [ ] Carousel layout (2-3 cards visible)
- [ ] Navigation arrows (left/right)
- [ ] Course cards:
  - [ ] Yellow background (#FFEA00)
  - [ ] Black icon/illustration centered
  - [ ] Course title and description
  - [ ] Badge (BEGINNER FRIENDLY or SELF PACED)

### Task 2.4: Resources Section
- [ ] Background: White/light gray
- [ ] "OUR RESOURCES" label
- [ ] Description text
- [ ] "VIEW ALL" button
- [ ] Accordion list:
  - [ ] Client Onboarding
  - [ ] Branding Framework
  - [ ] AI Prompts for Marketing
- [ ] Click to expand/collapse functionality

### Task 2.5: Pricing/Retainer Section
- [ ] Background: White
- [ ] "MONTHLY RETAINER" label
- [ ] "Endless Support" heading
- [ ] "CONTACT US" button
- [ ] Two-column pricing cards:
  - [ ] Essentials: White/light background, €1750/mo
  - [ ] Premium: Yellow background (#FFEA00), €2750/mo
  - [ ] Feature lists
  - [ ] "SUBSCRIBE" buttons (dark)

### Task 2.6: Testimonials Section
- [ ] Background: White
- [ ] "TESTIMONIALS" label
- [ ] "Learner Stories" heading
- [ ] Carousel layout (3 cards visible)
- [ ] Navigation arrows
- [ ] Card content:
  - [ ] Client image
  - [ ] Quote (italic style)
  - [ ] Client name, role
  - [ ] Results metric

### Task 2.7: FAQ Section
- [ ] Background: Dark/Black (#0A0A0A)
- [ ] Text color: White
- [ ] "FAQ" heading
- [ ] Description text
- [ ] Accordion list (6 items):
  - [ ] "What does Ramp Studio do?"
  - [ ] "Who is Ramp Studio for?"
  - [ ] "How do your courses work?"
  - [ ] "What is the subscription marketing retainer?"
  - [ ] "Do I need to choose between courses, resources, or the retainer?"
  - [ ] "What makes Ramp Studio different from other marketing agencies?"
- [ ] Expand/collapse functionality
- [ ] Proper styling for dark background

---

## 🎓 Phase 3: Courses Page Implementation

### Task 3.1: Page Header/Hero
- [ ] Background: White
- [ ] Left sidebar: "OUR COURSES" label with yellow dot
- [ ] Main heading: "Explore courses built to strengthen strategy, execution & long-term growth for any team."
  - [ ] Font size: ~40-48px
  - [ ] Line height: Generous spacing

### Task 3.2: Course Grid
- [ ] 2-column layout
- [ ] Grid gap: 20-30px
- [ ] 6 courses total (with Load More pagination)
- [ ] Each course card:
  - [ ] Yellow background (#FFEA00)
  - [ ] Square aspect ratio (1:1)
  - [ ] Centered black icon/illustration
  - [ ] Title below icon
  - [ ] Description text (small, gray)
  - [ ] Badge (BEGINNER FRIENDLY or SELF PACED) in light gray box

### Task 3.3: Course Icons
- [ ] Social Media Growth: Dots pattern (4 squares, 2x2)
- [ ] Content Creation 101: Star in rounded square
- [ ] Branding 101: 7-dot pattern
- [ ] Email Marketing 101: "U" shape
- [ ] Marketing Funnels 101: Diagonal lines
- [ ] Coaching Offers 101: Stacked squares (3)

### Task 3.4: Load More Button
- [ ] Gray background button
- [ ] "LOAD MORE" text (uppercase)
- [ ] Centered below grid
- [ ] Functional pagination

### Task 3.5: Testimonials Section (Courses Page)
- [ ] Same as homepage testimonials
- [ ] "Learner Stories" carousel
- [ ] Navigation and content

---

## 👥 Phase 4: About Page Implementation

### Task 4.1: Vision/Intro Section
- [ ] "OUR VISION" label
- [ ] Main heading: "We help brands grow with clarity, consistency, and confidence that delivers real results."
- [ ] 3-column stats grid (yellow backgrounds):
  - [ ] 25k
  - [ ] 21
  - [ ] $2M
- [ ] Client logos row below stats

### Task 4.2: Story/Quote Section
- [ ] Split layout: Image (left) + Yellow content (right)
- [ ] Left: Woman's portrait image (bright/light)
- [ ] Right (yellow #FFEA00):
  - [ ] Large quote text
  - [ ] "EXPERTISE" and "RESULTS" tags
  - [ ] Play button icon

### Task 4.3: What We Do Section
- [ ] Dark background (#0A0A0A)
- [ ] White text
- [ ] "WHAT WE DO" heading
- [ ] Service items (4+):
  - [ ] 01 Growth Marketing
  - [ ] (etc., based on reference)
  - [ ] Each with number, title, description

### Task 4.4: Timeline/Milestones
- [ ] Dark background continues
- [ ] White text
- [ ] Timeline items with years
- [ ] Milestone descriptions

### Task 4.5: Contact CTA Section
- [ ] Dark background
- [ ] "CONTACT US" label
- [ ] "Let's chat" heading
- [ ] Contact form:
  - [ ] Name field
  - [ ] Email field
  - [ ] Message textarea
  - [ ] "CONTACT" button (yellow background)

---

## 📧 Phase 5: Contact Page Implementation

### Task 5.1: Hero/Info Section
- [ ] "CONTACT US" label (left)
- [ ] Decorative black dots (right)
- [ ] Phone: "+45 32 84 71 96" (large, clickable)
- [ ] Email: "hello@rampstudio.com" (large, clickable)
- [ ] Social links:
  - [ ] Linkedin
  - [ ] Instagram
  - [ ] Twitter

### Task 5.2: Contact Form
- [ ] "MESSAGE US" label
- [ ] Decorative dots
- [ ] Form fields:
  - [ ] Name (with placeholder "John Smith")
  - [ ] Email (with placeholder "john@email.com")
  - [ ] Message (textarea with placeholder)
- [ ] "SUBMIT" button (dark background, uppercase)
- [ ] Form styling and spacing

### Task 5.3: Form Functionality
- [ ] Validation
- [ ] Submit handling
- [ ] Success/error messages

---

## 📱 Phase 6: Responsive Design

### Task 6.1: Mobile Breakpoints
- [ ] Tablet (768px): Adjust column layouts, spacing
- [ ] Mobile (375px): Single column, stacked layouts
- [ ] Test all pages at breakpoints

### Task 6.2: Mobile Navigation
- [ ] Hamburger menu implementation
- [ ] Mobile menu interaction
- [ ] Touch-friendly button sizes

### Task 6.3: Mobile-Specific Optimizations
- [ ] Image sizing and loading
- [ ] Font scaling
- [ ] Form input sizes
- [ ] Carousel/carousel navigation on mobile

---

## 🎨 Phase 7: Polish & Refinement

### Task 7.1: Visual Verification
- [ ] Compare each page with reference screenshots
- [ ] Check color accuracy
- [ ] Verify typography (sizes, weights, spacing)
- [ ] Validate spacing and alignment

### Task 7.2: Interactive Elements
- [ ] Button hover states
- [ ] Link hover states
- [ ] Form input focus states
- [ ] Carousel navigation interactions
- [ ] Accordion open/close animations

### Task 7.3: Performance
- [ ] Image optimization
- [ ] CSS minification
- [ ] Remove unused styles
- [ ] Optimize bundle size

### Task 7.4: Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Color contrast verification

---

## ✅ Phase 8: Quality Assurance

### Task 8.1: Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Task 8.2: Device Testing
- [ ] Desktop (1440px+)
- [ ] Tablet (768px)
- [ ] Mobile (375px)
- [ ] Large displays (1920px+)

### Task 8.3: Final Review
- [ ] All pages match references
- [ ] All functionality working
- [ ] No visual regressions
- [ ] Performance acceptable
- [ ] Accessibility compliant

---

## 📊 Implementation Priority

### High Priority (Must Have for Parity)
1. Homepage - Hero section
2. Homepage - Course grid
3. Courses page - Full page
4. Global header/footer styling
5. Color and typography system

### Medium Priority (Important for Completeness)
1. About page
2. Contact page
3. Testimonials carousels
4. FAQ accordion
5. Pricing section

### Lower Priority (Nice to Have)
1. Animation refinements
2. Advanced interactions
3. SEO optimizations
4. Analytics integration

---

## 🔗 Reference Images Mapping

| Page | Reference File | Status |
|------|---|---|
| Homepage | homepage.webp | ✓ Analyzed |
| Courses | courses.png | ✓ Analyzed |
| About | about.png | ✓ Analyzed |
| Contact | contact.png | ✓ Analyzed |
| Resources | Resources.png | To analyze |
| Subscription | subscription.png | To analyze |
| Not Found | Page Not Found.png | To analyze |
| Privacy | Privacy Policy.png | To analyze |
| Terms | Terms & Conditions.png | To analyze |
| Rapid Toolkit | Rapid Offer Toolkit.png | To analyze |
| Mobile | homepage_mobile.webp | To analyze |

---

## 🚀 Next Steps

1. **Complete analysis** of remaining reference images
2. **Begin Phase 1** - Foundation & Global Styles
3. **Proceed through phases** in priority order
4. **Test each page** before moving to next
5. **Final QA** before deployment

---

**Created:** 2026-07-18  
**Status:** Ready for implementation
