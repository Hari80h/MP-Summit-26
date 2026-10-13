'use client';

import React, { useState } from 'react';
import { BarChart2, Briefcase, Building2, Calendar, CheckCircle2, ChevronLeft, LineChart, Mic, User, Users } from 'lucide-react';

import { useStore } from '../../lib/store';

;

export const DelegatePolls: React.FC = () => {
  const { setActiveDelegateTab, poll, votePoll, currentUser } = useStore();
  const [submittedOption, setSubmittedOption] = useState<string | null>(null);

  // If there's no poll data for some reason, provide a fallback demo poll
  const demoPoll = poll || {
    id: 'demo-poll',
    sessionId: 'demo-session',
    question: 'What is the biggest challenge in scaling AI infrastructure?',
    options: [
      { id: '1', text: 'Data Privacy & Security', votes: 120 },
      { id: '2', text: 'Compute Cost', votes: 340 },
      { id: '3', text: 'Talent Shortage', votes: 85 },
      { id: '4', text: 'Model Accuracy', votes: 45 }
    ],
    totalVotes: 590,
    status: 'open' as const,
    voterIds: []
  };

  const handleVote = (optionId: string) => {
    if (poll) {
      votePoll(optionId);
    }
    setSubmittedOption(optionId);
  };

  const hasVoted = submittedOption !== null || demoPoll.voterIds.includes(currentUser.id);
  const totalVotes = (submittedOption !== null && !poll) ? demoPoll.totalVotes + 1 : demoPoll.totalVotes;

  return (
    <div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden">
      <div className="pt-4 pb-4 px-4 bg-[#F6F4F0] flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#181818] transition-active active:scale-95 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h1 className="text-[20px] font-bold text-[#181818] tracking-tight">Live Polls</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-16 space-y-3">
        <div className="bg-white rounded-lg p-3 border border-[#DEDCD7] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                demoPoll.status === 'open' ? 'bg-[#DC2626] text-white' : 'bg-gray-200 text-[#4B5563]'
              }`}>
                {demoPoll.status === 'open' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                {demoPoll.status === 'open' ? 'Live' : 'Closed'}
              </span>
              <span className="text-xs font-semibold text-[#6B6B6B]">Session Poll</span>
            </div>
            {demoPoll.status === 'closed' && (
              <span className="text-[11px] text-[#DC2626] font-semibold">Voting Closed</span>
            )}
          </div>
          
          <h2 className="text-[15px] font-bold text-[#181818] mb-2.5 leading-snug">
            {demoPoll.question}
          </h2>

          <div className="space-y-2">
            {demoPoll.options.map((option) => {
              const isSelected = submittedOption === option.id;
              const displayVotes = (isSelected && !poll) ? option.votes + 1 : option.votes;
              const percentage = Math.round((displayVotes / totalVotes) * 100) || 0;

              return (
                <button
                  key={option.id}
                  onClick={() => !hasVoted && demoPoll.status === 'open' && handleVote(option.id)}
                  disabled={Boolean(hasVoted || demoPoll.status === 'closed')}
                  className={`w-full relative overflow-hidden rounded-xl border p-4 transition-all text-left flex justify-between items-center ${
                    hasVoted 
                      ? isSelected 
                        ? 'border-[#0D9488] bg-[#F0FDF4]' 
                        : 'border-[#E5E7EB] bg-gray-50'
                      : demoPoll.status === 'closed'
                        ? 'border-[#E5E7EB] bg-gray-50 cursor-not-allowed opacity-80'
                        : 'border-[#DEDCD7] hover:border-[#181818]/40 bg-white'
                  }`}
                >
                  {hasVoted && (
                    <div 
                      className={`absolute left-0 top-0 bottom-0 ${isSelected ? 'bg-[#0D9488]/10' : 'bg-gray-200/50'}`} 
                      style={{ width: `${percentage}%`, transition: 'width 1s ease-out' }} 
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    {hasVoted && isSelected && <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />}
                    <span className={`text-[12px] font-medium ${hasVoted && isSelected ? 'text-[#0D9488]' : 'text-[#181818]'}`}>
                      {option.text}
                    </span>
                  </div>
                  {hasVoted && (
                    <span className="relative z-10 text-[12px] font-bold text-[#6B6B6B]">
                      {percentage}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 text-center">
            <span className="text-xs text-[#6B6B6B]">{totalVotes} votes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
