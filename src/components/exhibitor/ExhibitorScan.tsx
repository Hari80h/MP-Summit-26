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
  const [leadStatus, setLeadStatus] = useState<LeadStatus>('Qualified');
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
      status: 'Qualified',
      interests: ['Azure AI Platform'],
      notes: person.name === 'Aarav Sharma'
        ? 'Senior PM at Google. Interested in Azure AI hybrid deployment and enterprise SLAs. Urgent follow-up requested.'
        : 'Met at booth demo. Requested architecture whitepaper.',
      productsViewed: ['Azure AI Platform'],
    });

    setLeadStatus('Qualified');
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
    <div className="flex-1 bg-[#F6F4F0] select-none px-2 pt-2 pb-16 space-y-2">
      {/* Scanner Header */}
      <div>
        <h1 className="text-[12px] font-bold text-[#181818] tracking-tight">Lead Capture Scanner</h1>
        <p className="text-xs text-[#6B6B6B] mt-0.5">
          Scan attendee badge QR codes at Microsoft Booth B-14
        </p>
      </div>

      {/* Camera Viewfinder */}
      <div className="relative w-full aspect-[4/3] max-w-sm mx-auto bg-[#181818] rounded-[14px] overflow-hidden border-2 border-[#DEDCD7] flex flex-col items-center justify-between p-3 shadow-md text-white">
        <div className="w-full flex items-center justify-between text-[11px] text-[#AAAAAA] z-10">
          <span className="font-mono">MICROSOFT B-14 LEADS</span>
          <span className="flex items-center gap-1 text-[#2F7D58] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#2F7D58] animate-pulse" />
            READY
          </span>
        </div>

        {/* Reticle */}
        <div className="relative w-48 h-48 border-2 border-dashed border-white/30 rounded-[14px] flex items-center justify-center">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#B51F32] rounded-tl-lg" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#B51F32] rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#B51F32] rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#B51F32] rounded-br-lg" />
          <div className="absolute left-2 right-2 h-0.5 bg-[#B51F32] shadow-[0_0_8px_#B51F32] scanner-laser" />

          <div className="text-center p-2.5 z-10 pointer-events-none">
            <Camera className="w-9 h-9 text-white/40 mx-auto mb-1 stroke-1" />
            <p className="text-[11px] text-white/70 font-medium">Scan Delegate Badge</p>
          </div>
        </div>

        <div className="text-[10px] text-[#888888] z-10">
          Consent-aware lead capture · Instant cloud sync
        </div>
      </div>

      {/* Simulate Buttons */}
      <div className="bg-white p-2.5 rounded-[14px] border border-[#DEDCD7] shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#181818]">Simulate Badge Scan</span>
          <span className="text-[10px] text-[#B51F32] font-semibold">Step 8 in Demo Flow</span>
        </div>
        <p className="text-[11px] text-[#6B6B6B]">
          Tap <strong className="text-[#181818]">Aarav Sharma</strong> to simulate capturing him as a Microsoft booth lead:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {candidateAttendees.slice(0, 3).map((person) => (
            <button
              key={person.id}
              onClick={() => handleSimulateScan(person)}
              className="p-2.5 bg-[#EFEEEA] hover:bg-[#E5E3DC] active:scale-95 text-left rounded-lg border border-[#DEDCD7] text-xs transition-all flex items-center justify-between group"
            >
              <div>
                <p className="font-bold text-[#181818] group-hover:text-[#B51F32]">
                  {person.name}
                </p>
                <p className="text-[10px] text-[#6B6B6B]">
                  {person.designation} · {person.company}
                </p>
              </div>
              <Camera className="w-3.5 h-3.5 text-[#B51F32]" />
            </button>
          ))}
        </div>
      </div>

      {/* Captured Lead Form Modal / Card */}
      {scannedLead && (
        <form
          onSubmit={handleSaveLeadSubmit}
          className="bg-white p-2.5 rounded-[14px] border-2 border-[#181818] shadow-md animate-in fade-in slide-in-from-bottom-2 space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#DEDCD7]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B51F32]" />
              <h3 className="text-[12px] font-bold text-[#181818]">
                New Lead: {scannedLead.name}
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-[#EFEEEA] px-2 py-0.5 rounded text-[#181818]">
              {scannedLead.source}
            </span>
          </div>

          {/* Attendee Details */}
          <div className="bg-[#F6F4F0] p-2 rounded-lg border border-[#DEDCD7] text-xs space-y-1">
            <p className="font-bold text-[#181818]">
              {scannedLead.designation} · {scannedLead.company}
            </p>
            <div className="flex items-center justify-between text-[11px] text-[#6B6B6B]">
              <span>Email: <strong className="text-[#181818] font-mono">{scannedLead.email}</strong></span>
              <span>Mobile: <strong className="text-[#181818] font-mono">{scannedLead.mobile}</strong></span>
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#181818] mb-1">
              Lead Qualification Status
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['New', 'Interested', 'Qualified', 'Contacted', 'Follow-up'] as LeadStatus[]).map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setLeadStatus(st)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    leadStatus === st
                      ? 'bg-[#181818] text-white border-[#181818]'
                      : 'bg-white text-[#6B6B6B] border-[#DEDCD7] hover:border-[#181818]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Products of Interest */}
          <div>
            <label className="block text-xs font-semibold text-[#181818] mb-1">
              Products of Interest
            </label>
            <div className="flex flex-wrap gap-1.5">
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
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      selected
                        ? 'bg-[#B51F32] text-white border-[#B51F32]'
                        : 'bg-[#F6F4F0] text-[#181818] border-[#DEDCD7]'
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
            <label className="block text-xs font-semibold text-[#181818] mb-1">
              Booth Conversation Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full p-2.5 rounded-lg bg-[#F6F4F0] border border-[#DEDCD7] text-xs text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#B51F32] transition-all resize-none"
              placeholder="Enter specific follow-up requirements..."
            />
          </div>

          {/* Save Action */}
          {isSavedSuccess ? (
            <div className="p-2.5 bg-[#EBF5F0] border border-[#2F7D58]/30 rounded-lg text-xs text-[#2F7D58] flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Lead Saved & Metrics Updated ✓</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveExhibitorTab('leads')}
                className="font-bold underline text-xs text-[#2F7D58]"
              >
                View Leads
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full h-8 bg-[#B51F32] hover:bg-[#9C1A2B] active:scale-[0.98] text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Lead to Microsoft CRM</span>
            </button>
          )}
        </form>
      )}
    </div>
  );
};
