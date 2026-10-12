'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Coffee,
  MapPin,
  MessageSquare,
  Music,
  Search,
  Send,
  Sparkles,
  ThumbsUp,
  User,
  Users,
  Utensils,
  X,
} from 'lucide-react';

import { useStore } from '../../lib/store';
import { INITIAL_ATTENDEES } from '../../lib/mockData';
import { Session, Person } from '../../types';

const getSessionImage = (session: Session) => {
  const stageImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop',
  ];
  const charCode = session.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return stageImages[charCode % stageImages.length];
};

const parseTime = (timeRange: string) => {
  if (!timeRange) return { start: '', end: '' };
  if (timeRange.includes('–')) {
    const parts = timeRange.split('–');
    return { start: parts[0].trim(), end: parts[1].trim() };
  }
  if (timeRange.toLowerCase().includes('onwards')) {
    const parts = timeRange.split(' ');
    return { start: parts[0].trim(), end: 'Onwards' };
  }
  return { start: timeRange, end: '' };
};

const isBreakSession = (session: Session) => {
  const t = (session.title + ' ' + (session.track || '')).toLowerCase();
  return (
    t.includes('lunch') ||
    t.includes('tea break') ||
    t.includes('high tea') ||
    t.includes('cultural evening') ||
    t.includes('gala dinner')
  );
};

const getBreakIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('cultural') || t.includes('dinner') || t.includes('gala')) {
    return <Music className="w-4 h-4 text-[#B45309]" />;
  }
  if (t.includes('tea')) {
    return <Coffee className="w-4 h-4 text-[#B45309]" />;
  }
  return <Utensils className="w-4 h-4 text-[#B45309]" />;
};

