# Tier 3: Courses Page - Required Fixes

**Audit Status:** INCOMPLETE - Requires rework to match reference 1:1

---

## Critical Issues Identified

### 1. ❌ ROUNDED BOTTOM CORNERS (CRITICAL)
**Current:** Last container (testimonials wrapper) does NOT have rounded bottom corners
**Reference:** Clear rounded corners (appears to be 40-50px radius) on white section over yellow footer
**Impact:** Visual mismatch with reference design
**Fix Required:** Add `border-radius: 0 0 40px 40px;` or similar to testimonials wrapper

### 2. ❌ MISSING NAVIGATION MENU STYLING
**Current:** Navigation exists but may not match reference exactly
**Reference:** Fixed header with "Ramp Studio." logo (left) and "MENU +" button (right) on yellow background
**Impact:** Header consistency check needed
**Fix Required:** Verify RampHeader styling matches reference (padding, font sizes, button styling)

### 3. ❌ MISSING EXPLICIT FONT SIZES
**Current:** Font sizes undefined or inconsistent with reference
**Reference Observations:**
- Hero description: ~40-48px, semibold/regular
- Course titles: ~18-20px, regular weight
- Course descriptions: ~14-16px, regular weight, gray text
- Course badges: ~11-12px, uppercase, semibold
- Load More button: ~16px, medium weight

**Impact:** Text hierarchy doesn't match reference
**Fix Required:** Define explicit font-size values for each element

### 4. ❌ COMPONENT LAYOUT ASSUMPTIONS
**Current:** Layout structure assumed, not verified pixel-perfect
**Reference Shows:**
- Hero: Left sidebar (200px) + main content flex (remaining)
- Course grid: 2-column with specific gap measurements
- Cards: Specific proportions and spacing

**Impact:** Layout may not match reference exactly
**Fix Required:** Audit spacing, gaps, proportions against reference image

### 5. ❌ BADGE STYLING NOT VERIFIED
**Current:** Badge styling exists but colors/sizing may not match
**Reference Shows:**
- Light gray background for badges
- Specific text color (appears to be dark gray)
- Padding and border-radius

**Impact:** Badge appearance may differ
**Fix Required:** Verify badge colors and sizing

---

## Files Affected

1. `/src/pages/courses.astro` - Main page file
   - Add border-radius to `.testimonials-rounded`
   - Add explicit font-size rules
   - Verify spacing/gaps

2. `/src/components/RampHeader.astro` - Navigation component
   - Verify styling matches reference exactly

---

## Implementation Checklist

### Phase 1: Critical Fixes
- [ ] Add rounded bottom corners to testimonials section
- [ ] Verify/update navigation styling
- [ ] Add explicit font-size definitions

### Phase 2: Layout Verification
- [ ] Measure hero section proportions against reference
- [ ] Verify course grid gaps (horizontal and vertical)
- [ ] Check card proportions
- [ ] Verify button styling

### Phase 3: Final Polish
- [ ] Badge styling verification
- [ ] Text color consistency
- [ ] Hover state verification
- [ ] Responsive design check

---

## Reference Image Analysis Needed

To achieve 1:1 match, need to:
1. Measure exact pixel dimensions from reference image
2. Identify exact font sizes and weights
3. Verify exact color values
4. Check spacing/gap measurements
5. Verify component proportions

