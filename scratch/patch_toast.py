import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

# Replace original toast logic
original_toast = r"""      \{/\* Floating Feedback Toast Notification \*/\}
      \{toast && \(
        <div className="fixed top-14 right-4 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="bg-\[#181818\] text-white px-4 py-2.5 rounded-xl shadow-lg border border-\[#333333\] flex items-center gap-2.5 text-xs max-w-sm">
            \{toast.type === 'success' \? \(
              <CheckCircle2 className="w-4 h-4 text-\[#2F7D58\] flex-shrink-0" />
            \) : toast.type === 'error' \? \(
              <AlertCircle className="w-4 h-4 text-\[#B51F32\] flex-shrink-0" />
            \) : \(
              <Info className="w-4 h-4 text-\[#00A4EF\] flex-shrink-0" />
            \)\}
            <span className="font-medium">\{toast.message\}</span>
          </div>
        </div>
      \)\}"""

new_toast_organizer = """      {/* Floating Feedback Toast Notification for Organizer */}
      {toast && role === 'organizer' && (
        <div className="fixed top-14 right-4 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="bg-[#181818] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#333333] flex items-center gap-2.5 text-xs max-w-sm">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#2F7D58] flex-shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-[#B51F32] flex-shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-[#00A4EF] flex-shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}"""

content = re.sub(original_toast, new_toast_organizer, content)

# Now inject the mobile toast inside PhoneFrame
mobile_toast = """        <PhoneFrame>
          {/* Mobile Toast Notification */}
          {toast && role !== 'organizer' && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-200 w-[90%] max-w-[340px]">
              <div className="bg-[#181818] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#333333] flex items-center gap-3 text-[13px]">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#2F7D58] flex-shrink-0" />
                ) : toast.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-[#B51F32] flex-shrink-0" />
                ) : (
                  <Info className="w-5 h-5 text-[#00A4EF] flex-shrink-0" />
                )}
                <span className="font-semibold truncate">{toast.message}</span>
              </div>
            </div>
          )}"""

content = content.replace('<PhoneFrame>', mobile_toast)

with open('src/app/page.tsx', 'w') as f:
    f.write(content)
