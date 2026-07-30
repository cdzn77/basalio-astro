# Baseline CSS Weight Report
**Captured:** 2026-07-29 22:23 UTC

## Per-Page CSS Weight (production build)

| Page | CSS Files | Total Size | Notes |
|------|-----------|------------|-------|
| / | 1 | 20 KB | Original homepage (index.astro) |
| /index-ramp-rebuild | 2 | 28 KB | Active Ramp template homepage |
| /modules | 2 | 15 KB | Modules listing page |
| /contact | 2 | 16 KB | Contact page |
| /pricing | 2 | 20 KB | Pricing page |
| /resources | 2 | 16 KB | Resources page |
| /roadmap | 1 | 5 KB | Roadmap page |
| /support | 1 | 7 KB | Support page |
| /privacy | 1 | 5 KB | Privacy page |
| /terms | 1 | 5 KB | Terms page |

**Total across all 10 pages: ~137 KB**

## Build timestamp
- Build completed: 2026-07-29 22:23:19
- Build time: 594ms
- Pages generated: 14 (includes /modules/[slug] dynamic routes)

## Observations
- Heavy pages (index-ramp-rebuild, modules, contact, pricing, resources): 15-28 KB
- Light pages (privacy, roadmap, support, terms): 5-7 KB
- Most pages embed 2 CSS files; simpler pages have 1

## Refactor goals
- Consolidate duplicated component CSS across pages
- Extract design tokens to single source of truth
- Measure reduction in page-weight after consolidation
- Target: reduce average per-page CSS by ~15-20% without reducing functionality
