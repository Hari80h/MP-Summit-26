import React, { useState } from 'react';
import { Search, ChevronLeft, MapPin } from 'lucide-react';
import { useStore } from '@/lib/store';

export const DelegateCompanies: React.FC = () => {
  const { setActiveDelegateTab, setSelectedCompanyId, exhibitors, viewSavedCompaniesOnly, setViewSavedCompaniesOnly, savedCompanyIds } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExhibitors = exhibitors.filter(company => {
    if (viewSavedCompaniesOnly && !savedCompanyIds.includes(company.id)) return false;

    return searchQuery === '' ||
    company.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (company.booth && company.booth.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (company.category && company.category.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden space-y-2">
      {/* Header */}
      <div className="pt-2 pb-2.5 px-3 bg-white border-b border-[#DEDCD7] flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <button 
            onClick={() => {
              setViewSavedCompaniesOnly(false);
              setActiveDelegateTab('home');
            }}
            className="w-8 h-8 rounded-full bg-[#F6F4F0] flex items-center justify-center text-[#181818] transition-active active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[12px] font-bold text-[#181818]">
            {viewSavedCompaniesOnly ? 'Saved Companies' : 'Exhibitor Directory'}
          </h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search companies, booths, or tags..."
            className="w-full bg-[#F6F4F0] border-none rounded-lg py-2.5 pl-10 pr-4 text-[12px] focus:ring-2 focus:ring-[#B51F32]/20 outline-none text-[#181818] placeholder-[#6B6B6B]"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 pb-16 space-y-2 no-scrollbar">
        <p className="text-[12px] font-semibold text-[#6B6B6B] mb-1">{filteredExhibitors.length} Exhibitors</p>
        
        {filteredExhibitors.map((company) => (
          <div 
            key={company.id}
            onClick={() => {
              setSelectedCompanyId(company.id);
              setActiveDelegateTab('company_detail');
            }}
            className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] hover:border-[#181818]/40 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {company.logo ? (
                  <img 
                    src={company.logo} 
                    alt={company.company} 
                    className="w-8 h-8 rounded-lg object-cover border border-[#DEDCD7] flex-shrink-0" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.company)}&background=F3F4F6&color=181818&bold=true`;
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-[#F6F4F0] border border-[#E5E7EB] flex items-center justify-center font-bold text-[12px] text-[#181818] flex-shrink-0">
                    {company.company.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[12px] font-bold text-[#181818] leading-snug truncate">{company.company}</h3>
                  <p className="text-[12px] text-[#6B6B6B] mt-0.5 truncate">{company.category}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-[11px] font-mono font-medium bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-1 rounded-md text-[#166534] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Booth {company.booth}
                </span>
                <span className="text-[11px] font-semibold text-[#181818] mt-1 pr-0.5">
                  Visit &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
