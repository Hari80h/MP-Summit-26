import re

with open('src/components/delegate/DelegatePolls.tsx', 'r') as f:
    c = f.read()

new_header = """<div className="pt-4 pb-2 px-3 flex-shrink-0">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · INTERACT</p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Live Polls</h1>
          </div>
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#DEDCD7] transition-colors active:scale-95 text-[#181818] mt-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>"""

c = re.sub(r'<PageHeader.*?\/>', new_header, c)
c = c.replace('px-2 pt-2 pb-16 space-y-2', 'space-y-2') # Remove pb-16 from root

with open('src/components/delegate/DelegatePolls.tsx', 'w') as f:
    f.write(c)
