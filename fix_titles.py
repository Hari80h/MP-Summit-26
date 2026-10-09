import sys

with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    h = f.read()

h = h.replace('text-[15px] font-bold', 'text-[14px] font-bold')
# Also replace mb-3 for section headers if possible without breaking
h = h.replace('mb-3', 'mb-2.5')
h = h.replace('space-y-3', 'space-y-2.5')

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(h)

print("Adjusted section headers and spacing")
