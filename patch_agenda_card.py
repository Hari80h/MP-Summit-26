import re

with open('src/components/delegate/DelegateSchedule.tsx', 'r') as f:
    content = f.read()

# 1. Update imports
content = content.replace(
    "import { Clock, MapPin, Bookmark, BookmarkCheck, ThumbsUp, Send, User, CheckCircle2, AlertCircle, BarChart2, MessageSquare, ChevronLeft, ArrowRight } from 'lucide-react';",
    "import { Clock, MapPin, Bookmark, BookmarkCheck, ThumbsUp, Send, User, CheckCircle2, AlertCircle, BarChart2, MessageSquare, ChevronLeft, ArrowRight, CalendarPlus, Check } from 'lucide-react';"
)

# 2. Update mapping block
old_block_regex = r"filteredSessions\.map\(\(session\) => \(\n\s*<div.*?key=\{session\.id\}.*?</div>\n\s*\)\)"

new_block = """filteredSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedSessionId(session.id)}
              className="p-3 bg-white rounded-xl border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col gap-2 shadow-sm"
            >
              <div>
                <p className="text-[13px] text-[#6B6B6B]">Day {session.day} · {session.timeRange}</p>
                <h4 className="text-[14px] font-bold text-[#181818] mt-0.5 leading-snug">
                  {session.title}
                </h4>
                <p className="text-[12px] text-[#6B6B6B] mt-1 leading-relaxed line-clamp-1">
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
                className={`w-full py-1.5 mt-1 rounded-lg text-[13px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-2 ${
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
