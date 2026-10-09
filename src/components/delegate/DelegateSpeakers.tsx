'use client';

import React, { useState } from 'react';
import { BarChart2, Briefcase, Building2, Calendar, Check, ChevronLeft, Clock, LineChart, Mic, Search, User, UserPlus, Users } from 'lucide-react';

import { useStore } from '../../lib/store';

;

export const DelegateSpeakers: React.FC = () => {
  const {
    attendees,
    currentUser,
    connections,
    connectWith,
    disconnectFrom,
    setSelectedPersonId,
    setActiveDelegateTab,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  const isConnected = (personId: string) => connections.some((c) => c.personId === personId && c.status === 'connected');
  const isPending = (personId: string) => connections.some((c) => c.personId === personId && c.status === 'pending');

  const speakers = attendees.filter(p => p.role === 'speaker' && p.id !== currentUser.id);
  
  const filteredSpeakers = speakers.filter(speaker => 
    searchQuery === '' || 
    speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    speaker.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = (personId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    connectWith(personId, 'direct');
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden space-y-2">
      {/* Header */}
      <div className="pt-3 pb-3 px-3 bg-white border-b border-[#DEDCD7] flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · FEATURED</p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Speakers</h1>
          </div>
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#DEDCD7] transition-colors active:scale-95 text-[#181818] mt-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search speakers..."
            className="w-full bg-[#F6F4F0] border-none rounded-lg py-2.5 pl-10 pr-4 text-[12px] focus:ring-2 focus:ring-[#B51F32]/20 outline-none text-[#181818] placeholder-[#6B6B6B]"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 pb-16 space-y-2 no-scrollbar">
        <p className="text-[12px] font-semibold text-[#6B6B6B] mb-1">{speakers.length} Speakers</p>
        
        {filteredSpeakers.map((speaker) => {
          const connected = isConnected(speaker.id);
          const pending = isPending(speaker.id);

          return (
            <div
              key={speaker.id}
              onClick={() => setSelectedPersonId(speaker.id)}
              className="bg-white p-2.5 rounded-lg border border-[#DEDCD7] hover:border-[#181818]/30 transition-all shadow-sm cursor-pointer flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 overflow-hidden flex-1">
                {speaker.avatar ? (
                  <img src={speaker.avatar} alt={speaker.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm border border-[#E5E7EB]" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#EFEEEA] flex items-center justify-center font-bold text-[12px] text-[#181818] flex-shrink-0 shadow-sm border border-[#E5E7EB]">
                    {speaker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[12px] font-bold text-[#181818] leading-snug truncate">{speaker.name}</h4>
                  <p className="text-[11px] text-[#6B6B6B] mt-0.5 truncate">{speaker.designation} · {speaker.company}</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (connected) return;
                  if (pending) disconnectFrom(speaker.id);
                  else handleConnect(speaker.id, e);
                }}
                className={`flex-shrink-0 h-9 px-3 rounded-lg text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                  connected
                    ? 'bg-red-50 text-[#B51F32] border border-red-200'
                    : pending
                    ? 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]'
                    : 'bg-white text-[#181818] border border-[#181818]'
                }`}
              >
                {connected ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Connected
                  </>
                ) : pending ? (
                  <>
                    <Clock className="w-3.5 h-3.5" /> Pending
                  </>
                ) : (
                  "Connect"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
