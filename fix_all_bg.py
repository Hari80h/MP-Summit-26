import sys
import os

directory = 'src/components/delegate/'

for filename in os.listdir(directory):
    if filename.endswith(".tsx"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r') as f:
            code = f.read()
        
        # Replace FAFAFA with F6F4F0 for consistent background
        if 'bg-[#FAFAFA]' in code:
            code = code.replace('bg-[#FAFAFA]', 'bg-[#F6F4F0]')
            with open(filepath, 'w') as f:
                f.write(code)
            print(f"Updated {filename}")

print("Done")
