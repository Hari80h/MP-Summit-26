import sys

# 1. Update DelegateHome.tsx
with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    h = f.read()

# Root padding and gap
h = h.replace('className="flex-1 px-2 pt-4 pb-20 space-y-4 bg-[#EFEBE5] overflow-y-auto"',
              'className="flex-1 px-2 pt-3 pb-20 space-y-3 bg-[#EFEBE5] overflow-y-auto"')

# Top Header
h = h.replace('rounded-[28px] p-5 shadow-sm relative overflow-hidden mt-1 mb-2',
              'rounded-3xl p-4 shadow-sm relative overflow-hidden mb-1')
h = h.replace('w-40 h-40', 'w-32 h-32')
h = h.replace('w-32 h-32', 'w-24 h-24')
h = h.replace('text-[11px] uppercase', 'text-[10px] uppercase')
h = h.replace('text-[24px] font-extrabold', 'text-[22px] font-extrabold')
h = h.replace('text-[13px] font-semibold', 'text-[12px] font-semibold')
h = h.replace('w-14 h-14 rounded-full', 'w-12 h-12 rounded-full')
h = h.replace('w-4 h-4 bg-[#10B981]', 'w-3.5 h-3.5 bg-[#10B981]')

# Event Card
h = h.replace('rounded-2xl p-3.5 shadow-sm', 'rounded-2xl p-3 shadow-sm')
h = h.replace('text-lg font-bold', 'text-[17px] font-bold')
h = h.replace('mt-3 flex items-center', 'mt-2 flex items-center')
h = h.replace('px-2 py-1 rounded-lg', 'px-1.5 py-1 rounded-md')
h = h.replace('text-[11px] font-bold text-[#E5E5E5] bg-[#27272A] px-2 py-0.5 rounded-md', 
              'text-[10px] font-bold text-[#E5E5E5] bg-[#27272A] px-1.5 py-0.5 rounded-md')
h = h.replace('px-2 py-0.5 rounded-full', 'px-1.5 py-0.5 rounded-full')

# Quick Links
h = h.replace('min-w-[92px] shrink-0', 'min-w-[78px] shrink-0')
h = h.replace('p-3.5 bg-white rounded-2xl', 'p-2.5 py-3 bg-white rounded-xl')
h = h.replace('w-6 h-6 mb-2', 'w-5 h-5 mb-1.5')
h = h.replace('text-[13px] font-bold text-[#181818]">{item.label}', 'text-[11.5px] font-bold text-[#181818]">{item.label}')
h = h.replace('gap-3 overflow-x-auto', 'gap-2 overflow-x-auto')

# AI Recommendations
h = h.replace('w-[220px] flex flex-col', 'w-[200px] flex flex-col')
h = h.replace('p-3 rounded-xl border', 'p-2.5 rounded-xl border')
h = h.replace('gap-3 mb-3', 'gap-2.5 mb-2.5')
h = h.replace('w-10 h-10 rounded-full', 'w-9 h-9 rounded-full')
h = h.replace('text-[14px] font-bold text-[#181818]', 'text-[13px] font-bold text-[#181818]')
h = h.replace('text-[12px] text-[#6B6B6B]', 'text-[11px] text-[#6B6B6B]')
h = h.replace('py-2 rounded-xl text-[13px]', 'py-1.5 rounded-lg text-[12px]')

# Companies
h = h.replace('p-3 rounded-xl border border-[#DEDCD7] flex flex-col', 
              'p-2.5 rounded-xl border border-[#DEDCD7] flex flex-col')
h = h.replace('w-12 h-12 rounded-xl', 'w-10 h-10 rounded-lg')
h = h.replace('mb-3', 'mb-2')

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(h)


# 2. Update DelegateBottomNav.tsx
with open('src/components/delegate/DelegateBottomNav.tsx', 'r') as f:
    b = f.read()

b = b.replace('pb-1 px-3 pt-1.5', 'pb-0.5 px-2 pt-1')
b = b.replace('w-[58px] h-[58px]', 'w-[52px] h-[52px]')
b = b.replace('-top-[35px]', '-top-[30px]')
b = b.replace('border-[3.5px] border-white ring-[3.5px]', 'border-[3px] border-white ring-[3px]')
b = b.replace('w-[26px] h-[26px]', 'w-[24px] h-[24px]')
b = b.replace('w-[22px] h-[22px]', 'w-[20px] h-[20px]')
b = b.replace('text-[11px] font-bold', 'text-[10px] font-bold')
b = b.replace('text-[10px] font-medium', 'text-[9px] font-medium')
b = b.replace('min-h-[44px]', 'min-h-[40px]')

with open('src/components/delegate/DelegateBottomNav.tsx', 'w') as f:
    f.write(b)

print("Applied responsive scale-down")
