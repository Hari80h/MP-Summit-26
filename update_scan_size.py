with open('src/components/delegate/DelegateScan.tsx', 'r') as f:
    c = f.read()

# Change pb-[72px] to pb-1.5
c = c.replace('pb-[72px]', 'pb-1.5')

# Increase viewfinder height and reticle size
c = c.replace('h-[120px]', 'h-[165px]')
c = c.replace('w-24 h-24', 'w-32 h-32')
c = c.replace('w-4 h-4 border-t-2 border-l-2', 'w-5 h-5 border-t-[2.5px] border-l-[2.5px]')
c = c.replace('w-4 h-4 border-t-2 border-r-2', 'w-5 h-5 border-t-[2.5px] border-r-[2.5px]')
c = c.replace('w-4 h-4 border-b-2 border-l-2', 'w-5 h-5 border-b-[2.5px] border-l-[2.5px]')
c = c.replace('w-4 h-4 border-b-2 border-r-2', 'w-5 h-5 border-b-[2.5px] border-r-[2.5px]')
c = c.replace('w-6 h-6 text-white/30', 'w-7 h-7 text-white/30')

with open('src/components/delegate/DelegateScan.tsx', 'w') as f:
    f.write(c)

print("Updated scanner size and padding!")
