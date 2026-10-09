import sys

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('<AddToHomeScreenBanner />', '{/* <AddToHomeScreenBanner /> */}')

with open('src/app/page.tsx', 'w') as f:
    f.write(content)

print("Removed AddToHomeScreenBanner")
