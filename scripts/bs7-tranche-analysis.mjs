import fs from 'fs';
import path from 'path';

console.log('=== BS7a: ALL 13 USES OF 640px BREAKPOINT ===\n');

const allBreakpoints = {};

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
        // Match all max-width patterns
        const patterns = [
          { regex: /max-width:\s*(\d+)px/, type: 'max-width' },
          { regex: /width\s*<=\s*(\d+)px/, type: 'width <=' },
          { regex: /min-width:\s*(\d+)px/, type: 'min-width' }
        ];
        
        patterns.forEach(p => {
          const match = line.match(p.regex);
          if (match) {
            const value = parseInt(match[1]);
            if (value >= 300) { // Only collect meaningful breakpoints
              if (!allBreakpoints[value]) {
                allBreakpoints[value] = [];
              }
              
              // Get properties this changes
              let props = [];
              for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
                if (lines[j].includes('}')) break;
                const propMatch = lines[j].match(/([a-z-]+):\s*([^;]+)/);
                if (propMatch) props.push(propMatch[1]);
              }
              
              allBreakpoints[value].push({
                file: fullPath.replace('src/', ''),
                line: i + 1,
                type: p.type,
                properties: props.slice(0, 3)
              });
            }
          }
        });
      });
    }
  }
}

scanDir('src');

// Report 640px
const _640uses = allBreakpoints[640] || [];
console.log(`640px media queries: ${_640uses.length} uses\n`);
_640uses.forEach((use, i) => {
  console.log(`${i+1}. ${use.file}:${use.line}`);
  console.log(`   ${use.type} ${640}px → changes: ${use.properties.join(', ')}`);
});

console.log('\n\n=== BS7c: ALL 5 USES OF 374px BREAKPOINT ===\n');

const _374uses = allBreakpoints[374] || [];
console.log(`374px media queries: ${_374uses.length} uses\n`);
_374uses.forEach((use, i) => {
  console.log(`${i+1}. ${use.file}:${use.line}`);
  console.log(`   ${use.type} ${374}px → changes: ${use.properties.join(', ')}`);
});

console.log('\n\n=== BS7d: ALL 3 USES OF 900px BREAKPOINT ===\n');

const _900uses = allBreakpoints[900] || [];
console.log(`900px media queries: ${_900uses.length} uses\n`);
_900uses.forEach((use, i) => {
  console.log(`${i+1}. ${use.file}:${use.line}`);
  console.log(`   ${use.type} ${900}px → changes: ${use.properties.join(', ')}`);
});

console.log('\n\n=== TRANCHE A: SAFE TO CONSOLIDATE (No Layout Impact) ===\n');

const trancheA = Object.entries(allBreakpoints)
  .filter(([bp, uses]) => {
    const value = parseInt(bp);
    // Single-use or max-width constraints
    return uses.length <= 2 || [1786, 1791, 1792].includes(value);
  })
  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

console.log('Single-use and max-width breakpoints:\n');
trancheA.forEach(([bp, uses]) => {
  console.log(`${bp}px (${uses.length} uses):`);
  uses.forEach(use => {
    console.log(`  - ${use.file}:${use.line}`);
  });
});

console.log('\n\n=== TRANCHE B: BEHAVIOR CHANGE (Needs Review) ===\n');

const trancheB = [640, 374, 760, 800, 900];
console.log('High-frequency and adjacent breakpoints:\n');
trancheB.forEach(bp => {
  const uses = allBreakpoints[bp] || [];
  console.log(`${bp}px (${uses.length} uses):`);
  uses.forEach(use => {
    console.log(`  - ${use.file}:${use.line} → ${use.properties.join(', ')}`);
  });
});

