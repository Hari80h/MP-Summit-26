import re
with open('src/components/organizer/OrganizerExhibitors.tsx', 'r') as f:
    c = f.read()

if 'PageHeader' not in c:
    c = c.replace("import { Building2, Search, Filter, Download, ArrowUpRight, MapPin, Users } from 'lucide-react';",
                  "import { Building2, Search, Filter, Download, ArrowUpRight, MapPin, Users } from 'lucide-react';\nimport { PageHeader } from '../shared/PageHeader';")

    regex = r'<div>\s*<h1[^>]*>Exhibitor Directory.*?</h1>\s*<p[^>]*>.*?</p>\s*</div>'
    new_val = '<PageHeader title="Exhibitor Directory & Footfall" subtitle="Manage sponsors and booth allocations" icon={Building2} theme="green" />'
    
    c = re.sub(regex, new_val, c, flags=re.DOTALL)

with open('src/components/organizer/OrganizerExhibitors.tsx', 'w') as f:
    f.write(c)
print("OrganizerExhibitors patched")
