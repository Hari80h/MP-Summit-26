import sys

with open('src/components/delegate/DelegateSchedule.tsx', 'r') as f:
    code = f.read()

# 1. Padding and Margin adjustments for ~10% increase
code = code.replace(
  'className="p-2 px-3 bg-white rounded-[10px] border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col shadow-sm"',
  'className="p-2.5 px-3 bg-white rounded-[10px] border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col gap-1 shadow-sm"'
)

code = code.replace(
  'className={`w-full py-1 mt-1 rounded-md text-[12px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-1.5 ${',
  'className={`w-full py-1.5 mt-1.5 rounded-md text-[12px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-1.5 ${'
)

# 2. Add "View details" at top right
old_top_row = '<p className="text-[11px] font-medium text-[#6B6B6B]">Day {session.day} · {session.timeRange}</p>'
new_top_row = """<div className="flex items-center justify-between mb-0.5">
                  <p className="text-[11px] font-medium text-[#6B6B6B]">Day {session.day} · {session.timeRange}</p>
                  <span className="text-[10px] font-bold text-[#B51F32] flex items-center gap-0.5 group-hover:underline">
                    View details <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>"""
code = code.replace(old_top_row, new_top_row)

# Slightly bump the title text size to fill the extra space
code = code.replace(
  '<h4 className="text-[13px] font-bold text-[#181818] leading-tight">',
  '<h4 className="text-[13.5px] font-bold text-[#181818] leading-snug">'
)

with open('src/components/delegate/DelegateSchedule.tsx', 'w') as f:
    f.write(code)

print("Done")
