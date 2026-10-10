'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import { X, Check, UserPlus, Mail, Phone, Linkedin, Twitter, ShieldCheck, Tag, Clock, Lock } from 'lucide-react';

export const PersonDetailModal: React.FC = () => {
  const {
    selectedPersonId,
    setSelectedPersonId,
    attendees,
    connections,
    connectWith,
    disconnectFrom,
  } = useStore();

  if (!selectedPersonId) return null;

  const person = attendees.find((a) => a.id === selectedPersonId);
  if (!person) return null;

  const isConnected = connections.some((c) => c.personId === person.id && c.status === 'connected');
  const isPending = connections.some((c) => c.personId === person.id && c.status === 'pending');

  const handleConnect = () => {
    if (isConnected || isPending) {
      disconnectFrom(person.id);
    } else {
      connectWith(person.id, 'direct');
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-3 animate-in fade-in select-none">
      <div className="bg-white rounded-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto p-3 space-y-2 shadow-2xl border border-[#DEDCD7]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD7]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B]">
            Attendee Profile
          </span>
          <button
            onClick={() => setSelectedPersonId(null)}
            className="p-1 rounded-lg text-[#6B6B6B] hover:text-[#181818]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Identity & Avatar */}
        <div className="flex items-start gap-2.5">
          {person.avatar ? (
            <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full object-cover shadow-sm border border-[#E5E7EB] flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center font-medium text-[15px] text-[#181818] flex-shrink-0 shadow-sm">
              {person.name.split(' ').map((n) => n[0]).join('')}
            </div>
          )}
          <div className="pt-0.5">
            <h2 className="text-[16px] font-bold text-[#181818] leading-tight">{person.name}</h2>
            <p className="text-[14px] text-[#4B5563] mt-0.5">
              {person.designation} · {person.company}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-medium text-[#4B5563] bg-[#F3F4F6] px-2 py-0.5 rounded-md">
                {person.ticketType}
              </span>
              {person.relevanceScore && (
                <span className="text-[11px] font-medium text-[#0D9488] bg-[#F0FDFA] border border-[#CCFBF1] px-2 py-0.5 rounded-md">
                  {person.relevanceScore}% Match
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="text-[12px] text-[#4B5563] leading-relaxed">
          <p>{person.bio}</p>
        </div>

        {/* Interests & Skills */}
        <div className="pt-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] mb-2">
            Focus Areas & Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {person.interests.map((interest, idx) => (
              <span key={idx} className="text-[11px] bg-[#F3F4F6] text-[#4B5563] px-2.5 py-1 rounded-md font-medium">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Contact info respecting privacy consent */}
        <div className="bg-[#FAFAFA] p-2.5 rounded-lg border border-[#E5E7EB] space-y-3 mt-3 text-[12px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#6B6B6B]">
              <Mail className="w-4 h-4" />
              Email
            </span>
            <span className="text-[#181818] font-medium">
              {!isConnected ? (
                <span className="text-[#9CA3AF] italic font-normal flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Hidden until connected</span>
              ) : person.privacy.shareEmail ? (
                person.email
              ) : (
                <span className="text-[#9CA3AF] italic font-normal">Not shared</span>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#6B6B6B]">
              <Phone className="w-4 h-4" />
              Mobile
            </span>
            <span className="text-[#181818] font-medium">
              {!isConnected ? (
                <span className="text-[#9CA3AF] italic font-normal flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Hidden until connected</span>
              ) : person.privacy.sharePhone ? (
                person.mobile
              ) : (
                <span className="text-[#9CA3AF] italic font-normal">Not shared</span>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#6B6B6B]">
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              LinkedIn
            </span>
            <span>
              {person.privacy.shareLinkedIn && person.linkedin ? (
                <a href={`https://${person.linkedin}`} target="_blank" rel="noreferrer" className="text-[#0A66C2] font-medium hover:underline">
                  {person.linkedin}
                </a>
              ) : (
                <span className="text-[#9CA3AF] italic">Not shared</span>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#6B6B6B]">
              <Twitter className="w-4 h-4 text-[#1DA1F2]" />
              Twitter / X
            </span>
            <span>
              {person.privacy.shareTwitter && person.twitter ? (
                <a href={`https://twitter.com/${person.twitter}`} target="_blank" rel="noreferrer" className="text-[#1DA1F2] font-medium hover:underline">
                  @{person.twitter}
                </a>
              ) : (
                <span className="text-[#9CA3AF] italic">Not shared</span>
              )}
            </span>
          </div>
        </div>

        {/* Connect Action Button */}
        <div className="pt-2">
          <button
            onClick={handleConnect}
            className={`w-full py-3 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isConnected
                ? 'bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]'
                : isPending
                ? 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]'
                : 'bg-white text-[#181818] border border-[#181818]'
            }`}
          >
            {isConnected ? (
              <>
                <Check className="w-4 h-4" />
                <span>Connected</span>
              </>
            ) : isPending ? (
              <>
                <Clock className="w-4 h-4" />
                <span>Pending</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Connect with {person.name}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
