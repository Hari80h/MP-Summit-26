const fs = require('fs');
let code = fs.readFileSync('src/components/delegate/DelegateHome.tsx', 'utf8');

// 1. AI Recommendations People Cards
// p-3.5 -> p-3, w-[240px] -> w-[220px], gap-3 -> gap-2.5, rounded-2xl -> rounded-xl
code = code.replace(
  'className="bg-[#FFFFFF] p-3.5 rounded-2xl border border-[#DEDCD7] flex-shrink-0 w-[240px] flex flex-col justify-between gap-3 cursor-pointer shadow-sm hover:border-[#181818]/40 transition-all"',
  'className="bg-[#FFFFFF] p-3 rounded-xl border border-[#DEDCD7] flex-shrink-0 w-[220px] flex flex-col justify-between gap-2.5 cursor-pointer shadow-sm hover:border-[#181818]/40 transition-all"'
);
// Avatar w-12 h-12 -> w-10 h-10
code = code.replace(
  'className="w-12 h-12 rounded-full object-cover flex-shrink-0"',
  'className="w-10 h-10 rounded-full object-cover flex-shrink-0"'
);
code = code.replace(
  'className="w-12 h-12 rounded-full bg-[#EFEEEA] flex items-center justify-center font-bold text-sm text-[#181818] flex-shrink-0"',
  'className="w-10 h-10 rounded-full bg-[#EFEEEA] flex items-center justify-center font-bold text-sm text-[#181818] flex-shrink-0"'
);
// Text sizes text-[15px] -> text-[14px], text-[13px] -> text-[12px] (ONLY for the people card names)
code = code.replace(
  '<h4 className="text-[15px] font-bold text-[#181818] truncate leading-snug">',
  '<h4 className="text-[14px] font-bold text-[#181818] truncate leading-snug">'
);
code = code.replace(
  '<p className="text-[13px] text-[#64748B] truncate mt-0.5">',
  '<p className="text-[12px] text-[#64748B] truncate mt-0.5">'
);
code = code.replace(
  '<button\n                      onClick={(e) => {',
  '<button\n                      onClick={(e) => {'
);


// 2. Companies to Explore
// p-4 -> p-3, gap-3 -> gap-2, rounded-2xl -> rounded-xl
code = code.replace(
  'className="bg-white p-4 rounded-2xl border border-[#DEDCD7] hover:border-[#181818]/40 transition-all cursor-pointer shadow-sm flex flex-col gap-3"',
  'className="bg-white p-3 rounded-xl border border-[#DEDCD7] hover:border-[#181818]/40 transition-all cursor-pointer shadow-sm flex flex-col gap-2"'
);
// Logo w-14 h-14 -> w-10 h-10
code = code.replace(
  'className="w-14 h-14 rounded-2xl bg-[#EFEEEA] overflow-hidden flex items-center justify-center font-bold text-xl text-[#181818] flex-shrink-0"',
  'className="w-10 h-10 rounded-xl bg-[#EFEEEA] overflow-hidden flex items-center justify-center font-bold text-lg text-[#181818] flex-shrink-0"'
);
// Company Name text-[16px] -> text-[14px]
code = code.replace(
  '<h4 className="text-[16px] font-bold text-[#181818] leading-snug truncate">{company.company}</h4>',
  '<h4 className="text-[14px] font-bold text-[#181818] leading-snug truncate">{company.company}</h4>'
);


// 3. Home Screen Sessions
// p-4 -> p-3, gap-3 -> gap-2, py-2 -> py-1.5, rounded-2xl -> rounded-xl
code = code.replace(
  'className="p-4 bg-white rounded-2xl border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col gap-3 shadow-sm"',
  'className="p-3 bg-white rounded-xl border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col gap-2 shadow-sm"'
);
// Add Button
code = code.replace(
  'className={`w-full py-2 rounded-xl text-[13px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-2 ${',
  'className={`w-full py-1.5 rounded-lg text-[13px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-2 ${'
);
// Session Name
code = code.replace(
  '<h4 className="text-[15px] font-bold text-[#181818] mt-1 leading-snug">',
  '<h4 className="text-[14px] font-bold text-[#181818] mt-0.5 leading-snug">'
);

fs.writeFileSync('src/components/delegate/DelegateHome.tsx', code);
