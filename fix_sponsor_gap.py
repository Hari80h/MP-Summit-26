with open('src/components/delegate/DelegateSponsors.tsx', 'r') as f:
    c = f.read()

c = c.replace('pt-10 pb-3 px-3', 'pt-3 pb-3 px-3')

with open('src/components/delegate/DelegateSponsors.tsx', 'w') as f:
    f.write(c)

print("Fixed blank space")
