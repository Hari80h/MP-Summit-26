import sys
import re

with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    content = f.read()

old_block_regex = r"\{\/\* Event Card: ITS26, LIVE, Bengaluru \*\/\}\n\s*<div className=\"bg-\[#18181B\].*?</div>\n\s*</div>\n\s*</div>"

new_block = """{/* Event Card: ITS26, LIVE, Bengaluru */}
      <div className="bg-[#18181B] rounded-2xl p-3.5 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-[#E5E5E5] bg-[#27272A] px-2 py-0.5 rounded-md">
            {event.id}
          </span>
          <div className="flex items-center gap-1.5 bg-[#B51F32] px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              LIVE
            </span>
          </div>
        </div>

        <h2 className="text-lg font-bold text-white tracking-tight">
          {event.name}
        </h2>

        <div className="mt-1.5 text-[12px] text-[#A1A1AA] space-y-0.5">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{event.venue}, {event.city}</span>
          </div>
          <div className="pl-[20px]">
            <span>{event.dates}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] sm:text-[12px] whitespace-nowrap overflow-x-auto no-scrollbar pb-1">
          <span className="bg-[#27272A] text-[#E5E5E5] px-2 py-1 rounded-lg shrink-0">
            <strong>{event.totalRegistered || attendees.length}</strong> attendees
          </span>
          <span className="bg-[#27272A] text-[#E5E5E5] px-2 py-1 rounded-lg shrink-0">
            <strong>{event.totalSpeakers || attendees.filter(a => a.role === 'speaker').length}</strong> speakers
          </span>
          <span className="bg-[#27272A] text-[#E5E5E5] px-2 py-1 rounded-lg shrink-0">
            <strong>{event.totalExhibitors || exhibitors.length}</strong> exhibitors
          </span>
        </div>
      </div>"""

content = re.sub(old_block_regex, new_block, content, flags=re.DOTALL)

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(content)

print("Done")
