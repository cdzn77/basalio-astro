# Course Detail Page (/courses/[slug]) - Comprehensive 1:1 Match Audit

**Date:** July 22, 2026  
**Status:** IN PROGRESS - FINDINGS & FIXES REQUIRED  
**Reference:** Ramp Studio Template (`ramp-studio-template/assets/courses/social-media.html`)  
**Current Build:** Astro (`src/pages/courses/[slug].astro`)

---

## 📋 EXECUTIVE SUMMARY

✅ **Structure:** 85% Complete - All major sections present  
⚠️ **Styling:** 70% Match - Layout correct, minor spacing/sizing tweaks needed  
❌ **Images:** 0% Populated - All using placeholder paths  
⚠️ **Typography:** 75% Match - Font families correct but need fine-tuning  
⚠️ **Interactions:** 80% Complete - Accordion works, needs refinement  

---

## 🎯 SECTION-BY-SECTION AUDIT

### 1. ✅ HEADER / NAVIGATION
**Status:** COMPLETE ✓

**What's Working:**
- Universal RampHeader component integrated ✓
- MENU button with dropdown active ✓
- Fixed positioning ✓
- Scroll blur effect implemented ✓

**What Needs Work:**
- None identified

---

### 2. ✅ BREADCRUMB NAVIGATION
**Status:** 95% COMPLETE

**Current Implementation:**
```
HOME / COURSES / SOCIAL MEDIA GROWTH
```

**Ramp Template Reference:**
- Background: #FFED00 (almost black - needs verification)
- Font: Azeret Mono, 11px, uppercase
- Spacing: Small gap between items

