'use client';
import React, { useState, useEffect, useRef, Suspense } from "react";

import { ArrowUpRight, BarChart2, Briefcase, Building, Building2, Calendar, Download, LineChart, Mic, User, Users } from 'lucide-react';
import { useStore } from '../../lib/store';

export const OrganizerExhibitors: React.FC = () => {
  const { exhibitors, showToast } = useStore();

  const handleExportCSV = () => {
    const headers = ['Company', 'Booth', 'Category', 'Visits', 'Leads', 'Enquiries', 'Team Size', 'Status'];
    const rows = exhibitors.map((e) => [
      `"${e.company}"`,
      `"${e.booth}"`,
      `"${e.category}"`,
      e.visits,
      e.leads,
      e.enquiries,
      e.teamSize,
      `"${e.status}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eventsphere-its26-exhibitor-metrics.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Exhibitor metrics exported successfully ✓', 'success');
  };

  return (
    <div className="space-y-3 select-none max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="pt-2 pb-1 px-1 flex justify-between items-start">
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · ORGANIZER</p>
          <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Exhibitors</h1>
        </div>
        
      </div>

        <button
          onClick={handleExportCSV}
          className="px-2.5 py-2 bg-white hover:bg-[#F6F4F0] border border-[#DEDCD7] text-[#181818] font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Metrics</span>
        </button>
      </div>

      {/* Exhibitors Table */}
      <div className="bg-white rounded-[14px] border border-[#DEDCD7] shadow-xs overflow-hidden">
        <div className="p-3 border-b border-[#DEDCD7] flex items-center justify-between">
          <span className="text-xs font-bold text-[#181818]">Sponsor Booth Performance</span>
          <span className="text-[11px] text-[#6B6B6B]">Live metrics updated automatically</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#DEDCD7] text-[#6B6B6B] font-semibold text-[11px] uppercase tracking-wider bg-[#F6F4F0]/60">
                <th className="py-3 px-3">Company</th>
                <th className="py-3 px-3">Booth #</th>
                <th className="py-3 px-3">Booth Visits</th>
                <th className="py-3 px-3">Leads Captured</th>
                <th className="py-3 px-3">Enquiries</th>
                <th className="py-3 px-3">Team</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEDCD7]/60">
              {exhibitors.map((ex) => (
                <tr
                  key={ex.id}
                  className={`hover:bg-[#F6F4F0] transition-colors ${
                    ex.company === 'Microsoft' ? 'bg-red-50/20' : ''
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-bold text-[#181818]">{ex.company}</strong>
                      {ex.company === 'Microsoft' && (
                        <span className="text-[9px] bg-red-100 text-[#B51F32] font-bold px-1.5 py-0.2 rounded">
                          Sales Demo Booth
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#6B6B6B]">{ex.category}</span>
                  </td>

                  <td className="py-2.5 px-3 font-mono font-bold text-[#181818]">
                    {ex.booth}
                  </td>

                  <td className="py-2.5 px-3 font-mono text-[#181818]">
                    {ex.visits}
                  </td>

                  <td className="py-2.5 px-3 font-mono font-bold text-[#B51F32]">
                    {ex.leads}
                  </td>

                  <td className="py-2.5 px-3 font-mono text-[#2F7D58]">
                    {ex.enquiries}
                  </td>

                  <td className="py-2.5 px-3 text-[#6B6B6B]">
                    {ex.teamSize} reps
                  </td>

                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF5F0] text-[#2F7D58] border border-[#2F7D58]/30">
                      {ex.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
