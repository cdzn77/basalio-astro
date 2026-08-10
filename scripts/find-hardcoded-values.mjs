import { execSync } from 'child_process';
import * as fs from 'fs';

console.log('=== HARDCODED VALUES MATCHING TOKENS ===\n');

// Extract all token values from tokens.css
const tokensContent = fs.readFileSync('src/styles/tokens.css', 'utf8');

// Build map of token name -> value
const tokenMap = {};
const lines = tokensContent.split('\n');
for (const line of lines) {
  const match = line.match(/--([a-z0-9-]+):\s*([^;]+);/);
  if (match) {
    tokenMap[match[1]] = match[2].trim();
  }
}

// Values to search for (spacing, radius, font sizes in px)
const valuesToSearch = [
  // Spacing values
  '4px', '8px', '10px', '12px', '14px', '16px', '20px', '24px', '28px', '30px', '32px', '40px', '48px', '56px', '60px', '80px',
  // Radius values
  '2px', '3px', '6px', '8px', '12px', '15px', '18px', '22px', '999px',
  // Font sizes
  '10.5px', '11px', '12px', '13px', '14px', '15px', '16px', '18px', '20px', '22px', '24px', '28px', '32px', '40px', '48px'
];

console.log('Searching for hardcoded pixel values in src/\n');

const results = [];
for (const value of valuesToSearch) {
  // Find token(s) with this value
  const tokenNames = Object.entries(tokenMap)
    .filter(([name, val]) => val === value && !val.includes('var('))
    .map(([name]) => `--${name}`);
  
  if (tokenNames.length === 0) continue; // Skip if no token for this value

  // Search for hardcoded uses
  try {
    const output = execSync(`grep -rn "${value}" src/ --include="*.astro" --include="*.css" 2>/dev/null || true`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    });
    
    const lines = output.split('\n').filter(line => line.trim());
    
    // Filter out lines that use the token variable instead
    const hardcodedLines = lines.filter(line => {
      const filePath = line.split(':')[0];
      const lineContent = line.substring(line.indexOf(':') + 1);
      // Skip if it's inside a var() or comment
      if (lineContent.includes('var(--') || lineContent.includes('/*') || lineContent.includes('//')) {
        return false;
      }
      return true;
    });

    if (hardcodedLines.length > 0) {
      results.push({
        value,
        tokenNames,
        hardcodedLines: hardcodedLines.slice(0, 10) // Limit to first 10 matches
      });
    }
  } catch (e) {
    // No matches, skip
  }
}

// Sort by number of hardcoded uses
results.sort((a, b) => b.hardcodedLines.length - a.hardcodedLines.length);

if (results.length === 0) {
  console.log('No hardcoded values found that match tokens.');
} else {
  results.forEach(r => {
    console.log(`Value: ${r.value}`);
    console.log(`Token(s): ${r.tokenNames.join(', ')}`);
    console.log(`Hardcoded uses (${r.hardcodedLines.length}):`);
    r.hardcodedLines.forEach(line => {
      console.log(`  ${line}`);
    });
    console.log();
  });
}

