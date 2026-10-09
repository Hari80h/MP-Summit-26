'use client';

import React, { useState } from 'react';
import { BarChart2, Bell, Briefcase, Building2, Calendar, Check, Clock, Filter, LineChart, Linkedin, Mic, Search, User, UserPlus, Users, X, XCircle } from 'lucide-react';

import { useStore } from '../../lib/store';

;

export const DelegatePeople: React.FC = () => {
  const {
    attendees,
    currentUser,
    connections,
    connectWith,
    disconnectFrom,
    setSelectedPersonId,
    acceptConnectionRequest,
    ignoreConnectionRequest,
    viewSavedPeopleOnly,
    setViewSavedPeopleOnly
  } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<'recommended' | 'all' | 'connections' | 'pending' | 'requests'>('recommended');
  
  React.useEffect(() => {
    if (viewSavedPeopleOnly) {
      setActiveSubTab('connections');
      setViewSavedPeopleOnly(false); // consume the flag
    }
  }, [viewSavedPeopleOnly, setViewSavedPeopleOnly]);

  const [searchQuery, setSearchQuery] = useState('');
  
  const incomingRequestsCount = connections.filter(c => c.type === 'received' && c.status === 'pending').length;

  const isConnected = (personId: string) => {
    return connections.some((c) => c.personId === personId && c.status === 'connected');
  };

  const isPending = (personId: string) => {
    return connections.some((c) => c.personId === personId && c.status === 'pending');
  };

  // Filter attendees
  const filteredList = attendees.filter((person) => {
    if (person.id === currentUser.id) return false;

    // Search query filter
    const matchesSearch =
      searchQuery === '' ||
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.interests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeSubTab === 'recommended') {
      return (person.relevanceScore || 0) >= 80;
    }
    if (activeSubTab === 'connections') {
      return isConnected(person.id);
    }
    if (activeSubTab === 'pending') {
      return isPending(person.id) && connections.find(c => c.personId === person.id)?.type === 'sent';
    }
    if (activeSubTab === 'requests') {
      return connections.some(c => c.personId === person.id && c.type === 'received' && c.status === 'pending');
    }
    return true; // 'all'
  }).sort((a, b) => {
    if (activeSubTab === 'recommended') {
      return (b.relevanceScore || 0) - (a.relevanceScore || 0);
    }
    return 0;
  });

  const finalFilteredList = activeSubTab === 'recommended' ? filteredList.slice(0, 15) : filteredList;

  const handleConnect = (personId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    connectWith(personId, 'direct');
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] px-2 pt-2 pb-16 space-y-2">
      {/* Header */}
      <div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · NETWORKING</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">People</h1>
      </div>

      {/* Search Bar (44px target) */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, company, or interest (e.g. AI)..."
          className="w-full h-11 pl-10 pr-4 rounded-lg bg-white border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32] focus:border-transparent transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B6B6B] hover:text-[#181818]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#EFEEEA] rounded-lg border border-[#DEDCD7] overflow-x-auto no-scrollbar">
        {[
          { id: 'recommended', label: 'Recommended' },
          { id: 'requests', label: incomingRequestsCount > 0 ? `Requests (${incomingRequestsCount})` : 'Requests' },
          { id: 'all', label: 'All Attendees' },
          { id: 'connections', label: `Connected (${connections.filter(c => c.status === 'connected').length})` },
          { id: 'pending', label: 'Pending' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeSubTab === tab.id
                ? 'bg-white text-[#181818] shadow-xs'
                : 'text-[#6B6B6B] hover:text-[#181818]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Attendees List */}
      <div className="space-y-2">
        {finalFilteredList.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-[14px] border border-[#DEDCD7]">
            <p className="text-xs font-semibold text-[#181818]">No attendees found</p>
            <p className="text-[11px] text-[#6B6B6B] mt-1">
              Try adjusting your search keywords or filter tab.
            </p>
          </div>
        ) : (
          finalFilteredList.map((person) => {
            const connected = isConnected(person.id);
            const pending = isPending(person.id);

            return (
              <div
                key={person.id}
                onClick={() => setSelectedPersonId(person.id)}
                className="bg-white p-2.5 rounded-lg border border-[#DEDCD7] hover:border-[#181818]/30 transition-all shadow-sm cursor-pointer flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                  {person.avatar ? (
                    <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm border border-[#E5E7EB]" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#F6F4F0] border border-[#E5E7EB] flex items-center justify-center font-medium text-[12px] text-[#181818] flex-shrink-0 shadow-sm">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[11.5px] font-semibold text-[#181818] truncate">{person.name}</h3>
                      {person.relevanceScore && (
                        <span className="text-[11px] font-medium text-[#0D9488] bg-[#F0FDFA] border border-[#CCFBF1] px-1.5 py-0.5 rounded-md flex-shrink-0">
                          {person.relevanceScore}%
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#6B6B6B] truncate mt-0.5">
                      {person.designation} · {person.company}
                    </p>
                    {person.boothNumber && (
                      <span className="inline-block mt-1 text-[10px] font-medium text-[#B51F32] bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-md">
                        Booth {person.boothNumber}
                      </span>
                    )}
                  </div>
                </div>

                {activeSubTab === 'requests' ? (
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        ignoreConnectionRequest(person.id);
                      }}
                      className="h-9 px-3 flex items-center justify-center text-[#6B6B6B] hover:text-[#181818] transition-all font-medium text-[12px] bg-transparent"
                    >
                      Ignore
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        acceptConnectionRequest(person.id);
                      }}
                      className="h-9 px-2.5 flex items-center justify-center rounded-lg border border-[#181818] text-[#181818] bg-white transition-all font-medium text-[12px] active:scale-95"
                    >
                      Accept
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (connected || pending) {
                        disconnectFrom(person.id);
                      } else {
                        handleConnect(person.id, e);
                      }
                    }}
                    className={`flex-shrink-0 h-9 px-2.5 rounded-lg text-[13px] font-medium flex items-center gap-1.5 transition-all active:scale-95 ${
                      connected
                        ? 'bg-red-50 text-[#B51F32] border border-red-200'
                        : pending
                        ? 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]'
                        : 'bg-white text-[#181818] border border-[#181818]'
                    }`}
                  >
                    {connected ? (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Disconnect</span>
                      </>
                    ) : pending ? (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span>Pending</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
