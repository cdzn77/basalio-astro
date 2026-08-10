#!/usr/bin/env node
/**
 * Heading hierarchy verification script
 * Asserts for each production route:
 * a) Exactly one h1
 * b) h1 is first in document order
 * c) No heading-level skips (h1 → h3 fails, h2 → h4 fails, etc.)
 */

import { chromium } from 'playwright';

const ROUTES = [
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
  '/welcome',
];

const LEVEL_ORDER = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };

(async () => {
  const browser = await chromium.launch();
  let allPassed = true;

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:4321${route}`;

    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      const headings = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
          tag: h.tagName.toLowerCase(),
          text: h.textContent?.slice(0, 60) || '',
        }));
      });

      const h1Count = headings.filter(h => h.tag === 'h1').length;

      // Assertion a: exactly one h1
      if (h1Count !== 1) {
        console.error(`❌ ${route}: Expected 1 h1, found ${h1Count}`);
        allPassed = false;
        await page.close();
        continue;
      }

      // Assertion b: h1 is first in document order
      if (headings[0]?.tag !== 'h1') {
        console.error(`❌ ${route}: h1 is not first heading (first is ${headings[0]?.tag})`);
        allPassed = false;
        await page.close();
        continue;
      }

      // Assertion c: no level skips
      let prevLevel = 0;
      let levelSkip = false;
      for (const h of headings) {
        const currentLevel = LEVEL_ORDER[h.tag];
        if (prevLevel > 0 && currentLevel > prevLevel + 1) {
          console.error(
            `❌ ${route}: Level skip detected (${headings[headings.indexOf(h) - 1]?.tag} → ${h.tag})`
          );
          levelSkip = true;
          break;
        }
        prevLevel = currentLevel;
      }

      if (levelSkip) {
        allPassed = false;
        await page.close();
        continue;
      }

      // All assertions passed
      console.log(`✅ ${route}: 1 h1, first in order, no level skips`);
    } catch (error) {
      console.error(`❌ ${route}: Navigation or assertion error: ${error.message}`);
      allPassed = false;
    }

    await page.close();
  }

  await browser.close();
  process.exit(allPassed ? 0 : 1);
})();
