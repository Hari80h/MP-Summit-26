import re

def patch(file, theme, icon, title, subtitle, regex_pattern, replacement, onBack=None):
    try:
        with open(file, 'r') as f:
            content = f.read()
            
        if 'PageHeader' not in content:
            import_stmt = "import { PageHeader } from '../shared/PageHeader';\n"
            if 'shared/PageHeader' not in content:
                import_match = list(re.finditer(r'^import .*?;', content, re.MULTILINE))
                if import_match:
                    last_import = import_match[-1]
                    content = content[:last_import.end()] + '\n' + import_stmt + content[last_import.end():]
                else:
                    content = import_stmt + content
                
        if icon not in content:
            content = re.sub(r'(import\s+\{[^}]*)(\}\s+from\s+[\'"]lucide-react[\'"])', r'\1, ' + icon + r' \2', content)

        if onBack:
            new_val = f'<PageHeader title="{title}" subtitle="{subtitle}" icon={{{icon}}} theme="{theme}" onBack={{{onBack}}} />'
        else:
            new_val = f'<PageHeader title="{title}" subtitle="{subtitle}" icon={{{icon}}} theme="{theme}" />'
            
        content, count = re.subn(regex_pattern, new_val, content, flags=re.DOTALL)
        
        if count > 0:
            with open(file, 'w') as f:
                f.write(content)
            print(f"Success: {file}")
        else:
            print(f"Fail: {file}")
    except Exception as e:
        print(f"Error {file}: {e}")

# 1. Companies
patch(
    'src/components/delegate/DelegateCompanies.tsx', 
    'blue', 'Building2', 'Exhibitor Directory', 'Explore 400+ leading tech companies and startups',
    r'<div className="flex items-center gap-2 mb-3">\s*<button.*?ChevronLeft.*?</button>\s*<h1[^>]*>Exhibitor Directory</h1>\s*</div>\s*<div className="relative">',
    None, # We'll replace it inside the div so it needs the search bar preserved
    onBack="() => setActiveDelegateTab('home')"
)
