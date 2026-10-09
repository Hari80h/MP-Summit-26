import re
import glob

files = glob.glob('src/components/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r') as f:
        c = f.read()

    if '<PageHeader' in c:
        # Find all lucide-react imports
        lucide_matches = list(re.finditer(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"];?', c))
        
        all_lucide_imports = set()
        for match in lucide_matches:
            # Extract names, splitting by comma and stripping whitespace
            names = [n.strip() for n in match.group(1).split(',')]
            for n in names:
                if n:
                    all_lucide_imports.add(n)
        
        # Determine the icons we actually need in this file based on what's used
        icons_to_add = ['Calendar', 'Users', 'Building2', 'Mic', 'User', 'BarChart2', 'LineChart', 'Briefcase']
        for icon in icons_to_add:
            if icon in c and f'<{icon}' not in c and f'={{{icon}}}' in c: # If used as icon={X}
                all_lucide_imports.add(icon)
                
        # Remove all existing lucide-react imports
        c = re.sub(r'import\s+\{[^}]+\}\s+from\s+[\'"]lucide-react[\'"];?', '', c)
        
        # Remove all existing PageHeader imports
        c = re.sub(r'import\s+\{\s*PageHeader\s*\}\s+from\s+[\'"]\.\./shared/PageHeader[\'"];?', '', c)
        
        # Clean up empty lines created
        c = re.sub(r'\n{3,}', '\n\n', c)
        
        # Re-inject them at the top
        lucide_str = 'import { ' + ', '.join(sorted(list(all_lucide_imports))) + " } from 'lucide-react';"
        pageheader_str = "import { PageHeader } from '../shared/PageHeader';"
        
        c = re.sub(r'(import React.*?;\n)', r'\1' + pageheader_str + '\n' + lucide_str + '\n', c, count=1)
        
        with open(file, 'w') as f:
            f.write(c)
        print(f"Cleaned {file}")
