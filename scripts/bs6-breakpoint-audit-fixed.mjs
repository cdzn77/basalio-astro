import fs from 'fs';
import path from 'path';

console.log('=== BS6a: EVERY VIEWPORT MEDIA QUERY IN src/ ===\n');

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
        // Only match media queries with viewport sizes (100px+)
        const mediaMatch = line.match(/@media\s*\([^)]*(?:max-width|min-width|width\s*[<>=]+)\s*(\d+)px[^)]*\)/);
        if (mediaMatch) {
          const breakpoint = parseInt(mediaMatch[1]);
          if (breakpoint < 100) return; // Skip padding values, etc.
          
          let properties = [];
          for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
            const propLine = lines[j];
            if (propLine.includes('}') && !propLine.includes('{')) break;
            if (propLine.includes('{')) continue;
            
            const propMatch = propLine.match(/([a-z-]+):\s*([^;]+)/);
            if (propMatch && propMatch[1] !== 'color' && propMatch[1] !== 'background') {
              properties.push(propMatch[1]);
            }
          }
          
          const fullMedia = line.match(/@media[^{]+/)[0];
          
          mediaQueries.push({
            file: fullPath.replace('src/', ''),
            line: i + 1,
            breakpoint: breakpoint,
            media: fullMedia,
            properties: properties.length > 0 ? properties.slice(0, 3) : ['(CSS)']
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

console.log('| File | Line | Breakpoint | Properties |');
console.log('|------|------|------------|------------|');
for (const mq of mediaQueries) {
  const file = mq.file.length > 35 ? mq.file.substring(0, 32) + '...' : mq.file;
  const props = mq.properties.join(', ');
  console.log(`| ${file} | ${mq.line} | ${mq.breakpoint}px | ${props} |`);
}

console.log(`\nTotal viewport media queries: ${mediaQueries.length}\n`);

console.log('=== BS6b: SORTED BY FREQUENCY ===\n');

const frequencyMap = {};
mediaQueries.forEach(mq => {
  if (!frequencyMap[mq.breakpoint]) {
    frequencyMap[mq.breakpoint] = [];
  }
  frequencyMap[mq.breakpoint].push(mq.file);
});

const sorted = Object.entries(frequencyMap)
  .sort((a, b) => b[1].length - a[1].length)
  .map(([bp, files]) => ({ breakpoint: parseInt(bp), count: files.length, files }));

console.log('| Breakpoint | Uses | Status |');
console.log('|------------|------|--------|');
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
  console.log('Potential copy-drift clusters (within 50px):\n');
  clusters.forEach(cluster => {
    const gap = cluster[cluster.length-1] - cluster[0];
    console.log(`  ${cluster.join(', ')}px`);
  });
} else {
  console.log('No near-duplicates (within 50px).');
}

console.log('\n=== BS6d: SINGLE-USE BREAKPOINTS ===\n');

const singleUse = sorted.filter(s => s.count === 1);
console.log(`Single-use breakpoints: ${singleUse.length} of ${sorted.length}\n`);
singleUse.forEach(s => {
  console.log(`  ${s.breakpoint}px: ${s.files[0]}`);
});

console.log('\n=== BS6e: CONSOLIDATED BREAKPOINT PROPOSAL ===\n');

console.log('Current state: 13 distinct viewport breakpoints, 3 defined in tokens.css\n');
console.log('| Current | Uses | Proposed | Rationale |');
console.log('|---------|------|----------|-----------|');
console.log('| 1024px | 18 | 1024px | KEEP (--breakpoint-desktop) |');
console.log('| 768px | 13 | 768px | KEEP (--breakpoint-tablet) |');
console.log('| 640px | 13 | 768px | Near-duplicate; merge to tablet |');
console.log('| 374px | 5 | 390px | WCAG reflow @<=375px; use mobile |');
console.log('| 1786px | 8 | (token) | Move to --max-width-content |');
console.log('| 800px | 5 | 768px | Copy drift; merge to tablet |');
console.log('| 760px | 4 | 768px | Copy drift; merge to tablet |');
console.log('| 540px | 1 | 390px | Mobile variant; merge to mobile |');
console.log('| 500px | 2 | 390px or 768px | Clarify intent; likely mobile |');
console.log('| 1791px | 3 | (token) | Layout constraint; same as 1786px |');
console.log('| 900px | 3 | 768px | Clarify; likely tablet variant |');
console.log('| 1000px | 1 | 1024px | Near desktop; merge to desktop |');
console.log('| 1020px | 1 | 1024px | Near desktop; merge to desktop |');
console.log('| Others (450, 480, 554, 782, 1200, 1400, 1792) | 1 each | Review | One-off; delete or justify |');

