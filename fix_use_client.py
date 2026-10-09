for f in ['src/components/organizer/OrganizerAnalytics.tsx', 'src/components/organizer/OrganizerExhibitors.tsx']:
    with open(f, 'r') as file:
        lines = file.readlines()
    if lines[0].startswith('import React') and lines[1].startswith("'use client'"):
        lines[0], lines[1] = lines[1], lines[0]
        # Also remove the double semicolon
        lines[4] = lines[4].replace(';;', ';')
    with open(f, 'w') as file:
        file.writelines(lines)
