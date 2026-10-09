'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import {
  Calendar,
  Clock,
  MapPin,
  Mic,
  MessageSquare,
  BarChart2,
  CheckCircle,
  Archive,
  Star,
  Plus,
  Edit,
  Eye,
  ChevronLeft,
  X,
  Play
} from 'lucide-react';
import { QuestionStatus } from '../../types';

export const OrganizerSessions: React.FC = () => {
  const {
    sessions,
    questions,
    updateQuestionStatus,
    poll,
    togglePollStatus,
    showToast,
  } = useStore();

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>('sess-keynote');
  const [sessionDetailTab, setSessionDetailTab] = useState<'overview' | 'speaker' | 'attendance' | 'qa' | 'poll'>('qa');
  const [qaStatusFilter, setQaStatusFilter] = useState<string>('All');

  const activeSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];
  const sessionQuestions = questions.filter((q) => q.sessionId === activeSession.id);

  const filteredQuestions = sessionQuestions.filter((q) => {
    if (qaStatusFilter === 'All') return true;
    return q.status === qaStatusFilter;
  });

  return (
    <div className="space-y-3 select-none max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div>
          <h1 className="text-[15px] font-black text-[#181818] tracking-tight">Session Moderation & Stage Control</h1>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Stage schedule, live Q&A moderation, and audience polling
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Session creation modal simulated', 'info')}
            className="px-2.5 py-2 bg-[#B51F32] hover:bg-[#9C1A2B] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Session</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sessions List on Left, Active Session Console on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        {/* Left: Sessions Roster (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-[#181818] uppercase tracking-wide">
            Summit Stage Schedule
          </span>

          <div className="space-y-2">
            {sessions.map((sess) => {
              const isSelected = sess.id === activeSession.id;
              const qCount = questions.filter((q) => q.sessionId === sess.id).length;

              return (
                <div
                  key={sess.id}
                  onClick={() => setSelectedSessionId(sess.id)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#B51F32] shadow-sm ring-1 ring-[#B51F32]'
                      : 'bg-white border-[#DEDCD7] hover:border-[#181818]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono text-[#6B6B6B] font-semibold">{sess.timeRange}</span>
                    <span className="font-semibold text-[#181818] bg-[#EFEEEA] px-1.5 py-0.2 rounded">
                      {sess.room}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[#181818] leading-snug">
                    {sess.title}
                  </h3>

                  <p className="text-[11px] text-[#6B6B6B] mt-1">
                    {sess.speakerName} · {sess.speakerCompany}
                  </p>

                  <div className="mt-2 pt-2 border-t border-[#DEDCD7]/60 flex items-center justify-between text-[10px] text-[#6B6B6B]">
                    <span className="font-medium bg-[#F6F4F0] px-1.5 py-0.5 rounded text-[#181818]">
                      {sess.track}
                    </span>
                    <span className="font-bold text-[#B51F32]">
                      {qCount} Q&A questions
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Stage Moderator Console (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-[14px] border border-[#DEDCD7] shadow-xs p-3 space-y-2">
          {/* Active Session Title Header */}
          <div className="pb-3 border-b border-[#DEDCD7]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B51F32] bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                Stage Console
              </span>
              <span className="text-xs font-mono text-[#6B6B6B]">{activeSession.timeRange}</span>
              <span className="text-xs text-[#6B6B6B]">· {activeSession.room}</span>
            </div>
            <h2 className="text-[13px] font-bold text-[#181818]">{activeSession.title}</h2>
            <p className="text-xs text-[#6B6B6B]">
              Speaker: <strong className="text-[#181818]">{activeSession.speakerName}</strong> ({activeSession.speakerDesignation}, {activeSession.speakerCompany})
            </p>
          </div>

          {/* Console Subtabs */}
          <div className="flex bg-[#EFEEEA] p-1 rounded-lg border border-[#DEDCD7]">
            {[
              { id: 'qa', label: `Live Q&A Moderation (${sessionQuestions.length})` },
              { id: 'poll', label: 'Audience Poll' },
              { id: 'overview', label: 'Overview' },
              { id: 'speaker', label: 'Speaker Info' },
              { id: 'attendance', label: 'Attendance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSessionDetailTab(tab.id as any)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  sessionDetailTab === tab.id
                    ? 'bg-white text-[#181818] shadow-xs'
                    : 'text-[#6B6B6B] hover:text-[#181818]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Q&A MODERATOR CONSOLE */}
          {sessionDetailTab === 'qa' && (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#181818]">
                  Incoming Audience Questions
                </span>
                
                {/* Status filter chips */}
                <div className="flex gap-1">
                  {['All', 'Submitted', 'Selected', 'Answered', 'Archived'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setQaStatusFilter(st)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                        qaStatusFilter === st
                          ? 'bg-[#181818] text-white'
                          : 'bg-[#EFEEEA] text-[#6B6B6B] hover:text-[#181818]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions list */}
              <div className="space-y-3">
                {filteredQuestions.length === 0 ? (
                  <div className="p-8 text-center bg-[#F6F4F0] rounded-lg border border-[#DEDCD7]">
                    <p className="text-xs font-semibold text-[#181818]">No questions found</p>
                    <p className="text-[11px] text-[#6B6B6B]">
                      Attendees can submit questions directly from the Delegate Schedule screen.
                    </p>
                  </div>
                ) : (
                  filteredQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7] space-y-2.5 shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#181818]">{q.authorName}</span>
                            <span className="text-[10px] text-[#6B6B6B]">{q.createdAt}</span>
                            <span
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ${
                                q.status === 'Answered'
                                  ? 'bg-green-100 text-[#2F7D58] border-green-200'
                                  : q.status === 'Selected'
                                  ? 'bg-amber-100 text-amber-800 border-amber-300 font-bold'
                                  : q.status === 'Archived'
                                  ? 'bg-gray-200 text-gray-600 border-gray-300'
                                  : 'bg-blue-100 text-blue-800 border-blue-200'
                              }`}
                            >
                              {q.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#181818] font-medium leading-relaxed mt-1">
                            "{q.text}"
                          </p>
                        </div>

                        <span className="text-xs font-bold font-mono text-[#B51F32] bg-white border border-[#DEDCD7] px-2 py-1 rounded-lg">
                          ▲ {q.upvotes}
                        </span>
                      </div>

                      {/* Moderator Action Buttons: Select / Mark Answered / Archive */}
                      <div className="pt-2 border-t border-[#DEDCD7]/60 flex items-center justify-end gap-1.5 text-xs">
                        <button
                          onClick={() => updateQuestionStatus(q.id, 'Selected')}
                          className={`px-2.5 py-1 rounded-lg font-semibold border transition-all ${
                            q.status === 'Selected'
                              ? 'bg-amber-100 border-amber-300 text-amber-900'
                              : 'bg-white border-[#DEDCD7] text-[#181818] hover:border-amber-400'
                          }`}
                        >
                          Select for Stage
                        </button>

                        <button
                          onClick={() => updateQuestionStatus(q.id, 'Answered')}
                          className={`px-2.5 py-1 rounded-lg font-semibold border transition-all ${
                            q.status === 'Answered'
                              ? 'bg-green-100 border-green-300 text-[#2F7D58]'
                              : 'bg-white border-[#DEDCD7] text-[#181818] hover:border-green-400'
                          }`}
                        >
                          Mark Answered
                        </button>

                        <button
                          onClick={() => updateQuestionStatus(q.id, 'Archived')}
                          className="px-2.5 py-1 bg-white border border-[#DEDCD7] rounded-lg text-[#6B6B6B] hover:text-[#181818]"
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: POLL MANAGEMENT */}
          {sessionDetailTab === 'poll' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#DEDCD7]">
                <div>
                  <h3 className="text-xs font-bold text-[#181818]">Live Interactive Stage Poll</h3>
                  <p className="text-[11px] text-[#6B6B6B]">Audience response metrics</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePollStatus}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      poll.status === 'open'
                        ? 'bg-red-50 text-[#B51F32] border border-red-200 hover:bg-red-100'
                        : 'bg-[#2F7D58] text-white hover:bg-[#256346]'
                    }`}
                  >
                    {poll.status === 'open' ? 'Close Poll' : 'Reopen Poll'}
                  </button>
                </div>
              </div>

              <div className="bg-[#F6F4F0] p-2.5 rounded-lg border border-[#DEDCD7] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[12px] font-bold text-[#181818]">{poll.question}</h4>
                  <span className="text-xs font-mono font-bold text-[#181818]">
                    {poll.totalVotes} Total Responses
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {poll.options.map((opt) => {
                    const percentage = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                    return (
                      <div key={opt.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-[#181818]">
                          <span>{opt.text}</span>
                          <span className="font-mono">{percentage}% ({opt.votes} votes)</span>
                        </div>
                        <div className="w-full bg-white h-2.5 rounded-full border border-[#DEDCD7] overflow-hidden">
                          <div
                            className="bg-[#B51F32] h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                <span>Status: <strong className="text-[#181818] uppercase">{poll.status}</strong></span>
                <button
                  onClick={() => showToast('Poll results exported as CSV ✓', 'success')}
                  className="font-semibold text-[#B51F32] hover:underline"
                >
                  Export Poll Results CSV
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: OVERVIEW */}
          {sessionDetailTab === 'overview' && (
            <div className="space-y-3 text-xs">
              <p className="text-[#6B6B6B] leading-relaxed">
                {activeSession.description}
              </p>
              <div>
                <strong className="text-[#181818] block mb-1">Key Takeaways:</strong>
                <ul className="list-disc pl-4 space-y-1 text-[#6B6B6B]">
                  {activeSession.takeaways.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: SPEAKER INFO */}
          {sessionDetailTab === 'speaker' && (
            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#181818]">{activeSession.speakerName}</p>
              <p className="text-[#6B6B6B]">{activeSession.speakerDesignation} · {activeSession.speakerCompany}</p>
              <p className="text-[#6B6B6B] pt-2 border-t border-[#DEDCD7]">
                Keynote speaker delivering opening presentation for India Tech Summit 2026.
              </p>
            </div>
          )}

          {/* TAB 5: ATTENDANCE */}
          {sessionDetailTab === 'attendance' && (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-[#F6F4F0] rounded-lg border border-[#DEDCD7]">
                <span>Registered for Session:</span>
                <strong className="text-[13px] font-mono text-[#181818]">{activeSession.attendanceCount} Attendees</strong>
              </div>
              <p className="text-[11px] text-[#6B6B6B]">
                Hall A Capacity: 500 seats (84% occupied).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
