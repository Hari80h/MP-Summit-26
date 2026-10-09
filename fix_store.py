import re

with open('src/lib/store.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    line_num = i + 1
    # Skip the messed up lines 135-146
    if 135 <= line_num <= 146:
        continue
    
    new_lines.append(line)

with open('src/lib/store.tsx', 'w') as f:
    f.writelines(new_lines)
