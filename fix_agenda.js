const fs = require('fs');
let code = fs.readFileSync('src/components/delegate/DelegateSchedule.tsx', 'utf8');

// 1. Remove blank space at top (pt-10 -> pt-5) and space-y-5 -> space-y-4
code = code.replace(
  'className="flex-1 p-4 pt-10 pb-24 space-y-5 bg-[#FAFAFA] select-none overflow-y-auto"',
  'className="flex-1 p-4 pt-5 pb-24 space-y-4 bg-[#FAFAFA] select-none overflow-y-auto"'
);

// 2. Reduce height of All Sessions / My Schedule toggle (p-1.5 -> p-1, py-2.5 -> py-2)
code = code.replace(
  'className="flex bg-[#F3F4F6] p-1.5 rounded-xl border border-[#E5E7EB]"',
  'className="flex bg-[#F3F4F6] p-1 rounded-xl border border-[#E5E7EB]"'
);
code = code.replace(
  'className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all ${',
  'className={`flex-1 py-1.5 rounded-[10px] text-[13px] font-semibold transition-all ${'
);
code = code.replace(
  'className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${',
  'className={`flex-1 py-1.5 rounded-[10px] text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${'
);

// 3. Make session boxes minimal (p-5 -> p-4, space-y-3.5 -> space-y-2.5)
code = code.replace(
  'className="group bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all shadow-sm hover:shadow-md cursor-pointer space-y-3.5 relative overflow-hidden"',
  'className="group bg-white p-4 rounded-xl border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all shadow-sm hover:shadow-md cursor-pointer space-y-2.5 relative overflow-hidden"'
);

// Fix the speaker text formatting bug
const oldSpeakerHtml = `                <p className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed">
                  {session.speakerName} · {session.speakerDesignation}, {session.speakerCompany}
                </p>`;
const newSpeakerHtml = `                <p className="text-[12px] text-[#6B6B6B] mt-1 leading-relaxed line-clamp-1">
                  <span className="font-semibold text-[#4B5563]">{session.speakerName}</span>
                  {(session.speakerDesignation || session.speakerCompany) && ' · '}
                  {session.speakerDesignation}
                  {session.speakerDesignation && session.speakerCompany && ', '}
                  {session.speakerCompany}
                </p>`;
code = code.replace(oldSpeakerHtml, newSpeakerHtml);

// 4. Reduce title text size slightly in the card for compactness
code = code.replace(
  '<h3 className="text-[17px] font-bold text-[#181818] leading-tight">',
  '<h3 className="text-[15px] font-bold text-[#181818] leading-tight">'
);

fs.writeFileSync('src/components/delegate/DelegateSchedule.tsx', code);
