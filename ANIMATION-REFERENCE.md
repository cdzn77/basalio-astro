# Basalio Ramp Studio Animation & Interaction Reference

**CRITICAL GLOBAL RULE**: This site has NO scroll-triggered reveal/entrance animations (fade-in-on-scroll, slide-up-on-scroll, IntersectionObserver reveal effects). Every section is fully visible (opacity:1, no transform) from initial page load. DO NOT add entrance animations unless explicitly requested.

---

## 1. Shared Button Component (`TwoPillButton.astro`)

**Location**: Used in 5+ places across the site (header CTA, courses View All, resources View All, retainer Contact Us, retainer Subscribe ×2)

**Structure**: Two fused pills (text pill + icon pill)
- Both pills: `background: var(--basalio-ink)`, `border-radius: 8px`
- Text pill: `padding: 12px 16px`, font styles per section
- Icon pill: `width: 40px`, `height: 44px`, flex centered
- No gap between pills (fused appearance)

**Hover Behavior**:
- Icon pill nudges in its pointing direction via `transform: translateX(4px)` (for right-pointing arrows)
- Transition: `ease-out`, duration `150-200ms`
- Text pill stays static

**Implementation Pattern**:
```astro
// Single reusable component
import TwoPillButton from '../components/TwoPillButton.astro';

<TwoPillButton 
  label="View All" 
  href="/courses" 
  uppercase={true}
/>
```

**Do NOT copy-paste** this markup six times across different sections. Extract to component first.

---

## 2. Our Courses Carousel

**Trigger**: Hover-based (mouseenter), not click

**Mechanism**:
- Invisible full-height hit-zones at left/right viewport edges (~15% width each)
- `opacity: 0`, `pointer-events: auto` by default
- One mouseenter = one discrete page jump (not continuous scroll)
- Transform transition: spring/ease curve, ~300-400ms
- Pages calculated: `Math.ceil(totalCards / cardsPerView)`

**Boundary Behavior**:
- Hit-zone at current edge: `pointer-events: none` + `cursor: default`
- Re-enable `pointer-events: auto` once pagination moves past that edge
- Prevents repeated clicks on the same boundary

**Dual Control**:
- Both hover-zones AND visible arrow buttons call the same `goToPage(pageIndex)` function
- Do not build two separate paging mechanisms
- Arrow buttons are visible in the design; hover-zones are invisible helpers

**State**:
- Current page index tracked in component state
- Carousel container: `transform: translateX(calc(-${currentPage * (cardWidth + gap)}px))`

---

## 3. Our Resources Accordion

**Trigger**: Click on icon button specifically (NOT whole row)
- Icon button: `.resource-icon-button`
- Do NOT assume whole-row click parity with FAQ

**Animation**:
- Height transitions open/closed via `max-height` or flex transition
- Duration: ~300ms, `ease-in-out`
- Icon: stays static "+", does NOT rotate

**State Management**:
- Independent per-row toggling (multi-open safe)
- Each row can be open or closed independently
- No `activeIndex` limit; assume user can open multiple resources simultaneously

**Styling**: Accordion uses plain white/neutral cards, NOT the black FAQ card background

---

## 4. FAQ Accordion

**Trigger**: Click on whole row (full-width hit target, `cursor: pointer`)

**Animation**:
- Height transitions open/closed
- Duration: ~300ms, `ease-in-out`
- Icon: stays static "+", does NOT rotate

**State Management**:
- Multi-open confirmed (open two items, both stay open simultaneously)
- True toggle confirmed (re-click an open item, it closes)
- No single-open restriction

**Styling**: Black card background (`.faq-card { background: rgb(0, 0, 0); }`) — unique to FAQ, do NOT apply to Resources

---

## 5. Footer Giant Text Row

**Status**: STATIC (no marquee, no scroll, no animation)

**Current State**: Four large heading elements ("Ramp", "Studio.", "Creative.", "Collective.")
- Font-size: 170px
- Letter-spacing: -8.5px
- `overflow: hidden` container is prep for potential future animation, but current build is static

**Verification**: Confirmed no movement despite clipped container and duplicated trailing word (which initially looked like loop-prep).

