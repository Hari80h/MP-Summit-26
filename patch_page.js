const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace the Main View Router section
const mainRouterRegex = /\{\/\* Main View Router based on Role \*\/\}.*/s;
const newMainRouter = `{/* Main View Router based on Role */}
      {!hasAccessConfirmed ? (
        <PhoneFrame>
          <AccessScreen onSuccess={() => setHasAccessConfirmed(true)} />
        </PhoneFrame>
      ) : role === 'organizer' ? (
        /* Full-Width Desktop Organizer Console */
        <OrganizerConsole />
      ) : (
        /* Delegate or Exhibitor in Mobile-First Phone Container */
        <PhoneFrame>
          {/* Add-to-Home-Screen PWA Banner (inside mobile frame) */}
          <AddToHomeScreenBanner />

          {/* Mobile Toast Notification */}
          {toast && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-200 w-[90%] max-w-[340px]">
              <div className="bg-[#181818] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#333333] flex items-center gap-3 text-[13px]">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#2F7D58] flex-shrink-0" />
                ) : toast.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-[#B51F32] flex-shrink-0" />
                ) : (
                  <Info className="w-5 h-5 text-[#00A4EF] flex-shrink-0" />
                )}
                <span className="font-semibold truncate">{toast.message}</span>
              </div>
            </div>
          )}
          {role === 'delegate' ? (
              /* Delegate Experience */
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="flex-1 flex flex-col overflow-y-auto overscroll-contain no-scrollbar">
                  {activeDelegateTab === 'home' && <DelegateHome />}
                  {activeDelegateTab === 'people' && <DelegatePeople />}
                  {activeDelegateTab === 'scan' && <DelegateScan />}
                  {activeDelegateTab === 'schedule' && <DelegateSchedule />}
                  {activeDelegateTab === 'companies' && <DelegateCompanies />}
                  {activeDelegateTab === 'company_detail' && <DelegateCompanyDetail />}
                  {activeDelegateTab === 'ai_recommendations' && <DelegateAIRecommendations />}
                  {activeDelegateTab === 'speakers' && <DelegateSpeakers />}
                  {activeDelegateTab === 'polls' && <DelegatePolls />}
                  {activeDelegateTab === 'map' && <DelegateMap />}
                  {activeDelegateTab === "sponsors" && <DelegateSponsors />}
                  {activeDelegateTab === 'profile' && (
                    <DelegateProfile
                      onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
                      onOpenQRModal={() => setIsQRModalOpen(true)}
                    />
                  )}
                  {activeDelegateTab === 'edit_profile' && <DelegateEditProfile />}
                </div>
                <DelegateBottomNav />
              </div>
          ) : (
            /* Exhibitor (Microsoft B-14) Experience */
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div className="flex-1 flex flex-col overflow-y-auto overscroll-contain no-scrollbar">
                {activeExhibitorTab === 'home' && <ExhibitorHome />}
                {activeExhibitorTab === 'leads' && <ExhibitorLeads />}
                {activeExhibitorTab === 'scan' && <ExhibitorScan />}
                {activeExhibitorTab === 'products' && <ExhibitorProducts />}
                {activeExhibitorTab === 'more' && <ExhibitorMore />}
              </div>
              <ExhibitorBottomNav />
            </div>
          )}
        </PhoneFrame>
      )}
    </div>
  );
}`;

page = page.replace(mainRouterRegex, newMainRouter);
fs.writeFileSync('src/app/page.tsx', page);
