import sys
import os

directories = ['src/components', 'src/app', 'src/lib']

for root_dir in directories:
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(('.tsx', '.ts', '.css')):
                filepath = os.path.join(dirpath, filename)
                with open(filepath, 'r') as f:
                    code = f.read()
                
                if '#F6F4F0' in code:
                    code = code.replace('#F6F4F0', '#EFEBE5')
                    with open(filepath, 'w') as f:
                        f.write(code)
                    print(f"Updated {filepath}")

# Also check tailwind.config.js if used
if os.path.exists('tailwind.config.js'):
    with open('tailwind.config.js', 'r') as f:
        code = f.read()
    if '#F6F4F0' in code:
        code = code.replace('#F6F4F0', '#EFEBE5')
        with open('tailwind.config.js', 'w') as f:
            f.write(code)
        print("Updated tailwind.config.js")

print("Done")
