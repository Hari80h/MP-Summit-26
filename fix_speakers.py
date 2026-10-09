import re

with open('src/components/delegate/DelegateSpeakers.tsx', 'r') as f:
    c = f.read()

new_header = """<div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · SPEAKERS</p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Featured</h1>
          </div>
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#DEDCD7] transition-colors active:scale-95 text-[#181818] mt-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>"""

c = re.sub(r'<PageHeader.*?\/>', new_header, c)
c = c.replace('px-2 pt-2 pb-16 space-y-2', 'space-y-2') # Remove pb-16 from root

with open('src/components/delegate/DelegateSpeakers.tsx', 'w') as f:
    f.write(c)

with open('src/components/delegate/DelegateCompanies.tsx', 'r') as f:
    c2 = f.read()

new_header2 = """<div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · DIRECTORY</p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Exhibitors</h1>
          </div>
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#DEDCD7] transition-colors active:scale-95 text-[#181818] mt-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>"""
        
c2 = re.sub(r'<PageHeader.*?\/>', new_header2, c2)
c2 = c2.replace('px-2 pt-2 pb-16 space-y-2', 'space-y-2')

with open('src/components/delegate/DelegateCompanies.tsx', 'w') as f:
    f.write(c2)
