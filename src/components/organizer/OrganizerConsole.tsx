'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import {
  LayoutDashboard,
  Users,
  Building,
  Calendar,
  BarChart3,
  FileText,
  Settings,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  LogOut
} from 'lucide-react';
import { OrganizerOverview } from './OrganizerOverview';
import { OrganizerAttendees } from './OrganizerAttendees';
import { OrganizerExhibitors } from './OrganizerExhibitors';
import { OrganizerSessions } from './OrganizerSessions';
import { OrganizerAnalytics } from './OrganizerAnalytics';
import { OrganizerReports } from './OrganizerReports';
import { OrganizerSettings } from './OrganizerSettings';

export const OrganizerConsole: React.FC = () => {
  const {
    activeOrganizerTab,
    setActiveOrganizerTab,
    event,
    setHasAccessConfirmed,
  } = useStore();

  const sidebarItems = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { id: 'attendees' as const, label: 'Attendees', icon: Users, badge: event.totalRegistered.toLocaleString() },
    { id: 'exhibitors' as const, label: 'Exhibitors', icon: Building, badge: event.totalExhibitors.toString() },
    { id: 'sessions' as const, label: 'Sessions', icon: Calendar },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
    { id: 'reports' as const, label: 'Reports', icon: FileText },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-screen w-full bg-[#FAF7F2] flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="no-print w-full md:w-64 h-full bg-[#101012] text-white flex flex-col justify-between p-4 flex-shrink-0 border-r border-[#B51F32]/30 shadow-[4px_0_25px_rgba(181,31,50,0.16)] z-20">
        <div className="space-y-4">
          {/* Console Header & Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C87D55] text-white flex items-center justify-center font-serif text-xl font-bold shadow-xs">
                E
              </div>
              <div>
                <h2 className="text-xs font-black tracking-widest uppercase text-white leading-none">
                  EventSphere
                </h2>
                <p className="text-[11px] text-white/50 mt-1 font-medium">
                  Organizer Console
                </p>
              </div>
            </div>

            {/* Event pill badge / box */}
            <div className="p-2.5 bg-[#17171A] rounded-xl border border-[#B51F32]/40 shadow-[0_2px_12px_rgba(181,31,50,0.18)]">
              <p className="text-xs font-semibold text-white truncate">
                {event.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-white/60 font-mono">
                <span>{event.id} · LIVE</span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block animate-pulse" />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 pt-1">
            {sidebarItems.map((item) => {
              const isActive = activeOrganizerTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveOrganizerTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FAF7F2] text-[#111113] font-bold shadow-xs'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-[#E3DFD5] text-[#111113]' : 'bg-white/15 text-white/90'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout */}
        <div className="pt-4 pb-3 border-t border-white/10">
          <button
            onClick={() => setHasAccessConfirmed(false)}
            className="w-full py-2.5 px-3 bg-[#17171A] hover:bg-red-950/40 border border-[#B51F32]/40 rounded-xl text-xs font-semibold text-red-300 hover:text-red-200 transition-colors flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(181,31,50,0.15)] cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Console Content Body */}
      <main className="flex-1 h-full overflow-y-auto p-4 lg:p-8">
        {activeOrganizerTab === 'overview' && <OrganizerOverview />}
        {activeOrganizerTab === 'attendees' && <OrganizerAttendees />}
        {activeOrganizerTab === 'exhibitors' && <OrganizerExhibitors />}
        {activeOrganizerTab === 'sessions' && <OrganizerSessions />}
        {activeOrganizerTab === 'analytics' && <OrganizerAnalytics />}
        {activeOrganizerTab === 'reports' && <OrganizerReports />}
        {activeOrganizerTab === 'settings' && <OrganizerSettings />}
      </main>
    </div>
  );
};
