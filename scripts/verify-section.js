#!/usr/bin/env node

const section = process.argv[2];

if (!section) {
  console.error('Usage: node scripts/verify-section.js <section-name>');
  process.exit(1);
}

console.log(`
Open http://localhost:4321/index-ramp-rebuild in your browser, then run this in the console:

const headerRight = document.querySelector('.resources-header-right');
const resourcesList = document.querySelector('.resources-list');

if (headerRight && resourcesList) {
  const headerX = headerRight.getBoundingClientRect().left;
  const listX = resourcesList.getBoundingClientRect().left;
  const diff = Math.abs(headerX - listX);

  console.log('Computed x-positions for: ${section}');
  console.log('  .resources-header-right x:', headerX);
  console.log('  .resources-list x:', listX);
  console.log('  Difference:', diff, 'px');
  console.log('  Match:', diff <= 2 ? '✅ YES (within 1-2px)' : '❌ NO (difference > 2px)');
} else {
  console.log('Elements not found. Make sure you\'re on the resources section.');
}
`);
