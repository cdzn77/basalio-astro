#!/usr/bin/env node
// Link audit: crawl built dist/ HTML and report broken internal links + anchors.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
}
walk(DIST);

const byRelative = new Map();
for (const file of files) {
  const rel = '/' + path.relative(DIST, file).replace(/index\.html$/, '');
  byRelative.set(rel, file);
}

function extractLinks(html) {
  const links = [];
  const anchorRe = /<a[^>]+href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = anchorRe.exec(html))) links.push(m[1]);
  return links;
}

function extractIds(html) {
  const ids = new Set();
  const idRe = /\sid\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = idRe.exec(html))) ids.add(m[1]);
  return ids;
}

const broken = [];
const external = new Set();

for (const file of files) {
  const pageRel = '/' + path.relative(DIST, file).replace(/index\.html$/, '');
  const html = fs.readFileSync(file, 'utf8');
  const ids = extractIds(html);
  const links = extractLinks(html);

  for (const href of links) {
    // mailto / tel
    if (/^(mailto|tel|sms):/.test(href)) continue;
    // external
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {
      external.add(href);
      continue;
    }

    const [targetPath, hash] = href.split('#');
    let resolvedRel;
    if (!targetPath) {
      // Same-page anchor
      resolvedRel = pageRel;
    } else if (targetPath.startsWith('/')) {
      resolvedRel = targetPath.endsWith('/') ? targetPath : targetPath + '/';
    } else {
      const base = path.dirname(pageRel);
      const joined = path.posix.normalize(path.posix.join(base, targetPath));
      resolvedRel = joined.endsWith('/') ? joined : joined + '/';
    }

    // Root
    if (resolvedRel === '/') resolvedRel = '/';

    const targetFile = byRelative.get(resolvedRel);
    if (!targetFile) {
      broken.push({ page: pageRel, href, reason: 'missing page' });
      continue;
    }

    if (hash) {
      const targetHtml = fs.readFileSync(targetFile, 'utf8');
      const targetIds = extractIds(targetHtml);
      if (!targetIds.has(hash)) {
        broken.push({ page: pageRel, href, reason: 'missing anchor' });
      }
    }
  }
}

console.log(`Audited ${files.length} HTML files, ${broken.length} broken internal link(s).`);
if (broken.length) {
  console.log('\nBroken links:');
  for (const b of broken) {
    console.log(`  ${b.page} -> ${b.href} (${b.reason})`);
  }
  process.exit(1);
} else {
  console.log('All internal links resolve.');
}

if (external.size) {
  console.log(`\n${external.size} external link(s) skipped (not audited):`);
  for (const url of [...external].sort()) console.log(`  ${url}`);
}
