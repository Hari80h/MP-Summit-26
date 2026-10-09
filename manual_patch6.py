import re
with open('src/components/organizer/OrganizerAnalytics.tsx', 'r') as f:
    c = f.read()

if 'PageHeader' not in c:
    c = c.replace("import { TrendingUp, Users, QrCode, Building2, Download, Filter, Map, Activity } from 'lucide-react';",
                  "import { TrendingUp, Users, QrCode, Building2, Download, Filter, Map, Activity, LineChart } from 'lucide-react';\nimport { PageHeader } from '../shared/PageHeader';")

    regex = r'<div>\s*<h1[^>]*>Event Analytics.*?</h1>\s*<p[^>]*>.*?</p>\s*</div>'
    new_val = '<PageHeader title="Event Analytics & Insights" subtitle="Real-time performance and footfall metrics" icon={LineChart} theme="blue" />'
    
    c = re.sub(regex, new_val, c, flags=re.DOTALL)

with open('src/components/organizer/OrganizerAnalytics.tsx', 'w') as f:
    f.write(c)
print("OrganizerAnalytics patched")
