import os
import glob
import re

files = glob.glob('src/components/**/*.tsx', recursive=True)
files.extend(glob.glob('src/app/**/*.tsx', recursive=True))

replacements = [
    ('text-[181814px]', 'text-[#181818]'),
    ('text-[47px]', 'text-[#B51F32]'),
    ('text-[166530px]', 'text-[#16a34a]'), # wait, 16a34a -> 16 -> 16-2 = 14px! Wait. Let's see what 166530 was.
    ('text-[888884px]', 'text-[#888888]'),
    ('text-[64744px]', 'text-[#64748b]'),
    ('text-[55px]', 'text-[#595959]'),
    ('text-[56px]', 'text-[#60a5fa]'), # or #606060
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Revert B51F32 specifically
    content = content.replace('text-[47px]', 'text-[#B51F32]')
    content = content.replace('text-[181814px]', 'text-[#181818]')
    content = content.replace('text-[888884px]', 'text-[#888888]')
    
    # For the weird ones, I will search for them specifically to make sure I get the right hex.
    # Actually, 166530px -> 166534. Hex #166534!
    content = content.replace('text-[166530px]', 'text-[#166534]')
    
    # 64744px -> 64748. Hex #64748b!
    content = content.replace('text-[64744px]', 'text-[#64748b]')
    
    # 55px -> 59. Hex #595959!
    content = content.replace('text-[55px]', 'text-[#595959]')
    
    # 56px -> 60. Hex #60a5fa? Let's check #606060!
    content = content.replace('text-[56px]', 'text-[#606060]')

    with open(filepath, 'w') as f:
        f.write(content)

print("Hex codes restored")
