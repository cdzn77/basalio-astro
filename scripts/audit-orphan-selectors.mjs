import { chromium } from 'playwright';
import { readdirSync, readFileSync } from 'fs';
import { join, extname } from 'path';
import { ALL_ROUTES } from './routes.js';

const PORT = process.env.PORT || 4321;
const ROUTES = ALL_ROUTES;
const JSON_MODE = process.argv.includes('--json');

// Runtime-added class selectors: defined in JS, not in static HTML
// Format: { selector: 'class-name', source: 'file.astro:line(s)', reason: 'why JS adds this' }
const APPROVED_RUNTIME_CLASSES = [
  { selector: 'scrolled', source: 'src/layouts/BaseLayout.astro:150-160', reason: 'JS adds on scroll event for sticky header animation' },
  { selector: 'faq-answer', source: 'src/components/FAQ.astro:45-50', reason: 'JS toggles display of answer blocks on question click' },
  { selector: 'faq-icon-plus', source: 'src/components/FAQ.astro:32', reason: 'JS querySelector target for plus icon element' },
  { selector: 'faq-icon-close', source: 'src/components/FAQ.astro:33', reason: 'JS querySelector target for close icon element' },
  { selector: 'b-reveal', source: 'src/pages/hacks.astro:28', reason: 'JS toggles class on copy button for reveal animation' },
  { selector: 'copied', source: 'src/pages/hacks.astro:29', reason: 'JS toggles class on copy button for success state' },
  { selector: 'interactive', source: 'src/pages/hero-lab.astro:35-40', reason: 'JS adds on interactive element focus/interaction' },
  { selector: 'idle-return', source: 'src/pages/hero-lab.astro:41-45', reason: 'JS adds when element returns to idle state' },
  { selector: 'revealed-state', source: 'src/pages/hero-lab.astro:46', reason: 'JS adds when hidden content is revealed' },
  { selector: 'faq-question', source: 'src/pages/pricing.astro:82', reason: 'JS querySelector target for FAQ question elements' }
];

