with open('src/components/delegate/DelegateCompanyDetail.tsx', 'r') as f:
    c = f.read()
c = c.replace('pt-10 pb-3 px-3', 'pt-2 pb-2.5 px-3')
with open('src/components/delegate/DelegateCompanyDetail.tsx', 'w') as f:
    f.write(c)

with open('src/components/delegate/DelegateCompanies.tsx', 'r') as f:
    c = f.read()
c = c.replace('pt-10 pb-3 px-3', 'pt-2 pb-2.5 px-3')
with open('src/components/delegate/DelegateCompanies.tsx', 'w') as f:
    f.write(c)

print("Replaced pt-10 successfully")
