'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import { ShieldCheck, Database, RefreshCw, Key, Globe, Radio } from 'lucide-react';

export const OrganizerSettings: React.FC = () => {
  const { event, resetAllData, showToast } = useStore();

  const handleTestWebhook = () => {
    showToast('External Registration Webhook test: 200 OK ✓', 'success');
  };

  const handleBroadcastAlert = () => {
    showToast('Emergency announcement broadcasted to 1,120 active badges ✓', 'info');
  };

  return (
    <div className="space-y-3 select-text max-w-4xl">
      <div>
        <h1 className="text-[15px] font-black text-[#181818] tracking-tight">Console Settings</h1>
        <p className="text-xs text-[#6B6B6B] mt-0.5">
          Event configuration, registration integration, and data management
        </p>
      </div>

      <div className="bg-white p-3 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-2">
        <h3 className="text-[12px] font-bold text-[#181818]">Core Event Identity</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div>
            <label className="block text-[#6B6B6B] mb-1 font-semibold">Event Name</label>
            <input
              type="text"
              readOnly
              value={event.name}
              className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] font-semibold text-[#181818]"
            />
          </div>
          <div>
            <label className="block text-[#6B6B6B] mb-1 font-semibold">Event ID</label>
            <input
              type="text"
              readOnly
              value={event.id}
              className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] font-mono font-bold text-[#181818]"
            />
          </div>
          <div>
            <label className="block text-[#6B6B6B] mb-1 font-semibold">Dates</label>
            <input
              type="text"
              readOnly
              value={event.dates}
              className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-[#181818]"
            />
          </div>
          <div>
            <label className="block text-[#6B6B6B] mb-1 font-semibold">Venue</label>
            <input
              type="text"
              readOnly
              value={`${event.venue}, ${event.city}`}
              className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-[#181818]"
            />
          </div>
        </div>
      </div>

      {/* Integration & Webhook */}
      <div className="bg-white p-3 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-3">
        <h3 className="text-[12px] font-bold text-[#181818]">External Registration System Bridge</h3>
        <p className="text-xs text-[#6B6B6B] leading-relaxed">
          EventSphere receives verified attendees via webhook from your primary ticketing portal. Attendee records are encrypted and synced in real time.
        </p>

        <div className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2F7D58]" />
            <span className="font-mono text-[#181818]">https://api.eventsphere.io/v2/webhook/MPSS26</span>
          </div>
          <button
            onClick={handleTestWebhook}
            className="px-3 py-1 bg-white hover:bg-[#EFEEEA] border border-[#DEDCD7] rounded-lg font-semibold text-xs text-[#181818]"
          >
            Test Webhook
          </button>
        </div>
      </div>

      {/* Demo State Control */}
      <div className="bg-white p-3 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-3">
        <h3 className="text-[12px] font-bold text-[#181818]">Demo Reset & Diagnostic Controls</h3>
        <p className="text-xs text-[#6B6B6B]">
          Restore initial mock attendees, leads, and questions for subsequent sales demonstrations.
        </p>

        <div className="pt-1">
          <button
            onClick={resetAllData}
            className="px-3 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-[#B51F32] font-bold text-xs rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Data to Initial State</span>
          </button>
        </div>
      </div>
    </div>
  );
};
