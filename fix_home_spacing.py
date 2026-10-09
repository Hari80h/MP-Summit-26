with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    c = f.read()

c = c.replace('mb-0.5', '')
c = c.replace('grid grid-cols-4 gap-2 pb-1', 'grid grid-cols-4 gap-2')
# Ensure no stray double spaces in classNames
c = c.replace('  ', ' ')

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(c)

