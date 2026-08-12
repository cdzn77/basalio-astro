import { chromium } from 'playwright';
import { readdirSync, readFileSync } from 'fs';
import { join, extname } from 'path';

const PORT = process.env.PORT || 4321;
const ROUTES = [
  '/', '/blocks', '/contact', '/early-access', '/hacks', '/hero-lab',
  '/pricing', '/privacy', '/roadmap', '/support', '/terms', '/welcome'
];

// Selectors that are applied via JavaScript or are structural and should not be in markup
// Format: { pattern: regex, reason: 'explanation' }
const ALLOWLIST = [
  { pattern: /^:global\(/, reason: 'Global scope prefix' },
  { pattern: /::/, reason: 'Pseudo-element' },
  { pattern: /^\.is-/, reason: 'JS-applied state class' },
  { pattern: /^\.has-/, reason: 'JS-applied state class' },
  { pattern: /^\.open/, reason: 'JS-applied state class' },
  { pattern: /^\.active/, reason: 'JS-applied state class' },
  { pattern: /^\.visible/, reason: 'JS-applied state class' }
];

function isAllowed(selector) {
  return ALLOWLIST.some(entry => entry.pattern.test(selector));
}

function extractClassSelectors(styleContent) {
  const selectors = [];
  // Match .classname and variants like .classname:hover, .classname::before, etc.
  const classPattern = /\.([a-zA-Z0-9_-]+)(?:[:#\[\s]|::?[a-z-]+)?/g;
  let match;

  while ((match = classPattern.exec(styleContent)) !== null) {
    const fullSelector = match[0];
    const className = match[1];
    selectors.push({
      class: className,
      selector: fullSelector,
      line: styleContent.substring(0, match.index).split('\n').length
    });
  }

  return selectors;
}

function getStyleBlocks(astroContent) {
  const styleStart = astroContent.indexOf('<style');
  if (styleStart === -1) return [];

  const styleBlocks = [];
  let current = styleStart;

  while (current !== -1) {
    const blockStart = astroContent.indexOf('>', current) + 1;
    const blockEnd = astroContent.indexOf('</style>', blockStart);

    if (blockEnd === -1) break;

    styleBlocks.push({
      content: astroContent.substring(blockStart, blockEnd),
      startLine: astroContent.substring(0, blockStart).split('\n').length
    });

    current = astroContent.indexOf('<style', blockEnd);
  }

  return styleBlocks;
}

async function checkSelectorInPage(page, className) {
  try {
    const elements = await page.locator(`.${className}`).count();
    return elements > 0;
  } catch (e) {
    return false;
  }
}

function findAstroFiles(dir) {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.')) {
        files.push(...findAstroFiles(fullPath));
      }
    } else if (entry.isFile() && extname(entry.name) === '.astro') {
      files.push(fullPath);
    }
  }

  return files;
}

async function auditOrphanSelectors() {
  const astroFiles = findAstroFiles('src');
  const browser = await chromium.launch({ headless: true });
  const orphans = {};

  console.log('\n' + '═'.repeat(70));
  console.log('ORPHAN CLASS SELECTOR AUDIT');
  console.log('═'.repeat(70));
  console.log(`Scanning ${astroFiles.length} .astro files across ${ROUTES.length} routes...\n`);

  for (const filePath of astroFiles) {
    const content = readFileSync(filePath, 'utf8');
    const styleBlocks = getStyleBlocks(content);

    if (styleBlocks.length === 0) continue;

    const relPath = filePath.replace(process.cwd() + '/', '');
    orphans[relPath] = [];

    for (const block of styleBlocks) {
      const selectors = extractClassSelectors(block.content);
      const uniqueSelectors = [...new Set(selectors.map(s => s.class))];

      for (const className of uniqueSelectors) {
        if (isAllowed(`.${className}`)) continue;

        // Test across all routes
        let found = false;

        for (const route of ROUTES) {
          const page = await browser.newPage();
          try {
            await page.setViewportSize({ width: 1440, height: 667 });
            await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });

            if (await checkSelectorInPage(page, className)) {
              found = true;
              page.close();
              break;
            }
          } catch (e) {
            // Route might not exist, continue
          } finally {
            if (!page.isClosed()) page.close();
          }
        }

        if (!found) {
          orphans[relPath].push(className);
        }
      }
    }
  }

  await browser.close();

  // Report results
  console.log('ORPHAN SELECTORS (no matching elements across all routes):\n');

  let totalOrphans = 0;
  for (const [file, orphanList] of Object.entries(orphans)) {
    if (orphanList.length > 0) {
      totalOrphans += orphanList.length;
      console.log(`${file}`);
      for (const orphan of orphanList) {
        console.log(`  • .${orphan}`);
      }
      console.log();
    }
  }

  console.log('═'.repeat(70));
  console.log(`SUMMARY: ${totalOrphans} orphan selector(s) found`);
  console.log('═'.repeat(70) + '\n');

  process.exit(totalOrphans > 0 ? 1 : 0);
}

auditOrphanSelectors().catch(err => {
  console.error(err);
  process.exit(1);
});
