'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import { ChevronLeft, Check, Clock, UserPlus, Settings, Lightbulb, Grid, CalendarPlus } from 'lucide-react';

export const DelegateAIRecommendations: React.FC = () => {
  const {
    attendees,
    currentUser,
    connections,
    connectWith,
    disconnectFrom,
    setSelectedPersonId,
    setActiveDelegateTab,
    sessions,
    setSelectedSessionId,
    toggleBookmarkSession
  } = useStore();

  const isConnected = (personId: string) => connections.some((c) => c.personId === personId && c.status === 'connected');
  const isPending = (personId: string) => connections.some((c) => c.personId === personId && c.status === 'pending');

  const recommendedPeople = attendees
    .filter((p) => p.id !== currentUser.id && (p.relevanceScore || 0) >= 80 && p.name.toLowerCase() !== 'sai kumar')
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, 15);

  // Recommended Sessions mock
  const recommendedSessions = sessions.slice(0, 4);

  const handleConnect = (personId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    connectWith(personId, 'direct');
  };

  return (
    <div className="flex-1 bg-white pb-20 overflow-y-auto">
      {/* Header */}
      <div className="p-3 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-2 mt-2">
          <button
            onClick={() => setActiveDelegateTab('home')}
            className="p-1 -ml-1 text-[#181818] hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[12px] font-bold text-[#181818] truncate">My AI Recommendations</h1>
        </div>
        
        <p className="text-[12px] text-[#4B5563] leading-relaxed mb-2 pr-4">
          Discover the top matches our AI generated for you based on your platform use.
        </p>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#B51F32] bg-red-50 px-3 py-1.5 rounded-full border border-red-100 w-fit">
          <Lightbulb className="w-3.5 h-3.5" />
          Learn how &gt;
        </button>
      </div>

      <div className="px-3 space-y-8 relative">
        {/* People Matches */}
        <div>
          <h2 className="flex items-center gap-2 text-[12px] font-bold text-[#8B5CF6] mb-2">
            <Settings className="w-4 h-4" /> People Matches
          </h2>
          <div className="flex overflow-x-auto gap-2 pb-3 -mx-4 px-3 no-scrollbar">
            {recommendedPeople.map((person) => {
              const connected = isConnected(person.id);
              const pending = isPending(person.id);
              return (
                  <div
                    key={person.id}
                    onClick={() => setSelectedPersonId(person.id)}
                    className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] flex-shrink-0 w-[240px] flex flex-col justify-between gap-2 cursor-pointer shadow-sm hover:border-[#181818]/40 transition-all"
                  >
                  <div className="flex items-center gap-2">
                    {person.avatar ? (
                      <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#EFEEEA] flex items-center justify-center font-bold text-[12px] text-[#181818] flex-shrink-0">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[12px] font-bold text-[#181818] truncate leading-snug">
                        {person.name}
                      </h4>
                      <p className="text-[12px] text-[#64748b] truncate mt-0.5">
                        {person.designation} · {person.company}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (connected) return;
                      if (pending) disconnectFrom(person.id);
                      else handleConnect(person.id, e);
                    }}
                    className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 border ${
                      connected
                        ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                        : pending
                        ? 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]'
                        : 'bg-white text-[#181818] border-[#181818]'
                    }`}
                  >
                    {connected ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Connected
                      </span>
                    ) : pending ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        Connect
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Session Matches */}
        <div>
          <h2 className="flex items-center gap-2 text-[12px] font-bold text-[#8B5CF6] mb-2">
            <Settings className="w-4 h-4" /> Session Matches
          </h2>
          <div className="flex overflow-x-auto gap-2 pb-3 -mx-4 px-3 no-scrollbar">
            {recommendedSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedSessionId(session.id)}
                className="p-2.5 bg-white rounded-[14px] border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col gap-2 shadow-sm flex-shrink-0 w-[260px]"
              >
                <div>
                  <p className="text-[11px] text-[#6B6B6B]">Day {session.day} · {session.timeRange}{session.room ? ` · ${session.room}` : ''}</p>
                  <h4 className="text-[12px] font-bold text-[#181818] mt-1 leading-snug">
                    {session.title}
                  </h4>
                  <p className="text-[11px] text-[#6B6B6B] mt-0.5">{session.speakerName}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmarkSession(session.id);
                  }}
                  className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-2 ${
                    session.isBookmarked 
                      ? 'border-[#0D9488] bg-[#F0FDF4] text-[#0D9488]'
                      : 'border-[#181818] text-[#181818] bg-white hover:bg-gray-50'
                  }`}
                >
                  {session.isBookmarked ? (
                    <>
                      <Check className="w-4 h-4" /> Added
                    </>
                  ) : (
                    <>
                      <CalendarPlus className="w-4 h-4" /> Add
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};
