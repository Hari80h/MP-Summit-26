with open('src/components/shared/PageHeader.tsx', 'r') as f:
    c = f.read()

c = c.replace('text-[17px] font-extrabold', 'text-[20px] font-black')
c = c.replace('text-[11.5px]', 'text-[12.5px]')
c = c.replace('leading-snug font-medium pr-2', 'leading-tight font-semibold pr-2')

# Also let's slightly bump the icon container to match the bigger text
c = c.replace('w-11 h-11', 'w-12 h-12')
c = c.replace('w-[22px] h-[22px]', 'w-6 h-6')

with open('src/components/shared/PageHeader.tsx', 'w') as f:
    f.write(c)

print("Scaled up header typography")
