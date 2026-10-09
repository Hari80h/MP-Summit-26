with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    c = f.read()

c = c.replace('w-[38px] h-[38px]', 'w-[42px] h-[42px]')
c = c.replace('w-[14px] h-[14px]', 'w-4 h-4')

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(c)
print("Bumped avatar size")