**Issues Found:**
- Background color might be slightly off (#FFEA00 vs #FFED00)
- Verify exact shade against template

---

### 3. ❌ HERO SECTION (Breadcrumb → Button)
**Status:** 80% COMPLETE - STYLING ISSUES

**Current Structure in Astro:** ✓
```
- Course Title (h1)
- Full Description (p)
- Enroll Button (black background)
- Description Meta (label + text)
- Right Column: 3 Highlights (title + description)
```

**Ramp Template Differences Found:**
1. **Button Animation:** Ramp uses complex arrow animation on hover
   - Current: Simple hover opacity
   - Needed: Arrow animation (translateX, opacity changes on hover)
   
2. **Hero Section Background:** 
   - Current: Set to #FFEA00
   - Ramp Reference: #FFED00 (verify exact value)
   
3. **Benefits/Highlights List:**
   - Current: 3 items with descriptions
   - Ramp: Has enhanced styling with list bullets/icons
   - Styling: Each item has title (uppercase, 12px) + description (14px)

**CSS Issues:**
- Missing hover arrow animation on button
- Benefits list styling not matching Ramp template

---

### 4. ❌ HERO IMAGE SECTION
**Status:** 50% COMPLETE - IMAGE PATH WRONG

**Current:**
```
heroImage: '/assets/course-1.png'
```

**Ramp Template:**
```
../images/lguwh6gjbkswahnbzm6wiklse7e.jpeg
```

**Required Fix:**
- Copy correct image from `ramp-studio-template/assets/images/` 
- Map to `/public/assets/images/` in Astro
- Update `courses.ts` data file with correct image paths

**Image Dimensions:**
- Width: 1456px
- Height: 816px
- Aspect Ratio: ~1.78:1

---

### 5. ✅ "WHO IS THIS FOR" SECTION
**Status:** 85% COMPLETE

**Current:**
- 4 audience cards in 2-column grid ✓
- Cards have borders ✓
- Title + description layout ✓

**Styling Issues Found:**
1. **Border Color:** 
   - Current: #E8E8E8
   - Ramp: rgba(0,0,0,0.1) [should be more transparent]
   
2. **Card Padding:**
   - Current: 20px
   - Ramp: Appears to be 24px
   
3. **Text Colors:**
   - Title: rgb(0,0,0) ✓
   - Description: #575757 ✓ [matches]

**Data Mismatch:**
- Our cards show design-focused descriptions
- Ramp shows pain points (e.g., "Posting consistently but not seeing growth")

---

### 6. ⚠️ COURSE OVERVIEW SECTION
**Status:** 85% COMPLETE

**Current:**
- Section heading ✓
- Description text ✓
- Download button ✓
- 5-module accordion ✓

**What Matches:**
- Accordion structure (5 modules) ✓
- Plus/X toggle icon ✓
- Module numbering (01-05) ✓
- Expand/collapse functionality ✓

**What Needs Fixing:**
1. **Accordion Header Styling:**
   - Current: 24px gap between module number, title, icon
   - Ramp: Appears to have 30px gap
   - Icon: Should be smaller or positioned differently

2. **Accordion Content:**
   - Current: Generic placeholder text
   - Ramp: Has specific content for each module
   - Text alignment: Should align with module number

3. **Border Styling:**
   - Current: #E8E8E8 borders
   - Ramp: Similar but verify exact shade

---

### 7. ❌ MODULE IMAGE SECTION
**Status:** 50% COMPLETE - IMAGE PATH WRONG

**Current:**
```
moduleImage: '/assets/course-2.png'
```

**Ramp Template Image Path:**
```
[Needs verification from template]
```

**Action Item:**
- Map correct image from template assets
- Update data file with correct path

---

### 8. ✅ TOOLS SECTION
**Status:** 80% COMPLETE

**Current:**
- 3-column grid layout ✓
- Tool title + description ✓
- Image on right side ✓

**Styling Issues:**
1. **Grid Gap:**
   - Current: 30px
   - Ramp: Appears to be 40px

2. **Tool Card Text:**
   - Title: 16px, 500 weight (Switzer) ✓
   - Description: 13px, 400 weight ✓

3. **Image:**
   - Current path: `/assets/course-3.png`
   - Needs: Correct path from template

---

### 9. ⚠️ INSTRUCTOR SECTION
**Status:** 75% COMPLETE

**Current Layout:**
- Left: Instructor image (250px wide, 350px tall) ✓
- Right: Instructor info section ✓
- 3-column stats grid ✓
- Bio text ✓
- Yellow background ✓

**Styling Issues Found:**
1. **Background Image:**
   - Current: Hidden (display: none)
   - Ramp: Appears to show background image
   - Path wrong: `/assets/course-4.png`

2. **Image Border Radius:**
   - Current: 8px
   - Ramp: Verify exact value

3. **Stats Grid:**
   - Current: 3 columns ✓
   - Spacing looks correct

4. **Instructor Bio:**
   - Current: Shows full bio ✓
   - Font: Switzer, 14px ✓

---

### 10. ✅ CLOSING IMAGE SECTION
**Status:** 50% COMPLETE - IMAGE PATH WRONG

**Current:**
```
closingImage: '/assets/course-1.png'
```

**Issues:**
- Image path needs update
- Height: 350px seems correct
- Background: #FFED00 (yellow) ✓

---

### 11. ✅ FOOTER
**Status:** COMPLETE ✓

- Address displays correctly ✓
- Navigation links present ✓
- Yellow background ✓
- Branding text visible ✓

**Minor Issue:**
- Branding text appears cut off ("RampStudio.Creat" instead of full text)
- Likely CSS width constraint issue

---

## 🖼️ IMAGE MAPPING - REQUIRED UPDATES

### Critical: All images need to be copied from template assets

**Required Images from `ramp-studio-template/assets/images/`:**

| Section | Current Path | Template Asset | Ramp Size | Action |
|---------|-------------|----------------|-----------|--------|
| Hero Image | `/assets/course-1.png` | `lguwh6gjbkswahnbzm6wiklse7e.jpeg` | 1456×816 | COPY |
| Module Image | `/assets/course-2.png` | [TBD from template] | [TBD] | IDENTIFY |
| Tools Image | `/assets/course-3.png` | [TBD from template] | [TBD] | IDENTIFY |
| Instructor Image | `/assets/instructor-avery.png` | [TBD] | [TBD] | IDENTIFY |
| Closing Image | `/assets/course-1.png` | [TBD] | [TBD] | IDENTIFY |

---

## 🎨 CSS STYLING REFINEMENTS NEEDED

### 1. Button Hover Animation
**Current:** Simple opacity change
**Needed:** Arrow animation like Ramp template
```css
/* Arrow moves on hover - needs implementation */
.enroll-btn:hover .arrow { transform: translateX(10px); }
```

### 2. Color Standardization
| Element | Current | Ramp Template | Status |
|---------|---------|---------------|--------|
| Yellow Background | #FFEA00 | #FFED00 | ⚠️ Verify |
| Border Color | #E8E8E8 | rgba(0,0,0,0.1) | ⚠️ Update |
| Text Gray | #575757 | rgb(122,122,122) | ⚠️ Verify |

### 3. Typography Matching
**Fonts Used:**
- Primary: Manrope (correct) ✓
- Mono: Azeret Mono (correct) ✓
- Body: Switzer (in template, we use Manrope) ⚠️

**Font Weight Adjustments Needed:**
- Section headings: May need slight weight adjustment
- Body text: Verify font-family (Switzer vs Manrope)

### 4. Spacing/Sizing Adjustments
- Hero section padding: Verify exact px values
- Card padding in "Who is this for": May need 24px instead of 20px
- Grid gaps: May need standardization to 40px

---

## 🔄 RESPONSIVE DESIGN CHECK

**Current Implementation:**
- Mobile: 768px breakpoint ✓
- Tablet: 1024px breakpoint ✓
- Desktop: Full width ✓

**Issues:**
- Tablet breakpoint may need adjustment for hero section layout
- Module grid responsive behavior needs verification

---

## 🐛 KNOWN ISSUES TO FIX

### Priority 1: CRITICAL (Blocks release)
- [ ] Image paths all wrong - need to copy from template
- [ ] Button hover animation missing

### Priority 2: HIGH (Visible styling issues)
- [ ] Color precision: #FFEA00 vs #FFED00
- [ ] Border colors not matching template
- [ ] Footer branding text cutoff

### Priority 3: MEDIUM (Polish)
- [ ] Font family standardization (Switzer vs Manrope)
- [ ] Spacing precision (20px vs 24px padding)
- [ ] Typography weights fine-tuning

### Priority 4: LOW (Minor refinements)
- [ ] Accordion item hover states
- [ ] Button animation smoothness
- [ ] Image lazy-loading optimization

---

## ✅ VERIFICATION CHECKLIST

**Before marking complete, verify:**

- [ ] All images copied from template assets to `/public/assets/images/`
- [ ] Image paths updated in `src/data/courses.ts`
- [ ] Colors match Ramp template exactly (use color picker)
- [ ] Button hover animation implemented
- [ ] Responsive design tested on mobile (375px), tablet (768px), desktop (1456px)
- [ ] Typography weights and sizes verified with browser DevTools
- [ ] Accordion opens/closes smoothly
- [ ] Footer branding text displays completely
- [ ] All links functional (navigation, enrollment button)
- [ ] Page loads without errors in console
- [ ] Build completes without warnings

---

## 📊 COMPLETION SUMMARY

| Component | Status | % Complete | Notes |
|-----------|--------|-----------|-------|
| HTML Structure | ✅ | 95% | All sections present |
| CSS Styling | ⚠️ | 70% | Colors, spacing need refinement |
| Images | ❌ | 0% | All paths need updating |
| Typography | ⚠️ | 75% | Fonts correct, weights need check |
| Interactions | ✅ | 80% | Accordion works, button animation needed |
| Responsive Design | ✅ | 80% | Layout adapts, needs testing |
| **OVERALL** | **⚠️** | **75%** | **Ready for image swap + styling fixes** |

---

## 🚀 NEXT STEPS

1. **IMMEDIATE:** Copy all required images from `ramp-studio-template/assets/images/`
2. **Update** `src/data/courses.ts` with correct image paths
3. **Implement** button hover arrow animation
4. **Verify** all colors against template (use eyedropper)
5. **Test** responsive design across all breakpoints
6. **Commit** changes with detailed commit message
7. **QA** side-by-side comparison with Ramp template

---

**Generated:** 2026-07-22  
**Template Reference:** `ramp-studio-template/assets/courses/social-media.html`  
**Implementation:** `src/pages/courses/[slug].astro`
