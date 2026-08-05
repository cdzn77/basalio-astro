// MM1 Font Weight Audit — Automated Playwright Script
// Runs headless across all 13 routes and collects distinct font-weight values
// for Instrument Sans, Azeret Mono, and Manrope
//
// Usage: npm run dev (in separate terminal), then:
//   node scripts/mm1-font-weight-audit.mjs

import { chromium } from 'playwright';
import fs from 'fs';

const ROUTES = [
  '/',
  '/blocks',
  '/contact',
  '/early-access',
  '/hacks',
  '/hero-lab',
  '/pricing',
  '/privacy',
  '/roadmap',
  '/support',
  '/terms',
  '/welcome',
  '/404'
];

const results = {};

async function auditRoute(browser, route) {
  const page = await browser.newPage();

  try {
    // Set realistic viewport (1280 desktop)
    await page.setViewportSize({ width: 1280, height: 900 });

    await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

    // Collect font-weight usage for each family
    const audit = await page.evaluate(() => {
      const families = {
        instrumentSans: new Map(),
        azeretMono: new Map(),
        manrope: new Map()
      };

      // Scan all elements
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        const fontFamily = style.fontFamily.toLowerCase();
        const fontWeight = style.fontWeight;

        // Only text-bearing, visible elements
        if (el.textContent && el.textContent.trim().length > 0 && el.offsetHeight > 0) {
          if (fontFamily.includes('instrument sans')) {
            if (!families.instrumentSans.has(fontWeight)) {
              families.instrumentSans.set(fontWeight, {
                example: el.textContent.substring(0, 50),
                tag: el.tagName,
                class: el.className || '(no class)'
              });
            }
          }
          if (fontFamily.includes('azeret mono')) {
            if (!families.azeretMono.has(fontWeight)) {
              families.azeretMono.set(fontWeight, {
                example: el.textContent.substring(0, 50),
                tag: el.tagName,
                class: el.className || '(no class)'
              });
            }
          }
          if (fontFamily.includes('manrope')) {
            if (!families.manrope.has(fontWeight)) {
              families.manrope.set(fontWeight, {
                example: el.textContent.substring(0, 50),
                tag: el.tagName,
                class: el.className || '(no class)'
              });
            }
          }
        }
      });

      // Convert maps to objects
      return {
        instrumentSans: Object.fromEntries(families.instrumentSans),
        azeretMono: Object.fromEntries(families.azeretMono),
        manrope: Object.fromEntries(families.manrope)
      };
    });

    results[route] = audit;
    console.log(`✓ ${route}`);

  } catch (error) {
    console.error(`✗ ${route}: ${error.message}`);
    results[route] = { error: error.message };
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch();

  console.log('MM1: Font Weight Audit\n');
  console.log(`Scanning ${ROUTES.length} routes...\n`);

  // Run audits sequentially to avoid browser resource contention
  for (const route of ROUTES) {
    await auditRoute(browser, route);
  }

  await browser.close();

  // Write results to file
  const reportPath = './mm1-font-weight-results.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log(`\n✅ Results written to ${reportPath}`);

  // Print summary
  console.log('\n=== SUMMARY ===\n');

  const allWeights = {
    instrumentSans: new Set(),
    azeretMono: new Set(),
    manrope: new Set()
  };

  Object.values(results).forEach(route => {
    if (route.error) return;
    Object.keys(route.instrumentSans || {}).forEach(w => allWeights.instrumentSans.add(w));
    Object.keys(route.azeretMono || {}).forEach(w => allWeights.azeretMono.add(w));
    Object.keys(route.manrope || {}).forEach(w => allWeights.manrope.add(w));
  });

  console.log('Instrument Sans weights found:', Array.from(allWeights.instrumentSans).sort());
  console.log('Azeret Mono weights found:', Array.from(allWeights.azeretMono).sort());
  console.log('Manrope weights found:', Array.from(allWeights.manrope).sort());
}

main().catch(console.error);
