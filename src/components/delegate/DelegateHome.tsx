'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../../lib/store';
import { Sparkles, Calendar, CalendarPlus, MapPin, ArrowRight, Check, UserPlus, Building, Clock, ChevronRight, X, Star, Users, BarChart2, Map } from 'lucide-react';

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
  setRole,
  setActiveExhibitorTab,
  setSelectedProductId,
  setSelectedCompanyId,
  sessions,
  exhibitors,
  toggleBookmarkSession,
 } = useStore();

 const liveSession = sessions.find((s) => s.status === 'live');
 const upcomingSessions = sessions.filter((s) => s.status === 'upcoming');
 const upcomingSpeakerIds = new Set(upcomingSessions.map((s) => s.speakerId));
 const comingSpeakers = attendees.filter(
  (a) => a.id !== currentUser.id && upcomingSpeakerIds.has(a.id)
 );

 // Curated people to meet (excluding self)
 const recommendedPeople = attendees
  .filter((a) => a.id !== currentUser.id && (a.relevanceScore || 0) >= 80 && a.name.toLowerCase() !== 'sai kumar')
  .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
  .slice(0, 15);

 const [activeSlide, setActiveSlide] = useState(0);
 const totalSlides = 4;

 useEffect(() => {
  const timer = setInterval(() => {
   setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, 4000);
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
   // swipe left (next)
   setActiveSlide((prev) => (prev + 1) % totalSlides);
  } else if (distance < -minSwipeDistance) {
   // swipe right (prev)
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
  if (hour < 12) return 'Good morning,';
  if (hour < 17) return 'Good afternoon,';
  return 'Good evening,';
 };

 return (
  <div className="flex-1 px-2 pt-2 pb-16 space-y-2.5 bg-[#F6F4F0] overflow-y-auto">
   {/* Top Greeting & Attendee Identity Header */}
   <div className="flex items-center justify-between bg-[#EFEBE5] rounded-[20px] p-3.5 shadow-sm relative overflow-hidden">
    {/* Subtle background decoration to mimic the waves */}
    <div className="absolute -top-12 -right-8 w-24 h-24 bg-white/40 rounded-full blur-xl pointer-events-none" />
    <div className="absolute -bottom-10 right-10 w-24 h-24 bg-[#E5DFD6]/60 rounded-full blur-xl pointer-events-none" />
    
    <div className="flex flex-col relative z-10">
     <span className="text-[9.5px] uppercase tracking-widest font-extrabold text-[#737373] mb-1">
      {getGreetingIST()}
     </span>
     <h1 className="text-[21px] font-serif font-medium text-[#181818] leading-none mb-1">
      {currentUser.name}
     </h1>
     <p className="text-[11.5px] font-semibold text-[#6B6B6B] leading-none">
      {currentUser.designation} <span className="opacity-50 mx-0.5">·</span> {currentUser.company}
     </p>
    </div>

    <button
     onClick={() => setActiveDelegateTab('profile')}
     className="relative group focus:outline-none z-10 flex-shrink-0 ml-2"
     aria-label="View Profile"
    >
     {currentUser.avatar ? (
      <img src={currentUser.avatar} alt={currentUser.name} className="w-[52px] h-[52px] rounded-full border-[3px] border-white object-cover shadow-sm" />
     ) : (
      <div className="w-[52px] h-[52px] rounded-full bg-[#181818] text-white flex items-center justify-center font-bold text-lg border-[3px] border-white shadow-sm">
       {currentUser.name.split(' ').map(n => n[0]).join('')}
      </div>
     )}
     <span className="absolute bottom-0 -right-0.5 w-[20px] h-[20px] bg-[#10B981] border-[2.5px] border-white rounded-full" />
    </button>
   </div>

   {/* Carousel Posters */}
   <div 
    className="relative rounded-[16px] shadow-sm overflow-hidden bg-[#18181B] pb-5"
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
   >
    <div 
     className="flex transition-transform duration-500 ease-in-out" 
     style={{ transform: `translateX(-${activeSlide * 100}%)` }}
    >
     {/* Poster 1: ITS26 LIVE */}
     <div className="w-full flex-shrink-0 p-3 relative h-[140px]">
      <div className="flex items-center justify-between mb-1">
       <span className="text-[10px] font-bold text-[#E5E5E5] bg-[#27272A] px-1.5 py-0.5 rounded-md">
        {event.id}
       </span>
       <div className="flex items-center gap-1.5 bg-[#B51F32] px-1.5 py-0.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">
         LIVE
        </span>
       </div>
      </div>
      <h2 className="text-[13.5px] font-bold text-white tracking-tight">
       {event.name}
      </h2>
      <div className="mt-1.5 text-[11px] text-[#A1A1AA] space-y-1">
       <div className="flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="truncate">{event.venue}, {event.city}</span>
       </div>
       <div className="pl-[20px]">
        <span>{event.dates}</span>
       </div>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] sm:text-[12px] whitespace-nowrap overflow-x-auto no-scrollbar pb-1">
       <span className="bg-[#27272A] text-[#E5E5E5] px-1.5 py-0.5 rounded-md shrink-0">
        <strong>{event.totalRegistered || attendees.length}</strong> attendees
       </span>
       <span className="bg-[#27272A] text-[#E5E5E5] px-1.5 py-0.5 rounded-md shrink-0">
        <strong>{event.totalSpeakers || attendees.filter(a => a.role === 'speaker').length}</strong> speakers
       </span>
       <span className="bg-[#27272A] text-[#E5E5E5] px-1.5 py-0.5 rounded-md shrink-0">
        <strong>{event.totalExhibitors || exhibitors.length}</strong> exhibitors
       </span>
      </div>
     </div>

     {/* Poster 2: Keynote */}
     <div className="w-full flex-shrink-0 p-3 relative h-[140px] bg-gradient-to-br from-[#18181B] to-[#B51F32]/40">
      <div className="flex items-center justify-between mb-1">
       <span className="text-[10px] font-bold text-[#E5E5E5] bg-[#27272A] px-1.5 py-0.5 rounded-md">FEATURED</span>
       <div className="flex items-center gap-1 bg-[#B51F32] px-1.5 py-0.5 rounded-full">
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">UPCOMING</span>
       </div>
      </div>
      <h2 className="text-[13.5px] font-bold text-white tracking-tight">The Future of AI & Cloud</h2>
      <div className="mt-1.5 text-[11px] text-[#A1A1AA] flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        Main Auditorium • 2:00 PM
      </div>
      <div className="mt-3 flex items-center gap-2 bg-[#27272A]/50 w-fit pr-3 rounded-full border border-white/10">
        <img src="https://i.pravatar.cc/150?img=11" className="w-7 h-7 rounded-full border border-white/20" alt="Speaker" />
        <span className="text-[11px] font-semibold text-white">Sriharsha Majety</span>
      </div>
     </div>

     {/* Poster 3: Networking Mixer */}
     <div className="w-full flex-shrink-0 p-3 relative h-[140px] bg-gradient-to-br from-[#18181B] to-[#10B981]/20">
      <div className="flex items-center justify-between mb-1">
       <span className="text-[10px] font-bold text-[#E5E5E5] bg-[#27272A] px-1.5 py-0.5 rounded-md">NETWORKING</span>
      </div>
      <h2 className="text-[13.5px] font-bold text-white tracking-tight mt-1">Tech Founders Mixer</h2>
      <div className="mt-1.5 text-[11px] text-[#A1A1AA] flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5" />
        VIP Lounge • 6:00 PM
      </div>
      <div className="mt-2.5 text-[11px] text-[#E5E5E5] leading-snug">
        Join 50+ founders and investors for an exclusive evening of high-impact networking and drinks.
      </div>
     </div>

     {/* Poster 4: Contest */}
     <div className="w-full flex-shrink-0 p-3 relative h-[140px] bg-gradient-to-br from-[#18181B] to-[#3B82F6]/30">
      <div className="flex items-center justify-between mb-1">
       <span className="text-[10px] font-bold text-[#E5E5E5] bg-[#B51F32] px-1.5 py-0.5 rounded-md">CONTEST</span>
      </div>
      <h2 className="text-[13.5px] font-bold text-white tracking-tight mt-1">Scan & Win!</h2>
      <div className="mt-1.5 text-[11px] text-[#A1A1AA] flex items-center gap-1.5">
        <Check className="w-3.5 h-3.5" />
        Visit 10 Platinum Sponsors
      </div>
      <div className="mt-2 text-[11px] text-[#E5E5E5] leading-snug">
        Win exclusive ITS26 merch by scanning QR codes at participating sponsor booths today.
      </div>
     </div>
    </div>
    
    {/* Dots */}
    <div className="absolute bottom-2 right-3 flex gap-1.5 z-10">
     {[0, 1, 2, 3].map(i => (
      <button 
       key={i} 
       onClick={() => setActiveSlide(i)}
       className={`w-1.5 h-1.5 rounded-full transition-colors ${activeSlide === i ? 'bg-white' : 'bg-white/30'}`} 
       aria-label={`Go to slide ${i + 1}`}
      />
     ))}
    </div>
   </div>

   {/* Quick Links */}
   <div>
    <h3 className="text-[14px] font-bold text-[#181818] tracking-tight mb-1.5">Quick Links</h3>
    <div className="grid grid-cols-4 gap-2">
     {[
      { id: 'speakers', label: 'Speakers', icon: Users, tab: 'speakers' },
      { id: 'polls', label: 'Polls', icon: BarChart2, tab: 'polls' },
      { id: 'map', label: 'Map', icon: Map, tab: 'map' },
      { id: 'sponsors', label: 'Sponsors', icon: Star, tab: 'sponsors' },
     ].map((item) => (
      <button
       key={item.id}
       onClick={() => setActiveDelegateTab(item.tab as any)}
       className="flex flex-col items-center justify-center py-3.5 px-1 bg-white rounded-[12px] shadow-sm border border-[#DEDCD7] active:scale-95 transition-all w-full"
      >
       <item.icon className="w-5 h-5 mb-1.5 text-[#181818]" />
       <span className="text-[11.5px] font-bold text-[#181818] tracking-tight">{item.label}</span>
      </button>
     ))}
    </div>
   </div>

   {/* My AI Recommendations (People) */}
   {recommendedPeople.length > 0 && (
    <div>
     <div className="flex items-center justify-between mb-1">
      <h3 className="text-[14px] font-bold text-[#181818] tracking-tight">My AI Recommendations</h3>
      <button 
       onClick={() => setActiveDelegateTab('people')}
       className="text-xs font-semibold text-[#181818] hover:underline flex items-center"
      >
       <span>View all</span>
       <ChevronRight className="w-3.5 h-3.5" />
      </button>
     </div>
     
     <div className="overflow-x-auto no-scrollbar -mx-2 px-2 pb-1">
      <div className="flex gap-3 w-max">
       {recommendedPeople.map((person) => {
        const connected = isConnected(person.id);
        const pending = isPending(person.id);
        return (
         <div
          key={person.id}
          onClick={() => setSelectedPersonId(person.id)}
          className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#DEDCD7] flex-shrink-0 w-[182px] flex flex-col justify-between gap-2.5 cursor-pointer shadow-sm hover:border-[#181818]/40 transition-all"
         >
          <div>
           <div className="flex items-center gap-2.5 mb-1">
            {person.avatar ? (
             <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            ) : (
             <div className="w-8 h-8 rounded-full bg-[#EFEBE5] flex items-center justify-center font-bold text-sm text-[#181818] flex-shrink-0 border border-[#DEDCD7]">
              {person.name.split(' ').map(n => n[0]).join('')}
             </div>
            )}
            <div className="flex-1 min-w-0">
             <h4 className="text-[12px] font-bold text-[#181818] truncate leading-tight">
              {person.name}
             </h4>
             <p className="text-[10px] text-[#6B6B6B] truncate mt-0.5">
              {person.designation}
             </p>
            </div>
           </div>
          </div>
          
          <button
           onClick={(e) => {
            e.stopPropagation();
            if (connected) {
             return; // Do not disconnect from Home page
            }
            if (pending) {
             disconnectFrom(person.id);
            } else {
             handleConnect(person.id, e);
            }
           }}
           className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 border ${
            connected
             ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
             : pending
             ? 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]'
             : 'bg-white text-[#181818] border-[#181818]'
           }`}
          >
           {connected ? (
            <span className="flex items-center justify-center gap-1.5">
             <Check className="w-3.5 h-3.5" />
             Connected
            </span>
           ) : pending ? (
            <span className="flex items-center justify-center gap-1.5">
             <Clock className="w-3.5 h-3.5" />
             Pending
            </span>
           ) : (
            <span className="flex items-center justify-center gap-1.5">
             Connect
            </span>
           )}
          </button>
         </div>
        );
       })}
      </div>
     </div>
    </div>
   )}

   {/* Companies to Explore */}
   <div>
    <div className="flex items-center justify-between mb-1">
     <h3 className="text-[14px] font-bold text-[#181818] tracking-tight">Companies to Explore</h3>
     <button 
      onClick={() => setActiveDelegateTab('companies')}
      className="text-xs font-semibold text-[#181818] hover:underline flex items-center"
     >
      <span>View all</span>
      <ChevronRight className="w-3.5 h-3.5" />
     </button>
    </div>

    <div className="grid grid-cols-2 gap-2">
     {(() => {
      const exploreCompanies = [
       'Google Cloud',
       'Stripe',
       'Razorpay',
       'Anthropic'
      ].map(name => exhibitors.find(e => e.company === name)).filter(Boolean);
      
      const displayCompanies = exploreCompanies.length === 4 ? exploreCompanies : exhibitors.slice(0, 4);
      
      return displayCompanies.map((company) => {
       if (!company) return null;
       return (
       <div
        key={company.id}
        onClick={() => {
         setSelectedCompanyId(company.id);
         setActiveDelegateTab('company_detail');
        }}
        className="bg-white p-2.5 rounded-xl border border-[#DEDCD7] hover:border-[#181818]/40 transition-all cursor-pointer shadow-sm flex flex-col gap-2"
       >
        <div className="flex justify-between items-start w-full">
         <div className="w-9 h-9 rounded-xl bg-[#EFEEEA] overflow-hidden flex items-center justify-center font-bold text-lg text-[#181818] flex-shrink-0">
          {company.logo ? (
           <img 
            src={company.logo} 
            alt={company.company} 
            className="w-full h-full object-cover" 
            onError={(e) => {
             e.currentTarget.onerror = null;
             e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.company)}&background=F3F4F6&color=181818&bold=true`;
            }}
           />
          ) : (
           company.company.charAt(0)
          )}
         </div>
         {company.booth && (
          <span className="text-[11px] font-bold text-[#166534] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded-lg flex-shrink-0 ml-2 mt-1">
           Booth {company.booth}
          </span>
         )}
        </div>
        <div className="mt-1 min-w-0 w-full">
         <h4 className="text-[12.5px] font-bold text-[#181818] leading-snug truncate">{company.company}</h4>
         <p className="text-[12px] text-[#6B6B6B] mt-0.5 truncate">{company.category}</p>
        </div>
       </div>
       );
      });
     })()}
    </div>
   </div>

   {/* Upcoming Sessions Preview */}
   <div>
    <div className="flex items-center justify-between mb-1">
     <h3 className="text-[12px] font-bold text-[#181818]">Upcoming Sessions</h3>
     <button
      onClick={() => setActiveDelegateTab('schedule')}
      className="text-xs font-semibold text-[#181818] hover:underline flex items-center gap-0.5"
     >
      <span>Schedule</span>
      <ChevronRight className="w-3.5 h-3.5" />
     </button>
    </div>

    <div className="space-y-2.5">
     {upcomingSessions.slice(0, 3).map((session) => (
      <div
       key={session.id}
       onClick={() => {
        setSelectedSessionId(session.id);
        setActiveDelegateTab('schedule');
       }}
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
        <p className="text-[10.5px] text-[#6B6B6B] mt-0.5">{session.speakerName || 'Not published'}</p>
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
     ))}
    </div>
   </div>
  </div>
 );
};
