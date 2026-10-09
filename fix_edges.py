import sys

# 1. Update DelegateHome.tsx
with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    home_code = f.read()

# Change main container px-3 to px-2
home_code = home_code.replace(
    'className="flex-1 px-3 pt-4 pb-20 space-y-4 bg-[#F6F4F0] overflow-y-auto"',
    'className="flex-1 px-2 pt-4 pb-20 space-y-4 bg-[#F6F4F0] overflow-y-auto"'
)
# Update negative margins for scrollable lists
home_code = home_code.replace('-mx-3 px-3', '-mx-2 px-2')
home_code = home_code.replace('-mx-4 px-4', '-mx-2 px-2')

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(home_code)


# 2. Update DelegateSchedule.tsx
with open('src/components/delegate/DelegateSchedule.tsx', 'r') as f:
    sched_code = f.read()

# Change main container p-4 to px-2
sched_code = sched_code.replace(
    'className="flex-1 p-4 pt-5 pb-24 space-y-4 bg-[#FAFAFA] select-none overflow-y-auto"',
    'className="flex-1 px-2 pt-5 pb-24 space-y-4 bg-[#FAFAFA] select-none overflow-y-auto"'
)
# The detail view inside DelegateSchedule might also have p-4
sched_code = sched_code.replace(
    'className="flex-1 p-4 pt-10 pb-20 space-y-4 bg-[#F6F4F0] select-none overflow-y-auto"',
    'className="flex-1 px-2 pt-10 pb-20 space-y-4 bg-[#F6F4F0] select-none overflow-y-auto"'
)

with open('src/components/delegate/DelegateSchedule.tsx', 'w') as f:
    f.write(sched_code)

print("Done")
