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
