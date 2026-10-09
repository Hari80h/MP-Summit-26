const fs = require('fs');

let code = `
'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Suspense } from 'react';

interface AccessScreenProps {
  onSuccess: () => void;
}

const AccessScreenContent: React.FC<AccessScreenProps> = ({ onSuccess }) => {
  const { setRole } = useStore();
  
  // We can keep URL param support just in case, but default to empty string if none provided
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

  const handleQuickPrefill = () => {
    setEventId('ITS26');
    setMobile('9876543210');
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F6F4F0] min-h-[600px] select-none">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-6 border-b border-[#DEDCD7]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#B51F32]" />
            <span className="font-extrabold text-lg tracking-tight text-[#181818]">EventSphere</span>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B] bg-[#EFEEEA] px-2.5 py-1 rounded-full border border-[#DEDCD7]">
            Portal Access
          </span>
        </div>

        <div className="mt-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFEEEA] border border-[#DEDCD7] text-[#181818] text-xs font-semibold mb-3">
            <span>India Tech Summit 2026</span>
          </div>
          <h2 className="text-2xl font-bold text-[#181818] tracking-tight">
            Confirm Registration
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-1.5 leading-relaxed">
            Enter your registered mobile number below to securely access your personalized event dashboard.
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#181818] mb-1.5 uppercase tracking-wide">
              Event ID
            </label>
            <input
              type="text"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="e.g. ITS26"
              disabled={status === 'verifying' || status === 'confirmed'}
              className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#DEDCD7] text-sm text-[#181818] font-mono focus:outline-none focus:ring-2 focus:ring-[#B51F32] focus:border-transparent transition-all shadow-xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#181818] mb-1.5 uppercase tracking-wide">
              Registered Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="e.g. 9876543210"
              disabled={status === 'verifying' || status === 'confirmed'}
              className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#DEDCD7] text-sm text-[#181818] font-mono focus:outline-none focus:ring-2 focus:ring-[#B51F32] focus:border-transparent transition-all shadow-xs"
              required
            />
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Success Confirmation State */}
          {status === 'confirmed' && (
            <div className="p-3 bg-[#EBF5F0] border border-[#2F7D58]/30 rounded-xl text-xs text-[#2F7D58] flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-[#2F7D58] flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Access confirmed ✓</p>
                <p className="text-[11px] text-[#2F7D58]/80">Loading your personalized dashboard...</p>
              </div>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={status === 'verifying' || status === 'confirmed' || !mobile}
            className="w-full h-12 bg-[#B51F32] hover:bg-[#9C1A2B] active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {status === 'verifying' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying registration...</span>
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
        </form>

        {/* Quick Helper for Demo Evaluators */}
        <div className="mt-4 p-4 bg-white rounded-xl border border-[#DEDCD7] text-xs text-[#6B6B6B] space-y-3">
          <p className="font-bold text-[#181818] mb-2 uppercase tracking-wide text-[10px]">Demo Mobile Numbers:</p>
          <div className="flex justify-between items-center">
            <span>Delegate <span className="text-[#B51F32] cursor-pointer hover:underline" onClick={handleQuickPrefill}>(Prefill)</span></span>
            <span className="font-mono font-medium text-[#181818]">9876543210</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Exhibitor</span>
            <span className="font-mono font-medium text-[#181818]">9876543211</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Organizer</span>
            <span className="font-mono font-medium text-[#181818]">9876543212</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-6 border-t border-[#DEDCD7] flex items-center justify-between text-xs text-[#6B6B6B]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#2F7D58]" />
          <span>Verified Event Roster</span>
        </div>
        <span>12–14 Feb 2026</span>
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
`;

fs.writeFileSync('src/components/auth/AccessScreen.tsx', code);
