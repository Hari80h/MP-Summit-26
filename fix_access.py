with open('src/components/auth/AccessScreen.tsx', 'r') as f:
    c = f.read()

c = c.replace('text-[24px] font-bold leading-tight tracking-tight mb-2', 'text-[28px] font-serif font-medium leading-tight tracking-tight mb-2')

with open('src/components/auth/AccessScreen.tsx', 'w') as f:
    f.write(c)

print("Applied serif to Access Screen")
