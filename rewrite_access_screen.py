import sys

code = """'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Loader2, Lock } from 'lucide-react';
import { Suspense } from 'react';

interface AccessScreenProps {
  onSuccess: () => void;
}

const AccessScreenContent: React.FC<AccessScreenProps> = ({ onSuccess }) => {
  const { setRole } = useStore();
  
  const [eventId, setEventId] = useState('ITS26');
  const [mobile, setMobile] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'confirmed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setStatus('verifying');

    setTimeout(() => {
      const cleanEvent = eventId.trim().toUpperCase();
      const cleanMobile = mobile.trim().replace(/[\\s-]/g, '');

      if (cleanEvent !== 'ITS26') {
        setStatus('error');
        setErrorMessage("We couldn't find an event matching this Event ID.");
        return;
      }

      let detectedRole: 'delegate' | 'exhibitor' | 'organizer' | null = null;

      if (cleanMobile === '9876543210' || cleanMobile === '+919876543210') {
        detectedRole = 'delegate';
      } else if (cleanMobile === '9876543211' || cleanMobile === '+919876543211') {
        detectedRole = 'exhibitor';
      } else if (cleanMobile === '9876543212' || cleanMobile === '+919876543212') {
        detectedRole = 'organizer';
      }

      if (detectedRole) {
        setRole(detectedRole);
        setStatus('confirmed');
        setTimeout(() => {
          onSuccess();
        }, 800);
      } else {
        setStatus('error');
        setErrorMessage("We couldn't find a registration matching this mobile number.");
      }
    }, 750);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F4F0] min-h-[600px] select-none h-full relative overflow-hidden">
      
      {/* Hero Image Section */}
      <div 
        className="h-[42%] min-h-[300px] relative bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
      >
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 w-full p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-white flex items-center justify-center font-extrabold text-[#181818] text-[13px] rounded-sm">
              E
            </div>
            <span className="font-bold text-[13px] tracking-[0.15em] text-white">EVENTSPHERE</span>
          </div>
          <span className="text-[11px] font-medium tracking-widest text-white border border-white/40 px-2 py-0.5 rounded backdrop-blur-sm bg-black/20">
            ITS26
          </span>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-12 left-6 z-10 text-white">
          <p className="text-[13px] font-medium text-white/90 mb-0.5">Welcome to</p>
          <h1 className="text-[28px] font-bold leading-tight tracking-tight mb-2">
            India Tech Summit 2026
          </h1>
          <p className="text-[13px] font-medium text-white/80">
            12–14 Feb · Bengaluru · 2,438 attending
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 bg-[#F6F4F0] rounded-t-[28px] -mt-8 relative z-20 px-6 pt-8 pb-6 flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        
        <div className="mb-7">
          <div className="border-l-[3px] border-[#B51F32] pl-3">
            <h2 className="text-[16px] font-bold text-[#181818]">Enter your event</h2>
            <p className="text-[13px] text-[#6B6B6B] mt-1 leading-relaxed">
              Use the Event ID and mobile number used during event registration.
            </p>
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="flex-1 flex flex-col">
          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-[#181818] mb-2">
                Event ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  placeholder="ITS26"
                  disabled={status === 'verifying' || status === 'confirmed'}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#DEDCD7] text-[15px] font-bold tracking-wider text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32] focus:border-transparent transition-all shadow-sm"
                  required
                />
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#181818]" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#181818] mb-2">
                Registered Mobile Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  disabled={status === 'verifying' || status === 'confirmed'}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#DEDCD7] text-[15px] font-medium text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32] focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2 animate-in fade-in mt-4">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Success Confirmation State */}
          {status === 'confirmed' && (
            <div className="p-3 bg-[#EBF5F0] border border-[#2F7D58]/30 rounded-xl text-xs text-[#2F7D58] flex items-center gap-2 animate-in fade-in mt-4">
              <CheckCircle2 className="w-5 h-5 text-[#2F7D58] flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Access confirmed ✓</p>
                <p className="text-[11px] text-[#2F7D58]/80">Loading your personalized dashboard...</p>
              </div>
            </div>
          )}

          <div className="mt-auto pt-6">
            {/* Submit Action */}
            <button
              type="submit"
              disabled={status === 'verifying' || status === 'confirmed' || !mobile}
              className="w-full h-[52px] bg-[#B51F32] hover:bg-[#9C1A2B] active:scale-[0.98] text-white font-semibold text-[15px] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'verifying' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : status === 'confirmed' ? (
                <span>Access Confirmed ✓</span>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Footer Info */}
            <div className="mt-6 flex items-center justify-center gap-5 text-[12px] font-medium text-[#6B6B6B]">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>No passwords</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Registration verified</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AccessScreen: React.FC<AccessScreenProps> = (props) => {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-6 bg-[#F6F4F0] min-h-[600px]"><Loader2 className="w-8 h-8 animate-spin text-[#B51F32]" /></div>}>
      <AccessScreenContent {...props} />
    </Suspense>
  );
};
"""

with open('src/components/auth/AccessScreen.tsx', 'w') as f:
    f.write(code)

print("Done")
