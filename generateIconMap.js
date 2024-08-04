const fs = require('fs');
const path = require('path');

const svgDir = path.resolve(__dirname, 'src/assets/svg');
const outputFile = path.resolve(__dirname, 'src/iconMap.ts');

const icons = {};

fs.readdirSync(svgDir).forEach(file => {
  if (file.endsWith('.svg')) {
    const iconName = path.basename(file, '.svg');
    icons[iconName] = `require('@/assets/svg/${file}')`;
  }
});

const content = `export const iconMap = {\n${Object.entries(icons).map(([key, value]) => `  '${key}': ${value}`).join(',\n')}\n};\n`;

fs.writeFileSync(outputFile, content);

console.log('Icon map generated.');
