// Unified route list derived from src/pages
// Excludes: hero-lab (internal/noindex), welcome (internal/noindex)
export const PRODUCTION_ROUTES = [
  '/',
  '/blocks',
  '/contact',
  '/early-access',
  '/hacks',
  '/pricing',
  '/privacy',
  '/roadmap',
  '/support',
  '/terms'
];

// All routes tested by overflow verification (includes internal)
export const ALL_ROUTES = [
  '/',
  '/blocks',
  '/contact',
  '/early-access',
  '/hacks',
  '/hero-lab',       // internal, noindex
  '/pricing',
  '/privacy',
  '/roadmap',
  '/support',
  '/terms',
  '/welcome',        // internal, noindex
  '/404'
];
