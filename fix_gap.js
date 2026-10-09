const fs = require('fs');
let code = fs.readFileSync('src/components/delegate/DelegateHome.tsx', 'utf8');

code = code.replace(
  '<div className="flex-1 px-3 pt-4 pb-20 space-y-5 bg-[#F6F4F0] overflow-y-auto">',
  '<div className="flex-1 px-3 pt-4 pb-20 space-y-4 bg-[#F6F4F0] overflow-y-auto">'
);

fs.writeFileSync('src/components/delegate/DelegateHome.tsx', code);
