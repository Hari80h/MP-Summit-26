import sys

with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    content = f.read()

content = content.replace("icon: BarChart3", "icon: BarChart2")
content = content.replace("icon: Building2", "icon: Map")

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(content)

print("Fixed icons!")
