#!/usr/bin/env node
/**
 * Heading hierarchy verification script
 * Asserts for each production route:
 * a) Exactly one h1
 * b) h1 is first in document order
 * c) No heading-level skips (h1 → h3 fails, h2 → h4 fails, etc.)
 */

import { chromium } from 'playwright';
import { HEADING_ROUTES, NOT_FOUND_PROBE } from './routes.js';

const ROUTES = HEADING_ROUTES;

const LEVEL_ORDER = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };

(async () => {
  const browser = await chromium.launch();
  let allPassed = true;

  // Reuse a single page across routes to avoid Playwright instability
  // when many pages are created in quick succession.
  const page = await browser.newPage();

  for (const route of ROUTES) {
    const url = `http://localhost:4321${route}`;
    const displayLabel = route === NOT_FOUND_PROBE ? '404 handler' : route;

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle' });

      // For 404 probe, verify HTTP 404 status
      if (route === NOT_FOUND_PROBE) {
        const status = response.status();
        if (status !== 404) {
          throw new Error(
            `404 handler probe returned HTTP ${status}, expected 404. Probe path may be wrong.`
          );
        }
      }

      const headings = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
          tag: h.tagName.toLowerCase(),
          text: h.textContent?.slice(0, 60) || '',
        }));
      });

      const h1Count = headings.filter(h => h.tag === 'h1').length;

      // Assertion a: exactly one h1
      if (h1Count !== 1) {
        console.error(`❌ ${displayLabel}: Expected 1 h1, found ${h1Count}`);
        allPassed = false;
        continue;
      }

      // Assertion b: h1 is first in document order
      if (headings[0]?.tag !== 'h1') {
        console.error(`❌ ${displayLabel}: h1 is not first heading (first is ${headings[0]?.tag})`);
        allPassed = false;
        continue;
      }

      // Assertion c: no level skips
      let prevLevel = 0;
      let levelSkip = false;
      for (const h of headings) {
        const currentLevel = LEVEL_ORDER[h.tag];
        if (prevLevel > 0 && currentLevel > prevLevel + 1) {
          console.error(
            `❌ ${displayLabel}: Level skip detected (${headings[headings.indexOf(h) - 1]?.tag} → ${h.tag})`
          );
          levelSkip = true;
          break;
        }
        prevLevel = currentLevel;
      }

      if (levelSkip) {
        allPassed = false;
        continue;
      }

      // All assertions passed
      console.log(`✅ ${displayLabel}: 1 h1, first in order, no level skips`);
    } catch (error) {
      console.error(`❌ ${displayLabel}: Navigation or assertion error: ${error.message}`);
      allPassed = false;
    }
  }

  await page.close();
  await browser.close();
  process.exit(allPassed ? 0 : 1);
})();
