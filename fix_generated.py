import sys
content = open('src/lib/generatedData.ts').read()
content = content.replace(r'\${fn}', '${fn}')
content = content.replace(r'\${ln}', '${ln}')
content = content.replace(r'\${companyName.replace(', '${companyName.replace(')
content = content.replace(r'\${prefix}', '${prefix}')
content = content.replace(r'\${boothNum}', '${boothNum}')
content = content.replace('https://ui-avatars.com/api/?name=${fn}+${ln}&background=F3F4F6&color=181818', 'https://i.pravatar.cc/150?u=${fn}+${ln}')
open('src/lib/generatedData.ts', 'w').write(content)
