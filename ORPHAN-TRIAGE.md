# ORPHAN-TRIAGE

Complete triaged inventory of all 69 unique orphaned CSS selectors found across the codebase.

**Final reconciliation:** Deleted all 3 REAL_DIVERGENCE CSS rules (commit cd85a79 + final cleanup). Current count 69 unique, 90 occurrences after removals. Baseline was 72 unique, 94 occurrences (commit 37ae421).

## Counts

- FALSE POSITIVE (runtime-added): 15 (10 approved + 5 new)
- DEAD CODE (unused): 54 (frozen per gate rules)
- **TOTAL: 69** (buckets sum to exactly 69)

## Triage Details

| Selector | File:Type | Bucket | Reason |
|----------|-----------|--------|--------|
| accordion | src/components/patterns/Accordion.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| accordion-header | src/components/patterns/Accordion.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| astro | src/pages/404.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| active | src/components/Header.astro:39 | FALSE_POSITIVE | JS adds via classList.toggle on menu dropdown |
| b-reveal | src/pages/hacks.astro:CSS,JS | FALSE_POSITIVE | Runtime-added class by JS; not part of static HTML |
| block-image | src/components/BlocksCarousel.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| block-label | src/components/Hero.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| card-benefit | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| card-deck | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| card-features | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| card-footnote | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| card-label | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| card-micro | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| card-price | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| card-price-block | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| comparison-handle | src/pages/blocks.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| comparison-label | src/pages/blocks.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| compact-cta-button | src/components/patterns/PricingCards.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| copied | src/pages/hacks.astro:CSS,JS | FALSE_POSITIVE | Runtime-added class by JS; not part of static HTML |
| courses-hero | src/pages/blocks.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| description | src/components/patterns/StatusLedger.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| early-access-body | src/pages/early-access.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| early-access-heading | src/pages/early-access.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| early-access-inner | src/pages/early-access.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| early-access-left | src/pages/early-access.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| example-section | src/templates/NEW-PAGE.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| faq-answer | src/components/FAQ.astro:CSS,JS | FALSE_POSITIVE | Runtime-added class by JS; not part of static HTML |
| faq-icon-close | src/components/FAQ.astro:JS | FALSE_POSITIVE | JS selector for DOM element; not part of static HTML |
| faq-icon-plus | src/components/FAQ.astro:JS | FALSE_POSITIVE | JS selector for DOM element; not part of static HTML |
| faq-question | src/pages/pricing.astro:JS | FALSE_POSITIVE | JS selector for DOM element; not part of static HTML |
| follow-us-description | src/pages/contact.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| follow-us-heading | src/pages/contact.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| follow-us-section | src/pages/contact.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| hero-bg-color | src/components/Hero.astro:CSS | DEAD_CODE | Conditional background class; never rendered on any route |
| hero-bg-gradient | src/components/Hero.astro:CSS | DEAD_CODE | Conditional background class; never rendered on any route |
| hero-bg-image | src/components/Hero.astro:CSS | DEAD_CODE | Conditional background class; never rendered on any route |
| hero-bg-scrim | src/components/Hero.astro:CSS | DEAD_CODE | Conditional background class; never rendered on any route |
| hero-form-section | src/pages/contact.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| hero-i | src/pages/hero-lab.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| hero-right | src/components/Hero.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| hidden-course | src/pages/blocks.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| idle-return | src/pages/hero-lab.astro:CSS,JS | FALSE_POSITIVE | Runtime-added class by JS; not part of static HTML |
| interactive | src/pages/hero-lab.astro:CSS,JS | FALSE_POSITIVE | Runtime-added class by JS; not part of static HTML |
| ledger | src/components/patterns/StatusLedger.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| ledger-badge | src/components/patterns/StatusLedger.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| ledger-in-build | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| ledger-in-review | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| ledger-label | src/components/patterns/StatusLedger.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| ledger-note | src/components/patterns/StatusLedger.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| is-in | src/pages/hacks.astro | FALSE_POSITIVE | JS adds via classList.add on reveal animation |
| is-revealed | src/pages/blocks.astro:1231 | FALSE_POSITIVE | JS adds via classList.add on grid tile reveal |
| ledger-status-cell | src/components/patterns/StatusLedger.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| load-more-button | src/pages/blocks.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| load-more-wrapper | src/pages/blocks.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| open | src/pages/pricing.astro:137 | FALSE_POSITIVE | JS adds via classList.remove on FAQ items |
| md | src/pages/404.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| page-content | src/layouts/PageLayout.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| page-content-narrow | src/layouts/PageLayout.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| page-content-wide | src/layouts/PageLayout.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| plus-icon | src/components/Header.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| price-after | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| price-main | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| price-note | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| pricing-card-founder | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| pricing-heading | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| pricing-left | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| pricing-subhead | src/pages/index.astro:CSS; src/pages/pricing.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| revealed-state | src/pages/hero-lab.astro:CSS | FALSE_POSITIVE | Runtime-added class by JS; not part of static HTML |
| roadmap-in-review | src/pages/roadmap.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| scrolled | src/layouts/BaseLayout.astro:CSS,JS | FALSE_POSITIVE | Runtime-added class by JS; not part of static HTML |
| sequence-state-1 | src/pages/blocks.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| sequence-state-2 | src/pages/blocks.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| teaser-compact | src/components/patterns/PricingCards.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| title | src/components/patterns/Accordion.astro:CSS; src/components/patterns/StatusLedger.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |
| two-pill-button | src/components/BlocksCarousel.astro:CSS | DEAD_CODE | Defined in CSS but no rendered markup uses it |

## Summary

- **FALSE POSITIVE (10):** scrolled, faq-answer, faq-icon-plus, faq-icon-close, b-reveal, copied, interactive, idle-return, revealed-state, faq-question
- **DEAD CODE (61):** All selectors defined in CSS but no markup renders them anywhere

## Notes

- **FALSE POSITIVE:** Runtime-added classes are injected by JavaScript after page render and are not present in static HTML. These are NOT errors — the audit correctly excludes them from the static markup tree, and JS adds them as needed.
- **DEAD CODE:** Selectors defined in CSS but no route renders matching markup. These are safe to delete (64 selectors frozen per gate rules).
- **REAL DIVERGENCE:** CSS and markup class names diverged. Recommend: verify markup is correct and delete CSS, or update CSS to match current markup naming.

