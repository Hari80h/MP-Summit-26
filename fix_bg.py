import sys

with open('src/components/delegate/DelegateSchedule.tsx', 'r') as f:
    code = f.read()

# Change the background of the main list view from FAFAFA to F6F4F0
code = code.replace('bg-[#FAFAFA]', 'bg-[#F6F4F0]')

with open('src/components/delegate/DelegateSchedule.tsx', 'w') as f:
    f.write(code)

print("Done")
