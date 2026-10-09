with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    c = f.read()

# 1. Container spacing
c = c.replace(
    'space-y-2 bg-[#F6F4F0] overflow-y-auto',
    'space-y-2.5 bg-[#F6F4F0] overflow-y-auto'
)

# 2. Top Greeting: padding p-3 -> p-3.5, name 20px -> 21px, role 11px -> 11.5px
c = c.replace(
    'rounded-[20px] p-3 shadow-sm relative overflow-hidden ',
    'rounded-[20px] p-3.5 shadow-sm relative overflow-hidden'
)
c = c.replace(
    'text-[9px] uppercase tracking-widest font-extrabold text-[#737373] mb-1',
    'text-[9.5px] uppercase tracking-widest font-extrabold text-[#737373] mb-1'
)
c = c.replace(
    'text-[20px] font-serif font-medium text-[#181818] leading-none mb-1',
    'text-[21px] font-serif font-medium text-[#181818] leading-none mb-1'
)
c = c.replace(
    'text-[11px] font-semibold text-[#6B6B6B] leading-none',
    'text-[11.5px] font-semibold text-[#6B6B6B] leading-none'
)

# 3. Event Card: p-2.5 -> p-3, title 13px -> 13.5px, pill padding
c = c.replace(
    'bg-[#18181B] rounded-[14px] p-2.5 shadow-sm',
    'bg-[#18181B] rounded-[16px] p-3 shadow-sm'
)
c = c.replace(
    'text-[13px] font-bold text-white tracking-tight',
    'text-[13.5px] font-bold text-white tracking-tight'
)
c = c.replace(
    'mt-1 text-[11px] text-[#A1A1AA] space-y-0.5',
    'mt-1.5 text-[11px] text-[#A1A1AA] space-y-1'
)

# 4. Quick Links: header margin, button padding py-3 -> py-3.5, text 11px -> 11.5px
c = c.replace(
    'text-[14px] font-bold text-[#181818] tracking-tight mb-1">Quick Links',
    'text-[14px] font-bold text-[#181818] tracking-tight mb-1.5">Quick Links'
)
c = c.replace(
    'py-3 px-1 bg-white rounded-[10px] shadow-sm',
    'py-3.5 px-1 bg-white rounded-[12px] shadow-sm'
)
c = c.replace(
    'text-[11px] font-bold text-[#181818] tracking-tight">{item.label}',
    'text-[11.5px] font-bold text-[#181818] tracking-tight">{item.label}'
)

# 5. My AI Recommendations: header margin, card padding p-2 -> p-2.5, connect button py-1 -> py-1.5
c = c.replace(
    'text-[14px] font-bold text-[#181818] tracking-tight">My AI Recommendations</h3>',
    'text-[14px] font-bold text-[#181818] tracking-tight">My AI Recommendations</h3>'
)
c = c.replace(
    'bg-[#FFFFFF] p-2 rounded-lg border border-[#DEDCD7] flex-shrink-0 w-[180px]',
    'bg-[#FFFFFF] p-2.5 rounded-xl border border-[#DEDCD7] flex-shrink-0 w-[182px]'
)
c = c.replace(
    'w-full py-1 rounded-md text-[11px] font-bold transition-all active:scale-95 border',
    'w-full py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 border'
)

# 6. Companies to Explore: card padding p-2 -> p-2.5, logo w-8 h-8 -> w-9 h-9, name 12px -> 12.5px
c = c.replace(
    'bg-white p-2 rounded-lg border border-[#DEDCD7] hover:border-[#181818]/40 transition-all cursor-pointer shadow-sm flex flex-col gap-2',
    'bg-white p-2.5 rounded-xl border border-[#DEDCD7] hover:border-[#181818]/40 transition-all cursor-pointer shadow-sm flex flex-col gap-2'
)
c = c.replace(
    'w-8 h-8 rounded-xl bg-[#EFEEEA] overflow-hidden flex items-center justify-center font-bold text-lg',
    'w-9 h-9 rounded-xl bg-[#EFEEEA] overflow-hidden flex items-center justify-center font-bold text-lg'
)
c = c.replace(
    'text-[12px] font-bold text-[#181818] leading-snug truncate">{company.company}',
    'text-[12.5px] font-bold text-[#181818] leading-snug truncate">{company.company}'
)
c = c.replace(
    'text-[13px] text-[#6B6B6B] mt-0.5 truncate">{company.category}',
    'text-[12px] text-[#6B6B6B] mt-0.5 truncate">{company.category}'
)

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(c)

print("Home screen sizing successfully updated!")