export const DelegateSchedule: React.FC = () => {
  const {
    sessions,
    attendees,
    setAttendees,
    selectedPersonId,
    setSelectedPersonId,
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper to resolve all distinct speaker profiles for a session
  const resolveSessionSpeakers = (session: Session): Person[] => {
    if (!session) return [];

    const speakerPool = [...attendees, ...INITIAL_ATTENDEES];

    if (session.speakerIds && session.speakerIds.length > 0) {
      const matched = session.speakerIds
        .map((id) => speakerPool.find((a) => a.id === id))
        .filter(Boolean) as Person[];
      if (matched.length > 0) return matched;
    }

    if (session.speakerId) {
      const single = speakerPool.find((a) => a.id === session.speakerId);
      if (single) return [single];
    }

    if (session.speakerName) {
      const rawNames = session.speakerName
        .split(/[,&]/)
        .map((n) => n.trim().replace(/^and\s+/i, ''))
        .filter(
          (n) =>
            n.length > 1 &&
            !n.toLowerCase().includes('committee') &&
            !n.toLowerCase().includes('panel') &&
            !n.toLowerCase().includes('ensemble')
        );

      const found: Person[] = [];
      for (const name of rawNames) {
        const norm = name.toLowerCase();
        const match = speakerPool.find(
          (a) =>
            a.name.toLowerCase() === norm ||
            a.name.toLowerCase().includes(norm) ||
            norm.includes(a.name.toLowerCase())
        );
        if (match && !found.some((f) => f.id === match.id)) {
          found.push(match);
        }
      }
      if (found.length > 0) return found;

      if (
        !session.speakerName.toLowerCase().includes('committee') &&
        !session.speakerName.toLowerCase().includes('ensemble')
      ) {
        return [
          {
            id: session.speakerId || `spk-${session.id}`,
            name: session.speakerName,
            designation: session.speakerDesignation || 'Speaker',
            company: session.speakerCompany || 'MP Semiconductor Summit',
            role: 'speaker',
            bio: 'Keynote voice driving the Madhya Pradesh semiconductor ecosystem, national fab supply chain initiatives, and industry-academia collaborations.',
            interests: ['Semiconductors', 'Chip Design'],
            skills: [],
            email: '',
            mobile: '',
            privacy: {
              preset: 'Private',
              shareEmail: false,
              sharePhone: false,
              shareLinkedIn: false,
              shareTwitter: false,
            },
            checkedIn: true,
            ticketType: 'Speaker',
          } as Person,
        ];
      }
    }

    return [];
  };

  // Q&A state
  const [questionText, setQuestionText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [pollVoteError, setPollVoteError] = useState<string | null>(null);

  // If a session is selected, render Session Detail Screen
  const activeSession = sessions.find((s) => s.id === selectedSessionId);

  // Day filter counts
  const daySessions = sessions.filter((s) => s.day === activeDay);
  const daySavedSessions = daySessions.filter((s) => s.isBookmarked);

  // Filter sessions by Day, Tab, and Search Query
  const filteredSessions = sessions.filter((s) => {
    if (s.day !== activeDay) return false;
    if (activeTab === 'saved' && !s.isBookmarked) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchSpeaker = (s.speakerName || '').toLowerCase().includes(q);
      const matchCompany = (s.speakerCompany || '').toLowerCase().includes(q);
      const matchRoom = (s.room || '').toLowerCase().includes(q);
      const matchTrack = (s.track || '').toLowerCase().includes(q);
      return matchTitle || matchSpeaker || matchCompany || matchRoom || matchTrack;
    }
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
    const sessionSpeakers = resolveSessionSpeakers(activeSession);

    return (
      <div ref={scrollRef} className="flex-1 bg-[#F8F7F4] select-none overflow-y-auto pb-16">
        {/* Stage Hero Image Section */}
        <div
          className="relative h-[210px] w-full bg-cover bg-center overflow-hidden flex flex-col justify-between p-3 select-none"
          style={{
            backgroundImage: `url("${getSessionImage(activeSession)}")`,
          }}
        >
          {/* Multi-stop gradient overlay for crisp text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/35 pointer-events-none" />

          {/* Top Bar with round back button and bookmark */}
          <div className="relative z-10 flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedSessionId(null);
                setPollVoteError(null);
              }}
              className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all shadow-md"
              aria-label="Back to schedule"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmarkSession(activeSession.id)}
                className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all shadow-md"
                aria-label={activeSession.isBookmarked ? 'Saved to schedule' : 'Save session'}
              >
                {activeSession.isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-[#DC2626] fill-[#DC2626]" />
                ) : (
                  <Bookmark className="w-5 h-5 text-white" />
                )}
              </button>

              {activeSession.status === 'live' && (
                <span className="bg-[#DCFCE7] text-[#166534] font-bold text-[12px] px-3 py-1.5 rounded-lg shadow-sm tracking-wider uppercase backdrop-blur-sm animate-pulse">
                  LIVE NOW
                </span>
              )}
            </div>
          </div>

          {/* Bottom Title & Metadata */}
          <div className="relative z-10 pt-2">
            <p className="text-[12.5px] font-medium text-white/85 tracking-wide">
              {activeSession.timeRange} · {activeSession.room || 'Main Hall'} · {activeSession.track || 'Keynote'}
            </p>
            <h1 className="text-[20px] font-serif font-bold text-white tracking-tight leading-tight mt-1">
              {activeSession.title}
            </h1>
          </div>
        </div>

        {/* 4 Detail Tabs: Overview | Speaker(s) | Q&A | Poll */}
        <div className="bg-white border-b border-[#E5E7EB] px-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          {[
            { id: 'overview', label: 'Overview' },
            {
              id: 'speaker',
              label: sessionSpeakers.length > 1 ? `Speakers · ${sessionSpeakers.length}` : 'Speaker',
            },
            { id: 'qa', label: `Q&A · ${sessionQuestions.length}` },
            { id: 'poll', label: 'Poll' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setDetailSubTab(tab.id as any);
                setPollVoteError(null);
              }}
              className={`py-3 px-1 text-[13px] transition-all relative ${
                detailSubTab === tab.id
                  ? 'font-bold text-[#111827]'
                  : 'font-medium text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              <span>{tab.label}</span>
              {detailSubTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#DC2626] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="px-3 pt-3 space-y-3">
          {/* TAB 1: OVERVIEW */}
          {detailSubTab === 'overview' && (
            <div className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] space-y-3 shadow-xs text-xs">
              <div>
                <h3 className="font-bold text-[#111827] mb-1.5 uppercase tracking-wider text-[11px]">
                  Session Abstract
                </h3>
                <p className="text-[#4B5563] leading-relaxed text-[12.5px]">
                  {activeSession.description}
                </p>
              </div>

              {activeSession.takeaways && activeSession.takeaways.length > 0 && (
                <div>
                  <h3 className="font-bold text-[#111827] mb-2 uppercase tracking-wider text-[11px]">
                    Key Takeaways & Highlights
                  </h3>
                  <ul className="space-y-1.5 text-[#4B5563] text-[12px]">
                    {activeSession.takeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[#6B7280] text-[12px]">
                <span>Registered Attendance:</span>
                <strong className="text-[#111827] font-mono">{activeSession.attendanceCount} Attendees</strong>
              </div>
            </div>
          )}

          {/* TAB 2: SPEAKERS - CLICKABLE TO OPEN FULL PROFILE, NO DESCRIPTION IN LIST */}
          {detailSubTab === 'speaker' && (
            <div className="space-y-2.5">
              {sessionSpeakers.length === 0 ? (
                <div className="bg-white p-6 rounded-[16px] border border-[#E5E7EB] text-center text-xs text-[#6B7280]">
                  No speaker profiles published for this session.
                </div>
              ) : (
                sessionSpeakers.map((spk, idx) => (
                  <div
                    key={spk.id || idx}
                    onClick={() => {
                      if (spk.id) {
                        if (!attendees.some((a) => a.id === spk.id)) {
                          setAttendees((prev) => [...prev, spk]);
                        }
                        setSelectedPersonId(spk.id);
                      } else if (spk.name) {
                        setSelectedPersonId(spk.name);
                      }
                    }}
                    className="group bg-white p-3 sm:p-3.5 rounded-[16px] border border-[#E5E7EB] hover:border-[#DC2626]/40 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {spk.avatar ? (
                        <img
                          src={spk.avatar}
                          alt={spk.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#E5E7EB] flex-shrink-0 shadow-xs group-hover:ring-2 group-hover:ring-[#DC2626]/20 transition-all"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#FEE2E2] border border-[#FECACA] flex items-center justify-center font-bold text-[14px] text-[#DC2626] flex-shrink-0">
                          {spk.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#111827] group-hover:text-[#DC2626] transition-colors truncate">
                            {spk.name}
                          </h3>
                          <span className="inline-block text-[9.5px] font-semibold text-[#DC2626] bg-[#FEF2F2] border border-[#FEE2E2] px-1.5 py-0.5 rounded-md flex-shrink-0">
                            {sessionSpeakers.length > 1 ? 'Panelist' : 'Keynote Speaker'}
                          </span>
                        </div>

                        <p className="text-[11.5px] sm:text-[12px] text-[#4B5563] mt-0.5 truncate">
                          {spk.designation} · <strong className="text-[#111827]">{spk.company}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Right side: LinkedIn shortcut & Arrow to open profile */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {spk.linkedin && (
                        <a
                          href={spk.linkedin.startsWith('http') ? spk.linkedin : `https://${spk.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[10.5px] font-bold text-[#0A66C2] bg-[#E8F3FF] hover:bg-[#D0E8FF] px-2.5 py-1 rounded-full transition-colors"
                          title={`View ${spk.name} on LinkedIn`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>LinkedIn</span>
                        </a>
                      )}
                      <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#DC2626] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Q&A */}
          {detailSubTab === 'qa' && (
            <div className="space-y-3">
              {/* Submit Question Box */}
              <form onSubmit={handleQuestionSubmit} className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-bold text-[#111827]">Ask the Speaker</span>
                  <label className="flex items-center gap-1.5 text-[12px] text-[#6B7280] cursor-pointer">
                    <div
                      className={`w-3.5 h-3.5 rounded-[3px] border ${
                        isAnonymous ? 'bg-[#DC2626] border-[#DC2626]' : 'border-[#9CA3AF] bg-white'
                      } flex items-center justify-center transition-colors`}
                    >
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
                  placeholder="Pose your query to the panel or keynote speaker..."
                  rows={3}
                  className="w-full p-2.5 rounded-[10px] bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] text-[#111827] focus:outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] transition-all resize-none placeholder:text-[#9CA3AF]"
                />

                <div className="flex justify-between items-center pt-0.5">
                  <span className="text-[11px] text-[#6B7280] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Moderated live in session
                  </span>
                  <button
                    type="submit"
                    disabled={!questionText.trim()}
                    className="px-3.5 py-2 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-95 text-white font-bold text-[12.5px] rounded-[8px] shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:active:scale-100"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                </div>
              </form>

              {/* Questions List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1 text-[#6B7280]">
                  <h3 className="text-[13.5px] font-bold text-[#111827]">Submitted Questions</h3>
                  <span className="text-[11.5px]">Sorted by votes</span>
                </div>

                {sessionQuestions.length === 0 ? (
                  <div className="bg-white rounded-[16px] border border-dashed border-[#E5E7EB] p-7 flex flex-col items-center justify-center text-center space-y-2">
                    <MessageSquare className="w-10 h-10 text-[#FEE2E2]" />
                    <p className="font-bold text-[#111827] text-[14px]">No questions yet</p>
                    <p className="text-[12px] text-[#6B7280]">Be the first to submit a question to the speaker!</p>
                  </div>
                ) : (
                  sessionQuestions.map((q) => {
                    const hasUpvoted = q.upvotedBy.includes(currentUser.id);
                    return (
                      <div
                        key={q.id}
                        className="p-3 bg-white rounded-[12px] border border-[#E5E7EB] shadow-xs flex items-start justify-between gap-2.5"
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11.5px] font-bold text-[#111827]">{q.authorName}</span>
                            <span className="text-[10px] text-[#6B7280]">{q.createdAt}</span>
                            <span
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                q.status === 'Answered'
                                  ? 'bg-[#EBF5F0] text-[#2F7D58]'
                                  : 'bg-blue-50 text-blue-700'
                              }`}
                            >
                              {q.status}
                            </span>
                          </div>
                          <p className="text-[12px] text-[#111827] leading-relaxed">{q.text}</p>
                        </div>

                        <button
                          onClick={() => upvoteQuestion(q.id)}
                          className={`min-w-[40px] h-9 px-2 rounded-lg border text-xs font-bold flex flex-col items-center justify-center transition-all active:scale-95 ${
                            hasUpvoted
                              ? 'bg-[#DC2626] border-[#DC2626] text-white shadow-xs'
                              : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827] hover:border-[#DC2626]'
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
            <div className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#DC2626] bg-[#FEF2F2] border border-[#FEE2E2] px-2 py-0.5 rounded">
                  Official Live Poll
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    poll.status === 'open'
                      ? 'bg-[#EBF5F0] text-[#2F7D58]'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {poll.status === 'open' ? 'Open for Votes' : 'Closed'}
                </span>
              </div>

              <h2 className="text-[13px] font-bold text-[#111827] leading-snug">
                {poll.question}
              </h2>

              {pollVoteError && (
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{pollVoteError}</span>
                </div>
              )}

              <div className="space-y-2 pt-1">
                {poll.options.map((option) => {
                  const percentage =
                    poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handlePollVote(option.id)}
                      disabled={poll.status === 'closed'}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all relative overflow-hidden active:scale-[0.99] ${
                        hasUserVotedInPoll
                          ? 'border-[#E5E7EB] bg-[#F9FAFB]'
                          : 'border-[#E5E7EB] hover:border-[#DC2626] bg-white hover:bg-red-50/20'
                      }`}
                    >
                      {hasUserVotedInPoll && (
                        <div
                          className="absolute inset-y-0 left-0 bg-[#FEE2E2] opacity-60 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-[#111827]">
                        <span>{option.text}</span>
                        {hasUserVotedInPoll && (
                          <span className="font-mono font-bold text-[#111827]">
                            {percentage}% ({option.votes})
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                <span>{poll.totalVotes} responses recorded</span>
                {hasUserVotedInPoll ? (
                  <span className="text-[#2F7D58] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Vote recorded
                  </span>
                ) : (
                  <span className="text-[#111827] font-medium">1 vote per attendee</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SCHEDULE LIST VIEW
  return (
    <div ref={scrollRef} className="flex-1 bg-[#F8F7F4] select-none overflow-y-auto px-3 pt-2 pb-24">
      {/* Header section matching reference mockup */}
      <div className="pt-2 pb-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">
              MPSS26 · PROGRAMME
            </p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none">
              Schedule
            </h1>
          </div>

          <button
            onClick={() => {
              setIsSearchOpen((prev) => !prev);
              if (isSearchOpen) setSearchQuery('');
            }}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              isSearchOpen || searchQuery
                ? 'bg-[#DC2626] border-[#DC2626] text-white shadow-xs'
                : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111827] shadow-xs'
            }`}
            aria-label="Toggle search"
          >
            {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Search Input */}
        {isSearchOpen && (
          <div className="mt-2.5 relative animate-in fade-in slide-in-from-top-2 duration-150">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Search sessions, speakers, rooms, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-[#E5E7EB] text-[13px] text-[#111827] focus:outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] shadow-xs placeholder:text-[#9CA3AF]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Segmented Top Toggle: All Sessions (X) | My Schedule (Y) */}
      <div className="pt-2 pb-2">
        <div className="flex bg-[#F1EFEA] p-1 rounded-xl border border-[#E2DFD8]">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#111827] shadow-xs border border-black/5'
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            All Sessions ({daySessions.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-white text-[#111827] font-semibold shadow-xs border border-black/5'
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>My Schedule ({daySavedSessions.length})</span>
          </button>
        </div>
      </div>

      {/* Day Selector Tabs: Day 1: Oct 23, 2026 | Day 2: Oct 24, 2026 */}
      <div className="border-b border-[#E5E7EB] bg-[#F8F7F4] sticky top-0 z-10 -mx-3 px-3">
        <div className="flex -mb-[1px]">
          {[
            { day: 1, label: 'Day 1: Oct 23, 2026' },
            { day: 2, label: 'Day 2: Oct 24, 2026' },
          ].map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`flex-1 py-2.5 px-2 text-center text-[13px] transition-all whitespace-nowrap border-b-2 ${
                activeDay === d.day
                  ? 'text-[#0F172A] font-bold border-[#DC2626]'
                  : 'text-[#6B7280] hover:text-[#0F172A] font-medium border-transparent'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="pt-3">
        {filteredSessions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-[16px] border border-[#E5E7EB] shadow-xs my-4">
            <Bookmark className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
            <p className="text-[13px] font-bold text-[#111827]">
              {activeTab === 'saved' ? 'No sessions saved for this day' : 'No matching sessions found'}
            </p>
            <p className="text-[11.5px] text-[#6B7280] mt-1 leading-relaxed max-w-[260px] mx-auto">
              {activeTab === 'saved'
                ? 'Tap the bookmark ribbon on any session card to add it to your personal itinerary.'
                : 'Try adjusting your search query or pick a different summit day.'}
            </p>
          </div>
        ) : (
          <div className="relative">
            {filteredSessions.map((session, index) => {
              const time = parseTime(session.timeRange);
              const isSpecialBreak = isBreakSession(session);

              return (
                <div key={session.id} className="relative flex items-stretch group">
                  {/* Left Column: Fixed, compact time column (50px width so mobile session box has maximal room) */}
                  <div className="w-[50px] sm:w-[56px] flex-shrink-0 text-right pr-2 pt-2.5 select-none">
                    <span className="block text-[12.5px] font-bold text-[#0F172A] leading-tight font-mono tracking-tight">
                      {time.start}
                    </span>
                    {time.end && (
                      <span className="block text-[10.5px] font-medium text-[#64748B] leading-tight font-mono mt-0.5">
                        {time.end}
                      </span>
                    )}
                  </div>

                  {/* Center Column: Continuous Timeline Line & Dot Node */}
                  <div className="w-3.5 flex-shrink-0 flex flex-col items-center relative">
                    {/* Top half line */}
                    <div
                      className={`w-[1.5px] flex-1 ${
                        index === 0 ? 'bg-transparent' : 'bg-[#CBD5E1]'
                      }`}
                    />
                    {/* Node circle */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 my-0.5 border border-white shadow-xs ${
                        isSpecialBreak
                          ? 'bg-[#B45309] ring-2 ring-[#FEF3C7]'
                          : 'bg-[#64748B]'
                      }`}
                    />
                    {/* Bottom half line */}
                    <div
                      className={`w-[1.5px] flex-1 ${
                        index === filteredSessions.length - 1 ? 'bg-transparent' : 'bg-[#CBD5E1]'
                      }`}
                    />
                  </div>

                  {/* Right Column: SESSION BOX (flex-1 min-w-0 guarantees full visibility on mobile viewports!) */}
                  <div className="flex-1 min-w-0 pl-2.5 sm:pl-3 pb-3 pt-0.5">
                    {isSpecialBreak ? (
                      /* Special Break / Dining / Cultural Row */
                      <div
                        onClick={() => setSelectedSessionId(session.id)}
                        className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[16px] p-3 shadow-xs flex items-center gap-2.5 cursor-pointer hover:border-[#F59E0B] transition-all"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center flex-shrink-0">
                          {getBreakIcon(session.title)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[12.5px] font-bold text-[#92400E] leading-tight truncate">
                            {session.title}
                          </h4>
                          <p className="text-[10.5px] text-[#B45309] mt-0.5 truncate flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                            <span>{session.room || 'Brilliant Convention Centre'}</span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Crisp White Session Box */
                      <div
                        onClick={() => setSelectedSessionId(session.id)}
                        className="bg-white rounded-[16px] border border-[#E2E8F0] hover:border-[#CBD5E1] p-3 sm:p-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer relative"
                      >
                        {/* Top row: Track tag & Bookmark icon */}
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-md truncate max-w-[200px]">
                            {session.track || 'Session'}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmarkSession(session.id);
                            }}
                            className="p-1 -mr-1 -mt-1 rounded-full text-[#94A3B8] hover:text-[#DC2626] transition-colors"
                            aria-label={session.isBookmarked ? 'Remove bookmark' : 'Bookmark session'}
                          >
                            {session.isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-[#DC2626] fill-[#DC2626]" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Title */}
                        <h3 className="text-[13px] sm:text-[14px] font-bold text-[#0F172A] leading-snug group-hover:text-[#DC2626] transition-colors">
                          {session.title}
                        </h3>

                        {/* Speaker info */}
                        {(() => {
                          const spks = resolveSessionSpeakers(session);
                          if (spks.length > 1) {
                            return (
                              <div className="mt-1 flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#475569] flex-wrap">
                                <Users className="w-3 h-3 text-[#94A3B8] flex-shrink-0" />
                                {spks.map((s, sIdx) => (
                                  <span
                                    key={s.id || sIdx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (s.id) {
                                        if (!attendees.some((a) => a.id === s.id)) {
                                          setAttendees((prev) => [...prev, s]);
                                        }
                                        setSelectedPersonId(s.id);
                                      } else if (s.name) {
                                        setSelectedPersonId(s.name);
                                      }
                                    }}
                                    className="font-semibold text-[#1E293B] hover:text-[#DC2626] hover:underline cursor-pointer"
                                  >
                                    {s.name}{sIdx < spks.length - 1 ? ',' : ''}
                                  </span>
                                ))}
                              </div>
                            );
                          }
                          if (spks.length === 1) {
                            const spk = spks[0];
                            return (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (spk.id) {
                                    if (!attendees.some((a) => a.id === spk.id)) {
                                      setAttendees((prev) => [...prev, spk]);
                                    }
                                    setSelectedPersonId(spk.id);
                                  } else if (spk.name) {
                                    setSelectedPersonId(spk.name);
                                  }
                                }}
                                className="mt-1 flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#475569] cursor-pointer group/spk"
                              >
                                <User className="w-3 h-3 text-[#94A3B8] flex-shrink-0 group-hover/spk:text-[#DC2626]" />
                                <span className="font-semibold text-[#1E293B] group-hover/spk:text-[#DC2626] group-hover/spk:underline truncate">
                                  {spk.name}
                                </span>
                                {spk.company && (
                                  <span className="text-[#64748B] truncate">· {spk.company}</span>
                                )}
                              </div>
                            );
                          }
                          if (session.speakerName) {
                            return (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (session.speakerId) {
                                    setSelectedPersonId(session.speakerId);
                                  } else {
                                    setSelectedPersonId(session.speakerName);
                                  }
                                }}
                                className="mt-1 flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#475569] cursor-pointer group/spk"
                              >
                                <User className="w-3 h-3 text-[#94A3B8] flex-shrink-0 group-hover/spk:text-[#DC2626]" />
                                <span className="font-semibold text-[#1E293B] group-hover/spk:text-[#DC2626] group-hover/spk:underline truncate">
                                  {session.speakerName}
                                </span>
                                {session.speakerCompany && (
                                  <span className="text-[#64748B] truncate">· {session.speakerCompany}</span>
                                )}
                              </div>
                            );
                          }
                          return null;
                        })()}

                        {/* Location / Room */}
                        {session.room && (
                          <div className="mt-0.5 flex items-center gap-1 text-[10.5px] text-[#64748B]">
                            <MapPin className="w-2.5 h-2.5 text-[#94A3B8] flex-shrink-0" />
                            <span className="truncate">{session.room}</span>
                          </div>
                        )}

                        {/* Bottom row: Live badge / info & Details button */}
                        <div className="mt-2 pt-1.5 border-t border-[#F1F5F9] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {session.status === 'live' ? (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                                LIVE NOW
                              </span>
                            ) : (
                              <span className="text-[10px] text-[#94A3B8]">
                                {session.attendanceCount > 0 ? `${session.attendanceCount} attending` : 'Open Entry'}
                              </span>
                            )}
                          </div>

                          <span className="text-[11px] font-bold text-[#475569] group-hover:text-[#DC2626] flex items-center gap-0.5 ml-auto">
                            Details{' '}
                            <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
