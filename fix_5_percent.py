import sys

with open('src/components/delegate/DelegateSchedule.tsx', 'r') as f:
    code = f.read()

code = code.replace(
  'className="p-2.5 px-3 bg-white rounded-[10px] border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col shadow-sm"',
  'className="p-2 px-3 bg-white rounded-[10px] border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col shadow-sm"'
)

code = code.replace(
  'className={`w-full py-1 mt-2 rounded-md text-[12px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-1.5 ${',
  'className={`w-full py-1 mt-1 rounded-md text-[12px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-1.5 ${'
)

code = code.replace(
  '<p className="text-[11px] font-medium text-[#6B6B6B] mb-0.5">Day {session.day} · {session.timeRange}</p>',
  '<p className="text-[11px] font-medium text-[#6B6B6B]">Day {session.day} · {session.timeRange}</p>'
)

with open('src/components/delegate/DelegateSchedule.tsx', 'w') as f:
    f.write(code)

print("Done")
