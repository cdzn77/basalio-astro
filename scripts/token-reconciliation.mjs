import { execSync } from 'child_process';

console.log('=== DS2 TOKEN RECONCILIATION AUDIT ===\n');

// a) --gap-* vs --space-* 
console.log('a) GAP vs SPACE scales:\n');

const gapTokens = ['gap-8', 'gap-12', 'gap-16', 'gap-20', 'gap-24', 'gap-28', 'gap-30', 'gap-40'];
const spaceTokens = ['space-0', 'space-4', 'space-8', 'space-10', 'space-12', 'space-14', 'space-16', 'space-20', 'space-24', 'space-28', 'space-30', 'space-32', 'space-40', 'space-48', 'space-56', 'space-60', 'space-80'];

let gapRefs = 0, spaceRefs = 0;

for (const token of gapTokens) {
  try {
    const output = execSync(`grep -rn "\\-\\-${token}" src/ 2>/dev/null || true`, { encoding: 'utf8' });
    const lines = output.split('\n').filter(l => l.trim());
    gapRefs += lines.length;
    if (lines.length > 0) {
      console.log(`--${token}:`);
      lines.forEach(l => console.log(`  ${l}`));
    }
  } catch (e) {}
}

console.log('\nSPACE tokens (sample - full list follows):');
for (const token of spaceTokens.slice(0, 5)) {
  try {
    const output = execSync(`grep -rn "\\-\\-${token}" src/ 2>/dev/null || true`, { encoding: 'utf8' });
    const lines = output.split('\n').filter(l => l.trim());
    spaceRefs += lines.length;
  } catch (e) {}
}

console.log(`\n[Full SPACE output deferred - see parallel grep below]\n`);

