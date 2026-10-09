with open('src/components/delegate/DelegateProfile.tsx', 'r') as f:
    c = f.read()

import_str = "import { PageHeader } from '../shared/PageHeader';\n"
c = c.replace(import_str, "")

old_header = '<PageHeader title="Your Profile" subtitle="Manage your digital presence and connections" icon={User} theme="purple" />'
new_header = """<div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · DELEGATE</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Profile</h1>
      </div>"""

c = c.replace(old_header, new_header)

with open('src/components/delegate/DelegateProfile.tsx', 'w') as f:
    f.write(c)

print("Profile Header updated to raw serif text")
