'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  QrCode,
  Share2,
  Building,
  Mic,
  Loader2,
  Sparkles
} from 'lucide-react';

export const OrganizerReports: React.FC = () => {
  const { event, exhibitors, poll, questions, showToast } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      showToast('Client-ready event report generated ✓', 'success');
    }, 700);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Metric,Value',
        `Event Name,${event.name}`,
        `Event ID,${event.id}`,
        `Total Registered,${event.totalRegistered}`,
        `Total Checked In,${event.totalCheckedIn}`,
        `Check-In Rate,${((event.totalCheckedIn / event.totalRegistered) * 100).toFixed(1)}%`,
        `Total QR Scans,${event.totalScans}`,
        `Total Connections,${event.totalConnections}`,
        `Total Exhibitors,${event.totalExhibitors}`,
        `Total Speakers,${event.totalSpeakers}`,
        `Q&A Questions,142`,
        `Questions Answered,98`,
        `Poll Responses,${poll.totalVotes}`,
        `Session Attendance,1026`,
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eventsphere-mpss26-executive-report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Report CSV exported ✓', 'success');
  };

  return (
    <div className="space-y-3 select-text max-w-5xl">
      {/* Top Header & Report Actions */}
      <div className="no-print flex flex-wrap items-center justify-between gap-2.5">
        <div>
          <h1 className="text-[15px] font-black text-[#181818] tracking-tight">Executive Event Report</h1>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Client-ready presentation report for stakeholders & sponsors
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-3 py-2.5 bg-[#B51F32] hover:bg-[#9C1A2B] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating…</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>Regenerate Report</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-2.5 bg-white hover:bg-[#F6F4F0] border border-[#DEDCD7] text-[#181818] text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2.5 bg-white hover:bg-[#F6F4F0] border border-[#DEDCD7] text-[#181818] text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* The Printable Branded Client-Ready Report Sheet */}
      <div className="report-sheet bg-white p-8 sm:p-12 rounded-2xl border border-[#DEDCD7] shadow-md space-y-8 text-[#181818]">
        {/* Report Branding Header */}
        <div className="border-b-2 border-[#181818] pb-3 flex flex-wrap items-start justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#B51F32]" />
              <span className="text-[12px] font-black tracking-tight text-[#181818]">
                EventSphere
              </span>
            </div>
            <h2 className="text-[15px] sm:text-3xl font-black text-[#181818] tracking-tight">
              {event.name}
            </h2>
            <p className="text-[12px] font-semibold text-[#B51F32] mt-0.5">
              Official Event Experience & Engagement Report
            </p>
          </div>

          <div className="text-right text-xs text-[#6B6B6B] space-y-1">
            <p className="font-mono font-bold text-[#181818]">{event.id} · LIVE AUDIT</p>
            <p>{event.dates}</p>
            <p>{event.venue}, {event.city}</p>
            <p className="text-[10px] text-[#2F7D58] font-bold">VERIFIED DATA LAYER</p>
          </div>
        </div>

        {/* 6 Core Executive Numbers Grid */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1.5">
            1. Executive Attendance & Scale Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Registered</span>
              <p className="text-[15px] font-black font-mono text-[#181818] mt-1">
                {event.totalRegistered.toLocaleString()}
              </p>
            </div>

            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Checked In</span>
              <p className="text-[15px] font-black font-mono text-[#2F7D58] mt-1">
                {event.totalCheckedIn.toLocaleString()}
              </p>
            </div>

            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Connections</span>
              <p className="text-[15px] font-black font-mono text-[#181818] mt-1">
                {event.totalConnections.toLocaleString()}
              </p>
            </div>

            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">QR Scans</span>
              <p className="text-[15px] font-black font-mono text-[#B51F32] mt-1">
                {event.totalScans.toLocaleString()}
              </p>
            </div>

            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Exhibitors</span>
              <p className="text-[15px] font-black font-mono text-[#181818] mt-1">
                {event.totalExhibitors}
              </p>
            </div>

            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Speakers</span>
              <p className="text-[15px] font-black font-mono text-[#181818] mt-1">
                {event.totalSpeakers}
              </p>
            </div>
          </div>
        </div>

        {/* Top Exhibitors by Leads Table */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1.5">
            2. Top Exhibitors by Qualified Leads
          </h3>
          <div className="rounded-[14px] border border-[#DEDCD7] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F6F4F0] border-b border-[#DEDCD7] text-[#6B6B6B] font-bold">
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Booth</th>
                  <th className="py-2.5 px-3">Booth Visits</th>
                  <th className="py-2.5 px-3">Leads Captured</th>
                  <th className="py-2.5 px-3">Product Enquiries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEDCD7]/60">
                {exhibitors.slice(0, 5).map((ex, idx) => (
                  <tr key={ex.id}>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#6B6B6B]">#{idx + 1}</td>
                    <td className="py-2.5 px-3 font-bold text-[#181818]">{ex.company}</td>
                    <td className="py-2.5 px-3 font-mono text-[#6B6B6B]">{ex.booth}</td>
                    <td className="py-2.5 px-3 font-mono">{ex.visits}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#B51F32]">{ex.leads}</td>
                    <td className="py-2.5 px-3 font-mono text-[#2F7D58]">{ex.enquiries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Engagement Highlights */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1.5">
            3. Audience Engagement Highlights
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Questions Submitted</span>
              <p className="text-[15px] font-black font-mono text-[#181818] mt-1">142</p>
              <span className="text-[10px] text-[#2F7D58] font-semibold">Live Q&A</span>
            </div>

            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Questions Answered</span>
              <p className="text-[15px] font-black font-mono text-[#2F7D58] mt-1">98</p>
              <span className="text-[10px] text-[#6B6B6B]">69% Answered Rate</span>
            </div>

            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Poll Responses</span>
              <p className="text-[15px] font-black font-mono text-[#181818] mt-1">{poll.totalVotes}</p>
              <span className="text-[10px] text-[#6B6B6B]">Interactive voting</span>
            </div>

            <div className="p-3 bg-[#F6F4F0] rounded-[14px] border border-[#DEDCD7]">
              <span className="text-[10px] uppercase font-bold text-[#6B6B6B] block">Session Attendance</span>
              <p className="text-[15px] font-black font-mono text-[#181818] mt-1">1,026</p>
              <span className="text-[10px] text-[#2F7D58] font-semibold">Across 4 stages</span>
            </div>
          </div>
        </div>

        {/* Report Footer */}
        <div className="pt-3 border-t border-[#DEDCD7] flex flex-wrap items-center justify-between text-xs text-[#6B6B6B]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2F7D58]" />
            <span>Generated dynamically by EventSphere Digital Experience Engine</span>
          </div>
          <span className="font-mono">Document ID: ES-MPSS26-AUDIT-{Date.now().toString().slice(-6)}</span>
        </div>
      </div>
    </div>
  );
};
