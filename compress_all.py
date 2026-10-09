import sys
import os
import glob

files = glob.glob('src/components/delegate/*.tsx')
files.extend(glob.glob('src/components/auth/*.tsx'))
files.extend(glob.glob('src/app/page.tsx'))

replacements = [
    ('pt-10 pb-20 space-y-4', 'pt-2 pb-16 space-y-2'),
    ('pt-5 pb-24 space-y-4', 'pt-2 pb-16 space-y-2'),
    ('pt-4 pb-20 space-y-4', 'pt-2 pb-16 space-y-2'),
    ('px-4 py-5 space-y-4', 'px-3 py-3 space-y-2'),
    ('p-4 rounded-2xl', 'p-3 rounded-[14px]'),
    ('p-5 rounded-2xl', 'p-3 rounded-[14px]'),
    ('p-3 bg-white rounded-xl', 'p-2.5 bg-white rounded-lg'),
    ('py-2 rounded-xl text-[13px]', 'py-1.5 rounded-lg text-[11px]'),
    ('gap-3 overflow-x-auto', 'gap-2 overflow-x-auto'),
    ('mb-3', 'mb-2'),
    ('mb-4', 'mb-2'),
    ('mb-5', 'mb-2.5'),
    ('space-y-4', 'space-y-2'),
    ('space-y-3', 'space-y-2'),
    ('text-[22px]', 'text-[18px]'),
    ('text-[20px]', 'text-[18px]'),
    ('text-[16px]', 'text-[14px]'),
    ('text-[15px]', 'text-[13px]'),
    ('w-12 h-12', 'w-10 h-10'),
    ('w-10 h-10', 'w-8 h-8'),
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Compressed {len(files)} files")
