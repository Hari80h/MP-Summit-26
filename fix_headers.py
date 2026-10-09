with open('src/components/delegate/DelegateSchedule.tsx', 'r') as f:
    c = f.read()

import_str = "import { PageHeader } from '../shared/PageHeader';\n"
c = c.replace(import_str, "")

old_header = '<PageHeader title="Event Schedule" subtitle="12–14 Feb 2026 · Bengaluru International Centre" icon={Calendar} theme="red" />'
new_header = """<div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · PROGRAMME</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Schedule</h1>
      </div>"""

c = c.replace(old_header, new_header)

with open('src/components/delegate/DelegateSchedule.tsx', 'w') as f:
    f.write(c)


with open('src/components/delegate/DelegatePeople.tsx', 'r') as f:
    c2 = f.read()

c2 = c2.replace(import_str, "")

old_header2 = '<PageHeader title="People & Networking" subtitle="Connect with 2,438 pre-registered leaders at ITS26" icon={Users} theme="green" />'
new_header2 = """<div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · NETWORKING</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">People</h1>
      </div>"""

c2 = c2.replace(old_header2, new_header2)

with open('src/components/delegate/DelegatePeople.tsx', 'w') as f:
    f.write(c2)

print("Headers updated to raw serif text")
