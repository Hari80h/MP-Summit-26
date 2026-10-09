import re

with open('src/components/delegate/DelegateSpeakers.tsx', 'r') as f:
    c = f.read()
    
# Import
if 'PageHeader' not in c:
    c = c.replace("import { ChevronLeft, Search, UserPlus, Check, Clock } from 'lucide-react';",
                  "import { ChevronLeft, Search, UserPlus, Check, Clock, Mic } from 'lucide-react';\nimport { PageHeader } from '../shared/PageHeader';")

# Find the header block
start = c.find('<div className="flex items-center gap-2 mb-2">')
end = c.find('{/* Search */}')

if start != -1 and end != -1:
    c = c[:start] + "<PageHeader title=\"Featured Speakers\" subtitle=\"Learn from industry pioneers and visionaries\" icon={Mic} theme=\"amber\" onBack={() => setActiveDelegateTab('home')} />\n        " + c[end:]

with open('src/components/delegate/DelegateSpeakers.tsx', 'w') as f:
    f.write(c)
print("DelegateSpeakers patched")
