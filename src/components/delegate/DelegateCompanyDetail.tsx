import React, { useEffect, useRef } from 'react';
import { ChevronLeft, MapPin, Star } from 'lucide-react';
import { useStore } from '@/lib/store';

export const DelegateCompanyDetail: React.FC = () => {
  const { setActiveDelegateTab, selectedCompanyId, exhibitors, products, savedCompanyIds, toggleSaveCompany } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selectedCompanyId]);

  const company = exhibitors.find(e => e.id === selectedCompanyId) || exhibitors[0];
  const companyProducts = products.filter(p => p.company === company.company);

  if (!company) return null;

  return (
    <div ref={scrollRef} className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-y-auto no-scrollbar px-2 pt-2 pb-16 space-y-2">
      {/* Header */}
      <div className="pt-2 pb-2.5 px-3 border-b border-[#DEDCD7] bg-[#F6F4F0] sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveDelegateTab('companies')}
            className="w-8 h-8 flex items-center justify-center text-[#181818] transition-active active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[12px] font-bold text-[#181818] line-clamp-1">{company.company}</h1>
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-[#DEDCD7] px-2.5 py-1 rounded-full shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#2F7D58]"></div>
          <span className="text-[11px] font-semibold text-[#181818]">Demo</span>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Main Card */}
        <div className="bg-white rounded-[14px] border border-[#DEDCD7] p-3 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={company.company} 
                className="w-8 h-8 rounded-lg object-cover border border-[#DEDCD7]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.company)}&background=F3F4F6&color=181818&bold=true`;
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#EFEEEA] flex items-center justify-center font-bold text-[12px] text-[#181818]">
                {company.company.charAt(0)}
              </div>
            )}
            <div className="bg-[#181818] text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
              Booth {company.booth || 'TBA'}
            </div>
          </div>
          
          <h2 className="text-[12px] font-bold text-[#181818] mb-1.5">{company.company}</h2>
          <div className="flex items-start gap-1 text-[#6B6B6B] mb-2">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <p className="text-[12px]">Bengaluru International Exhibition Centre, Bengaluru</p>
          </div>

          <p className="text-[12px] text-[#181818] leading-relaxed mb-2">
            {company.company} is showcasing their latest innovations in the {company.category} space. Visit Booth {company.booth} at ITS26 to explore their products and engage with their experts.
          </p>

          <button 
            onClick={() => toggleSaveCompany(company.id)}
            className={`w-full py-2.5 rounded-lg border flex items-center justify-center gap-2 font-bold text-[12px] active:scale-95 transition-transform ${
              savedCompanyIds.includes(company.id)
                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                : 'border-[#181818] text-[#181818] hover:bg-gray-50'
            }`}
          >
            <Star className={`w-4 h-4 ${savedCompanyIds.includes(company.id) ? 'fill-[#166534]' : ''}`} />
            {savedCompanyIds.includes(company.id) ? 'Company Saved' : 'Save Company'}
          </button>
        </div>

        {/* Products Section */}
        {companyProducts.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-2">
              SHOWCASING AT THE BOOTH
            </h3>
            
            <div className="space-y-2">
              {companyProducts.map(product => (
                <div key={product.id} className="bg-white rounded-[14px] border border-[#DEDCD7] p-3 shadow-sm cursor-pointer hover:border-[#181818]/30 transition-colors">
                  <div className="flex gap-2 items-start mb-2">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-8 h-8 rounded-lg object-contain bg-gray-50 border border-gray-100 p-1 flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=F3F4F6&color=181818&bold=true`;
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-[#EFEEEA] flex items-center justify-center font-bold text-[12px] text-[#181818] flex-shrink-0">
                        {product.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-[12px] font-bold text-[#181818]">{product.name}</h4>
                      <p className="text-[12px] text-[#6B6B6B]">{product.category || product.tagline}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    {product.overview || product.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
