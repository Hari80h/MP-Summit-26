'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import { Home, Users, QrCode, Calendar, User } from 'lucide-react';

export const DelegateBottomNav: React.FC = () => {
  const { activeDelegateTab, setActiveDelegateTab, setSelectedSessionId, connections } = useStore();

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'schedule' as const, label: 'Agenda', icon: Calendar },
    { id: 'scan' as const, label: 'SCAN', icon: QrCode, isRaised: true },
    { id: 'people' as const, label: 'Network', icon: Users, badge: connections.length > 0 ? connections.length : undefined },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="flex-shrink-0 w-full z-40 bg-[#FFFFFF] border-t border-[#DEDCD7] pb-safe px-2 pt-0.5 shadow-md select-none">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = activeDelegateTab === item.id || (item.id === 'home' && ['speakers', 'polls', 'map', 'sponsors', 'ai_recommendations'].includes(activeDelegateTab));
          const Icon = item.icon;

          if (item.isRaised) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveDelegateTab(item.id)}
                className="flex-1 flex flex-col items-center justify-end min-h-[36px] py-1 relative group focus:outline-none"
                aria-label="Scan QR Code"
              >
                <div
                  className={`absolute -top-[28px] left-1/2 -translate-x-1/2 z-20 w-[50px] h-[50px] rounded-full flex items-center justify-center border-[2px] border-white ring-[2px] ring-[#FFD1D9] shadow-[0_8px_16px_rgba(255,180,195,0.6)] transition-transform active:scale-95 ${
                    isActive ? 'bg-[#9C1A2B]' : 'bg-[#D11E39] hover:bg-[#B51F32]'
                  }`}
                >
                  <Icon className="w-[22px] h-[22px] text-white stroke-[2.2]" />
                </div>
                
                {/* Placeholder to match the height of other tab icons, ensuring text aligns perfectly */}
                <div className="w-[22px] h-[22px]" />
                
                <div className="flex flex-col items-center mt-1 z-10">
                  <span className="text-[9px] font-bold tracking-tight text-[#181818]">
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
              onClick={() => {
                if (item.id === 'schedule') {
                  setSelectedSessionId(null);
                }
                setActiveDelegateTab(item.id);
              }}
              className={`flex-1 flex flex-col items-center justify-center min-h-[36px] py-1 transition-colors relative ${
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
                <span className={`text-[8px] font-medium ${isActive ? 'font-bold' : ''}`}>
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
