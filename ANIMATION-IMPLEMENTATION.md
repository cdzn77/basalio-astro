# Animation Implementation Guide for Ramp Rebuild

This document shows how to update each component to implement the animations defined in `ANIMATION-REFERENCE.md`.

---

## 1. Using TwoPillButton Component

**Before (copy-pasted across sections):**
```astro
<a href="./contact" class="view-all-link">
  <span class="view-all-text">CONTACT US</span>
  <span class="view-all-icon">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 2L12 8L6 14"></path>
    </svg>
  </span>
</a>
```

**After (using shared component):**
```astro
import TwoPillButton from '../components/TwoPillButton.astro';

<TwoPillButton label="Contact us" href="./contact" />
```

**Update locations:**
- [ ] RampHero.astro - header CTA
- [ ] RampCourses.astro - "View All" link
- [ ] RampResources.astro - "View All" link
- [ ] RampRetainer.astro - "Contact us" header + both "Subscribe" buttons

---

## 2. Courses Carousel Implementation

**Required markup structure:**
```astro
<div class="carousel-wrapper">
  <!-- Invisible left hover-zone -->
  <div class="carousel-zone carousel-zone-prev" aria-label="Previous page"></div>
  
  <!-- Carousel container -->
  <div class="carousel-container">
    <div class="carousel-track">
      {/* Cards here */}
    </div>
  </div>
  
  <!-- Invisible right hover-zone -->
  <div class="carousel-zone carousel-zone-next" aria-label="Next page"></div>
  
  <!-- Visible arrow buttons -->
  <button class="carousel-arrow carousel-arrow-prev">←</button>
  <button class="carousel-arrow carousel-arrow-next">→</button>
</div>
```

**CSS:**
```css
.carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-zone {
  position: absolute;
  top: 0;
  width: 15%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
}

.carousel-zone-prev {
  left: 0;
}

.carousel-zone-next {
  right: 0;
}

.carousel-zone:hover {
  background: rgba(0, 0, 0, 0.02);  /* subtle visual feedback only */
}

.carousel-track {
  display: flex;
  transition: transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1);  /* spring easing */
}
```

**Script:**
```astro
<script>
  import { createCarouselPaginator, updateBoundaryZones } from '../utils/animation-utils';

  const totalCards = document.querySelectorAll('.carousel-item').length;
  const cardsPerView = 3;  // adjust per layout
  const cardWidth = 300;   // adjust per design
  const gap = 20;

  const paginator = createCarouselPaginator(totalCards, cardsPerView, cardWidth, gap);
  const track = document.querySelector('.carousel-track') as HTMLElement;
  const prevZone = document.querySelector('.carousel-zone-prev') as HTMLElement;
  const nextZone = document.querySelector('.carousel-zone-next') as HTMLElement;
  const prevBtn = document.querySelector('.carousel-arrow-prev') as HTMLElement;
  const nextBtn = document.querySelector('.carousel-arrow-next') as HTMLElement;

  function applyPage() {
    const offset = paginator.goToPage(paginator.getCurrentPage());
    if (offset !== false) {
      track.style.transform = `translateX(-${offset}px)`;
    }
    updateBoundaryZones(prevZone, nextZone, paginator.canGoPrev(), paginator.canGoNext());
  }

  function goNext() {
    const nextPage = paginator.getNextPage();
    if (nextPage !== paginator.getCurrentPage()) {
      paginator.goToPage(nextPage);
      applyPage();
    }
  }

  function goPrev() {
    const prevPage = paginator.getPrevPage();
    if (prevPage !== paginator.getCurrentPage()) {
      paginator.goToPage(prevPage);
      applyPage();
    }
  }

  prevZone?.addEventListener('mouseenter', goPrev);
  nextZone?.addEventListener('mouseenter', goNext);
  prevBtn?.addEventListener('click', goPrev);
  nextBtn?.addEventListener('click', goNext);

  // Initialize boundary zones
  applyPage();
</script>
```

---

## 3. Resources Accordion Implementation

**Key change**: Click handler on ICON BUTTON only, not whole row.

**CSS:**
```css
.resource-icon-button {
  cursor: pointer;
  transition: opacity 200ms ease;
}

.resource-icon-button:hover {
  opacity: 0.8;
}

.resource-content {
  height: 0;
  overflow: hidden;
  transition: height 300ms ease-in-out;
}

.resource-item[data-open="true"] .resource-content {
  height: auto;  /* will be set by script */
}
```

