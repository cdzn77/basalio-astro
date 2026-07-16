# Ramp Studio Template - Complete Structure Analysis

## Full Page Layout

### 1. **Navigation + Hero Section**
- **Background**: Bright yellow (#FFEA00)
- **Layout**: Logo/brand on left, navigation menu on right (MENU button)
- **Navigation Items**: Courses, 404, Subscription, Terms & Conditions, About, Privacy Policy, Contact
- **Hero Content**: 
  - Large "Ramp Studio." heading
  - Central image with glitch/animation effect
  - Address footer (Østerbrogade 45, 2100 København Ø, Copenhagen, Denmark)

### 2. **Featured Course Card**
- **Background**: Yellow (#FFEA00)
- **Layout**: Two-column (text left, image right)
- **Text Section**:
  - Label: "COACHING OFFERS 101"
  - Description: "This course helps you design clear, compelling offers that people actually understand and want to buy."
  - CTA Button: "VIEW COURSE" with arrow
- **Image**: Course hero image with glitch effect

### 3. **Stats/Metrics Section**
- **Background**: Light gray (#FAFAFA or similar)
- **Layout**: Three-column stat list
- **Items**:
  - Marketing: 30%
  - Social Media: 50%
  - Coaching: 20%
- **Style**: Simple horizontal list with dividers

### 4. **Courses Grid/Carousel Section**
- **Background**: Yellow (#FFEA00)
- **Layout**: Grid with carousel navigation
- **Header**:
  - Left side: "Courses for Digital Creatives" + "VIEW ALL" button
  - Navigation arrows (left/right)
- **Course Cards**: 
  - Yellow cards with black icons/illustrations
  - Grid layout (at least 3 visible)
  - Each card represents a course

### 5. **Resources Section**
- **Background**: Light gray
- **Layout**: Title + description + accordion list
- **Header**:
  - "OUR RESOURCES"
  - Description: "Kickstart your campaigns with free templates and resources because smart marketing should be accessible to everyone."
  - "VIEW ALL" button
- **Resource Items**: Expandable accordion items
  - Example items:
    - Branding Framework
    - AI Prompts for Marketing
    - (More expandable items)

### 6. **Pricing/Retainer Section**
- **Background**: Light gray
- **Layout**: Three-column comparison
- **Columns**:
  1. **Left (CTA)**:
     - "MONTHLY RETAINER"
     - "Endless Support" heading
     - "CONTACT US" button
  2. **Middle**:
     - "Essentials" tier
     - Features:
       - 4 design/content updates per month
       - 5 weekly social posts
       - Month strategy calls
       - 48-hour email support
  3. **Right**:
     - "Premium" tier (highlighted in yellow)
     - Features:
       - 12 design/content updates per month
       - 20 weekly social posts
       - Weekly strategy call
       - 24-hour email support

### 7. **Testimonials Section**
- **Background**: Light gray
- **Header**: "TESTIMONIALS" + "Learner Stories"
- **Layout**: Carousel with navigation arrows
- **Testimonial Cards**:
  - Client image/photo
  - Quote text
  - Client name + title
  - Results achieved (email sign ups, revenue, etc.)
- **Trusted By Section**: Client logos above testimonials

### 8. **FAQ Section**
- **Background**: Black (#0A0A0A or similar)
- **Header**:
  - "FAQ"
  - Description: "Explore our most commonly asked questions about our agency, podcast, and product launch resources."
- **Accordion Items**:
  - What does Ramp Studio do?
  - Who is Ramp Studio for?
  - How do your courses work?
  - What is the subscription marketing retainer?
  - Do I need to choose between courses, resources, or the retainer?
  - What makes Ramp Studio different from other marketing agencies?

### 9. **Footer/CTA Section**
- **Background**: Yellow (#FFEA00)
- **Left Side**:
  - Address: Østerbrogade 45, 2100 København Ø, Copenhagen, Denmark
- **Center**: "Ramp Studio." (large heading)
- **Right Side**: 
  - Footer Links:
    - Courses | 404
    - Subscription | Terms & Conditions
    - About | Privacy Policy
    - Contact

---

## Design System Notes

### Colors
- **Primary Yellow**: #FFEA00 (matches Basalio #DFFF00!)
- **Light Background**: #FAFAFA (light gray)
- **Dark Section**: #0A0A0A (black for FAQ)
- **Text**: Black on light, white on dark

### Typography
- **Fonts Used**: 
  - Manrope (600px weight) for headings
  - Azeret Mono for accents/labels
- **Basalio Equivalent**:
  - Space Grotesk (display)
  - Inter (body)
  - IBM Plex Mono (labels)

### Layout Patterns
- **Breakpoints**: Mobile (max 809px), Tablet (810-1199px), Desktop (1200px+)
- **Max Width**: ~1400-1456px
- **Spacing**: Generous margins and padding
- **Cards**: Yellow background with black accents/icons

---

## Component Extraction for Astro

### New Components to Build
1. **Hero Section** - Yellow bg, image, address footer
2. **Course Card** - Featured course layout
3. **Stats Section** - Three-column metric list
4. **Course Grid** - Carousel with course cards
5. **Resource List** - Accordion/expandable items
6. **Pricing Comparison** - Three-column table layout
7. **Testimonial Carousel** - Client testimonials with carousel
8. **FAQ Accordion** - Expandable FAQ section
9. **Navigation Header** - Sticky nav with menu
10. **Footer** - Contact info + links

### Reusable Components
- Button (with arrow variant)
- Card (course, testimonial, pricing)
- Accordion/Expandable Item
- Carousel/Slider
- Grid Container

---

## Integration Points with Basalio

### What to Keep
- Basalio's existing 9 interactive modules
- Current design system (colors, fonts, spacing)
- Navigation structure

### What to Replace
- Homepage layout (use Ramp template structure)
- Course/offering display (new carousel)
- Resource management (new accordion)
- Testimonial section (new carousel)

### Content Mapping
- **Ramp Courses** → Basalio offerings/services
- **Ramp Resources** → Basalio case studies/resources
- **Ramp Testimonials** → Basalio client testimonials
- **Ramp Pricing** → Basalio service packages

---

## Key Observations

✅ **Design Strengths**:
- Clean, bold typography
- High contrast (yellow + black + white)
- Clear information hierarchy
- Strong visual sections
- Responsive layout
- Multiple CTAs throughout

✅ **Perfect for Basalio**:
- Yellow color matches perfectly
- Professional, modern aesthetic
- Good course/offering showcase
- Strong testimonial section
- Clear pricing/service presentation

⚠️ **Considerations**:
- Font substitution (Manrope → Space Grotesk)
- Animations may need simplification for Astro
- Some Framer-specific interactions may need reimplementation
- Image optimization needed

---

## Recommended Approach

**Phase 1**: Build core components (Header, Hero, Course Grid, Footer)
**Phase 2**: Add secondary sections (Resources, Testimonials, FAQ)
**Phase 3**: Implement interactivity (Carousels, Accordions)
**Phase 4**: Content integration + Basalio branding
**Phase 5**: Testing + optimization

**Timeline**: ~5-7 hours of component development + content filling
