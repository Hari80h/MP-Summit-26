const fs = require('fs');

let code = fs.readFileSync('src/components/delegate/DelegateSchedule.tsx', 'utf8');

// 1. Container padding and gap
code = code.replace(
  'className="p-3 bg-white rounded-xl border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col gap-2 shadow-sm"',
  'className="p-2.5 px-3 bg-white rounded-[10px] border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col shadow-sm"'
);

// 2. Day & Time text
code = code.replace(
  '<p className="text-[13px] text-[#6B6B6B]">Day {session.day} · {session.timeRange}</p>',
  '<p className="text-[11px] font-medium text-[#6B6B6B] mb-0.5">Day {session.day} · {session.timeRange}</p>'
);

// 3. Title text
code = code.replace(
  '<h4 className="text-[14px] font-bold text-[#181818] mt-0.5 leading-snug">',
  '<h4 className="text-[13px] font-bold text-[#181818] leading-tight">'
);

// 4. Speaker text
code = code.replace(
  '<p className="text-[12px] text-[#6B6B6B] mt-1 leading-relaxed line-clamp-1">',
  '<p className="text-[11px] text-[#6B6B6B] mt-0.5 leading-snug line-clamp-1">'
);

// 5. Button
code = code.replace(
  'className={`w-full py-1.5 mt-1 rounded-lg text-[13px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-2 ${',
  'className={`w-full py-1 mt-2 rounded-md text-[12px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-1.5 ${'
);
// Make calendar icon smaller
code = code.replace(
  '<CalendarPlus className="w-4 h-4" /> Add',
  '<CalendarPlus className="w-3.5 h-3.5" /> Add'
);
code = code.replace(
  '<Check className="w-4 h-4" /> Added',
  '<Check className="w-3.5 h-3.5" /> Added'
);

fs.writeFileSync('src/components/delegate/DelegateSchedule.tsx', code);
