'use client';

import React from 'react';
import { useStore } from '../../lib/store';
import { X, ShieldCheck, Share2 } from 'lucide-react';

interface MyQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
}

export const MyQRCodeModal: React.FC<MyQRCodeModalProps> = ({
  isOpen,
  onClose,
  onOpenPrivacy,
}) => {
  const { currentUser } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 animate-in fade-in select-none">
      <div className="bg-white rounded-2xl w-full max-w-sm p-3 space-y-2 shadow-2xl border border-[#DEDCD7] text-center">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#DEDCD7]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B51F32]">
            Digital Attendee Badge
          </span>
          <button onClick={onClose} className="p-1 rounded-lg text-[#6B6B6B] hover:text-[#181818]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Identity */}
        <div>
          <h2 className="text-[12px] font-bold text-[#181818]">{currentUser.name}</h2>
          <p className="text-xs text-[#6B6B6B]">
            {currentUser.designation} · {currentUser.company}
          </p>
          <span className="inline-block mt-1 font-mono text-[10px] bg-[#EFEEEA] px-2 py-0.2 rounded text-[#181818]">
            {currentUser.registrationId}
          </span>
        </div>

        {/* QR Code Artwork */}
        <div className="w-52 h-52 mx-auto bg-white p-2.5 rounded-[14px] border-2 border-[#181818] flex items-center justify-center shadow-xs">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#181818" />
            <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#181818" />
            <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#181818" />
            <circle cx="50" cy="50" r="12" fill="#B51F32" />
            <rect x="45" y="15" width="10" height="20" fill="#181818" />
            <rect x="15" y="45" width="20" height="10" fill="#181818" />
            <rect x="50" y="65" width="15" height="15" fill="#181818" />
            <rect x="70" y="50" width="20" height="10" fill="#181818" />
            <rect x="70" y="70" width="15" height="15" fill="#181818" />
          </svg>
        </div>

        {/* Signed reference security statement */}
        <div className="bg-[#F6F4F0] p-2 rounded-lg border border-[#DEDCD7] text-left text-[11px] text-[#6B6B6B] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#181818]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2F7D58]" />
            <span>Signed Identity Reference</span>
          </div>
          <p className="font-mono text-[10px] text-[#181818] truncate">
            eventsphere://reg/{currentUser.registrationId}/v2?sig=8e4b1a7c...
          </p>
          <p className="text-[10px]">
            Never exposes raw phone numbers or emails. Contact data is shared dynamically based on your preset.
          </p>
        </div>

        {/* Privacy Preset Shortcut */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[#6B6B6B]">Sharing: <strong>{currentUser.privacy.preset}</strong></span>
          <button
            onClick={() => {
              onClose();
              onOpenPrivacy();
            }}
            className="text-xs font-semibold text-[#B51F32] hover:underline"
          >
            Adjust Privacy →
          </button>
        </div>
      </div>
    </div>
  );
};
