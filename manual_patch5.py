with open('src/components/delegate/DelegatePolls.tsx', 'r') as f:
    c = f.read()

if 'PageHeader' not in c:
    c = c.replace("import { ChevronLeft, BarChart2, CheckCircle2 } from 'lucide-react';",
                  "import { ChevronLeft, BarChart2, CheckCircle2 } from 'lucide-react';\nimport { PageHeader } from '../shared/PageHeader';")

    start = c.find('<div className="pt-3 pb-3 px-3 bg-white border-b border-[#DEDCD7] flex-shrink-0">')
    end = c.find('<div className="flex-1 overflow-y-auto p-3 space-y-2">')
    
    if start != -1 and end != -1:
        c = c[:start] + "<PageHeader title=\"Live Polls & Q&A\" subtitle=\"Engage with ongoing sessions in real-time\" icon={BarChart2} theme=\"purple\" onBack={() => setActiveDelegateTab('home')} />\n      " + c[end:]

with open('src/components/delegate/DelegatePolls.tsx', 'w') as f:
    f.write(c)
print("DelegatePolls patched")
