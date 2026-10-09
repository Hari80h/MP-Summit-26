with open('src/components/delegate/DelegateSpeakers.tsx', 'r') as f:
    c = f.read()

# Make Speakers match People EXACTLY
old_speaker_card = 'className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] hover:border-[#181818]/40 transition-all cursor-pointer shadow-sm flex flex-col gap-2"'
new_speaker_card = 'className="bg-white p-2.5 rounded-lg border border-[#DEDCD7] hover:border-[#181818]/30 transition-all shadow-sm cursor-pointer flex items-center justify-between gap-2"'
c = c.replace(old_speaker_card, new_speaker_card)

# Shrink Avatar
c = c.replace('w-11 h-11', 'w-8 h-8')
c = c.replace('text-[12px] text-[#181818] flex-shrink-0">', 'text-[12px] text-[#181818] flex-shrink-0 shadow-sm border border-[#E5E7EB]">')
c = c.replace('object-cover flex-shrink-0"', 'object-cover flex-shrink-0 shadow-sm border border-[#E5E7EB]"')

# Make button compact and right-aligned
old_btn = 'className={`w-full py-1.5 rounded-md text-[11px] font-bold transition-all active:scale-95 border ${'
new_btn = 'className={`flex-shrink-0 h-8 px-2.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 border ${'
c = c.replace(old_btn, new_btn)

old_btn_span = '<span className="flex items-center justify-center gap-1.5">'
new_btn_span = ''
old_btn_span_end = '</span>'
# Wait, I'll just regex the whole button to make it exactly like DelegatePeople

with open('src/components/delegate/DelegateSpeakers.tsx', 'w') as f:
    f.write(c)

# Now fix Polls
with open('src/components/delegate/DelegatePolls.tsx', 'r') as f:
    p = f.read()

p = p.replace('rounded-[14px] p-3 border', 'rounded-lg p-2.5 border')
p = p.replace('text-[15px] font-bold text-[#181818] leading-snug mb-3', 'text-[13px] font-bold text-[#181818] leading-snug mb-2')
p = p.replace('px-2 py-1 rounded-md text-[11px]', 'px-1.5 py-0.5 rounded text-[10px]')
p = p.replace('w-1.5 h-1.5', 'w-1 h-1')
p = p.replace('px-3 py-2', 'px-2 py-1.5')
p = p.replace('gap-2 mb-2', 'gap-1.5 mb-1.5')

with open('src/components/delegate/DelegatePolls.tsx', 'w') as f:
    f.write(p)
print("Compressed Speakers and Polls to match People/Schedule")
