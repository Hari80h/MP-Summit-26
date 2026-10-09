const fs = require('fs');
let code = fs.readFileSync('src/components/delegate/DelegateHome.tsx', 'utf8');

// Change p-4 to px-3 py-4
code = code.replace(
  '<div className="flex-1 p-4 pb-20 space-y-5 bg-[#F6F4F0] overflow-y-auto">',
  '<div className="flex-1 px-3 pt-4 pb-20 space-y-5 bg-[#F6F4F0] overflow-y-auto">'
);

// For the black event card, if they only meant the black box, it has p-4.
// Let's also make the black box padding slightly smaller on sides if they want it wider, or just keeping the parent smaller is enough.
// The quick links overflow has -mx-4 px-4, which we need to update to -mx-3 px-3 to match the new parent padding!
code = code.replace(
  '<div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">',
  '<div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 -mx-3 px-3">'
);
code = code.replace(
  '<div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">',
  '<div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 -mx-3 px-3">'
);

fs.writeFileSync('src/components/delegate/DelegateHome.tsx', code);