---

## 6. Footer Nav Links

**Status**: UNVERIFIED — using simple placeholder

**Markup Evidence**: Each link contains two stacked text copies (one visible, one `opacity: 0`), suggesting a hover-triggered text swap/slide effect.

**Current Implementation**: Simple opacity/color shift on hover
```css
.footer-link {
  transition: opacity 200ms ease;
}
.footer-link:hover {
  opacity: 0.6;
}
```

**TODO**: Verify live interaction. If dual-text animation exists, implement after confirmation.

---

## 7. Header Menu Button (Hamburger/Dropdown)

**Status**: UNVERIFIED — using basic placeholder

**Expected Behavior**: Click opens dropdown overlay with nav items (COURSES, SUBSCRIPTION, RESOURCES, ABOUT, CONTACT)

**Current Implementation**: Simple show/hide dropdown
```css
.dropdown {
  display: none;
}
.dropdown.open {
  display: block;
}
```

**TODO**: Verify animation style (slide, fade, overlay style, etc.) and implement after confirmation.

---

## 8. Footer Sticky Reveal (Curtain Effect)

**Status**: CONFIRMED — requires coordinated three-piece setup

### Piece 1: Footer Container (Sticky Anchor)
```css
.footer-wrapper {
  position: sticky;
  bottom: 0;
  z-index: 1;  /* Lower z-index than content above */
}
```
- Locks footer to viewport bottom once scroll reaches it
- Stays pinned as main content scrolls up over it

### Piece 2: Main Content Wrapper (Overlay)
```css
.main-content {
  position: relative;
  z-index: 2;  /* Higher z-index — sits ON TOP of footer */
}
```
- Wraps all content sections above the footer (including FAQ)
- z-index:2 makes this layer visually sit above the pinned footer

### Piece 3: Last Section Before Footer (Rounded Curtain Edge)
```css
.last-section-before-footer {
  border-radius: 0 0 40px 40px;  /* Bottom corners only */
}
```
- Currently: FAQ section
- Applies only to bottom-left and bottom-right corners
- As this section scrolls upward, its rounded edge becomes the visible "curtain" edge sliding up and revealing the footer

### Scroll Behavior
- **Scroll down**: Last section slides up → rounded corners slide up → footer gradually revealed beneath (curtain lifting effect)
- **Scroll up**: Rounded corners slide back down → footer gets covered again (curtain closing)
- Footer's top edge stays pinned to viewport bottom throughout

### Implementation Pattern
```astro
<div class="main-content">  {/* z-index: 2 */}
  <section class="hero">...</section>
  <section class="faq">  {/* border-radius: 0 0 40px 40px */}
    ...
  </section>
</div>

<footer class="footer-wrapper">  {/* position: sticky; bottom: 0; z-index: 1 */}
  ...
</footer>
```

### Verification Method
Do NOT verify by screenshot alone. Scroll the page and use `getBoundingClientRect()` to confirm:
- Footer's top edge `y` position stays constant near viewport bottom
- Last section above moves upward normally (not sticky)
- Rounded corners animate the visual reveal

---

## Animation Timing Reference

| Element | Trigger | Duration | Easing | Effect |
|---------|---------|----------|--------|--------|
| TwoPillButton icon | hover | 150-200ms | ease-out | translateX(4px) |
| Courses carousel | hover-zone enter | 300-400ms | spring/ease | page transform |
| Resources accordion | icon click | 300ms | ease-in-out | height transition |
| FAQ accordion | row click | 300ms | ease-in-out | height transition |
| Footer reveal | scroll | inherent | CSS sticky | z-index layering |

---

## General Notes

- **No IntersectionObserver**: Sections do not fade in on scroll. All animations are interaction-triggered (hover, click) or scroll-position-based (footer sticky reveal).
- **Shared Components**: Extract repeated patterns to single components (e.g., TwoPillButton, pagination logic).
- **State Management**: Each interaction type (accordion, carousel, dropdown) manages its own state independently.
- **CSS Custom Properties**: Use `var(--basalio-ink)`, `var(--basalio-paper)` for colors to support theming.

