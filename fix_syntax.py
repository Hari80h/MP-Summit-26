import re

with open('src/lib/mockData.ts', 'r') as f:
    content = f.read()

# The sed command replaced "  }," with "" globally on lines where it existed.
# Because it was just "  }," it left an empty line.
# Let's find places where an object ends and another begins.
# Usually it's:
#    ticketType: 'Speaker',
# 
#  {

# Or similar. Actually, the easiest way is to find all empty lines that occur between an object property and a `  {`
# Let's just restore `  },` to any empty line that precedes `  {` and follows a line that doesn't end with `[` or `{`.
# Better yet, let's just use git if it's available? No, not a git repo.
# How about we just look at the diff?
# Wait, let's just do a regex replace:
# Replace:
# \n\n  \{\n    id: 
# With:
# \n  },\n  {\n    id:

content = re.sub(r'\n\s*\n\s*\{\n\s*id:', '\n  },\n  {\n    id:', content)

with open('src/lib/mockData.ts', 'w') as f:
    f.write(content)
