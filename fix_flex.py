with open('src/components/delegate/DelegateSpeakers.tsx', 'r') as f:
    c = f.read()

c = c.replace('<div className="flex items-center gap-2">', '<div className="flex items-center gap-2 overflow-hidden flex-1">')

with open('src/components/delegate/DelegateSpeakers.tsx', 'w') as f:
    f.write(c)

