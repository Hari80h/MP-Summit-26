with open('src/components/delegate/DelegateHome.tsx', 'r') as f:
    c = f.read()

# Fix spacing
c = c.replace('pb-4', 'pb-1')

# Bump headings
c = c.replace('<h3 className="text-[12px] font-bold text-[#181818]">Quick Links</h3>', '<h3 className="text-[14px] font-bold text-[#181818] tracking-tight">Quick Links</h3>')
c = c.replace('<h3 className="text-[12px] font-bold text-[#181818]">My AI Recommendations</h3>', '<h3 className="text-[14px] font-bold text-[#181818] tracking-tight">My AI Recommendations</h3>')
c = c.replace('<h3 className="text-[12px] font-bold text-[#181818]">Companies to Explore</h3>', '<h3 className="text-[14px] font-bold text-[#181818] tracking-tight">Companies to Explore</h3>')
c = c.replace('<h3 className="text-[12px] font-bold text-[#181818]">Upcoming Sessions Preview</h3>', '<h3 className="text-[14px] font-bold text-[#181818] tracking-tight">Upcoming Sessions</h3>')
c = c.replace('text-[12px] font-bold text-[#181818] mb-1', 'text-[14px] font-bold text-[#181818] tracking-tight mb-1') # Just in case I missed the exact string

with open('src/components/delegate/DelegateHome.tsx', 'w') as f:
    f.write(c)

print("Fixed spacing and headings")
