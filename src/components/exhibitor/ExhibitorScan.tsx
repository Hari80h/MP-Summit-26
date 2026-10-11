'use client';

import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { Camera, QrCode, CheckCircle2, User, Building, Mail, Phone, Tag, Save, ArrowRight } from 'lucide-react';
import { LeadStatus } from '../../types';

export const ExhibitorScan: React.FC = () => {
  const {
    attendees,
    currentUser,
    saveLead,
    setActiveExhibitorTab,
    leads,
  } = useStore();

  const [scannedLead, setScannedLead] = useState<{
    personId: string;
    name: string;
    company: string;
    designation: string;
    email: string;
    mobile: string;
    linkedin: string;
    source: string;
    status: LeadStatus;
    interests: string[];
    notes: string;
    productsViewed: string[];
  } | null>(null);

  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Azure AI Platform']);
  const [leadStatus, setLeadStatus] = useState<LeadStatus>('New');
  const [notes, setNotes] = useState('Looking to evaluate Azure AI for product pipeline. Requested follow-up demo.');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Default candidate for sales demo is Aarav Sharma!
  const candidateAttendees = [
    currentUser, // Aarav Sharma
    ...attendees.filter((a) => a.id !== currentUser.id && a.role !== 'exhibitor_staff'),
  ];

  const handleSimulateScan = (person: typeof candidateAttendees[0]) => {
    setIsSavedSuccess(false);
    // Respect person's privacy consent
    const emailToUse = person.privacy.shareEmail ? person.email : 'Not shared';
    const mobileToUse = person.privacy.sharePhone ? person.mobile : 'Not shared';
    const linkedinToUse = (person.privacy.shareLinkedIn && person.linkedin) ? person.linkedin : 'Not shared';

    setScannedLead({
      personId: person.id,
      name: person.name,
      company: person.company,
      designation: person.designation,
      email: emailToUse,
      mobile: mobileToUse,
      linkedin: linkedinToUse,
      source: 'Booth Scan (B-14)',
      status: 'New',
      interests: ['Azure AI Platform'],
      notes: person.name === 'Aarav Sharma'
        ? 'Senior PM at Google. Interested in Azure AI hybrid deployment and enterprise SLAs. Urgent follow-up requested.'
        : 'Met at booth demo. Requested architecture whitepaper.',
      productsViewed: ['Azure AI Platform'],
    });

    setLeadStatus('New');
    setSelectedInterests(['Azure AI Platform']);
    setNotes(
      person.name === 'Aarav Sharma'
        ? 'Senior PM at Google. Interested in Azure AI hybrid deployment and enterprise SLAs. Urgent follow-up requested.'
        : 'Met at booth demo. Requested architecture whitepaper.'
    );
  };

  const handleToggleInterest = (productName: string) => {
    if (selectedInterests.includes(productName)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== productName));
    } else {
      setSelectedInterests([...selectedInterests, productName]);
    }
  };

  const handleSaveLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedLead) return;

    saveLead({
      personId: scannedLead.personId,
      name: scannedLead.name,
      company: scannedLead.company,
      designation: scannedLead.designation,
      email: scannedLead.email,
      mobile: scannedLead.mobile,
      linkedin: scannedLead.linkedin,
      source: scannedLead.source,
      status: leadStatus,
      interests: selectedInterests,
      notes: notes,
      boothId: 'B-14',
      productsViewed: scannedLead.productsViewed,
    });

    setIsSavedSuccess(true);
  };

  return (
    <div className="flex-1 bg-[#F6F4F0] select-none pb-24 flex flex-col">
      {/* Compact Dark Header */}
      <div className="bg-[#151515] px-5 pt-6 pb-10 text-white rounded-b-[24px] shadow-md relative overflow-hidden shrink-0">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-bl from-[#B51F32]/50 via-[#B51F32]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 mb-1">
          <h1 className="text-[22px] font-serif tracking-tight text-white leading-tight mb-0.5">
            Lead Capture
          </h1>
          <p className="text-[11px] text-gray-300 font-medium">
            Tap viewfinder to scan attendee badge QR codes
          </p>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-20 flex flex-col gap-4">
        {/* Camera Viewfinder */}
        <div 
          onClick={() => handleSimulateScan(candidateAttendees[0])}
          className="relative w-full max-h-[220px] aspect-[4/3] max-w-sm mx-auto bg-[#181818] rounded-3xl overflow-hidden border-4 border-[#181818] flex flex-col items-center justify-between p-4 shadow-xl text-white cursor-pointer hover:border-gray-800 transition-colors group shrink-0"
        >
          <div className="w-full flex items-center justify-between text-xs text-[#AAAAAA] z-10">
            <span className="font-mono tracking-wider text-[10px]">MS B-14 LEADS</span>
            <span className="flex items-center gap-1.5 text-[#2F7D58] font-semibold text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#2F7D58] animate-pulse" />
              READY
            </span>
          </div>

          {/* Reticle */}
          <div className="relative w-40 h-40 border border-dashed border-white/20 rounded-2xl flex items-center justify-center group-hover:border-white/40 transition-colors">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-[#B51F32] rounded-tl-xl" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-[#B51F32] rounded-tr-xl" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-[#B51F32] rounded-bl-xl" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-[#B51F32] rounded-br-xl" />
            <div className="absolute left-2 right-2 h-[2px] bg-[#B51F32] shadow-[0_0_12px_#B51F32] scanner-laser" />

            <div className="text-center p-2 z-10 pointer-events-none transition-transform group-hover:scale-105">
              <Camera className="w-8 h-8 text-white/50 mx-auto mb-1.5 stroke-1" />
              <p className="text-[10px] text-white/80 font-medium">Tap to Scan</p>
            </div>
          </div>
        </div>

        {/* Captured Lead Form Card */}
        {scannedLead && (
          <form
            onSubmit={handleSaveLeadSubmit}
            className="bg-white p-4 rounded-[28px] border border-[#EBEBEB] shadow-2xl animate-in fade-in slide-in-from-bottom-4 flex flex-col shrink-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD7]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F7D58] animate-pulse" />
                <h3 className="text-[17px] font-serif tracking-tight text-[#181818] leading-tight">
                  New Lead: {scannedLead.name.split(' ')[0]}
                </h3>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-[#EFEEEA] text-[#6B6B6B] px-2 py-0.5 rounded-md">
                {scannedLead.source.replace('Booth Scan ', '')}
              </span>
            </div>
            
            <p className="text-[12px] text-[#6B6B6B] font-medium mt-3">
              <strong className="text-[#181818]">{scannedLead.designation}</strong> · {scannedLead.company}
            </p>

          <div className="space-y-4 mt-4">
            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#F6F4F0] p-2.5 rounded-xl border border-[#DEDCD7]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8A8A] block mb-0.5">Email</span>
                <strong className="text-[#181818] truncate block">{scannedLead.email}</strong>
              </div>
              <div className="bg-[#F6F4F0] p-2.5 rounded-xl border border-[#DEDCD7]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8A8A] block mb-0.5">Mobile</span>
                <strong className="text-[#181818] truncate block">{scannedLead.mobile}</strong>
              </div>
            </div>

            {/* Status Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A] mb-1.5">
                Qualification Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['New', 'Interested', 'Follow-up'] as LeadStatus[]).map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => setLeadStatus(st)}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-bold border transition-all ${
                      leadStatus === st
                        ? 'bg-[#B51F32] text-white border-[#B51F32] shadow-sm'
                        : 'bg-white text-[#6B6B6B] border-[#DEDCD7] hover:bg-[#F6F4F0]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A] mb-1.5">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full p-3 rounded-xl bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:border-[#B51F32] transition-all resize-none shadow-sm"
                placeholder="Specific follow-up requirements..."
              />
            </div>

            {/* Save Action */}
            {isSavedSuccess ? (
              <div className="h-12 bg-green-50 border border-green-200 rounded-xl text-xs text-[#2F7D58] flex items-center justify-between px-4">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Lead Saved</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveExhibitorTab('leads')}
                  className="font-bold underline"
                >
                  View All
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full h-12 bg-[#181818] hover:bg-black active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Lead to CRM</span>
              </button>
            )}
          </div>
        </form>
      )}
      </div>
    </div>
  );
};
