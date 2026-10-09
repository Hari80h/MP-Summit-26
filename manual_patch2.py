import re

with open('src/components/delegate/DelegateCompanies.tsx', 'r') as f:
    c = f.read()
    
# Import
if 'PageHeader' not in c:
    c = c.replace("import { Search, ChevronLeft, MapPin, ExternalLink, Globe } from 'lucide-react';",
                  "import { Search, ChevronLeft, MapPin, ExternalLink, Globe, Building2 } from 'lucide-react';\nimport { PageHeader } from '../shared/PageHeader';")

# Find the header block
start = c.find('<div className="flex items-center gap-2 mb-3">')
end = c.find('{/* Search */}')

if start != -1 and end != -1:
    c = c[:start] + "<PageHeader title=\"Exhibitor Directory\" subtitle=\"Explore 400+ leading tech companies and startups\" icon={Building2} theme=\"blue\" onBack={() => setActiveDelegateTab('home')} />\n        " + c[end:]

with open('src/components/delegate/DelegateCompanies.tsx', 'w') as f:
    f.write(c)
print("DelegateCompanies patched")
