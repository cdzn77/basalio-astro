# Basalio Ramp Studio - Design Specification
## 1:1 Reference Implementation Guide

**Status:** In Progress  
**Reference Folder:** `/reference/`  
**Target:** Exact pixel-perfect match with all reference designs

---

## 🎨 Design System

### Color Palette
- **Primary Yellow:** #FFEA00
- **Primary Black:** #000000 / #0A0A0A (dark sections)
- **White:** #FFFFFF
- **Light Gray:** #F5F5F5 (backgrounds)
- **Dark Gray/Text:** #333333 / #555555

### Typography
- **Headline Font:** (Appears to be sans-serif, likely -apple-system or similar)
  - Hero headlines: Large, bold, black
  - Section titles: Medium-large, bold
  - Course titles: Regular weight
  
- **Body Text:** Sans-serif, regular weight
  - Descriptions: Regular weight, gray text
  - Labels: Small, uppercase, gray

- **Accent/Badges:** Small, uppercase text on gray background

### Spacing & Layout
- **Container Max-Width:** ~1200px (estimated from reference)
- **Sidebar Width:** 20-25% for left panels on courses page
- **Column Gap:** Consistent spacing between course cards (appears ~20-30px)
- **Section Padding:** Vertical spacing between sections

---

## 📄 Page-by-Page Specifications

### PAGE 1: HOMEPAGE (/index-ramp-rebuild or /)

