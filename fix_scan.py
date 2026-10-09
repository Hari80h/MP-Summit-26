import re

with open('src/components/delegate/DelegateScan.tsx', 'r') as f:
    c = f.read()

new_header = """<div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · SCANNER</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none mb-3">My Badge</h1>
      </div>"""

c = re.sub(r'<div className="flex-1 bg-\[\#F6F4F0\] select-none overflow-y-auto px-2 pt-2 pb-16 space-y-2">', f'<div className="flex-1 bg-[#F6F4F0] select-none overflow-y-auto px-2 pt-2 pb-16 space-y-2">\n      {new_header}', c)

with open('src/components/delegate/DelegateScan.tsx', 'w') as f:
    f.write(c)
