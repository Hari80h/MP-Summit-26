import re
import glob

files = glob.glob('src/components/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r') as f:
        c = f.read()

    # If we have dangling `import React;`
    if 'import React;' in c:
        c = re.sub(r'import React;\nimport \{ PageHeader \} from \'../shared/PageHeader\';\nimport \{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"];\s*(, \{[^}]+\}\s+from\s+[\'"]react[\'"];?)?', 
                   r"import React \2;\nimport { PageHeader } from '../shared/PageHeader';\nimport {\1} from 'lucide-react';", c)
        
        # It's probably easier to just find the broken `import React;` and fix it.
        c = c.replace('import React;\n', '')
        # Now there is no React import. Let's add it.
        c = re.sub(r'(import \{ PageHeader \})', r"import React, { useState, useEffect, useRef, Suspense } from 'react';\n\1", c)

        with open(file, 'w') as f:
            f.write(c)
        print(f"Fixed React imports for {file}")
