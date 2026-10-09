import re

with open('src/components/delegate/DelegateSpeakers.tsx', 'r') as f:
    c = f.read()

# The button in DelegatePeople is:
# className={`flex-shrink-0 h-9 px-2.5 rounded-lg text-[13px] font-medium flex items-center gap-1.5 transition-all active:scale-95 ...
# Let's completely rewrite the button section in DelegateSpeakers

old_btn_regex = r'<button\s*onClick=\{\(e\) => \{.*?</button>'

new_btn = """<button
                onClick={(e) => {
                  e.stopPropagation();
                  if (connected) return;
                  if (pending) disconnectFrom(speaker.id);
                  else handleConnect(speaker.id, e);
                }}
                className={`flex-shrink-0 h-9 px-3 rounded-lg text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                  connected
                    ? 'bg-red-50 text-[#B51F32] border border-red-200'
                    : pending
                    ? 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]'
                    : 'bg-white text-[#181818] border border-[#181818]'
                }`}
              >
                {connected ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Connected
                  </>
                ) : pending ? (
                  <>
                    <Clock className="w-3.5 h-3.5" /> Pending
                  </>
                ) : (
                  "Connect"
                )}
              </button>"""

c = re.sub(old_btn_regex, new_btn, c, flags=re.DOTALL)

with open('src/components/delegate/DelegateSpeakers.tsx', 'w') as f:
    f.write(c)

print("Button fixed")
