const fs = require('fs');

// 1. Update store.tsx
let store = fs.readFileSync('src/lib/store.tsx', 'utf8');
store = store.replace(/  showWhatsAppModal: boolean;\n/g, '');
store = store.replace(/  setShowWhatsAppModal: \(show: boolean\) => void;\n/g, '');
store = store.replace(/  const \[showWhatsAppModal, setShowWhatsAppModal\] = useState<boolean>\(true\);\n/g, '');
// Handle the reset method
store = store.replace(/    setShowWhatsAppModal\(false\);\n/g, '');
// Handle the provider value
store = store.replace(/        showWhatsAppModal,\n/g, '');
store = store.replace(/        setShowWhatsAppModal,\n/g, '');
fs.writeFileSync('src/lib/store.tsx', store);

// 2. Update page.tsx
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace("import { WhatsAppEntryCard } from '../components/auth/WhatsAppEntryCard';\n", '');

// Remove the showWhatsAppModal from useStore destructuring
page = page.replace(/    showWhatsAppModal,\n/g, '');

// Remove the if (showWhatsAppModal) block
const waBlockRegex = /  if \(showWhatsAppModal\) \{\n    return \(\n      <div className="min-h-screen bg-\[#F6F4F0\] flex flex-col font-sans">\n        <WhatsAppEntryCard \/>\n      <\/div>\n    \);\n  \}\n/g;
page = page.replace(waBlockRegex, '');

// Remove the hide modal logic from useEffect
page = page.replace(/        useStore\.getState\(\)\.setShowWhatsAppModal\(false\);\n/g, '');

fs.writeFileSync('src/app/page.tsx', page);

// 3. Delete WhatsAppEntryCard.tsx
if (fs.existsSync('src/components/auth/WhatsAppEntryCard.tsx')) {
  fs.unlinkSync('src/components/auth/WhatsAppEntryCard.tsx');
}
