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
  Smartphone,
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
    setRole,
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
    <div className="min-h-[calc(100vh-49px)] bg-[#F6F4F0] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="no-print w-full md:w-64 bg-white border-r border-[#DEDCD7] flex flex-col justify-between p-3 flex-shrink-0">
        <div className="space-y-3">
          {/* Console Header */}
          <div className="px-2 pt-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6B6B] block">
              Organizer Operations
            </span>
            <h2 className="text-[13px] font-extrabold text-[#181818] tracking-tight mt-0.5">
              Event Command Center
            </h2>
            <p className="text-[11px] text-[#6B6B6B]">
              India Tech Summit 2026 · Bengaluru
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeOrganizerTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveOrganizerTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#B51F32] text-white shadow-xs'
                      : 'text-[#6B6B6B] hover:text-[#181818] hover:bg-[#F6F4F0]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#EFEEEA] text-[#181818]'
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

        {/* Bottom Switcher Shortcut */}
        <div className="pt-3 border-t border-[#DEDCD7] space-y-2">
          <div className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7] text-xs">
            <p className="text-[11px] font-semibold text-[#181818]">Connected to ITS26 Live Store</p>
            <p className="text-[10px] text-[#6B6B6B] mt-0.5">Role switch maintains shared state</p>
          </div>

          <button
            onClick={() => setRole('delegate')}
            className="w-full py-2 px-3 bg-white hover:bg-[#EFEEEA] border border-[#DEDCD7] rounded-lg text-xs font-semibold text-[#181818] transition-colors flex items-center justify-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#B51F32]" />
            <span>Switch to Delegate App</span>
          </button>

          <button
            onClick={() => setHasAccessConfirmed(false)}
            className="w-full py-2 px-3 bg-white hover:bg-red-50 border border-[#DEDCD7] hover:border-red-200 rounded-lg text-xs font-semibold text-[#B51F32] transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Console Content Body */}
      <main className="flex-1 p-3 lg:p-8 overflow-y-auto max-w-7xl">
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
