# Tier 3 Audit: Courses Page - Reference vs Current Implementation

**Date:** 2026-07-18  
**Status:** AUDIT FINDINGS - REQUIRES REWORK

---

## Visual Comparison Issues

### Issue 1: Navigation Header
**Reference Shows:**
- Fixed yellow header with "Ramp Studio." logo and "MENU +" button
- Should be persistent across page

**Current Implementation:**
- Header exists but needs verification it matches reference exactly
- Confirm sticky/fixed positioning

### Issue 2: Hero Section Layout
**Reference Shows:**
- Left sidebar: Small yellow dot + "OUR COURSES" label (uppercase, small caps)
- Right side: Main description text
- Proper spacing and alignment

**Current Issues to Verify:**
- [ ] Exact sizing and proportions of dot indicator
- [ ] "OUR COURSES" label font size and styling
- [ ] Description text font size (appears ~40-48px in reference)
- [ ] Alignment and spacing between sections

### Issue 3: Course Grid
**Reference Shows:**
- 2-column grid layout
- Yellow cards (#FFEA00) with black icons
- Icons are centered and properly sized
- Course title below icon
- Course description (smaller text)
- Badge (BEGINNER FRIENDLY or SELF PACED)

**Current Issues to Verify:**
- [ ] Card proportions and exact spacing
- [ ] Icon sizing and centering
- [ ] Text hierarchy (title vs description font sizes)
- [ ] Badge styling and positioning
- [ ] Gap between cards (horizontal and vertical)

### Issue 4: Load More Button
**Reference Shows:**
- Centered button below grid
- Light gray background
- Proper spacing from grid

**Current Issues to Verify:**
- [ ] Button styling (size, padding, colors)
- [ ] Centered alignment
- [ ] Spacing below course grid

### Issue 5: Testimonials Section
**Reference Shows:**
- "TESTIMONIALS" label (small caps, gray)
- "Learner Stories" heading
- Carousel with 3 visible testimonial cards
- Navigation arrows (< >)
- Cards show: image, quote, name, role, results

**Current Issues to Verify:**
- [ ] Section background color
- [ ] Heading styling
- [ ] Card layout and sizing
- [ ] Image proportions
- [ ] Text alignment and sizing
- [ ] Arrow button styling

### Issue 6: Footer Rounded Corners
**Reference Shows:**
- White/light background section with ROUNDED BOTTOM CORNERS (40px)
- Transitions smoothly over yellow footer

**Current Issues:**
- **CRITICAL:** Last container (testimonials wrapper) should have rounded bottom corners
- Should create visual effect of white content section sitting over yellow footer
- Gradient or smooth transition needed

### Issue 7: Overall Layout & Container Widths
**Reference Shows:**
- Proper container max-widths
- Consistent padding (appears to be ~40px)
- Content centered with proper margins

**Current Issues to Verify:**
- [ ] Max-width values
- [ ] Padding consistency
- [ ] Horizontal alignment

---

## Missing Elements / Styling Issues

### Text Sizing & Typography
- [ ] No explicit font sizes defined for specific elements
- [ ] Need to verify against reference: hero description, course titles, course descriptions, badge text
- [ ] Line heights and letter spacing

### Component Spacing
- [ ] Gap between courses (reference shows specific spacing)
- [ ] Padding within course cards
- [ ] Margin below course grid before Load More button
- [ ] Space between Load More button and testimonials section

### Color Specifications
- [ ] Verify exact yellow: #FFEA00
- [ ] Course card backgrounds
- [ ] Text colors for titles, descriptions, labels
- [ ] Badge background colors

### Missing Navigation Styling
- [ ] Header should be styled to match Ramp design exactly
- [ ] Menu button styling
- [ ] Fixed/sticky positioning behavior

---

## Action Items

### Priority 1 (Critical)
1. [ ] Add rounded bottom corners (40px) to testimonials section
2. [ ] Verify header navigation styling and positioning
3. [ ] Audit all font sizes against reference image

### Priority 2 (High)
1. [ ] Verify exact spacing/gaps in course grid
2. [ ] Confirm card proportions and layout
3. [ ] Check badge styling and positioning
4. [ ] Verify hero section proportions

### Priority 3 (Medium)
1. [ ] Color consistency audit
2. [ ] Button styling (Load More)
3. [ ] Text alignment and hierarchy
4. [ ] Container widths and padding

---

## Files to Review

1. `/src/pages/courses.astro` - Current implementation
2. Reference images: `/reference/courses.png`
3. Ramp template structure (need to find/download)

---

## Next Steps

1. Detailed pixel measurement from reference image
2. Compare actual HTML structure with reference
3. Identify all CSS differences
4. Create precise sizing/spacing audit
5. Implement 1:1 match fixes

