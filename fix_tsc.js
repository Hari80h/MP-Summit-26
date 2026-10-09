const fs = require('fs');

// 1. Fix page.tsx
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Add setRole to useStore destructuring
page = page.replace(
  "    setHasAccessConfirmed,",
  "    setHasAccessConfirmed,\n    setRole,"
);

// Replace useStore.getState()... with direct calls
page = page.replace(/useStore\.getState\(\)\.setShowWhatsAppModal\(false\);\n/g, ''); // already removed from store
page = page.replace(/useStore\.getState\(\)\.setHasAccessConfirmed\(false\);/g, 'setHasAccessConfirmed(false);');
page = page.replace(/useStore\.getState\(\)\.setRole\('exhibitor'\);/g, "setRole('exhibitor');");
page = page.replace(/useStore\.getState\(\)\.setRole\('organizer'\);/g, "setRole('organizer');");
page = page.replace(/useStore\.getState\(\)\.setRole\('delegate'\);/g, "setRole('delegate');");
// Add setRole to dependency array
page = page.replace(/\}, \[\]\);/g, '}, [setRole, setHasAccessConfirmed]);');

fs.writeFileSync('src/app/page.tsx', page);

// 2. Fix DemoBar.tsx
let demoBar = fs.readFileSync('src/components/shell/DemoBar.tsx', 'utf8');
demoBar = demoBar.replace(/    setShowWhatsAppModal,\n/g, '');
demoBar = demoBar.replace(/            <button\n              onClick=\{() => setShowWhatsAppModal\(true\)\}\n              className="px-3 py-1.5 hover:bg-white\/10 rounded-md transition-colors text-xs flex items-center gap-1.5"\n              title="Reset to WhatsApp Entry Simulation"\n            >\n              <RefreshCw className="w-3.5 h-3.5" \/>\n              <span className="hidden sm:inline">Simulation Hub<\/span>\n            <\/button>\n/g, '');
fs.writeFileSync('src/components/shell/DemoBar.tsx', demoBar);

