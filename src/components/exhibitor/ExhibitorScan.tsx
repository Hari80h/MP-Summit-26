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
    const linkedinToUse = person.privacy.shareLinkedIn ? person.linkedin : 'Not shared';

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
    <div className="flex-1 bg-[#F6F4F0] select-none px-4 pt-4 pb-24 space-y-5">
      {/* Scanner Header */}
      <div>
        <h1 className="text-xl font-serif text-[#181818] tracking-tight">Lead Capture Scanner</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">
          Tap the viewfinder to scan attendee badge QR codes
        </p>
      </div>

      {/* Camera Viewfinder */}
      <div 
        onClick={() => handleSimulateScan(candidateAttendees[0])}
        className="relative w-full aspect-[4/3] max-w-sm mx-auto bg-[#181818] rounded-3xl overflow-hidden border-4 border-[#181818] flex flex-col items-center justify-between p-4 shadow-xl text-white cursor-pointer hover:border-gray-800 transition-colors group"
      >
        <div className="w-full flex items-center justify-between text-xs text-[#AAAAAA] z-10">
          <span className="font-mono tracking-wider">MS B-14 LEADS</span>
          <span className="flex items-center gap-1.5 text-[#2F7D58] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#2F7D58] animate-pulse" />
            READY
          </span>
        </div>

        {/* Reticle */}
        <div className="relative w-56 h-56 border border-dashed border-white/20 rounded-2xl flex items-center justify-center group-hover:border-white/40 transition-colors">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#B51F32] rounded-tl-xl" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#B51F32] rounded-tr-xl" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#B51F32] rounded-bl-xl" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#B51F32] rounded-br-xl" />
          <div className="absolute left-2 right-2 h-[2px] bg-[#B51F32] shadow-[0_0_12px_#B51F32] scanner-laser" />

          <div className="text-center p-3 z-10 pointer-events-none transition-transform group-hover:scale-105">
            <Camera className="w-10 h-10 text-white/50 mx-auto mb-2 stroke-1" />
            <p className="text-xs text-white/80 font-medium">Tap to Scan Badge</p>
          </div>
        </div>

        <div className="text-xs text-white/50 z-10">
          Consent-aware lead capture · Instant cloud sync
        </div>
      </div>

      {/* Captured Lead Form Card */}
      {scannedLead && (
        <form
          onSubmit={handleSaveLeadSubmit}
          className="bg-white p-5 rounded-3xl border border-[#DEDCD7] shadow-lg animate-in fade-in slide-in-from-bottom-4 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD7]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2F7D58] animate-pulse" />
              <h3 className="text-base font-bold text-[#181818]">
                New Lead: {scannedLead.name}
              </h3>
            </div>
            <span className="text-xs font-mono bg-[#EFEEEA] px-2.5 py-1 rounded-md text-[#6B6B6B]">
              {scannedLead.source}
            </span>
          </div>

          {/* Attendee Details */}
          <div className="bg-[#F6F4F0] p-4 rounded-2xl border border-[#DEDCD7] text-sm space-y-3">
            <p className="font-semibold text-[#181818]">
              {scannedLead.designation} · {scannedLead.company}
            </p>
            <div className="flex flex-col gap-1.5 text-[#6B6B6B]">
              <span className="flex items-center justify-between">Email: <strong className="text-[#181818]">{scannedLead.email}</strong></span>
              <span className="flex items-center justify-between">Mobile: <strong className="text-[#181818]">{scannedLead.mobile}</strong></span>
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-sm font-semibold text-[#181818] mb-2">
              Qualification Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['New', 'Interested', 'Follow-up'] as LeadStatus[]).map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setLeadStatus(st)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                    leadStatus === st
                      ? 'bg-[#181818] text-white border-[#181818] shadow-sm'
                      : 'bg-white text-[#6B6B6B] border-[#DEDCD7] hover:bg-[#F6F4F0]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Products of Interest */}
          <div>
            <label className="block text-sm font-semibold text-[#181818] mb-2">
              Products of Interest
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Azure AI Platform',
                'Microsoft Fabric',
                'Microsoft 365 Copilot',
                'Security & Purview Suite',
              ].map((prod) => {
                const selected = selectedInterests.includes(prod);
                return (
                  <button
                    type="button"
                    key={prod}
                    onClick={() => handleToggleInterest(prod)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      selected
                        ? 'bg-[#181818] text-white border-[#181818] shadow-sm'
                        : 'bg-[#F6F4F0] text-[#181818] border-[#DEDCD7] hover:bg-[#EFEEEA]'
                    }`}
                  >
                    {prod} {selected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-[#181818] mb-2">
              Booth Conversation Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full p-4 rounded-2xl bg-[#F6F4F0] border border-[#DEDCD7] text-sm text-[#181818] focus:outline-none focus:border-[#181818] transition-all resize-none shadow-sm"
              placeholder="Enter specific follow-up requirements..."
            />
          </div>

          {/* Save Action */}
          {isSavedSuccess ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-sm text-[#2F7D58] flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Lead Saved & Metrics Updated ✓</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveExhibitorTab('leads')}
                className="font-bold underline text-sm text-[#2F7D58] hover:text-green-800"
              >
                View Leads
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full h-14 bg-[#181818] hover:bg-black active:scale-[0.98] text-white font-semibold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Lead to Microsoft CRM</span>
            </button>
          )}
        </form>
      )}
    </div>
  );
};
