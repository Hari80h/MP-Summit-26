with open('src/lib/store.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    line_num = i + 1
    if 749 <= line_num <= 750:
        continue
    new_lines.append(line)

with open('src/lib/store.tsx', 'w') as f:
    f.writelines(new_lines)
