import sys

with open('src/app/globals.css', 'r') as f:
    content = f.read()

# Add zoom to body
if 'zoom:' not in content:
    content = content.replace(
        'html, body {\n  background-color: var(--background);',
        'html, body {\n  background-color: var(--background);\n  zoom: 0.92;'
    )
    with open('src/app/globals.css', 'w') as f:
        f.write(content)
    print("Added zoom: 0.92")
else:
    print("Zoom already exists")

