'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import {
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  Wifi,
  HelpCircle,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Car,
} from 'lucide-react';

export const DelegateSupport: React.FC = () => {
  const { setActiveDelegateTab, showToast } = useStore();
  const [ticketSubject, setTicketSubject] = useState('Badge / QR Access');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setIsSubmitted(true);
    showToast('Support request sent to event helpdesk ✓', 'success');
    setTimeout(() => {
      setTicketMessage('');
      setIsSubmitted(false);
    }, 2500);
  };

  return (
    <div className="flex-1 bg-[#F8F7F4] flex flex-col h-full overflow-hidden select-none">
      {/* Top Sticky Header */}
      <div className="pt-3 pb-3 px-3 bg-[#F8F7F4] flex-shrink-0 sticky top-0 z-10 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveDelegateTab('home')}
            className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#181818] active:scale-95 shadow-xs transition-transform"
            aria-label="Back to Home"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
              MPSS26 · CONCIERGE
            </p>
            <h1 className="text-[20px] font-bold text-[#181818] tracking-tight leading-tight">
              Event Support & Helpdesk
            </h1>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 pb-24 space-y-3">
        {/* Urgent Contact Card */}
        <div className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#181818]">Helpdesk Hotlines</span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
              Available 8 AM – 8 PM
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:+917314255000"
              className="p-2.5 rounded-xl border border-[#E5E7EB] hover:border-[#181818] bg-[#F9FAFB] flex flex-col gap-1 transition-colors group"
            >
              <div className="flex items-center gap-1.5 text-[#181818]">
                <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
                <span className="text-[11.5px] font-bold">Call Helpdesk</span>
              </div>
              <span className="text-[11px] text-[#4B5563] font-mono group-hover:text-[#181818]">
                +91 731 425 5000
              </span>
            </a>

            <a
              href="mailto:support@mpss2026.gov.in"
              className="p-2.5 rounded-xl border border-[#E5E7EB] hover:border-[#181818] bg-[#F9FAFB] flex flex-col gap-1 transition-colors group"
            >
              <div className="flex items-center gap-1.5 text-[#181818]">
                <Mail className="w-3.5 h-3.5 text-[#0D9488]" />
                <span className="text-[11.5px] font-bold">Email Support</span>
              </div>
              <span className="text-[11px] text-[#4B5563] truncate group-hover:text-[#181818]">
                support@mpss2026.gov.in
              </span>
            </a>
          </div>

          <div className="pt-2 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] text-[#6B6B6B]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#9CA3AF]" />
              Physical Desk: Ground Floor Foyer A
            </span>
            <span className="font-semibold text-[#181818]">Counter 01</span>
          </div>
        </div>

        {/* Quick Summit Essentials */}
        <div className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h3 className="text-[13px] font-bold text-[#181818]">Summit Quick Info</h3>

          <div className="space-y-2 text-[12px]">
            {/* Wi-Fi Info */}
            <div className="p-2.5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                <Wifi className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-[#181818] block leading-tight">Delegate High-Speed Wi-Fi</span>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                  SSID: <strong className="text-[#181818] font-mono">MPSS2026-Guest</strong> · Password:{' '}
                  <strong className="text-[#181818] font-mono">Semiconductor2026</strong>
                </p>
              </div>
            </div>

            {/* Shuttle & Transport */}
            <div className="p-2.5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                <Car className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-[#181818] block leading-tight">Shuttle & Parking</span>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                  Complimentary shuttles from Indore Airport every 30 mins. Free EV Parking in Lot B.
                </p>
              </div>
            </div>

            {/* Emergency & First Aid */}
            <div className="p-2.5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-[#181818] block leading-tight">Medical Assistance</span>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                  First Aid Medical Center located adjacent to Main Auditorium Gate 2.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Send Support Inquiry Form */}
        <div className="bg-white p-3.5 rounded-[16px] border border-[#E5E7EB] shadow-xs space-y-3">
          <div>
            <h3 className="text-[13px] font-bold text-[#181818]">Message Event Organizers</h3>
            <p className="text-[11.5px] text-[#6B6B6B] mt-0.5">
              Submit your question or report an issue directly to the floor team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <label className="text-[11px] font-semibold text-[#4B5563] block mb-1">
                Category
              </label>
              <select
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full py-2 px-2.5 rounded-lg border border-[#DEDCD7] bg-[#F9FAFB] text-[12.5px] font-medium text-[#181818] outline-none focus:border-[#181818]"
              >
                <option value="Badge / QR Access">Badge / QR Access</option>
                <option value="Wi-Fi / Network Issue">Wi-Fi / Network Issue</option>
                <option value="Speaker / Session Query">Speaker / Session Query</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Lost & Found">Lost & Found</option>
                <option value="Other">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#4B5563] block mb-1">
                Describe your issue
              </label>
              <textarea
                rows={3}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="How can the organizing committee assist you today?"
                className="w-full p-2.5 rounded-lg border border-[#DEDCD7] bg-white text-[12px] text-[#181818] outline-none focus:border-[#181818] placeholder-[#9CA3AF] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!ticketMessage.trim() || isSubmitted}
              className={`w-full py-2.5 rounded-xl font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all ${
                isSubmitted
                  ? 'bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]'
                  : !ticketMessage.trim()
                  ? 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                  : 'bg-[#181818] hover:bg-black text-white active:scale-98 shadow-xs'
              }`}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                  <span>Request Dispatched ✓</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Request to Organizers</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
