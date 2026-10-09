const fs = require('fs');

let code = fs.readFileSync('src/components/auth/AccessScreen.tsx', 'utf8');

// 1. Change the placeholder
code = code.replace(
  'placeholder="e.g. 9876543210"',
  'placeholder="e.g. XXXXXXX211"'
);

// 2. Remove the "Demo Mobile Numbers" block completely
const demoBlockRegex = /        \{\/\* Quick Helper for Demo Evaluators \*\/\}\n        <div className="mt-4 p-4 bg-white rounded-xl border border-\[#DEDCD7\] text-xs text-\[#6B6B6B\] space-y-3">[\s\S]*?<\/div>/;

code = code.replace(demoBlockRegex, '');

fs.writeFileSync('src/components/auth/AccessScreen.tsx', code);
