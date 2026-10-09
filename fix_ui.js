const fs = require('fs');

// 1. Fix DelegateHome.tsx
let delHome = fs.readFileSync('src/components/delegate/DelegateHome.tsx', 'utf8');

// Fix 1a: Black card pills
delHome = delHome.replace(
  '<div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">',
  '<div className="mt-4 flex items-center gap-1.5 text-[11.5px] sm:text-[13px] whitespace-nowrap overflow-x-auto no-scrollbar pb-1">'
);
delHome = delHome.replace(
  /<span className="bg-\[#27272A\] text-\[#E5E5E5\] px-3 py-1.5 rounded-lg">/g,
  '<span className="bg-[#27272A] text-[#E5E5E5] px-2 py-1.5 rounded-lg shrink-0">'
);

// Fix 1b: Quick Links (change min-w-[100px] flex-1 to min-w-[92px] shrink-0)
delHome = delHome.replace(
  /className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-\[#DEDCD7\] min-w-\[100px\] flex-1 hover:border-\[#181818\]\/40 transition-all shadow-sm items-start"/g,
  'className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-[#DEDCD7] min-w-[92px] shrink-0 hover:border-[#181818]/40 transition-all shadow-sm items-start"'
);

fs.writeFileSync('src/components/delegate/DelegateHome.tsx', delHome);

// 2. Fix DelegateBottomNav.tsx
let delNav = fs.readFileSync('src/components/delegate/DelegateBottomNav.tsx', 'utf8');
delNav = delNav.replace(
  'pb-[max(env(safe-area-inset-bottom),6px)] px-3 py-1.5',
  'pb-1 px-3 pt-1.5'
);
fs.writeFileSync('src/components/delegate/DelegateBottomNav.tsx', delNav);

// 3. Fix ExhibitorBottomNav.tsx
let exhNav = fs.readFileSync('src/components/exhibitor/ExhibitorBottomNav.tsx', 'utf8');
exhNav = exhNav.replace(
  'pb-[max(env(safe-area-inset-bottom),6px)] px-3 py-1.5',
  'pb-1 px-3 pt-1.5'
);
fs.writeFileSync('src/components/exhibitor/ExhibitorBottomNav.tsx', exhNav);

