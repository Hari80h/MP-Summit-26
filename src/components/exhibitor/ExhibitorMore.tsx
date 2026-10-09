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
  const { setRole, showToast, leads } = useStore();

  const handleExportAllLeads = () => {
    showToast(`Exported ${leads.length} booth leads as CSV ✓`, 'success');
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] select-none px-2 pt-2 pb-16 space-y-2">
      {/* Header Profile */}
      <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00A4EF] text-white flex items-center justify-center font-bold text-[12px] shadow-sm">
            MS
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-[#181818]">Microsoft India</h2>
            <p className="text-xs text-[#6B6B6B]">
              Booth B-14 · Hall B · Cloud & AI Tier 1
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold bg-[#EFEEEA] px-2 py-0.5 rounded text-[#181818]">
          ITS26
        </span>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-[14px] border border-[#DEDCD7] shadow-xs divide-y divide-[#DEDCD7]/60 overflow-hidden text-xs">
        <div className="p-2.5 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#181818]" />
            <div>
              <span className="font-semibold text-[#181818]">Company Profile</span>
              <p className="text-[10px] text-[#6B6B6B]">Booth overview, branding & description</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
        </div>

        <div className="p-2.5 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#181818]" />
            <div>
              <span className="font-semibold text-[#181818]">Team Members</span>
              <p className="text-[10px] text-[#6B6B6B]">6 active staff badges assigned to B-14</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
        </div>

        <div
          onClick={handleExportAllLeads}
          className="p-2.5 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[#B51F32]" />
            <div>
              <span className="font-semibold text-[#181818]">Lead Export</span>
              <p className="text-[10px] text-[#6B6B6B]">Download all {leads.length} captured leads (CSV / JSON)</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
        </div>

        <div className="p-2.5 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#181818]" />
            <div>
              <span className="font-semibold text-[#181818]">Product Settings</span>
              <p className="text-[10px] text-[#6B6B6B]">Manage catalog order and brochure downloads</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
        </div>

        <div className="p-2.5 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#181818]" />
            <div>
              <span className="font-semibold text-[#181818]">Event Information</span>
              <p className="text-[10px] text-[#6B6B6B]">Exhibitor handbook, logistics & hall map</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
        </div>

        <div className="p-2.5 flex items-center justify-between hover:bg-[#F6F4F0] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#181818]" />
            <div>
              <span className="font-semibold text-[#181818]">Help & Support</span>
              <p className="text-[10px] text-[#6B6B6B]">Live organizer help desk & tech support</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
        </div>
      </div>

      {/* Switch to Delegate / Organizer shortcut */}
      <div className="pt-2">
        <button
          onClick={() => setRole('delegate')}
          className="w-full py-3 bg-white hover:bg-[#EFEEEA] border border-[#DEDCD7] text-[#181818] font-bold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4 text-[#B51F32]" />
          <span>Exit to Delegate View (Aarav Sharma)</span>
        </button>
      </div>
    </div>
  );
};