**Script:**
```astro
<script>
  import { createAccordionState } from '../utils/animation-utils';

  const state = createAccordionState();

  document.querySelectorAll('.resource-icon-button').forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const item = button.closest('.resource-item') as HTMLElement;
      const content = item.querySelector('.resource-content') as HTMLElement;
      const inner = item.querySelector('.resource-content-inner') as HTMLElement;

      if (state.toggle(index)) {
        // Opening
        item.setAttribute('data-open', 'true');
        const height = inner.getBoundingClientRect().height;
        content.style.height = `${height}px`;
      } else {
        // Closing
        item.setAttribute('data-open', 'false');
        content.style.height = '0px';
      }
    });
  });
</script>
```

---

## 4. FAQ Accordion Implementation

**Current implementation in RampFAQ.astro is correct**. Verify it has:
- ✅ Whole row click target with `cursor: pointer`
- ✅ Height animation via CSS or dynamic style
- ✅ Multi-open independent state
- ✅ Black card background (unique to FAQ)
- ✅ Static "+" icon (no rotation)

No changes needed for FAQ.

---

## 5. Footer Sticky Reveal Implementation

**Update RampTemplateLayout.astro or page structure:**

```astro
<div class="main-content">  {/* z-index: 2 */}
  <RampHero ... />
  <RampWhatWeDo ... />
  <RampCourses ... />
  <RampResources ... />
  <RampRetainer ... />
  
  <!-- Last section before footer needs rounded bottom corners -->
  <RampFAQ class="faq-with-rounded-bottom" ... />
</div>

<footer class="footer-wrapper">
  <RampFooter ... />
</footer>
```

**CSS in layout or global styles:**
```css
.main-content {
  position: relative;
  z-index: 2;
  background: white;  /* ensures content sits above footer */
}

.faq-with-rounded-bottom {
  border-radius: 0 0 40px 40px;  /* rounded bottom-left and bottom-right only */
}

.footer-wrapper {
  position: sticky;
  bottom: 0;
  z-index: 1;  /* lower than main-content */
}
```

**Verification script:**
```javascript
// Run this in console while scrolling to verify the effect
setInterval(() => {
  const footer = document.querySelector('.footer-wrapper');
  const rect = footer.getBoundingClientRect();
  console.log('Footer top edge Y:', rect.top, 'Should stay near:', window.innerHeight - footer.offsetHeight);
}, 100);
```

---

## 6. Footer Nav Links (UNVERIFIED)

**Current**: Simple opacity shift on hover

**Placeholder implementation**:
```css
.footer-link {
  transition: opacity 200ms ease;
}

.footer-link:hover {
  opacity: 0.6;
}
```

**TODO**: After verifying live interaction, replace with dual-text animation if needed.

---

## 7. Header Menu Button (UNVERIFIED)

**Current**: Basic show/hide dropdown

**Placeholder implementation**:
```astro
<button class="menu-button" aria-label="Menu">☰</button>

<nav class="menu-dropdown" aria-hidden="true">
  <a href="/courses">COURSES</a>
  <a href="/subscription">SUBSCRIPTION</a>
  <a href="/resources">RESOURCES</a>
  <a href="/about">ABOUT</a>
  <a href="/contact">CONTACT</a>
</nav>
```

```css
.menu-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 0;
  min-width: 200px;
}

.menu-dropdown.open {
  display: block;
}

.menu-dropdown a {
  display: block;
  padding: 12px 20px;
  color: var(--basalio-ink);
  text-decoration: none;
  font-size: 14px;
}

.menu-dropdown a:hover {
  background: #f5f5f5;
}
```

```javascript
const menuBtn = document.querySelector('.menu-button');
const dropdown = document.querySelector('.menu-dropdown');

menuBtn?.addEventListener('click', () => {
  dropdown?.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', dropdown?.classList.contains('open') ? 'true' : 'false');
});

// Close on click outside
document.addEventListener('click', (e) => {
  if (!menuBtn?.contains(e.target as Node) && !dropdown?.contains(e.target as Node)) {
    dropdown?.classList.remove('open');
  }
});
```

**TODO**: After verifying live animation, replace with slide/fade effect as needed.

---

## Implementation Checklist

- [ ] Create TwoPillButton.astro component
- [ ] Update all usages to import TwoPillButton
- [ ] Implement Courses carousel with hover-zones + arrows
- [ ] Implement Resources accordion with icon-button click
- [ ] Verify FAQ accordion (should already be correct)
- [ ] Implement footer sticky reveal (z-index layering + border-radius)
- [ ] Add rounded corners to last content section before footer
- [ ] Test sticky footer behavior via getBoundingClientRect()
- [ ] [ ] VERIFY: Footer nav links hover effect
- [ ] [ ] VERIFY: Header menu button animation
- [ ] Remove all IntersectionObserver-based entrance animations (should be none)
- [ ] Test all interactions at different viewport sizes

