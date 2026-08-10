import fs from 'fs';
import path from 'path';

console.log('=== BS6a: EVERY MEDIA QUERY IN src/ ===\n');

const mediaQueries = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (['.astro', '.css'].some(ext => entry.name.endsWith(ext))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      
      lines.forEach((line, i) => {
        const mediaMatch = line.match(/@media\s*\([^)]*(?:max-width|min-width|width)[^)]*\s*(\d+)px/);
        if (mediaMatch) {
          const breakpoint = parseInt(mediaMatch[1]);
          
          let properties = [];
          for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
            const propLine = lines[j];
            if (propLine.includes('{')) continue;
            if (propLine.includes('}')) break;
            
            const propMatch = propLine.match(/([a-z-]+):\s*([^;]+)/);
            if (propMatch) {
              properties.push(propMatch[1]);
            }
          }
          
          const fullMedia = line.match(/@media[^{]+/)[0];
          
          mediaQueries.push({
            file: fullPath.replace('src/', ''),
            line: i + 1,
            breakpoint: breakpoint,
            media: fullMedia,
            properties: properties.length > 0 ? properties : ['(CSS rule follows)']
          });
        }
      });
    }
  }
}

scanDir('src');

mediaQueries.sort((a, b) => {
  if (a.file !== b.file) return a.file.localeCompare(b.file);
  return a.line - b.line;
});

console.log('| File | Line | Breakpoint | Properties Changed |');
console.log('|------|------|------------|-------------------|');
for (const mq of mediaQueries) {
  const props = mq.properties.slice(0, 3).join(', ');
  const file = mq.file.length > 30 ? mq.file.substring(0, 27) + '...' : mq.file;
  console.log(`| ${file} | ${mq.line} | ${mq.breakpoint}px | ${props} |`);
}

console.log(`\nTotal media queries: ${mediaQueries.length}\n`);

console.log('=== BS6b: SORTED BY FREQUENCY ===\n');

const frequencyMap = {};
mediaQueries.forEach(mq => {
  if (!frequencyMap[mq.breakpoint]) {
    frequencyMap[mq.breakpoint] = 0;
  }
  frequencyMap[mq.breakpoint]++;
});

const sorted = Object.entries(frequencyMap)
  .sort((a, b) => b[1] - a[1])
  .map(([bp, count]) => ({ breakpoint: parseInt(bp), count }));

console.log('| Breakpoint | Count | Status |');
console.log('|------------|-------|--------|');
for (const item of sorted) {
  const status = [390, 768, 1024].includes(item.breakpoint) ? 'IN TOKENS' : 'ORPHAN';
  console.log(`| ${item.breakpoint}px | ${item.count} | ${status} |`);
}

console.log('\n=== BS6c: NEAR-DUPLICATES (within 50px) ===\n');

const bps = sorted.map(s => s.breakpoint).sort((a, b) => a - b);
const clusters = [];

for (let i = 0; i < bps.length; i++) {
  const cluster = [bps[i]];
  for (let j = i + 1; j < bps.length && bps[j] - bps[i] <= 50; j++) {
    cluster.push(bps[j]);
  }
  if (cluster.length > 1) {
    clusters.push(cluster);
  }
}

if (clusters.length > 0) {
  console.log('Potential copy-drift clusters:\n');
  clusters.forEach(cluster => {
    const gap = cluster[cluster.length-1] - cluster[0];
    console.log(`  ${cluster.join(', ')}px (gap: ${gap}px)`);
  });
} else {
  console.log('No near-duplicates found.');
}

console.log('\n=== BS6d: SINGLE-USE BREAKPOINTS ===\n');

const singleUse = sorted.filter(s => s.count === 1);
console.log(`Single-use breakpoints: ${singleUse.length} of ${sorted.length}\n`);
singleUse.forEach(s => {
  console.log(`  ${s.breakpoint}px`);
});

console.log('\n=== BS6e: PROPOSED CONSOLIDATED SET ===\n');
console.log('Desktop: 1024px (18 uses) — KEEP');
console.log('Tablet: 768px (13 uses) — KEEP');
console.log('Mobile: 390px (currently 0 uses, defined but orphaned)');
console.log('  └─ Consolidate 374, 375?, 450, 480, 500, 540, 554, 640, 760, 782, 800 → 390px');
console.log('Layout max-width: Separate from breakpoints (1786, 1791, 1792)');
console.log('\nMapping table for 25 values → 3 canonical breakpoints:');
console.log('');
console.log('| Current | Uses | Maps To | Rationale |');
console.log('|---------|------|---------|-----------|');
console.log('| 1024px | 18 | 1024px | KEEP (desktop standard) |');
console.log('| 768px | 13 | 768px | KEEP (tablet standard) |');
console.log('| 640px | 13 | 768px | Near-duplicate; merge tablet |');
console.log('| 374px | 5 | 390px | WCAG reflow; merge mobile |');
console.log('| 1786px | 8 | (layout) | Move to --max-width token |');
console.log('| 800px | 5 | 768px | Copy drift; merge tablet |');
console.log('| 760px | 4 | 768px | Copy drift; merge tablet |');
console.log('| 24px, 48px, 280px, 300px, 365px, 450px, 480px, 500px, 540px, 554px, 782px, 900px, 1000px, 1020px, 1200px, 1400px, 1791px, 1792px | 1-3 each | Delete or 390/768/1024 | Orphans; one-off or deliberate (justify each) |');

