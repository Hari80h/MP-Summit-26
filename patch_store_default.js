const fs = require('fs');

let store = fs.readFileSync('src/lib/store.tsx', 'utf8');

// Change default state to false
store = store.replace(
  "const [hasAccessConfirmed, setHasAccessConfirmed] = useState<boolean>(true);",
  "const [hasAccessConfirmed, setHasAccessConfirmed] = useState<boolean>(false);"
);

// In resetAllData, ensure it resets to false
store = store.replace(
  "setHasAccessConfirmed(true);",
  "setHasAccessConfirmed(false);"
);

fs.writeFileSync('src/lib/store.tsx', store);
