with open('src/components/delegate/DelegateProfile.tsx', 'r') as f:
    c = f.read()

c = c.replace('className="w-8 h-8 rounded-full object-cover shadow-sm border border-[#E5E7EB] flex-shrink-0"', 'className="w-[42px] h-[42px] rounded-full object-cover shadow-sm border border-[#E5E7EB] flex-shrink-0"')
c = c.replace('className="w-8 h-8 rounded-full bg-[#F6F4F0] border border-[#E5E7EB] text-[#181818] flex items-center justify-center font-bold text-[12px] shadow-sm flex-shrink-0"', 'className="w-[42px] h-[42px] rounded-full bg-[#F6F4F0] border border-[#E5E7EB] text-[#181818] flex items-center justify-center font-bold text-[14px] shadow-sm flex-shrink-0"')

with open('src/components/delegate/DelegateProfile.tsx', 'w') as f:
    f.write(c)

