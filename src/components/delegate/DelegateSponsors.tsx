import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useStore } from '@/lib/store';

const SPONSORS = [
  { tier: 'Title Sponsor', company: 'Google Cloud', logo: 'https://cdn.simpleicons.org/googlecloud' },
  { tier: 'Platinum Sponsor', company: 'Amazon Web Services', logo: 'https://cdn.simpleicons.org/amazonaws' },
  { tier: 'Platinum Sponsor', company: 'Microsoft', logo: 'https://cdn.simpleicons.org/microsoft' },
  { tier: 'Gold Sponsor', company: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai' },
  { tier: 'Gold Sponsor', company: 'Databricks', logo: 'https://cdn.simpleicons.org/databricks' },
  { tier: 'Gold Sponsor', company: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe' },
  { tier: 'Silver Sponsor', company: 'Razorpay', logo: 'https://cdn.simpleicons.org/razorpay' },
  { tier: 'Silver Sponsor', company: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel' },
  { tier: 'Silver Sponsor', company: 'Zoho', logo: 'https://cdn.simpleicons.org/zoho' },
  { tier: 'Silver Sponsor', company: 'Postman', logo: 'https://cdn.simpleicons.org/postman' },
  { tier: 'Bronze Sponsor', company: 'Salesforce', logo: 'https://cdn.simpleicons.org/salesforce' },
  { tier: 'Bronze Sponsor', company: 'Adobe', logo: 'https://cdn.simpleicons.org/adobe' }
];

export const DelegateSponsors: React.FC = () => {
  const { setActiveDelegateTab } = useStore();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=F3F4F6&color=181818&bold=true`;
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="pt-4 pb-4 px-4 bg-[#F6F4F0] sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#181818] transition-active active:scale-95 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h1 className="text-[20px] font-bold text-[#181818] tracking-tight">Sponsors</h1>
        </div>
      </div>

      <div className="px-4 pb-16 space-y-3">
        {/* Title Sponsor */}
        <section>
          <h2 className="text-[12px] font-bold text-[#B51F32] uppercase tracking-wider mb-2 text-center">Title Sponsor</h2>
          <div className="flex justify-center">
            <div className="bg-white p-3 rounded-[14px] border-2 border-[#B51F32]/20 shadow-sm w-full max-w-[200px] flex flex-col items-center gap-2">
              <img src={SPONSORS[0].logo} alt={SPONSORS[0].company} className="w-20 h-20 object-contain" onError={(e) => handleImageError(e, SPONSORS[0].company)} />
              <span className="font-bold text-[#181818]">{SPONSORS[0].company}</span>
            </div>
          </div>
        </section>

        {/* Platinum Sponsors */}
        <section>
          <h2 className="text-[12px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-2 text-center">Platinum Sponsors</h2>
          <div className="grid grid-cols-2 gap-2">
            {SPONSORS.filter(s => s.tier === 'Platinum Sponsor').map(sponsor => (
              <div key={sponsor.company} className="bg-white p-2.5 rounded-lg border border-[#DEDCD7] shadow-sm flex flex-col items-center gap-2">
                <img src={sponsor.logo} alt={sponsor.company} className="w-8 h-8 object-contain" onError={(e) => handleImageError(e, sponsor.company)} />
                <span className="font-bold text-[12px] text-[#181818] text-center leading-tight">{sponsor.company}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gold Sponsors */}
        <section>
          <h2 className="text-[12px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-2 text-center">Gold Sponsors</h2>
          <div className="grid grid-cols-3 gap-2">
            {SPONSORS.filter(s => s.tier === 'Gold Sponsor').map(sponsor => (
              <div key={sponsor.company} className="bg-white p-2 rounded-lg border border-[#DEDCD7] flex flex-col items-center gap-2">
                <img src={sponsor.logo} alt={sponsor.company} className="w-8 h-8 object-contain" onError={(e) => handleImageError(e, sponsor.company)} />
                <span className="font-bold text-[11px] text-[#181818] text-center leading-tight truncate w-full">{sponsor.company}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Silver & Bronze Sponsors */}
        <section>
          <h2 className="text-[12px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-2 text-center">Silver & Bronze Sponsors</h2>
          <div className="grid grid-cols-3 gap-2">
            {SPONSORS.filter(s => s.tier === 'Silver Sponsor' || s.tier === 'Bronze Sponsor').map(sponsor => (
              <div key={sponsor.company} className="bg-white p-2 rounded-lg border border-[#DEDCD7] flex flex-col items-center gap-1">
                <img src={sponsor.logo} alt={sponsor.company} className="w-8 h-8 object-contain opacity-80" onError={(e) => handleImageError(e, sponsor.company)} />
                <span className="font-semibold text-[10px] text-[#6B6B6B] text-center leading-tight truncate w-full">{sponsor.company}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