const ALLOWLIST = [
  { pattern: /^:global\(/, reason: 'Global scope prefix' },
  { pattern: /::/, reason: 'Pseudo-element' },
];

function isAllowed(selector) {
  // Check if selector is in APPROVED_RUNTIME_CLASSES
  if (APPROVED_RUNTIME_CLASSES.some(r => r.selector === selector)) {
    return true;
  }

  // Check allowlist patterns
  return ALLOWLIST.some(entry => entry.pattern.test(selector));
}

function extractClassSelectors(styleContent) {
  const selectors = [];
  const classPattern = /\.([a-zA-Z_][a-zA-Z0-9_-]*)(?:[:#\[\s]|::?[a-z-]+)?/g;
  let match;

  while ((match = classPattern.exec(styleContent)) !== null) {
    const className = match[1];
    selectors.push(className);
  }

  return [...new Set(selectors)];
}

function extractJSClassReferences(scriptContent) {
  const selectors = [];
  const patterns = [
    /querySelector(?:All)?\s*\(\s*['"](\.([a-zA-Z_][a-zA-Z0-9_-]*)['"]*)/g,
    /querySelector(?:All)?\s*\(\s*`(\.([a-zA-Z_][a-zA-Z0-9_-]*)`)/g,
    /classList\.(add|remove|toggle|contains)\s*\(\s*['"](([a-zA-Z_][a-zA-Z0-9_-]*))['"]/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(scriptContent)) !== null) {
      const fullClass = match[2] || match[3];
      if (fullClass) {
        selectors.push(fullClass);
      }
    }
  }

  return [...new Set(selectors)];
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

function getScriptBlocks(astroContent) {
  const scriptStart = astroContent.indexOf('<script');
  if (scriptStart === -1) return [];

  const scriptBlocks = [];
  let current = scriptStart;

  while (current !== -1) {
    const blockStart = astroContent.indexOf('>', current) + 1;
    const blockEnd = astroContent.indexOf('</script>', blockStart);

    if (blockEnd === -1) break;

    scriptBlocks.push({
      content: astroContent.substring(blockStart, blockEnd),
      startLine: astroContent.substring(0, blockStart).split('\n').length
    });

    current = astroContent.indexOf('<script', blockEnd);
  }

  return scriptBlocks;
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
  const scannedRoutes = [];
  const orphanList = [];

  try {
    if (!JSON_MODE) {
      console.log('\n' + '═'.repeat(70));
      console.log('ORPHAN CLASS SELECTOR AUDIT');
      console.log('═'.repeat(70));
      console.log(`Scanning ${astroFiles.length} .astro files across ${ROUTES.length} routes...`);
      console.log('Step 1: Loading all routes...\n');
    }

    const renderedClasses = new Set();
    const pages = [];

    for (let i = 0; i < ROUTES.length; i++) {
      const route = ROUTES[i];
      const page = await browser.newPage();
      pages.push(page);

      try {
        await page.setViewportSize({ width: 1440, height: 667 });
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
        scannedRoutes.push(route);

        const classes = await page.evaluate(() => {
          const allElements = document.querySelectorAll('*');
          const classSet = new Set();
          allElements.forEach(el => {
            if (el.className && typeof el.className === 'string') {
              el.className.split(/\s+/).forEach(cls => {
                if (cls.length > 0) classSet.add(cls);
              });
            }
          });
          return Array.from(classSet);
        });

        classes.forEach(cls => renderedClasses.add(cls));
        if (!JSON_MODE) console.log(`  ✓ ${route}`);
      } catch (e) {
        if (!JSON_MODE) console.log(`  ✗ ${route} (${e.message})`);
      }
    }

    for (const page of pages) {
      try {
        await page.close();
      } catch (e) {}
    }

    if (!JSON_MODE) {
      console.log(`\nCoverage check: ${scannedRoutes.length}/${ROUTES.length} routes scanned`);
      if (scannedRoutes.length < ROUTES.length) {
        const unscanned = ROUTES.filter(r => !scannedRoutes.includes(r));
        console.error(`\n❌ COVERAGE INCOMPLETE: Unscanned routes: ${unscanned.join(', ')}`);
        console.error('Orphan audit will report false positives for CSS on unscanned routes.');
        await browser.close();
        process.exit(1);
      }
      console.log('✓ Full coverage verified\n');
      console.log('Step 2: Scanning CSS and JS selectors in ' + astroFiles.length + ' files...\n');
    }

    for (const filePath of astroFiles) {
      const content = readFileSync(filePath, 'utf8');
      const styleBlocks = getStyleBlocks(content);
      const scriptBlocks = getScriptBlocks(content);

      const relPath = filePath.replace(process.cwd() + '/', '');

      if (styleBlocks.length > 0) {
        for (const block of styleBlocks) {
          const selectors = extractClassSelectors(block.content);
          for (const className of selectors) {
            if (isAllowed(`.${className}`)) continue;
            if (!renderedClasses.has(className)) {
              orphanList.push({
                selector: className,
                file: relPath,
                type: 'CSS'
              });
            }
          }
        }
      }

      if (scriptBlocks.length > 0) {
        for (const block of scriptBlocks) {
          const jsRefs = extractJSClassReferences(block.content);
          for (const className of jsRefs) {
            if (isAllowed(`.${className}`)) continue;
            if (!renderedClasses.has(className)) {
              orphanList.push({
                selector: className,
                file: relPath,
                type: 'JS'
              });
            }
          }
        }
      }
    }

    if (JSON_MODE) {
      const uniqueSelectors = new Set(orphanList.map(o => o.selector)).size;
      console.log(JSON.stringify({
        routes_scanned: ROUTES.length,
        orphans: orphanList,
        unique_selectors: uniqueSelectors,
        total_occurrences: orphanList.length
      }, null, 2));
      await browser.close();
      process.exit(0);
    }

    console.log('\n' + '═'.repeat(70));
    console.log('ORPHAN SELECTORS (no matching elements across all routes):');
    console.log('═'.repeat(70) + '\n');

    const cssOrphans = {};
    const jsOrphans = {};

    for (const orphan of orphanList) {
      if (orphan.type === 'CSS') {
        if (!cssOrphans[orphan.file]) cssOrphans[orphan.file] = [];
        cssOrphans[orphan.file].push(orphan.selector);
      } else {
        if (!jsOrphans[orphan.file]) jsOrphans[orphan.file] = [];
        jsOrphans[orphan.file].push(orphan.selector);
      }
    }

    for (const [file, selectors] of Object.entries(cssOrphans)) {
      if (selectors.length > 0) {
        console.log(`${file} (CSS)`);
        [...new Set(selectors)].forEach(sel => console.log(`  • .${sel}`));
        console.log();
      }
    }

    for (const [file, selectors] of Object.entries(jsOrphans)) {
      if (selectors.length > 0) {
        console.log(`${file} (JS)`);
        [...new Set(selectors)].forEach(sel => console.log(`  • .${sel}`));
        console.log();
      }
    }

    const uniqueCount = new Set(orphanList.map(o => o.selector)).size;
    console.log('═'.repeat(70));
    console.log(`SUMMARY: ${uniqueCount} unique orphan selector(s) found (${orphanList.length} occurrences)`);
    console.log('═'.repeat(70) + '\n');

    process.exit(orphanList.length > 0 ? 1 : 0);
  } finally {
    try {
      await browser.close();
    } catch (e) {}
  }
}

auditOrphanSelectors().catch(err => {
  console.error('Audit failed:', err.message);
  process.exit(1);
});
