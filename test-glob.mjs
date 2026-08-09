const icons = import.meta.glob('/public/assets/icons/blocks/*.svg', {
  as: 'url', eager: true
});

console.log('import.meta.glob with as: url returns:');
console.log('First key:', Object.keys(icons)[0]);
console.log('First value type:', typeof Object.values(icons)[0]);
console.log('First value:', Object.values(icons)[0]);
