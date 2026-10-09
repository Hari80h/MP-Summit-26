with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    c = f.read()

old_container = 'className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2"'
new_container = 'className="grid grid-cols-4 gap-2 pb-1"'

old_button = 'className="flex flex-col items-center justify-center p-2.5 py-2.5 bg-white rounded-[10px] shadow-sm border border-[#DEDCD7] min-w-[74px] shrink-0 active:scale-95 transition-all"'
new_button = 'className="flex flex-col items-center justify-center py-3 px-1 bg-white rounded-[10px] shadow-sm border border-[#DEDCD7] active:scale-95 transition-all w-full"'

old_icon = 'className="w-[18px] h-[18px] mb-1.5 text-[#181818]"'
new_icon = 'className="w-5 h-5 mb-1.5 text-[#181818]"'

old_text = 'className="text-[11px] font-bold text-[#181818]"'
new_text = 'className="text-[11px] font-bold text-[#181818] tracking-tight"'

c = c.replace(old_container, new_container)
c = c.replace(old_button, new_button)
c = c.replace(old_icon, new_icon)
c = c.replace(old_text, new_text)

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(c)

print("Quick Links updated to grid-cols-4")
