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
                
                if '#EFEBE5' in code:
                    code = code.replace('#EFEBE5', '#F6F4F0')
                    with open(filepath, 'w') as f:
                        f.write(code)
                    print(f"Reverted {filepath}")

if os.path.exists('tailwind.config.js'):
    with open('tailwind.config.js', 'r') as f:
        code = f.read()
    if '#EFEBE5' in code:
        code = code.replace('#EFEBE5', '#F6F4F0')
        with open('tailwind.config.js', 'w') as f:
            f.write(code)
        print("Reverted tailwind.config.js")

print("Done")
