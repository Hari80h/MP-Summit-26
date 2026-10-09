import sys

with open('src/components/delegate/DelegatePeople.tsx', 'r') as f:
    code = f.read()

old_avatar = """<div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center font-medium text-sm text-[#181818] flex-shrink-0 shadow-sm">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>"""

new_avatar = """{person.avatar ? (
                    <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0 shadow-sm border border-[#E5E7EB]" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center font-medium text-sm text-[#181818] flex-shrink-0 shadow-sm">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}"""

code = code.replace(old_avatar, new_avatar)

with open('src/components/delegate/DelegatePeople.tsx', 'w') as f:
    f.write(code)

print("Done")
