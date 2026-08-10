import { execSync } from 'child_process';
import * as fs from 'fs';

// Read tokens.css and extract all token names
const tokensContent = fs.readFileSync('src/styles/tokens.css', 'utf8');
const tokenMatches = tokensContent.match(/--[a-z0-9-]+(?=:)/g) || [];
const tokens = [...new Set(tokenMatches)].sort();

console.log('=== TOKEN USAGE AUDIT ===\n');
console.log('Grepping src/ for: var(--token-name)\n');
console.log('Token | Count');
console.log('------|------');

const results = [];
for (const token of tokens) {
  try {
    const output = execSync(`grep -r "var(${token})" src/ 2>/dev/null || true`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    });
    const count = output.split('\n').filter(line => line.trim()).length;
    results.push({ token, count });
  } catch (e) {
    results.push({ token, count: 0 });
  }
}

// Sort by count descending
results.sort((a, b) => b.count - a.count);

// Print with padding
const maxTokenLen = Math.max(...results.map(r => r.token.length));
results.forEach(r => {
  const tokenPadded = r.token.padEnd(maxTokenLen);
  console.log(`${tokenPadded} | ${r.count}`);
});

// Separate into categories
console.log('\n\n=== CATEGORIZED ===\n');

const used = results.filter(r => r.count > 0);
const orphan = results.filter(r => r.count === 0);

console.log('USED (count > 0):');
used.forEach(r => console.log(`  ${r.token}: ${r.count}`));

console.log('\nORPHAN (0 references):');
orphan.forEach(r => console.log(`  ${r.token}`));

// Check for aliased-but-unused (tokens defined in terms of other tokens)
console.log('\n\nALIASED TOKENS (defined as var() of another token):');
const aliasedMatches = tokensContent.match(/--[a-z0-9-]+:\s*var\(--[a-z0-9-]+\)/g) || [];
if (aliasedMatches.length === 0) {
  console.log('  (none found)');
} else {
  aliasedMatches.forEach(match => console.log(`  ${match}`));
}

