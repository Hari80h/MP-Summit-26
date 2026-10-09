import sys

with open('src/lib/store.tsx', 'r') as f:
    content = f.read()

# Don't load hasAccessConfirmed from localStorage
content = content.replace("if (typeof parsed.hasAccessConfirmed === 'boolean') setHasAccessConfirmed(parsed.hasAccessConfirmed);",
                          "// if (typeof parsed.hasAccessConfirmed === 'boolean') setHasAccessConfirmed(parsed.hasAccessConfirmed);")

# Don't save hasAccessConfirmed to localStorage
content = content.replace("hasAccessConfirmed,\n      };\n      localStorage.setItem",
                          "/* hasAccessConfirmed */\n      };\n      localStorage.setItem")

with open('src/lib/store.tsx', 'w') as f:
    f.write(content)

print("Persistence fixed")