#### Section 1: Header/Navigation
- **Background:** Yellow (#FFEA00)
- **Layout:** Flex, space-between
- **Left:** "Ramp Studio." text (logo)
- **Right:** "MENU" button (dark background, white text)
- **Padding:** Top/bottom ~14-16px, left/right padding

#### Section 2: Hero Section
- **Background:** Full yellow (#FFEA00)
- **Layout:** Two columns
- **Left Column (60%):**
  - Headline: "We turn strategy into growth" 
  - Font size: Large (appears ~48-56px)
  - Font weight: Bold/900
  - Line height: Tight
  - Small dot indicator below text
  
- **Right Column (40%):**
  - Profile image (woman, portrait orientation)
  - Image dimensions: Approx 2:1 or 1:1 aspect ratio
  - Positioned right side

#### Section 3: Featured Course / Stats Section
- **Background:** White with potential light gray
- **Label:** "RAMP 01 OF 01" (top left)
- **Left Content:**
  - Course title: "Coaching Offers 101" or similar
  - Description: "We believe marketing doesn't have to be complicated..."
  
- **Right Content:**
  - Stats display (3 items):
    - Marketing: 30%
    - Social Media: 50%
    - Coaching: 20%

#### Section 4: Courses Preview Section
- **Background:** White
- **Label:** "OUR COURSES"
- **Heading:** "Courses for Digital Creatives"
- **Button:** "VIEW ALL" (dark/black background)
- **Layout:** Carousel with navigation arrows
- **Cards Visible:** 2-3 course cards showing
- **Card Style:**
  - Yellow background (#FFEA00)
  - Black icon/illustration in center
  - Course title and description below
  - Badge (BEGINNER FRIENDLY or SELF PACED)

#### Section 5: Resources Section
- **Background:** White/Light gray
- **Label:** "OUR RESOURCES"
- **Description:** "Kickstart your campaigns with free templates..."
- **Button:** "VIEW ALL" (dark background)
- **Content:** Accordion list
  - Client Onboarding
  - Branding Framework
  - AI Prompts for Marketing
- **Interaction:** Click to expand/collapse

#### Section 6: Monthly Retainer Section
- **Background:** White
- **Label:** "MONTHLY RETAINER"
- **Heading:** "Endless Support"
- **Button:** "CONTACT US" (dark background)
- **Layout:** Two pricing cards side by side
  
  **Essentials Card:**
  - Background: White/Light gray
  - Features listed
  - Price: €1750/mo
  - Button: "SUBSCRIBE" (dark)
  
  **Premium Card:**
  - Background: Yellow (#FFEA00)
  - Features listed (bold/emphasized)
  - Price: €2750/mo
  - Button: "SUBSCRIBE" (dark)

#### Section 7: Testimonials/Learner Stories
- **Background:** White
- **Label:** "TESTIMONIALS"
- **Heading:** "Learner Stories"
- **Layout:** Carousel (3 visible at once)
- **Cards:**
  - Client image (left/top)
  - Quote text (italic)
  - Client name and role
  - Results metric
  - Navigation: Left/Right arrows

#### Section 8: FAQ Section
- **Background:** Dark/Black (#0A0A0A)
- **Text Color:** White
- **Heading:** "FAQ"
- **Description:** "Explore our most commonly asked questions..."
- **Layout:** Accordion list (6 items)
- **Interaction:** Click to expand/collapse
- **Content:**
  1. "What does Ramp Studio do?"
  2. "Who is Ramp Studio for?"
  3. "How do your courses work?"
  4. "What is the subscription marketing retainer?"
  5. "Do I need to choose between courses, resources, or the retainer?"
  6. "What makes Ramp Studio different from other marketing agencies?"

#### Section 9: Footer
- **Background:** Yellow (#FFEA00)
- **Layout:** Multi-column
- **Left:** Address "Østerbrogade 45, 2100 København Ø, Copenhagen, Denmark"
- **Right:** Footer links
  - Courses | 404
  - Subscription | Terms & Conditions
  - About | Privacy Policy
  - Contact
- **Bottom:** Large "RampStudio.Creat..." branding text

---

### PAGE 2: COURSES (/courses)

#### Section 1: Header/Navigation
- Same as homepage

#### Section 2: Hero Section
- **Background:** White
- **Layout:** Sidebar + Main
- **Left Sidebar (20-25%):**
  - Yellow dot/accent
  - "OUR COURSES" label
  
- **Main Content (75-80%):**
  - Heading: "Explore courses built to strengthen strategy, execution & long-term growth for any team."
  - Font size: Large (appears ~40-48px)
  - Line height: Generous

#### Section 3: Course Grid
- **Background:** White
- **Layout:** 2-column grid
- **Total Courses:** 6 visible (with Load More for pagination)
- **Grid Gap:** Consistent spacing (appears ~20-30px)

**Course Card Specifications:**
- **Background:** Yellow (#FFEA00)
- **Dimensions:** Square or 1:1 aspect ratio
- **Content:**
  - Center: Black icon/illustration
  - Below: Course title
  - Description text (small, dark gray)
  - Badge (BEGINNER FRIENDLY or SELF PACED) in light gray box
  
**Courses (in order):**
1. Social Media Growth - "Learn the fundamentals of building a strong social media presence" - BEGINNER FRIENDLY - Icon: Dots pattern
2. Content Creation 101 - "Teaches you how to create content that feels intentional and on-brand" - BEGINNER FRIENDLY - Icon: Star in square
3. Branding 101 - "Focus on positioning, messaging, and consistency across every touchpoint" - SELF PACED - Icon: Dots pattern (7 dots)
4. Email Marketing 101 - "Learn how to use email lists to actually support and grow your business" - SELF PACED - Icon: "U" shape
5. Marketing Funnels 101 - "Teaches you how to guide people from discovery to decision with intention." - SELF PACED - Icon: Diagonal lines
6. Coaching Offers 101 - "This course helps you design clear, compelling offers that people actually understand and want to buy." - SELF PACED - Icon: Stacked squares

#### Section 4: Pagination
- **Button:** "LOAD MORE" (dark/gray background)
- **Position:** Center, below course grid

#### Section 5: Testimonials/Learner Stories
- **Background:** White
- **Label:** "TESTIMONIALS"
- **Heading:** "Learner Stories"
- **Layout:** Carousel (2-3 visible)
- **Navigation:** Left/Right arrows
- **Card Content:**
  - Image (left/top)
  - Quote
  - Client name and role
  - Results metric

#### Section 6: Footer
- Same as homepage

---

### PAGE 3: ABOUT PAGE (/about)

#### Section 1: Header/Navigation
- Same as homepage

#### Section 2: Vision/Intro Section
- **Background:** White/Light gray
- **Label:** "OUR VISION"
- **Heading:** "We help brands grow with clarity, consistency, and confidence that delivers real results."
- **Stats Grid:** 3 columns, each with yellow background
  - 25k
  - 21
  - $2M
- **Logos Row:** Client logos below stats

#### Section 3: Story/Quote Section
- **Background:** Yellow (#FFEA00) and White (split)
- **Left (40%):** 
  - Image: Woman's portrait (bright/light photo)
  - Position: Left side on white background
  
- **Right (60%):**
  - Yellow background
  - Large quote: "Behind great marketing starts with clarity and precision, everything else becomes easier."
  - Tags: "EXPERTISE" and "RESULTS"
  - Icon: Play button

#### Section 4: What We Do / Services
- **Background:** Dark/Black (#0A0A0A)
- **Text Color:** White
- **Heading:** "WHAT WE DO"
- **Layout:** Multiple service cards/items
- **Services (in order):**
  - 01 Growth Marketing
  - 02 (another service)
  - 03 (another service)
  - 04 (another service)
- **Each Service:** Number, title, and description

#### Section 5: Timeline/Milestones
- **Background:** Dark/Black (#0A0A0A)
- **Text Color:** White
- **Layout:** Vertical timeline or multiple sections
- **Items:** Year + milestone/founded information

#### Section 6: Contact / Let's Chat
- **Background:** Dark/Black (#0A0A0A)
- **Text Color:** White
- **Label:** "CONTACT US"
- **Heading:** "Let's chat"
- **Form Fields:** (visible in reference)
  - Name
  - Email
  - Message/Description
- **Button:** "CONTACT" (yellow background #FFEA00)

#### Section 7: Footer
- Same as homepage

---

### PAGE 4: CONTACT PAGE (/contact)

**Reference Image:** contact.png (to be analyzed)

---

### PAGE 5: RESOURCES PAGE (/resources)

**Reference Image:** Resources.png (to be analyzed)

---

### PAGE 6: SUBSCRIPTION PAGE (/subscription)

**Reference Image:** subscription.png (to be analyzed)

---

## 🎯 Implementation Checklist

### Global Elements
- [ ] Header navigation styling and layout
- [ ] Footer styling, layout, and content
- [ ] Color variables in CSS
- [ ] Typography system
- [ ] Spacing/padding system

### Homepage
- [ ] Hero section layout and styling
- [ ] Featured course section
- [ ] Stats display
- [ ] Courses carousel with navigation
- [ ] Resources accordion
- [ ] Pricing tier cards
- [ ] Testimonials carousel
- [ ] FAQ accordion with dark background
- [ ] Overall page flow and spacing

### Courses Page
- [ ] Page header/hero section
- [ ] 2-column course grid layout
- [ ] Course card styling (yellow background, icons, badges)
- [ ] Load More pagination
- [ ] Testimonials section
- [ ] Responsive design verification

### About Page
- [ ] Vision/intro section with stats
- [ ] Image + quote section layout
- [ ] Services grid/list
- [ ] Timeline section
- [ ] Contact/CTA section
- [ ] Form styling

### Other Pages
- [ ] Contact page design and form
- [ ] Resources page layout
- [ ] Subscription page design
- [ ] 404 Not Found page
- [ ] Terms & Conditions page
- [ ] Privacy Policy page

---

## 📱 Responsive Design Breakpoints

Based on reference images visible layouts:
- **Desktop:** Full width (1200px+ container)
- **Tablet:** Adjusted spacing, 2-column to 1-column transitions
- **Mobile:** Single column, stacked layouts

**Mobile Reference:** homepage_mobile.webp (to be analyzed)

---

## 🔧 Technical Implementation Notes

### Astro Files to Update
- `src/pages/index.astro` or `src/pages/index-ramp-rebuild.astro`
- `src/pages/courses.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/components/RampHero.astro`
- `src/components/RampCourses.astro`
- `src/components/RampFooter.astro`
- (other component files)

### CSS/Styling
- Color scheme variables
- Typography scale
- Spacing system
- Component-specific styles
- Responsive breakpoints

### Images
- Reference folder contains placeholder/design images
- Need to implement actual image loading
- Course card icons: Black icons on yellow background
- Testimonial images: Client photos
- About page: Person portrait image

---

## ✅ Quality Assurance

- [ ] Visual comparison with reference screenshots
- [ ] Color accuracy verification
- [ ] Typography matching (font sizes, weights, line heights)
- [ ] Spacing and alignment verification
- [ ] Responsive design testing
- [ ] Interactive elements (carousels, accordions, buttons)
- [ ] Performance optimization
- [ ] Accessibility compliance

---

**Next Steps:** Analyze remaining reference images and begin implementation phase.
