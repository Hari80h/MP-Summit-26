'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import {
  Building2,
  Users,
  Download,
  Settings,
  Info,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Wifi
} from 'lucide-react';

export const ExhibitorMore: React.FC = () => {
  const { showToast, leads, setHasAccessConfirmed } = useStore();

  const handleExportAllLeads = () => {
    showToast(`Exported ${leads.length} booth leads as CSV ✓`, 'success');
  };

  const handleNotImplemented = (feature: string) => {
    showToast(`Opening ${feature}...`, 'success');
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] select-none px-4 pt-4 pb-24 space-y-5">
      {/* Header Profile */}
      <div className="bg-white p-5 rounded-3xl border border-[#DEDCD7] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#181818] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            MS
          </div>
          <div>
            <h2 className="text-xl font-serif text-[#181818]">Microsoft India</h2>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Booth B-14 · Hall B · Cloud & AI Tier 1
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold bg-[#EFEEEA] px-2.5 py-1 rounded-md text-[#181818]">
          ITS26
        </span>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-3xl border border-[#DEDCD7] shadow-sm divide-y divide-[#DEDCD7]/60 overflow-hidden text-sm">
        <div 
          onClick={() => handleNotImplemented('Company Profile')}
          className="p-4 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#181818]" />
            </div>
            <div>
              <span className="font-semibold text-[#181818] text-base">Company Profile</span>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Booth overview, branding & description</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        <div 
          onClick={() => handleNotImplemented('Team Members')}
          className="p-4 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#181818]" />
            </div>
            <div>
              <span className="font-semibold text-[#181818] text-base">Team Members</span>
              <p className="text-xs text-[#6B6B6B] mt-0.5">6 active staff badges assigned to B-14</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        <div
          onClick={handleExportAllLeads}
          className="p-4 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <Download className="w-5 h-5 text-[#B51F32]" />
            </div>
            <div>
              <span className="font-semibold text-[#181818] text-base">Lead Export</span>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Download all {leads.length} captured leads (CSV / JSON)</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        <div 
          onClick={() => handleNotImplemented('Product Settings')}
          className="p-4 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#181818]" />
            </div>
            <div>
              <span className="font-semibold text-[#181818] text-base">Product Settings</span>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Manage catalog order and brochure downloads</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        <div 
          onClick={() => handleNotImplemented('Event Information')}
          className="p-4 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <Info className="w-5 h-5 text-[#181818]" />
            </div>
            <div>
              <span className="font-semibold text-[#181818] text-base">Event Information</span>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Exhibitor handbook, logistics & hall map</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        <div 
          onClick={() => handleNotImplemented('Help & Support')}
          className="p-4 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-[#181818]" />
            </div>
            <div>
              <span className="font-semibold text-[#181818] text-base">Help & Support</span>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Live organizer help desk & tech support</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Return Home Action */}
      <div className="pt-2">
        <button
          onClick={() => setHasAccessConfirmed(false)}
          className="w-full h-14 bg-red-50 hover:bg-red-100 border border-red-200 text-[#B51F32] font-semibold text-sm rounded-2xl shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Return to Home Page</span>
        </button>
      </div>
    </div>
  );
};
