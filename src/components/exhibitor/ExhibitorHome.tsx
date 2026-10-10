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
  } = useStore();

  const msftProducts = products.filter((p) => p.company.toLowerCase() === 'microsoft');

  const msft = exhibitors.find((e) => e.company === 'Microsoft') || {
    visits: 748,
    leads: leads.length,
    enquiries: 96,
    teamSize: 11,
  };

  return (
    <div className="flex-1 flex flex-col min-h-full bg-[#F6F4F0] select-none pb-24">
      {/* Page Header (Outside the black box) */}
      <div className="px-5 pt-6 pb-3 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
          Exhibitor · Booth B-14
        </span>
        <button className="p-2 -mr-2 rounded-full hover:bg-[#E5E3DC] transition-colors">
          <Bell className="w-5 h-5 text-[#181818]" />
        </button>
      </div>

      {/* Dark Metrics Card (The smaller black box) */}
      <div className="bg-[#151515] mx-4 px-5 pt-6 pb-6 text-white rounded-3xl shadow-2xl relative z-10 overflow-hidden">
        {/* Soft Red Glow Background */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-bl from-[#B51F32]/40 via-[#B51F32]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Title */}
        <div className="mb-6 relative z-10">
          <h1 className="text-3xl font-serif mb-1 tracking-tight text-white">Microsoft</h1>
          <p className="text-[11px] text-gray-400">ITS26 · Hall B · {msft.teamSize} team members on floor</p>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
          {/* Card 1 - Highlighted */}
          <div className="bg-[#F6F4F0] p-4 rounded-2xl flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-[#B51F32]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-light text-[#181818] leading-none mb-1">{msft.visits}</span>
                <span className="text-[10px] text-[#6B6B6B] font-medium">Booth visits</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* Card 2 */}
          <div className="bg-[#242424] p-4 rounded-2xl flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#B51F32]/15 flex items-center justify-center shrink-0">
                <BarChart2 className="w-4 h-4 text-[#E68A96]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-light text-white leading-none mb-1">{msft.leads || 171}</span>
                <span className="text-[10px] text-gray-400 font-medium">Leads</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>

          {/* Card 3 */}
          <div className="bg-[#242424] p-4 rounded-2xl flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#B51F32]/15 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4 text-[#E68A96]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-light text-white leading-none mb-1">{msft.enquiries || 96}</span>
                <span className="text-[10px] text-gray-400 font-medium">Product enquiries</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>

          {/* Card 4 */}
          <div className="bg-[#242424] p-4 rounded-2xl flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#B51F32]/15 flex items-center justify-center shrink-0">
                <Link className="w-4 h-4 text-[#E68A96]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-light text-white leading-none mb-1">96</span>
                <span className="text-[10px] text-gray-400 font-medium">Connections</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
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
