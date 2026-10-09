with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    c = f.read()

c = c.replace('className="w-8 h-8 rounded-full border-[2px] border-white object-cover shadow-sm"', 'className="w-[38px] h-[38px] rounded-full border-[2.5px] border-white object-cover shadow-sm"')
c = c.replace('className="w-8 h-8 rounded-full bg-[#181818] text-white flex items-center justify-center font-bold text-lg border-[2.5px] border-white shadow-sm"', 'className="w-[38px] h-[38px] rounded-full bg-[#181818] text-white flex items-center justify-center font-bold text-lg border-[2.5px] border-white shadow-sm"')
c = c.replace('className="absolute bottom-0 -right-0.5 w-3.5 h-3.5 bg-[#10B981] border-[2.5px] border-white rounded-full"', 'className="absolute bottom-0 -right-0.5 w-[14px] h-[14px] bg-[#10B981] border-[2.5px] border-white rounded-full"')

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(c)

print("Resized avatar in DelegateHome")
