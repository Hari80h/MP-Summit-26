'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import {
  Users,
  UserCheck,
  Building,
  Mic,
  QrCode,
  Share2,
  TrendingUp,
  ArrowRight,
  Calendar,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const OrganizerOverview: React.FC = () => {
  const {
    event,
    exhibitors,
    setActiveOrganizerTab,
  } = useStore();

  const checkInRate = ((event.totalCheckedIn / event.totalRegistered) * 100).toFixed(1);

  // Sort exhibitors by leads descending
  const sortedExhibitors = [...exhibitors].sort((a, b) => b.leads - a.leads);

  return (
    <div className="space-y-3 select-none max-w-6xl">
      {/* Event Header Banner */}
      <div className="bg-white p-3 rounded-[14px] border border-[#DEDCD7] shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B51F32] animate-pulse" />
            <span className="px-2 py-0.5 bg-red-50 text-[#B51F32] text-xs font-bold uppercase rounded-md tracking-wider border border-red-100">
              {event.status} EVENT
            </span>
            <span className="text-xs font-mono font-bold text-[#181818] bg-[#EFEEEA] px-2 py-0.5 rounded border border-[#DEDCD7]">
              {event.id}
            </span>
          </div>
          <h1 className="text-[15px] font-black text-[#181818] tracking-tight">
            {event.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B6B6B] mt-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#181818]" />
              {event.dates}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#181818]" />
              {event.venue}, {event.city}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveOrganizerTab('analytics')}
          className="px-3 py-2.5 bg-[#B51F32] hover:bg-[#9C1A2B] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>View Full Analytics</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 Core Metrics Cards (3-second readability) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
            <span className="font-semibold">Total Registered</span>
            <Users className="w-4 h-4 text-[#181818]" />
          </div>
          <p className="text-3xl font-black text-[#181818] font-mono mt-2 tracking-tight">
            {event.totalRegistered.toLocaleString()}
          </p>
          <p className="text-[11px] text-[#6B6B6B] mt-1">
            Confirmed external registrations
          </p>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border-2 border-[#2F7D58]/30 shadow-xs relative">
          <div className="flex items-center justify-between text-xs text-[#2F7D58]">
            <span className="font-bold">Checked In</span>
            <UserCheck className="w-4 h-4 text-[#2F7D58]" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-black text-[#181818] font-mono tracking-tight">
              {event.totalCheckedIn.toLocaleString()}
            </p>
            <span className="text-xs font-bold text-[#2F7D58] bg-[#EBF5F0] px-1.5 py-0.5 rounded">
              {checkInRate}%
            </span>
          </div>
          <div className="w-full bg-[#EFEEEA] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#2F7D58] h-full rounded-full transition-all duration-500"
              style={{ width: `${checkInRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
            <span className="font-semibold">Exhibitors</span>
            <Building className="w-4 h-4 text-[#181818]" />
          </div>
          <p className="text-3xl font-black text-[#181818] font-mono mt-2 tracking-tight">
            {event.totalExhibitors}
          </p>
          <p className="text-[11px] text-[#6B6B6B] mt-1">
            Across Halls A, B, and C
          </p>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
            <span className="font-semibold">Speakers</span>
            <Mic className="w-4 h-4 text-[#181818]" />
          </div>
          <p className="text-3xl font-black text-[#181818] font-mono mt-2 tracking-tight">
            {event.totalSpeakers}
          </p>
          <p className="text-[11px] text-[#6B6B6B] mt-1">
            Keynotes & technical tracks
          </p>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
            <span className="font-semibold">Total QR Scans</span>
            <QrCode className="w-4 h-4 text-[#B51F32]" />
          </div>
          <p className="text-3xl font-black text-[#181818] font-mono mt-2 tracking-tight">
            {event.totalScans.toLocaleString()}
          </p>
          <p className="text-[11px] text-[#2F7D58] font-semibold mt-1">
            ↑ Real-time scan velocity
          </p>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
            <span className="font-semibold">Connections Made</span>
            <Share2 className="w-4 h-4 text-[#181818]" />
          </div>
          <p className="text-3xl font-black text-[#181818] font-mono mt-2 tracking-tight">
            {event.totalConnections.toLocaleString()}
          </p>
          <p className="text-[11px] text-[#6B6B6B] mt-1">
            Mutual delegate contacts
          </p>
        </div>
      </div>

      {/* Exhibitor Leads Leaderboard */}
      <div className="bg-white p-3 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-bold text-[#181818]">Top Exhibitor Lead Performance</h2>
            <p className="text-xs text-[#6B6B6B]">
              Real-time qualified attendee leads captured at sponsor booths
            </p>
          </div>
          <button
            onClick={() => setActiveOrganizerTab('exhibitors')}
            className="text-xs font-semibold text-[#B51F32] hover:underline"
          >
            All 86 Exhibitors →
          </button>
        </div>

        <div className="space-y-3">
          {sortedExhibitors.slice(0, 5).map((ex, index) => {
            const maxLeads = sortedExhibitors[0].leads || 1;
            const percentage = Math.round((ex.leads / maxLeads) * 100);

            return (
              <div key={ex.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EFEEEA] font-bold text-[10px] flex items-center justify-center text-[#181818]">
                      {index + 1}
                    </span>
                    <strong className="text-[#181818] font-semibold">{ex.company}</strong>
                    <span className="text-[#6B6B6B] font-mono text-[11px]">({ex.booth})</span>
                    {ex.company === 'Microsoft' && (
                      <span className="text-[9px] bg-red-50 text-[#B51F32] font-bold px-1.5 py-0.2 rounded border border-red-100">
                        Demo Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#181818]">
                      {ex.leads} leads
                    </span>
                    <span className="text-[11px] text-[#6B6B6B]">
                      {ex.visits} visits
                    </span>
                  </div>
                </div>

                <div className="w-full bg-[#EFEEEA] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ex.company === 'Microsoft' ? 'bg-[#B51F32]' : 'bg-[#181818]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
