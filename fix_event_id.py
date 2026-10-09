import sys

with open('src/components/auth/AccessScreen.tsx', 'r') as f:
    content = f.read()

old_logic = """      if (cleanEvent !== 'ITS26') {
        setStatus('error');
        setErrorMessage("We couldn't find an event matching this Event ID.");
        return;
      }"""

new_logic = """      // Accept any event ID for demo purposes"""

if old_logic in content:
    content = content.replace(old_logic, new_logic)

with open('src/components/auth/AccessScreen.tsx', 'w') as f:
    f.write(content)

print("Event ID check removed")
