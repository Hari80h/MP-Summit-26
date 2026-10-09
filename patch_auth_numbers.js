const fs = require('fs');

// 1. Update WhatsAppEntryCard.tsx
let waCode = fs.readFileSync('src/components/auth/WhatsAppEntryCard.tsx', 'utf8');
waCode = waCode.replace("router.push('/?eventId=ITS26&mobile=MICROSOFT');", "router.push('/?eventId=ITS26&mobile=9876543211');");
waCode = waCode.replace("router.push('/?eventId=ITS26&mobile=ADMIN');", "router.push('/?eventId=ITS26&mobile=9876543212');");
fs.writeFileSync('src/components/auth/WhatsAppEntryCard.tsx', waCode);

// 2. Update AccessScreen.tsx
let accessCode = fs.readFileSync('src/components/auth/AccessScreen.tsx', 'utf8');

// Replace state init
accessCode = accessCode.replace(
  "const [mobile, setMobile] = useState(searchParams?.get('mobile') || (role === 'exhibitor' ? 'MICROSOFT' : role === 'organizer' ? 'ADMIN' : '+91 9876543210'));",
  "const [mobile, setMobile] = useState(searchParams?.get('mobile') || (role === 'exhibitor' ? '+91 9876543211' : role === 'organizer' ? '+91 9876543212' : '+91 9876543210'));"
);

// Replace validation
accessCode = accessCode.replace(
  "isValid = cleanMobile.toUpperCase() === 'MICROSOFT';",
  "isValid = cleanMobile === '9876543211' || cleanMobile === '+919876543211';"
);
accessCode = accessCode.replace(
  "isValid = cleanMobile.toUpperCase() === 'ADMIN';",
  "isValid = cleanMobile === '9876543212' || cleanMobile === '+919876543212';"
);

// Replace handleQuickPrefill
accessCode = accessCode.replace(
  "setMobile(role === 'exhibitor' ? 'MICROSOFT' : role === 'organizer' ? 'ADMIN' : '+91 9876543210');",
  "setMobile(role === 'exhibitor' ? '+91 9876543211' : role === 'organizer' ? '+91 9876543212' : '+91 9876543210');"
);

// Replace prefill button text
accessCode = accessCode.replace(
  "Prefill with {role === 'exhibitor' ? 'Microsoft' : role === 'organizer' ? 'Admin' : 'Aarav Sharma (+91 9876543210)'}",
  "Prefill with {role === 'exhibitor' ? 'Exhibitor (+91 9876543211)' : role === 'organizer' ? 'Organizer (+91 9876543212)' : 'Delegate (+91 9876543210)'}"
);

// Replace demo helper mobile string
accessCode = accessCode.replace(
  "<span className=\"font-mono text-[#181818]\">{role === 'exhibitor' ? 'MICROSOFT' : role === 'organizer' ? 'ADMIN' : '+91 9876543210'}</span>",
  "<span className=\"font-mono text-[#181818]\">{role === 'exhibitor' ? '+91 9876543211' : role === 'organizer' ? '+91 9876543212' : '+91 9876543210'}</span>"
);

fs.writeFileSync('src/components/auth/AccessScreen.tsx', accessCode);
