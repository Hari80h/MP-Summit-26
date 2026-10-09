with open('src/components/delegate/DelegateSpeakers.tsx', 'r') as f:
    c = f.read()

c = c.replace('ITS26 · SPEAKERS', 'ITS26 · FEATURED')
c = c.replace('>Featured</h1>', '>Speakers</h1>')

with open('src/components/delegate/DelegateSpeakers.tsx', 'w') as f:
    f.write(c)

print("Swapped Featured and Speakers")
