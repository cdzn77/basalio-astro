# Ramp Template Analysis - Courses Page Architecture

**Date:** 2026-07-18  
**Purpose:** Understand Ramp template structure to ensure 1:1 match in Astro implementation

---

## Ramp Template - Expected Courses Page Structure

### Layout Overview (from TEMPLATE_STRUCTURE.md)

```
1. Navigation + Hero [Yellow #FFEA00]
   ├── Header: "Ramp Studio." (left) + "MENU" button (right)
   └── Navigation items: Courses, 404, Subscription, Terms, About, Privacy, Contact

2. Featured Course Card [Yellow #FFEA00]
   ├── Label: "COACHING OFFERS 101"
   ├── Description text
   └── CTA Button: "VIEW COURSE" with arrow

3. Stats/Metrics Section [Light gray #FAFAFA]
   ├── Three-column layout
   ├── Marketing: 30%
   ├── Social Media: 50%
   └── Coaching: 20%

4. Courses Grid/Carousel [Yellow #FFEA00]
   ├── Header: "Courses for Digital Creatives" + "VIEW ALL" button
   ├── Navigation arrows (< >)
   └── Course Cards: Yellow with black icons, grid layout (3+ visible)

5. Resources Section [Light gray]
   ├── "OUR RESOURCES" header
   ├── Description + "VIEW ALL" button
   └── Accordion items: Branding Framework, AI Prompts, etc.

6. Pricing/Retainer [Light gray]
   ├── Left: "MONTHLY RETAINER" + "Endless Support" + "CONTACT US" button
   ├── Middle: "Essentials" tier with features
   └── Right: "Premium" tier (yellow highlight) with features

7. Testimonials Section [Light gray]
   ├── "TESTIMONIALS" + "Learner Stories"
   ├── Client logos (Trusted By)
   └── Carousel: Client testimonials with navigation arrows

8. FAQ Section [Dark/Black #0A0A0A]
   ├── "FAQ" header
   ├── Description text
   └── Accordion items (6 questions)

9. Footer/CTA [Yellow #FFEA00]
   ├── Left: Address (Østerbrogade 45...)
   ├── Center: "Ramp Studio." (large heading)
   └── Right: Footer links (Courses | 404 | Subscription | Terms...)
```

---

## Current Implementation vs Ramp Template

### ✅ CORRECT - Matches Ramp Template

1. **Navigation & Header**
   - "Ramp Studio." logo on left ✅
   - "MENU +" button on right ✅
   - Yellow background #FFEA00 ✅
   - Fixed positioning ✅

2. **Featured Course Card**
   - Yellow background ✅
   - Label + description + CTA button ✅
   - Image on right ✅

3. **Stats Section**
   - Three-column display ✅
   - Marketing/Social Media/Coaching percentages ✅
   - Light gray background ✅

4. **Courses Grid Section**
   - Header with "Courses for Digital Creatives" ✅
   - "VIEW ALL" button ✅
   - Yellow course cards ✅
   - Black icons/illustrations ✅
   - 2-column grid layout ✅
   - Navigation arrows ✅

5. **Resources Section**
   - "OUR RESOURCES" header ✅
   - Description text ✅
   - "VIEW ALL" button ✅
   - Accordion items ✅

6. **Pricing Section**
   - "MONTHLY RETAINER" header ✅
   - "Endless Support" title ✅
   - "CONTACT US" button ✅
   - Essentials card ✅
   - Premium card (yellow) ✅
   - Feature lists ✅
   - Subscribe buttons ✅

7. **Testimonials Section**
   - "TESTIMONIALS" label ✅
   - "Learner Stories" heading ✅
   - Carousel layout ✅
   - Navigation arrows ✅
   - Testimonial cards with images/quotes ✅

