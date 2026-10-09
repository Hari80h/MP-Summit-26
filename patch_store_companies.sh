sed -i '' '/activeDelegateTab,/a\
  savedCompanyIds: string[];\
  toggleSaveCompany: (id: string) => void;
' src/lib/store.tsx

sed -i '' '/const \[selectedCompanyId/a\
  const [savedCompanyIds, setSavedCompanyIds] = useState<string[]>([]);
' src/lib/store.tsx

sed -i '' '/const \[viewMode/a\
  const toggleSaveCompany = (id: string) => {\
    setSavedCompanyIds(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);\
  };
' src/lib/store.tsx

sed -i '' '/viewSavedCompaniesOnly,/a\
    savedCompanyIds,\
    toggleSaveCompany,
' src/lib/store.tsx
