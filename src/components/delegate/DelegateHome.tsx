'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../../lib/store';
import { INITIAL_ATTENDEES } from '../../lib/mockData';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Check,
  Clock,
  ChevronRight,
  Star,
  Users,
  Map,
  Bookmark,
  BookmarkCheck,
  BarChart2,
} from 'lucide-react';

export const DelegateHome: React.FC = () => {
  const {
    currentUser,
    event,
    attendees,
    connections,
    connectWith,
    disconnectFrom,
    setActiveDelegateTab,
    setSelectedSessionId,
    setSelectedPersonId,
    setSelectedCompanyId,
    sessions,
    exhibitors,
    toggleBookmarkSession,
  } = useStore();

  // Featured "Up next" session for MPSS 2026: Day 1 Opening Keynote at 10:00 AM – 10:30 AM
  const featuredSession =
    sessions.find((s) => s.id === 'mpss26-d1-02') ||
    sessions.find((s) => s.title.toLowerCase().includes('global semiconductor industry')) ||
    sessions[1] ||
    sessions[0] || {
      id: 'mpss26-d1-02',
      title: 'Keynote on Global Semiconductor Industry & Technology Trends',
      timeRange: '10:00 AM – 10:30 AM',
      room: 'Main Auditorium',
      day: 1,
      speakerName: 'Jaswinder Ahuja',
      speakerDesignation: 'Advisor',
      speakerCompany: 'India Semiconductor Mission',
      speakerId: 'speaker-jaswinder-ahuja',
      isBookmarked: false,
    };


  const isFeaturedBookmarked = sessions.some(
    (s) => s.id === featuredSession.id && s.isBookmarked
  );

  // Curated people to meet (excluding self)
  const recommendedPeople = attendees
    .filter(
      (a) =>
        a.id !== currentUser.id &&
        (a.relevanceScore || 0) >= 80 &&
        a.name.toLowerCase() !== 'sai kumar'
    )
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, 10);

  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    } else if (distance < -minSwipeDistance) {
      setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const handleConnect = (personId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    connectWith(personId, 'recommended');
  };

  const isConnected = (personId: string) => {
    return connections.some((c) => c.personId === personId && c.status === 'connected');
  };

  const isPending = (personId: string) => {
    return connections.some((c) => c.personId === personId && c.status === 'pending');
  };

  const getGreetingIST = () => {
    const options = { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false } as const;
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const hour = parseInt(formatter.format(new Date()), 10);
    if (hour < 12) return 'GOOD MORNING,';
    if (hour < 17) return 'GOOD AFTERNOON,';
    return 'GOOD EVENING,';
  };

  // Up next overlapping avatars
  const upNextAvatars = [
    '/images/speakers/manish-hooda.png',
    '/images/speakers/jaswinder-ahuja.png',
    '/images/speakers/satya-gupta.png',
  ];

  return (
    <div className="flex-1 px-3 pt-2 pb-24 space-y-3 bg-[#F8F7F4] overflow-y-auto select-none">
      {/* Top Greeting & Attendee Identity Header */}
      <div className="pt-2 pb-1">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="text-[10.5px] uppercase tracking-[0.15em] text-[#6B6B6B] font-semibold mb-0.5">
              MPSS26 · DELEGATE
            </p>
            <h1 className="text-[32px] font-serif font-medium text-[#181818] tracking-tight leading-none truncate">
              {currentUser.name}
            </h1>
            <p className="text-[12px] text-[#6B6B6B] font-medium mt-1 truncate">
              {currentUser.designation} · {currentUser.company}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <button
              onClick={() => setActiveDelegateTab('profile')}
              className="relative group focus:outline-none flex-shrink-0"
              aria-label="View Profile"
            >
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#181818] text-white flex items-center justify-center font-bold text-base border-2 border-white shadow-sm">
                  {currentUser.name.split(' ').map((n) => n[0]).join('')}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full shadow-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Carousel Banner Card */}
      <div
        className="relative rounded-[18px] shadow-sm overflow-hidden bg-[#18181B]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {/* Slide 1: BTS26 Live Event Card */}
          <div className="w-full flex-shrink-0 p-3.5 pb-3.5 relative min-h-[136px] bg-gradient-to-br from-[#18181B] via-[#222226] to-[#2E2E33]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10.5px] font-bold text-white bg-[#27272A] px-2 py-0.5 rounded-md">
                {event.id}
              </span>
              <div className="flex items-center gap-1.5 bg-[#DC2626] px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  LIVE
                </span>
              </div>
            </div>

            <h2 className="text-[16px] font-bold text-white tracking-tight leading-snug">
              {event.name}
            </h2>

            <div className="mt-1.5 text-[11.5px] text-[#A1A1AA] space-y-1">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#9CA3AF]" />
                <span className="truncate">{event.venue}, {event.city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-[#9CA3AF]" />
                <span>{event.dates}</span>
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] whitespace-nowrap overflow-x-auto no-scrollbar pb-0.5 pr-14">
              <span className="bg-[#27272A] text-[#E5E7EB] px-2 py-0.5 rounded-md shrink-0">
                <strong>{event.totalRegistered || attendees.length}</strong> attendees
              </span>
              <span className="bg-[#27272A] text-[#E5E7EB] px-2 py-0.5 rounded-md shrink-0">
                <strong>{event.totalSpeakers || 40}</strong> speakers
              </span>
              <span className="bg-[#27272A] text-[#E5E7EB] px-2 py-0.5 rounded-md shrink-0">
                <strong>{event.totalExhibitors || 86}</strong> exhibitors
              </span>
            </div>
          </div>

          {/* Slide 2: Keynote Spotlight */}
          <div className="w-full flex-shrink-0 p-3.5 pb-3.5 relative min-h-[136px] bg-gradient-to-br from-[#18181B] via-[#2E1218] to-[#601420]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10.5px] font-bold text-[#E5E5E5] bg-[#27272A] px-2 py-0.5 rounded-md">
                FEATURED KEYNOTE
              </span>
              <div className="flex items-center gap-1 bg-[#DC2626] px-2 py-0.5 rounded-full">
                <span className="text-[9.5px] font-bold text-white uppercase tracking-wider">UPCOMING</span>
              </div>
            </div>
            <h2 className="text-[15px] font-bold text-white tracking-tight">The Future of AI & Cloud</h2>
            <div className="mt-1.5 text-[11.5px] text-[#D1D5DB] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#F87171]" />
              Main Auditorium • 2:00 PM – 2:45 PM
            </div>
            <div className="mt-2 flex items-center gap-1.5 bg-[#27272A]/70 w-fit px-2 py-0.5 rounded-full border border-white/10">
              <img
                src="https://www.bengalurutechsummit.com/img/speakers/Harshil_Mathur.jpg"
                className="w-5 h-5 rounded-full border border-white/20 object-cover"
                alt="Speaker"
              />
              <span className="text-[11px] font-semibold text-white">Harshil Mathur · Razorpay</span>
            </div>
          </div>

          {/* Slide 3: Networking Mixer */}
          <div className="w-full flex-shrink-0 p-3.5 pb-3.5 relative min-h-[136px] bg-gradient-to-br from-[#18181B] via-[#10241B] to-[#064E3B]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10.5px] font-bold text-[#E5E5E5] bg-[#27272A] px-2 py-0.5 rounded-md">
                NETWORKING
              </span>
              <span className="text-[9.5px] font-bold text-[#34D399] uppercase tracking-wider">TODAY</span>
            </div>
            <h2 className="text-[15px] font-bold text-white tracking-tight mt-0.5">Tech Founders & Investors Mixer</h2>
            <div className="mt-1.5 text-[11.5px] text-[#A7F3D0] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              VIP Lounge • 6:00 PM Onwards
            </div>
            <p className="mt-1.5 text-[11px] text-[#E5E5E5] leading-snug pr-14 truncate">
              Connect with 50+ founders, investors, and enterprise tech leaders.
            </p>
          </div>

          {/* Slide 4: Expo Contest */}
          <div className="w-full flex-shrink-0 p-3.5 pb-3.5 relative min-h-[136px] bg-gradient-to-br from-[#18181B] via-[#111C2E] to-[#1E3A8A]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10.5px] font-bold text-[#E5E5E5] bg-[#2563EB] px-2 py-0.5 rounded-md">
                EXPO CHALLENGE
              </span>
              <span className="text-[9.5px] font-bold text-[#93C5FD] uppercase tracking-wider">REWARDS</span>
            </div>
            <h2 className="text-[15px] font-bold text-white tracking-tight mt-0.5">Connect at Booths & Win MPSS26 Merch!</h2>
            <div className="mt-1.5 text-[11.5px] text-[#BFDBFE] flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              Visit 10 Exhibitors & Connect at Booths
            </div>
            <p className="mt-1.5 text-[11px] text-[#E5E5E5] leading-snug pr-14 truncate">
              Collect stamps on your digital passport to claim exclusive summit goodies.
            </p>
          </div>
        </div>

        {/* Dots Overlay */}
        <div className="absolute bottom-2.5 right-2.5 flex gap-1 z-20 pointer-events-auto">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                activeSlide === i ? 'bg-white scale-125' : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Up next Section */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-[16px] font-bold text-[#111827] tracking-tight">Up next</h3>
          <button
            onClick={() => {
              setSelectedSessionId(null);
              setActiveDelegateTab('schedule');
            }}
            className="text-[12px] font-semibold text-[#DC2626] flex items-center gap-0.5 hover:underline"
          >
            <span>View full agenda</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Up next Card */}
        <div
          onClick={() => {
            setSelectedSessionId(featuredSession.id);
            setActiveDelegateTab('schedule');
          }}
          className="bg-white rounded-[16px] p-3.5 border border-[#E5E7EB] shadow-xs cursor-pointer hover:border-gray-300 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] font-bold text-[#111827]">
              {featuredSession.timeRange
                ? (featuredSession.timeRange.includes('AM') || featuredSession.timeRange.includes('PM')
                    ? featuredSession.timeRange
                    : `${featuredSession.timeRange.replace('–', ' AM – ')} AM`)
                : '10:00 AM – 10:30 AM'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmarkSession(featuredSession.id);
              }}
              className="text-[#111827] p-0.5 hover:scale-110 transition-transform"
              aria-label="Bookmark session"
            >
              {isFeaturedBookmarked ? (
                <BookmarkCheck className="w-4.5 h-4.5 text-[#DC2626] fill-[#DC2626]" />
              ) : (
                <Bookmark className="w-4.5 h-4.5 text-[#111827]" />
              )}
            </button>
          </div>

          <div className="mt-1">
            <h4 className="text-[14.5px] font-bold text-[#111827] tracking-tight leading-snug">
              {featuredSession.title || 'Keynote on Global Semiconductor Industry & Technology Trends'}
            </h4>
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#6B7280] mt-1">
              <span className="flex items-center gap-1 flex-shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <span>{featuredSession.room || 'Main Auditorium'}</span>
              </span>
            </div>
          </div>

          {/* Compact View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSessionId(featuredSession.id);
              setActiveDelegateTab('schedule');
            }}
            className="w-full mt-2.5 py-2 bg-[#FAF7F2] hover:bg-[#F2ECE3] text-[#111827] rounded-xl text-[12px] font-bold flex items-center justify-center gap-1 border border-[#EBE7DF] transition-colors"
          >
            <span>View details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick access Section */}
      <div>
        <h3 className="text-[16px] font-bold text-[#111827] tracking-tight mb-2 px-0.5">
          Quick access
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'speakers', label: 'Speakers', icon: Users, tab: 'speakers' },
            { id: 'polls', label: 'Poll', icon: BarChart2, tab: 'polls' },
            { id: 'map', label: 'Map', icon: Map, tab: 'map' },
            { id: 'sponsors', label: 'Sponsors', icon: Star, tab: 'sponsors' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveDelegateTab(item.tab as any)}
              className="flex flex-col items-center justify-center py-3 px-1 bg-white rounded-2xl shadow-xs border border-[#E5E7EB] active:scale-95 transition-all text-[#111827] hover:border-gray-400"
            >
              <item.icon className="w-5.5 h-5.5 mb-1.5 text-[#111827] stroke-[1.8]" />
              <span className="text-[11.5px] font-semibold text-[#111827] tracking-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* My AI Recommendations (People Profiles) - Matching reference design */}
      {recommendedPeople.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="text-[17px] font-bold text-[#111827] tracking-tight">
              People You Should Meet
            </h3>
            <button
              onClick={() => setActiveDelegateTab('people')}
              className="text-[13px] font-semibold text-[#111827] flex items-center gap-0.5 hover:underline"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-3 px-3 pb-1 pt-1.5">
            <div className="flex gap-3 w-max">
              {recommendedPeople.map((person) => {
                const connected = isConnected(person.id);
                const pending = isPending(person.id);
                return (
                  <div
                    key={person.id}
                    onClick={() => setSelectedPersonId(person.id)}
                    className="bg-white p-2.5 rounded-[15px] border border-[#E5E7EB] flex-shrink-0 w-[178px] flex flex-col justify-between gap-2 cursor-pointer shadow-xs hover:border-gray-400 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        {person.avatar ? (
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="w-[34px] h-[34px] rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-[34px] h-[34px] rounded-full bg-[#EFEBE5] flex items-center justify-center font-bold text-xs text-[#181818] flex-shrink-0 border border-[#DEDCD7]">
                            {person.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-bold text-[#111827] truncate leading-tight">
                            {person.name}
                          </h4>
                          <p className="text-[11px] text-[#6B7280] truncate mt-0.5">
                            {person.designation}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1.5 flex items-center justify-center gap-1 text-[11.5px] font-semibold text-[#181818] border-t border-gray-100 mt-1 text-center">
                      <span>View profile</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Exhibitors to Explore */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-[17px] font-bold text-[#111827] tracking-tight">
            Exhibitors to Explore
          </h3>
          <button
            onClick={() => setActiveDelegateTab('companies')}
            className="text-[12px] font-semibold text-[#DC2626] flex items-center gap-1 hover:underline"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {(() => {
            const exploreCompanies = ['MPSEDC', 'Truechip solutions private limited', 'CDAC', 'Analog Devices']
              .map((name) => exhibitors.find((e) => e.company === name))
              .filter(Boolean);

            const displayCompanies =
              exploreCompanies.length === 4 ? exploreCompanies : exhibitors.slice(0, 4);

            return displayCompanies.map((company) => {
              if (!company) return null;
              return (
                <div
                  key={company.id}
                  onClick={() => {
                    setSelectedCompanyId(company.id);
                    setActiveDelegateTab('company_detail');
                  }}
                  className="bg-white p-3 rounded-2xl border border-[#E5E7EB] hover:border-gray-400 transition-all cursor-pointer shadow-xs flex flex-col gap-2.5"
                >
                  <div className="flex justify-between items-start w-full">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] overflow-hidden flex items-center justify-center font-bold text-base text-[#181818] flex-shrink-0">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.company}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              company.company
                            )}&background=F3F4F6&color=181818&bold=true`;
                          }}
                        />
                      ) : (
                        company.company.charAt(0)
                      )}
                    </div>
                    {company.booth && (
                      <span className="text-[10.5px] font-bold text-[#166534] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded-lg flex-shrink-0 ml-1">
                        Booth {company.booth}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 w-full">
                    <h4 className="text-[13px] font-bold text-[#181818] leading-tight truncate">
                      {company.company}
                    </h4>
                    <p className="text-[11.5px] text-[#6B6B6B] mt-0.5 truncate">
                      {company.category}
                    </p>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};
