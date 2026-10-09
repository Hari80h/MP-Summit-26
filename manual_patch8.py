with open('src/components/exhibitor/ExhibitorHome.tsx', 'r') as f:
    c = f.read()

if 'PageHeader' not in c:
    c = c.replace("import { Users, TrendingUp, Filter, Calendar, MapPin, Search, ArrowUpRight, BarChart2, Shield, QrCode } from 'lucide-react';",
                  "import { Users, TrendingUp, Filter, Calendar, MapPin, Search, ArrowUpRight, BarChart2, Shield, QrCode, Briefcase } from 'lucide-react';\nimport { PageHeader } from '../shared/PageHeader';")

    start = c.find('{/* Booth Identifier Header */}')
    end = c.find('</div>\n      </div>\n\n      {/* Stats Grid */}')
    
    if start != -1 and end != -1:
        c = c[:start] + "<PageHeader title=\"Exhibitor Dashboard\" subtitle=\"Microsoft · Booth B-14 · Hall B\" icon={Briefcase} theme=\"blue\" />" + c[end+20:]

with open('src/components/exhibitor/ExhibitorHome.tsx', 'w') as f:
    f.write(c)
print("ExhibitorHome patched")
