import re

with open('src/components/organizer/OrganizerAnalytics.tsx', 'r') as f:
    c = f.read()
new_header = """<div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · ORGANIZER</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Analytics</h1>
      </div>"""
c = re.sub(r'<PageHeader.*?\/>', new_header, c)
c = c.replace("import { PageHeader } from '../shared/PageHeader';\n", "")
with open('src/components/organizer/OrganizerAnalytics.tsx', 'w') as f:
    f.write(c)

with open('src/components/organizer/OrganizerExhibitors.tsx', 'r') as f:
    c2 = f.read()
new_header2 = """<div className="pt-2 pb-1 px-1 flex justify-between items-start">
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · ORGANIZER</p>
          <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Exhibitors</h1>
        </div>
        <button onClick={() => setActiveOrganizerTab('analytics')} className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#DEDCD7] transition-colors active:scale-95 text-[#181818] mt-1"><ChevronLeft className="w-4 h-4" /></button>
      </div>"""
c2 = re.sub(r'<PageHeader.*?\/>', new_header2, c2)
c2 = c2.replace("import { PageHeader } from '../shared/PageHeader';\n", "")
with open('src/components/organizer/OrganizerExhibitors.tsx', 'w') as f:
    f.write(c2)
    
with open('src/components/exhibitor/ExhibitorHome.tsx', 'r') as f:
    c3 = f.read()
new_header3 = """<div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">BOOTH B-14 · LIVE</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Dashboard</h1>
      </div>"""
c3 = re.sub(r'<PageHeader.*?\/>', new_header3, c3)
c3 = c3.replace("import { PageHeader } from '../shared/PageHeader';\n", "")
with open('src/components/exhibitor/ExhibitorHome.tsx', 'w') as f:
    f.write(c3)
