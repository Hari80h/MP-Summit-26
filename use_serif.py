with open('src/components/shared/PageHeader.tsx', 'r') as f:
    c = f.read()

# Make PageHeader title serif
c = c.replace('text-[22px] font-black', 'text-[24px] font-serif font-medium')
with open('src/components/shared/PageHeader.tsx', 'w') as f:
    f.write(c)

with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    c2 = f.read()

# Make Home greeting name serif
c2 = c2.replace('text-[18px] font-extrabold text-[#181818] tracking-tight', 'text-[20px] font-serif font-medium text-[#181818]')
# Make Home ITS 2026 card title serif
c2 = c2.replace('text-xl font-black text-white tracking-tight', 'text-[22px] font-serif font-medium text-white tracking-wide')
with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(c2)

print("Applied serif to important headings")
