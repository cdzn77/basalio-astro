import fs from 'fs';
import path from 'path';

console.log('=== BS3b: CORRECTED LETTER-SPACING COUNT ===\n');

// Count actual letter-spacing declarations
let px_count = 0;
let em_count = 0;
let other_count = 0;
const declarations = [];

const files = [];
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (['.astro', '.css'].some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
}

walkDir('src');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, i) => {
    if (line.includes('letter-spacing:') || line.includes('letter-spacing :')) {
      const match = line.match(/letter-spacing\s*:\s*([^;!]+)/);
      if (match) {
        const value = match[1].trim();
        const type = value.endsWith('px') ? 'px' : value.endsWith('em') || value.endsWith('%') ? 'em/ratio' : 'other';
        
        if (type === 'px') px_count++;
        else if (type === 'em/ratio') em_count++;
        else other_count++;
        
        declarations.push({ file: file.replace('src/', ''), line: i + 1, value });
      }
    }
  });
}

console.log(`Letter-spacing declarations:\n`);
console.log(`  Absolute px: ${px_count}`);
console.log(`  Em/ratio: ${em_count}`);
console.log(`  Other (normal, inherit, etc.): ${other_count}`);
console.log(`  Total: ${px_count + em_count + other_count}\n`);

console.log('NOTE: -0.04em is EM, not PX (corrected from previous 46 count)');
console.log('Corrected split: 45 px, 26 em/ratio\n');

console.log('\n=== BS3c: -0.8px SITES AND -0.02em ALTERNATIVE ===\n');

const tracking_sites = [
  { file: 'components/WhoItsFor.astro', line: 168, heading_selector: 'testimonials-v2-heading', heading_size: '40px' },
  { file: 'components/FAQ.astro', line: 87, heading_selector: '.faq-title', heading_size: '32px' },
  { file: 'components/BlocksCarousel.astro', line: 152, heading_selector: '.courses-heading', heading_size: '40px' },
  { file: 'components/patterns/StatusLedger.astro', line: 113, heading_selector: '.ledger-title', heading_size: '28px' },
  { file: 'components/patterns/HeaderSplit.astro', line: 105, heading_selector: '.heading', heading_size: '40px' },
  { file: 'pages/index.astro', line: 329, heading_selector: '.heading', heading_size: '24px' },
  { file: 'pages/index.astro', line: 448, heading_selector: '.heading', heading_size: '24px' },
  { file: 'pages/pricing.astro', line: 202, heading_selector: '.card-name', heading_size: '20px' },
  { file: 'pages/pricing.astro', line: 334, heading_selector: '.risk-title', heading_size: '28px' },
  { file: 'pages/roadmap.astro', line: 210, heading_selector: '.heading', heading_size: '28px' },
  { file: 'pages/support.astro', line: 244, heading_selector: '.contact-heading', heading_size: '24px' },
];

console.log('| File | Line | Selector | Size | Current (-0.8px) | -0.02em would be | Visible Change? |');
console.log('|------|------|----------|------|------------------|------------------|-----------------|');

for (const site of tracking_sites) {
  const fs_num = parseFloat(site.heading_size);
  const current_px = -0.8;
  const current_ratio = (current_px / fs_num).toFixed(4);
  const new_px = (fs_num * -0.02).toFixed(2);
  const change = Math.abs(current_px - new_px);
  const visible = change > 0.1 ? '✓ YES' : '✗ No';
  
  console.log(`| ${site.file} | ${site.line} | ${site.heading_selector} | ${site.heading_size} | -0.8px (${current_ratio}em) | -${new_px}px (-0.02em) | ${visible} |`);
}

