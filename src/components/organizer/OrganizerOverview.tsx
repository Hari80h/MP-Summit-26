'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import {
  Users,
  CheckCircle2,
  Building2,
  Mic,
  QrCode,
  Share2,
  Download
} from 'lucide-react';

export const OrganizerOverview: React.FC = () => {
  const {
    event,
    exhibitors,
    setActiveOrganizerTab,
  } = useStore();

  const registered = event.totalRegistered || 2438;
  const checkedIn = event.totalCheckedIn || 1120;
  const exhibitorsCount = event.totalExhibitors || 86;
  const speakersCount = event.totalSpeakers || 42;
  const scansCount = event.totalScans || 6212;
  const connectionsCount = event.totalConnections || 3281;
  const checkInRate = registered > 0 ? Math.round((checkedIn / registered) * 100) : 46;

  // Top exhibitors data matching mockup
  const leadExhibitors = [
    { name: 'Microsoft', booth: 'B-14', leads: 248, max: 280 },
    { name: 'Google Cloud', booth: 'B-02', leads: 186, max: 280 },
    { name: 'AWS', booth: 'B-09', leads: 164, max: 280 },
    { name: 'TCS', booth: 'B-21', leads: 142, max: 280 },
    { name: 'Infosys', booth: 'B-30', leads: 96, max: 280 },
  ];

  return (
    <div className="space-y-6 select-text max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8C8983] block select-text">
            {event.id} · {event.city.toUpperCase()} · DAY 1 OF 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight mt-1 select-text">
            {event.name}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-[#5E5B54] select-text">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="font-medium select-text">
              LIVE · {checkedIn.toLocaleString()} of {registered.toLocaleString()} checked in ({checkInRate}%)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveOrganizerTab('reports')}
            className="px-4 py-2 bg-white hover:bg-[#F2EFE9] text-[#1A1A1A] text-sm font-medium rounded-xl border border-[#DDD8CE] shadow-xs transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#1A1A1A]" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setActiveOrganizerTab('reports')}
            className="px-5 py-2 bg-[#101012] hover:bg-black text-white text-sm font-medium rounded-xl border border-[#B51F32]/40 shadow-[0_2px_10px_rgba(181,31,50,0.18)] transition-colors"
          >
            Event Report
          </button>
        </div>
      </div>

      {/* 6 Core Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Registered */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-xs flex flex-col justify-between h-[105px] select-text">
          <Users className="w-4 h-4 text-[#8C8983]" />
          <div>
            <p className="text-2xl font-semibold text-[#1A1A1A] tracking-tight leading-none select-text">
              {registered.toLocaleString()}
            </p>
            <p className="text-xs text-[#8C8983] mt-1.5 select-text">Registered</p>
          </div>
        </div>

        {/* Checked in */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-xs flex flex-col justify-between h-[105px] select-text">
          <CheckCircle2 className="w-4 h-4 text-[#8C8983]" />
          <div>
            <p className="text-2xl font-semibold text-[#1A1A1A] tracking-tight leading-none select-text">
              {checkedIn.toLocaleString()}
            </p>
            <p className="text-xs text-[#8C8983] mt-1.5 select-text">Checked in</p>
          </div>
        </div>

        {/* Exhibitors */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-xs flex flex-col justify-between h-[105px] select-text">
          <Building2 className="w-4 h-4 text-[#8C8983]" />
          <div>
            <p className="text-2xl font-semibold text-[#1A1A1A] tracking-tight leading-none select-text">
              {exhibitorsCount}
            </p>
            <p className="text-xs text-[#8C8983] mt-1.5 select-text">Exhibitors</p>
          </div>
        </div>

        {/* Speakers */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-xs flex flex-col justify-between h-[105px] select-text">
          <Mic className="w-4 h-4 text-[#8C8983]" />
          <div>
            <p className="text-2xl font-semibold text-[#1A1A1A] tracking-tight leading-none select-text">
              {speakersCount}
            </p>
            <p className="text-xs text-[#8C8983] mt-1.5 select-text">Speakers</p>
          </div>
        </div>

        {/* QR scans */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-xs flex flex-col justify-between h-[105px] select-text">
          <QrCode className="w-4 h-4 text-[#8C8983]" />
          <div>
            <p className="text-2xl font-semibold text-[#1A1A1A] tracking-tight leading-none select-text">
              {scansCount.toLocaleString()}
            </p>
            <p className="text-xs text-[#8C8983] mt-1.5 select-text">QR scans</p>
          </div>
        </div>

        {/* Connections */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8E4DA] shadow-xs flex flex-col justify-between h-[105px] select-text">
          <Share2 className="w-4 h-4 text-[#8C8983]" />
          <div>
            <p className="text-2xl font-semibold text-[#1A1A1A] tracking-tight leading-none select-text">
              {connectionsCount.toLocaleString()}
            </p>
            <p className="text-xs text-[#8C8983] mt-1.5 select-text">Connections</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Top Exhibitors & Right Column Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Top exhibitors by leads */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#1A1A1A]">Top exhibitors by leads</h2>
            <button
              onClick={() => setActiveOrganizerTab('exhibitors')}
              className="text-xs font-semibold text-[#C84A3B] hover:underline"
            >
              All exhibitors
            </button>
          </div>

          <div className="space-y-4">
            {leadExhibitors.map((ex) => {
              const percentage = Math.round((ex.leads / ex.max) * 100);

              return (
                <div key={ex.name} className="flex items-center gap-4 text-xs">
                  <div className="w-24 sm:w-28 flex-shrink-0">
                    <p className="font-bold text-[#1A1A1A] truncate">{ex.name}</p>
                    <p className="text-[11px] text-[#8C8983] font-mono">{ex.booth}</p>
                  </div>

                  <div className="flex-1 bg-[#EFECE4] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#101012] h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <span className="w-10 text-right font-bold text-[#1A1A1A] font-mono text-sm flex-shrink-0">
                    {ex.leads}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Check-in Progress (Black + Red Shadow) & Today's Programme */}
        <div className="lg:col-span-5 space-y-4">
          {/* Check-in Progress Box (Styled black with subtle red shadow theme per user request) */}
          <div className="relative overflow-hidden bg-[#101012] text-white rounded-2xl p-6 border border-[#B51F32]/40 shadow-[0_8px_30px_rgba(181,31,50,0.22)]">
            {/* Ambient subtle red corner glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#B51F32]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                CHECK-IN PROGRESS
              </p>
              <p className="text-4xl font-serif font-bold text-white tracking-tight mt-1">
                {checkInRate}%
              </p>

              {/* Progress bar with red theme */}
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mt-4">
                <div
                  className="bg-gradient-to-r from-[#B51F32] to-[#E0533C] h-full rounded-full shadow-[0_0_10px_rgba(181,31,50,0.6)] transition-all duration-500"
                  style={{ width: `${checkInRate}%` }}
                />
              </div>

              <p className="text-xs text-white/60 mt-3 font-medium">
                Peak: 9:00–9:45 AM · Gate A fastest (38/min)
              </p>
            </div>
          </div>

          {/* Today's programme */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-xs">
            <h3 className="text-base font-bold text-[#1A1A1A] mb-4">
              Today&apos;s programme
            </h3>

            <div className="space-y-4">
              {/* Item 1 */}
              <div className="flex items-start gap-3 text-xs">
                <span className="text-xs font-mono font-medium text-[#8C8983] w-12 pt-0.5 flex-shrink-0">
                  10:00
                </span>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">Global Semiconductor Trends</p>
                  <p className="text-xs text-[#8C8983] mt-0.5">
                    Main Plenary Hall · 1,680 attending ·{' '}
                    <span className="text-[#16A34A] font-semibold">LIVE</span>
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3 text-xs">
                <span className="text-xs font-mono font-medium text-[#8C8983] w-12 pt-0.5 flex-shrink-0">
                  11:00
                </span>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">
                    Inaugural Session — MP Semi Ecosystem
                  </p>
                  <p className="text-xs text-[#8C8983] mt-0.5">Grand Plenary Auditorium · 2,200 attending</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3 text-xs">
                <span className="text-xs font-mono font-medium text-[#8C8983] w-12 pt-0.5 flex-shrink-0">
                  14:00
                </span>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">
                    Fab, Manufacturing & Supply Chain
                  </p>
                  <p className="text-xs text-[#8C8983] mt-0.5">Hall A · 1,250 attending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
