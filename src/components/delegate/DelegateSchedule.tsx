'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, ArrowRight, BarChart2, Bookmark, BookmarkCheck, Briefcase, Building2, Calendar, CalendarPlus, Check, CheckCircle2, ChevronLeft, ChevronRight, Clock, LineChart, MapPin, MessageSquare, Mic, Send, ThumbsUp, User, Users } from 'lucide-react';

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
        <div className="flex items-center justify-between pb-1">
          <button
            onClick={() => {
              setSelectedSessionId(null);
              setPollVoteError(null);
            }}
            className="flex items-center gap-1.5 text-[15px] font-medium text-[#181818] transition-colors py-1 px-1 -ml-1 rounded-lg active:opacity-70"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Schedule</span>
          </button>
          <button
            onClick={() => toggleBookmarkSession(activeSession.id)}
            className={`px-3 py-1.5 rounded-[8px] border text-[13px] font-bold flex items-center gap-1.5 transition-colors active:scale-95 ${
              activeSession.isBookmarked
                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                : 'bg-white border-[#E5E7EB] text-[#181818] shadow-sm'
            }`}
          >
            {activeSession.isBookmarked ? (
              <>
                <BookmarkCheck className="w-[18px] h-[18px]" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-[18px] h-[18px]" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>

        {/* Session Card Info */}
        <div className="p-4 rounded-[16px] shadow-sm relative overflow-hidden bg-white border border-[#F3F4F6]">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#FFF0F2] opacity-80 z-0"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#FCE8E8] rounded-full blur-3xl z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D11E39] px-2.5 py-1 rounded-md">
                {activeSession.track || 'SESSION'}
              </span>
              {activeSession.status === 'live' && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#B51F32] border border-red-200 px-2 py-0.5 rounded animate-pulse">
                  Live Now
                </span>
              )}
            </div>

            <h1 className="text-[17px] font-bold text-[#181818] leading-[1.3] mb-4 pr-4">
              {activeSession.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#4B5563]">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-[15px] h-[15px] text-[#181818]" />
                <span>{activeSession.timeRange}</span>
              </div>
              <div className="w-[1px] h-3 bg-[#DEDCD7]"></div>
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-[15px] h-[15px] text-[#181818]" />
                <span>{activeSession.room}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Detail Tabs: Overview | Speaker | Q&A | Poll */}
        <div className="flex bg-[#F3F4F6] p-1 rounded-[12px]">
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
              className={`flex-1 py-2 text-[12.5px] font-bold transition-all rounded-[10px] ${
                detailSubTab === tab.id
                  ? 'bg-white text-[#D11E39] shadow-sm border-b-[2.5px] border-[#D11E39]'
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
          <div className="space-y-3 pt-1">
            {/* Submit Question Box */}
            <form onSubmit={handleQuestionSubmit} className="bg-white p-3.5 rounded-[12px] border border-[#F3F4F6] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#181818]">Ask the Speaker</span>
                <label className="flex items-center gap-1.5 text-[12.5px] text-[#6B6B6B] cursor-pointer">
                  <div className={`w-3.5 h-3.5 rounded-[3px] border ${isAnonymous ? 'bg-[#D11E39] border-[#D11E39]' : 'border-[#9CA3AF] bg-white'} flex items-center justify-center transition-colors`}>
                    {isAnonymous && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="hidden"
                  />
                  <span>Ask anonymously</span>
                </label>
              </div>

              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="What would you like to ask regarding enterprise agentic architectures?"
                rows={3}
                className="w-full p-2.5 rounded-[8px] bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] text-[#181818] focus:outline-none focus:border-[#D11E39] focus:ring-1 focus:ring-[#D11E39] transition-all resize-none placeholder:text-[#9CA3AF]"
              />

              <div className="flex justify-between items-center pt-0.5">
                <span className="text-[11px] text-[#6B6B6B] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Moderated live during session
                </span>
                <button
                  type="submit"
                  disabled={!questionText.trim()}
                  className="px-4 py-2.5 bg-[#D11E39] hover:bg-[#B51F32] active:scale-95 text-white font-bold text-[13px] rounded-[8px] shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:active:scale-100"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Question</span>
                </button>
              </div>
            </form>

            {/* Questions List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1 text-[#6B6B6B]">
                <h3 className="text-[15px] font-bold text-[#181818]">Submitted Questions</h3>
                <span className="flex items-center gap-1.5 text-[12px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="13" y2="6"></line><line x1="4" y1="12" x2="11" y2="12"></line><line x1="4" y1="18" x2="11" y2="18"></line><polyline points="15 15 18 18 21 15"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg> 
                  Sorted by votes <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                </span>
              </div>

              {sessionQuestions.length === 0 ? (
                <div className="bg-white rounded-[16px] border border-dashed border-[#E5E7EB] p-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="relative">
                    <MessageSquare className="w-14 h-14 text-[#FFF0F2] fill-[#FFF0F2]" />
                    <MessageSquare className="w-10 h-10 text-[#D11E39] fill-[#D11E39] absolute -bottom-1 -right-1" />
                    {/* decorative lines */}
                    <div className="absolute -top-1 -right-3 w-1.5 h-3 bg-[#D11E39] rounded-full rotate-45 opacity-80" />
                    <div className="absolute top-1 -right-6 w-1.5 h-2.5 bg-[#D11E39] rounded-full rotate-75 opacity-80" />
                  </div>
                  <div className="pt-2">
                    <p className="font-bold text-[#181818] text-[15px]">No questions yet</p>
                    <p className="text-[13px] text-[#6B6B6B] mt-1">Be the first to ask a question to the speaker!</p>
                  </div>
                </div>
              ) : (
              sessionQuestions.map((q) => {
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
              })
              )}
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
              className="p-2 bg-white rounded-[12px] shadow-sm relative overflow-hidden flex flex-col gap-1 cursor-pointer hover:shadow-md transition-shadow border border-[#F3F4F6]"
            >
              {/* Red strip */}
              <div className="absolute top-0 left-0 w-1.5 h-[35%] bg-[#D11E39] rounded-br-md" />
              
              <div className="flex items-center justify-between pl-1">
                <div className="flex items-center gap-1 bg-[#FFF0F2] px-1.5 py-0.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D11E39]" />
                  <Calendar className="w-[10px] h-[10px] text-[#D11E39]" />
                  <span className="text-[9.5px] font-medium text-[#4B5563]">
                    Day {session.day} · {session.timeRange}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#D11E39] flex items-center gap-0.5">
                  Details <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div className="pl-1">
                <h4 className="text-[12.5px] font-bold text-[#181818] leading-tight pr-2">
                  {session.title}
                </h4>
                <p className="text-[10.5px] text-[#6B6B6B] mt-0.5 leading-snug line-clamp-1">
                  {session.speakerName ? (
                    <>
                      <span className="font-semibold text-[#4B5563]">{session.speakerName}</span>
                      {(session.speakerDesignation || session.speakerCompany) && ' · '}
                      {session.speakerDesignation}
                      {session.speakerDesignation && session.speakerCompany && ', '}
                      {session.speakerCompany}
                    </>
                  ) : (
                    'Not published'
                  )}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmarkSession(session.id);
                }}
                className={`w-full py-1.5 rounded-[6px] text-[11.5px] font-bold transition-all active:scale-95 border flex items-center justify-center gap-1.5 ${
                  session.isBookmarked 
                    ? 'border-[#0D9488] bg-[#F0FDF4] text-[#0D9488]'
                    : 'border-[#181818] text-[#181818] bg-white hover:bg-gray-50'
                }`}
              >
                {session.isBookmarked ? (
                  <>
                    <Check className="w-3 h-3" /> Added to Schedule
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-3 h-3" /> Add to Schedule
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
