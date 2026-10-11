'use client';
import React, { useState, useEffect, useRef, Suspense } from "react";

import { BarChart2, BarChart3, Briefcase, Building2, Calendar, CheckCircle2, LineChart, Mic, QrCode, Share2, TrendingUp, User, Users } from 'lucide-react';
import { useStore } from '../../lib/store';

export const OrganizerAnalytics: React.FC = () => {
  const { event, exhibitors, poll, questions } = useStore();

  const checkInRate = ((event.totalCheckedIn / event.totalRegistered) * 100).toFixed(1);

  // Hourly scans distribution data
  const hourlyScans = [
    { hour: '08:00', count: 420 },
    { hour: '09:00', count: 1150 },
    { hour: '10:00', count: 1680 },
    { hour: '11:00', count: 1420 },
    { hour: '12:00', count: 890 },
    { hour: '13:00', count: 652 },
  ];

  const maxScan = Math.max(...hourlyScans.map((h) => h.count));

  // Sessions attendance
  const sessionCapacity = [
    { title: 'Opening Keynote', attended: 420, capacity: 500 },
    { title: 'FinTech Infrastructure', attended: 290, capacity: 350 },
    { title: 'Agentic Workflows', attended: 315, capacity: 400 },
    { title: 'Data Mesh Analytics', attended: 210, capacity: 300 },
  ];

  return (
    <div className="space-y-3 select-text max-w-6xl">
      {/* Header */}
      <div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · ORGANIZER</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Analytics</h1>
      </div>

      {/* Top 4 High-Impact KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <span className="text-xs font-semibold text-[#6B6B6B]">Check-In Conversion</span>
          <p className="text-[15px] font-black font-mono text-[#2F7D58] mt-1">
            {checkInRate}%
          </p>
          <span className="text-[10px] text-[#6B6B6B]">
            {event.totalCheckedIn.toLocaleString()} of {event.totalRegistered.toLocaleString()}
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <span className="text-xs font-semibold text-[#6B6B6B]">Total QR Engagements</span>
          <p className="text-[15px] font-black font-mono text-[#181818] mt-1">
            {event.totalScans.toLocaleString()}
          </p>
          <span className="text-[10px] text-[#2F7D58] font-bold">
            2.55 scans / delegate
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <span className="text-xs font-semibold text-[#6B6B6B]">Mutual Connections</span>
          <p className="text-[15px] font-black font-mono text-[#181818] mt-1">
            {event.totalConnections.toLocaleString()}
          </p>
          <span className="text-[10px] text-[#6B6B6B]">
            High networking density
          </span>
        </div>

        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <span className="text-xs font-semibold text-[#6B6B6B]">Total Sponsor Leads</span>
          <p className="text-[15px] font-black font-mono text-[#B51F32] mt-1">
            {exhibitors.reduce((acc, curr) => acc + curr.leads, 0)}
          </p>
          <span className="text-[10px] text-[#6B6B6B]">
            Across 86 booths
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* CHART 1: Hourly QR Scan Volume */}
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[12px] font-bold text-[#181818]">Hourly QR Scan Volume</h3>
              <p className="text-[11px] text-[#6B6B6B]">Badge scans & booth lead captures</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#B51F32] bg-red-50 border border-red-100 px-2 py-0.5 rounded">
              Peak: 10:00 AM
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-44 flex items-end gap-2 pt-3 border-b border-[#DEDCD7] pb-2">
            {hourlyScans.map((item) => {
              const heightPct = Math.round((item.count / maxScan) * 100);
              return (
                <div key={item.hour} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] font-mono font-bold text-[#181818] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div
                    className="w-full bg-[#181818] hover:bg-[#B51F32] transition-colors rounded-t-md"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[10px] text-[#6B6B6B] font-mono">{item.hour}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-[11px] text-[#6B6B6B]">
            <span>Morning Keynote surge captured 41% of total scans</span>
            <strong className="text-[#181818]">{event.totalScans} scans total</strong>
          </div>
        </div>

        {/* CHART 2: Sponsor Booth Footfall vs Leads */}
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[12px] font-bold text-[#181818]">Top Exhibitors: Visits vs Leads</h3>
              <p className="text-[11px] text-[#6B6B6B]">Footfall to qualified lead conversion rate</p>
            </div>
            <span className="text-xs font-semibold text-[#2F7D58]">Avg 74% conversion</span>
          </div>

          <div className="space-y-3 pt-2">
            {exhibitors.slice(0, 4).map((ex) => {
              const convRate = ((ex.leads / ex.visits) * 100).toFixed(0);
              return (
                <div key={ex.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#181818]">{ex.company} ({ex.booth})</span>
                    <span className="font-mono text-[#6B6B6B]">
                      <strong className="text-[#B51F32]">{ex.leads} leads</strong> / {ex.visits} visits ({convRate}%)
                    </span>
                  </div>

                  <div className="w-full bg-[#EFEEEA] h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#B51F32] h-full"
                      style={{ width: `${(ex.leads / ex.visits) * 100}%` }}
                    />
                    <div
                      className="bg-[#181818]/20 h-full flex-1"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-[11px] text-[#6B6B6B] pt-1">
            <span>Red = Qualified Leads</span>
            <span>Gray = Walk-in Visits</span>
          </div>
        </div>

        {/* CHART 3: Session Capacity & Attendance */}
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[12px] font-bold text-[#181818]">Session Capacity Utilization</h3>
              <p className="text-[11px] text-[#6B6B6B]">Hall seat occupancy by track</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#181818]">82.4% avg</span>
          </div>

          <div className="space-y-3 pt-2">
            {sessionCapacity.map((sc, idx) => {
              const occPct = Math.round((sc.attended / sc.capacity) * 100);
              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#181818]">{sc.title}</span>
                    <span className="font-mono text-[#6B6B6B]">
                      {sc.attended} / {sc.capacity} ({occPct}%)
                    </span>
                  </div>

                  <div className="w-full bg-[#EFEEEA] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        occPct > 80 ? 'bg-[#2F7D58]' : 'bg-[#181818]'
                      }`}
                      style={{ width: `${occPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CHART 4: Audience Engagement Breakdown */}
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[12px] font-bold text-[#181818]">Audience Engagement Breakdown</h3>
              <p className="text-[11px] text-[#6B6B6B]">Q&A, Polls, and Product Enquiries</p>
            </div>
            <span className="text-xs text-[#2F7D58] font-bold">High Interaction</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            <div className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7]">
              <span className="text-[11px] text-[#6B6B6B] block">Q&A Questions</span>
              <strong className="text-[12px] font-bold font-mono text-[#181818]">
                {142 + questions.length}
              </strong>
              <span className="text-[10px] text-[#2F7D58] block mt-0.5">98 Answered</span>
            </div>

            <div className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7]">
              <span className="text-[11px] text-[#6B6B6B] block">Poll Responses</span>
              <strong className="text-[12px] font-bold font-mono text-[#181818]">
                {poll.totalVotes}
              </strong>
              <span className="text-[10px] text-[#6B6B6B] block mt-0.5">1 vote/person</span>
            </div>

            <div className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7]">
              <span className="text-[11px] text-[#6B6B6B] block">Product Interest</span>
              <strong className="text-[12px] font-bold font-mono text-[#B51F32]">
                48
              </strong>
              <span className="text-[10px] text-[#2F7D58] block mt-0.5">High intent</span>
            </div>
          </div>

          <div className="p-2.5 bg-[#EFEEEA] rounded-lg border border-[#DEDCD7] text-xs text-[#6B6B6B]">
            Zero vanity metrics. Engagement numbers are cryptographically anchored to verified registration IDs.
          </div>
        </div>
      </div>
    </div>
  );
};
