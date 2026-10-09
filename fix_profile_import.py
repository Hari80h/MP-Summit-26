with open('src/components/delegate/DelegateProfile.tsx', 'r') as f:
    c = f.read()

if "import { PageHeader } from '../shared/PageHeader';" not in c:
    c = c.replace("import { Pencil, Settings,", "import { PageHeader } from '../shared/PageHeader';\nimport { Pencil, Settings,")

with open('src/components/delegate/DelegateProfile.tsx', 'w') as f:
    f.write(c)
print("Import fixed")
