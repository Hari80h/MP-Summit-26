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
    <div className="flex-1 bg-[#F6F4F0] flex flex-col h-full overflow-hidden space-y-2">
      <div className="pt-4 pb-2 px-3 flex-shrink-0">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · INTERACT</p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Live Polls</h1>
          </div>
          <button 
            onClick={() => setActiveDelegateTab('home')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#DEDCD7] transition-colors active:scale-95 text-[#181818] mt-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 pb-16 space-y-2">
        <div className="bg-white rounded-lg p-2.5 border border-[#DEDCD7] shadow-sm">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="flex items-center gap-1.5 bg-[#B51F32] px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              Live
            </span>
            <span className="text-xs font-semibold text-[#6B6B6B]">Session Poll</span>
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
                  onClick={() => !hasVoted && handleVote(option.id)}
                  disabled={!!hasVoted}
                  className={`w-full relative overflow-hidden rounded-xl border p-4 transition-all text-left flex justify-between items-center ${
                    hasVoted 
                      ? isSelected 
                        ? 'border-[#0D9488] bg-[#F0FDF4]' 
                        : 'border-[#E5E7EB] bg-gray-50'
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
