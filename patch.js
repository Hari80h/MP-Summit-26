const fs = require('fs');

let waCard = fs.readFileSync('src/components/auth/WhatsAppEntryCard.tsx', 'utf8');
waCard = waCard.replace(
  "import { useStore } from '../../lib/store';",
  "import { useStore } from '../../lib/store';\nimport { useRouter } from 'next/navigation';"
);
waCard = waCard.replace(
  "const { setShowWhatsAppModal, setRole, setHasAccessConfirmed, setActiveDelegateTab } = useStore();",
  "const { setShowWhatsAppModal, setRole, setHasAccessConfirmed, setActiveDelegateTab } = useStore();\n  const router = useRouter();"
);

// modify handleOpenLink
waCard = waCard.replace(
  /const handleOpenLink = \([\s\S]*?\};/,
  `const handleOpenLink = (role: 'delegate' | 'exhibitor' | 'organizer') => {
    setRole(role);
    setShowWhatsAppModal(false);
    
    if (role === 'delegate') {
      setActiveDelegateTab('home');
      setHasAccessConfirmed(false);
      router.push('/?eventId=ITS26&mobile=9876543210');
    } else {
      setHasAccessConfirmed(true);
      if (role === 'exhibitor') {
        router.push('/?eventId=ITS26&mobile=MICROSOFT');
      }
    }
  };`
);
fs.writeFileSync('src/components/auth/WhatsAppEntryCard.tsx', waCard);

let accessScreen = fs.readFileSync('src/components/auth/AccessScreen.tsx', 'utf8');
accessScreen = accessScreen.replace(
  "import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';",
  "import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';\nimport { useSearchParams } from 'next/navigation';"
);
accessScreen = accessScreen.replace(
  "export const AccessScreen: React.FC<AccessScreenProps> = ({ onSuccess }) => {",
  "export const AccessScreen: React.FC<AccessScreenProps> = ({ onSuccess }) => {\n  const searchParams = useSearchParams();"
);
accessScreen = accessScreen.replace(
  "const [eventId, setEventId] = useState('ITS26');",
  "const [eventId, setEventId] = useState(searchParams?.get('eventId') || 'ITS26');"
);
accessScreen = accessScreen.replace(
  "const [mobile, setMobile] = useState('+91 9876543210');",
  "const [mobile, setMobile] = useState(searchParams?.get('mobile') || '+91 9876543210');"
);
fs.writeFileSync('src/components/auth/AccessScreen.tsx', accessScreen);
