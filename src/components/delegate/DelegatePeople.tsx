'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { useStore } from '../../lib/store';

export const DelegatePeople: React.FC = () => {
  const {
    attendees,
    currentUser,
    connections,
    connectWith,
    setSelectedPersonId,
    setActiveDelegateTab,
    viewSavedPeopleOnly,
    setViewSavedPeopleOnly,
    savedPeopleIds,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter attendees - only recommended attendees; exclude any requests, connected, or pending
  const filteredList = attendees
    .filter((person) => {
      if (person.id === currentUser.id) return false;

      // Search query filter
      const matchesSearch =
        searchQuery === '' ||
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.interests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (viewSavedPeopleOnly) {
        return savedPeopleIds.includes(person.id);
      }

      // Exclude anyone already in requests, connected, or pending
      const hasConnection = connections.some((c) => c.personId === person.id);
      if (hasConnection) return false;

      // Only recommended attendees (relevance >= 80)
      return (person.relevanceScore || 0) >= 80;
    })
    .sort((a, b) => {
      if (viewSavedPeopleOnly) return 0;
      return (b.relevanceScore || 0) - (a.relevanceScore || 0);
    });

  const displayedList = viewSavedPeopleOnly ? filteredList : filteredList.slice(0, 10);

  const handleConnect = (personId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    connectWith(personId, 'direct');
  };

  return (
    <div className="flex-1 bg-[#F8F7F4] select-none overflow-y-auto px-3 pt-2 pb-24 space-y-2">
      {/* Header */}
      {viewSavedPeopleOnly ? (
        <div className="pt-2 pb-1 mb-2 flex items-center gap-3">
          <button
            onClick={() => {
              setViewSavedPeopleOnly(false);
              setActiveDelegateTab('profile');
            }}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#181818] transition-active active:scale-95 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h1 className="text-[20px] font-bold text-[#181818] tracking-tight">Saved People</h1>
        </div>
      ) : (
        <div className="pt-2 pb-1 flex items-center justify-between">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">
              MPSS26 · NETWORKING
            </p>
            <h1 className="text-[26px] font-serif font-medium text-[#181818] tracking-tight leading-tight">
              People You Should Meet
            </h1>
          </div>
          <button
            onClick={() => setActiveDelegateTab('home')}
            className="px-3 py-1.5 rounded-full bg-white border border-[#DEDCD7] text-[#181818] font-bold text-[11px] shadow-sm hover:bg-[#FAF9F5] active:scale-95 transition-all flex items-center gap-1 shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Home</span>
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mt-2 mb-3">
        <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, company, or interest (e.g. AI)..."
          className="w-full h-11 bg-white border border-[#E5E7EB] rounded-[10px] pl-10 pr-4 text-[13px] focus:ring-2 focus:ring-[#B51F32]/20 focus:border-[#B51F32] outline-none text-[#181818] placeholder-[#9CA3AF] shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#6B6B6B] hover:text-[#181818]"
          >
            Clear
          </button>
        )}
      </div>

      {!viewSavedPeopleOnly && (
        <p className="text-[11.5px] font-semibold text-[#6B6B6B] px-0.5">
          {displayedList.length} Recommended Attendees
        </p>
      )}

      {/* Attendees List - strictly recommended attendees */}
      <div className="space-y-3">
        {displayedList.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-[16px] border border-[#DEDCD7]">
            <p className="text-xs font-semibold text-[#181818]">No recommended attendees found</p>
            <p className="text-[11px] text-[#6B6B6B] mt-1">
              Try adjusting your search keywords.
            </p>
          </div>
        ) : (
          displayedList.map((person) => (
            <div
              key={person.id}
              onClick={() => setSelectedPersonId(person.id)}
              className="bg-white p-3.5 rounded-[16px] border border-[#E2E8F0] hover:border-[#181818]/30 transition-all shadow-xs hover:shadow-sm cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                {person.avatar ? (
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 shadow-xs border border-[#E5E7EB]"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#F6F4F0] border border-[#E5E7EB] flex items-center justify-center font-bold text-[15px] text-[#181818] flex-shrink-0 shadow-xs">
                    {person.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14.5px] font-bold text-[#0F172A] truncate leading-tight">
                      {person.name}
                    </h3>
                    {person.relevanceScore && (
                      <span className="text-[11px] font-bold text-[#0D9488] bg-[#F0FDFA] border border-[#CCFBF1] px-2 py-0.5 rounded-full flex-shrink-0">
                        {person.relevanceScore}%
                      </span>
                    )}
                  </div>
                  <p className="text-[12.5px] text-[#64748B] font-medium truncate mt-1 leading-normal">
                    {person.designation} · {person.company}
                  </p>
                  {person.boothNumber && (
                    <span className="inline-block mt-1 text-[11px] font-semibold text-[#B51F32] bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                      Booth {person.boothNumber}
                    </span>
                  )}
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#9CA3AF] flex-shrink-0" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
