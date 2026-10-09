import sys
import re

with open('src/components/delegate/DelegateSchedule.tsx', 'r') as f:
    content = f.read()

# Replace the block
old_block_regex = r"filteredSessions\.map\(\(session\) => \(\n\s*<div.*?key=\{session\.id\}.*?</div>\n\s*\)\)"

new_block = """filteredSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedSessionId(session.id)}
              className="p-3 bg-white rounded-xl border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[12px] font-medium text-[#6B6B6B]">Day {session.day} · {session.timeRange}</p>
                  <span className="text-[11px] font-bold text-[#B51F32] flex items-center gap-1 group-hover:underline">
                    View details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <h4 className="text-[14.5px] font-bold text-[#181818] leading-tight">
                  {session.title}
                </h4>
                <p className="text-[12.5px] text-[#6B6B6B] mt-1 leading-snug line-clamp-1">
                  <span className="font-semibold text-[#4B5563]">{session.speakerName}</span>
                  {(session.speakerDesignation || session.speakerCompany) && ' · '}
                  {session.speakerDesignation}
                  {session.speakerDesignation && session.speakerCompany && ', '}
                  {session.speakerCompany}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmarkSession(session.id);
                }}
                className={`w-full py-1.5 mt-2 rounded-lg text-[12.5px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-1.5 ${
                  session.isBookmarked 
                    ? 'border-[#0D9488] bg-[#F0FDF4] text-[#0D9488]'
                    : 'border-[#181818] text-[#181818] bg-white hover:bg-gray-50'
                }`}
              >
                {session.isBookmarked ? (
                  <>
                    <Check className="w-4 h-4" /> Added
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4" /> Add
                  </>
                )}
              </button>
            </div>
          ))"""

content = re.sub(old_block_regex, new_block, content, flags=re.DOTALL)

with open('src/components/delegate/DelegateSchedule.tsx', 'w') as f:
    f.write(content)

print("Done")
