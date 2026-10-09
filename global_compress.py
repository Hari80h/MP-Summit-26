import os
import glob

# Collect all tsx files
files = glob.glob('src/components/**/*.tsx', recursive=True)
files.extend(glob.glob('src/app/**/*.tsx', recursive=True))

replacements = [
    # Page Root Containers
    ('pt-10 pb-20 space-y-4', 'pt-2 pb-16 space-y-2'),
    ('pt-5 pb-24 space-y-4', 'pt-2 pb-16 space-y-2'),
    ('pt-4 pb-20 space-y-4', 'pt-2 pb-16 space-y-2'),
    ('px-4 py-5 space-y-4', 'px-3 py-3 space-y-2'),
    ('p-5 space-y-5', 'p-3 space-y-3'),
    ('p-6 space-y-6', 'p-4 space-y-3'),
    ('p-4 space-y-4', 'p-2.5 space-y-2'),
    ('pb-24 space-y-4', 'pb-16 space-y-2'),
    ('pb-20 space-y-4', 'pb-16 space-y-2'),
    ('space-y-4', 'space-y-2'),
    ('space-y-5', 'space-y-3'),
    ('space-y-6', 'space-y-3'),
    
    # Outer Cards
    ('p-4 rounded-2xl', 'p-3 rounded-[14px]'),
    ('p-5 rounded-2xl', 'p-3 rounded-[14px]'),
    ('p-6 rounded-3xl', 'p-4 rounded-[20px]'),
    ('p-5 rounded-3xl', 'p-4 rounded-[20px]'),
    ('p-4 bg-white rounded-2xl', 'p-3 bg-white rounded-[14px]'),
    
    # Inner Cards
    ('p-3 bg-white rounded-xl', 'p-2 bg-white rounded-lg'),
    ('p-3 rounded-xl', 'p-2 rounded-lg'),
    ('p-4 rounded-xl', 'p-2.5 rounded-lg'),
    
    # Text sizes (Headers)
    ('text-[26px]', 'text-[22px]'),
    ('text-[24px]', 'text-[20px]'),
    ('text-[22px]', 'text-[18px]'),
    ('text-2xl', 'text-[18px]'),
    ('text-xl', 'text-[16px]'),
    ('text-lg', 'text-[15px]'),
    
    # Text sizes (Body)
    ('text-[16px]', 'text-[14px]'),
    ('text-[15px]', 'text-[13px]'),
    ('text-[14px] font-bold', 'text-[13px] font-bold'),
    ('text-[14px] font-medium', 'text-[12px] font-medium'),
    ('text-[13px] text-[#6B6B6B]', 'text-[11px] text-[#6B6B6B]'),
    ('text-[13px] font-semibold', 'text-[11.5px] font-semibold'),
    ('text-sm', 'text-[12px]'),
    
    # Avatars and Icons
    ('w-16 h-16', 'w-12 h-12'),
    ('w-14 h-14', 'w-11 h-11'),
    ('w-12 h-12', 'w-10 h-10'),
    ('w-10 h-10', 'w-8 h-8'),
    
    # Margins
    ('mb-8', 'mb-5'),
    ('mb-6', 'mb-4'),
    ('mb-5', 'mb-3'),
    ('mb-4', 'mb-2'),
    ('mb-3', 'mb-1.5'),
    
    # Padding / Gaps
    ('gap-4', 'gap-2.5'),
    ('gap-3', 'gap-2'),
    ('gap-5', 'gap-3'),
    ('gap-6', 'gap-3'),
    
    # Buttons
    ('py-3.5 rounded-xl text-[15px]', 'py-2.5 rounded-lg text-[13px]'),
    ('py-3 rounded-xl text-[14px]', 'py-2 rounded-lg text-[13px]'),
    ('py-2 rounded-xl text-[13px]', 'py-1.5 rounded-lg text-[11px]'),
    ('py-2 px-4 rounded-xl', 'py-1.5 px-3 rounded-lg'),
    ('h-[52px]', 'h-[44px]'),
    ('h-12', 'h-10'),
]

for filepath in files:
    # Skip bottom navs as they were already custom-tuned
    if 'BottomNav' in filepath:
        continue
        
    # Skip Home page to not over-compress it
    if 'DelegateHome' in filepath:
        continue

    with open(filepath, 'r') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Compressed {len(files)} files globally.")
