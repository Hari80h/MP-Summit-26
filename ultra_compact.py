import sys

# 1. Update DelegateHome.tsx
with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    h = f.read()

# Root Container
h = h.replace('className="flex-1 px-2 pt-3 pb-20 space-y-3 bg-[#EFEBE5] overflow-y-auto"',
              'className="flex-1 px-2 pt-2 pb-16 space-y-2 bg-[#EFEBE5] overflow-y-auto"')

# Section Titles
h = h.replace('text-[14px] font-bold', 'text-[13px] font-bold')
h = h.replace('mb-2.5', 'mb-1.5')

# Top Header
h = h.replace('rounded-3xl p-4 shadow-sm relative overflow-hidden mb-1',
              'rounded-[20px] p-3 shadow-sm relative overflow-hidden mb-0.5')
h = h.replace('text-[10px] uppercase tracking-widest font-extrabold text-[#737373] mb-1.5',
              'text-[9px] uppercase tracking-widest font-extrabold text-[#737373] mb-1')
h = h.replace('text-[22px] font-extrabold text-[#181818] tracking-tight leading-none mb-2',
              'text-[18px] font-extrabold text-[#181818] tracking-tight leading-none mb-1')
h = h.replace('text-[12px] font-semibold text-[#6B6B6B]', 'text-[11px] font-semibold text-[#6B6B6B]')
h = h.replace('w-12 h-12 rounded-full border-[2.5px]', 'w-10 h-10 rounded-full border-[2px]')

# Event Card
h = h.replace('rounded-2xl p-3 shadow-sm', 'rounded-[14px] p-2.5 shadow-sm')
h = h.replace('mb-2', 'mb-1.5')
h = h.replace('text-[17px] font-bold', 'text-[15px] font-bold')
h = h.replace('mt-1.5 text-[12px]', 'mt-1 text-[11px]')
h = h.replace('mt-2 flex items-center', 'mt-1.5 flex items-center')
h = h.replace('px-1.5 py-1 rounded-md', 'px-1.5 py-0.5 rounded-md')

# Quick Links
h = h.replace('min-w-[78px]', 'min-w-[70px]')
h = h.replace('p-2.5 py-3 bg-white rounded-xl', 'p-2 py-2 bg-white rounded-lg')
h = h.replace('w-5 h-5 mb-1.5 text-[#181818]', 'w-4 h-4 mb-1 text-[#181818]')
h = h.replace('text-[11.5px]', 'text-[10px]')
h = h.replace('gap-2 overflow-x-auto', 'gap-1.5 overflow-x-auto')
h = h.replace('pb-2 -mx-2 px-2', 'pb-1 -mx-2 px-2')

# AI Recommendations
h = h.replace('w-[200px] flex flex-col', 'w-[180px] flex flex-col')
h = h.replace('p-2.5 rounded-xl border', 'p-2 rounded-lg border')
h = h.replace('gap-2.5 mb-2.5', 'gap-2 mb-1.5')
h = h.replace('w-9 h-9 rounded-full', 'w-8 h-8 rounded-full')
h = h.replace('text-[13px] font-bold text-[#181818]', 'text-[12px] font-bold text-[#181818]')
h = h.replace('text-[11px] text-[#6B6B6B]', 'text-[10px] text-[#6B6B6B]')
h = h.replace('py-1.5 rounded-lg text-[12px]', 'py-1 rounded-md text-[11px]')

# Companies
h = h.replace('grid grid-cols-2 gap-3', 'grid grid-cols-2 gap-2')
h = h.replace('p-2.5 rounded-xl border border-[#DEDCD7] flex flex-col',
              'p-2 rounded-lg border border-[#DEDCD7] flex flex-col')
h = h.replace('w-10 h-10 rounded-lg', 'w-8 h-8 rounded-md')
h = h.replace('mb-1.5', 'mb-1') # Note: mb-2 was changed to mb-1.5 in section titles, but I want to reduce this one too

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(h)


# 2. Update DelegateBottomNav.tsx
with open('src/components/delegate/DelegateBottomNav.tsx', 'r') as f:
    b = f.read()

b = b.replace('pb-0.5 px-2 pt-1', 'pb-0 px-2 pt-0.5')
b = b.replace('w-[52px] h-[52px]', 'w-[44px] h-[44px]')
b = b.replace('-top-[30px]', '-top-[24px]')
b = b.replace('border-[3px] border-white ring-[3px]', 'border-[2px] border-white ring-[2px]')
b = b.replace('w-[24px] h-[24px]', 'w-[20px] h-[20px]')
b = b.replace('w-[20px] h-[20px]', 'w-[18px] h-[18px]')
b = b.replace('text-[10px] font-bold', 'text-[9px] font-bold')
b = b.replace('text-[9px] font-medium', 'text-[8px] font-medium')
b = b.replace('min-h-[40px]', 'min-h-[36px]')

with open('src/components/delegate/DelegateBottomNav.tsx', 'w') as f:
    f.write(b)

print("Applied ultra-compact responsive scale-down")
