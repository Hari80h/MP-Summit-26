const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

const useEffectRegex = /React\.useEffect\(\(\) => \{\n    const hasSeen = sessionStorage\.getItem\('es_splash_seen'\);\n    if \(!hasSeen\) \{[\s\S]*?\}, \[\]\);/g;

const newUseEffect = `React.useEffect(() => {
    // 1. Splash Screen Logic
    const hasSeen = sessionStorage.getItem('es_splash_seen');
    if (!hasSeen) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('es_splash_seen', 'true');
      }, 1500);
    }

    // 2. Real WhatsApp Link Router Logic (Bypass Simulator)
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const mobileParam = searchParams.get('mobile');
      
      if (mobileParam) {
        // If they arrived via a real link, hide the fake WhatsApp simulator
        useStore.getState().setShowWhatsAppModal(false);
        useStore.getState().setHasAccessConfirmed(false);
        
        // Auto-assign the correct role based on the mobile number in the link
        if (mobileParam.includes('9876543211')) {
          useStore.getState().setRole('exhibitor');
        } else if (mobileParam.includes('9876543212')) {
          useStore.getState().setRole('organizer');
        } else {
          useStore.getState().setRole('delegate');
        }
      }
    }
  }, []);`;

page = page.replace(useEffectRegex, newUseEffect);
fs.writeFileSync('src/app/page.tsx', page);
