'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, ArrowRight, BarChart2, Bookmark, BookmarkCheck, Briefcase, Building2, Calendar, CalendarPlus, Check, CheckCircle2, ChevronLeft, Clock, LineChart, MapPin, MessageSquare, Mic, Send, ThumbsUp, User, Users } from 'lucide-react';

import { useStore } from '../../lib/store';

import { Session } from '../../types';
;

export const DelegateSchedule: React.FC = () => {
  const {
    sessions,
    toggleBookmarkSession,
    selectedSessionId,
    setSelectedSessionId,
    questions,
    submitQuestion,
    upvoteQuestion,
    poll,
    votePoll,
    currentUser,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [activeDay, setActiveDay] = useState<number>(1);
  const [detailSubTab, setDetailSubTab] = useState<'overview' | 'speaker' | 'qa' | 'poll'>('overview');

  // Q&A state
  const [questionText, setQuestionText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [pollVoteError, setPollVoteError] = useState<string | null>(null);

  // If a session is selected, render Session Detail Screen
  const activeSession = sessions.find((s) => s.id === selectedSessionId);

  // Filter sessions
  const filteredSessions = sessions.filter((s) => {
    if (s.day !== activeDay) return false;
    if (activeTab === 'saved') return s.isBookmarked;
    return true;
  });

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSession || !questionText.trim()) return;
    submitQuestion(activeSession.id, questionText, isAnonymous);
    setQuestionText('');
  };

  const handlePollVote = (optionId: string) => {
    setPollVoteError(null);
    const result = votePoll(optionId);
    if (!result.success) {
      setPollVoteError(result.message);
    }
  };

  const hasUserVotedInPoll = poll.voterIds.includes(currentUser.id);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [selectedSessionId, activeTab, activeDay]);

  // If viewing session detail
  if (activeSession) {
    const sessionQuestions = questions.filter((q) => q.sessionId === activeSession.id);

    return (
      <div ref={scrollRef} className="flex-1 bg-[#F6F4F0] select-none overflow-y-auto px-2 pt-2 pb-16 space-y-2">
        {/* Back Button & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedSessionId(null);
              setPollVoteError(null);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#181818] hover:text-[#B51F32] transition-colors py-1 px-2 -ml-2 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Schedule</span>
          </button>
          <button
            onClick={() => toggleBookmarkSession(activeSession.id)}
            className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
              activeSession.isBookmarked
                ? 'bg-[#EBF5F0] border-[#2F7D58]/40 text-[#2F7D58]'
                : 'bg-white border-[#DEDCD7] text-[#181818]'
            }`}
          >
            {activeSession.isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-[#2F7D58]" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>

        {/* Session Card Info */}
        <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFEEEA] text-[#181818] px-2 py-0.5 rounded">
              {activeSession.track}
            </span>
            {activeSession.status === 'live' && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#B51F32] border border-red-200 px-2 py-0.5 rounded animate-pulse">
                Live Now
              </span>
            )}
          </div>

          <h1 className="text-[13px] font-bold text-[#181818] leading-snug">
            {activeSession.title}
          </h1>

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-[#6B6B6B]">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#181818]" />
              <span className="font-mono">{activeSession.timeRange}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#181818]" />
              <span>{activeSession.room}</span>
            </div>
          </div>
        </div>

        {/* 4 Detail Tabs: Overview | Speaker | Q&A | Poll */}
        <div className="flex bg-[#EFEEEA] p-1 rounded-lg border border-[#DEDCD7]">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'speaker', label: 'Speaker' },
            { id: 'qa', label: `Q&A (${sessionQuestions.length})` },
            { id: 'poll', label: 'Live Poll' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setDetailSubTab(tab.id as any);
                setPollVoteError(null);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                detailSubTab === tab.id
                  ? 'bg-white text-[#181818] shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#181818]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {detailSubTab === 'overview' && (
          <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] space-y-2 shadow-xs text-xs">
            <div>
              <h3 className="font-bold text-[#181818] mb-1.5 uppercase tracking-wide text-[11px]">
                Session Abstract
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                {activeSession.description}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#181818] mb-2 uppercase tracking-wide text-[11px]">
                Key Takeaways
              </h3>
              <ul className="space-y-1.5 text-[#6B6B6B]">
                {activeSession.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B51F32] mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#DEDCD7] flex items-center justify-between text-[#6B6B6B]">
              <span>Session Attendance:</span>
              <strong className="text-[#181818] font-mono">{activeSession.attendanceCount} Attendees</strong>
            </div>
          </div>
        )}

        {/* TAB 2: SPEAKER */}
        {detailSubTab === 'speaker' && (
          <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] space-y-2 shadow-xs">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EFEEEA] border border-[#DEDCD7] flex items-center justify-center font-bold text-[12px] text-[#181818] flex-shrink-0">
                {activeSession.speakerName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-[12px] font-bold text-[#181818]">{activeSession.speakerName}</h3>
                <p className="text-xs text-[#6B6B6B]">
                  {activeSession.speakerDesignation} · <strong className="text-[#181818]">{activeSession.speakerCompany}</strong>
                </p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-[#B51F32] bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                  Keynote Speaker
                </span>
              </div>
            </div>

            <p className="text-xs text-[#6B6B6B] leading-relaxed pt-2 border-t border-[#DEDCD7]/60">
              Pioneering enterprise AI transformations and cloud platform architectures across APAC. Author of leading whitepapers on autonomous agent swarms and neuro-symbolic reasoning.
            </p>
          </div>
        )}

        {/* TAB 3: Q&A */}
        {detailSubTab === 'qa' && (
          <div className="space-y-2">
            {/* Submit Question Box */}
            <form onSubmit={handleQuestionSubmit} className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#181818]">Ask the Speaker</span>
                <label className="flex items-center gap-1.5 text-xs text-[#6B6B6B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-[#B51F32] focus:ring-[#B51F32]"
                  />
                  <span>Ask anonymously</span>
                </label>
              </div>

              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="What would you like to ask regarding enterprise agentic architectures?"
                rows={2}
                className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32] transition-all resize-none"
              />

              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] text-[#6B6B6B]">Moderated live during session</span>
                <button
                  type="submit"
                  disabled={!questionText.trim()}
                  className="px-2.5 py-2 bg-[#B51F32] hover:bg-[#9C1A2B] active:scale-95 text-white font-semibold text-xs rounded-lg shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Question</span>
                </button>
              </div>
            </form>

            {/* Questions List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#6B6B6B] px-1">
                <span className="font-semibold text-[#181818]">Submitted Questions</span>
                <span>Sorted by votes</span>
              </div>

              {sessionQuestions.map((q) => {
                const hasUpvoted = q.upvotedBy.includes(currentUser.id);
                return (
                  <div
                    key={q.id}
                    className="p-2.5 bg-white rounded-lg border border-[#DEDCD7] shadow-xs flex items-start justify-between gap-2"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#181818]">{q.authorName}</span>
                        <span className="text-[10px] text-[#6B6B6B]">{q.createdAt}</span>
                        
                        {/* Status Badge */}
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ${
                            q.status === 'Answered'
                              ? 'bg-[#EBF5F0] text-[#2F7D58] border-[#2F7D58]/30'
                              : q.status === 'Selected'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : q.status === 'Archived'
                              ? 'bg-gray-100 text-gray-500 border-gray-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {q.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#181818] leading-relaxed">{q.text}</p>
                    </div>

                    <button
                      onClick={() => upvoteQuestion(q.id)}
                      className={`min-w-[44px] h-10 px-2 rounded-lg border text-xs font-bold flex flex-col items-center justify-center transition-all active:scale-95 ${
                        hasUpvoted
                          ? 'bg-[#B51F32] border-[#B51F32] text-white shadow-xs'
                          : 'bg-[#F6F4F0] border-[#DEDCD7] text-[#181818] hover:border-[#B51F32]'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5 mb-0.5" />
                      <span>{q.upvotes}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: POLL */}
        {detailSubTab === 'poll' && (
          <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#B51F32] bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                Official Live Poll
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  poll.status === 'open'
                    ? 'bg-[#EBF5F0] text-[#2F7D58]'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {poll.status === 'open' ? 'Open for Votes' : 'Closed'}
              </span>
            </div>

            <h2 className="text-[12px] font-bold text-[#181818] leading-snug">
              {poll.question}
            </h2>

            {/* Error Message if duplicate vote attempted */}
            {pollVoteError && (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-1.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{pollVoteError}</span>
              </div>
            )}

            {/* Options */}
            <div className="space-y-2.5 pt-1">
              {poll.options.map((option) => {
                const percentage =
                  poll.totalVotes > 0
                    ? Math.round((option.votes / poll.totalVotes) * 100)
                    : 0;

                return (
                  <button
                    key={option.id}
                    onClick={() => handlePollVote(option.id)}
                    disabled={poll.status === 'closed'}
                    className={`w-full p-2 rounded-lg border text-left transition-all relative overflow-hidden active:scale-[0.99] ${
                      hasUserVotedInPoll
                        ? 'border-[#DEDCD7] bg-[#F6F4F0]'
                        : 'border-[#DEDCD7] hover:border-[#B51F32] bg-white hover:bg-red-50/20'
                    }`}
                  >
                    {/* Background Progress Bar */}
                    {hasUserVotedInPoll && (
                      <div
                        className="absolute inset-y-0 left-0 bg-[#E5E3DC] opacity-70 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-[#181818]">
                      <span>{option.text}</span>
                      {hasUserVotedInPoll && (
                        <span className="font-mono font-bold text-[#181818]">
                          {percentage}% ({option.votes})
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Poll Status Footer */}
            <div className="pt-2 border-t border-[#DEDCD7] flex items-center justify-between text-xs text-[#6B6B6B]">
              <span>{poll.totalVotes} total responses recorded</span>
              {hasUserVotedInPoll ? (
                <span className="text-[#2F7D58] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Your vote is recorded
                </span>
              ) : (
                <span className="text-[#181818] font-medium">1 vote per attendee</span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Schedule List View (When no specific session is selected)
  return (
    <div ref={scrollRef} className="flex-1 bg-[#F6F4F0] select-none overflow-y-auto px-2 pt-2 pb-16 space-y-2">
      <div className="pt-2 pb-1 px-1">
        <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">ITS26 · PROGRAMME</p>
        <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">Schedule</h1>
      </div>

      {/* Main Tabs: All | My Schedule */}
      <div className="flex bg-[#F3F4F6] p-1 rounded-lg border border-[#E5E7EB]">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 rounded-[10px] text-[11.5px] font-semibold transition-all ${
            activeTab === 'all' ? 'bg-white text-[#181818] shadow-sm' : 'text-[#6B6B6B] hover:text-[#181818]'
          }`}
        >
          All Sessions ({sessions.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-1.5 rounded-[10px] text-[11.5px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'saved' ? 'bg-white text-[#181818] shadow-sm' : 'text-[#6B6B6B] hover:text-[#181818]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>My Schedule ({sessions.filter(s => s.isBookmarked).length})</span>
        </button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-2.5">
        {[
          { day: 1, label: 'Day 1 (12 Feb)' },
          { day: 2, label: 'Day 2 (13 Feb)' },
          { day: 3, label: 'Day 3 (14 Feb)' },
        ].map((d) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(d.day)}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold border transition-all shadow-sm ${
              activeDay === d.day
                ? 'bg-[#181818] text-white border-[#181818]'
                : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-gray-50'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-2">
        {filteredSessions.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-[14px] border border-[#E5E7EB] shadow-sm">
            <Bookmark className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
            <p className="text-[12px] font-bold text-[#181818]">No sessions bookmarked</p>
            <p className="text-[11px] text-[#6B6B6B] mt-1.5 leading-relaxed">
              Tap the bookmark icon on any session to add it to your personal itinerary.
            </p>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedSessionId(session.id)}
              className="p-2.5 bg-white rounded-lg border border-[#DEDCD7] hover:border-[#181818]/30 cursor-pointer transition-all flex flex-col shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[12px] font-medium text-[#6B6B6B]">Day {session.day} · {session.timeRange}</p>
                  <span className="text-[11px] font-bold text-[#B51F32] flex items-center gap-1 group-hover:underline">
                    View details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <h4 className="text-[12px] font-bold text-[#181818] leading-tight">
                  {session.title}
                </h4>
                <p className="text-[12.5px] text-[#6B6B6B] mt-1 leading-snug line-clamp-1">
                  <span className="font-semibold text-[#4B5563]">{session.speakerName}</span>
                  {(session.speakerDesignation || session.speakerCompany) && ' · '}
                  {session.speakerDesignation}
                  {session.speakerDesignation && session.speakerCompany && ', '}
                  {session.speakerCompany}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmarkSession(session.id);
                }}
                className={`w-full py-1.5 mt-2 rounded-lg text-[12.5px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-1.5 ${
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
          ))
        )}
      </div>
    </div>
  );
};
