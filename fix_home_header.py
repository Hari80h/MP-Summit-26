import sys
import re

with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    content = f.read()

# Replace the Top Greeting block
old_block_regex = r"\{\/\* Top Greeting & Attendee Identity Header \*\/\}\n\s*<div className=\"flex items-center justify-between pt-1\">.*?</div>\n\s*</button>\n\s*</div>"

new_block = """{/* Top Greeting & Attendee Identity Header */}
      <div className="flex items-center justify-between bg-[#EFEBE5] rounded-[28px] p-5 shadow-sm relative overflow-hidden mt-1">
        {/* Subtle background decoration to mimic the waves */}
        <div className="absolute -top-12 -right-8 w-40 h-40 bg-white/40 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-32 h-32 bg-[#E5DFD6]/60 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex flex-col relative z-10">
          <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#737373] mb-1.5">
            {getGreetingIST()}
          </span>
          <h1 className="text-[25px] font-extrabold text-[#181818] tracking-tight leading-none mb-2">
            {currentUser.name}
          </h1>
          <p className="text-[13px] font-semibold text-[#6B6B6B] leading-none">
            {currentUser.designation} <span className="opacity-50 mx-0.5">·</span> {currentUser.company}
          </p>
        </div>

        <button
          onClick={() => setActiveDelegateTab('profile')}
          className="relative group focus:outline-none z-10 flex-shrink-0"
          aria-label="View Profile"
        >
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.name} className="w-14 h-14 rounded-full border-[2.5px] border-white object-cover shadow-sm" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#181818] text-white flex items-center justify-center font-bold text-lg border-[2.5px] border-white shadow-sm">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <span className="absolute bottom-0 -right-0.5 w-4 h-4 bg-[#10B981] border-[2.5px] border-white rounded-full" />
        </button>
      </div>"""

content = re.sub(old_block_regex, new_block, content, flags=re.DOTALL)

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(content)

print("Done")
