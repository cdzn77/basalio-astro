# Divergence Log — Technical Findings

## Button Structure & Flex Layout Behavior

**Observation (Aug 5, 2026):**
The `.btn-wrapper` (`display: inline-flex`) contains two fixed-size flex children:
1. `.btn-text` (~250px, contains label with padding 12px each side)
2. `.btn-arrow-container` (44px, fixed width)

**Pattern:** When button is nested in a flex parent (e.g., `.header-split-left`), the button.scrollWidth grows to fill available space:
- @375px: 295px (text 250px + arrow 44px = 294px, +1px unexplained)
- @390px: 310px (same children, +16px extra)
- @414px: 334px (same children, +40px extra)

**Root Cause:** Likely parent flex container (`flex: 1 1 100%` on `.header-split-left` at mobile) forcing the button to stretch beyond its intrinsic size. The growth scales with available viewport space, suggesting parent-driven flex expansion, not child sizing changes.

**Key Finding:** Padding on `.btn-text` does NOT proportionally shrink the button. Button width is controlled by:
1. Label text length (constant ~250px for given font/letter-spacing)
2. Arrow width (fixed 44px)
3. Parent flex container constraints (dynamic at mobile)

**Implication for Future Fixes:**
- To reduce button width, shorten label text or reduce letter-spacing (affects text scrollWidth)
- Reducing padding on `.btn-text` only affects internal text layout, not overall button width
- Media queries on `.btn-wrapper` width, max-width, or flex properties would be the tool for constraining at specific breakpoints

---

## Measurement Script Correction (GG1)

**Bug:** Initial verify script hardcoded `availableWidth: 335px` across all three viewports (375, 390, 414).

**Fix:** Re-measure container width (`pricingInner.offsetWidth`) at each viewport instead of calculating from a fixed padding value.

**Result:** Correct headroom calculations:
- @375px: 80px headroom ✅
- @390px: 80px headroom ✅
- @414px: 80px headroom ✅

All exceed 20px requirement.

---

## WhoItsFor Feature Count — Deliberate Desktop/Mobile Difference (Aug 6, 2026)

**Decision:** Reduce testimonial feature list from 4 to 3 items on mobile (≤640px), keep 4 on desktop.

**Why:** Card height analysis at 375px viewport revealed tallest card at 547px (67% of 812px viewport). Features consume 168px of the card's height. Removing one feature per card saves ~44px, bringing max height to 503px (62% of viewport).

**Content Impact:**
- Cards 1 & 3 (Portfolio Designers, Art Directors) have 4 features → reduce to 3 (hide 4th feature)
- Cards 2 & 4 (Videographers, Studios) have 2–3 features already → no change
- All cards converge to uniform 503px at mobile

**Implementation:**
- File: `src/components/WhoItsFor.astro`
- CSS rule at mobile breakpoint (max-width: 640px):
  ```css
  .carousel-track-v2 > .testimonial-card-v2:nth-child(1) .testimonial-feature-v2:nth-child(4),
  .carousel-track-v2 > .testimonial-card-v2:nth-child(3) .testimonial-feature-v2:nth-child(4) {
    display: none;
  }
  ```

**Result:** WhoItsFor mobile card height 503px (62% of 812px viewport), measured at 375px.

**Ramp benchmark:** Attempted twice with automated approaches; both failed due to Ramp's unconventional DOM structure. No comparison figure obtained.

**Rationale:** Features are tactical (specific Basalio blocks supporting a role), descriptions are strategic (why the role matters). Descriptions are load-bearing copy and cannot be shortened. Desktop cards stay at full 4 features; mobile reduces to 3 to fit within viewport better while maintaining readability.

---

## WCAG 1.4.10 Reflow at 320px CSS px — Deliberate Viewport Degradations (Aug 6, 2026)

**Context:** WCAG 1.4.10 compliance testing at 320px CSS px (equivalent to 400% zoom on 1280px viewport) revealed two overflow issues:

1. **WhoItsFor and BlocksCarousel carousel peek**: At 375px+, carousel viewports are 335px wide with 280px cards and 41px peek-ahead. At 320px, text wrapping increases card height to 540px (WhoItsFor). Peek is unnecessary affordance at this width.

2. **Hero heading overflow**: At 320px, the hero heading renders at 48px (from `clamp(48px, 8vw, 96px)`), making the accent-word "interactions," 289px wide, extending 9px beyond the 320px viewport.

**Decision:** Implement deliberate degradations at 320px that maintain full functionality while respecting reflow constraints:

**Changes Implemented:**

1. **Carousel container shrinking (≤374px)**
   - File: `src/components/BlocksCarousel.astro` and `src/components/WhoItsFor.astro`
   - New media query: `@media (max-width: 374px)`
   - Container width: 335px → 280px
   - Carousel viewport width: 335px → 280px
   - Effect: No peek below 375px; cards still fully visible, paging controls functional
   - Carousel height and card dimensions unchanged (280px width, 503px height for WhoItsFor, 290px max for BlocksCarousel)

2. **Hero heading font-size reduction (≤320px via clamp)**
   - File: `src/styles/global.css`
   - Updated clamp: `clamp(48px, 8vw, 96px)` → `clamp(40px, 8vw, 96px)`
   - Effect: At 320px, heading renders at 40px instead of 48px; accent-word "interactions," now 241px wide (0px overflow)
   - Scaling is smooth across all viewports; 40px is still a substantial hero heading

**Rationale:** 320px CSS px is an extreme reflow scenario (400% zoom). Carousel peek and maximum hero size are secondary affordances that don't affect core functionality. Degradations preserve:
- Full carousel paging (arrows and zones still functional)
- Readable hero heading at scaled-down font
- No content reordering, truncation, or loss of meaning
- Smooth scaling via clamp() down to 320px minimum

**Impact:** Verify-section.js harness now reports 91/91 pass across 13 routes × 7 viewports (including 320px).

**Permanent Change:** 320px CSS px viewport is now a permanent fixture in the overflow verification harness (scripts/verify-section.js) to prevent regression on WCAG 1.4.10 compliance.

---

## data-surface Attribute Misuse — Principle Violation (Aug 6, 2026)

**Incident:** Commit 57771d7 added `data-surface="ink"` to 9 /blocks section elements based on *desired observer behavior* rather than *actual background colours*.

**Symptom:** Header wordmark rendered cream-on-light-gray (#FAFAFA) and became invisible when scrolling through /blocks sections.

**Root Cause:** All 9 block-detail-section elements are labelled `data-surface="ink"` but their `.demo-container` child has `background: var(--surface-alt)` = `#FAFAFA` (light gray, not dark ink).

**Why It Happened:** The developer intended to use data-surface as a switch to trigger observer state changes, not as a truthful label for what the section's background actually is.

**The Principle:** `data-surface` describes what a section's background IS. It is not a control signal for making the observer fire. The observer reads the label to determine what colour the header should be; incorrect labels cause incorrect header rendering.

**Fix:** Changed all 9 block-detail-section elements from `data-surface="ink"` to `data-surface="paper"` (commit ad8fa16). Verified:
- Header wordmark stays dark throughout /blocks scroll
- All 13 routes: header colour matches background behind it
- 104/104 WCAG reflow checks pass
- Homepage regression check: ink mode on video hero, paper mode on rest ✓

**Audit Script Fix:** Previous audit (scripts/audit-data-surface.js) reported transparent elements as mismatches. Corrected to walk up DOM and check *effective* background (first non-transparent ancestor) before comparing against label (commit f59c950).

**Prevention:** data-surface correctness now part of standard verification checklist: confirm label matches *actual* background colour, not intended observer state.
