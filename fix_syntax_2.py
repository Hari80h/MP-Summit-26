import re

with open('src/lib/mockData.ts', 'r') as f:
    content = f.read()

# Fix before spread
content = re.sub(r'\n\s*\n\s*\.\.\.', '\n  },\n  ...', content)
# Fix before ];
content = re.sub(r'\n\s*\n\s*\];', '\n  }\n];', content)

with open('src/lib/mockData.ts', 'w') as f:
    f.write(content)
