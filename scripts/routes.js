// Route lists with distinct scopes:
//
// PUBLIC_ROUTES (10): Indexable pages listed in sitemap.xml, not disallowed by robots.txt
export const PUBLIC_ROUTES = [
  '/',
  '/blocks/',
  '/contact/',
  '/early-access/',
  '/hacks/',
  '/pricing/',
  '/privacy/',
  '/roadmap/',
  '/support/',
  '/terms/'
];

// PRODUCTION_ROUTES (11): User-reachable pages in production (includes disallowed routes)
// All pages accessible to users, whether indexed or not
export const PRODUCTION_ROUTES = [
  '/',
  '/blocks/',
  '/contact/',
  '/early-access/',
  '/hacks/',
  '/pricing/',
  '/privacy/',
  '/roadmap/',
  '/support/',
  '/terms/',
  '/welcome/'        // disallowed by robots.txt but live and user-reachable
];

// HEADING_ROUTES (16): Pages requiring exactly 1 h1 for heading hierarchy verification
// Includes PRODUCTION_ROUTES + homepage demo routes + synthetic probe that tests the 404 error handler
export const HEADING_ROUTES = [
  ...PRODUCTION_ROUTES,
  '/homepage-v1/',         // demo: color-block manifesto (noindex)
  '/homepage-v2/',         // demo: cinematic block gallery (noindex)
  '/homepage-v3/',         // demo: studio product site (noindex)
  '/homepage-v4/',         // demo: editorial case study (noindex)
  '/__404-handler-probe/'  // synthetic probe: nonexistent path → 404 error handler
];

// ALL_ROUTES (17): All routes tested by overflow verification (includes internal test routes and homepage demo routes)
export const ALL_ROUTES = [
  '/',
  '/blocks/',
  '/contact/',
  '/early-access/',
  '/hacks/',
  '/hero-lab/',       // internal, noindex, test route
  '/homepage-v1/',    // demo: color-block manifesto (noindex)
  '/homepage-v2/',    // demo: cinematic block gallery (noindex)
  '/homepage-v3/',    // demo: studio product site (noindex)
  '/homepage-v4/',    // demo: editorial case study (noindex)
  '/pricing/',
  '/privacy/',
  '/roadmap/',
  '/support/',
  '/terms/',
  '/welcome/',        // disallowed but live
  '/__404-handler-probe/'  // probes 404 error page (nonexistent path)
];

// Probe path that triggers 404 handling (what users see on broken links)
export const NOT_FOUND_PROBE = '/__404-handler-probe/';
