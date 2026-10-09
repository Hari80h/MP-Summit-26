'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import { LayoutDashboard, Users, QrCode, Package, MoreHorizontal } from 'lucide-react';

export const ExhibitorBottomNav: React.FC = () => {
  const { activeExhibitorTab, setActiveExhibitorTab, leads } = useStore();

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: LayoutDashboard },
    { id: 'leads' as const, label: 'Leads', icon: Users, badge: leads.length > 0 ? leads.length : undefined },
    { id: 'scan' as const, label: 'SCAN', icon: QrCode, isRaised: true },
    { id: 'products' as const, label: 'Products', icon: Package },
    { id: 'more' as const, label: 'More', icon: MoreHorizontal },
  ];

  return (
    <nav className="flex-shrink-0 w-full z-40 bg-[#FFFFFF] border-t border-[#DEDCD7] pb-1 px-3 pt-1.5 shadow-md select-none">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = activeExhibitorTab === item.id;
          const Icon = item.icon;

          if (item.isRaised) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveExhibitorTab(item.id)}
                className="flex-1 flex flex-col items-center justify-end min-h-[44px] py-1 relative group focus:outline-none"
                aria-label="Scan Attendee Badge"
              >
                <div
                  className={`absolute -top-[35px] left-1/2 -translate-x-1/2 z-20 w-[58px] h-[58px] rounded-full flex items-center justify-center border-[3.5px] border-white ring-[3.5px] ring-[#FFD1D9] shadow-[0_8px_16px_rgba(255,180,195,0.6)] transition-transform active:scale-95 ${
                    isActive ? 'bg-[#9C1A2B]' : 'bg-[#D11E39] hover:bg-[#B51F32]'
                  }`}
                >
                  <Icon className="w-[26px] h-[26px] text-white stroke-[2.2]" />
                </div>
                
                {/* Placeholder to match the height of other tab icons, ensuring text aligns perfectly */}
                <div className="w-[22px] h-[22px]" />
                
                <div className="flex flex-col items-center mt-1 z-10">
                  <span className="text-[11px] font-bold tracking-tight text-[#181818]">
                    SCAN
                  </span>
                  {isActive && (
                    <div className="w-4 h-0.5 bg-[#D11E39] rounded-full mt-0.5" />
                  )}
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveExhibitorTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors relative ${
                isActive ? 'text-[#D11E39]' : 'text-[#6B6B6B] hover:text-[#181818]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-[22px] h-[22px] ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] bg-[#D11E39] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center mt-1">
                <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-4 h-0.5 bg-[#D11E39] rounded-full mt-0.5" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
