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

**Rationale:** Features are tactical (specific Basalio blocks supporting a role), descriptions are strategic (why the role matters). Descriptions are load-bearing copy and cannot be shortened. Desktop cards stay at full 4 features; mobile reduces to 3 to fit within viewport better while maintaining readability.
