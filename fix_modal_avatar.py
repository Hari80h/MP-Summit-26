import re

with open('src/components/modals/PersonDetailModal.tsx', 'r') as f:
    c = f.read()

old_avatar_block = """<div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center font-medium text-[12px] text-[#181818] flex-shrink-0 shadow-sm">
            {person.name.split(' ').map((n) => n[0]).join('')}
          </div>"""

new_avatar_block = """{person.avatar ? (
            <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full object-cover shadow-sm border border-[#E5E7EB] flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center font-medium text-[15px] text-[#181818] flex-shrink-0 shadow-sm">
              {person.name.split(' ').map((n) => n[0]).join('')}
            </div>
          )}"""

# I should also bump the text sizes back up slightly if they are too small in the modal,
# but the user said "looks like bgger and take reference from them" for the Speakers list, not the modal.
# In the modal, they ONLY complained about the missing photo.
# But wait, looking at the user screenshot, the avatar is clearly w-12 h-12 and the text is larger.
# Let's check what text sizes they currently have in PersonDetailModal vs my codebase.
# My codebase has `text-[12px]` for the name. The user screenshot looks like `text-[16px]` for the name.
# It seems my codebase already has `text-[12px]` because a previous compression script hit ALL files, including the modal!
# I will bump the modal's avatar and text sizes back to normal readability size, because a modal SHOULD have a prominent focus.

c = c.replace(old_avatar_block, new_avatar_block)
c = c.replace('<h2 className="text-[12px] font-bold text-[#181818] leading-tight">', '<h2 className="text-[16px] font-bold text-[#181818] leading-tight">')
c = c.replace('<p className="text-[12px] text-[#4B5563] mt-0.5">', '<p className="text-[14px] text-[#4B5563] mt-0.5">')

with open('src/components/modals/PersonDetailModal.tsx', 'w') as f:
    f.write(c)

