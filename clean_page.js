const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

const regex = /\/\/ 2\. Real WhatsApp Link Router Logic \([\s\S]*?\}\n    \}\n/m;
page = page.replace(regex, '');

fs.writeFileSync('src/app/page.tsx', page);
