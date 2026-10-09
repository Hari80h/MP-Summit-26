import sys

with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    content = f.read()

# Fix import
if 'BarChart3' not in content[:500]:
    content = content.replace("import { ChevronRight, MapPin, CalendarPlus, Check, Clock } from 'lucide-react';",
                              "import { ChevronRight, MapPin, CalendarPlus, Check, Clock, Users, BarChart3, Building2, Star } from 'lucide-react';")

content = content.replace("onClick={() => setActiveDelegateTab('network')}", "onClick={() => setActiveDelegateTab('people')}")

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(content)

print("Fixed build errors!")
