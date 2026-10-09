import sys

with open('src/components/auth/AccessScreen.tsx', 'r') as f:
    content = f.read()

# Make any number work for delegate
old_logic = """      if (cleanMobile === '9876543210' || cleanMobile === '+919876543210') {
        detectedRole = 'delegate';
      } else if (cleanMobile === '9876543211' || cleanMobile === '+919876543211') {
        detectedRole = 'exhibitor';
      } else if (cleanMobile === '9876543212' || cleanMobile === '+919876543212') {
        detectedRole = 'organizer';
      }"""

new_logic = """      if (cleanMobile === '9876543211' || cleanMobile === '+919876543211') {
        detectedRole = 'exhibitor';
      } else if (cleanMobile === '9876543212' || cleanMobile === '+919876543212') {
        detectedRole = 'organizer';
      } else {
        detectedRole = 'delegate'; // Default fallback so any number works
      }"""

if old_logic in content:
    content = content.replace(old_logic, new_logic)
else:
    print("Old logic not found!")

# Add onClick to button just in case
old_button = """            <button
              type="submit"
              disabled={status === 'verifying' || status === 'confirmed' || !mobile}"""

new_button = """            <button
              type="submit"
              onClick={handleVerify}
              disabled={status === 'verifying' || status === 'confirmed' || !mobile}"""

if old_button in content:
    content = content.replace(old_button, new_button)

with open('src/components/auth/AccessScreen.tsx', 'w') as f:
    f.write(content)

print("Login fixed")
