sed -i '' '/setActiveDelegateTab:/a\
  viewSavedPeopleOnly: boolean;\
  setViewSavedPeopleOnly: (v: boolean) => void;\
  viewSavedCompaniesOnly: boolean;\
  setViewSavedCompaniesOnly: (v: boolean) => void;
' src/lib/store.tsx

sed -i '' '/const \[activeDelegateTab/a\
  const [viewSavedPeopleOnly, setViewSavedPeopleOnly] = useState<boolean>(false);\
  const [viewSavedCompaniesOnly, setViewSavedCompaniesOnly] = useState<boolean>(false);
' src/lib/store.tsx

sed -i '' '/activeDelegateTab,/a\
    viewSavedPeopleOnly,\
    setViewSavedPeopleOnly,\
    viewSavedCompaniesOnly,\
    setViewSavedCompaniesOnly,
' src/lib/store.tsx
