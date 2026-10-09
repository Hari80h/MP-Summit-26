const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

const useEffectRegex = /  React\.useEffect\(\(\) => \{\n    \/\/ 1\. Splash Screen Logic/g;

page = page.replace(useEffectRegex, `  const hasInitialized = React.useRef(false);\n\n  React.useEffect(() => {\n    if (hasInitialized.current) return;\n    hasInitialized.current = true;\n\n    // 1. Splash Screen Logic`);

fs.writeFileSync('src/app/page.tsx', page);
