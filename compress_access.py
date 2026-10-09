with open('src/components/auth/AccessScreen.tsx', 'r') as f:
    c = f.read()

c = c.replace('px-3 pt-8 pb-3', 'px-4 pt-6 pb-4')
c = c.replace('mb-7', 'mb-5')
c = c.replace('<h2 className="text-[12px] font-bold text-[#181818]">Enter your event</h2>', '<h2 className="text-[15px] font-bold text-[#181818] tracking-tight">Enter your event</h2>')
c = c.replace('space-y-3', 'space-y-2.5')
c = c.replace('py-2.5', 'py-2')
c = c.replace('h-[44px]', 'h-[40px]')
c = c.replace('mb-2">', 'mb-1.5">') # Shrink label margin
c = c.replace('mt-auto pt-3', 'mt-auto pt-2')

with open('src/components/auth/AccessScreen.tsx', 'w') as f:
    f.write(c)

