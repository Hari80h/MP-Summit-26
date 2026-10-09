with open('src/components/delegate/DelegateProfile.tsx', 'r') as f:
    c = f.read()

if 'PageHeader' not in c:
    c = c.replace("import { Pencil, Settings, Download, QrCode, Shield, Share2, MapPin, Globe, Linkedin, Twitter, Mail, Link as LinkIcon, Building2 } from 'lucide-react';",
                  "import { Pencil, Settings, Download, QrCode, Shield, Share2, MapPin, Globe, Linkedin, Twitter, Mail, Link as LinkIcon, Building2, User } from 'lucide-react';\nimport { PageHeader } from '../shared/PageHeader';")

    c = c.replace('<div className="flex-1 bg-[#F6F4F0] select-none overflow-y-auto px-2 pt-2 pb-16 space-y-2">\n      {/* Identity Card */}',
                  '<div className="flex-1 bg-[#F6F4F0] select-none overflow-y-auto px-2 pt-2 pb-16 space-y-2">\n      <PageHeader title="Your Profile" subtitle="Manage your digital presence and connections" icon={User} theme="purple" />\n      {/* Identity Card */}')

with open('src/components/delegate/DelegateProfile.tsx', 'w') as f:
    f.write(c)
print("DelegateProfile patched")