8. **FAQ Section**
   - Dark background (#0A0A0A) ✅
   - "FAQ" header ✅
   - Accordion items ✅
   - White text ✅

9. **Footer**
   - Yellow background ✅
   - Address on left ✅
   - Links on right ✅

---

## ❌ ISSUES IDENTIFIED - NOT Matching Ramp Template

### CRITICAL Issue 1: Rounded Bottom Corners on Testimonials Container
**Ramp Template Shows:**
- Testimonials section has rounded bottom corners (40-50px radius)
- Creates visual transition from white section to yellow footer
- Smooth, polished appearance

**Current Implementation:**
- NO rounded corners on testimonials wrapper
- Abrupt transition to footer
- Doesn't match reference design

**Fix Required:**
```css
.testimonials-rounded {
  border-radius: 0 0 40px 40px;
  /* Creates the visual effect of white box sitting over yellow footer */
}
```

---

### Issue 2: Font Sizes Not Explicitly Defined

**Ramp Template Uses:**
- Display headings: Manrope 600 weight, large sizes
- Body text: Clear hierarchy with distinct sizes
- Labels: Manrope/Azeret Mono, smaller sizes

**Current Implementation:**
- Font sizes appear to be assumed, not explicitly measured
- No consistent sizing across elements
- Text hierarchy unclear

**Elements Needing Explicit Sizes:**
1. Hero section description: ~40-48px
2. Section headers (OUR COURSES, TESTIMONIALS, etc.): ~18-24px
3. Course titles: ~18-20px
4. Course descriptions: ~14-16px
5. Course badges: ~11-12px uppercase
6. Label text: ~12-14px uppercase
7. Body paragraphs: ~16px

---

### Issue 3: Navigation Menu Not Verified
**Ramp Template Shows:**
- Persistent fixed header across all pages
- Logo: "Ramp Studio." (30px, Manrope 600)
- Menu button: "MENU +" with black background, white text
- Yellow background throughout

**Current Implementation:**
- Header exists but exact measurements/spacing not verified
- Need to confirm padding, font sizes, button styling match reference exactly

---

### Issue 4: Component Spacing & Proportions

**Ramp Template Shows:**
- Specific gap measurements between course cards (appears to be 40-60px)
- Specific padding within cards
- Specific container widths (appears to be ~1400-1456px max-width)
- Specific vertical spacing between sections

**Current Implementation:**
- Spacing assumed but not pixel-perfect verified
- No explicit measurement from reference image

---

### Issue 5: Color Consistency

**Ramp Template Uses:**
- Primary Yellow: #FFEA00 ✅
- Light gray backgrounds: #FAFAFA
- Dark sections: #0A0A0A
- Text: #000000 (black) on light, #FFFFFF on dark

**Current Implementation:**
- Colors appear correct but badge colors need verification
- Light gray sections should be #FAFAFA (not white)

---

## Action Plan - To Achieve 1:1 Match

### Phase 1: Critical Fixes (Must Do)
1. **Add rounded bottom corners** to testimonials section
   - `border-radius: 0 0 40px 40px;`
   - Matches Ramp template visual effect

2. **Define explicit font sizes** for all text elements
   - Use measurements from reference image
   - Create CSS size scale matching Ramp template

3. **Verify header/navigation** styling
   - Confirm logo size (30px)
   - Confirm button styling
   - Confirm yellow background consistency

### Phase 2: Layout Verification
1. Measure exact gaps between course cards
2. Verify container max-width (1400-1456px)
3. Check padding within course cards
4. Verify vertical spacing between sections

### Phase 3: Color Audit
1. Verify all yellow sections are #FFEA00
2. Verify light gray sections are #FAFAFA
3. Verify dark section is #0A0A0A
4. Verify text colors match (black on light, white on dark)

### Phase 4: Badge/Component Details
1. Badge styling: colors, padding, border-radius
2. Button styling: padding, font-size, colors
3. Card styling: shadows, borders, hover states
4. Icon sizing and centering

---

## Files to Modify

1. `/src/pages/courses.astro`
   - Add rounded corners to testimonials wrapper
   - Add explicit font-size rules
   - Verify spacing values

2. `/src/components/RampHeader.astro`
   - Verify all sizing and spacing
   - Confirm colors and styling

3. Possibly create new file: `/src/styles/courses-precise.css`
   - Define exact font sizes
   - Define exact spacing
   - Define rounded corners

---

## Reference for Measurements

- Hero description: ~40-48px (based on visual comparison)
- Section headers: ~24px (OUR COURSES, TESTIMONIALS, FAQ)
- Course titles: ~18px
- Course descriptions: ~14px  
- Badges: ~11-12px
- Container max-width: ~1400px
- Card gap: ~40px horizontal, ~40px vertical
- Rounded corners: 40px

---

## Success Criteria for 1:1 Match

✅ Rounded corners on testimonials section (40px)
✅ All text sizes explicitly defined
✅ Header styling verified exact
✅ All spacing measured and confirmed
✅ All colors verified (#FFEA00, #FAFAFA, #0A0A0A)
✅ Visual comparison with reference shows pixel-perfect match
✅ No assumptions about sizes/spacing

