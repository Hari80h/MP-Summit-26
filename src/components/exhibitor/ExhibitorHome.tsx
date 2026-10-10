'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import { QrCode, Bell, ChevronRight, Users, BarChart2, ShoppingBag, Link } from 'lucide-react';

export const ExhibitorHome: React.FC = () => {
  const {
    leads,
    products,
    exhibitors,
    setActiveExhibitorTab,
    currentUser,
  } = useStore();

  const msftProducts = products.filter((p) => p.company.toLowerCase() === 'microsoft');

  const msft = exhibitors.find((e) => e.company === 'Microsoft') || {
    visits: 748,
    leads: leads.length,
    enquiries: 96,
    teamSize: 11,
  };

  const getGreetingIST = () => {
    const options = { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false } as const;
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const hour = parseInt(formatter.format(new Date()), 10);
    if (hour < 12) return 'Good morning,';
    if (hour < 17) return 'Good afternoon,';
    return 'Good evening,';
  };

  return (
    <div className="flex-1 flex flex-col min-h-full bg-[#F6F4F0] select-none pb-24">
      {/* Top Greeting & Attendee Identity Header */}
      <div className="px-3 pt-3 pb-3">
        <div className="flex items-center justify-between bg-[#EFEBE5] rounded-[20px] p-3.5 shadow-sm relative overflow-hidden">
          <div className="absolute -top-12 -right-8 w-24 h-24 bg-white/40 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-24 h-24 bg-[#E5DFD6]/60 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex flex-col relative z-10">
            <span className="text-[9.5px] uppercase tracking-widest font-extrabold text-[#737373] mb-1">
              {getGreetingIST()}
            </span>
            <h1 className="text-[21px] font-serif font-medium text-[#181818] leading-none mb-1">
              Microsoft Team
            </h1>
            <p className="text-[11.5px] font-semibold text-[#6B6B6B] leading-none">
              Exhibitor <span className="opacity-50 mx-0.5">·</span> Booth B-14
            </p>
          </div>

          <button
            onClick={() => setActiveExhibitorTab('more')}
            className="relative group focus:outline-none z-10 flex-shrink-0 ml-2"
          >
            <div className="w-[52px] h-[52px] rounded-full bg-[#181818] text-white flex items-center justify-center font-bold text-xl border-[3px] border-white shadow-sm">
              M
            </div>
            <span className="absolute bottom-0 -right-0.5 w-[20px] h-[20px] bg-[#10B981] border-[2.5px] border-white rounded-full" />
          </button>
        </div>
      </div>

      {/* Dark Metrics Card (The smaller black box) */}
      <div className="bg-[#151515] mx-4 px-5 pt-6 pb-6 text-white rounded-3xl shadow-2xl relative z-10 overflow-hidden shrink-0">
        {/* Soft Red Glow Background */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-bl from-[#B51F32]/40 via-[#B51F32]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Title */}
        <div className="mb-6 relative z-10">
          <h1 className="text-3xl font-serif mb-1 tracking-tight text-white">Microsoft</h1>
          <p className="text-[11px] text-gray-400">ITS26 · Hall B · {msft.teamSize} team members on floor</p>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6 relative z-10">
          {/* Card 1 */}
          <div className="bg-[#242424] p-3 rounded-2xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#B51F32]/15 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-[#E68A96]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-light text-white leading-none mb-0.5">{msft.visits}</span>
              <span className="text-[10px] text-gray-400 font-medium">Booth visits</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#242424] p-3 rounded-2xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#B51F32]/15 flex items-center justify-center shrink-0">
              <BarChart2 className="w-4 h-4 text-[#E68A96]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-light text-white leading-none mb-0.5">{msft.leads || 171}</span>
              <span className="text-[10px] text-gray-400 font-medium">Leads</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#242424] p-3 rounded-2xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#B51F32]/15 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-[#E68A96]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-light text-white leading-none mb-0.5">{msft.enquiries || 96}</span>
              <span className="text-[10px] text-gray-400 font-medium">Product enquiries</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#242424] p-3 rounded-2xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#B51F32]/15 flex items-center justify-center shrink-0">
              <Link className="w-4 h-4 text-[#E68A96]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-light text-white leading-none mb-0.5">96</span>
              <span className="text-[10px] text-gray-400 font-medium">Connections</span>
            </div>
          </div>
        </div>

        {/* Primary Scan Button */}
        <button
          onClick={() => setActiveExhibitorTab('scan')}
          className="w-full h-14 bg-gradient-to-r from-[#B51F32] to-[#8C1625] hover:from-[#9C1A2B] hover:to-[#73101D] text-white font-semibold text-sm rounded-2xl flex items-center justify-between px-5 transition-all active:scale-[0.98] shadow-md relative z-10"
        >
          <div className="flex items-center gap-2 flex-1 justify-center ml-5">
            <QrCode className="w-5 h-5" />
            <span>Scan Attendee QR</span>
          </div>
          <ChevronRight className="w-5 h-5 opacity-70" />
        </button>
      </div>

      {/* Bottom Light Section */}
      <div className="bg-[#F6F4F0] px-5 pt-8 flex-1">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-serif text-[#181818]">Product interest today</h2>
          <button 
            onClick={() => setActiveExhibitorTab('products')} 
            className="text-xs font-semibold text-[#B51F32] hover:underline"
          >
            All products
          </button>
        </div>

        <div className="space-y-3">
          {msftProducts.slice(0, 2).map((product) => (
            <div 
              key={product.id} 
              className="bg-white p-4 rounded-[16px] border border-[#DEDCD7] flex justify-between items-center cursor-pointer active:scale-[0.99] transition-transform" 
              onClick={() => setActiveExhibitorTab('products')}
            >
              <div>
                <h3 className="text-base font-semibold text-[#181818] mb-0.5">{product.name}</h3>
                <p className="text-xs text-[#6B6B6B]">
                  {product.interestedVisitorsCount} interested · {product.views} views
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
