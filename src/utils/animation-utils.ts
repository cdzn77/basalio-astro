// Animation and interaction utility functions for Ramp rebuild

/**
 * Carousel pagination logic
 * Calculates page index and applies transform
 */
export function createCarouselPaginator(totalCards: number, cardsPerView: number, cardWidth: number, gap: number) {
  const pageCount = Math.ceil(totalCards / cardsPerView);
  let currentPage = 0;

  function goToPage(pageIndex: number) {
    if (pageIndex < 0 || pageIndex >= pageCount) return false;
    if (pageIndex === currentPage) return false;

    currentPage = pageIndex;
    const offset = currentPage * (cardWidth + gap);
    return offset;
  }

  function getNextPage() {
    return currentPage + 1 < pageCount ? currentPage + 1 : currentPage;
  }

  function getPrevPage() {
    return currentPage - 1 >= 0 ? currentPage - 1 : currentPage;
  }

  function getCurrentPage() {
    return currentPage;
  }

  function getTotalPages() {
    return pageCount;
  }

  function canGoNext() {
    return currentPage + 1 < pageCount;
  }

  function canGoPrev() {
    return currentPage - 1 >= 0;
  }

  return {
    goToPage,
    getNextPage,
    getPrevPage,
    getCurrentPage,
    getTotalPages,
    canGoNext,
    canGoPrev
  };
}

/**
 * Accordion state management
 * Tracks which accordion items are open
 */
export function createAccordionState() {
  const openItems = new Set<number>();

  function toggle(index: number) {
    if (openItems.has(index)) {
      openItems.delete(index);
      return false;
    } else {
      openItems.add(index);
      return true;
    }
  }

  function isOpen(index: number) {
    return openItems.has(index);
  }

  function open(index: number) {
    openItems.add(index);
  }

  function close(index: number) {
    openItems.delete(index);
  }

  function getOpenItems() {
    return Array.from(openItems);
  }

  return {
    toggle,
    isOpen,
    open,
    close,
    getOpenItems
  };
}

/**
 * Height animation helper
 * Calculates and animates element height changes
 */
export function animateHeight(element: HTMLElement, targetHeight: number, duration: number = 300) {
  const startHeight = element.offsetHeight;
  const startTime = performance.now();

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);

    const newHeight = startHeight + (targetHeight - startHeight) * easeProgress;
    element.style.height = `${newHeight}px`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.style.height = `${targetHeight}px`;
    }
  }

  requestAnimationFrame(step);
}

/**
 * Boundary zone management for carousel
 * Enables/disables hover zones based on pagination position
 */
export function updateBoundaryZones(
  prevZone: HTMLElement | null,
  nextZone: HTMLElement | null,
  canGoPrev: boolean,
  canGoNext: boolean
) {
  if (prevZone) {
    if (canGoPrev) {
      prevZone.style.pointerEvents = 'auto';
      prevZone.style.cursor = 'pointer';
    } else {
      prevZone.style.pointerEvents = 'none';
      prevZone.style.cursor = 'default';
    }
  }

  if (nextZone) {
    if (canGoNext) {
      nextZone.style.pointerEvents = 'auto';
      nextZone.style.cursor = 'pointer';
    } else {
      nextZone.style.pointerEvents = 'none';
      nextZone.style.cursor = 'default';
    }
  }
}
