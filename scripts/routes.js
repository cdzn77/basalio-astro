// Route lists with distinct scopes:
//
// PUBLIC_ROUTES (10): Indexable pages listed in sitemap.xml, not disallowed by robots.txt
export const PUBLIC_ROUTES = [
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

// PRODUCTION_ROUTES (11): User-reachable pages in production (includes disallowed routes)
// Must have exactly 1 h1 for heading hierarchy verification
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
  '/terms',
  '/welcome'         // disallowed by robots.txt but live and user-reachable
];

// ALL_ROUTES (13): All routes tested by overflow verification (includes internal test routes)
export const ALL_ROUTES = [
  '/',
  '/blocks',
  '/contact',
  '/early-access',
  '/hacks',
  '/hero-lab',       // internal, noindex, test route
  '/pricing',
  '/privacy',
  '/roadmap',
  '/support',
  '/terms',
  '/welcome',        // disallowed but live
  '/404'             // error page, internal
];
