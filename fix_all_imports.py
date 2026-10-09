import re
import glob

files = glob.glob('src/components/**/*.tsx', recursive=True)
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    if '<PageHeader' in content:
        if 'PageHeader' not in content[:500]:
            content = content.replace("import React", "import React;\nimport { PageHeader } from '../shared/PageHeader';\nimport { Calendar, Users, Building2, Mic, User, BarChart2, LineChart, Briefcase } from 'lucide-react'", 1)
            with open(file, 'w') as f:
                f.write(content)
            print(f"Fixed imports for {file}")
