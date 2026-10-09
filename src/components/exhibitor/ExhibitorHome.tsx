'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import { QrCode, Users, Package, ArrowRight, Building2, MapPin, CheckCircle, Flame } from 'lucide-react';

export const ExhibitorHome: React.FC = () => {
  const {
    leads,
    products,
    exhibitors,
    setActiveExhibitorTab,
  } = useStore();

  const msftProductsCount = products.filter((p) => p.company.toLowerCase() === 'microsoft').length;

  const msft = exhibitors.find((e) => e.company === 'Microsoft') || {
    visits: 312,
    leads: leads.length,
    enquiries: 48,
    teamSize: 6,
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] select-none px-2 pt-2 pb-16 space-y-2">
      {/* Booth Identifier Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[14px] bg-[#00A4EF] text-white flex items-center justify-center font-bold text-[12px] shadow-sm">
            MS
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[12px] font-bold text-[#181818] tracking-tight">Microsoft</h1>
              <span className="w-2 h-2 rounded-full bg-[#2F7D58]" />
            </div>
            <p className="text-xs text-[#6B6B6B] flex items-center gap-1">
              <span>Booth B-14</span>
              <span>·</span>
              <span>Hall B</span>
              <span>·</span>
              <strong className="text-[#181818]">ITS26</strong>
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F7D58] bg-[#EBF5F0] border border-[#2F7D58]/30 px-2 py-0.5 rounded">
            Booth Live
          </span>
          <p className="text-[11px] text-[#6B6B6B] mt-0.5">6 Staff Checked-in</p>
        </div>
      </div>

      {/* 4 Core Metrics Grid (3-second readability) */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <span className="text-xs font-semibold text-[#6B6B6B]">Booth Visits</span>
          <p className="text-[15px] font-black text-[#181818] mt-1 font-mono tracking-tight">
            {msft.visits}
          </p>
          <span className="text-[10px] text-[#2F7D58] font-bold flex items-center gap-0.5 mt-0.5">
            <span>↑ 18% vs target</span>
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border-2 border-[#B51F32]/20 shadow-xs relative overflow-hidden">
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B51F32]" />
          <span className="text-xs font-semibold text-[#B51F32]">Leads Captured</span>
          <p className="text-[15px] font-black text-[#181818] mt-1 font-mono tracking-tight">
            {msft.leads}
          </p>
          <span className="text-[10px] text-[#6B6B6B] mt-0.5 block">
            Target: 300 leads
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <span className="text-xs font-semibold text-[#6B6B6B]">Product Enquiries</span>
          <p className="text-[15px] font-black text-[#181818] mt-1 font-mono tracking-tight">
            {msft.enquiries}
          </p>
          <span className="text-[10px] text-[#2F7D58] font-bold flex items-center gap-0.5 mt-0.5">
            <span>High conversion</span>
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <span className="text-xs font-semibold text-[#6B6B6B]">Connections</span>
          <p className="text-[15px] font-black text-[#181818] mt-1 font-mono tracking-tight">
            96
          </p>
          <span className="text-[10px] text-[#6B6B6B] mt-0.5 block">
            Team interactions
          </span>
        </div>
      </div>

      {/* Primary Action Buttons (44px targets) */}
      <div className="space-y-2.5 pt-1">
        <button
          onClick={() => setActiveExhibitorTab('scan')}
          className="w-full h-8 bg-[#B51F32] hover:bg-[#9C1A2B] active:scale-[0.98] text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4 stroke-[2.4]" />
          <span>Scan Attendee QR Badge</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setActiveExhibitorTab('leads')}
            className="h-11 bg-white hover:bg-[#F6F4F0] active:scale-[0.98] border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-[#181818]" />
            <span>View Leads ({msft.leads})</span>
          </button>

          <button
            onClick={() => setActiveExhibitorTab('products')}
            className="h-11 bg-white hover:bg-[#F6F4F0] active:scale-[0.98] border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5 text-[#181818]" />
            <span>View Products ({msftProductsCount})</span>
          </button>
        </div>
      </div>

      {/* Featured Showcase Info Card */}
      <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#181818]">Booth Spotlight</span>
          <span className="text-[10px] text-[#B51F32] font-semibold">B-14 Main Stage</span>
        </div>

        <p className="text-xs text-[#6B6B6B] leading-relaxed">
          Showcasing Azure AI Platform, Microsoft Fabric, Copilot Studio, and Security Suite. Interactive hands-on developer demos run hourly until 5:00 PM.
        </p>

        <div className="p-2.5 bg-[#EFEEEA] rounded-lg flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#181818]">Lead Capture SLA</span>
            <p className="text-[10px] text-[#6B6B6B]">Automatic CRM sync via EventSphere webhook</p>
          </div>
          <span className="text-[11px] font-bold text-[#2F7D58]">Active</span>
        </div>
      </div>
    </div>
  );
};
