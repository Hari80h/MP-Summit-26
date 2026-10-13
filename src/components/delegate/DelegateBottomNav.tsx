'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import { Home, Calendar, Building2, User } from 'lucide-react';

export const DelegateBottomNav: React.FC = () => {
  const {
    activeDelegateTab,
    setActiveDelegateTab,
    setSelectedSessionId,
    setViewSavedCompaniesOnly,
  } = useStore();

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'schedule' as const, label: 'Agenda', icon: Calendar },
    { id: 'companies' as const, label: 'Exhibitors', icon: Building2 },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="flex-shrink-0 w-full z-40 bg-[#FFFFFF] border-t border-[#DEDCD7] pb-safe px-2 pt-1 shadow-md select-none">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive =
            activeDelegateTab === item.id ||
            (item.id === 'home' &&
              [
                'speakers',
                'polls',
                'map',
                'sponsors',
                'ai_recommendations',
                'support',
                'people',
              ].includes(activeDelegateTab)) ||
            (item.id === 'companies' && activeDelegateTab === 'company_detail');
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'schedule') {
                  setSelectedSessionId(null);
                }
                if (item.id === 'companies') {
                  setViewSavedCompaniesOnly(false);
                }
                setActiveDelegateTab(item.id);
              }}
              className={`flex-1 flex flex-col items-center justify-center min-h-[42px] py-1 transition-colors relative ${
                isActive ? 'text-[#D11E39]' : 'text-[#6B6B6B] hover:text-[#181818]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-[22px] h-[22px] ${
                    isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
              </div>
              <div className="flex flex-col items-center mt-1">
                <span
                  className={`text-[9.5px] font-medium tracking-tight ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
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
