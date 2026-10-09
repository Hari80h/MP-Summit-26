import re
import glob

files = glob.glob('src/components/**/*.tsx', recursive=True)
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    if '<PageHeader' in content:
        content = content.replace("import { PageHeader } from '../shared/PageHeader'", "")
        content = content.replace("import { Calendar, Users, Building2, Mic, User, BarChart2, LineChart, Briefcase } from 'lucide-react'", "")
        
        # Inject cleanly at top
        content = re.sub(r"import React(.*?);", r"import React\1;\nimport { PageHeader } from '../shared/PageHeader';\nimport { Calendar, Users, Building2, Mic, User, BarChart2, LineChart, Briefcase } from 'lucide-react';", content, count=1)
        
        with open(file, 'w') as f:
            f.write(content)
        print(f"Refixed imports for {file}")
