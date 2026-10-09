import re
with open('src/lib/mockData.ts', 'r') as f:
    content = f.read()

content = re.sub(r'\}\n\s*\{', '},\n  {', content)

with open('src/lib/mockData.ts', 'w') as f:
    f.write(content)
