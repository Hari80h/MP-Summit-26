import re

with open('src/components/organizer/OrganizerExhibitors.tsx', 'r') as f:
    c = f.read()

c = re.sub(r'<button onClick=\{.*?ChevronLeft className="w-4 h-4" /></button>', '', c)

with open('src/components/organizer/OrganizerExhibitors.tsx', 'w') as f:
    f.write(c)

