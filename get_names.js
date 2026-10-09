const fs = require('fs');
const content = fs.readFileSync('src/lib/generatedData.ts', 'utf8');
const names = content.match(/name:\s*'([^']+)'/g);
if (names) {
    names.forEach(n => console.log(n));
}
