import os
import re

updates = [
    {
        'file': 'src/components/delegate/DelegateSchedule.tsx',
        'theme': 'red',
        'icon': 'Calendar',
        'title': 'Event Schedule',
        'subtitle': '12–14 Feb 2026 · Bengaluru International Centre',
        'regex': r'<div>\s*<h1[^>]*>Event Schedule</h1>\s*<p[^>]*>.*?Bengaluru International Centre\s*</p>\s*</div>'
    },
    {
        'file': 'src/components/delegate/DelegatePeople.tsx',
        'theme': 'green',
        'icon': 'Users',
        'title': 'People & Networking',
        'subtitle': 'Connect with 2,438 pre-registered leaders at ITS26',
        'regex': r'<div>\s*<h1[^>]*>People & Networking</h1>\s*<p[^>]*>.*?Connect with 2,438 pre-registered leaders at ITS26\s*</p>\s*</div>'
    },
    {
        'file': 'src/components/delegate/DelegateCompanies.tsx',
        'theme': 'blue',
        'icon': 'Building2',
        'title': 'Exhibitor Directory',
        'subtitle': 'Explore 400+ leading tech companies and startups',
        'regex': r'<div>\s*<h1[^>]*>Exhibitor Directory</h1>\s*<p[^>]*>.*?Explore 400\+ leading tech companies and startups\s*</p>\s*</div>'
    },
    {
        'file': 'src/components/delegate/DelegateSpeakers.tsx',
        'theme': 'amber',
        'icon': 'Mic',
        'title': 'Featured Speakers',
        'subtitle': 'Learn from industry pioneers and visionaries',
        'regex': r'<div>\s*<h1[^>]*>Featured Speakers</h1>\s*<p[^>]*>.*?Learn from industry pioneers and visionaries\s*</p>\s*</div>'
    },
    {
        'file': 'src/components/delegate/DelegateProfile.tsx',
        'theme': 'purple',
        'icon': 'User',
        'title': 'Your Profile',
        'subtitle': 'Manage your digital presence and connections',
        'regex': r'<div className="mb-4">\s*<h1[^>]*>Your Profile</h1>\s*<p[^>]*>.*?Manage your digital presence and connections\s*</p>\s*</div>'
    },
    {
        'file': 'src/components/delegate/DelegatePolls.tsx',
        'theme': 'purple',
        'icon': 'BarChart2',
        'title': 'Live Polls & Q&A',
        'subtitle': 'Engage with ongoing sessions in real-time',
        'regex': r'<div>\s*<h1[^>]*>Live Polls & Q&A</h1>\s*<p[^>]*>.*?Engage with ongoing sessions in real-time\s*</p>\s*</div>'
    },
    {
        'file': 'src/components/organizer/OrganizerAnalytics.tsx',
        'theme': 'blue',
        'icon': 'LineChart',
        'title': 'Event Analytics & Insights',
        'subtitle': 'Real-time performance and footfall metrics',
        'regex': r'<div[^>]*>\s*<h1[^>]*>Event Analytics & Insights</h1>\s*<p[^>]*>.*?Real-time performance and footfall metrics\s*</p>\s*</div>'
    },
    {
        'file': 'src/components/organizer/OrganizerExhibitors.tsx',
        'theme': 'green',
        'icon': 'Building2',
        'title': 'Exhibitor Directory & Footfall',
        'subtitle': 'Manage sponsors and booth allocations',
        'regex': r'<div>\s*<h1[^>]*>Exhibitor Directory & Footfall</h1>\s*<p[^>]*>.*?Manage sponsors and booth allocations\s*</p>\s*</div>'
    }
]

for item in updates:
    if not os.path.exists(item['file']):
        continue
        
    with open(item['file'], 'r') as f:
        content = f.read()
        
    # Import PageHeader
    if 'PageHeader' not in content:
        import_stmt = "import { PageHeader } from '../shared/PageHeader';\n"
        # Find last import
        import_match = list(re.finditer(r'^import .*?;', content, re.MULTILINE))
        if import_match:
            last_import = import_match[-1]
            content = content[:last_import.end()] + '\n' + import_stmt + content[last_import.end():]
            
    # Ensure Icon is imported from lucide-react
    if item['icon'] not in content:
        content = re.sub(r'(import\s+\{[^}]*)(\}\s+from\s+[\'"]lucide-react[\'"])', r'\1, ' + item['icon'] + r' \2', content)

    # Replace header block
    replacement = f'<PageHeader title="{item["title"]}" subtitle="{item["subtitle"]}" icon={{{item["icon"]}}} theme="{item["theme"]}" />'
    
    # Try regex first
    new_content, count = re.subn(item['regex'], replacement, content, flags=re.DOTALL)
    
    if count == 0:
        # Fallback to a simpler regex or manual search if the strict one fails
        print(f"Failed to match header in {item['file']}")
    else:
        with open(item['file'], 'w') as f:
            f.write(new_content)
        print(f"Patched {item['file']}")

