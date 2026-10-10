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
    <div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="pt-4 pb-4 px-4 bg-[#F6F4F0] flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#181818] transition-active active:scale-95 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h1 className="text-[20px] font-bold text-[#181818] tracking-tight">Speakers</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search speakers..."
            className="w-full h-11 bg-white border border-[#E5E7EB] rounded-[10px] pl-10 pr-4 text-[13px] focus:ring-2 focus:ring-[#B51F32]/20 focus:border-[#B51F32] outline-none text-[#181818] placeholder-[#9CA3AF] shadow-sm transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-16 space-y-3 no-scrollbar">
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
                className={`flex-shrink-0 w-[102px] justify-center h-[34px] rounded-lg text-[12.5px] font-medium flex items-center gap-1.5 transition-all active:scale-95 ${
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
