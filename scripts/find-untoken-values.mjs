import { execSync } from 'child_process';
import * as fs from 'fs';

// Read tokens.css and extract all token values
const tokensContent = fs.readFileSync('src/styles/tokens.css', 'utf8');
const tokenValues = new Set();
const lines = tokensContent.split('\n');
for (const line of lines) {
  const match = line.match(/--[a-z0-9-]+:\s*([^;]+);/);
  if (match) {
    const value = match[1].trim();
    if (!value.includes('var(')) {
      tokenValues.add(value);
    }
  }
}

console.log('=== UNTOKEN-ED VALUES (3+ occurrences) ===\n');

// Find all px values in src/ files
try {
  const output = execSync(`grep -roh '[0-9.]*px' src/ --include="*.astro" --include="*.css" | sort | uniq -c | sort -rn`, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore']
  });

  const lines = output.split('\n').filter(line => line.trim());
  const untokenedValues = [];

  for (const line of lines) {
    const match = line.trim().match(/(\d+)\s+([0-9.]*px)/);
    if (!match) continue;

    const count = parseInt(match[1]);
    const value = match[2];

    // Skip if this value is already tokenized
    if (tokenValues.has(value)) continue;

    // Include if 3+ occurrences
    if (count >= 3) {
      untokenedValues.push({ value, count });
    }
  }

  console.log('Value | Count');
  console.log('------|------');
  untokenedValues.forEach(v => {
    console.log(`${v.value.padEnd(10)} | ${v.count}`);
  });

  console.log('\n\nSample locations (first 3 per value):');
  for (const item of untokenedValues.slice(0, 15)) {
    console.log(`\n${item.value} (${item.count} times):`);
    try {
      const locs = execSync(`grep -rn "${item.value}" src/ --include="*.astro" --include="*.css" 2>/dev/null | head -3`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore']
      });
      locs.split('\n').filter(l => l.trim()).forEach(l => {
        console.log(`  ${l}`);
      });
    } catch (e) {
      // ignore
    }
  }
} catch (e) {
  console.error('Error:', e.message);
}

