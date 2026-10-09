import sys
content = open('src/lib/generatedData.ts').read()
content = content.replace(r'\${i}', '${i}')
open('src/lib/generatedData.ts', 'w').write(content)
