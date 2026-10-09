import sys

with open('src/app/page.tsx', 'r') as f:
    content = f.read()
content = content.replace('min-h-screen', 'min-h-[100dvh]')
with open('src/app/page.tsx', 'w') as f:
    f.write(content)

with open('src/app/layout.tsx', 'r') as f:
    layout = f.read()
layout = layout.replace('className="h-full"', 'className="h-[100dvh]"')
layout = layout.replace('className="h-full antialiased', 'className="h-[100dvh] antialiased')
with open('src/app/layout.tsx', 'w') as f:
    f.write(layout)

# Also add pb-safe to the BottomNavs so they sit flush on iOS
with open('src/components/delegate/DelegateBottomNav.tsx', 'r') as f:
    nav = f.read()
nav = nav.replace('pb-0 px-2 pt-0.5', 'pb-safe px-2 pt-0.5')
with open('src/components/delegate/DelegateBottomNav.tsx', 'w') as f:
    f.write(nav)

with open('src/components/exhibitor/ExhibitorBottomNav.tsx', 'r') as f:
    nav = f.read()
nav = nav.replace('pb-0 px-2 pt-0.5', 'pb-safe px-2 pt-0.5')
with open('src/components/exhibitor/ExhibitorBottomNav.tsx', 'w') as f:
    f.write(nav)

print("Applied dvh and pb-safe")
